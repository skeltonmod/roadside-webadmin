import { auth } from "../../utils/lucia";
import { fail, redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	// let's get the session from the locals
	const session = await locals.auth.validate();

	if (!session) {
		return {};
	}

	throw redirect(303, '/');
});

export const actions = {
	login: async ({ request, locals }) => {
		const { username, password } = Object.fromEntries(await request.formData());

		console.log({
			username,
			password
		});

		try {
			const key = await auth.useKey('username', username, password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			console.log(session);
			locals.auth.setSession(session);
		} catch (error) {
			console.error(error);
			return fail(400);
		}

		throw redirect(303, '/');
	}
} 