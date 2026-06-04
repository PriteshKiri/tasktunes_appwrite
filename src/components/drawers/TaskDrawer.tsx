import { Box, Button, Drawer, Zoom } from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { v4 as uuidv4 } from "uuid";

import { RiTodoLine } from "react-icons/ri";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import TodoContainer from "../taskContainers/TodoContainer";
import InProgress from "../taskContainers/InProgress";
import CompletedContainer from "../taskContainers/CompletedContainer";
import { MdPendingActions } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setTaskDrawerStatusAction } from "../../util/UtilSlice";
import { ToastContainer, toast } from "react-toastify";

const TASKS_STORAGE_KEY = "tasktunes.todo";

type TodoItem = {
  id: string;
  val: string;
  status: "todo" | "inprogress" | "completed";
};

const loadTodosFromStorage = (): TodoItem[] => {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to read tasks from localStorage:", err);
    return [];
  }
};

const TaskDrawer = () => {
  const [state, setState]: any = useState("right");
  const [todo, setTodo] = useState<TodoItem[]>(() => loadTodosFromStorage());
  const [disableSave, setDisableSave] = useState(true);
  const [lastTKeyPressTime, setLastTKeyPressTime] = useState(0);

  const dispatch = useDispatch();

  const showTodo = todo
    .filter((item) => item.status === "todo")
    .map((item) => item.val);
  const showInProgress = todo
    .filter((item) => item.status === "inprogress")
    .map((item) => item.val);
  const showComplted = todo
    .filter((item) => item.status === "completed")
    .map((item) => item.val);

  const toggleDrawer = (anchor: string, open: boolean) => () => {
    dispatch(setTaskDrawerStatusAction(open));
    if (!open && !disableSave) {
      toast.error("Please click on 'Save' button to save your changes!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }

    if (disableSave) {
      setState({ ...state, [anchor]: open });
    }
  };

  useEffect(() => {
    function handleDoubleTap() {
      toggleDrawer("right", true)();
    }

    function handleKeyDown(event: any) {
      if (event.key === "t") {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - lastTKeyPressTime;
        setLastTKeyPressTime(currentTime);

        if (elapsedTime < 300) {
          handleDoubleTap();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lastTKeyPressTime]);

  const handleInputChange = (id: string, changedValue: string) => {
    setDisableSave(false);
    setTodo((prevTodo) =>
      prevTodo.map((item) =>
        item.id === id ? { ...item, val: changedValue } : item
      )
    );
  };

  const handleSave = () => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(todo));
      setDisableSave(true);
      toast.success("Successfuly saved your changes!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err: any) {
      toast.error(err?.message || "Failed to save tasks", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error(err);
    }
  };

  const addTodo = () => {
    setDisableSave(false);
    setTodo([...todo, { id: uuidv4(), val: "Add your task", status: "todo" }]);
  };

  const deleteTodo = (id: string) => {
    setDisableSave(false);
    setTodo((prev) => prev.filter((i) => i.id !== id));
  };

  const addItemToContainer = (id: string, status: TodoItem["status"]) => {
    setDisableSave(false);
    setTodo((prevTodo) => {
      const updatedTodo = prevTodo.filter((item) => item.id !== id);
      const newItem = prevTodo.find((item) => item.id === id);
      if (!newItem) return prevTodo;
      updatedTodo.push({ ...newItem, status });
      return updatedTodo;
    });
  };

  const list = (anchor: string) => (
    <DndProvider backend={HTML5Backend}>
      <Box role="presentation">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full p-2 bdr-b">
            <p
              className="flex- items-center justify-center p-2 rounded-md cursor-pointer bg-[#1a1a1b] cursor-pointer hover:bg-[#292929]"
              onClick={toggleDrawer(anchor, false)}
            >
              <RxCross1 className="text-white" />{" "}
            </p>
            <button
              disabled={disableSave}
              className={` py-1 px-6 mr-1 text-white rounded-md  ${
                disableSave
                  ? "bg-blue-500/30 hover:bg-blue-500/30"
                  : "bg-blue-500/80 hover:bg-blue-500"
              } `}
              onClick={() => handleSave()}
            >
              Save
            </button>
          </div>

          <div>
            <ToastContainer />
          </div>
          <div className="w-full flex justify-around h-[93vh] pt-4">
            <TodoContainer
              addTodo={addTodo}
              handleInputChange={handleInputChange}
              todo={todo}
              deleteTodo={deleteTodo}
              addItemToContainer={addItemToContainer}
            />

            <InProgress
              todo={todo}
              addItemToContainer={addItemToContainer}
              deleteTodo={deleteTodo}
            />

            <CompletedContainer
              todo={todo}
              addItemToContainer={addItemToContainer}
              deleteTodo={deleteTodo}
            />
          </div>
        </div>
      </Box>
    </DndProvider>
  );

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "white",
      opacity: "60%",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <div className="hidden sm:flex w-[60px] h-[235px] p-2  flex-col justify-start bg-black rounded-tl-md rounded-bl-md gap-y-8">
      <>
        <Button
          className="!p-0 !flex !justify-center !-ml-[10px] !mt-3"
          onClick={toggleDrawer("right", true)}
        >
          <AiOutlineArrowLeft className="text-white text-[25px] !border-white !border-[1px] !rounded-md p-1" />
        </Button>

        <HtmlTooltip
          placement="left"
          TransitionComponent={Zoom}
          title={
            showTodo.length !== 0 ? (
              <>
                <ul className="list-disc	list-style-type: disc p-3">
                  {showTodo.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="py-2">No tasks in todos</p>
            )
          }
        >
          <div className="flex relative justify-center cursor-pointer">
            <RiTodoLine className="text-white text-[25px]" />
            <p className="bg-red-500 px-1.5 py-.5 text-[12px] absolute rounded-full -right-[1px] -top-[10px] border-black border-[2px]">
              {showTodo?.length}
            </p>
          </div>
        </HtmlTooltip>

        <HtmlTooltip
          placement="left"
          TransitionComponent={Zoom}
          title={
            showInProgress.length !== 0 ? (
              <>
                <ul className="list-disc	list-style-type: disc p-3">
                  {showInProgress.map((item: string, i: number) => {
                    if (item.trim()) {
                      return <li key={i}>{item}</li>;
                    }
                    return;
                  })}
                </ul>
              </>
            ) : (
              <p className="py-2">No tasks in progress</p>
            )
          }
        >
          <div className="flex relative justify-center cursor-pointer">
            <MdPendingActions className="text-white text-[25px]" />
            <p className="bg-yellow-500 px-1.5 py-.5 text-[12px] absolute rounded-full -right-[1px] -top-[10px] border-black border-[2px]">
              {showInProgress?.length}
            </p>
          </div>
        </HtmlTooltip>

        <HtmlTooltip
          placement="left"
          TransitionComponent={Zoom}
          title={
            showComplted.length ? (
              <>
                <ul className="list-disc	list-style-type: disc p-3">
                  {showComplted.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="py-2">No tasks completed</p>
            )
          }
        >
          <div className="flex relative justify-center cursor-pointer">
            <BiTask className="text-white text-[25px]" />
            <p className="bg-green-500 px-1.5 py-.5 text-[12px] absolute rounded-full -right-[1px] -top-[10px] border-black border-[2px]">
              {showComplted?.length}
            </p>
          </div>
        </HtmlTooltip>

        <Drawer
          anchor="right"
          open={state["right"]}
          PaperProps={{
            sx: {
              backgroundColor: "#040404db",
              width: 1050,
            },
          }}
        >
          {list("right")}
        </Drawer>
      </>
    </div>
  );
};

export default TaskDrawer;
