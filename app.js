const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const ejs = require('ejs');
const Listing = require('./Models/listing');

main().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send("app is running");
});

app.get('/tesListings', async(req, res) => {
    let sampleListings = new Listing({
        title: "Cozy Apartment in the Heart of the City",
        description: "A charming and cozy apartment located in the heart of the city, perfect for exploring local attractions and enjoying vibrant nightlife.",
        price: 7000,
        location: "Downtown",
        country: "USA"
    });
    await sampleListings.save();
    res.send("Sample listing created and saved to database");
    console.log("Listing saved to database");
});


async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/StayHub');
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});