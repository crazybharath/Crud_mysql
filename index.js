 const express=require('express');
 const bodyParser=require('body-parser');
 const sql=require('mysql');
 const server=express();
 const port=3000;
 server.use(bodyParser.json())
const db=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"practice"
})
 db.connect(function(error){
    if(error){
        console.log("something error in database");
    }else{
        console.log("successfully connected to db");
    }
 })
 //upload the record
 
server.post("/api/student/add",async(req,res)=>{
    let details={
        stname:req.body.stname,
        course:req.body.course,
        fee:req.body.fee
    };
    let sq="INSERT INTO student SET ?";
    db.query(sq,details,(err)=>{
        if(err){
            res.send({status:false, message:"student created failure"});
        }else{
            res.send({status:true,message:"student created successfully"})
        }
    });
});
// get the record

server.get("/api/student",(req,res)=>{
   var sq="SELECT * FROM student";
    db.query(sq,function(err,result){
        if(err){
            console.log("Error in Connecting");
        }else{
            res.send({status:true, data:result});
        }
    });
});

//get a particular data

server.get("/api/student/:id",(req,res)=>{
    var studentid=req.params.id;
    var sq=`SELECT * FROM student WHERE id=${studentid}`;
    db.query(sq,function(err,result){
        if(err){
            console.log("Error Connecting to DB");
        }else{
            res.send({status:true, data:result})
        }
    });
});
//update a data

server.put("/api/student/update/:id",(req,res)=>{
    let sq=`UPDATE student SET stname='${req.body.stname}',course='${req.body.course}',fee='${req.body.fee}' WHERE id=${req.params.id}`;
    console.log(sq);
    let a =db.query(sq,(err,result)=>{
        if(err){
            res.send({status:false,message:"student updates failed"})
        }else{
            res.send({status:true,message:"student updated successfully"})
        }
    });
});   

//delete a data

server.delete("/api/student/delete/:id",(req,res)=>{
    let sq=`DELETE FROM student WHERE id=${req.params.id}`
    let query=db.query(sq,(err)=>{
        if(err){
            res.send({status:false , message:"student deleted successfully"})
        }else{
            res.send({status:true,message:"student deleted successfully"})
        }
    })
})



 server.listen(port,()=>{
    console.log("connected successfully");
})