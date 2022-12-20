import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expanses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      <ul className='list'>
        {expanses.map((expanse) => {
          return (
            <Item
              key={expanse.id}
              expanse={expanse}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expanses.length > 0 && (
        <button className='btn' onClick={clearItems}>
          clear expanses
          <MdDelete className='btn-icon' />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
