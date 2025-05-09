import { useState, useEffect } from "react";
import { getAllPosts, getPostById } from '../../services/api'

// Hook para manejar publicaciones
export const usePost = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las publicaciones
  const fetchAllPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPosts();
      if (data.error) {
        throw new Error(data.message);
      }
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Obtener una publicación por ID
  const fetchPostById = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPostById(postId);
      if (data.error) {
        throw new Error(data.message);
      }
      setPost(data.post || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    post,
    loading,
    error,
    fetchAllPosts,
    fetchPostById,
  };
};

