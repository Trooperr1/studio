require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Contact Form API
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Email to Jaff Studio (notification)
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL || 'contact@jaffstudio.com',
            subject: `New Contact Form Submission - ${service || 'General Inquiry'}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Service:</strong> ${service || 'Not specified'}</p>
                <h3>Message:</h3>
                <p>${message}</p>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Auto-reply to user
        const autoReply = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Thank you for contacting Jaff Studio',
            html: `
                <h2>Thank you for reaching out, ${name}!</h2>
                <p>We have received your message and will get back to you within 24-48 hours.</p>
                <p>In the meantime, feel free to explore our services at <a href="https://jaffstudio.com">jaffstudio.com</a></p>
                <br>
                <p>Best regards,</p>
                <p><strong>Jaff Studio Team</strong></p>
            `
        };

        await transporter.sendMail(autoReply);

        res.json({ success: true, message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// Booking Form API
app.post('/api/booking', async (req, res) => {
    try {
        const { name, email, phone, company, service, meetingType, date, time, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !service || !meetingType || !date || !time) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields'
            });
        }

        // Email to Jaff Studio (booking notification)
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL || 'contact@jaffstudio.com',
            subject: `New Booking Request - ${service}`,
            html: `
                <h2>New Booking Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Meeting Type:</strong> ${meetingType}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <h3>Additional Notes:</h3>
                <p>${message || 'None'}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        // Confirmation email to user
        const confirmation = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Booking Confirmation - Jaff Studio',
            html: `
                <h2>Booking Confirmed!</h2>
                <p>Dear ${name},</p>
                <p>Your consultation has been scheduled:</p>
                <ul>
                    <li><strong>Service:</strong> ${service}</li>
                    <li><strong>Date:</strong> ${date}</li>
                    <li><strong>Time:</strong> ${time}</li>
                    <li><strong>Meeting Type:</strong> ${meetingType}</li>
                </ul>
                <p>We will send you meeting details shortly.</p>
                <br>
                <p>Best regards,</p>
                <p><strong>Jaff Studio Team</strong></p>
            `
        };

        await transporter.sendMail(confirmation);

        res.json({ success: true, message: 'Booking confirmed! Check your email for details.' });

    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process booking. Please try again later.'
        });
    }
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
