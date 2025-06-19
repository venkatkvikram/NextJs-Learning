import Link from "next/link";

export default async function NewsArticle({
  params,
  searchParams,
}: {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ lang?: "en" | "es" | "fr" }>;
}) {
  const { articleId } = await params;
  const { lang = "en" } = await searchParams;
  return (
    <div>
      <h1>News Article {articleId}</h1>
      <p>
        Reading in {lang}
        <div>
          <Link href={`/articles/${articleId}?lang=${lang}`}>English</Link>
          <Link href={`/articles/${articleId}?lang=${lang}`}>Spanish</Link>
          <Link href={`/articles/${articleId}?lang=${lang}`}>French</Link>
        </div>
      </p>
    </div>
  );
}

//client components do not support async await

//to access the params and SearchParams in a client component you have to use the hook from react which is the use hook

/** 
 * 
 * In React/Client
//remove async and await in server compoennt and 
 and write use(params) and use(searchParams)

 In Server
 directly accesible by adding async to component and await it inside the component by fetching
 */
