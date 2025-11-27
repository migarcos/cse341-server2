const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Hardware API '
  },
  host: 'localhost:3000', // 'cse341-server2.onrender.com'
  schemes: ['http', 'https'],
  securityDefinitions: {
    googleOAuth: {
      type: 'oauth2',
      authorizationUrl: 'http://localhost:3000/auth/google',  // https://cse341-server2.onrender.com/auth/google
      flow: 'implicit', 
      scopes: { 
        profile: 'Basic access to user profilr.',
        email: 'access to email user address.',
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/processor.js', './routes/memory.js', './routes/auth.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);