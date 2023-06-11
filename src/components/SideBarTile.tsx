import { Box, Button, Drawer, Zoom } from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { databases } from "../appwrite/appwriteConfig";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

import { RiTodoLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import TodoContainer from "./TodoContainer";
import InProgress from "./InProgress";
import CompletedContainer from "./CompletedContainer";
import { MdPendingActions } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { User } from "../app.models";

const SideBarTile = ({ userDetails }: { userDetails: User | null }) => {
  const [state, setState]: any = useState("right");
  // const [global, setGlobal]: any = useState([]);
  const [todo, setTodo]: any = useState([]);
  const [showInProgress, setShowInProgress]: any = useState([]);
  const [showComplted, setShowCompleted]: any = useState([]);
  const [showTodo, setShowTodo]: any = useState([]);
  const [saveAction, setSaveAction]: any = useState(false);
  useEffect(() => {
    const gettodos = databases.listDocuments(
      "647729ede7a0545acbb7",
      "64836eb4b4e4ec623236"
    );

    gettodos.then(
      (res) => {
        console.log("res", res);
        const userTodos = res.documents.filter((i) => {
          return i.userID === userDetails?.$id;
        });
        console.log("userTodos", userTodos);
        console.log("id", userDetails);

        const data = userTodos.map((i) => i.todo);
        const dataLength = userTodos.length;

        if (dataLength) {
          const dataArr = JSON.parse(data[dataLength - 1]);

          setTodo(dataArr);

          setShowTodo(
            dataArr
              .filter((item: any) => item.status === "todo")
              .map((item: any) => item.val)
          );

          setShowInProgress(
            dataArr
              .filter((item: any) => item.status === "inprogress")
              .map((item: any) => item.val)
          );
          setShowCompleted(
            dataArr
              .filter((item: any) => item.status === "completed")
              .map((item: any) => item.val)
          );
        }

        // console.log(JSON.parse(data[dataLength - 1]));
      },
      (err) => {
        console.log(err);
      }
    );
  }, [saveAction]);

  const handleInputChange = (id: any, changedValue: string) => {
    setTodo((prevTodo: any) => {
      const updatedTodo = prevTodo.map((item: any) => {
        if (item.id === id) {
          return { ...item, val: changedValue };
        }
        return item;
      });

      return updatedTodo;
    });
  };

  const handleSave = () => {
    console.log(todo);

    const promise = databases.createDocument(
      "647729ede7a0545acbb7",
      "64836eb4b4e4ec623236",
      uuidv4(),
      { todo: JSON.stringify(todo), userID: userDetails?.$id }
    );

    promise.then(
      (res) => {
        setSaveAction(!saveAction);
        // window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const addTodo = () => {
    setTodo([...todo, { id: uuidv4(), val: "Add your task", status: "todo" }]);
  };

  const deleteTodo = (id: any) => {
    const filterTodo = todo.filter((i: any) => i.id !== id);
    setTodo(filterTodo);
  };

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const addItemToContainer = (id: any, status: any) => {
    setTodo((prevTodo: any) => {
      // const updatedTodo = prevTodo.map((item: any) => {
      //   if (item.id === id) {

      //     return { ...item, status: status };
      //   }
      //   return item;
      // });

      const updatedTodo = prevTodo.filter((item: any) => item.id !== id);
      const newItem = prevTodo.find((item: any) => item.id === id);
      newItem.status = status;
      updatedTodo.push(newItem);
      return updatedTodo;
    });

    // setTodo(...todo, item);
  };

  const list = (anchor: string) => (
    <DndProvider backend={HTML5Backend}>
      <Box role="presentation">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full p-2 bdr-b">
            <p>
              <RxCross1
                className="text-white ml-2 cursor-pointer"
                onClick={toggleDrawer(anchor, false)}
              />{" "}
            </p>
            <Button variant="contained" onClick={() => handleSave()}>
              Save
            </Button>
          </div>

          <div className="w-full flex justify-around h-[93vh] pt-4">
            {/* todo */}
            <TodoContainer
              addTodo={addTodo}
              handleInputChange={handleInputChange}
              todo={todo}
              deleteTodo={deleteTodo}
              addItemToContainer={addItemToContainer}
            />

            {/* In progress */}
            <InProgress todo={todo} addItemToContainer={addItemToContainer} />

            {/* Completed */}

            <CompletedContainer
              todo={todo}
              addItemToContainer={addItemToContainer}
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
    <div className=" w-[60px] h-[235px] p-2 flex flex-col justify-start bg-black rounded-tl-md rounded-bl-md gap-y-8">
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
              "No tasks in todos"
            )
          }
        >
          <div className="flex relative justify-center">
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
            showTodo.length !== 0 ? (
              <>
                <ul className="list-disc	list-style-type: disc p-3">
                  {showInProgress.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            ) : (
              "No tasks in progress"
            )
          }
        >
          <div className="flex relative justify-center">
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
              "No tasks completed"
            )
          }
        >
          <div className="flex relative justify-center">
            <BiTask className="text-white text-[25px]" />
            <p className="bg-green-500 px-1.5 py-.5 text-[12px] absolute rounded-full -right-[1px] -top-[10px] border-black border-[2px]">
              {showComplted?.length}
            </p>
          </div>
        </HtmlTooltip>

        <Drawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
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

export default SideBarTile;
