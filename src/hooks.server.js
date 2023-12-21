import { sequence } from "@sveltejs/kit/hooks"
import { auth } from "./utils/lucia"
export const handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};