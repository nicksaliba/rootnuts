import React, {useEffect, useState } from "react";

const EditTransactionForm = (props) => {

  const [transaction, setTransaction] = useState(props.currentTransaction);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTransaction({ ...transaction, [name]: value });
  };
  useEffect(() => {
      console.log(props)
    setTransaction(props.currentTransaction);
  }, [props.currentTransaction]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!transaction) return;
        props.updateTransaction(transaction.id, transaction);
        //setTransaction(initialFormState);
      }}
    >
      <label>From</label>
      <input
        type="text"
        name="from"
        value={transaction.from}
        onChange={handleInputChange}
      />
      <label>To</label>
      <input
        type="text"
        name="to"
        value={transaction.to}
        onChange={handleInputChange}
      />
      <label>Cost</label>
      <input
        type="text"
        name="cost"
        value={transaction.cost}
        onChange={handleInputChange}
      />
      <label>State</label>
      <select
        name="state"
        value={transaction.state}
        onChange={handleInputChange}
      >
        <option value="green">Green</option>
        <option value="black">Black</option>
        <option value="white">White</option>
      </select>
      <label>Weight</label>
      <input
        type="text"
        name="weight"
        value={transaction.weight}
        onChange={handleInputChange}
      />
      <button>Update Transaction</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditTransactionForm;