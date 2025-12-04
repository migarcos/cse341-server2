const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Hardware API '
  },
  host: 'cse341-server2.onrender.com', // 'cse341-server2.onrender.com''localhost:3000'
  schemes: ['https'],
  securityDefinitions: {
    googleOAuth: {
      type: 'oauth2',
      authorizationUrl: 'https://cse341-server2.onrender.com/auth/google',  // 'https://cse341-server2.onrender.com/auth/google' 'http://localhost:3000/auth/google'
      flow: 'implicit', 
      scopes: { 
        profile: 'Basic access to user profilr.',
        email: 'access to email user address.',
      }
    },
    cookieAuth: { 
        type: 'apiKey',
        in: 'cookie',
        name: 'connect.sid', 
        description: 'Active an Opened Session is required to access.'
    }
  }
};

const outputFile = './swagger-output.json';
// const endpointsFiles = ['./routes/processor.js', './routes/memory.js'];  // , './routes/auth.js'
const endpointsFiles = ['./routes/index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);