import { json, error } from '@sveltejs/kit';
import { auth } from '../../../utils/lucia.js';
import prisma from '../../../utils/client.js';

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

	const owner_average_ratings = await prisma.request.findMany({
		where: {
			mechanic_id: details?.details?.role == 'mechanic' ? session.user.userId : undefined,
			user_id: details?.details?.role == 'owner' ? session.user.userId : undefined,
		}
	}).then(r => {
		const totalRatings = r.reduce((acc, item) => {
			const rating = details?.details?.role == 'mechanic' ? item.mechanic_rating : item.owner_rating;
			return acc + (rating || 0)
		}, 0);
		return r.length > 0 ? totalRatings / r.length : 0;
	});

	var req = await prisma.request.findMany({
		where: {
			mechanic_id: details?.role == 'mechanic' ? session.user.userId : undefined,
			user_id: details?.role == 'owner' ? session.user.userId : undefined,
			NOT: {
				OR: [
					{
						status: 'declined'
					},
					{
						status: 'completed'
					}
				]
			}
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

	req = req.map(item => ({
		...item,
		owner_average_ratings: owner_average_ratings
	}));

	return json(req);
}
