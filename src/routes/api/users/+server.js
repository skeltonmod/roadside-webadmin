import { json, error } from "@sveltejs/kit";
import { auth } from "../../../utils/lucia";
import prisma from "../../../utils/client";
import supabase from "../../../utils/supabase.js";

export async function GET({request, cookies}){
    const authRequest = auth.handleRequest({ request, cookies });
	const session = await authRequest.validateBearerToken();

	if (!session) {
		throw error(401, 'Forbidden');
	}

    const users = await prisma.user.findMany({
        include: {
            details: true,
            reporter: true
        }, 
        where: {
            id: {
                not: session.user.userId
            }
        }
    });

    for(let i = 0; i < users.length; ++i){
        const user = users[i];
        if(user.details.details.id_image){
            // console.log(user.details.details.id_image)
            const { data } = supabase.storage.from('roadside-images').getPublicUrl(user.details.details.id_image.path);
            user.details.details.id_image = data.publicUrl
        }
        if(user.details.details.permit_image){
            const { data } = supabase.storage.from('roadside-images').getPublicUrl(user.details.details.permit_image.path);
            user.details.details.permit_image = data.publicUrl
        }
        console.log(user.details);
    }

    

    return json(users);
}