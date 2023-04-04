import { logger } from "./logger";

import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, body: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'okorieifeanyi4u@gmail.com',
            pass: 'chinomso',
        },
    });

    const mailOptions = {
        from: 'Ifeanyi <okorieifeanyi4u@gmail.com>',
        to,
        subject,
        text: body,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info(`Email sent: ${info.messageId}`);
    } catch (error) {
        logger.error(`Error sending email: ${error}`);
    }
}