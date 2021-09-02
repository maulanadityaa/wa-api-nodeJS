<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">WhastApp API NodeJS</h3>

  <p align="center">
    BOT Send Messages WhatsApp with NodeJS
    <br />
    <a href="https://github.com/maulanadityaa/wa-api-nodeJS"><strong>Explore the docs »</strong></a>
  </p>
</p>


### Built With

* [whatsapp-web.js](https://guide.wwebjs.dev/)
* [express](https://expressjs.com/)
* [socket.io](https://github.com/socketio/socket.io#readme)
* [qrcode](https://github.com/soldair/node-qrcode)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* pgAdmin or Other PostgreSQL Database Application
  [pgAdmin4 download](https://www.pgadmin.org/download/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/maulanadityaa/wa-api-nodeJS.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Import `wa_replies.sql` to your PGAdmin
4. Run
   ```sh
   npm run start:dev
   ```
5. Open your browser and go to address
   ```sh
   http://localhost:5000
   ```


<!-- USAGE EXAMPLES -->
## Usage

Simple Usage
```js
const { Client } = require('whatsapp-web.js');

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
    else if(msg.body){
        msg.reply('*BOT WA Auto Reply*\nPesan Anda akan dibalas secara berurutan dari bawah')
    }
});
```

ChatBot

**Message**|**Reply**
:-----:|:-----:
halo|hai
selamat pagi|pagii!
malam|malam juga
apa kabar?|baik, kamu bagaimana?
assalamuailkum|waalaikumsalam

<!-- CONTACT -->
## Contact

Maulana - [@waitasecs](https://twitter.com/waitasecs) - Instagram - [@maulanadityaa](https://instagram.com/maulanadityaa)

Project Link: [https://github.com/maulanadityaa/wa-api-nodeJS](https://github.com/maulanadityaa/wa-api-nodeJS)






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/github_username
