import { options } from "@/option";
import { getServerSession } from "next-auth";
import {User} from "@/app/components/User"
import React from "react";
import Navbar from "@/app/components/Navbar";

const Home = async () => {
  const session = await getServerSession(options);
  return (
    <>
      <Navbar/>
      <div className="px-28">
        <div>Home</div>
        {session && (
          <div>
            <h1>Server Session</h1>
            <div>{session?.user?.id}</div>
            <div>{session?.user?.role}</div>
            <div>{session?.user?.name}</div>
            <div>{session?.user?.email}</div>
            <div>
              <img src={session?.user?.image} alt="" className="rounded-full"/>
            </div>
          </div>
        )}
        <h1>Client Session</h1>
        <User/>
      </div>
    </>
  );
};

export default Home;
