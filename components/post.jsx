import React, { useState } from "react";
import NotificationLogo from "./logo components/notification_logo";
import CommentsLogo from "./logo components/comments_logo";
import BookmarksLogo from "./logo components/bookmarks_logo";
import ProfileLogo from "./logo components/profile_logo";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { like } from "../firebase/firestore";

export const Post = (props) => {
  const [liked, setLiked] = useState(false);
  return (
    <div
      key={props.post.uid}
      className="bg-white flex flex-col w-full border-[1.2px] border-gray-300 rounded-md  mx-auto"
    >
      <div className="flex my-2 justify-between mx-1 p-2">
        <div className="flex space-x-2 ">
          <ProfileLogo src={props.post.pp} width={24} height={24} />
          <h2 className="font-semibold">{props.post.username}</h2>{" "}
        </div>

        <button>
          <MoreHorizIcon />
        </button>
      </div>
      <div className="w-full flex">
        <img className="mx-auto" src={props.post.imageURL} alt="" />
      </div>
      <div className="flex justify-between m-2">
        <div className="flex justify-around space-x-3">
          <button
            onClick={() => {
              like(props.post, props.currentUser.uid).then(() => {
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
        <h2 className="font-semibold">{props.post.likes.length} likes</h2>
      </div>

      <div className="my-2 mx-2 flex space-x-1 align-middle text-center">
        <p className="font-semibold">{props.post.username}</p>
        <p className="break-before-all text-sm text-left">
          {/* {doc.caption.length > 50
                          ? doc.caption.slice(0, 50) + "..."
                          : doc.caption} */}
          {props.post.caption}
        </p>
      </div>
    </div>
  );
};
