export interface ClientPreferences {
  emails: string[];
  address: string;
  phones: string[];
  card: string;
}

export interface PreferencesAdapter {
  getPreferences(universalId: string): ClientPreferences;
}
