import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { auth } from "../firebase/firebase";
import { addUser } from "../firebase/firestore";
import { RouteChangeCheck } from "../utils/RouteChangeCheck";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = () => {
    setLoading(true);
    // firebase authenticaton signup
    auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
      // create user in firestore
      addUser(email, fullname, username, authUser.user.uid).then(() => {
        setLoading(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setFullname("");
        router.push("/");
      });
    });
  };

  return (
    <div>
      <RouteChangeCheck>
        <main className=" flex w-screen min-h-screen bg-background">
        <div className="flex flex-col m-auto bg-white h-1/3 border-[1.4px] border-border">
          <h1 className="text-center text-6xl text-black my-12 font-Oswald p-6">
            Study Assistant App
          </h1>
          {/* <span className=''>Sign up to see photos and videos from your friends.</span> */}
          <div className="flex flex-col mx-12 ">
            <input
              className="bg-background p-2 border-[1.3px] rounded-sm border-border focus:outline-none mb-2"
              placeholder="Email"
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className="bg-background p-2 border-[1.3px] rounded-sm border-border focus:outline-none mb-2"
              placeholder="Full name"
              type="text"
              onChange={(event) => {
                setFullname(event.target.value);
              }}
            />
            <input
              className="bg-background p-2 border-[1.3px] rounded-sm border-border focus:outline-none mb-2"
              placeholder="Username"
              type="text"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="password"
              className="bg-background p-2 border-[1.3px] rounded-sm border-border focus:outline-none mb-2"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button
              className=" rounded-md py-1 text-white font-bold bg-actionBlue px-4 my-5 hover:scale-105"
              onClick={signUp}
            >
              {loading ? "Loading..." : "Sign up"}
            </button>
            <div className="flex space-x-1 mx-5 mb-5">
              <span>{"Already have an account?"}</span>
              <Link className="text-actionBlue" href="/">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </main>
      </RouteChangeCheck>
    </div>
  );
};

export default Signup;
