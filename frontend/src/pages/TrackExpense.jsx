import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function TrackExpense() {
  const { url, token } = useContext(StoreContext);
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [category, setCategory] = useState("All");
  const [editingExpense, setEditingExpense] = useState(null);
  const [updatedExpense, setUpdatedExpense] = useState({ name: "", amount: "", category: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "", category: "" });
  const[total_expense,setTotalExpense]=useState(0);

  const categories = [
    "Food & Dining", "Transport", "Entertainment", "Shopping", "Health & Fitness",
    "Bills & Utilities", "Education", "Travel", "Groceries", "Savings & Investments",
    "Rent", "Miscellaneous"
  ];
  const navigate=useNavigate();

  useEffect(()=>{
    if(token===""){
      navigate("/");
      toast.info("please do login or signup to Access Track Expense")
    }
  },[token])

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [category, expenses]);

  const fetchExpenses = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${url}/api/expenses/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.expenses) {
        setExpenses(response.data.expenses);
        setFilteredExpenses(response.data.expenses);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const filterExpenses = () => {
    const filtered = category === "All" ? expenses : expenses.filter((exp) => exp.category === category);
    setFilteredExpenses(filtered);
  
    // Calculate total expense correctly
    const sum = filtered.reduce((acc, exp) => acc + Number(exp.amount), 0);
    setTotalExpense(sum);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/expenses/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter((exp) => exp._id !== id));
      toast.success("Expense deleted!");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setUpdatedExpense({ ...expense });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${url}/api/expenses/update/${editingExpense._id}`,
        updatedExpense,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExpenses(expenses.map((exp) => (exp._id === editingExpense._id ? response.data.updateExpense : exp)));
      setEditingExpense(null);
      toast.success("Expense updated!");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleAddExpense = async () => {
    if (!newExpense.name || !newExpense.amount || !newExpense.category) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/expenses/add`, newExpense, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.expense) {
        setExpenses([...expenses, response.data.expense]);
        setFilteredExpenses([...expenses, response.data.expense]);
        setNewExpense({ name: "", amount: "", category: "" });
        setShowAddForm(false);
        toast.success("Expense added!");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="bg-purple-100 py-8 px-4 mb-4 ">
      <div className="container max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 rounded-2xl bg-white ">
        <h2 className="text-2xl font-bold mb-4">Track Expenses</h2>

        <div className="mb-4">
          <label className="mr-2">Filter by Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
            <option value="All">All</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button className="bg-purple-500 text-black px-4 py-2 rounded mb-4 m-2 font-bold">
          Total Expense={total_expense}
        </button>
        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-purple-100 font-bold text-black px-4 py-2 rounded mb-4 cursor-pointer">
          Add Expense
        </button>

        {showAddForm && (
          <div className="mb-4 p-4 border rounded">
            <input type="text" placeholder="Name" value={newExpense.name}
              onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })} className="border p-2 w-full mb-2" />
            <input type="number" placeholder="Amount" value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} className="border p-2 w-full mb-2" />
            <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} className="border p-2 w-full mb-2">
              <option>Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            <button onClick={handleAddExpense} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        )}

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <tr key={expense._id} className="text-center">
                  <td className="border p-2">{expense.name}</td>
                  <td className="border p-2">{expense.amount}</td>
                  <td className="border p-2">{expense.category}</td>
                  <td className="border p-2">
                    <button onClick={() => handleEdit(expense)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(expense._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No expenses found</td>
              </tr>
            )}
          </tbody>
        </table>

        {editingExpense && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h3 className="text-xl font-bold mb-4">Edit Expense</h3>
              <input type="text" value={updatedExpense.name} onChange={(e) => setUpdatedExpense({ ...updatedExpense, name: e.target.value })} className="border p-2 w-full mb-2" />
              <input type="number" value={updatedExpense.amount} onChange={(e) => setUpdatedExpense({ ...updatedExpense, amount: e.target.value })} className="border p-2 w-full mb-2" />
              <select value={updatedExpense.category} onChange={(e) => setUpdatedExpense({ ...updatedExpense, category: e.target.value })} className="border p-2 w-full mb-2">
                {categories.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
              </select>
              <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
              <button onClick={() => setEditingExpense(null)} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackExpense;


