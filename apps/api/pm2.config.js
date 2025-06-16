module.exports = {
  apps: [
    {
      name: 'qntdrtii',
      exec_mode: 'cluster',
      instances: 4,
      script: './dist/main.js',
      watch: false,
      autorestart: true,
      combine_logs: true,
      exp_backoff_restart_delay: 100,
      ignore_watch: ['node_modules'],
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      out_file: './pm2/logs/qntdrtii_out.log',
      error_file: './pm2/logs/qntdrtii_err.log'
    }
  ]
}
