import React, { Fragment, useState } from "react";

function InputTodo() {
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      const body = { description };

      const response = await fetch("https://todo-app-bfcu.onrender.com/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response)

    window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Fragment>
      <div className="text-center mt-5">
        <h1>Pern Todo App</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
          <input
            type="text"
            className="form-control"
            placeholder="Add Todo..."
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />{" "}
          <button className="btn btn-success" >
            {" "}
            Add
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default InputTodo;
