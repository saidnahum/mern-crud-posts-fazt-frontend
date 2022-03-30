import { Formik, Form, Field, ErrorMessage } from 'formik';
import { usePosts } from '../context/postContext';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const PostForm = () => {

	const { createPost } = usePosts();
	const navigate = useNavigate();

	return (
		<>
			<Formik
				initialValues={{
					title: '',
					description: ''
				}}
				validationSchema={Yup.object({
					title: Yup.string().required("Title is Required"),
					description: Yup.string().required("Description is Required")
				})}
				onSubmit={(values, actions) => {
					createPost(values);
					navigate('/');
				}}
			>
				{({handleSubmit}) => (
					<Form onSubmit={handleSubmit}>
						<Field 
							name='title' 
							placeholder='title'
							className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full'
						
						/>
						<ErrorMessage name='title' component="p" className='text-red-400 text-sm'/>

						<Field 
							name='description' 
							placeholder='description' 
							className='px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mt-5'
						/>
						<ErrorMessage name='description' component="p" className='text-red-400 text-sm'/>

						<button type='submit' className='bg-gray-600 p-2 rounded-lg text-white ml-5 mt-5'>Save</button>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default PostForm;