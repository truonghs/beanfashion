const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Cấu hình CORS cho Express app
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Cho phép gửi cookie
  })
);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Xử lý các sự kiện kết nối
io.on("connection", (socket) => {
  console.log("A client connected");

  // Xử lý sự kiện khi có đơn hàng mới
  socket.on("newOrder", (order) => {
    // Phát lại đơn hàng mới đến tất cả các client đã kết nối
    io.emit("newOrder", order);
  });

  // Xử lý sự kiện khi có đơn hàng cập nhật 
  socket.on("updateOrder", (order) => {
    // Phát lại đơn hàng mới đến tất cả các client đã kết nối
    io.emit("updateOrder", order);
  });
  
  // Xử lý sự kiện khi có giảm giá
  socket.on("saleProduct", (msg) => {
    // Phát lại đơn hàng mới đến tất cả các client đã kết nối
    io.emit("saleProduct", msg);
  });
  // Xử lý sự kiện khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`WebSocket server is running on http://localhost:${PORT}`);
});
