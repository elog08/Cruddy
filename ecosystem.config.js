module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // Client Development Application
    {
      name      : 'cruddy-client-dev',
      script    : 'npm',
      args      : 'start',
      cwd       : 'client',
      env: {
        NODE_ENV: 'development',
        PORT    : 8080
      }
    },
    // Server
    {
      name      : 'cruddy-server',
      script    : './src/index.js',
      watch     :  true,
      cwd       : 'server',
      env: {
        NODE_ENV: 'development',
        PORT    : 8081
      }
    },
  ],
};
