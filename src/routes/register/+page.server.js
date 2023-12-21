import { auth } from '../../utils/lucia';

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		// basic check
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return new Response('Invalid password', {
				status: 400
			});
		}
		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email', // auth method
					providerUserId: email.toLowerCase(), // unique id when using "email" auth method
					password // hashed by Lucia
				},
				attributes: {
					email: email.toLowerCase()
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			const sessionCookie = auth.createSessionCookie(session);
			return new Response(null, {
				headers: {
					Location: '/', // profile page
					'Set-Cookie': sessionCookie.serialize() // store session cookie
				},
				status: 302
			});
		} catch (e) {
			// this part depends on the database you're using
			// check for unique constraint error in user table

			return new Response('An unknown error occurred', {
				status: 500
			});
		}
	}
};
