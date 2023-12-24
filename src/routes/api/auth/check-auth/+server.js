import prisma from '../../../../utils/client';
import { auth } from '../../../../utils/lucia';
import { error, fail, json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function GET({request, cookies}) {
    const authRequest = auth.handleRequest({request, cookies});
    const session = await authRequest.validateBearerToken();

    if(!session){
        throw error(401, 'Forbidden');
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.userId
        },
        include: {
            details: true
        }
    });

    return json({...session, user});
}