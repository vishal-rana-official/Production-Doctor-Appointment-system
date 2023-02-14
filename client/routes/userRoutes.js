const express = require('express');
const { loginController, registerController,getAllDoctorController, authController, deleteAllNotificationController, applyDoctorController, getAllNotificationController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//router object
const router = express.Router();

//routes
// login || post
router.post('/login',loginController);

// register || post 
router.post('/register',registerController)

// auth || post
router.post('/getUserData', authMiddleware, authController)

// apply doctor || post
router.post('/apply-doctor', authMiddleware, applyDoctorController)

// notification doctor || post
router.post('/get-all-notification', authMiddleware, getAllNotificationController)

// notification delete doctor || post
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController)

//get all doctors
router.get('/getAllDoctors', authMiddleware, getAllDoctorController)

module.exports = router;