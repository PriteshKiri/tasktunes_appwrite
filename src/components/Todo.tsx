import { useEffect, useState } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [todos, settodos]: any = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const gettodos = databases.listDocuments(
      "647729ede7a0545acbb7",
      "64772c3292c9b7804efa"
    );

    gettodos.then(
      (res) => {
        console.log(res);

        settodos(res.documents);
        setLoader(false);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const handleDelete = (id: string) => {
    const promise = databases.deleteDocument(
      "647729ede7a0545acbb7",
      "64772c3292c9b7804efa",
      id
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
  };
  return (
    <div>
      {loader ? (
        <p>loading</p>
      ) : (
        <div>
          {todos &&
            todos.map((item: any) => (
              <p key={item.$id}>
                {item.todo}{" "}
                <button
                  className="ml-16 text-red-600"
                  onClick={() => handleDelete(item.$id)}
                >
                  delete
                </button>
              </p>
            ))}
        </div>
      )}
    </div>
  );
};

export default Todo;
