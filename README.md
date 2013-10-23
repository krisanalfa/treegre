# treegre version 0.3.0

---

### Quick Intro

Treegre Chat Server with Node.js, Express.js, and Socket.IO.
Server is depend on **Node.js v >= 0.8.x**

---

### Installation

Make sure you have MongoDB server installed on your system

    $ sudo apt-get install mongodb-server

Install necessery database

    $ cd /path/to/project
    $ cd config/
    $ mongo < users_mongo.txt

Install it's deppendencies

    $ cd /path/to/project
    $ npm install --save

Registerring user require internet connection to send Email and Recaptcha. Edit them in lib/mailer/mailer.js, change your own config:

```
    auth: {
        XOAuthToken: nodemailer.createXOAuthGenerator({
            user: "",
            token: "",
            tokenSecret: ""
        })
    }
```

You can also change the 'from' message right there. For recaptcha change them in routes/index.js:

```
    var privateKey = '';
```

For authenticating change your host in routes/index.js:

```
    var host = "";
    // host -> http://localhost:8000
    var message = "[...snip...]";
```
---

### Quick Start

The quickest way to get run treegre server is:

    $ cd /path/to/project
    $ node treegre.js

We Recommend to use **supervisor**. The command is:

    $ sudo npm install supervisor --global
    $ cd /path/to/project
    $ supervisor --ignore public,views --quiet treegre.js

Or the simple way just do:

    $ sudo npm install supervisor --global
    $ cd /path/to/project
    $ npm start

---
### Note

**If you have an issue with very slow server response, please check your MongoDB connection**

---

### Key features

* Built with **Express.js**, it's blazing fast and stable
* Session and database stored at **MongoDB**, it's really fast
* Realtime chat with **socket.io**
* **EJS** templating, make the code cleaner
* Content negotiation
* Environment based configuration
* Responsive layout with **Twitter Bootstrap**
* Administration page
* User validation by email verification
* User reset by email address

---

### Contributors
    > Krisan Alfa Timur <programmer at PT. Sagara Xinix Solusitama>
    > Omega Hanggara (Sri Mega Anggroro) <programmer at PT. Sagara Xinix Solusitama>
    > Angela Crisanti (Annisa Dwy Santi) <Collegian at Universitas Pamulang>
---
