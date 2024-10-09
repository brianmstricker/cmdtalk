import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import { cn } from "../utils/cn";

const SetUsername = () => {
 const [username, setUsername] = useState("");
 const [showArrow, setShowArrow] = useState(false);
 const [debouncedUsername] = useDebounce(username, 350);
 // todo: lodash.debounce to search for username
 useEffect(() => {
  if (!debouncedUsername || debouncedUsername.trim() === "") {
   setShowArrow(false);
   return;
  }
  console.log(debouncedUsername);
  setShowArrow(true);
 }, [debouncedUsername]);
 return (
  <div className="shrink-0 mt-auto border-t-2 border-white/20 flex flex-col absolute w-full bg-gray-900 bottom-0 h-24 min-[459px]:h-16">
   <label htmlFor="setUsername" className="hidden sm:block pt-1 pb-0.5 px-14">
    Enter a username to start sending messages.
   </label>
   <label htmlFor="setUsername" className="sm:hidden pt-1 pb-0.5 px-14">
    Enter a username to send messages.
   </label>
   <input
    id="setUsername"
    type="text"
    className="bg-transparent outline-none py-1 px-14 text-white/80 placeholder-white/60"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
   />
   <div
    className={cn(
     "absolute left-3 opacity-0 -bottom-10 duration-300 transition-all",
     showArrow && "opacity-100 bottom-3 min-[459px]:bottom-1"
    )}
   >
    <button className={cn("flex flex-col items-center group p-1.5")}>
     <span className="whitespace-nowrap border border-white/20 absolute px-2 py-1 bg-gray-900 -top-10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
      Create user
     </span>
     <FaArrowUp />
    </button>
   </div>
  </div>
 );
};
export default SetUsername;
