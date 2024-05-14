const { error } = require("console");
const express = require("express")

const app = express()

const port = 8000;

app.listen(port,() => {
    try{
        console.log(`server is up and running on port ${port}`)
    }catch(error){
        console.log("error in connection: ", error)
    }
})