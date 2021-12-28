import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'FinalProject',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44332',
    redirectUri: baseUrl,
    clientId: 'FinalProject_App',
    responseType: 'code',
    scope: 'offline_access FinalProject',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44332',
      rootNamespace: 'Hieu.FinalProject',
    },
  },
} as Environment;
