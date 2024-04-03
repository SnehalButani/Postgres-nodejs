import { editProfile, signIn, signup } from '../controller/UserController';
import { editProfileValidator, loginValidator, signupValidator } from '../utils/helper'
import * as express from 'express'
import * as multer from 'multer'
import * as fs from 'fs'

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


router.post('/signup',upload.single('image'),signupValidator,signup);
router.post('/login', loginValidator, signIn);
router.put('/editprofile',upload.single('image'),editProfileValidator,editProfile);


export default router;
  