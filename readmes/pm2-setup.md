To run two Node.js processes (`node server/main.js` and `serve client -p 4200`) using PM2 and have them start automatically on Raspberry Pi startup, you can follow these step-by-step instructions:

1. Install PM2 globally on your Raspberry Pi by running the following command:

   ```
   sudo npm install -g pm2
   ```

2. Create a new directory for your project (if it doesn't exist already) and navigate into it using the `cd` command. For example:

   ```
   mkdir my-project
   cd my-project
   ```

3. Create a file named `ecosystem.config.js` in your project directory and open it for editing.

4. Add the following content to the `ecosystem.config.js` file:

   ```javascript
   module.exports = {
     apps: [
       {
         name: 'server',
         cwd: '/path/to/kater-speedo-build',
         script: 'node',
         args: 'server/main.js',
       },
       {
         name: 'client',
         cwd: '/path/to/kater-speedo-build',
         script: 'serve',
         args: 'client -p 4200',
       },
       {
         name: 'chromium',
         cwd: '/path/to/kater-speedo-build',
         script: 'chromium-browser',
         args: '--start-fullscreen http://localhost:4200',
         exec_interpreter: 'none',
         exec_mode: 'fork',
       },
     ],
   };
   ```

   Replace `/path/to/kater-speedo-build` with the actual path to the `kater-speedo-build` directory on your Raspberry Pi.

5. Save and close the `ecosystem.config.js` file.

6. Open a terminal on your Raspberry Pi and navigate to your project directory using the `cd` command.

7. Start the Node.js processes using PM2 by running the following command:

   ```
   pm2 start ecosystem.config.js
   ```

   PM2 will read the configuration file and start the `server` and `client` processes.

8. Verify that the processes are running correctly by executing the following command:

   ```
   pm2 status
   ```

   This command will display the status of your running processes.

9. To ensure that PM2 automatically starts your Node.js processes on Raspberry Pi startup, run the following command:

   ```
   pm2 startup systemd
   ```

   PM2 will generate a command that you need to run to set up the startup script.

10. Copy the generated command provided by PM2 and execute it in the terminal.

11. Finally, save the current PM2 process list so that it is restored on Raspberry Pi reboot by running the following command:

    ```
    pm2 save
    ```

    This will save the current PM2 configuration.

Now, whenever your Raspberry Pi starts up, PM2 will automatically start the `server` and `client` processes as configured in the `ecosystem.config.js` file.

Please note that you need to replace `/path/to/kater-speedo-build` in the `ecosystem.config.js` file with the actual path to the `kater-speedo-build` directory on your Raspberry Pi.

# start chromium

Edit this file

```
sudo nano /etc/xdg/lxsession/LXDE-pi/autostart
```

And add this:

````
@xset s off
@xset -dpms
@xset s noblank
@chromium-browser --kiosk http://google.com/  # load chromium after boot and open the website in full screen mode```
````
