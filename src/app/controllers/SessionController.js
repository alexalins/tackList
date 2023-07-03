import jwt  from "jsonwebtoken";
import * as Yup from 'yup';

import User from '../models/User';
require('dotenv').config();

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Falha na validação.'});
        }

        const { email, password } = req.body;

        const user = await User.findOne({where: {email}});

        if(!user) {
            return res.status(401).json({error: 'Usuário não existe.'});
        }

        if(!(await user.checkPassword(password))) {
            return res.status(401).json({error: 'Senha incorreta'});
        }

        const { id, name } = user;
        
        return res.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({ id }, process.env.SECRET, {
                expiresIn: process.env.SECRET_TIME
            })
        });
    }
}
export default new SessionController();