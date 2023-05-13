import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { PurgeList } from "./PurgeList";

export function Purge() {
//   const [purging, setPurging] = useState(false);

//   function handlePurge() {
//     console.log("purge swag");
//     setPurging(true);
//   }

  return (
    <div className="px-4 py-4 mx-auto lg:px-12 w-3/4 xl:w-1/2">
      <PurgeList />
    </div>
  );
}
