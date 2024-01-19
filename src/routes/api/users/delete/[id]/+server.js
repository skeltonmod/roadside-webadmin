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
    await prisma.user.delete({
        where: {
            id
        }
    });

    return json({message: "User Successfully Deleted"});
}