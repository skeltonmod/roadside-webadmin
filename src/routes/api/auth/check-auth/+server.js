import prisma from '../../../../utils/client';
import { auth } from '../../../../utils/lucia';
import { error, json } from '@sveltejs/kit';
import supabase from '../../../../utils/supabase';
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

    const average_ratings = await prisma.request.findMany({
        where: {
            mechanic_id: user?.details?.role == 'mechanic' ? session.user.userId : undefined,
			user_id: user?.details?.role == 'owner' ? session.user.userId : undefined,
        }
    }).then(r => {

        const totalRatings = r.reduce((acc, item) => {
            const rating = user?.details?.role == 'mechanic' ? item.mechanic_rating : item.owner_rating;
            return acc + (rating || 0)
        }, 0);
        return r.length > 0 ? totalRatings / r.length : 0;
    });

    if(user.details.details.profile_image){
        const { data } = supabase.storage.from('roadside-images').getPublicUrl(user.details.details.profile_image.path);
            user.details.details.profile_image = data.publicUrl
            user.profile_image = data.publicUrl
    }
    

    return json({...session, user, average_ratings});
}