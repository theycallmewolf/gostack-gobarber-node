import { createConnection } from 'typeorm';

createConnection();

// in case of not using ormconfig.js
// createConnection({
//   type: 'postgres',
//   //
// });