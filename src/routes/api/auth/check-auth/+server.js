import { auth } from '../../../../utils/lucia';
import { fail, json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function GET({request, cookies}) {
    const authRequest = auth.handleRequest({request: request, cookies});
    const session = await authRequest.validateBearerToken();

    return json(session)
}