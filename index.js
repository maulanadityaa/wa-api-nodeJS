const { Client, MessageMedia } = require("whatsapp-web.js");
const express = require("express");
const { body, validationResult } = require("express-validator");
const socketIO = require("socket.io");
const qrcode = require("qrcode");
const http = require("http");
const { noHpFormatter } = require("./helpers/formatter");
const fileUpload = require("express-fileupload");

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    debug: true,
  })
);

const db = require("./helpers/db");

(async () => {
  app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname });
  });

  const savedSession = await db.readSession();

  const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process", // <- this one doesn't works in Windows
        "--disable-gpu",
      ],
    },
    session: savedSession,
  });

  client.on("message", async (msg) => {
    const keyword = msg.body.toLowerCase()
    const replyMessage = await db.getReply(keyword)

    if(replyMessage !== false){
      msg.reply(replyMessage)
    }
    else if (msg.body == '!groups') {
      client.getChats().then(chats => {
        const groups = chats.filter(chat => chat.isGroup);
        if (groups.length == 0) {
          msg.reply('You have no group yet.');
        } else {
          let replyMsg = '*YOUR GROUPS*\n\n';
          groups.forEach((group, i) => {
            replyMsg += `ID: ${group.id._serialized}\nName: ${group.name}\n\n`;
          });
          replyMsg += '_You can use the group id to send a message to the group._'
          msg.reply(replyMsg);
        }
      });
    }
  });

  client.initialize();

  //SocketIO
  io.on("connection", function (socket) {
    socket.emit("message", "Connecting...");
    client.on("qr", (qr) => {
      console.log("QR Received!");
      qrcode.toDataURL(qr, (err, url) => {
        socket.emit("qr", url);
        socket.emit("message", "QR Received, Please Scan");
      });
    });

    client.on('authenticated', (session) => {
      socket.emit('authenticated', 'Whatsapp is authenticated!');
      socket.emit('message', 'Whatsapp is authenticated!');
      console.log('AUTHENTICATED', session);
      // Save session to DB
      db.saveSession(session);
    });

    client.on("ready", () => {
      socket.emit("message", "WhatsApp Client is Ready to Use!");
      socket.emit("ready", "WhatsApp Client is Ready to Use!");
    });

    client.on("auth_failure", function (session) {
      socket.emit("message", "Auth failure, restarting...");
    });

    client.on("disconnected", (reason) => {
      socket.emit("message", "Whatsapp is disconnected!");
      // Remove session from DB
      db.removeSession();
      client.destroy();
      client.initialize();
    });
  });

  const checkRegisteredNumber = async function (nohp) {
    const isRegistered = await client.isRegisteredUser(nohp);
    return isRegistered;
  };

  //Send Messages
  app.post(
    "/send-msg",
    [body("nohp").notEmpty(), body("msg").notEmpty()],
    async (req, res) => {
      const errors = validationResult(req).formatWith(({ msg }) => {
        return msg;
      });

      if (!errors.isEmpty()) {
        return res.status(422).json({
          status: false,
          message: errors.mapped(),
        });
      }

      const nohp = noHpFormatter(req.body.nohp);
      const msg = req.body.msg;

      const isRegisteredNumber = await checkRegisteredNumber(nohp);
      if (!isRegisteredNumber) {
        return res.status(422).json({
          status: false,
          message: "Nomor belum Terdaftar",
        });
      }

      client
        .sendMessage(nohp, msg)
        .then((response) => {
          res.status(200).json({
            status: true,
            response: response,
          });
        })
        .catch((err) => {
          res.status(500).json({
            status: false,
            response: err,
          });
        });
    }
  );

  //Send media
  app.post("/send-media", (req, res) => {
    const nohp = noHpFormatter(req.body.nohp);
    const caption = req.body.caption;
    const file = req.files.file;

    const media = new MessageMedia(
      file.mimetype,
      file.data.toString("base64"),
      file.name
    );

    client
      .sendMessage(nohp, media, { caption: caption })
      .then((response) => {
        res.status(200).json({
          status: true,
          response: response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          response: err,
        });
      });
  });

  server.listen(port, function () {
    console.log("Listen to Port : " + port);
  });
})();
