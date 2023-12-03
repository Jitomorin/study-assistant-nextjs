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
import { Post } from "../components/post";
import Divider from "../components/divider";

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
                <LoadingAnimation />
              </div>
            ) : (
              <div className="px-96">
                {docs.map((doc) => {
                  return (
                    <div key={doc.id} className="my-0">
                      <Post post={doc} currentUser={currentUser} />
                      <div className="mx-32">
                        <Divider />
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
