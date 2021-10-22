import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) =>{
  try {
    const {id} = await jwt.verify(token,process.env .SECRET_KEY);
    const user = await client.user.findUnique({where:{id}});
      if(user){
        return user;
      }else{
        return null;
      }
    } catch {
    return null;
  }
};

export const protectedResolver = (ourResolver) => (
  root,
  arg,
  context,
  info
  )=> {
  if(!context.loggedInUser){
    return {
      ok:false,
      error:"Please log in to perform this action."
    };
  }
  return ourResolver(root, arg, context, info);
}
