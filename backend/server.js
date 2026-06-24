const express = require("express");
const cors = require("cors");

const processHierarchy = require("./hierarchyProcessor");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("bfhl api is running");
});

app.post("/bfhl", (req, res) => {

    const data = req.body.data || [];

    const result = processHierarchy(data);

    res.json({
        user_id: "kavyakukreja_24062026",
        email_id: "kavya0794.be23@chitkara.edu.in",
        college_roll_number: "2310990794",
        ...result
    });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});