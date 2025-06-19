import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home!</h1>
      <Link href="/blog">Blog</Link>
      <Link href="/products">Products</Link>
      <Link href="/articles/breaking-news?lang=en">Read in English</Link>
      <Link href="/articles/breaking-news?lang=fr">Read in French</Link>
    </>
  );
}
