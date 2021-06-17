import React, { useState, useEffect, Fragment } from "react";
import {addTransaction,editTransaction,getTransactions,deleteTrans} from './services/firestore'
import AddTransactionForm from './forms/addTransaction'
import EditTransactionForm from "./forms/editTransaction";
import TransactionTable from "./tables/TransactionTable";




  

const App = () => {
  const initialFormState = { id: null, from: '', to: '',weight:'',cost:'' }
  const [transactions, setTransactions] = useState([]);
  //const [currentCategory, setCurrentCategory] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
  const [ currentTransaction, setcurrentTransaction ] = useState(initialFormState)
  const addTransation = async (transaction) => {
    const firestoreTransaction = await addTransaction(transaction);
    console.log("Firestore",firestoreTransaction)
    console.log("Transaction",transactions)
    setTransactions([...transactions, firestoreTransaction]);
  };

  const updateTransaction =(id,updatedTransaction)=>{
    setEditing(false)
    console.log("UPDATED TRANSACTIONS",updatedTransaction)
    setTransactions(transactions.map(transaction => (transaction.id === id ? updatedTransaction : transaction)))
    editTransaction(id,updatedTransaction)
  }
  const deleteTransaction = (id) => {
    console.log("DELETE",id)
    try{
      deleteTrans(id)
      setTransactions(transactions.filter(transaction => transaction.id !== id))
    }catch(e){

    }
    
  };

  const editRow = (transaction) => {
    setEditing(true);
    setcurrentTransaction(transaction)
    
  };

  useEffect(() => {
    const fetchData = async ()=>{
       const allTransactions = await getTransactions()
       console.log(allTransactions);
       if(allTransactions.length !=0)
        setTransactions(allTransactions);
      
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Root Nuts + Transactions + Hooks</h1>
      
      <div className="flex-row">
      
        <div className="flex-large">
          <h2>View Transactions</h2>
          <TransactionTable
            transactions={transactions}
            editRow={editRow}
            deleteTransaction={deleteTransaction}
          />
        </div>
      </div>
      <div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit Transaction</h2>
							<EditTransactionForm
								editing={editing}
								setEditing={setEditing}
								currentTransaction={currentTransaction}
								updateTransaction={updateTransaction}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add a new Transaction</h2>
							<AddTransactionForm addTransaction={addTransation} />
						</Fragment>
            
					)}
				</div>
    </div>
  );
}
export default App;