const Docs = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const { slug } = await params;
  if (slug?.length === 2) {
    return (
      <h1>
        Viewing docs for feature {slug[0]} and concept {slug[1]}
      </h1>
    );
  } else if (slug?.length === 1) {
    return <h1>Viewing docs for feature {slug[0]}</h1>;
  }
  return <div>Docs home page</div>;
};

export default Docs;

// NestJs special naming convention
//    [...slug] -> slug is common term for URLs
//                -> The magic of page.tsx inside slug folder is that it matches
//                    with docs path.
//                 -> To access different URL segments in code we have to use params object
// OPTIONAL CATCH ALL SEGMENTS
//    Wrap the folder in extra pair of square brackets [[...slug]]
// 


