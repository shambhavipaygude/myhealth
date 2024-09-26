const { Doctor, Patient, Conversation, Text, sequelize } = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Configure Nodemailer with your app password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shambhavi.paygude@gmail.com', // Replace with your email
        pass: 'mdjz uyte obfy eojg' // Replace with your app password generated from Google
    },
    tls: {
        rejectUnauthorized: false // This will allow sending emails with self-signed certificates
    }
});

const handleErrors_doctor = (err) => {
    let errorF = { doctor_name: "", doctor_email: "", specialisation: ""};
    if (err.name === 'SequelizeUniqueConstraintError') {
        errorF.doctor_email = "That email is already registered";
    }
    if (err.name === 'SequelizeValidationError') {
        err.errors.forEach((error) => {
            errorF[error.path] = error.message;
        });
    }
    return errorF;
};

const handleErrors_patient = (err) => {
    let errorF = { patient_name:"", patient_email:"", patient_age:""};
    if (err.name === 'SequelizeUniqueConstraintError') {
        errorF.patient_email = "That email is already registered";
    }
    if (err.name === 'SequelizeValidationError') {
        err.errors.forEach((error) => {
            errorF[error.path] = error.message;
        });
    }
    return errorF;
};

module.exports.doctorSignup_get = (req, res) => {
    res.render('doctorSignup');
};

module.exports.patientSignup_get = (req, res) => {
    res.render('patientSignup');
};

module.exports.docList_get = (req, res) => {
    res.render('docList');
};

// module.exports.patientChat_get = (req, res) => {
//     res.render('patientChat');
// };

