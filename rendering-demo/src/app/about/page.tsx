import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // make sure this is present

export default async function AboutPage() {
  const cookieStore = await cookies(); // ✅ synchronous
  const theme = cookieStore.get("theme");

  console.log("Theme cookie:", theme);

  return (
    <>
      <h1>About page!</h1>
      <p>Theme: {theme?.value ?? "not set"}</p>
    </>
  );
}
