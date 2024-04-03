import * as express from 'express'
import { addMovieData, getAllmovies } from '../controller/MovieController';
import * as multer from 'multer'
import * as fs from 'fs'
import { addMovieValidator } from '../utils/helper';


const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/';
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9) + '.' +
            file.originalname.split('.')[1];
        cb(null, uniqueSuffix)
    }
});

const upload = multer({ storage: storage });

router.get('/allmovies', getAllmovies);
router.post('/addmovies', upload.single('image'), addMovieValidator, addMovieData);

export default router;