type Author = {
    id: number;
    name : string;
}

export default async function Author({userId} : {userId: number}) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const user: Author = await response.json();
    
      return (
        <div className="text-sm text-gray-500">
          Written by:{" "}
          <span className="font-semibold text-gray-700 hover:text-gray-900 transition-colors">
            {user.name}
          </span>
        </div>
      );

}