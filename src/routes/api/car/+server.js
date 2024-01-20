import { json, error } from '@sveltejs/kit';
import { auth } from '../../../utils/lucia.js';
import prisma from '../../../utils/client.js';
import supabase from '../../../utils/supabase.js'

export async function GET({ request, cookies }) {
	const authRequest = auth.handleRequest({ request, cookies });
	const session = await authRequest.validateBearerToken();
	const response = [];
	if (!session) {
		throw error(401, 'Forbidden');
	}

	const cars = await prisma.cars.findMany({
		where: {
			user_id: session.user.userId
		}
	});

	for (let i = 0; i < cars.length; ++i) {
        console.log(cars[i].image);
		const { data } = supabase.storage.from('roadside-images').getPublicUrl(cars[i].image);
		cars[i].image = data.publicUrl;
	}

	return json(cars);
}
