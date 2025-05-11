import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { filterPosts } from '../../services/api';

export function useFiltrer() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const response = await filterPosts();
        if (isMounted) setPosts(response.data.posts || []);
      } catch (e) {
        toast.error(e.response?.data?.message || 'Error al cargar publicaciones');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return { posts, loading };
}