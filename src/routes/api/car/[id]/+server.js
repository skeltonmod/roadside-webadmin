import { json } from "@sveltejs/kit";
import { auth } from "../../../../utils/lucia";
import prisma from "../../../../utils/client";

export async function GET({request, cookies}){
    const authRequest = auth.handleRequest({request, cookies});
    const session = await authRequest.validateBearerToken();

    if(!session){
        throw error(401, 'Forbidden');
    }
    const id = request.params.id;

    const car = await prisma.cars.findUnique({
        where: {
            id,
            user_id: session.user.userId
        }
    });

    return json(car);
}