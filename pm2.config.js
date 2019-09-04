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
        "PORT": 8091
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '/logs/errs.log',
      out_file: '/logs/out.log',
      pid_file: '/logs/childs.log',
      merge_logs: true,
    }
  ]
}
