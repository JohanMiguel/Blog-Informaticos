import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDetailsPost } from "../shared/hooks/useDetailsPost";
import { addComment } from "../services/api";

export const DetailsPostPage = () => {
  const { postId } = useParams(); 
  const navigate = useNavigate();
  const { postDetails, loading, error } = useDetailsPost(postId);

  const [nameUser, setNameUser] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState(null);

  const handleAddComment = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!nameUser || !content) {
      setFormError("Todos los campos son obligatorios.");
      return;
    }

    const commentData = {
      nameUser,
      content,
      post_id: postId,
    };

    const response = await addComment(commentData);
    if (response.error) {
      setFormError(response.message);
    } else {
      postDetails.comments.push(response.comment);
      setNameUser("");
      setContent("");
    }
  };

  if (loading)
    return <p className="text-center text-secondary">Cargando detalles del post...</p>;
  if (error)
    return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate("/")}
      >
        Volver a la lista
      </button>

      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex align-items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(postDetails?.user || "Usuario")}&background=0D8ABC&color=fff`}
            alt="avatar"
            className="rounded-circle me-3"
            style={{ width: "48px", height: "48px" }}
          />
          <div>
            <h5 className="card-title mb-0">@{postDetails?.user || "Usuario"}</h5>
          </div>
        </div>
        <div className="card-body">
          <h4 className="card-title text-primary">{postDetails?.title}</h4>
          <p className="card-text">{postDetails?.content}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {new Date(postDetails?.createdAt).toLocaleString()}
          </small>
          <span className="badge bg-primary">{postDetails?.course || "Curso no encontrado"}</span>
        </div>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">Agregar Comentario</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddComment}>
            {formError && <p className="text-danger">{formError}</p>}
            <div className="mb-3">
              <label htmlFor="nameUser" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nameUser"
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Comentario</label>
              <textarea
                className="form-control"
                id="content"
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Comentarios</h5>
        </div>
        <div className="card-body">
          {postDetails?.comments?.length > 0 ? (
            <ul className="list-group list-group-flush">
              {postDetails.comments.map((comment, index) => (
                <li key={index} className="list-group-item">
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.nameUser || "Usuario")}&background=0D8ABC&color=fff`}
                      alt="avatar"
                      className="rounded-circle me-3"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <strong>{comment.nameUser}</strong>
                  </div>
                  <p className="mb-1">{comment.content}</p>
                  <small className="text-muted">
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No hay comentarios para este post.</p>
          )}
        </div>
      </div>
    </div>
  );
};