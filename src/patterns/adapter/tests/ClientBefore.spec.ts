import { describe, it, expect, jest } from '@jest/globals';
import { Client } from '../before/Client.js';
import { ClientSoap } from '../before/ClientSoap.js';

describe('Client (before Adapter)', () => {
  it('should return list of client emails', () => {
    const universalId = 'FG123';
    const emailPrincipal = 'cliente@cliente.com';
    const emailSecundario = 'cliente@email.com';
    const emailsCliente = `${emailPrincipal},${emailSecundario}`;

    const clientSoap = new ClientSoap();
    clientSoap.getEmailPreferences = jest
      .fn()
      .mockReturnValue(emailsCliente) as any;
    clientSoap.getCardPreferences = jest.fn().mockReturnValue('') as any;
    clientSoap.getPhonePreferences = jest.fn().mockReturnValue('') as any;
    clientSoap.getAddressPreference = jest.fn().mockReturnValue('') as any;

    const client = new Client(universalId, clientSoap);
    const preferenciasJson = client.getPreferences();
    const preferencias = JSON.parse(preferenciasJson);

    expect(preferencias.emails).toHaveLength(2);
    expect(preferencias.emails[0]).toBe(emailPrincipal);
    expect(preferencias.emails[1]).toBe(emailSecundario);
  });

  it('should return empty array when emails are null', () => {
    const universalId = 'FG123';

    const clientSoap = new ClientSoap();
    clientSoap.getEmailPreferences = jest.fn().mockReturnValue(null) as any;
    clientSoap.getCardPreferences = jest.fn().mockReturnValue('') as any;
    clientSoap.getPhonePreferences = jest.fn().mockReturnValue('') as any;
    clientSoap.getAddressPreference = jest.fn().mockReturnValue('') as any;

    const client = new Client(universalId, clientSoap);
    const preferenciasJson = client.getPreferences();
    const preferencias = JSON.parse(preferenciasJson);

    expect(preferencias.emails).toHaveLength(0);
  });

  it('should return empty string when card is null', () => {
    const universalId = 'FG123';

    const clientSoap = new ClientSoap();
    clientSoap.getEmailPreferences = jest.fn().mockReturnValue(null) as any;
    clientSoap.getCardPreferences = jest.fn().mockReturnValue(null) as any;
    clientSoap.getPhonePreferences = jest.fn().mockReturnValue('') as any;
    clientSoap.getAddressPreference = jest.fn().mockReturnValue('') as any;

    const client = new Client(universalId, clientSoap);
    const preferenciasJson = client.getPreferences();
    const preferencias = JSON.parse(preferenciasJson);

    expect(preferencias.card).toBe('');
  });

  it('should return all preferences correctly', () => {
    const universalId = 'FG123';
    const emails = 'email1@test.com,email2@test.com';
    const card = '1234-5678';
    const phones = '1111-2222,3333-4444';
    const address = 'Rua das Flores, 123';

    const clientSoap = new ClientSoap();
    clientSoap.getEmailPreferences = jest.fn().mockReturnValue(emails) as any;
    clientSoap.getCardPreferences = jest.fn().mockReturnValue(card) as any;
    clientSoap.getPhonePreferences = jest.fn().mockReturnValue(phones) as any;
    clientSoap.getAddressPreference = jest.fn().mockReturnValue(address) as any;

    const client = new Client(universalId, clientSoap);
    const preferenciasJson = client.getPreferences();
    const preferencias = JSON.parse(preferenciasJson);

    expect(preferencias.emails).toEqual(['email1@test.com', 'email2@test.com']);
    expect(preferencias.card).toBe('1234-5678');
    expect(preferencias.phones).toEqual(['1111-2222', '3333-4444']);
    expect(preferencias.address).toBe('Rua das Flores, 123');
  });
});
