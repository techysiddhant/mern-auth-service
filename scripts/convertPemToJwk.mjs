import fs from 'fs';
// import path from 'path';
import rsaPemToJwk from 'rsa-pem-to-jwk';

const privateKey = fs.readFileSync('./certs/private.pem');

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
rsaPemToJwk(privateKey, { use: 'sig' }, 'public');

// console.log(JSON.stringify(jwk));