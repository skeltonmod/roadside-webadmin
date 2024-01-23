import { json, error } from "@sveltejs/kit";
import { auth } from "../../../../utils/lucia";
import prisma from "../../../../utils/client";


export async function GET({ request, cookies }) {
	const authRequest = auth.handleRequest({ request, cookies });
	const session = await authRequest.validateBearerToken();

	if (!session) {
		throw error(401, 'Forbidden');
	}
    
	const req = await prisma.request.findMany({
		include: {
			car: true,
			user: {
				include: {
					details: true
				}
			},
			mechanic: {
				include: {
					details: true
				}
			}
		}
	});
	return json(req);
}