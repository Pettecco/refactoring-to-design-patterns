import { Client } from './before/Client.js';
import { ClientSoap } from './before/ClientSoap.js';

console.log('=== Adapter Pattern - Before ===\n');

const clientSoap = new ClientSoap();
const client = new Client('FG123', clientSoap);

console.log('Client preferences (before):');
console.log(client.getPreferences());
