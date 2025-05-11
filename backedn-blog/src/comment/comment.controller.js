import Comment from "./comment.model.js";
import Post from "../post/post.model.js";

export const createComment = async (req, res) => {
    try {
        const { nameUser, content, post_id } = req.body;

        // Validar que los campos requeridos estén presentes
        if (!nameUser || !content || !post_id) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos (nameUser, content, post_id) son obligatorios",
            });
        }

        // Verificar que el post exista
        const post = await Post.findById(post_id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada",
            });
        }

        // Crear el comentario
        const comment = new Comment({
            nameUser,
            content,
            post: post_id,
        });

        // Guardar el comentario en la base de datos
        await comment.save();

        // Agregar el comentario al array de comentarios del post
        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            success: true,
            message: "Comentario creado",
            comment,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear el comentario",
            error: err.message,
        });
    }
};
