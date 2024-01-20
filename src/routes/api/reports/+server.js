import { json, error } from '@sveltejs/kit';
import { auth } from '../../../utils/lucia.js';
import prisma from '../../../utils/client.js';

export async function GET({request, cookies}){
    const authRequest = auth.handleRequest({ request, cookies });
    const session = await authRequest.validateBearerToken();

    if (!session) {
        throw error(401, 'Forbidden');
    }

    const reports = await prisma.reports.findMany();

    return json(reports);
}