import { json, error } from '@sveltejs/kit';
import { auth } from '../../../../utils/lucia';
import prisma from '../../../../utils/client';

export async function GET({ request, cookies }) {
	const authRequest = auth.handleRequest({ request, cookies });
	const session = await authRequest.validateBearerToken();

	if (!session) {
		throw error(401, 'Forbidden');
	}

	const user_detail = await prisma.userDetail.findUnique({
		where: {
			user_id: session.user.userId
		}
	});

	if (user_detail?.role !== 'owner') {
		throw error(401, 'You are not allowed to view this page');
	}

	const shops = await prisma.userDetail.findMany({
		where: {
			OR: [
				{
					role: 'shop'
				},
				{
					role: 'mechanic'
				}
			]
		}
	});

	const final_data = await Promise.all(shops.map(async (shop) => {
		const average_ratings = await prisma.request.findMany({
			where: {
				mechanic_id: shop.role === 'mechanic' ? shop.user_id : undefined,
				user_id: shop.role === 'owner' ? shop.user_id : undefined,
			}
		}).then(r => {
			const totalRatings = r.reduce((acc, item) => {
				const rating = shop.role === 'mechanic' ? item.mechanic_rating : item.owner_rating;
				return acc + (rating || 0);
			}, 0);
			return r.length > 0 ? totalRatings / r.length : 0;
		});
		return {
			...shop,
			average_ratings: average_ratings
		};
	}));

	return json(final_data);
}
