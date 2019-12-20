const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Students = require("./students-model");

router.get("/", (req, res) => {
    Students.find()
        .then(student => {
            res.status(200).json(student)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
})


router.post("/register", (req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    Students.addStudent(user)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    Students.findStudent({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = signedToken(user);

                res.status(200).json({token, message: `Hello, ${user.username}.`});
            }
            else{
                res.status(401).json({message: "Invalid credentials"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/logout", (req, res) => {
    if(req.token){
        req.token.destroy();
        res.status(200).json({message: "You're now logged out."});
    }
    else{
        res.status(200).json({message: "Please log in to log out."})
    }
});

function signedToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    };

    const hush = process.env.JWT_SECRET || "Hush your mouth!!";

    const options = {expiresIn: "1h"};

    return jwt.sign(payload, hush, options);
}

module.exports = router;