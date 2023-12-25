// @ts-nocheck
import prisma from '../../../../utils/client';
import { auth } from '../../../../utils/lucia';
import { json, error } from '@sveltejs/kit';

export async function POST({ request }) {
	const { password, email, role, details } = await request.json();
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
				user_id: user.userId
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
		return json(response);
	} catch (e) {
		// check for unique constraint error in user table
		console.log(e);
		throw error(500, `Something went wrong: ${e}`)
	}
}
