import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation:{
    createAccount: async (_, { firstName, lastName, username, email, password }) => {
      try{
      const existngUser = await client.user.findFirst({
        where: {
          OR: [
            { username }, 
            { email }
            
          ],
        },
      });
    
      if(existngUser){
        throw new Error("This username/password is already taken.")
      }
    
      const uglyPassword = await bcrypt.hash(password,10);
      return client.user.create({
        data:{ 

          username,
          email,
          firstName,
          lastName,
          password: uglyPassword,
        },
      });
    }catch(e){
      return e;
    }
    },

  }
}