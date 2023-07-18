const { spawn } = require('child_process');

const output = spawn('ls', { 
    stdio: 'inherit',
    shell: true
});

output.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

output.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});
