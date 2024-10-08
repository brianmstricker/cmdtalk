import { useState } from "react";
import { useDebounce } from "use-debounce";

const SetUsername = () => {
 const [username, setUsername] = useState("");
 const [debouncedUsername] = useDebounce(username, 800);
 // todo: lodash.debounce to search for username
 return (
  <div className="shrink-0 mt-auto border-t-2 border-white/20 flex flex-col absolute w-full bg-gray-900 bottom-0 h-16">
   <div className="pt-1 pb-0.5 px-4">Enter a username below to start sending messages.</div>
   <input
    type="text"
    className="bg-transparent outline-none py-1 px-4 text-white/80 placeholder-white/60"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
   />
  </div>
 );
};
export default SetUsername;
