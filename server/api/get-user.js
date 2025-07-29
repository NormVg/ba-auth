import { apiResponse } from "~/utils/apiResponse"
import { auth } from "~/utils/auth";

export default defineEventHandler(async (event) => {

    const session = await auth.api.getSession({
    headers: event.headers,
  });

  const tao_user_id = session.user.id
  const respData = {
    name: session.user.name,
    email: session.user.email
  }

  return apiResponse(200,[respData],'sss')
})

