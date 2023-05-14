"use client";

import { Header } from "./header";
import { Purge } from "./Purge";

export default function Dashboard() {
  return (
    <div className="w-full h-screen bg-white grid items-center">
      {/* <Header /> */}
      <div className="px-4 py-4 mx-auto lg:px-12 w-11/12 sm:w-4/5 md:w-3/4 xl:w-1/2">
        <Purge />
      </div>
    </div>
  );
}
