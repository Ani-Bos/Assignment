import express from "express";
import User from "../Model/Model.js";
import { json2csv } from "json-2-csv";
const router = express.Router();

router.post("/download", async (req, res) => {
  console.log("Enter into Downloading");
   const { name, email, age, phoneNumber ,uniquetoken} = req.body;
  try {
    console.log("name is " + name);
    console.log("email is " + email);
    console.log("age is " + age);
    console.log("phone is " + phoneNumber);
    console.log("length is " + name.length)
   for (let i = 0; i < name.length; i++) {
     const userData = {
       name: name[i],
       email: email[i],
       age: age[i],
       phoneNumber: phoneNumber[i],
       uniquetoken
     };
     await User.create(userData);
   }
    res.status(200).json({ message: "User data saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/csvfile/:id", async (req, res) => {
  try {
    const userData = await User.find({uniquetoken:req.params.id});
    let user = userData.map((e) => {
      return {
        name: e.name,
        email:e.email,
        age: e.age,
        phoneNumber:e.phoneNumber
      }
    })
    
    const csvData =  json2csv(user, {
      fields: ["name", "email", "age", "phoneNumber"],
    });
    console.log(csvData)
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=usersData.csv");
    res.status(200).send(csvData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
