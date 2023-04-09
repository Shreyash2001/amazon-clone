const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth')
const app = express();

app.use(express.json());
app.use(authRouter)

const DB = ""
mongoose.connect('mongodb+srv://admin-shreyash:shreyash123@cluster0.fvnxy.mongodb.net/amazon-clone?retryWrites=true&w=majority')
  .then(() => console.log('Connected to database successfully!!!')).catch((e) => {
    console.log(e);
  });



const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server Started Successfully on PORT ${PORT}!!!`));