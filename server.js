const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/taskmap");

const data=new mongoose.model("todo",mongoose.Schema({
  text:String
}))

app.get("/todos",async(req,res)=>{
  res.json(await data.find());
})

app.post("/todos",async(req,res)=>{
  const t=(await data.create({text:req.body.text}))
  res.json(t)
})

app.delete("/todos/:id",async(req,res)=>{
  await data.findByIdAndDelete(req.params.id)
  res.json({ok:true})
})

app.put('/todos/:id',async(req,res)=>{
  const update=await data.findByIdAndUpdate(
    req.params.id,
    {text:req.body.text},
    {new:true}
  );
  res.json(update);
})

const port=3545;
app.listen(port,()=>{
  console.log(`http://localhost:${port}`);
})