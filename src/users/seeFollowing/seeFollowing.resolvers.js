import client  from "../../client";


export default {
  Query: {
    seeFollowing: async(_,{username,lastid})=>{
      
      const ok = await client.user.findUnique({
        where:{username},
        select:{id:true}
      });
      if(!ok){
        return{
          ok:false,
          error:"User not found."
        }
      }
      const following = await client.user
      .findUnique({where:{username},})
      .following({
        take: 5,
        skip: lastid ? 1 : 0,
        ...(lastid && {cursor:{id:lastid}}),
      });
      return{
        ok:true,
        following,
      }
    }
  }
}