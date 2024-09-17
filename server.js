require("dotenv").config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const Player = require("./models/players");
const connectToDB = require("./config/connectToDB");
connectToDB();



app.use(express.json());

app.use(express.static("public"));

app.use((req,res, next)=> {
    console.log("Middleware Hit! ")
    next();
})




app.get("/", (req, res)=>{
    res.send("Members Only")
})


app.get("/NBA", async (req, res) => {
    const player = await Player.find();
    console.log(`Fetching Players`);
    res.json({player: player})
})

app.get("/NBA/:id", async (req, res)=>{
    const playerId = req.params.id;
    const NBAID = await Player.findById(playerId);
    res.json({player: NBAID})
})



app.post("/NBA", async (req,res)=>{
    const {name, team, jerseyNumber,championships} = req.body
const player = await Player.create({
    name: name,
    team: team,
    jerseyNumber: jerseyNumber,
    championships: championships
}) 
console.log("Created Post")
res.json({player: player})
});




app.put("/NBA/:id", async (req,res)=>{
    const playerId = req.params.id
    const {name, team, jerseyNumber,championships} = req.body
    const player = await Player.findByIdAndUpdate(playerId,
        {name: name,
        team: team,
        jerseyNumber: jerseyNumber,
        championships: championships
    })

    const updatedPlayer = await Player.findById(playerId)
    res.json({player: updatedPlayer})

});



app.delete("/NBA/:id", async (req, res)=> {
    const playerId = req.params.id
    await Player.deleteOne({_id: playerId})
    res.json("Deletion has been sucessful")
})






app.listen(PORT, () => {
  console.log(`Connected to Server from PORT ${PORT}`);
});