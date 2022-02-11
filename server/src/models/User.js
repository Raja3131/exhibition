import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match:[
            //regex for email
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Please provide a Valid email Address"
            ]
    
},
password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    //select property means that the password will not be returned in the response of the get request to the user endpoint 
    select: false
    
},
resetPasswordToken: String,
resetPasswordExpire: Date,


},)

userSchema.pre('save', async function(next){
    // if password is modified, hash the password
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
     

    })
    userSchema.methods.matchPassword = async function(enteredPassword){
        return  bcrypt.compare(enteredPassword, this.password)
    }

    userSchema.methods.getSignedToken = function(){
        return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
    }

    userSchema.methods.getResetPasswordToken = function(){
        //generate token
        const resetToken = crypto.randomBytes(32).toString('hex')
        //hash token and set to resetPasswordToken field
        this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

        //set expire
        this.resetPasswordExpire = Date.now() + 10 *(60*1000)
        return resetToken
    }

const User = mongoose.model('User', userSchema)


export default User
