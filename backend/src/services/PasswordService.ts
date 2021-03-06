
import Repository from '../repositories/repository'
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto'
import 'dotenv/config';

import { User } from "../models/user.model";

const getAll = async () => {
    const results = await User.find()
      .sort({ amount: -1, lastName: 1 });
      console.log(results)
  
    return results;
  };

const getUser = async (id) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    
    if (isIdValid) {
      const user = await User.findById(id);
        return user
    }
  };


 const updateUser = async (id, password) => {
    let req = {body: {password: ''}};
    req.body.password = password;
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) {
      return 'incorrect id'
    }
    let user = await User.findById(id);
    if (!user)
      return 'User does not exist.';
}



export default class PasswordService{
    userRepository;
    passwordTokenRepository: Repository;
    rounds: number = 10;

    constructor (passwordTokenRepository) {
        this.passwordTokenRepository = passwordTokenRepository
    }   

    async requestPasswordReset(email: string) {
        const users = await getAll();
        console.log(users);
        const user = users.find((user) => user.email === email);
        if (!user) throw new Error ("User does not exist!");
        const userId = user._id
        let token = await this.passwordTokenRepository.getById(userId);
        if (token) await this.passwordTokenRepository.deleteById(userId);
        
        let resetToken = crypto.randomBytes(32).toString("hex");
        console.log(resetToken);
        const hashedResetToken = await bcrypt.hash(resetToken, this.rounds)

        await this.passwordTokenRepository.create({
            _id: user._id,
            token: hashedResetToken,
            createdAt: Date.now()
        })
        const link = `${process.env.PAGE_URL}/passwordReset?token=${resetToken}&id=${user._id}`;
        console.log(link);
        return {
            email: user.email, 
            link: link
        };
    }

    async resetPassword(userId:mongoose.Types.ObjectId, token: string, password: string){
        let resetToken = await this.passwordTokenRepository.getById(userId);
        if (!resetToken) throw new Error("Invalid or expired password reset token");
        const isValid = await bcrypt.compare(token, resetToken.token);
        if (!isValid) throw new Error("Invalid or expired password reset token");

        const hashedPassword = await bcrypt.hash(password, this.rounds);
        const user = await getUser(userId);
        //@ts-ignore
        user.password = hashedPassword;
        updateUser(userId, user);
        await this.passwordTokenRepository.deleteById(userId);
        return true;
    }

    async changePassword(id:mongoose.Types.ObjectId, oldPassword:string, newPassword:string): Promise<void> {
        if (oldPassword === newPassword) throw new Error("Old and new passwords are the same");
        const user = await getUser(id);
        if (!user) throw new Error("Invalid user");
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) throw new Error("Invalid pw");
        user.password = await bcrypt.hash(newPassword, this.rounds);                
        this.userRepository.updateUser(id, user);
    }
} 
