const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/submit-feedback", (req, res) => {
  const { name, rating, comments } = req.body;

  if (!name || !rating) {
    return res.status(400).send("Name and rating are required!");
  }

  const feedback = { name, rating, comments, date: new Date() };

  fs.readFile("feedback.json", "utf8", (err, data) => {
    const feedbacks = data ? JSON.parse(data) : [];
    feedbacks.push(feedback);

    fs.writeFile("feedback.json", JSON.stringify(feedbacks, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error saving feedback.");
      }
      // This line is corrected with backticks (`)
      res.send(`<h2>Thank you, ${name}! Your feedback has been recorded.</h2>`);
    });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));