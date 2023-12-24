import prisma from "../../../../utils/client";
import { auth } from "../../../../utils/lucia";
import { error, json } from "@sveltejs/kit";

export async function POST({request, cookies}){
    const {details} = await request.json();
    const authRequest = auth.handleRequest({request, cookies});
    const session = await authRequest.validateBearerToken();

    if(!session){
        throw error(401, 'Forbidden');
    }

    const user = await prisma.userDetail.update({
        where: {
            user_id: session.user.userId
        },
        data: {
            details
        }
    });

    return json(user);
}