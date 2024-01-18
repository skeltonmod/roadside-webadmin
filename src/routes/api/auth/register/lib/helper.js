import { generateRandomString, isWithinExpiration } from "lucia/utils";
import prisma from "../../../../../utils/client";
import { renderMail } from "svelte-mail";
import Mail from '../Components/Mail.svelte';
import * as nodemailer from 'nodemailer';

const EXPIRES_IN = 1000 * 60 * 60 * 2;

export const generateEmailToken = async (userId) => {
    const tokens = await prisma.emailVerification.findMany({
        where: {
            user_id: userId
        }
    });

    if(tokens.length > 0){
        const reusable_tokens = tokens.find((item) => {
            return isWithinExpiration(Number(item.expires) - EXPIRES_IN / 2);
        });

        if(reusable_tokens){
            return reusable_tokens.id;
        }
    }

    const token = generateRandomString(63);
    await prisma.emailVerification.create({
        data: {
            id: token,
            expires: new Date().getTime() + EXPIRES_IN,
            user_id: userId
        }
    });

    return token;
}

export const validateEmailToken = async (token) => {
    const stored_token = await prisma.emailVerification.findUnique({
        where: {
            id: token
        }
    });

    if(!stored_token){
        throw new Error("Invalid Token");
    }

    await prisma.emailVerification.deleteMany({
        where: {
            user_id: stored_token.user_id
        }
    });

    return stored_token.user_id;
}

export const sendMail = async (email, token) => {
    const {html, text} = await renderMail(Mail, {data: {
        name: "User",
        token
    }});

    const transporter = nodemailer.createTransport({
        host: import.meta.env.VITE_MAIL_HOST,
        port: import.meta.env.VITE_MAIL_PORT,
        // service: 'gmail',
        secure: false,
        auth: {
            user: import.meta.env.VITE_MAIL_USERNAME,
            pass: import.meta.env.VITE_MAIL_PASSWORD
        },
        from: import.meta.env.VITE_MAIL_FROM_ADDRESS
    });

    await transporter.sendMail({
        to: email,
        subject: 'Email Verification',
        text,
        html
    });

    return {
        secure: true,
        auth: {
            user: import.meta.env.VITE_MAIL_USERNAME,
            pass: import.meta.env.VITE_MAIL_PASSWORD
        },
        from: import.meta.env.VITE_MAIL_FROM_ADDRESS
    };
}


