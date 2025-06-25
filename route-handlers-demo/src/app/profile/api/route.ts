import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  //   const reqheaders = new Headers(request.headers);
  //   console.log(reqheaders.get("Authorization"));

  const headerList = await headers();
  console.log(headerList.get("Authorization"));

    // const theme = request.cookies.get("theme");
  // console.log(theme);

  const cookieStore = await cookies();
  cookieStore.set("resultsPerPage", "20");
  console.log(cookieStore.get("resultsPerPage"))

  return new Response("<h1>Profile API data</h1>", {
    headers: {
      "Content-type": "text/html",
      "Set-Cookie": "theme=dark",
    },
  });
}
