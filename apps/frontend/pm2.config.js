module.exports = {
  apps: [
    {
      name: 'qntdrtii',
      exec_mode: 'cluster',
      instances: 8,
      args: 'start',
      script: './node_modules/next/dist/bin/next',
      watch: false,
      autorestart: true,
      combine_logs: true,
      exp_backoff_restart_delay: 100,
      ignore_watch: ['node_modules'],
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './pm2/logs/qntdrtii_err.log'
    }
  ]
}
