import { json, error } from "@sveltejs/kit";
import { auth } from "../../../../utils/lucia.js";
import prisma from "../../../../utils/client.js";

export async function POST({request, cookies}){
    const {model, brand, year, transmission, fuel, color} = await request.json();
    const authRequest = auth.handleRequest({request, cookies});
    const session = await authRequest.validateBearerToken();

    if(!session){
        throw error(401, 'Forbidden');
    }

    const car = await prisma.cars.create({
        data: {
            model,
            brand, 
            year,
            transmission,
            fuel,
            color,
            user_id: session.user.userId
        }
    });

    return json(car)
}