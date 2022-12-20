import React, { useEffect, useState } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
// import uuid from "uuid/v4";
const { v4: uuid } = require("uuid");

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "car payment", amount: 400 },
//   { id: uuid(), charge: "credit card bill", amount: 1200 },
// ];
const initialExpanses = localStorage.getItem("expanses")
  ? JSON.parse(localStorage.getItem("expanses"))
  : [];
function App() {
  // ********** state values **********************
  // all expanses, add expanse
  const [expanses, setExpanses] = useState(initialExpanses);
  // single expanse
  const [charge, setCharge] = useState("");
  // ********** functionality **********************
  // single amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({ show: false });

  // edit
  const [edit, setEdit] = useState(false);
  // edit item
  const [id, setId] = useState(0);
  // ********** functionality **********************

  // **********   useEffect  **********************

  useEffect(() => {
    console.log("weCalledUseEffect");
    localStorage.setItem("expanses", JSON.stringify(expanses));
  }, [expanses]);

  // handle charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  // handle amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpanses = expanses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpanses(tempExpanses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpanse = { id: uuid(), charge, amount };
        setExpanses([...expanses, singleExpanse]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      // handle alert called
      handleAlert({
        type: "danger",
        text: "charge can't be empty value and amount value has to be bigger than zero",
      });
    }
  };
  // clear all items
  const clearItems = () => {
    setExpanses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  // handle delete
  const handleDelete = (id) => {
    let tempExpanses = expanses.filter((item) => item.id !== id);
    setExpanses(tempExpanses);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  // handle edit
  const handleEdit = (id) => {
    let expanse = expanses.find((item) => item.id === id);
    let { charge, amount } = expanse;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expanses={expanses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className='total'>
          $
          {expanses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
