import { json, error } from '@sveltejs/kit';
import { auth } from '../../../../utils/lucia.js';
import prisma from '../../../../utils/client.js';

export async function POST({request, cookies}){
    const {request_id, owner_rating, mechanic_rating, amount} = await request.json();
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

    let status = booking?.status;

    if(booking?.owner_rating || booking?.mechanic_rating){
        status = "completed"
    }

    const data = await prisma.request.update({
        where: {
            id: request_id
        },
        data: {
            status,
            owner_rating,
            mechanic_rating,
            amount
        }
    });

    return json(data);
}