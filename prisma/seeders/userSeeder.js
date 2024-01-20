import { PrismaClient } from '@prisma/client';

import { auth } from '../../src/utils/lucia.js';

const prisma = new PrismaClient();

(async () => {
	console.log('Seeding user admin');
	const user = await auth.createUser({
		key: {
			providerId: 'email', // auth method
			providerUserId: 'admin@admin.com', // unique id when using "email" auth method
			password: 'adminpassword123' // hashed by Lucia
		},
		attributes: {
			email: 'admin@admin.com'
		}
	});

	await prisma.userDetail.create({
		data: {
			role: 'admin',
			details: {
				firstname: 'Admin',
				lastname: 'Administrator',
				contact: '09953875103',
				occupation: 'Sex Worker',
				address: 'CKY Building Divisoria'
			},
			user_id: user.userId
		}
	});

	const response = await prisma.user.findFirst({
		where: {
			id: user.userId
		},
		include: {
			details: true
		}
	});

	console.log('User Created', response.email);
})();
