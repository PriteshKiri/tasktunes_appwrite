import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const CompletedContainer = ({ todo, deleteTodo, addItemToContainer }: any) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: any) => addItemToContainer(item.id, "completed"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div
      ref={drop}
      className=" w-[31%] bdr-all flex flex-col justify-start items-center h-full "
    >
      <div className="w-full flex justify-between items-center bg-[#1a1a1b] bg-green-500/30 text-white p-4 bdr-b">
        <p>Completed</p>
      </div>
      <div
        className={`w-full h-full px-2 flex flex-col gap-y-3 py-3 overflow-y-scroll ${
          isOver ? "bg-[#141414]" : ""
        } `}
      >
        {todo
          .filter((item: any) => item.status === "completed")
          .map((item: any) => (
            <TaskCard key={item.id} item={item} deleteTodo={deleteTodo} />
          ))}
      </div>
    </div>
  );
};

export default CompletedContainer;
