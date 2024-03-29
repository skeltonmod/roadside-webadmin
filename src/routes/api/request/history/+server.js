import { json, error } from '@sveltejs/kit';
import { auth } from '../../../../utils/lucia.js';
import prisma from '../../../../utils/client.js';

export async function GET({ request, cookies }) {
	const authRequest = auth.handleRequest({ request, cookies });
	const session = await authRequest.validateBearerToken();

	if (!session) {
		throw error(401, 'Forbidden');
	}

	const details = await prisma.userDetail.findUnique({
		where: {
			user_id: session.user.userId
		}
	});

	const data = await prisma.request.findMany({
		where: {
			mechanic_id: details?.role == 'mechanic' || details?.role == 'shop' ? session.user.userId : undefined,
			user_id: details?.role == 'owner' ? session.user.userId : undefined,
			status: 'completed'
		},
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

	return json(data);
}