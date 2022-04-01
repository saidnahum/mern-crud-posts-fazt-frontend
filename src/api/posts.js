import axios from 'axios';

export const getPostsRequest = async () => await axios.get('http://localhost:4000/posts');

export const createPostsRequest = async (post) => {
   const form = new FormData();

   for (let key in post){
      form.append(key, post[key]);
   }

   return await axios.post('http://localhost:4000/posts', form, {
      headers: {
         "Content-Type": "multipart/form-data"
      }
   });
};

export const deletePostsRequest = async (id) => await axios.delete('http://localhost:4000/posts/' + id);

export const getPostRequest = async (id) => await axios.get('http://localhost:4000/posts/' + id);

export const updatePostRequest = async (id, newFields) => axios.put(`http://localhost:4000/posts/${id}`, newFields);
