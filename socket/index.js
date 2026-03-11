const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = [];
const addUser = (userId, socketId) => {
  const existingUser = users.find((user) => user.userId === userId);
  if (existingUser) {
    existingUser.socketId = socketId;
  } else {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  // when connect
  console.log("a user connected");
  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and get message
  socket.on("sendMessage", ({ userId, receiverId, text }) => {
    console.log("📨 sendMessage received:", { userId, receiverId, text });
    console.log("👥 current users:", users);
    const user = users.find((user) => user.userId === receiverId);
    console.log("🎯 receiver found:", user);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId: userId,
        text,
      });
    }
  });

  // when disConnect
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
