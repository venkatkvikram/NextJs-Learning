type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

type Album = {
    userId: number;
    id: number;
    title: string;
}

async function getUserPosts(userId: string) {
    await new Promise((resolve)=> setTimeout(resolve,1000))
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    return res.json();
}

async function getUserAlbums(userId: string) {
    await new Promise((resolve)=> setTimeout(resolve,1000))
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    return res.json();
}

export default async function UserProfile({params}: {params: Promise<{id: string}>}) {
const {id} = await params;
const postsData = getUserPosts(id);
const albumsData = getUserAlbums(id);

const [posts,albums] = await Promise.all([postsData, albumsData]);

//an awaited request inside the component will block any requests
//below it. This is why we initiated both requests before awaiting any of them

return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8">User Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Posts</h2>
          <div className="space-y-4">
            {posts.map((post: Post) => (
              <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-bold mb-3 text-gray-800 leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Albums</h2>
          <div className="space-y-4">
            {albums.map((album: Album) => (
              <div key={album.id} className="bg-white shadow-md rounded-lg p-6">
                <p className="text-gray-700">{album.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}