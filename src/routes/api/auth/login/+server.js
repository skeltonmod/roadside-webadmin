// @ts-nocheck
import { auth } from '../../../../utils/lucia';

export async function POST({request}) {
    const {username, passowrd} = request.body;

    const key = await auth.useKey('email', email, password);
    
    const session = await auth.createSession({
        userId: key.userId,
        attributes: {}
    });

    const sessionCookie = auth.createSessionCookie(session);
    console.log(sessionCookie);

    return new Response(sessionCookie);
}
