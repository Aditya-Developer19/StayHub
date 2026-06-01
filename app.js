const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const ejs = require('ejs');

main().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/StayHub');
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});