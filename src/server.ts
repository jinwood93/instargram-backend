require('dotenv').config();
import express from "express";
import {ApolloServer} from "apollo-server-express";
import { getUser } from "./users/users.utills";
import schema from "./schema";
import logger from "morgan";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  schema,
  context: async({req})=>{
    return{
      loggedInUser: await getUser(req.headers.token),
    }
  }
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({app});
app.use("/static",express.static("uploads"));
app.listen({port:PORT},() => {
console.log(`🐶Server running on http://localhost:${PORT}/`);
});