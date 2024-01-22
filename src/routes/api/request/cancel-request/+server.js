import { json, error } from '@sveltejs/kit';
import { auth } from '../../../../utils/lucia.js';
import prisma from '../../../../utils/client.js';
import supabase from '../../../../utils/supabase.js';

export async function POST({request, cookies}){
    const {request_id} = await request.json();
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

    await prisma.request.delete({
        where: {
            id: request_id
        }
    });

    return json({message: 'Request Deleted due to inactivity'});
}