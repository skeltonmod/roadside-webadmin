// @ts-nocheck
import prisma from '../../../../utils/client';
import { auth } from '../../../../utils/lucia';
import { json, error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { email, password } = await request.json();
	const key = await auth.useKey('email', email, password);
	const session = await auth.createSession({
		userId: key.userId,
		attributes: {}
	});

	if (!session) {
		throw error(401, 'Invalid Credentials YAWA KA');
	}

	const authRequest = auth.handleRequest({ request: request, cookies: request.headers });
	authRequest.setSession(session);

	const user = await prisma.user.findFirst({
		where: {
			id: key.userId
		},
		include: {
			details: true
		}
	});

	if(!user.email_verified){
		throw error(401, "Account not yet verified");
	}

	if(user.details.role == 'shop' || user.details.role == 'mechanic'){
		if(!user.details.approved){
			throw error(401, "Account not yet approved by the admin");
		}
	}

	switch (user.details.role) {
		case 'owner':
			break;

		case 'mechanic':
			// eslint-disable-next-line no-case-declarations
			try {
				// const { data, error } = await supabase.from('active_mechanics').insert([{ user: user, user_id: user.id }]).select("*");
				// console.log("Data", data);
				console.log("Error", error);
			} catch (e) {
				console.log(e);
			}
			break;

		case 'shop':
			break;
	}

	return json({ ...authRequest, user });
}
