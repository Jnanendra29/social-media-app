const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/social_media_development")

const db = mongoose.connection

db.on("error", (error) => [
    console.log("error in conncetion: ", error)
])

db.once("open", () => {
    console.log("Successfully connected to Database :: MongoDB")
})

module.exports = db