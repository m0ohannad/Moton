require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/route');
const cors = require('cors');
const path = require('path');

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    routes(app);

    if (process.env.NODE_ENV === 'production') {
      console.log("yes yes yes");
      app.use(express.static(path.join(__dirname, "client", "build")));
      app.get('*', (req, res) => {
        res.sendFile(
          path.resolve(__dirname, "client", "build", "index.html")
        );
      });
    }

    // app.use(express.static(path.join(__dirname, "client", "build")));
    // app.get("*", (req, res) => {
    //   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    // });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`server is ready for connection on port ${PORT}`);
    })
  } catch (error) {
    console.error(error)
  }
}

start();