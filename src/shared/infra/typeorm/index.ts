import { createConnections } from "typeorm";

createConnections();

// in case of not using ormconfig.js
// createConnection({
//   type: 'postgres',
//   //
// });
