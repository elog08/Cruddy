module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // Client Development Application
    {
      name      : 'cruddy-client',
      script    : 'npm',
      args      : 'run prod',
      cwd       : 'client',
      env: {
        PORT    : 8080
      },
      env_production: {
        NODE_ENV: 'production',
        PORT    : 8080
      }
    },
    // Server
    {
      name      : 'cruddy-server',
      script    : 'npm',
      args:    'start',
      cwd       : 'server',
      env: {
        PORT    : 8081
      },
      env_production: {
        NODE_ENV: 'production',
        PORT    : 8081
      }
    },
  ],
};
