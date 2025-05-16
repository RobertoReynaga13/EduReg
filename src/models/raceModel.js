const Joi = require('joi');
class raceModel {
  constructor(Id, Titulo, Descripcion, Fecha, OrganizadorId, UbicacionId, Publicado,Activo, isEdit = false, Organizador) {
      const schema = Joi.object({
          Id: isEdit ? Joi.number().required() : Joi.optional(), // El Id es requerido solo para la edición
          Titulo: Joi.string().min(3).max(30).required(),
          Descripcion: Joi.string().optional().allow(''),
           Fecha: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).optional()
           .messages({
             'string.pattern.base': `"Fecha" debe estar en el formato YYYY-MM-DD`,
           }),
          OrganizadorId: Joi.optional().allow(0),
          UbicacionId: Joi.optional().allow(0),
          Publicado: Joi.boolean().optional(),
          Activo: isEdit ? Joi.boolean().optional() : Joi.boolean().default(true), // Activo es opcional en la edición pero tiene valor predeterminado en la creación
        });

      const { error } = schema.validate({
        Titulo,
        Descripcion,
        Fecha,
        OrganizadorId,
        UbicacionId
       });

      if (error) {
          throw new Error(`${error.details[0].message}`);
      }

      this.Id = Id;
      this.Titulo = Titulo;
      this.Descripcion = Descripcion;
      this.Fecha = Fecha;
      this.OrganizadorId = OrganizadorId;
      this.UbicacionId = UbicacionId;
      this.Publicado = Publicado;
      this.Activo = Activo;
      this.Organizador = Organizador;
  }
}

module.exports = raceModel;
