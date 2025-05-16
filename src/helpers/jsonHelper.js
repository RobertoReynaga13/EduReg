const handlebars = require('handlebars');

// Helper para convertir datos a JSON
handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});
