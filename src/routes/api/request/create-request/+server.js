import { json, error } from "@sveltejs/kit";
import { auth } from "../../../../utils/lucia";
import prisma from "../../../../utils/client";

export async function POST({ request, cookies }) {
    const { car_id, mechanic_id, description } = await request.json();

    const authRequest = auth.handleRequest({ request, cookies });
    const session = await authRequest.validateBearerToken();

    if (!session) {
        throw error(401, 'Forbidden');
    }

    const booking = await prisma.request.create({
        data: {
            car_id,
            user_id: session.user.userId,
            mechanic_id,
            description
        }
    });
    return json(booking);
}