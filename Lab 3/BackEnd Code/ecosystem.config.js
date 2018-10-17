module.exports = {
  apps: [{
    name: 'SSAD',
    script: './server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-197-243-11.eu-central-1.compute.amazonaws.com',
      key: '~/.ssh/SSAD.pem',
      ref: 'origin/master',
      repo: 'git@github.com:harditsingh/SSAD.git',
      path: '/home/ubuntu/server',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
