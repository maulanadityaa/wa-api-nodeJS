const { Client } = require("whatsapp-web.js");
const express = require("express");
const { body, validationResult } = require("express-validator");
const socketIO = require("socket.io");
const qrcode = require("qrcode");
const fs = require("fs");
const http = require("http");
const { noHpFormatter } = require('./helpers/formatter')

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SESSION_FILE_PATH = "./wa-session.json";
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

const client = new Client({
  puppeteer: { headless: true },
  session: sessionCfg,
});

client.on("message", (msg) => {
  if (msg.body == "!ping") {
    msg.reply("pong");
  }
//   else if (msg.body) {
//     msg.reply(
//       "*BOT WA Auto Reply*\nPesan Anda akan dibalas secara berurutan dari bawah"
//     );
//   }
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

  client.on("ready", () => {
    socket.emit("message", "WhatsApp Client is Ready to Use!");
    socket.emit("ready", "WhatsApp Client is Ready to Use!");
  });

  client.on("authenticated", (session) => {
    socket.emit("authenticated", "WhatsApp Client is authenticated!");
    socket.emit("ready", "WhatsApp Client is authenticated!");
    console.log("AUTHENTICATED", session);
    sessionCfg = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
      if (err) {
        console.error(err);
      }
    });
  });
});

const checkRegisteredNumber = async function(nohp) {
    const isRegistered = await client.isRegisteredUser(nohp);
    return isRegistered;
  }

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
    if(!isRegisteredNumber){
        return res.status(422).json({
            status: false,
            message: 'Nomor belum Terdaftar'
        })
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

server.listen(5000, function () {
  console.log("Listen to Port : 5000");
});
