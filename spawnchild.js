// NodeJS Deeper Dive
// This Node.js script spawns a child process to run the 'ls' command, which lists files and directories in the current 
// directory. It's using the spawn function from the child_process module. The stdio option is set to 'inherit', which means 
// that the child process should use the same stdio streams as the parent process. The shell option is set to true, meaning 
// the command should be run inside a shell. Then it listens to the 'data' event on the child process's stdout (standard output) 
// and stderr (standard error) streams. If the child process writes something to stdout or stderr, the data is logged to the 
// console. Please note that in the provided code, the stdout and stderr handlers won't be called because the 'stdio' option is 
// set to 'inherit', meaning the child process's output goes directly to the console. These handlers are included here for 
// completeness and would be necessary if the 'stdio' option were set differently.

// Import the 'spawn' function from the 'child_process' module. This is used to spawn child processes
const { spawn } = require('child_process');

// Spawn a child process to run the 'ls' command. The 'stdio' option is set to 'inherit',
// which means that the child process should use the same stdio streams as the parent process.
// We also set the 'shell' option to 'true', which means the command should be run inside a shell.
const childProcess = spawn('ls', { 
    stdio: 'pipe',
    shell: true
});

// We attach a listener to the 'data' event on the child process's stdout (standard output) stream.
// When the child process writes something to stdout, we log that data to the console.
childProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

// We do the same for the child process's stderr (standard error) stream.
// If the child process writes something to stderr, we log that data to the console.
childProcess.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});
