import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';

import client from './client.js';

export const auth = lucia({
	adapter: prismaAdapter(client, {
		user: 'user',
		key: 'key',
		session: 'session'
	}),
	sessionCookie: {
		attributes: {
			secure: false
		}
	},
	middleware: sveltekit(),
	env: 'DEV',
	getUserAttributes: (data) => {
		return {
			userId: data.id,
      		email: data.email,
			emailVerified: data.email_verified
		};
	}
});