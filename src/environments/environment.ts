// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  auth: {
    domain: 'universalcreditservice.auth0.com',
    clientID: 'DPG_iNtz9li8otKpNa5stjU33d1pibzw',
    callbackOnLocationHash: true,
    redirectOnSuccess: '/',
  },

  api: {
    appList: 'http://private-87cbae-heavywatervodlistapplications.apiary-mock.com/rest/vodlistapplications',
    addApp: 'http://private-1c675-heavywatervodorderservice.apiary-mock.com/rest/vodorder',
    appDetails: 'http://private-0226e-heavywatervodfinalreport.apiary-mock.com/rest/vodreport',
  },
};
