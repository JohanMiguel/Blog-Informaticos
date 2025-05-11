import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../shared/hooks/usePost";
import { Filtrer } from "./Filtrer";
import { useFiltrerPost } from "../shared/hooks/useFiltrerPost";

export const PostList = () => {
  const { posts, loading, error, fetchAllPosts } = usePost();
  const {
    filteredPosts,
    loading: loadingFiltered,
    error: errorFiltered,
    fetchPostsByCourse,
  } = useFiltrerPost();

  const [activeFilter, setActiveFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleFilteredPosts = (courseName) => {
    if (!courseName) {
      setActiveFilter(false);
    } else {
      fetchPostsByCourse(courseName);
      setActiveFilter(true);
    }
  };

  const displayedPosts = activeFilter ? filteredPosts : posts;

  const isLoading = loading || loadingFiltered;
  const currentError = error || errorFiltered;

  if (isLoading)
    return <p className="text-center text-secondary">Cargando publicaciones...</p>;
  if (currentError)
    return <p className="text-center text-danger">Error: {currentError}</p>;

  return (
    <div className="container mt-4">
      <Filtrer onFilteredPosts={handleFilteredPosts} />
      <div className="d-flex flex-column align-items-center">
        {displayedPosts.map((post) => {
          const username =
            typeof post.user === "object"
              ? post.user?.name
              : post.user || "Desconocido";

          const courseName =
            typeof post.course === "object"
              ? post.course?.name
              : post.course || "Curso no encontrado";

          const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            username
          )}&background=000000&color=ffffff&size=64`;

          return (
            <div
              key={post._id || post.id}
              className="list-group-item list-group-item-action mb-3 w-75"
              onClick={() => navigate(`buscar/${post._id || post.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center">
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="rounded-circle me-3"
                  style={{ width: "48px", height: "48px" }}
                />
                <div>
                  <h5 className="mb-1">{username}</h5>
                  <small className="text-muted">@{username.toLowerCase()}</small>
                </div>
              </div>
              <div className="mt-3">
                <h6 className="text-primary">{post.title}</h6>
                <p className="mb-1">{post.content}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">
                  {new Date(post.createdAt).toLocaleString()}
                </small>
                <span className="badge bg-dark">{courseName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};