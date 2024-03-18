"use client";

import { signOut } from "next-auth/react";
import React from "react";

const signout = () => {
  return (
    <div>
      <p>Are you sure want to sign out?</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default signout;
