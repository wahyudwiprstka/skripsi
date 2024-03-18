import { options } from "@/option";
import { getServerSession } from "next-auth";
import {User} from "@/app/(components)/user"
import React from "react";

const Home = async () => {
  const session = await getServerSession(options);
  return (
    <>
      <div>Home</div>
      {session && (
        <div>
          <h1>Server Session</h1>
          <div>{session?.user?.name}</div>
          <div>{session?.user?.email}</div>
          <div>
            <img src={session?.user?.image} alt="" className="rounded-full"/>
          </div>
        </div>
      )}

      <h1>Client Session</h1>
      <User/>
    </>
  );
};

export default Home;
