import { CircularProgress, Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar";
import { useAuthContext } from "../context/UserContext";
import { RouteChangeCheck } from "../utils/RouteChangeCheck";
import ProfileLogo from "../components/logo components/profile_logo";
import { getUserPosts } from "../firebase/firestore";
import NotificationLogo from "../components/logo components/notification_logo";
import MessagesLogo from "../components/logo components/messages_logo";
import CommentsLogo from "../components/logo components/comments_logo";
import AddMediaLogo from "../components/logo components/add_media_logo";
import Image from "next/image";

const Profile = () => {
  const { currentUser, isUserLoading } = useAuthContext();
  const [loading, setLoading] = useState();
  const [t, setT] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (isUserLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    currentUser && getUserPosts(currentUser.uid).then((res) => { 
      let data = [];
      res.forEach((doc) => {
        data.push(doc);
      });
      setUserPosts(data);
      console.log('userPosts:');
      console.log(userPosts);
     
    })
   }, [currentUser, isUserLoading, t]);

  const refreshPage = () => {
    setT(!t);
  };

  if (isUserLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <section id="home_main">
        <ViewPostDialog open={open} handleClose={() => setOpen(false)} currentUser={currentUser} post={selectedPost} />
        <nav className="border-r-[1px] border-gray-300">
          <SideBar open={true} refreshPage={refreshPage} />
        </nav>
        <RouteChangeCheck><main className="bg-background overflow-y-auto flex py-10">
          {loading ? (
            <div className="m-auto ">
              <CircularProgress size={50} />
            </div>
          ) : (
              <div className="m-auto flex flex-col">
                <div className="flex space-x-9">
                  <ProfileLogo width={200} height={200} src={currentUser.imageURL} />
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-2">
                      <div className="font-bold text-xl">{currentUser.userName}</div>
                    <div className=""><button className="rounded-md bg-gray-400 py-1 px-2 font-bold text-white hover:scale-105">Edit Profile</button></div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <div className="font-bold">{userPosts.length+" Posts"}</div>
                      <div className="font-bold">{currentUser.followers.length+" Followers"}</div>
                      <div className="font-bold">{currentUser.following.length+" Following"}</div>
                    </div>
                    <div className="font-bold">
                      {currentUser.fullname}
                    </div>
                    
                  </div>
                </div>
                <Divider className="my-5" />
                <div className="flex flex-col w-full space-y-5">
                  <div className="flex mx-auto font-bold">
                    Posts
                  </div>
                  <div className="grid grid-cols-4 gap-1 px-5">
                    {
                      userPosts.map((post) => {
                        return (
                          <div onClick={() => {
                            setSelectedPost(post);
                            setOpen(true);
                            
          }} key={post.uid} className="relative group cursor-pointer rounded-md">
                            <img className="w-full h-full object-cover rounded-md" src={post.imageURL} alt="" />
                            <div className="absolute rounded-md inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
                            <div className="flex invisible group-hover:visible absolute p-4 top-0 left-0 w-full h-full bg-black bg-opacity-10 justify-center items-center">
                              <div className="flex space-x-2">
                                <div className="flex space-x-2 text-white">
                                  <CommentsLogo />
                                  <div className="font-bold ">{post.comments.length}</div>
                                </div>
                                <div className="flex space-x-2 text-white">
                                  <NotificationLogo />
                                  <div className="font-bold ">{post.likes.length}</div>
                                </div>
                              </div>
                            </div>
                                  

                          </div>
                        )
                      })
                      }
                  </div>

                </div>
            </div>
          )}
        </main></RouteChangeCheck>
      </section>
    );
  }
};
const ViewPostDialog = (props) => {
  
 

  return (
    <Dialog
      sx={{ borderRadius: 25 }}
      open={props.open}
      onClose={props.handleClose}
    >
      {
        props.post &&<>
          
          <DialogContent sx={{ height: "95vh", width: "100%" }} dividers>
            <div className="flex w-full">
              <div className="flex m-auto flex-col justify-center">
                <div className="w-full h-28 flex space-x-2 ">
                  <div className="w-[20rem]">
                    <img
                      src={props.post.imageURL}
                      width={300}
                      height={300}
                      alt=""
                    />
                  </div>

                  <div className="w-1/2 flex flex-col h-full ">
                    <div className="flex space-x-1">
                      <ProfileLogo
                        src={props.currentUser.imageURL}
                        width={24}
                        height={24}
                      />
                      <h2 className="font-semibold">
                        {props.currentUser.userName}
                      </h2>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </>
      }
    </Dialog>
  );
};

export default Profile;
