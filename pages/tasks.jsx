import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import { useAuthContext } from "../context/UserContext";
import { RouteChangeCheck } from "../utils/RouteChangeCheck";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
} from "@mui/material";
import { addTask, completeTask, getUserTasks } from "../firebase/firestore";

const AddTaskDialog = (props) => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const handleSubmit = async () => {
    await addTask(props.currentUser.uid, tasks, title).then((res) => {
      props.handleClose();
      props.refreshPage();
    });
  };

  return (
    <Dialog
      sx={{ borderRadius: 25 }}
      open={props.open}
      onClose={props.handleClose}
    >
      <>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          Create new Task
        </DialogTitle>
        <DialogContent
          sx={{ height: "60vh", width: "100%", overflowY: "scroll" }}
          dividers
        >
          <div className="flex mx-10">
            <div className="flex m-auto space-y-4 flex-col justify-center">
              {/* <AddMediaLogo className="justify-self-center" /> */}
              <h2 className="text-xl text-gray-600">
                Give these tasks a name here
              </h2>
              <TextField
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                id="outlined-basic"
                label="Tasks Title"
                variant="outlined"
              />
              <h2 className="text-xl text-gray-600">Tasks</h2>

              <div className="flex space-x-1">
                <TextField
                  onChange={(e) => {
                    setTask(e.target.value);
                  }}
                  id="outlined-basic"
                  label="Task"
                  variant="outlined"
                  value={task}
                />
                <Button
                  sx={{
                    fontSize: "2rem",
                    color: "rgba(255,214,10,1)",
                    mx: 0,
                    ":hover": {
                      backgroundColor: "rgba(255, 10, 10, 0.1)",
                      color: "black",
                    },
                  }}
                  onClick={() => {
                    setTasks([...tasks, task]);
                    setTask("");
                  }}
                >
                  +
                </Button>
              </div>
              <div className="flex flex-col space-y-4">
                {tasks.map((task, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between border border-gray-400 p-2 rounded-lg space-x-1"
                    >
                      {task}
                      <button
                        onClick={() => {
                          setTasks(tasks.filter((t, i) => i !== index));
                        }}
                        className="hover:text-[rgba(255,214,10,1)]"
                      >
                        X
                      </button>
                    </div>
                  );
                })}
                <Button
                  sx={{
                    color: "rgba(255,214,10,1)",
                    mx: 0,
                    ":hover": {
                      backgroundColor: "rgba(255,214,10,0.1)",
                      color: "black",
                    },
                  }}
                  variant="text"
                  onClick={handleSubmit}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </>
    </Dialog>
  );
};

const Tasks = () => {
  const { currentUser, isUserLoading } = useAuthContext();
  const [loading, setLoading] = useState();
  const [t, setT] = useState(false);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState();

  const refreshPage = () => {
    setT(!t);
  };
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      await getUserTasks(currentUser.uid).then((res) => {
        let data = [];
        res.forEach((doc) => {
          data.push(doc);
        });
        setTasks(data);
        console.log("d", data);
        setLoading(false);
        // setSelectedTask(tasks[0]);
      });
    };
    currentUser && fetchTasks();
  }, [t]);

  const handleClose = () => {
    setOpen(false);
  };

  if (isUserLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <section id="home_main">
        <nav className="border-r-[1px] border-gray-300">
          <SideBar open={true} refreshPage={refreshPage} />
        </nav>
        <RouteChangeCheck>
          <main className="bg-background overflow-y-auto flex">
            {loading ? (
              <div className="m-auto ">
                <CircularProgress size={70} />
              </div>
            ) : (
              <div className="p-10 flex flex-col">
                <AddTaskDialog
                  open={open}
                  currentUser={currentUser}
                  handleClose={handleClose}
                  refreshPage={refreshPage}
                />
                <div className="flex space-x-3">
                  <h1 className="text-3xl font-bold ">My projects</h1>
                  <Button
                    variant="text"
                    onClick={() => {
                      setOpen(true);
                      console.log(tasks);
                    }}
                    sx={{
                      color: "rgba(255,214,10,1)",
                      mx: 0,
                      ":hover": {
                        backgroundColor: "rgba(255,214,10,0.1)",
                        color: "black",
                      },
                    }}
                  >
                    + Add task
                  </Button>
                </div>
                <Divider className="my-4 pt-8" />
                <div className="flex space-x-10">
                  <div className="flex flex-col gap-6 mt-8">
                    {tasks.map((task, index) => (
                      <>
                        {selectedTask === task ? (
                          <div
                            onClick={() => {
                              setSelectedTask(task);
                            }}
                            key={index}
                            className="border-[rgba(255,214,10,1)]  flex justify-between border  p-2 rounded-lg space-x-1 cursor-pointer"
                          >
                            <h1>{task.title}</h1>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setSelectedTask(task);
                            }}
                            key={index}
                            className="hover:border-[rgba(255,214,10,1)]  flex justify-between border border-gray-400 p-2 rounded-lg space-x-1 cursor-pointer"
                          >
                            <h1>{task.title}</h1>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                  {selectedTask && (
                    <div>
                      <h1>{selectedTask.title}</h1>
                      <h2>{selectedTask.datePublished}</h2>
                      <div className="flex flex-col space-y-4 mt-4">
                        {selectedTask.tasks.map((task, index) => {
                          return (
                            <div
                              key={index}
                              className="flex pr-3 justify-between border border-gray-400 p-2 rounded-lg space-x-1"
                            >
                              <div className="flex space-x-2 justify-center align-middle items-center">
                                <Checkbox
                                  checked={task.completed}
                                  onChange={(e) => {
                                    setSelectedTask({
                                      ...selectedTask,
                                      tasks: selectedTask.tasks.map((t, i) => {
                                        if (i === index) {
                                          return {
                                            ...t,
                                            completed: e.target.checked,
                                          };
                                        } else {
                                          return t;
                                        }
                                      }),
                                    });
                                  }}
                                />
                                {task.task}
                              </div>

                              <button
                                onClick={() => {
                                  console.log(selectedTask.tasks);
                                  setSelectedTask({
                                    ...selectedTask,
                                    tasks: selectedTask.tasks.filter(
                                      (t, i) => i !== index
                                    ),
                                  });
                                }}
                                className="hover:text-[rgba(255,214,10,1)]"
                              >
                                X
                              </button>
                            </div>
                          );
                        })}
                        <Button
                          onClick={() => {
                            completeTask(
                              selectedTask.uid,
                              selectedTask.tasks
                            ).then((res) => {
                              refreshPage();
                            });
                          }}
                          sx={{
                            color: "rgba(255,214,10,1)",
                            mx: 0,
                            ":hover": {
                              backgroundColor: "rgba(255,214,10,0.1)",
                              color: "black",
                            },
                          }}
                          variant="text"
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </RouteChangeCheck>
      </section>
    );
  }
};

export default Tasks;
