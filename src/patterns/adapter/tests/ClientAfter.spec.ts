import { describe, it, expect, jest } from '@jest/globals';
import { Client } from '../after/Client.js';
import { SoapAdapter } from '../after/SoapAdapter.js';
import { ClientSoap } from '../after/ClientSoap.js';
import { PreferencesAdapter, ClientPreferences } from '../after/types.js';

class PreferencesAdapterFake implements PreferencesAdapter {
  public getPreferences(universalId: string): ClientPreferences {
    if (universalId === 'FG123') {
      return {
        emails: ['cliente@cliente.com', 'cliente@email.com'],
        address: 'Rua das Flores, 123',
        phones: ['1111-2222', '3333-4444'],
        card: '1234-5678',
      };
    }

    if (universalId === 'EMPTY') {
      return {
        emails: [],
        address: '',
        phones: [],
        card: '',
      };
    }

    return {
      emails: [],
      address: '',
      phones: [],
      card: '',
    };
  }
}

describe('Client (after Adapter)', () => {
  it('should return list of client emails', () => {
    const universalId = 'FG123';
    const preferencesAdapter = new PreferencesAdapterFake();

    const client = new Client(universalId, preferencesAdapter);
    const preferenciasJson = client.getPreferences();
    const preferencias = JSON.parse(preferenciasJson);

    expect(preferencias.emails).toHaveLength(2);
    expect(preferencias.emails[0]).toBe('cliente@cliente.com');
    expect(preferencias.emails[1]).toBe('cliente@email.com');
  });

  it('should return empty preferences for empty client', () => {
    const universalId = 'EMPTY';
    const preferencesAdapter = new PreferencesAdapterFake();

    const client = new Client(universalId, preferencesAdapter);
    const preferenciasJson = client.getPreferences();
    const preferencias = JSON.parse(preferenciasJson);

    expect(preferencias.emails).toHaveLength(0);
    expect(preferencias.address).toBe('');
    expect(preferencias.phones).toHaveLength(0);
    expect(preferencias.card).toBe('');
  });

  it('should return all preferences correctly', () => {
    const universalId = 'FG123';
    const preferencesAdapter = new PreferencesAdapterFake();

    const client = new Client(universalId, preferencesAdapter);
    const preferenciasJson = client.getPreferences();
    const preferencias = JSON.parse(preferenciasJson);

    expect(preferencias.emails).toEqual([
      'cliente@cliente.com',
      'cliente@email.com',
    ]);
    expect(preferencias.address).toBe('Rua das Flores, 123');
    expect(preferencias.phones).toEqual(['1111-2222', '3333-4444']);
    expect(preferencias.card).toBe('1234-5678');
  });
});

describe('SoapAdapter', () => {
  it('should adapt SOAP responses to ClientPreferences', () => {
    const universalId = 'FG123';
    const emailsXml = 'email1@test.com,email2@test.com';
    const card = '1234-5678';
    const phonesXml = '1111-2222,3333-4444';
    const address = 'Rua das Flores, 123';

    const clientSoap = new ClientSoap();
    clientSoap.getEmailPreferences = jest
      .fn()
      .mockReturnValue(emailsXml) as any;
    clientSoap.getCardPreferences = jest.fn().mockReturnValue(card) as any;
    clientSoap.getPhonePreferences = jest
      .fn()
      .mockReturnValue(phonesXml) as any;
    clientSoap.getAddressPreference = jest.fn().mockReturnValue(address) as any;

    const soapAdapter = new SoapAdapter(clientSoap);
    const preferences = soapAdapter.getPreferences(universalId);

    expect(preferences.emails).toEqual(['email1@test.com', 'email2@test.com']);
    expect(preferences.card).toBe('1234-5678');
    expect(preferences.phones).toEqual(['1111-2222', '3333-4444']);
    expect(preferences.address).toBe('Rua das Flores, 123');
  });

  it('should handle null values correctly', () => {
    const universalId = 'FG123';

    const clientSoap = new ClientSoap();
    clientSoap.getEmailPreferences = jest.fn().mockReturnValue(null) as any;
    clientSoap.getCardPreferences = jest.fn().mockReturnValue(null) as any;
    clientSoap.getPhonePreferences = jest.fn().mockReturnValue(null) as any;
    clientSoap.getAddressPreference = jest.fn().mockReturnValue(null) as any;

    const soapAdapter = new SoapAdapter(clientSoap);
    const preferences = soapAdapter.getPreferences(universalId);

    expect(preferences.emails).toEqual([]);
    expect(preferences.card).toBe('');
    expect(preferences.phones).toEqual([]);
    expect(preferences.address).toBe('');
  });
});
