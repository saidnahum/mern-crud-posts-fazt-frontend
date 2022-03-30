import { usePosts } from '../context/postContext';
import { VscEmptyWindow } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const HomePage = () => {

	const { posts } = usePosts();

	if (posts.length === 0) return (
		<div className='flex flex-col justify-center items-center'>
			<VscEmptyWindow className='w-28 h-28 text-white' />
			<h1 className='text-white text-2xl'>There are no Posts!!</h1>
		</div>
	)

	return (
		<div className='text-white'>
			<Link to={'/new'}>
				Create New Post
			</Link>

			{posts.map((post) => (
				<div key={post._id} className='text-white'>
					{post.title}
				</div>
			))}
		</div>
	)
}

export default HomePage;