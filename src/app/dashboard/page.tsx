"use client";

import { Header } from "./header";
import { Purge } from "./Purge";

export default function Dashboard() {
  return (
    <div className="w-full h-screen bg-tertiary-400 grid items-center">
      {/* <Header /> */}
      <div className="px-4 py-4 mx-auto lg:px-12 w-3/4 xl:w-1/2">
        <Purge />
      </div>
    </div>
  );
}
