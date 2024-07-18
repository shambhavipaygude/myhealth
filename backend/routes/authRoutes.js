const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.get("/doctor/signup", authController.doctorSignup_get);
router.get("/patient/signup", authController.patientSignup_get);
router.get("/doctor/login", authController.doctorLogin_get);
router.get("/patient/login", authController.patientLogin_get);

router.get("/patient/chat", authController.getChatPage);
router.post("/patient/chat/send", authController.sendMessage);
router.post("/patient/chat/store", authController.storeMessages); 
router.get("/patient/chat/messages", authController.loadMessages);

// Add route to fetch conversation ID based on doctor_id and patient_id
router.post("/patient/chat", authController.getConversationId);
router.post("/doctor/chat", authController.getConversationId_doc);

router.get('/doctor/inbox', authController.getDoctorInbox);
router.get("/doctor/chat", authController.getChatPage_doctor);
router.post("/doctor/chat/send", authController.sendMessage);
router.post("/doctor/chat/store", authController.storeMessages); 
router.get("/doctor/chat/messages", authController.loadMessages);


router.get("/patient/home", authController.patientHome_get);
router.get("/doctor/home", authController.doctorHome_get);
router.get("/doctor/list", authController.getDoctorsBySpecialisation);
//router.post("/patient/chat", authController.patientChat_post);

router.post("/doctor/signup", authController.doctorSignup_post);
router.post("/patient/signup", authController.patientSignup_post);
router.post("/doctor/login", authController.doctorLogin_post);
router.post("/patient/login", authController.patientLogin_post);

module.exports = router;
