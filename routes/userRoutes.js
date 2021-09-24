const jsonfile = require("jsonfile");

module.exports = app => {
    app.get("/users", (req, res) => {
        console.log("fetching all users");

        jsonfile.readFile("./DB/users.json", function(err, content) {
            res.send(content);
        });
    });

    app.post("/users/new", (req, res) => {
        const file_path = "./DB/users.json";

        let {email,username} = req.body;

        jsonfile.readFile(file_path, function(err, content) {
            content.push({ email, username });

            console.log("added " + email + " to DB");

            jsonfile.writeFile("./DB/users.json", content, function(err) {
                console.log(err);
            });

            res.sendStatus(200);
        });
    });

    app.delete("/users/destroy", (req, res) => {
        let email = req.body.email;

        jsonfile.readFile("./DB/users.json", function(err, content) {
            for (var i = content.length-1; i>=0; i--){
                if (content[i].email === email) {
                    console.log("removing " + content[i].email + " from DB");
                    content.splice(i,1);
                }
            }

            jsonfile.writeFile("./DB/users.json", content, function(err) {
                console.log(err);
            });

            res.sendStatus(200);
        });
    });

    app.put("/user", (req, res) => {
        const file_path = "./DB/users.json";
        let user;
        let username = req.body.username;
        let email    = req.query.email;
      
        jsonfile.readFile(file_path, function(err, content) {
          for (var i = content.length - 1; i >= 0; i--) {
            if (content[i].email === email) {
      
              console.log("updated user " + email + " has now username : " + username);
      
              user = content[i];
              user.username = username;
      
            }
          }
      
          jsonfile.writeFile(file_path, content, function(err) {
            console.log(err);
          });
      
        });

        res.send(user);
    });

    app.get("/user", (req, res) => {
        let user;
        let email = req.query.email;

        jsonfile.readFile("./DB/users.json", function(err, content) {
            for (var i = content.length-1; i>=0; i--){
                if (content[i].email === email) {
                    console.log("found user " + content[i]);
                    console.log(content[i]);
                    user = content[i];
                }
            }
        res.send(user);
        res.sendStatus(200);
        });
    });
}