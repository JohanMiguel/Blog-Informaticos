import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3001/blog/v1",
  timeout: 5000,
  httpsAgent: false,
});

// Obtener todas las publicaciones
export const getAllPosts = async () => {
  try {
    const response = await apiClient.get('/post/');
    return response.data;
  } catch (e) {
    return { error: true, message: e.message };
  }
};

// Obtener una publicación por ID
export const getPostById = async (postId) => {
  try {
    const response = await apiClient.get(`/post/${postId}`);
    return response.data;
  } catch (e) {
    return { error: true, message: e.message };
  }
};
