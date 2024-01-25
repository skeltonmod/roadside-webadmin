import { json, error } from '@sveltejs/kit';
import { auth } from '../../../utils/lucia.js';
import prisma from '../../../utils/client.js';
import supabase from '../../../utils/supabase.js'

export async function GET({ request, cookies }) {
    const authRequest = auth.handleRequest({ request, cookies });
    const session = await authRequest.validateBearerToken();
    if (!session) {
        throw error(401, 'Forbidden');
    }

    const shops = await prisma.shops.findMany({
        where: {
            user_id: session.user.userId
        }
    });

    for (let i = 0; i < shops.length; ++i) {
        console.log(shops[i].permit_image);
        const { data } = supabase.storage.from('roadside-images').getPublicUrl(shops[i].permit_image);
        shops[i].permit_image = data.publicUrl;
    }

    return json(shops);
}
