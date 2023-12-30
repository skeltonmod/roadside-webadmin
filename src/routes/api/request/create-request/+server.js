import { json, error } from "@sveltejs/kit";
import { auth } from "../../../../utils/lucia";
import prisma from "../../../../utils/client";
import supabase from "../../../../utils/supabase";

export async function POST({request, cookies}){
    const {car_id, mechanic_id, location} = await request.json();

    const authRequest = auth.handleRequest({request, cookies});
    const session = await authRequest.validateBearerToken();

    if(!session){
        throw error(401, 'Forbidden');
    }

    const booking = await prisma.request.create({
        data: {
            car_id,
            user_id: session.user.userId,
            mechanic_id,
            location
        }
    });

    const channel = supabase.channel(mechanic_id);

    channel.subscribe((status) => {
        if (status !== 'SUBSCRIBED') {
            return null
        }

        channel.send({
            type: 'broadcast',
            event: 'mechanic_booking',
            payload: booking,
        })
    })

    return json(booking);
}