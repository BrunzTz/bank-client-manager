const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfeClientQuery',

  exposes: {
    './ClientListComponent': './src/app/client-query/pages/client-list/client-list.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket'
  ]
});