import { useDrop } from "react-dnd";
import { MdDragIndicator } from "react-icons/md";
import TaskCard from "./TaskCard";

const InProgress = ({ todo, addItemToContainer }: any) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: any) => addItemToContainer(item.id, "inprogress"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className=" w-[31%] bdr-all flex flex-col justify-start items-center h-full "
    >
      <div className="w-full flex justify-between items-center bg-[#1a1a1b] text-white p-3 bdr-b">
        <p>In Progress</p>
      </div>
      <div
        className={`w-full h-full px-2 flex flex-col gap-y-3 py-3 overflow-y-scroll ${
          isOver ? "bg-[#141414]" : ""
        } `}
      >
        {todo
          .filter((item: any) => item.status === "inprogress")
          .map((item: any) => (
            <TaskCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default InProgress;
