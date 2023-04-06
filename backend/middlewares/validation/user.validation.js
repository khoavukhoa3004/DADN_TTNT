const {check, validationResult} = require('express-validator');
const validator = require('validator');


exports.validateUserSignUp = [
    check('fName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('FName is required')
        .isString()
        .withMessage('First name must be a valid name')
        .isLength({min: 3, max: 20})
        .withMessage('Name must be within 3 to character!'),
    check('lName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Last name must be a valid name')
        .isLength({min: 3, max: 20})
        .withMessage('Name must be within 3 to character!'),
    check('email')
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Email is empty!')
        .isEmail()
        .withMessage('Invalid email'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is empty!')
        .isLength({min: 8, max: 20})
        .withMessage('Password must be 8 to 20 characters long'),
    check('confirmPassword')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Confirm password is empty!')
        .custom((value, {req})=>{
            if(value !== req.body.password){
                throw new Error('Both password must be same!');
            }
            return true;
        }),
    check('dateOfBirth')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Birth day must be required!')
        .custom((value)=>{
            if(!validator.isISO8601(value, { strict: true})){
                throw new Error('Invalid Birth day format, must be YYYY-MM-DD');
            }
            // const date = new Date(value);
            return true;
        }),
    check('phoneNumber')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Phone must not be empty!')
        .isLength({min: 3, max: 20})
        .withMessage('Phone number must be within 3 to character!')
        .custom((value)=> {
            if (!validator.isMobilePhone(value, 'any')) {
                throw new Error('Invalid phone number');
            }
            return true;
        }),

];

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
    console.log(result);
    if(!result.length){
        return next();
    }
    const error = result[0].msg;
    res.json({success: false, message: error});
};