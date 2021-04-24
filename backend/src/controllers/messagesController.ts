import mongoose from 'mongoose';
import { User } from '../models/user.model';
import GroupSchema from '../models/group.model';
import MessageSchema from '../models/message.model';

export default class MessagesController{
    fetchMessages = async (req, res, next) => {
        const gid = req.params.gid;
      
        if (!gid) return next(new Error('[ERROR][MESSAGES] wrong group id: '));
      
        // Find group's messages
        let group;
        try {
          group = await GroupSchema.findById(gid).populate('messages');
        } catch (error) {
          return next(new Error('[ERROR][MESSAGES] Could not find group by id: ' + error));
        }
      
        res.json({ message: 'Messages fetched!', messages: group.messages });
      };
      
      sendMessage = async (req, res, next) => {
        const { gid, name, text, uid, date } = req.body;
      
        // Find group
        let group;
        try {
          group = await GroupSchema.findById(gid);
        } catch (error) {
          return next(new Error('[ERROR][MESSAGES] Could not find group by id: ' + error));
        }
      
        // Add member
        let user;
        try {
          user = await User.findById(uid);
        } catch (error) {
          return next(new Error('[ERROR][MESSAGES] Could not find user by id: ' + error));
        }
      
        let isMember = false;
        for (const member of group.users) {
          if (member._id == uid) isMember = true;
        }
        if (!isMember) group.users.push(user);
      
        // Create message
        const newMessage = new MessageSchema({
          name,
          text,
          group,
          date
        });
      
        // Transaction
        try {
          const sess = await mongoose.startSession();
          sess.startTransaction();
          await newMessage.save({ session: sess });
          group.messages.push(newMessage);
          await group.save({ session: sess });
          await sess.commitTransaction();
        } catch (error) {
          return next(new Error('[ERROR][MESSAGE] Message transaction failed: ' + error));
        }
      
        // Send Response
        res.json({ message: 'Message sent!' });
      };

}