import express, {NextFunction, Request, Response} from "express"; 
import User from "../service/user.service";
import admin from "../config/database";
const firestore = admin.firestore();
import { collection,doc, getDocs } from "firebase/firestore";

import {hashSync, genSaltSync, compareSync} from "bcryptjs";
import {sign} from "jsonwebtoken";
import nodemailer from "nodemailer";


export const userCRUD = {

  createUser: async (req:Request, res: Response, next:NextFunction) => {
    try {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      const random = Math.floor(Math.random() * 1000);
      await firestore.collection('users').doc().set(body);
      res.send('Record saved successfuly');
  
      let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        auth: {
          user: "sergehakobyan9596@mail.ru",
          pass: "Z4Jr41p4P2UW55CVcCeD"
        }
      });

      let mailOptions = {
        from: 'sergehakobyan9596@mail.ru',
        to: `${req.body.email}`,
        subject: 'My first Email!!!',
        text: random.toString() + " " + "This is verification code"
      };
      
      transporter.sendMail(mailOptions, function(err: any, info: any) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }

      })

      const accountSid = "ACa252bb5445b6bd16a11b0bab28676974";
      const authToken = "e129305a256b91195597d4cd1749f4bb";
      const client = require('twilio')(accountSid, authToken);

      client.messages
        .create({
            body: random.toString() + " " + 'Your code',
            from: '+13868887307',
            to:   `${req.body.phone}`
          })
        .then((message: any) => console.log(message.sid));
    } catch (error:any) {
        res.status(400).send(error.message);;
      }
  },




  logIn: async (req:Request, res: Response, next:NextFunction) => {
    try{
      const {email, password} = req.body;
      const usersDB: any =  firestore.collection('users');
      const existingUser = await usersDB.where("email", "==",email).get()

        if (existingUser.empty) {
          return res.status(401).send("User with that email not found")
        }
        else {
          existingUser.forEach((doc: any) => {
            const user = doc.data();
            
            if (user) {
              const result = compareSync(password, user.password);
              
              if (result) {
                Reflect.deleteProperty(user, 'password')    // The password is not visible
                const jwt = sign({ data: user }, "123", {
                  expiresIn: "1h"
                  });
                  return  res.send(user)
              }
              }
            
            });
    
          }
    } catch (error:any) {
        res.status(400).send(error.message);

    }
  },



 getUser: async (req:Request, res:Response, next:NextFunction) => {
   try {
       const id = req.body.id;
       const user = await firestore.collection('users').doc(id);
       const data = await user.get();
       if (!data.exists) {
           res.status(404).send('User with the given ID not found');
       } else {
           res.send(data.data());
       }
   } catch (error:any) {
       res.status(400).send(error.message);
   }
 },
}