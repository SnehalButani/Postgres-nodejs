import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from '../entity/User'
import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken";
import * as _ from 'lodash'
import { validationResult } from "express-validator";

const userRepository = AppDataSource.getRepository(User);

const jwtToken = (payload: object) => jwt.sign(payload, "postgresnodejs")


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({
                errors: errorMessages
            });
        }

        const user = userRepository.create({ ...req.body, image: req.file.path } as object)
        const result = await userRepository.save(user);

        const token = jwtToken({ email: req.body.email });

        return res.status(200).json({
            message: "user Successfully",
            data: _.omit(result, ["password"]),
            token: token
        })

    } catch (error) {
        next(error);
    }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({
                errors: errorMessages
            });
        }

        const { email, password } = req.body;
        const user = await userRepository.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "email and password does not match our records" });

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) return res.status(404).json({ message: "email and password does not match our records" });

        const token = jwtToken({ email: req.body.email });

        res.status(200).json({
            message: "Login Successfully",
            data: _.omit(user, ["password"]),
            token: token
        })
    } catch (error) {
        next(error)
    }
}

export const editProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({
                errors: errorMessages
            });
        }

        const user = await userRepository.findOneBy({ email: req.body.email });

        userRepository.merge(user, { ...req.body, image: req.file ? req.file.path : user.image });

        const result = await userRepository.save(user);

        return res.status(200).json({
            message: "Edit profile Successfully",
            data: _.omit(result, ['password'])
        })
    } catch (error) {
        next(error)
    }
}

