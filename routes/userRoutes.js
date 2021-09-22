const jsonfile = require("jsonfile");

app.get("/users", (req, res) => {
    console.log("fetching all users");

    jsonfile.readFile("./DB/users.json", function(err, content) {
        res.send(content);
    });
  });