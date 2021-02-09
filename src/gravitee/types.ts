type Brand<K, T> = K & { __brand: T };

export type ApiKey = Brand<string, 'ApiKey'>;

export type EnrichedApplication = {
  id: string;
  name: string;
  scopes: string;
  clientId: string;
};
