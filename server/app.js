const express = require('express');
const app = express();

const bcrypt = require('bcryptjs');

const cors = require('cors');


const jwt = require('jsonwebtoken');
const JWT_s3EC = "icebidcwbieh923hhwc"
app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
Mongo_URL="mongodb+srv://admin31:admin31@cluster01.xabyhrv.mongodb.net/?retryWrites=true&w=majority"

app.listen(5000,() =>{
    console.log('Server started');
});


mongoose
    .connect(Mongo_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Mongodb Connected..."))
    .catch((err) => console.error(err));



app.post("/pst", async (req, res) =>
{
        console.log(req.body);
        const {data} = req.body;
    try {
        if (data =='hi')
        {res.send({status:'ok'});}
    else{{
        res.send({status:'not ok'});
    }

    } }catch (error) {res.send({status:'ok'})};
    
})


require("./userDetail");

const User = mongoose.model("UserDetails")

app.post("/reg", async (req, res) =>
{  const{fname, lname, email, password} = req.body
console.log(11);
   const enrcy_pass = await bcrypt.hash(password, 10) 
        console.log(enrcy_pass);
        console.log(1221);
        const {data} = req.body;
    try {
        const oldUser = await User.findOne({email});

        if (oldUser){
            return res.send({error:"user exist"});
        }
        await User.create({
            fname,
            lname,
            email,
            password: enrcy_pass,
        });
        res.send({status:'ok1'})
    }catch (error) {res.send({status:'error'})};
    
})


app.post("/login", async (req, res) =>
{  const{email, password} = req.body

   
        const userpresent = await User.findOne({email});

        if (!userpresent){
            return res.send({error:"user  not exist"});
        }

        if (await bcrypt.compare(password, userpresent.password)){
            const token = jwt.sign({email:userpresent.email}, JWT_s3EC);

            if (res.status(201)){
                return res.json({status: 'ok', data:token});
            } else {
                return res.json({error: 'errorok'});
            }
        }
   res.json({status: 'error password wrong'})
    
})


app.post("/login", async (req, res) =>
{  const{email, password} = req.body

   
        const userpresent = await User.findOne({email});

        if (!userpresent){
            return res.send({error:"user  not exist"});
        }

        if (await bcrypt.compare(password, userpresent.password)){
            const token = jwt.sign({email:userpresent.email}, JWT_s3EC);

            if (res.status(201)){
                return res.json({status: 'ok', data:token});
            } else {
                return res.json({error: 'errorok'});
            }
        }
   res.json({status: 'error password wrong'})
    
})


app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_s3EC)
      console.log(user)
      const useremail = user.email;
      User.findOne({ email: useremail })
        .then((data) => {
          res.send({ status: "ok", data: data });
        })
        .catch((error) => {
          res.send({ status: "error", data: error });
        });
    } catch (error) { }
  });