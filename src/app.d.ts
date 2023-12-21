// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { AuthRequest, Session, User } from 'lucia';
import { auth as LuciaAuth } from './utils/lucia';
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: AuthRequest;
			session: Session | null;
		}
		interface PageData {
			user?: User;
		}
		// interface Platform {}
	}
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = LuciaAuth;
		type DatabaseUserAttributes = {
			email: string;
		};
		type DatabaseSessionAttributes = {};
	}
}

export {};
