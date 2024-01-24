import { auth } from '../../../../utils/lucia.js';
import { json } from '@sveltejs/kit';
import { validateEmailToken } from '../../auth/register/lib/helper.js';

export const GET = async ({ params, locals }) => {
	const { token } = params;
	try {
		const userId = await validateEmailToken(token);
		const user = await auth.getUser(userId);
		await auth.invalidateAllUserSessions(user.userId);
		await auth.updateUserAttributes(user.userId, {
			email_verified: true // `Number(true)` if stored as an integer
		});
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/email-verification"
			}
		});
	} catch(e) {
		console.log("Error", e);
		return new Response("Invalid email verification link", {
			status: 400
		});
	}
};