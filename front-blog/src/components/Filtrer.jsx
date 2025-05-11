import React, { useState } from "react";
import { useFiltrerPost } from "../shared/hooks/useFiltrerPost";

export const Filtrer = ({ onFilteredPosts }) => {
  const [search, setSearch] = useState("");
  const { fetchPostsByCourse, loading, error } = useFiltrerPost();

  const handleSearch = async () => {
    if (search.trim()) {
      await fetchPostsByCourse(search);
      onFilteredPosts(search); // Notifica al componente padre
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por curso..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-primary mt-2" onClick={handleSearch} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
};