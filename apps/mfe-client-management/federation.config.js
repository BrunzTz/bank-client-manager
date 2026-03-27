const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfeClientManagement',

  exposes: {
    './ClientManagementPageComponent': './src/app/client-management/pages/client-management-page/client-management-page.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    'primeng',
    'primeicons',
    '@primeng/themes',
    /^@primeng\/themes\//,
    /^primeng\//,
    '@angular/cdk'
  ]
});