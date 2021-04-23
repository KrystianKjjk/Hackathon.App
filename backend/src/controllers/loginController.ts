import * as Joi from 'joi';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';

export default class LoginController{
    logging = async(req, res) => {
        try{
            const { email, password } = req.body;
            const validLogin = await loginSchema.validateAsync(req.body);
            let user = await User.findOne({ email: email });
            if(!user) return res.status(400).send({ message: 'Bad email or password.' });
    
            const validPassword = await bcrypt.compare(password, user.password)
            if(!validPassword) return res.status(400).send({ message: 'Bad email or password.' });
    
            const token = user.generateAuthToken();
            res.status(200).send({
                message: 'Succesfully log in.',
                token: token
            });
            
        } catch (error) {
            res.status(400).send({
                message: error.message,
                error
            });
        }
    }

}


const loginSchema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z<>!@#$%^&*?_=+-]{8,}$/).required()
});
