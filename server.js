// const { createServer } = require("http");
// const { parse } = require("url");
// const next = require("next");
// const { Server } = require("socket.io");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer((req, res) =>
//     handle(req, res));

//   const io = new Server(server, {
//     path: "/api/socket_io",
//   });

//   io.on("connection", (socket) => {
//     console.log("Client connected:", socket.id);

//     socket.on("message", (data) => {
//       io.emit("message", data);
//     });

//     socket.on("disconnect", () => {
//       console.log("Client disconnected:", socket.id);
//     });
//   });

//   const PORT = 3000;
//   server.listen(PORT, () => {
//     console.log(`> Server Ready on http://localhost:${PORT}`);
//   });
// });

require("ts-node/register");
const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");
const { db } = require("./lib/db");
const fs = require("fs");
const path = require("path");
const url = require("url");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname.startsWith("/storage/")) {
      // Serve static files from storage directory
      const filePath = path.join(__dirname, "storage", parsedUrl.pathname.replace("/storage/", ""));
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("404 Not Found");
          return;
        }
        // Set content-type for PDF
        if (filePath.endsWith(".pdf")) {
          res.writeHead(200, { "Content-Type": "application/pdf" });
        } else {
          res.writeHead(200);
        }
        res.end(data);
      });
      return;
    }
    
    handle(req, res);
  });

  const io = new Server(server, { path: "/api/socket_io" });

  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    socket.on("message", async (data) => {
      console.log("💬 Pesan diterima:", data);

      try {
        await db.execute("INSERT INTO pesan (content) VALUES (?)", [data.text]);
        console.log("📦 Pesan berhasil disimpan ke database.");
      } catch (error) {
        console.error("❌ Error saat menyimpan pesan:", error);
      }

      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("⚠️ Client disconnected:", socket.id);
    });
  });

  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Server Ready on http://localhost:${PORT}`);
  });
});
