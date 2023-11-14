import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import SideBar from "../components/sidebar";
import { useAuthContext } from "../context/UserContext";
import { RouteChangeCheck } from "../utils/RouteChangeCheck";

const Search = () => {
  const { currentUser, isUserLoading } = useAuthContext();
  const [loading, setLoading] = useState();
  const [t, setT] = useState(false);

  const refreshPage = () => {
    setT(!t);
  };

  if (isUserLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <section id="home_main">
        <nav className="border-r-[1px] border-gray-300">
          <SideBar open={true} refreshPage={refreshPage} />
        </nav>
        <RouteChangeCheck><main className="bg-background overflow-y-auto flex">
          {loading ? (
            <div className="m-auto ">
              <CircularProgress size={50} />
            </div>
          ) : (
            <div className="m-auto">Search Page</div>
          )}
        </main></RouteChangeCheck>
      </section>
    );
  }
};

export default Search;
