import { auth } from '../../utils/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from "lucia";

export const load = async ({ locals }) => {
	// let's get the session from the locals
	const session = await locals.auth.validate();

	if (!session) {
		return {};
	}

	throw redirect(303, '/');
};

export const actions = {
	login: async ({request}) => {
		const {email, password} = Object.fromEntries(await request.formData());
		console.log({
			email,
			password
		});
		try {
			// find user by key
			// and validate password
			const key = await auth.useKey('email', email, password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			const sessionCookie = auth.createSessionCookie(session);
			console.log(sessionCookie);
			return new Response(null, {
				headers: {
					Location: '/', // profile page
					'Set-Cookie': sessionCookie.serialize() // store session cookie
				},
				status: 302
			});
			
		} catch (e) {
			if (e instanceof LuciaError && (e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')) {
				// user does not exist
				// or invalid password
				return new Response('Incorrect email of password', {
					status: 400
				});
			}
			return new Response('An unknown error occurred', {
				status: 500
			});
		}
	}
};
