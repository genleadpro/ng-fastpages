// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import env from './.env';

export const environment = {
  appTitle: 'NG-FastPages',
  production: false,
  envName: 'DEV',
  version: env.npm_package_version + '-dev',
  serverUrl: 'http://fastpages.code:8000/api/v1',
  authEndpoint: 'http://fastpages.code:8000/api/auth',
  apiEndpoint: 'http://fastpages.code:8000/api/v1',
  apiProtocol: 'http', // or 'https'
  //apiHost: It is different by server tenant
  apiPort: '8000', // used to compose tenant api end point
  apiPath: '/api/v1', // used to compose tenant api end point
  whiteLists: ["fastpages.code:8000", "fastpages.code"],
  serverDateFormat: 'YYYY-MM-DD',
  serverDateTimeFormat: 'YYYY-MM-DD hh:mm:ss'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
