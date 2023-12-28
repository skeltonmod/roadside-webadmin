import { auth } from '../../../../utils/lucia';
import { json, error } from '@sveltejs/kit';
import prisma from '../../../../utils/client';
import supabase from '../../../../utils/supabase';

export async function GET({request, cookies}){
    const authRequest = auth.handleRequest({request, cookies});
    const session = await authRequest.validateBearerToken();

    if(!session){
        throw error(422, 'You are already logged out');
    }

    const user = await prisma.user.findFirst({
		where: {
			id: session.user.userId
		},
		include: {
			details: true
		}
	});

	switch (user?.details.role) {
		case 'owner':
			break;

		case 'mechanic':
			// eslint-disable-next-line no-case-declarations
			const { error } = await supabase
            .from('active_mechanics')
            .delete()
            .eq('user_id', user?.id)
			break;

		case 'shop':
			break;
	}

    authRequest.invalidate();

    return json({message: 'Logged out'});
}