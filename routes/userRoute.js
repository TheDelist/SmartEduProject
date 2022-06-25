const express=require('express');
const authController =require('../controllers/authController');
const authMiddleware =require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User=require('../models/User');
const router=express.Router();

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),
        body('email').isEmail().withMessage('Please Valid Email ')
        .custom((userEmail)=>{
            return User.findOne({email:userEmail}).then(user=>{
                if(user){
                    return Promise.reject('Email is already exists')
                }
            })
        })
        ,




        body('pasword').not().isEmpty().withMessage('Please Enter a password'),


    ]
    ,authController.createUser); //users/signup
router.route('/login').post(authController.loginUser); //users/signup
router.route('/logout').get(authController.logoutUser); //users/signup
router.route('/dashboard').get(authMiddleware,authController.getDashBoardPage); //users/signup
router.route('/:id').delete(authController.deleteUser); //users/signup


module.exports=router;