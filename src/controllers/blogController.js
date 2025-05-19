const blogService = require('../../src/services/implementation/blogService');
const BlogModel = require('../models/blogModel'); // Renombra a BlogModel para que no lo confundas con la instancia
class BlogController {
    async getHomePage(req, res) {
        try {
            const blogs = await blogService.getAllBlogs();
            console.log(blogs);
            // Serializar blogs como JSON para la vista
            res.render('blogs/index', { blogs, user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username });
        } catch (error) {
            res.status(500).send('Error al cargar la página de inicio.');
        }
    }

    async getBlog(req, res) {
        res.render('blogs/nuevo', { user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username, username: req.user.username });
    };

    async postBlog(req, res) {
        try {
            console.log(req.body);
            // Extraer datos del request body
            const { UsuarioID, Especialidad, TituloPonencias, NecesidadesEspecificas } = req.body;
            // Convertir los valores de UsuarioID si es necesario
            const usuarioID = parseInt(UsuarioID, 10);
    
            // Crear una nueva instancia de BlogModel, pasando un objeto con las propiedades
            const newBlog = new BlogModel({
                PonenteID: null, // Establecer PonenteID como null si no se tiene
                UsuarioID: usuarioID, 
                Nombre: null,  // Nombre como null por defecto
                Correo: null,  // Correo como null por defecto
                Especialidad,
                TituloPonencias,
                NecesidadesEspecificas
            });
    
            console.log("Nuevo blog:", newBlog); // Verifica el contenido del nuevo blog
    
            // Usar el servicio para agregar el nuevo blog
            await blogService.postBlog(newBlog);
    
            // Obtener la lista actualizada de blogs
            const blogs = await blogService.getAllBlogs();
    
            // Renderizar la página con la lista actualizada
            res.render('blogs', { blogs, user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username });
        } catch (error) {
            console.error('Error al agregar el blog:', error.message);
            res.status(500).send('Error al agregar el blog.');
        }
    }
    

    async getEditForm(req, res) {
        const blogId = req.params.id; // Obtener el ID del blog de la URL
        const blog = await blogService.getBlog(blogId); // Llamada a la función getBlogById
        if (!blog) return next();
        console.log(blog);
        res.render('blogs/editar', { blog, user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username });
    };

    async putBlog(req, res) {
        try {
            const blogId = req.params.id; // Obtener el ID del blog desde los parámetros de la URL
            console.log("ID del ponente:", blogId);
    
            // Extraer datos del request body y crear el objeto updatedBlog
            const updatedBlog = {
                PonenteID: blogId, // Usar el ID del blog que se está actualizando
                Especialidad: req.body.Especialidad,
                TituloPonencias: req.body.TituloPonencias,
                NecesidadesEspecificas: req.body.NecesidadesEspecificas
            };

            // Usar el servicio para actualizar el blog
            await blogService.putBlog(updatedBlog);
    
            // Redireccionar o renderizar la página con la lista actualizada de blogs
            const blogs = await blogService.getAllBlogs();
            res.render('blogs', { blogs, user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username });
        } catch (error) {
            console.error('Error al actualizar el blog:', error.message);
            res.status(500).send('Error al actualizar el blog.');
        }
    }
    

    async deleteBlog(req, res) {
        try {
            const blogId = req.params.id; // Obtener el ID del blog desde los parámetros de la URL
            await blogService.deleteBlog(blogId);
            res.redirect('/blogs');
        } catch (error) {
            res.status(500).send('Error al eliminar el blog.');
        }
    }
}

module.exports = new BlogController();
