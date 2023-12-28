import { json, error } from "@sveltejs/kit";
import { auth } from "../../../../utils/lucia";
import prisma from "../../../../utils/client";

export async function GET({request, cookies}){
    const authRequest = auth.handleRequest({request, cookies});
    const session = await authRequest.validateBearerToken();

    if(!session){
        throw error(401, 'Forbidden');
    }

    const user_detail = await prisma.userDetail.findUnique({
        where: {
            user_id: session.user.userId
        }
    });

    if(user_detail?.role !== 'owner'){
        throw error(401, 'You are not allowed to view this page');
    }

    const shops = await prisma.userDetail.findMany({
        where: {
            role: 'shop',
            OR: [
                {
                    role: 'shop'
                },
                {
                    role: 'mechanic'
                }
            ]
        },

    });



    return json(shops);
}