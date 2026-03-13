const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 300;
mongoose.connect('mongodb://localhost:27017/test');
try{
    console.log('Connected to MongoDB');
}catch(err){
    console.error('Error connecting to MongoDB:', err);
}
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(300, () => {
    console.log('Server is running on port 300');
});