import colors from 'colors';
import server from './server';

// Using dotenv to read data from .env file
// import { config } from 'dotenv';
// config();

//Using the new update on Node.js to read the .env file
process.loadEnvFile();

const port = process.env.PORT || 4040;

server.listen(port, () => {
  console.log(colors.blue.bold(`Server is working on port: ${port}`));
});
