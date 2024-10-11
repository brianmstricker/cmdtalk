import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDebounce } from "use-debounce";
import { cn } from "../utils/cn";
import { createPortal } from "react-dom";
import { BiX } from "react-icons/bi";

const SetUsernameModal = ({
 setShowCreateUsernameModal,
}: {
 setShowCreateUsernameModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
 const [username, setUsername] = useState("");
 const [showArrow, setShowArrow] = useState(false);
 const [validUsername, setValidUsername] = useState(false);
 const containerRef = useRef<HTMLDivElement>(null);
 const inputRef = useRef<HTMLInputElement>(null);
 const [debouncedUsername] = useDebounce(username, 350);
 function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if (e.key === "Enter" && !e.shiftKey) {
   e.preventDefault();
   // if (!user) setShowCreateUsername(true);
   // if (!message.trim()) return;
   // console.log(message.trim());
  }
 }
 // todo: lodash.debounce to search for username
 useEffect(() => {
  if (!debouncedUsername || debouncedUsername.trim() === "") {
   setShowArrow(false);
   return;
  }
  console.log(debouncedUsername);
  setShowArrow(true);
  // fetch username from server
 }, [debouncedUsername]);
 // todo: improve the focus trap
 useEffect(() => {
  if (!containerRef.current) return;
  const validElements = containerRef.current.querySelectorAll("input,button");
  const firstElement = validElements[0] as HTMLElement;
  const lastElement = validElements[validElements.length - 1] as HTMLElement;
  const handleTab = (e: KeyboardEvent) => {
   if (e.key === "Tab") {
    if (e.shiftKey) {
     if (document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
     }
    } else {
     if (document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
     }
    }
   }
  };
  document.addEventListener("keydown", handleTab);
  return () => {
   document.removeEventListener("keydown", handleTab);
  };
 }, [showArrow]);
 useEffect(() => {
  inputRef.current?.focus();
 }, []);
 useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
   if (e.key === "Escape") setShowCreateUsernameModal(false);
  };
  document.addEventListener("keydown", handleEscape);
  return () => {
   document.removeEventListener("keydown", handleEscape);
  };
 }, [setShowCreateUsernameModal]);
 return createPortal(
  <div
   ref={containerRef}
   tabIndex={-1}
   className="fixed bg-black/80 inset-0 flex items-center justify-center w-screen h-screen px-4"
   onMouseDown={(e) => {
    if (e.target === containerRef.current) setShowCreateUsernameModal(false);
   }}
  >
   <div className="relative shrink-0 border-2 border-white/20 flex flex-col w-full max-w-sm mx-auto bg-gray-900 h-[7.25rem] px-3 sm:px-6 py-2">
    <button
     className="absolute top-0 right-1 p-0.5 rounded-full hover:bg-white/5 transition-colors duration-300"
     onClick={() => setShowCreateUsernameModal(false)}
    >
     <BiX className="text-xl text-white/80" />
    </button>
    <label htmlFor="setUsername" className="py-1 text-sm sm:text-base">
     Enter a username to start sending messages,or browse anonymously.
    </label>
    <div className="flex-1 flex items-center justify-between">
     <input
      ref={inputRef}
      id="setUsername"
      type="text"
      className="bg-transparent outline-none py-1 text-white/80 placeholder-white/60"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      onKeyDown={handleKeyDown}
     />
     <div className={cn("opacity-0 duration-300 transition-all relative", showArrow && "opacity-100")}>
      {showArrow && (
       <button className={cn("flex flex-col items-center group p-1.5")}>
        <span className="pointer-events-none whitespace-nowrap border border-white/20 absolute px-2 py-1 bg-gray-900 -top-10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 right-0 sm:right-auto">
         Create user
        </span>
        <FaArrowRight />
       </button>
      )}
     </div>
    </div>
   </div>
  </div>,
  document.body
 );
};
export default SetUsernameModal;
