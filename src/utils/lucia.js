// npm add lucia-auth
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';

import client from './client';

export const auth = lucia({
	adapter: prismaAdapter(client, {
		user: 'user',
		key: 'key',
		session: 'session'
	}),
	middleware: sveltekit(),
	env: 'DEV',
	getUserAttributes: (data) => {
		return {
			userId: data.id,
      		email: data.email,
		};
	}
});