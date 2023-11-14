import { DockSharp } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import Feed from "../components/feed";
import ProfileLogo from "../components/logo components/profile_logo";
import SideBar from "../components/sidebar";
import { useAuthContext } from "../context/UserContext";
import { getPosts, like } from "../firebase/firestore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationLogo from "../components/logo components/notification_logo";
import CommentsLogo from "../components/logo components/comments_logo";
import BookmarksLogo from "../components/logo components/bookmarks_logo";
import { CircularProgress } from "@mui/material";
import { LoadingAnimation } from "../components/loading_animation";
import { RouteChangeCheck } from "../utils/RouteChangeCheck";

const Home = () => {
  const router = useRouter();
  const { currentUser, isUserLoading } = useAuthContext();
  const [loading, setLoading] = useState();
  const [docs, setDocs] = useState([]);
  const [t, setT] = useState(false);
  const [showMoreText, setShowMoreText] = useState(false);
  const [liked, setLiked] = useState(false);

  const refreshPage = () => {
    setT(!t);
  };
  // const showMore = () => {

  //   return '...';
  // }

  useEffect(() => {
    if (!isUserLoading && !currentUser) {
      router.push("/");
    }

    const fetchPosts = async () => {
      setLoading(true);
      getPosts().then((res) => {
        const data = [];
        res.forEach((doc) => {
          data.push(doc);
        });
        setDocs(data);
        console.log(docs);
        setLoading(false);
      });
    };
    fetchPosts();
  }, [currentUser, isUserLoading, t]);

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
            <div className="m-auto align-middle">
              {/* <CircularProgress size={50} /> */}
              <LoadingAnimation/>
            </div>
          ) : (
            <div>
              {docs.map((doc) => {
                return (
                  <div
                    key={doc.uid}
                    className="bg-white flex flex-col w-96 my-5 border-[1.2px] border-gray-300 rounded-md ml-10"
                  >
                    <div className="flex my-2 justify-between mx-1 p-2">
                      <div className="flex space-x-2 ">
                        <ProfileLogo src={doc.pp} width={24} height={24} />
                        <h2 className="font-semibold">{doc.username}</h2>{" "}
                      </div>

                      <button>
                        <MoreHorizIcon />
                      </button>
                    </div>
                    <div className="w-full flex">
                      <img className="mx-auto" src={doc.imageURL} alt="" />
                    </div>
                    <div className="flex justify-between m-2">
                      <div className="flex justify-around space-x-3">
                        <button
                          onClick={() => {
                            like(doc, currentUser.uid).then(() => {
                              setLiked(!liked);
                              console.log("liked");
                            });
                          }}
                        >
                          <NotificationLogo />
                        </button>
                        <button>
                          {" "}
                          <CommentsLogo />
                        </button>
                      </div>
                      <button>
                        <BookmarksLogo />
                      </button>
                    </div>
                    <div className="mx-2">
                      <h2 className="font-semibold">
                        {doc.likes.length} likes
                      </h2>
                    </div>

                    <div className="my-2 mx-2 flex space-x-1 align-middle text-center">
                      <p className="font-semibold">{doc.username}</p>
                      <p className="break-before-all text-sm text-left">
                        {/* {doc.caption.length > 50
                          ? doc.caption.slice(0, 50) + "..."
                          : doc.caption} */}
                        {doc.caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
        </RouteChangeCheck>
      </section>
    );
  }
};

export default Home;
