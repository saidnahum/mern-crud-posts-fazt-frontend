import toast from 'react-hot-toast';
import { usePosts } from '../context/postContext';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {

   const { deletePost } = usePosts();
   const navigate = useNavigate();

   const handleDelete = (id) => {
      toast((t) => (
         <div className=''>
            <p className='text-white'>Do you want to delete? <strong>{id}</strong></p>
            <div>
               <button
                  className='bg-red-500 hover:bg-red-400 px-3 py-2 text-white rounded-md mx-2'
                  onClick={() => {
                     deletePost(id)
                     toast.dismiss(t.id)
                  }}
               >
                  Delete
               </button>
               <button
                  className='bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-md mx-2'
                  onClick={() => toast.dismiss(t.id)}
               >
                  Cancel
               </button>
            </div>
         </div>
      ), {
         style: {
            background: "#202020"
         }
      })
   }

   return (
      <div
         className="bg-zinc-800 text-white rounded-md shadow-md shadow-black transition-all ease-out duration-300 hover:bg-zinc-700 hover:cursor-pointer"
         onClick={() => navigate(`/posts/${post._id}`)}
      >
         <div className="px-4 py-7">
            <div className="flex justify-between items-center">
               <h3 className="text-md font-semibold">{post.title}</h3>
               <button
                  className="bg-red-600 text-sm px-2 py-1 rounded-sm"
                  onClick={(e) => {
                     e.stopPropagation();
                     handleDelete(post._id);
                  }}
               >
                  Delete
               </button>
            </div>
            <p className="text-gray-400">{post.description}</p>
         </div>
         {post.image && <img src={post.image.url} alt={post.title} className='w-full h-80 object-cover'/>}
      </div>
   );
};

export default PostCard;
