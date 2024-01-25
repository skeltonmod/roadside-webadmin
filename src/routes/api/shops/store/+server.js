import { json, error } from "@sveltejs/kit";
import { auth } from "../../../../utils/lucia.js";
import prisma from "../../../../utils/client.js";

export async function POST({ request, cookies }) {
    const { name, location, address, specialities, permit_image } = await request.json();
    const authRequest = auth.handleRequest({ request, cookies });
    const session = await authRequest.validateBearerToken();

    if (!session) {
        throw error(401, 'Forbidden');
    }

    const shop = await prisma.shops.create({
        data: {
            name,
            location,
            specialities,
            address,
            permit_image: (permit_image !== undefined || permit_image !== null) ? permit_image.path : undefined,
            user_id: session.user.userId
        }
    });

    return json(shop)
}