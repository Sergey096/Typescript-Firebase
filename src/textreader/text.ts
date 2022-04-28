import express, { NextFunction, Request, Response } from "express";
import User from "../service/user.service";
import admin from "../config/database";
const firestore = admin.firestore();
import fs from "fs";
import { resolve, join, dirname } from "path";

export const usersText = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await firestore.collection("users");
      const data: any = await users.get();
      const usersArray: any[] = [];
      if (data.length === 0) {
        res.status(404).send("No user record found");
      } else {
        data.forEach((doc: any) => {
          const user = new User(
            doc.id,
            doc.data().firstName,
            doc.data().lastName,
            doc.data().email,
            doc.data().password,
            doc.data().phone
          );
          usersArray.push(user);
        });
        function writeInFile(ext: String) {
          if (ext === "csv") {
            fs.writeFileSync("src/textreader/text.csv", csvString);
          } else if (ext === "xlsx") {
            fs.writeFileSync("src/textreader/text.xlsx", csvString);
          } else {
            fs.writeFileSync("src/textreader/text.txt", csvString);
          }
        }
        const csvString = [
          [
            "User ID",
            "User Firstname",
            "User Lastname",
            "User Email",
            "User Password",
          ],
          ...usersArray.map((item) => [
            item.id,
            item.firstName,
            item.lastName,
            item.email,
            item.password,
          ]),
        ]
          .map((e) => e.join(","))
          .join("\n");

        writeInFile("xlsx");
        res.send(csvString);
      }
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  },
};
