router.post("/collections", async(req,res)=>{
 const slug=req.body.name+"-"+Date.now();

 const col=await Collection.create({
   name:req.body.name,
   slug
 });

 res.json(col);
});
