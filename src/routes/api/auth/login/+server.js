// @ts-nocheck
import { auth } from '../../../../utils/lucia';
import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({request, cookies}) {
    const {email, password} = await request.json();
    const key = await auth.useKey("email", email, password);
    const session = await auth.createSession({
        userId: key.userId,
        attributes: {}
    });
    const authRequest = auth.handleRequest({request: request, cookies: request.headers});
    authRequest.setSession(session);
    return json(authRequest);
}
