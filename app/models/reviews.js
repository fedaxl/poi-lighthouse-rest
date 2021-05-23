"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const reviewSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    reviewDate: Date,
    reviewDetail: String,
    rating: Number,
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location",
    },
});

module.exports = Mongoose.model("Review", reviewSchema);