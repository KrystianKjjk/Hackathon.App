import * as express from 'express';
import mongoose from 'mongoose';
import { User, validateUser, validatePatchUpdate } from "../models/user.model";
import bcrypt from 'bcrypt';

export default class UserController {
  getMe = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user)
      return res
        .status(404)
        .send({ message: 'User not found' });
  
    res.send(user);
  };
  
  getAll = async (req, res, next) => {
    const results = await User.find()
      .sort({ amount: -1, lastName: 1 });
  
    res.send({
      users: results,
    });
  };
  
  getUser = async (req, res, next) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (isIdValid) {
      const user = await User.findById(req.params.id);
      if (!user)
        return res
          .status(404)
          .send({ message: 'User not found' });
      res.status(200).send(user);
    } else {
      res.status(400).send({ message: 'Incorrect user id' });
    }
  };
  
  addUser = async (req, res, next) => {
    try {
      const {
        name,
        email,
        password,
        isAdmin,
      } = req.body;
      const validUser = await validateUser.validateAsync(req.body);
      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res
          .status(400)
          .send({
            message:
              'Użytkownik o podanym adresie email jest już zarejestrowany.',
          });
  
      if (isAdmin) {
        return res
          .status(403)
          .send({
            message: 'Nie masz uprawnień do nadania statusu Administratora.',
          });
      }
  
      user = new User({
      _id: mongoose.Types.ObjectId(),
      ...validUser,
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user = await user.save();
  
      const token = user.generateAuthToken();
      res.status(201).send({
        message: 'Rejestracja przebiegła pomyślnie.',
        name: user.name,
        email: user.email,
        token: token,
      });
      next();
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  updateUser = async (req, res, next) => {
    let id = req.params.id;
    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if (!isIdValid) {
      return res.status(400).send({ message: 'Podano błędny numer id.' });
    }
    let user = await User.findById(id);
    if (!user)
      return res.status(404).send({ message: 'Podany użytkownik nie istnieje.' });
  
    try {
      const updateUser : any = {};
  
      for (const [propName, newValue] of Object.entries(req.body)) {
        if (
          (propName === 'isAdmin') &&
          !req.user.isAdmin
        ) {
          // console.log(req.user, !req.user.isSuperAdmin);
          return res
            .status(403)
            .send({
              message: 'Nie masz uprawnień do zmiany statusu Administratora.',
            });
        }
  
        updateUser[propName] = newValue;
      }
  
      await validatePatchUpdate.validateAsync(updateUser);
      for (const [propName] of Object.entries(req.body)) {
        if (propName === 'password') {
          const salt = await bcrypt.genSalt(10);
          updateUser['password'] = await bcrypt.hash(updateUser['password'], salt);
        }
      }
      user = await User.findOneAndUpdate(
        { _id: id },
        { $set: updateUser },
        { new: true }
      );
      res.status(200).send({
        message: `Zaktualizowano następujące pola: ${JSON.stringify(updateUser)}`,
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  usersUpdateMe = async (req, res, next) => {
    let id = req.user._id;
    let user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).send({ message: 'Podany użytkownik nie istnieje.' });
  
    try {
      let updateUser = {};
      for (const [propName, newValue] of Object.entries(req.body)) {
        console.log(propName);
        if (
          (propName === 'isAdmin') &&
          !req.user.isAdmin
        ) {
          return res
            .status(403)
            .send({
              message:
                'Nie masz uprawnień do nadania sobie statusu Administratora.',
            });
        }
        updateUser[propName] = newValue;
      }
      await validatePatchUpdate.validateAsync(updateUser);
      for (const [propName] of Object.entries(req.body)) {
        if (propName === 'password') {
          const salt = await bcrypt.genSalt(10);
          updateUser['password'] = await bcrypt.hash(updateUser['password'], salt);
        }
      }
  
      user = await User.findOneAndUpdate(
        { _id: id },
        { $set: updateUser },
        { new: true }
      );
      res.status(200).send({
        message: `Zaktualizowano następujące pola: ${JSON.stringify(updateUser)}`,
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  
  deleteMe = async (req, res, next) => {
    let user = await User.findById(req.user._id).select('-password');
    if (!user)
      return res.status(404).send({ message: 'Podany użytkownik nie istnieje.' });
  
    if (user.isAdmin) {
      return res
        .status(403)
        .send({
          message:
            'Tylko inny Admin może usunąć konto o uprawnieniach Admin.',
        });
    }
  
    user = await User.findByIdAndRemove(req.user._id).select('-password');
  
    res.status(202).send({
      message: 'Konto zostało poprawnie usunięte',
      user,
    });
  };
  
  deleteUser = async (req, res, next) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isIdValid) {
      return res.status(400).send({ message: 'Podano błędny numer id.' });
    }
  
    let user = await User.findById(req.params.id);
    if (user.isAdmin && !req.user.isAdmin) {
      return res
        .status(403)
        .send({
          message: 'Nie masz uprawnień do usunięcia konta administratora.',
        });
    }
  
    if (user.isAdmin && user.id === req.user._id) {
      return res
        .status(403)
        .send({
          message:
            'Tylko inny Admin może usunąć konto o uprawnieniach Admin.',
        });
    }
  
    user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Podany użytkownik nie istnieje.' });
    }
  
    res.status(202).send({
      message: 'Pomyślnie usunięto konto użytkownika.',
      user,
    });
  };
}