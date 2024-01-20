import { json, error } from "@sveltejs/kit";
import { auth } from "../../../../utils/lucia";
import prisma from "../../../../utils/client";

export async function POST({request, cookies}){
    const { user_id, description } = await request.json();

    const authRequest = auth.handleRequest({ request, cookies });
    const session = await authRequest.validateBearerToken();

    if (!session) {
        throw error(401, 'Forbidden');
    }

    const report = await prisma.reports.create({
        data: {
            reportee_id: user_id,
            reporter_id: session.user.userId,
            description
        }
    });
    return json(report);
}