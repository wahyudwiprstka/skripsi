"use client";

import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => {
  return (
    <div>
      <p>Are you sure want to sign out?</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
    </div>
  );
};

export default SignOut;
