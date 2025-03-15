import mongoose from "mongoose";

const categories = [
  "All",
  "Food & Dining",
  "Transport",
  "Entertainment",
  "Shopping",
  "Health & Fitness",
  "Bills & Utilities",
  "Education",
  "Travel",
  "Groceries",
  "Savings & Investments",
  "Rent",
  "Miscellaneous",
];

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, enum: categories, required: true }, // Enum for category validation
  date: { type: Date, default: Date.now },
},{minimize:false});

const expenseModel=mongoose.model.expenses || mongoose.model("expenses",ExpenseSchema);

export default expenseModel;


