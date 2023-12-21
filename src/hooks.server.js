import { sequence } from "@sveltejs/kit/hooks"
import { auth } from "./utils/lucia"


const auth_handle = async ({ event, resolve }) => {
    event.locals.auth = auth.handleRequest(event);
    event.locals.session = await event.locals.auth.validate();
   
    return resolve(event);
  };
   
  export const handle = sequence(auth_handle);