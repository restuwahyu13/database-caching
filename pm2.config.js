const os = require('os')

module.exports = {
  apps: [
    {
      name: 'docker-horizontal-scaling',
      script: 'dist/main.js',
      watch: false,
      env: {
        NODE_ENV: process.env.NODE_ENV,
        NODE_OPTIONS: `--max-old-space-size=${process.env.MAX_OLD_SPACE} --v8-pool-size=${os.cpus().length} --napi-modules`,
        UV_THREADPOOL_SIZE: os.cpus().length
      },
      exec_mode: 'cluster',
      instances: 'max',
      max_memory_restart: '512M',
      listen_timeout: 3000,
      kill_timeout: 6000,
      combine_logs: true
    }
  ]
}
