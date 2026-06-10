import { PreferencesAdapter } from './types.js';

export class Client {
  constructor(
    private universalId: string,
    private preferencesAdapter: PreferencesAdapter
  ) {}

  public getPreferences(): string {
    const clientPreferences = this.preferencesAdapter.getPreferences(
      this.universalId
    );
    return JSON.stringify(clientPreferences);
  }
}
