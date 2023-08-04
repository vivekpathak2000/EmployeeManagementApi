
import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
const app =  express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



//create 
app.post("/employee",async(req,res,next)=>{
try {
    const addEmployee = await prisma.employee.create({
        data: { ...req.body }
    });
    res.json({addEmployee});
} catch (error:any) {
    next(error.message);
}
});

//READ all by id
app.get("/employee/:id",async(req,res,next)=>{
       try {
    const employee = await prisma.employee.findUnique({
        where:{
            id: Number(req.params.id)
        }
    });
    res.json({employee})
    
 } catch (error:any) {
    next(error.message);
 }
});

app.get('/employee', async (req, res,next) => {
    try {
      const employees = await prisma.employee.findMany({ include: { department: true } });
      res.json(employees);
    } catch (error:any) {
        next(error.message);;
    }
  });

//update
app.patch("/employee/:id",async(req,res,next)=>{

    try {
        const employeeUpdated =  await prisma.employee.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body
        });
        res.json({employeeUpdated})
    } catch (error:any) {
        next(error.message);
    }
});

//delete
app.delete("/employee/:id",async(req,res,next)=>{
try {
    const employeeDeleted = await prisma.employee.delete({
        where:{
            id: Number(req.params.id)
        }
    });
    res.json({employeeDeleted})
   
} catch (error:any) {
    next(error.message);
}
});

//create-Department 
app.post("/dept",async(req,res,next)=>{
    try {
        const addDepartment = await prisma.department.create({
            data: { ...req.body }
        });
        res.json({addDepartment});
    } catch (error:any) {
        next(error.message);
    }
    });

    //Read

    app.get("/dept/:id",async(req,res,next)=>{
        try {
           const department = await prisma.department.findUnique({
               where:{
                   id: Number(req.params.id)
               }
           });
           res.json({department})
           
        } catch (error:any) {
           next(error.message);
        }
       });

       app.get('/dept', async (req, res,next) => {
        try {
          const departments = await prisma.department.findMany({ include: { employee: true } });
          res.json(departments);
        } 
        catch (error:any) {
            next(error.message);
        }
      });


    //update
app.patch("/dept/:id",async(req,res,next)=>{

    try {
        const deptUpdated =  await prisma.department.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body
        });
        res.json({deptUpdated})
    } catch (error:any) {
        next(error.message);
    }
});
    





app.listen(4000, ()=>{
    console.log("App is running on port 4000")
})