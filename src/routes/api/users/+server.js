import { json, error } from "@sveltejs/kit";
import { auth } from "../../../utils/lucia";
import prisma from "../../../utils/client";

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

    return json(users);
}