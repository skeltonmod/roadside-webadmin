// @ts-nocheck
import prisma from '../../../../utils/client';
import { auth } from '../../../../utils/lucia';
import { json, error } from '@sveltejs/kit';
import { generateEmailToken, sendMail } from './lib/helper';

export async function POST({ request }) {
	const { password, email, role, details, location } = await request.json();
	try {
		const user = await auth.createUser({
			key: {
				providerId: 'email', // auth method
				providerUserId: email.toLowerCase(), // unique id when using "email" auth method
				password // hashed by Lucia
			},
			attributes: {
				email: email.toLowerCase(),
			}
		});
		
		await prisma.userDetail.create({
			data: {
				role,
				details: {...details},
				user_id: user.userId,
				location
			}
		});

		const response = await prisma.user.findFirst({
			where: {
				id: user.userId
			},
            include: {
                details: true
            }
		});

		const token = await generateEmailToken(user.userId);
		console.log("Connection Data", {
			host: import.meta.env.VITE_MAIL_HOST,
			port: import.meta.env.VITE_MAIL_PORT,
			secure: true,
			auth: {
				user: import.meta.env.VITE_MAIL_USERNAME,
				pass: import.meta.env.VITE_MAIL_PASSWORD
			},
			from: import.meta.env.VITE_MAIL_FROM_ADDRESS
		});

		await sendMail(email, token);
		return json(response);
	} catch (e) {
		// check for unique constraint error in user table
		console.log(e);
		throw error(500, `Something went wrong: ${e}`)
	}
}
