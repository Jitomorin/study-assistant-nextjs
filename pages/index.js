import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/UserContext";
import { auth } from "../firebase/firebase";
import styles from "../styles/Home.module.css";
import { RouteChangeCheck } from "../utils/RouteChangeCheck";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, isUserLoading } = useAuthContext();
  const router = useRouter();

  const logIn = async () => {
    setLoading(true);
    auth.signInWithEmailAndPassword(email, password).then((authUser) => {
      setLoading(false);
      router.push("/home");
    });
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/home");
    }
  }, [currentUser, isUserLoading]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RouteChangeCheck><main className=" flex w-screen min-h-screen bg-background">
        <div className="flex flex-col m-auto bg-white h-1/3 border-[1.4px] border-border">
          <h1 className="text-center text-6xl text-black my-12 font-Oswald p-6">
            Study Assistant System
          </h1>
          <div className="flex flex-col mx-12 ">
            <input
              className="bg-background p-2 border-[1.3px] rounded-sm border-border focus:outline-none mb-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="bg-background p-2 border-[1.3px] rounded-sm border-border focus:outline-none mb-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={logIn} className=" rounded-md py-1 text-white font-bold bg-actionBlue px-4 my-5 hover:scale-105">
              {loading ? "Loading..." : "Log in"}
            </button>
            <div className="flex space-x-1 mx-auto mb-5">
              <span>{"Don't have an account?"}</span>
              <Link className="text-actionBlue" href="signup">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main></RouteChangeCheck>
    </div>
  );
}
