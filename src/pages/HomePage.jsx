import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

const HomePage = () => {
   const { posts } = usePosts();

   if (posts.length === 0)
      return (
         <div className="flex flex-col justify-center items-center">
            <Link to={"/new"}><VscEmptyWindow className="w-28 h-28 text-white" /></Link>
            <h1 className="text-gray-400 text-2xl">There are no Posts!!</h1>
         </div>
      );

   return (
      <div className="text-white">
         <header className="flex justify-between mb-5">
            <h1 className="text-2xl text-gray-300 font-bold">Posts ({posts.length})</h1>
            <Link to={"/new"} className='px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded'>Create New Post</Link>
         </header>

         <div className="grid grid-cols-3 gap-5">
            {posts.map((post) => (
               <PostCard post={post} key={post._id} />
            ))}
         </div>
      </div>
   );
};

export default HomePage;
