import { json, error } from '@sveltejs/kit';
import { auth } from '../../../../utils/lucia.js';
import prisma from '../../../../utils/client.js';
import supabase from '../../../../utils/supabase.js';

export async function POST({ request, cookies }) {
    const { request_id, owner_rating, mechanic_rating, amount } = await request.json();
    const authRequest = auth.handleRequest({ request, cookies });
    const session = await authRequest.validateBearerToken();

    if (!session) {
        throw error(401, 'Forbidden');
    }
    const booking = await prisma.request.findUnique({
        where: {
            id: request_id
        }
    });

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.userId
        },
        include: {
            details: true
        }
    });

    let status = booking?.status;

    if (booking?.owner_rating || booking?.mechanic_rating) {
        status = "completed"

        const { data, error } = await supabase.from('active_mechanics').update({
            request: null
        }).match({
            user_id: session.user.userId
        });

        console.log(data);
        console.log(error);
    }

    const data = await prisma.request.update({
        where: {
            id: request_id
        },
        data: user?.details?.role === 'owner' ? {
            status,
            owner_rating,
            mechanic_rating
        } : {
            status,
            owner_rating,
            mechanic_rating,
            amount
        }
    });

    return json(data);
}