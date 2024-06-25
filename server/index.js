// const express = require("express");
// const app = express();

// const userRoutes = require("./routes/User");
// const profileRoutes = require("./routes/Profile");
// const paymentRoutes = require("./routes/Payments");
// const courseRoutes = require("./routes/Course");
// const contactUsRoute = require("./routes/Contact");
// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const {cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");

// dotenv.config();
// const PORT = process.env.PORT || 4000;

// //database connect
// database.connect();
// //middlewares
// app.use(express.json());
// app.use(cookieParser());


// app.use(
// 	cors({
// 		// origin:"http://localhost:3000",
// 		origin: "*",
// 		credentials:true,
// 	})
// )


// // Update your CORS configuration
// // const allowedOrigins = ['http://localhost:3000', 'https://ed-tech-platform-gamma.vercel.app','http://ed-tech-platform-gamma.vercel.app'];

// // app.use(cors({
// //   origin: function (origin, callback) {
// //     if (!origin) return callback(null, true); // Allow requests with no origin, like mobile apps or curl requests
// //     if (allowedOrigins.indexOf(origin) === -1) {
// //       const msg = 'The CORS policy for this site does not allow access from the specified origin.';
// //       return callback(new Error(msg), false);
// //     }
// //     return callback(null, true);
// //   }
// // }));

// app.use(
// 	fileUpload({
// 		useTempFiles:true,
// 		tempFileDir:"/tmp",
// 	})
// )
// //cloudinary connection
// cloudinaryConnect();

// //routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

// //def route

// app.get("/", (req, res) => {
// 	return res.json({
// 		success:true,
// 		message:'Your server is up and running....'
// 	});
// });

// app.listen(PORT, () => {
// 	console.log(`App is running at ${PORT}`)
// })


const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connect
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Allow all origins
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp",
}));

// Cloudinary connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

