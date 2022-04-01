import { useState, createContext, useContext, useEffect } from 'react';
import { getPostsRequest, createPostsRequest, deletePostsRequest, getPostRequest, updatePostRequest } from '../api/posts';

const postsContext = createContext();

export const usePosts = () => {
	const context = useContext(postsContext);
	return context;
}

export const PostProvider = ({ children }) => {

	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		const res = await getPostsRequest();
		setPosts(res.data);
	}

	const createPost = async (post) => {
		try {
			const res = await createPostsRequest(post);
			setPosts([...posts, res.data]);
		} catch (error) {
			console.log(error);
		}
	}

	const deletePost = async id => {
		await deletePostsRequest(id);
		setPosts(posts.filter(post => post._id !== id));
	}

	const getPost = async (id) => {
		const res = await getPostRequest(id)
		return res.data;
	}

	const updatePost = async (id, post) => {
		const res = await updatePostRequest(id, post)
		setPosts(posts.map((post) => post._id === id ? res.data : post));
	}

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<postsContext.Provider value={{ posts, getPosts, createPost, deletePost, getPost, updatePost }}>
			{children}
		</postsContext.Provider>
	)
}