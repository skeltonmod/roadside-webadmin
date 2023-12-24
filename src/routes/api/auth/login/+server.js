// @ts-nocheck
import prisma from '../../../../utils/client';
import { auth } from '../../../../utils/lucia';
import { json, error } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    const {email, password} = await request.json();
    const key = await auth.useKey("email", email, password);
    const session = await auth.createSession({
        userId: key.userId,
        attributes: {}
    });

    if(!session){
        throw error(401, 'Invalid Credentials YAWA KA');
    }

    const authRequest = auth.handleRequest({request: request, cookies: request.headers});
    authRequest.setSession(session);

    const user = await prisma.user.findFirst({
        where: {
            id: key.userId
        },
        include: {
            details: true
        }
    });



    return json({...authRequest, user});
}
