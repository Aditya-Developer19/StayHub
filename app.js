const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const ejs = require('ejs');
const Listing = require('./Models/listing');
const path = require("path");
const methodOverride = require("method-override");

main().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/StayHub');
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.get('/', (req, res) => {
    res.send("app is running");
});

//Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

// sample route to create a listing and save to database
// app.get('/tesListings', async(req, res) => {
//     let sampleListings = new Listing({
//         title: "Cozy Apartment in the Heart of the City",
//         description: "A charming and cozy apartment located in the heart of the city, perfect for exploring local attractions and enjoying vibrant nightlife.",
//         price: 7000,
//         location: "Downtown",
//         country: "USA"
//     });
//     await sampleListings.save();
//     res.send("Sample listing created and saved to database");
//     console.log("Listing saved to database");
// });



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});