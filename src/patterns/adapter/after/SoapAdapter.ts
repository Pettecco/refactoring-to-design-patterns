import { ClientSoap } from './ClientSoap.js';
import { ClientPreferences, PreferencesAdapter } from './types.js';

export class SoapAdapter implements PreferencesAdapter {
  constructor(private clientSoap: ClientSoap) {}

  public getPreferences(universalId: string): ClientPreferences {
    // Obtém preferências de e-mail do serviço SOAP
    const emailsXml = this.clientSoap.getEmailPreferences(universalId);
    const emails = emailsXml == null ? [] : emailsXml.split(',');

    // Obtém preferências de cartão de crédito
    let card = this.clientSoap.getCardPreferences(universalId);
    card = card == null ? '' : card;

    // Obtém preferências de telefone
    const phonesXml = this.clientSoap.getPhonePreferences(universalId);
    const phones = phonesXml == null ? [] : phonesXml.split(',');

    // Obtém preferências de endereço
    let address = this.clientSoap.getAddressPreference(universalId);
    address = address == null ? '' : address;

    return {
      emails,
      address,
      phones,
      card,
    };
  }
}
