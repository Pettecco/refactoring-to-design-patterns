import { ClientSoap } from './ClientSoap.js';
import { ClientPreferences } from './types.js';

export class Client {
  constructor(
    private universalId: string,
    private clientSoap: ClientSoap
  ) {}

  public getPreferences(): string {
    // Obtém preferências de e-mail do serviço SOAP
    const emailsXml = this.clientSoap.getEmailPreferences(this.universalId);
    const emails = emailsXml == null ? [] : emailsXml.split(',');

    // Obtém preferências de cartão de crédito
    let card = this.clientSoap.getCardPreferences(this.universalId);
    card = card == null ? '' : card;

    // Obtém preferências de telefone
    const phonesXml = this.clientSoap.getPhonePreferences(this.universalId);
    const phones = phonesXml == null ? [] : phonesXml.split(',');

    // Obtém preferências de endereço
    let address = this.clientSoap.getAddressPreference(this.universalId);
    address = address == null ? '' : address;

    const clientPreferences: ClientPreferences = {
      emails,
      address,
      phones,
      card,
    };

    return JSON.stringify(clientPreferences);
  }
}
