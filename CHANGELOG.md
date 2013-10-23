```
Version 0.0.01
--------------
Pure skeleton with these features:
- Session management, storage still in memory
- Basic routing now based on application implement
- Using Bootstrap and Font Awesome Icon
- Data still based on JSON file in /config/users.json
- Removing well banner on user index

/**********************************************************************************/

Version 0.0.02
--------------
- Logout now become a link
- Add basic console chat message (skeleton for Socket-IO is ready)
- If you go to index, server will redirect you to login if you have no any session,
  if you do, server wil redirect you to user page
- Add basic skeleton for SPA
- Regenerate SSL Certificate and Key
- Add color, connect, response, and request modules
- Add NIM for user data
- Removing index page
- Much more tweak for server performance
/`````````````````````````````````````````````````````````````````````````````````/
- Adding new element on Account Setting
- Fixing link for Logout
- Adding notiffication for user connected, it's still buggy by the way
/`````````````````````````````````````````````````````````````````````````````````/
- Remove emit to sender, so server would be lighter
- Connection of socket.io change to global connection
/`````````````````````````````````````````````````````````````````````````````````/
- Add script test on package.json
- Updating README.md file
- Removing log command on some controllers
/`````````````````````````````````````````````````````````````````````````````````/
- Edit Omega Hanggara's Bio
/`````````````````````````````````````````````````````````````````````````````````/
- Edited server.key using 2048 bit encription
- file server.ket now approved by verisign (=
- For best result, change file /etc/hosts first line from "127.0.0.1 localhost" to
  "127.0.0.1 sunstrike.org" then access TREEGRE by opening URL
  https://sunstrike.org:8000. This method has been proved to remove Google Chrome
  certificate issue.

/**********************************************************************************/

Version 0.0.03
--------------
- Chat now implemented to DOM object
- Fix issue to serve broadcast emit from server
/`````````````````````````````````````````````````````````````````````````````````/
- Major fix for credentials, we should use HTTP for faster development
- Add clear chat button
- Handle for empty text chat
- Minor fix for new bind address
- Clear logging so server will be lighter
- Client script will be executed when DOM is ready
- Client script compressed and cleaned, it will improve it's performance

/**********************************************************************************/

Version 0.0.04
--------------
- Listing user online
- npm test will be quieter
/`````````````````````````````````````````````````````````````````````````````````/
- Fix fatal issue, cannot type any chat to chat text input
/`````````````````````````````````````````````````````````````````````````````````/
- Key press "Enter" on text chat input would emit chat event
/`````````````````````````````````````````````````````````````````````````````````/
- Add some features, disabled chat button until there's text input
- Add some features, cannot send chat until key press "Enter" on text chat input,
  until there's text input
/`````````````````````````````````````````````````````````````````````````````````/
- Add some features, anti junk. When you type a same text chat for three times,
  you will be warned, if you ignored it, you will be kicked!

/**********************************************************************************/

Version 0.0.05
--------------
- Run with "npm start"
- Adding database for data storage
- Adding database for session storage
/`````````````````````````````````````````````````````````````````````````````````/
- Add autoclean expired session
- Fix some bugs

/**********************************************************************************/

Version 0.0.1
--------------
- Added CRUD controller
- Splitting page to several chunk
- Some client performance tweak

/**********************************************************************************/

Version 0.1.0
--------------
- "Remember Me" now implemented
- Database now using MD5, please update your database using this steps:
  $ cd /path/to/project
  $ cd config/
  $ mongo < users_mongo.txt
/`````````````````````````````````````````````````````````````````````````````````/
- Now added special page for Admin please update your database
- Fix several session management
- Added new routing for admin
- Added read only user management
- Login admin with username = root, password = w00t
/`````````````````````````````````````````````````````````````````````````````````/
- Adding new library for jQuery MD5
/`````````````````````````````````````````````````````````````````````````````````/
- Adding root control and useradd form control
/`````````````````````````````````````````````````````````````````````````````````/
- Added functions to update root password
- Change route schema
- Added some message page
/`````````````````````````````````````````````````````````````````````````````````/
- Optimized for Android Device (tested with Mozilla Firefox)
/`````````````````````````````````````````````````````````````````````````````````/
- Optimizing socket.io
- Added feature to add user (not restrict it's only basic features need more
  attention)
- Change routing schema
- Added verifying form before submit (need more attention)
/`````````````````````````````````````````````````````````````````````````````````/
- User adding feature now is restricted
- Change routing schema, message and other routing
- Added feature to change user password
- Added new message
- Added new library to verify if user is root or not
- Optimizing javascript client script
- Added new route schema to handle user message after updating resource
- Ignoring "npm-debug.log"

/**********************************************************************************/

Version 0.1.1
--------------
- Added developer to test HTML page result. Use it with:
  * Create a test page in folder "views/dev/"
  * Go to "host:port/dev/yourpagename
  * Tho browser will render yourpagename refer to yourpagename.ejs inside
    "views/dev/" folder
- Ignoring cache folder
- Minifying javascript
/`````````````````````````````````````````````````````````````````````````````````/
- Added routing to 404 page
/`````````````````````````````````````````````````````````````````````````````````/
- Added new index page
- Change some routing schema
- Register not implemented yet

/**********************************************************************************/

Version 0.2.0
--------------
- Migrated to general application
- Change some routing schema (message)
- Adding new session for guest user
- Added some library (mailer, generate)
- No need to update your database, it's only schema
- Cleaning css and javascript client side
- Optimizing session rules script
/`````````````````````````````````````````````````````````````````````````````````/
- Add captcha and modifying pagination method
- Modifying session route method (is-admin?)
/`````````````````````````````````````````````````````````````````````````````````/
- Add extra message (success and error)
- Change some routing
- Optimizing javascript on client side (message)
- Change mailer callback method

/**********************************************************************************/

Version 0.3.0
--------------
- Add forgot password features
/`````````````````````````````````````````````````````````````````````````````````/
- Add emoticon features on chat
/`````````````````````````````````````````````````````````````````````````````````/
- Compressing CSS documents
- Change styling schema
- Added fontomizer script
- Release to public
```
