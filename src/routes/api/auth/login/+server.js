// @ts-nocheck
import { auth } from '../../../../utils/lucia';

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    // const authRequest = auth.handleRequest(request);

    return new Response(request);
}
