import expenseModel from "../models/expense.js";

// add new expense

const addExpense=async(req,res,next)=>{
    
    try {
        const {name,amount,category}=req.body;
        const newExpense=new expenseModel({userId:req.user.id,name,amount,category});
        const expense=await newExpense.save();
        res.json({
            success:true,
            message:"expense is added",
            expense
        })
    } catch (error) {
        next(error);
    }
};

// get all expense for user

const getExpenses=async(req,res,next)=>{
    try {
        const expenses=await expenseModel.find({userId:req.user.id});
        if(!expenses){
            res.json({
                success:false,
                message:"Not able to fetch the expense"
            })
        }
        res.json({
            success:true,
            message:"Get the expense",
            expenses
        })
    } catch (error) {
        next(error)
    }
}
// update expense

const updateExpense=async(req,res,next)=>{
    try {
        const{id}=req.params;
        const updateExpense=await expenseModel.findByIdAndUpdate(id,req.body,{new:true});
        res.json({
            success:true,
            message:"Expense updated",
            updateExpense
        })
    } catch (error) {
        next(error);
    }
}
// delete expense

const deleteExpense=async(req,res,next)=>{
    try {
        const{id}=req.params;
        await expenseModel.findByIdAndDelete(id);
        res.json({success:true,message:"deleted"})
    } catch (error) {
        next(error);
    }
}

export {addExpense,getExpenses,updateExpense,deleteExpense};
