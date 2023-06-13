import { AiOutlinePlus } from "react-icons/ai";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";

const TodoContainer = ({
  addTodo,
  handleInputChange,
  todo,
  deleteTodo,
  addItemToContainer,
}: any) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: any) => addItemToContainer(item.id, "todo"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  console.log(todo?.filter((item: any) => item.status === "todo"));
  return (
    <div
      ref={drop}
      className=" w-[31%] bdr-all flex flex-col justify-start items-center h-full "
    >
      <div className="w-full flex justify-between items-center bg-red-500/30 text-white p-3 bdr-b">
        <p>Todo</p>
        <div
          className="bdr-all p-2 rounded-md cursor-pointer bg-[#1a1a1b] cursor-pointer hover:bg-[#292929]"
          onClick={() => addTodo()}
        >
          <AiOutlinePlus />
        </div>
      </div>
      <div
        className={`w-full h-full px-2 flex flex-col gap-y-3 py-3 overflow-y-scroll ${
          isOver ? "bg-[#141414]" : ""
        } `}
      >
        {todo.filter((item: any) => item.status === "todo").length !== 0 &&
          todo
            .filter((item: any) => item.status === "todo")
            .map((item: any) => (
              <TaskCard
                key={item.id}
                item={item}
                handleInputChange={handleInputChange}
                deleteTodo={deleteTodo}
                status={"todo"}
              />
            ))}
      </div>
    </div>
  );
};

export default TodoContainer;
