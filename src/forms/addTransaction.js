import React, { useState } from "react";

const AddTransactionForm = (props) => {
  const initialFormState = {id: null,from: "",to: "",cost: "",weight: "",state: ""};
  const [transaction, setTransaction] = useState("");
  const handleInputChange = (event) => {
    console.log("Handle");
    console.log(event.target);
    const { name, value } = event.target;
    setTransaction({ ...transaction, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(transaction);
        if (!transaction) return;
        props.addTransaction(transaction);
        setTransaction(initialFormState);
      }}
    >
      <label>From</label>
      <input type="text" name="from" value={transaction.from} onChange={handleInputChange}/>
      <label>To</label>
      <input type="text" name="to" value={transaction.to} onChange={handleInputChange}/>
      <label>Cost</label>
      <input type="text" name="cost" value={transaction.cost} onChange={handleInputChange}/>
      <label>State</label>
      <select name="state" value={transaction.state} onChange={handleInputChange}>
        <option defaultValue="selected" value="green">Green</option>
        <option value="black">Black</option>
        <option value="white">White</option>
      </select>
      <label>Weight</label>
      <input type="text" name="weight" value={transaction.weight} onChange={handleInputChange}/>
      <button>Add </button>       <button> Cancel</button>
    </form>
  );
};

export default AddTransactionForm;
