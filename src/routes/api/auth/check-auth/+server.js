import { auth } from '../../../../utils/lucia';
import { error, fail, json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function GET({request, cookies}) {
    const authRequest = auth.handleRequest({request, cookies});
    const session = await authRequest.validateBearerToken();

    if(!session){
        throw error(401, 'Forbidden');
    }

    return json(session)
}