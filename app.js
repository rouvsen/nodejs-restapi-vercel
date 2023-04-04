const app = require("express")();
const db = require("./db.json");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get("/users", (req, res) => {
    res.send(200, db);
  });

app.get("/users/:id", (req,res) => {
    if(isNaN(req.params.id)){
        res.send(400,{message: "Unprocessable data.."});
    } else {
        const user = db.find(u => u.id == req.params.id)
        if(user){
            res.send(200,user);
        } else {
            res.send(404,{message: "User not found.."});
        }
    }
});

app.post("/users", (req,res) => {
    const willSaveData = {
            full_name: req.body.full_name,
            country: req.body.country,
            created_at: new Date(),
            id: new Date().getTime(),
            email: req.body.email
        }
    db.push(willSaveData);
    res.send(willSaveData);
});

app.patch("/users/:id", (req,res) => {
    if(isNaN(req.params.id)){
        res.send(400, {message: "Unprocessable data.."});
    } else {
        const user = db.find(u => u.id == req.params.id)
        if(user){
            Object.keys(req.body).forEach(key => {
                user[key] = req.body[key];
            })
            res.send(200, user);
        } else {
            res.send(404,{message: "User not found.."});
        }
    }
});

app.delete("/users/:id", (req,res) => {
    if(isNaN(req.params.id)){
        res.send(400, () => {
            message: "Unprocessable data.."
        })
    } else {
        const userIndex = db.findIndex(u => u.id == req.params.id);
        if(userIndex > -1){
            db.splice(userIndex, 1);
            res.send(201, {
                message: "User deleted.."
            })
        } else {
            res.send(404, {
                message: "User not found.."
            })
        }
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is Up.. It is Running..");
});