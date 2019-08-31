module.exports = {
  apps: [
    {
      name: 'aih',
      script: './dist/server.js',
      instances: 1,
      exec_mode: 'cluster',
      watch: true,
      cwd: './',
      env: {
        "PORT": 8099
      }
    }
  ]
}