module.exports.doctorSignup_post = async (req, res) => {
    console.log("POST /doctor/signup called");
    console.log("Request headers:", req.headers);
    console.log("Request body before processing:", req.body); // Log the request body

    const { doctor_name, doctor_email, specialisation } = req.body;
    console.log("Processed request body:", { doctor_name, doctor_email, specialisation }); // Log the processed body
    const doctorPassword = crypto.randomBytes(8).toString('hex');

    try {
        const doctor = await Doctor.create({ doctor_name, doctor_email, specialisation, doctor_password: doctorPassword });
        console.log("Doctor created:", doctor);

        const mailOptions = {
            from: 'shambhavi.paygude@gmail.com', // Replace with your email
            to: doctor_email,
            subject: 'Your Account Password',
            text: `Your account has been created. Your password is: ${doctorPassword}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        //res.status(201).json(doctor);

    } catch (err) {
        console.error("Error creating doctor:", err);
        const errors = handleErrors_doctor(err);
        res.status(400).json({ errors });
    }
};

module.exports.patientSignup_post = async (req, res) => {
    const { patient_name, patient_email, patient_age } = req.body;
    console.log("Processed request body:", { patient_name, patient_email, patient_age }); // Log the processed body
    const patientPassword = crypto.randomBytes(8).toString('hex');

    try {
        const patient = await Patient.create({ patient_name, patient_email, patient_age, patient_password: patientPassword });
        console.log("Doctor created:", patient);

        const mailOptions = {
            from: 'shambhavi.paygude@gmail.com', // Replace with your email
            to: patient_email,
            subject: 'Your Account Password',
            text: `Your account has been created. Your password is: ${patientPassword}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        //res.status(201).json(doctor);

    } catch (err) {
        console.error("Error creating patient:", err);
        const errors = handleErrors_patient(err);
        res.status(400).json({ errors });
    }
};

module.exports.doctorLogin_get = (req, res) => {
    res.render('doctorLogin');
};

module.exports.patientLogin_get = (req, res) => {
    res.render('patientLogin');
};

module.exports.patientHome_get = (req, res) => {
    const patient_name = req.session.patient_name;
    if (patient_name) {
        res.render('patientHome', { patient_name });
    } else {
        res.redirect('/patient/login'); // Redirect to login if email is not in session
    }
};

module.exports.doctorHome_get = (req, res) => {
    const doctor_name = req.session.doctor_name;
    if (doctor_name) {
        res.render('doctorHome', { doctor_name });
    } else {
        res.redirect('/doctor/login'); // Redirect to login if email is not in session
    }
};

module.exports.doctorLogin_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Log the email and password received in the request
        console.log("Login attempt with email:", email);

        const doctor = await Doctor.findOne({ where: { doctor_email: email, doctor_password: password } });

        if (doctor) {
            // Log successful login
            console.log("Login successful for email:", email);
            req.session.doctor_id = doctor.doctor_id; // Save patient_id in session
            req.session.doctor_name = doctor.doctor_name;
            res.status(200).json({ doctor });
            
        } else {
            // Log unsuccessful login attempt
            console.log("Login failed for email:", email);
            res.status(400).json({ error: "Email or password incorrect" });
        }
    } catch (err) {
        // Log the error details
        console.error("Error during login attempt:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports.patientChat_get = async (req, res) => {
    try {
        const messages = await Conversation.findAll({
            order: [['text_time', 'ASC']]
        });
        res.render('patientChat', { messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.patientChat_post = async (req, res) => {
    const { text_message, user_type } = req.body;
    if (!text_message|| !user_type) {
        return res.status(400).json({ error: 'Text and user type are required' });
    }
    try {
        const newMessage = await Conversation.create({ text_message, user_type, text_time: new Date() });
        res.json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.getDoctorsBySpecialisation = async (req, res) => {
    const { specialisation } = req.query;
    try {
        console.log('Fetching doctors for specialization:', specialisation); // Add this line
        const doctors = await Doctor.findAll({ where: { specialisation } });
        res.render('docList', { specialisation, doctors });
    } catch (err) {
        console.error('Error fetching doctors:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports.storeMessages = async (req, res) => {
    const { doctor_id, patient_id } = req.query;
    try {
        const doctor = await Doctor.findByPk(doctor_id);
        const patient = await Patient.findByPk(patient_id);

        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }

        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        // Check for existing conversation
        let conversation = await Conversation.findOne({
            where: {
                doctor_id: doctor_id,
                patient_id: patient_id
            }
        });

        // Create a new conversation if not found
        if (!conversation) {
            conversation = await Conversation.create({ doctor_id, patient_id });
        }

        // Render the chat page with the convo_id
        res.render('chatPage', { doctor, patient, convo_id: conversation.convo_id });
    } catch (err) {
        console.error('Error fetching doctor or patient:', err);
        res.status(500).send('Something went wrong');
    }
};


module.exports.sendMessage = async (req, res) => {
    const { convo_id, sender_type, message } = req.body; // Assuming convo_id is already available in the request body
    try {
        // Validate that convo_id, sender_type, and message are provided
        if (!convo_id || !sender_type || !message) {
            return res.status(400).send('convo_id, sender_type, and message are required');
        }

        // Create new message
        const newMessage = await Text.create({
            convo_id,
            sender_type,
            message,
            timestamp: new Date()
        });
        console.log(newMessage);
        res.status(200).json(newMessage);
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).send('Something went wrong');
    }
};




module.exports.loadMessages = async (req, res) => {
    const { convo_id } = req.query;
    try {
        const messages = await Text.findAll({
            where: { convo_id },
            order: [['timestamp', 'ASC']]
        });
        res.status(200).json(messages);
    } catch (err) {
        console.error('Error loading messages:', err);
        res.status(500).send('Something went wrong');
    }
};


module.exports.patientLogin_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Log the email and password received in the request
        console.log("Login attempt with email:", email);

        const patient = await Patient.findOne({ where: { patient_email: email, patient_password: password } });

        if (patient) {
            // Log successful login
            console.log("Login successful for email:", email);
            req.session.patient_id = patient.patient_id; // Save patient_id in session
            req.session.patient_name = patient.patient_name;
            res.status(200).json({ patient });
        } else {
            // Log unsuccessful login attempt
            console.log("Login failed for email:", email);
            res.status(400).json({ error: "Email or password incorrect" });
        }
    } catch (err) {
        // Log the error details
        console.error("Error during login attempt:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports.getChatPage = async (req, res) => {
    const { doctor_id } = req.query;
    try {
        const doctor = await Doctor.findByPk(doctor_id);
        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }

        const patient_id = req.session.patient_id; // Retrieve patient_id from session

        // Find or create the conversation
        let conversation = await Conversation.findOne({
            where: {
                doctor_id: doctor_id,
                patient_id: patient_id
            }
        });

        let convo_id;

        if (conversation) {
            convo_id = conversation.convo_id;
        } else {
            conversation = await Conversation.create({ doctor_id, patient_id });
            convo_id = conversation.convo_id;
        }

        res.render('chatPage', { doctor, convo_id, patient_id });
    } catch (err) {
        console.error('Error fetching doctor or creating conversation:', err);
        res.status(500).send('Something went wrong');
    }
};

module.exports.getConversationId = async (req, res) => {
    const { doctor_id } = req.body;
    const patient_id = req.session.patient_id;

    try {
        const conversation = await Conversation.findOne({ 
            where: { 
                doctor_id,
                patient_id
            }
        });
    
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        // console.log("doctor id : ",doctor_id)
        // console.log("patient id : ",patient_id)
        // console.log("convo id : ",conversation.convo_id)
        res.status(200).json({ convo_id: conversation.convo_id });
    } catch (err) {
        console.error('Error fetching conversation ID:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports.getConversationId_doc = async (req, res) => {
    const { patient_id } = req.body;
    const doctor_id = req.session.doctor_id;
    

    try {
        const conversation = await Conversation.findOne({ 
            where: { 
                doctor_id,
                patient_id
            }
        });
    
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        // console.log("doctor id : ",doctor_id)
        // console.log("patient id : ",patient_id)
        // console.log("convo id : ",conversation.convo_id)
        res.status(200).json({ convo_id: conversation.convo_id });
    } catch (err) {
        console.error('Error fetching conversation ID:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports.getDoctorInbox = async (req, res) => {
    const doctor_id = req.session.doctor_id;

    try {
        const conversations = await Conversation.findAll({
            where: { doctor_id },
            include: [{ model: Patient, attributes: ['patient_id', 'patient_name'] }]
        });

        const formattedConversations = conversations.map(convo => ({
            patient_id: convo.patient_id,
            patient_name: convo.Patient.patient_name
        }));

        res.render('doctorInbox', { formattedConversations });
    } catch (err) {
        console.error('Error fetching inbox messages:', err);
        res.status(500).send('Something went wrong');
    }
};

module.exports.getChatPage_doctor = async (req, res) => {
    const doctor_id = req.session.doctor_id;
    const { patient_id } = req.query;

    try {
        const patient = await Patient.findByPk(patient_id);
        if (!patient) {
            return res.status(404).send('Patient not found');
        }

        // Find or create the conversation
        let conversation = await Conversation.findOne({
            where: {
                doctor_id: doctor_id,
                patient_id: patient_id
            }
        });

        let convo_id;

        if (conversation) {
            convo_id = conversation.convo_id;
        } else {
            conversation = await Conversation.create({ doctor_id, patient_id });
            convo_id = conversation.convo_id;
        }

        res.render('chatPage_doctor', { doctor_id, convo_id, patient_id, doctor_name: req.session.doctor_name });
    } catch (err) {
        console.error('Error fetching patient or creating conversation:', err);
        res.status(500).send('Something went wrong');
    }
};