import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3001/blog/v1", 
  timeout: 5000,
});

// Renderiza las publicaciones
export const getAllPosts = async () => {
  try {
    const response = await apiClient.get('/post/');
    return response.data;
  } catch (e) {
    return { error: true, message: e.message };
  }
};

// renderizar la publicación y sus comentarios
export const getPostById = async (postId) => {
  try {
    const response = await apiClient.get(`post/buscar/${postId}`);
    return response.data.post;
  } catch (e) {
    return { error: true, message: e.message };
  }
};

export const addComment = async (commentData) => {
  try {
    const response = await apiClient.post("/comentario/addComment", commentData);
    return response.data;
  } catch (e) {
    return { error: true, message: e.message };
  }
};

export const filterPosts = async (filters) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await apiClient.get(`/filter?${queryParams}`);
    return response.data;
  } catch (e) {
    return { error: true, message: e.message };
  }
};export const getCourses = async () => {
  try {
    const response = await apiClient.get("/course/buscarCourse/");
    return response.data;
  } catch (e) {
    return { error: true, message: e.message };
  }
};