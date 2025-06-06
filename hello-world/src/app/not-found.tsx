const NotFound = () => {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
};

export default NotFound;


//NOT FOUND PAGE
/**
 * 
 * -> File name should be exactly not-found.tsx as per NextJs convention.
 * -> Though this is default if you want not-found to be invoked programatically 
 *    just import notFound() function.
 * 
 * 
 * 
 */

/*

Special 404 pages for section
-> not-found file inside that speicifc section.
-> NotFound component doesn't accept props.
-> Different NotFound messages based on route parameter. We use usePathName() hook for it.


*/