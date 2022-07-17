require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Route = require('./routes');

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mearn-learnit.s3yxe.mongodb.net/?retryWrites=true&w=majority`,
        );

        console.log('MongoDB connected successfully');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

Route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
