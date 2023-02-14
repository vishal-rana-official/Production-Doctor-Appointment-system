const doctorModel = require("../models/doctorModel")

const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: 'doctor data fetch successfully',
            data: doctor
        })
    } catch (error) {
        res.status(500).send({
            error,
            message: "error in getdoctor info controlller",
            success: false
        })
    }
}

const updateProfileController = async( req, res)=>{
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body)
        res.status(201).send({
            success: true,
            message: 'doctor profile updated successfully',
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error,
            message: "error in update doctor profile controlller",
            success: false
        })
    }
}

const getDoctorByIdController = async (req,res ) =>{
    try {
        const doctor = await doctorModel.findOne({_id: req.body.doctorId});
        res.status(200).send({
            success: true,
            message: 'single doctor details fecthed successfully',
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error,
            message: "error in get doctor by id controlller",
            success: false
        })
    }
}

module.exports = { getDoctorInfoController, updateProfileController, getDoctorByIdController }