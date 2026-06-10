import { Client } from './after/Client.js';
import { SoapAdapter } from './after/SoapAdapter.js';
import { ClientSoap } from './after/ClientSoap.js';
import { PreferencesAdapter, ClientPreferences } from './after/types.js';

console.log('=== Adapter Pattern - After ===\n');

// Using the SOAP adapter
const clientSoap = new ClientSoap();
const soapAdapter = new SoapAdapter(clientSoap);
const client = new Client('FG123', soapAdapter);

console.log('Client preferences (after with Adapter):');
console.log(client.getPreferences());

// Example of a new adapter without changing the Client class
class DatabaseAdapter implements PreferencesAdapter {
  public getPreferences(universalId: string): ClientPreferences {
    // Simulates fetching from a database
    return {
      emails: ['db@client.com'],
      address: 'Database Address, 100',
      phones: ['9999-8888'],
      card: 'DB-1234',
    };
  }
}

console.log('\nClient preferences (with Database Adapter):');
const databaseAdapter = new DatabaseAdapter();
const clientWithDb = new Client('FG123', databaseAdapter);
console.log(clientWithDb.getPreferences());

console.log(
  '\nThe Adapter pattern allows switching data sources without changing the Client class!'
);
