import { Formik, Form, Field, ErrorMessage } from 'formik';
import { usePosts } from '../context/postContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const PostForm = () => {

	const { createPost, getPost, updatePost } = usePosts();
	const navigate = useNavigate();
	const params = useParams()

	const [post, setPost] = useState({
		title: '',
		description: '',
		image: null
	})

	useEffect(() => {
		(async () => {
			if (params.id) {
				const post = await getPost(params.id);
				setPost(post);
			}
		})();
	}, [params.id])


	return (
		<div className='flex items-center justify-center'>
			<div className='bg-zinc-800 p-10 shadow-md shadow-black'>
				<header className='flex justify-between items-center py-4 text-white'>
					<h3 className='text-xl'>New Post</h3>
					<Link to='/' className='text-gray-400 text-sm hover:text-gray-300'>
						Go back
					</Link>
				</header>

				<Formik
					initialValues={post}
					validationSchema={Yup.object({
						title: Yup.string().required("Title is Required"),
						description: Yup.string().required("Description is Required")
					})}
					onSubmit={async (values, actions) => {

						if (params.id) {
							await updatePost(params.id, values);
						} else {
							await createPost(values);
						}
						actions.setSubmitting(false);
						navigate("/");
					}}
					enableReinitialize={true}
				>
					{({ handleSubmit, setFieldValue, isSubmitting }) => (
						<Form onSubmit={handleSubmit}>
							<label htmlFor='title' className='text-sm block font-bolde text-gray-400'>Title</label>
							<Field
								name='title'
								placeholder='title'
								className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
							/>
							<ErrorMessage name='title' component="p" className='text-red-400 text-sm' />

							<label htmlFor='description' className='text-sm block font-bolde text-gray-400 mt-5'>Description</label>
							<Field
								component='textarea'
								rows={3}
								name='description'
								placeholder='description'
								className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
							/>
							<ErrorMessage name='description' component="p" className='text-red-400 text-sm' />

							<label htmlFor='description' className='text-sm block font-bolde text-gray-400 mt-5'>Image</label>
							<input 
								type="file" 
								name='image' 
								className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
								onChange={(e) => setFieldValue('image', e.target.files[0])}
							/>

							<button 
								type='submit' 
								className='bg-indigo-600 hover:bg-indigo-500 px-4 py-2  rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400'
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<AiOutlineLoading3Quarters className='animate-spin h-5 w-5'/>
								) : 'Save'}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default PostForm;