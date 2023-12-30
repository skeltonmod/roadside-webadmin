import { json, error } from "@sveltejs/kit";
import { auth } from "../../../../utils/lucia";
import prisma from "../../../../utils/client";
import supabase from "../../../../utils/supabase";

export async function GET({request, cookies, params}){
    const authRequest = auth.handleRequest({request, cookies});
    const session = await authRequest.validateBearerToken();

    if(!session){
        throw error(401, 'Forbidden');
    }
    const id = params.id;
    let image = null;
    const car = await prisma.cars.findUnique({
        where: {
            id,
            user_id: session.user.userId
        }
    });

    if(car?.image){
        const {data} = await supabase.storage.from('roadside-images').createSignedUrl(car.image, 360);
        image = data?.signedUrl;
    }

    return json({...car, image});
}