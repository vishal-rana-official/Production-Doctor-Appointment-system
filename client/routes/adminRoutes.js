const express = require('express');
const { getAllUsersController, getAllDoctorController, changeAccountStatusController } = require('../controllers/adminCtrl');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router()

//get method for users
router.get('/getAllUsers',authMiddleware, getAllUsersController)

//get method for doctors
router.get('/getAllDoctors',authMiddleware, getAllDoctorController)

//post method for doctors status
router.post('/changeAccountStatus',authMiddleware, changeAccountStatusController)

module.exports = router