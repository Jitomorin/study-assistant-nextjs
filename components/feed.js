import React, { useEffect, useState } from "react";
import { getPosts } from "../firebase/firestore";
import ProfileLogo from "./logo components/profile_logo";

const Feed = (props) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState([]);
  useEffect(() => {
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
  }, []);
  return (
    <div className="h-full">
      {docs.forEach((doc) => {
        <div className="flex flex-col w-1/3 bg-white border-1 border-gray-300 rounded-md ">
          <div className="flex justify-start">
            <ProfileLogo width={24} height={24} src={doc.imageURL} />
            <h2 className="font-semibold">{doc.username}</h2>
          </div>
        </div>;
      })}
    </div>
  );
};

export default Feed;
