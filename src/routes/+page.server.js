import { fail, redirect } from "@sveltejs/kit";
import { auth } from "../utils/lucia";

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) throw redirect(303, '/login');

	return session;
})


export const actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();

		if (!session) return fail(401);

		// this is how we invalidate the session meang that the session is not valid anymore
		await auth.invalidateSession(session.sessionId);

		// now let's set the session to null
		locals.auth.setSession(null);

		// next we redirect to the login page
		throw redirect(303, '/login');
	}
}