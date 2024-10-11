import { useEffect, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useBoundStore } from "../store/store";
import SetUsernameModal from "./SetUsernameModal";
import MessageTime from "./MessageTime";

const TextInput = ({ setContainerMargin }: { setContainerMargin: React.Dispatch<React.SetStateAction<number>> }) => {
 const [message, setMessage] = useState("");
 const [showCreateUsernameModal, setShowCreateUsernameModal] = useState(false);
 const textInputRef = useRef<HTMLTextAreaElement>(null);
 const user = useBoundStore((state) => state.user);
 function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (e.key === "Enter" && !e.shiftKey) {
   e.preventDefault();
   if (!user) setShowCreateUsernameModal(true);
   if (!message.trim()) return;
   console.log(message.trim());
  }
 }
 useEffect(() => {
  textInputRef.current?.focus();
  const tm = setTimeout(() => {
   textInputRef.current?.focus();
  }, 10);
  return () => clearTimeout(tm);
 }, [showCreateUsernameModal]);
 return (
  <>
   <div className="flex flex-col w-full mt-auto absolute bottom-0">
    <MessageTime />
    <div className="shrink-0 flex-1 border-t-2 border-white/20 flex w-full bg-gray-900">
     <div className="relative flex-grow flex before:absolute before:inset-0 before:pointer-events-none before:mr-2 before:bg-custom-gradient before:scale-[101%] before:translate-x-1">
      <ReactTextareaAutosize
       ref={textInputRef}
       autoFocus
       className="flex-grow py-2 px-6 w-full h-full bg-transparent text-white/80 placeholder-white/60 resize-none custom-scrollbar outline-none focus:outline focus:outline-green-500/80 focus:outline-offset-0"
       placeholder="Type a message"
       minRows={2}
       maxRows={6}
       onHeightChange={(height) => {
        setContainerMargin(height / 18);
       }}
       value={message}
       onChange={(e) => setMessage(e.target.value)}
       onKeyDown={handleKeyDown}
      />
     </div>
    </div>
   </div>
   {showCreateUsernameModal && <SetUsernameModal setShowCreateUsernameModal={setShowCreateUsernameModal} />}
  </>
 );
};
export default TextInput;
