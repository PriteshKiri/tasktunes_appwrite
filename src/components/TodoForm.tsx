import { useState } from "react";
import { databases } from "../appwrite/appwriteConfig";

import { v4 as uuidv4 } from "uuid";

const TodoForm = () => {
  const [todo, setTodo] = useState("");

  const handleSubmit = () => {
    const promise = databases.createDocument(
      "647729ede7a0545acbb7",
      "64772c3292c9b7804efa",
      uuidv4(),
      { todo }
    );

    promise.then(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );

    // window.location.reload();
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TodoForm;
