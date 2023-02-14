const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const doctorModel= require('../models/doctorModel')

// register callback
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({ message: "user already exists", success: false })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({ message: "registerd successfully", success: true })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `register controller ${message.error}` })
    }
}

// login callback
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email})
        if(!user){
            return res.status(200).send({message: "user not found ",success: false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({message: "invalid email or password ", success: false})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.status(200).send({message: "login successfully", success: true, token})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: `error in login ctrl ${error.message}`})
    }
 }

 const authController = async( req, res )=>{
    try {
        const user = await userModel.findById({_id: req.body.userId})
        user.password = undefined;
    if(!user){
        return res.status(200).send({
            message: "user not found",
            success: false
        })
    }
    else{
        res.status(200).send({
            success: true,
            data: user
        })
    }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "auth failed",
            success: false,
            error
        })
    }
 }
 // apply for  a doctor
 const applyDoctorController = async(req,res ) =>{
    try {
        const newDoctor = await doctorModel({...req.body, status: 'pending'})
        await newDoctor.save()
        const adminUser = await userModel.findOne({ isAdmin: true})
        const notification = adminUser.notification
        notification.push({
            type: "apply doctor request",
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data: {
                doctorid: newDoctor._id,
                name: newDoctor.firstName + ' '+ newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification })
        res.status(201).send({
            success: true,
            message: 'doctor account applied successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:" error while applying for doctor",
            error,
            success: false
        })
    }
 }

// get all notification 
 const getAllNotificationController = async(req,res) =>{
    try {
        const user = await userModel.findOne({ _id: req.body.userID})
        const seennotification = user.seennotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = seennotification
        const updatedUser = await user.save()
        res.status(200).send({
            success: true,
            message: " all notifications are marked as seen",
            data: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "error in get all notification in usercntrl",
            error,
            success: false
        })
    }
 }

 const deleteAllNotificationController = async(req, res) =>{
    try {
        const user  =  await userModel.findOne({ _id: req.body.userID})
        user.notification = []
        user.seennotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined;
        res.status(201).send({
            success: true,
            message: "All notifications deleted successfully",
            data: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'error in delete all notifications controller',
            error,
            success: false
        })
    }
 }

 const getAllDoctorController = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({ status: "approved"})
        res.status(201).send({
            success: true,
            message: "All doctors list fetched successfully successfully",
            data: doctors 
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'error in get all doctor in userctrl controller',
            error,
            success: false
        })
    }
 }

module.exports = { loginController,getAllDoctorController, registerController, authController, applyDoctorController,deleteAllNotificationController, getAllNotificationController };