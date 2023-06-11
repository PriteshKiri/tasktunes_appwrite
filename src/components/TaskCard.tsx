import { useDrag } from "react-dnd";
import { MdDelete, MdDragIndicator } from "react-icons/md";
const TaskCard = ({ item, handleInputChange, deleteTodo, status }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex gap-x-2 items-center rounded-md  ${
        isDragging ? "cursor-grabbing opacity-15" : "cursor-grab opacity-100"
      }`}
      key={item.id}
    >
      <MdDragIndicator className={`text-white text-[20px]`} />
      <textarea
        rows={3}
        key={item.id}
        className="w-full bg-[#1a1a1b] !min-h-[50px]  !text-white !outline-0  border border-gray-300 text-gray-900 text-sm rounded-[8px] focus:!ring-blue-500 focus:!border-blue-500 block  p-[10px] border-gray-600 !placeholder:gray-400 !placeholder:[14px] "
        defaultValue={item.val}
        disabled={status === "todo" ? false : true}
        onChange={(e) => handleInputChange(item.id, e.target.value)}
      />
      <MdDelete
        className={`text-white text-[20px] hover:text-red-500 cursor-pointer ${
          status === "todo" ? "block" : "hidden"
        } `}
        onClick={() => deleteTodo(item.id)}
      />
    </div>
  );
};

export default TaskCard;
