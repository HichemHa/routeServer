const express = require("express");
const User = require("../model/User");

const router = express.Router();

router.post("/add", async (req, res) => {
  let dataToInsert = await req.body;
  let userNameX = dataToInsert.email;
  console.log(userNameX);
  const searchResult = await User.findOne({ email: userNameX });
  console.log("searchResult", searchResult);
  if (searchResult) return res.status(404).json({ msg: `User already exist` });
  try {
  

      const newUser = new User(dataToInsert);
      await newUser.save();
      await res.status(201).json({ msg: "User added succesfuly" });
    
  } catch (error) {
    console.error("failed ", error);
  }
});

router.get("/getall", async (req, res) => {
  try {
    const allUsers = await User.find();
    await res.status(201).json(allUsers);
  } catch (error) {
    console.error("getting Users failed", error);
    res.status(401).json({ msg: `getting Users Failed` });
  }
});

router.post("/login", async (req, res) => {
  let userData = await req.body;
    console.log(userData)
  let fetchResult = await User.find({ email: userData.email });

console.log(fetchResult , "vs", userData.email)

    if (fetchResult.length !== 0  ) {
                if(fetchResult[0].email === userData.email){
                                    if (fetchResult[0].password === userData.password) {
                                        res.status(200).json({ token: Math.random().toString().slice(2, 11) })
                                    }else{
                                        res.send("wrong password");
                                    }
                }else{
                    res.json("email is worng")
                }
    } else {
        res.json("something is worng")
    }



});

module.exports = router;
