import { auth } from '../../../../../utils/lucia.js';
import {json, error} from '@sveltejs/kit';
import prisma from '../../../../../utils/client.js';

export async function GET({request, cookies, params}){
    const authRequest = auth.handleRequest({request, cookies});
    const session = await authRequest.validateBearerToken();

    if(!session){
        throw error(401, 'Forbidden');
    }
    const id = params.id;
    console.log(id);
    

    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            email_verified: true
        }
    });

    return json({message: "User Successfully Activiated"});
}