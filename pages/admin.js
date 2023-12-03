import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import { useAuthContext } from "../context/UserContext";
import { RouteChangeCheck } from "../utils/RouteChangeCheck";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
} from "@mui/material";
import {
  addTask,
  completeTask,
  deleteUser,
  getAllUsers,
  getUserTasks,
  makeAdmin,
  removeAdmin,
} from "../firebase/firestore";
import { useRouter } from "next/router";
import { firestore } from "../firebase/firebase";
import { ref } from "firebase/storage";

const AddPostDialog = (props) => {
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
                      backgroundColor: "rgba(255,214,10,0.1)",
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

const Admin = () => {
  const { currentUser, isUserLoading } = useAuthContext();
  const [loading, setLoading] = useState();
  const [t, setT] = useState(false);
  const [users, setUsers] = useState([]);
  const Router = useRouter();

  const refreshPage = () => {
    setT(!t);
  };
  useEffect(() => {
    if (currentUser?.admin !== true) {
      Router.push("/");
    }
    const fetchUsers = async () => {
      setLoading(true);
      let data = [];
      await firestore
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            console.log(doc.data());
            data.push(doc.data());
          });
        });
      setUsers(data);
    };
    fetchUsers().then(() => {
      setLoading(false);
      //   console.log("res", res);
    });
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
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650, width: "80vw" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>UID</TableCell>
                        <TableCell align="right">Full name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">User name</TableCell>
                        <TableCell align="right">Admin</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((row) => (
                        <TableRow
                          key={row.uid}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.uid}
                          </TableCell>
                          <TableCell align="right">{row.fullname}</TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.userName}</TableCell>
                          <TableCell align="right">
                            {row.admin.toString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => {
                                deleteUser(row.uid);
                                refreshPage();
                              }}
                              sx={{
                                // fontSize: "2rem",
                                color: "#ff0a0a",
                                mx: 0,
                                ":hover": {
                                  backgroundColor: "rgba(255, 10, 10, 0.1)",
                                  color: "black",
                                },
                              }}
                              variant="text"
                            >
                              Delete
                            </Button>
                          </TableCell>
                          <TableCell>
                            {row.admin ? (
                              <Button
                                onClick={() => {
                                  removeAdmin(row.uid);
                                  refreshPage();
                                }}
                                sx={{
                                  // fontSize: "2rem",
                                  color: "#ff0a0a",
                                  mx: 0,
                                  ":hover": {
                                    backgroundColor: "rgba(255, 10, 10, 0.1)",
                                    color: "black",
                                  },
                                }}
                                variant="text"
                              >
                                Remove Admin
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  makeAdmin(row.uid);
                                  refreshPage();
                                }}
                                sx={{
                                  // fontSize: "2rem",
                                  color: "#ff0a0a",
                                  mx: 0,
                                  ":hover": {
                                    backgroundColor: "rgba(255, 10, 10, 0.1)",
                                    color: "black",
                                  },
                                }}
                                variant="text"
                              >
                                Make Admin
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </main>
        </RouteChangeCheck>
      </section>
    );
  }
};

export default Admin;
