import * as _ from 'lodash'
import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express"
import { AppDataSource } from '../data-source';
import { Movies } from '../entity/Movies';

const movieRepository = AppDataSource.getRepository(Movies);

export const addMovieData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(400).json({
                errors: errorMessages
            });
        }

        const movie = movieRepository.create({ ...req.body, image: req.file ? req.file.path : '' });
        const result = await movieRepository.save(movie);

        return res.status(200).json({
            message: "Movie add Successfully",
            data: result // _.omit(result, ["userId"]),
        })

    } catch (error) {
        next(error)
    }
}

export const getAllmovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const result = await movieRepository.find({
        //     select: {
        //         title: true,
        //         // user: {
        //         //     firstName: true
        //         // }
        //     },
        //     relations: {
        //         user: true
        //     }
        // });

        // const result = await  movieRepository.createQueryBuilder("movies").leftJoinAndSelect("movies.user","user").getMany();

        const result = await  movieRepository.find();
        return res.status(200).json({
            data: _.map(result, ele => _.omit(ele, ["user.password"]))
            // data:result
        })

    } catch (error) {
        next(error)
    }
}
