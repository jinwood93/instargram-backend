import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utills";
import fs, { createWriteStream } from "fs";

export default {
  Mutation:{
    editProfile: protectedResolver(
     async (
      _,
      {firstName,lastName,username,email,password:newPassword, bio, avatar},
      {loggedInUser}
      ) => {
      let avatarUrl = null;
      if(avatar){
        const {filename, createReadStream} = await avatar;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
        const readStream = createReadStream();
        const writeStream = createWriteStream(process.cwd()+"/uploads/"+loggedInUser.id+Date.now()+filename);
        readStream.pipe(writeStream);
        avatarUrl = `http://localhost:4000/static/${newFilename}`;
      }
      let uglyPassword = null;
      if(newPassword){
        uglyPassword = await bcrypt.hash(newPassword,10); 
      }
      const updatedUser = await client.user.update({
        where:{
          id:loggedInUser.id,
        },
        data:{
          firstName,
          lastName,
          username,
          email,
          bio,
          ...(uglyPassword && {password:uglyPassword}),
          ...(avatarUrl && {avatar:avatarUrl}),
        }
      });
      if(updatedUser){
        return{
          ok:true
        }
      }else{
        ok:false
        error:"Could not update Profile."
      }
    }
    )
  },
}