import admin from "firebase-admin";

import index from '../index';

const database:any = admin.initializeApp(index.firebaseConfig);


export default database;