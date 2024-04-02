import { signIn, signup } from '../controller/UserController';
import { loginValidator, signupValidator } from '../utils/helper'
import * as express from 'express'
import * as multer from 'multer'
import * as fs from 'fs'

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/images';
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Check if the file type is either jpg or png
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, signIn);


export default router;