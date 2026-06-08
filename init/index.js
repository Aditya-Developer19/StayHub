const mongoose = require('mongoose');
const initData = require('./data');
const Listing = require('../Models/listing');

console.log('initData keys:', Object.keys(initData));
console.log('initData.data type:', typeof initData.data);
console.log('initData.data is array:', Array.isArray(initData.data));
console.log('initData.data[0]:', JSON.stringify(initData.data[0], null, 2));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/StayHub');
    console.log('Connected to MongoDB');
    await initDb();
}

async function initDb(){
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log('Database initialized with sample data');   
}

main().catch(err => console.log(err));