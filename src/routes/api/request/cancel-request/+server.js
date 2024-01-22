import { json, error } from '@sveltejs/kit';
import { auth } from '../../../../utils/lucia.js';
import prisma from '../../../../utils/client.js';
import supabase from '../../../../utils/supabase.js';

export async function GET({request, cookies}){
    const authRequest = auth.handleRequest({ request, cookies });
	const session = await authRequest.validateBearerToken();

    if (!session) {
        throw error(401, 'Forbidden');
    }

    await supabase.from('active_mechanics').update({
        request: null
    }).match({
        user_id: session.user.userId
    });

    await prisma.request.deleteMany({
        where: {
            status: 'pending',
            createdAt: {
                lt: new Date(new Date() - 5 * 60 * 1000)
            }
        }
    });

    return json({message: 'Request Deleted due to inactivity'});
}