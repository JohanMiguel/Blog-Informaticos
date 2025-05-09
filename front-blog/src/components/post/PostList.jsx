import React, { useEffect } from "react";
import { usePost } from "../../shared/hooks/usePost";

export const PostList = () => {
  const { posts, loading, error, fetchAllPosts } = usePost();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  if (loading)
    return <p className="text-center text-secondary">Cargando publicaciones...</p>;
  if (error)
    return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        {posts.map((post) => {
          const username = post.user || "Desconocido";
          const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            username
          )}&background=000000&color=ffffff&size=64`;

          return (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                {/* Header con avatar y usuario */}
                <div className="card-header d-flex align-items-center">
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="rounded-circle me-3"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <div>
                    <h5 className="card-title mb-0">{username}</h5>
                    <small className="text-muted">@{username.toLowerCase()}</small>
                  </div>
                </div>

                {/* Contenido del post */}
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-primary">{post.title}</h6>
                  <p className="card-text">{post.content}</p>
                </div>

                {/* Footer con fecha y curso */}
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {new Date(post.createdAt).toLocaleString()}
                  </small>
                  <span className="badge bg-dark">
                    {post.course || "Curso no encontrado"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};