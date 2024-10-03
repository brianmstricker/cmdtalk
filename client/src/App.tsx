import { useEffect, useRef, useState } from "react";
import TextInput from "./components/TextInput";
import UserMessage from "./components/UserMessage";
import { useQuery } from "@tanstack/react-query";

function App() {
 const [containerMargin, setContainerMargin] = useState(3.5);
 const query = useQuery({ queryKey: ["messages"], queryFn: getMessages });
 const scrollContainer = useRef<HTMLDivElement>(null);
 async function getMessages() {
  const response = await fetch("http://127.0.0.1:8000/api");
  if (!response.ok) {
   throw new Error("Network response was not ok");
  }
  return response.json();
 }
 useEffect(() => {
  if (!scrollContainer.current) return;
  scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
 }, []);
 return (
  <div className="relative h-full max-h-[80vh] border-2 min-h-[200px] mx-2 sm:mx-6 my-4 w-full max-w-6xl border-white/20 flex flex-col">
   <h1 className="absolute text-[1.65rem] font-black tracking-widest -top-10 left-0">cmdtalk</h1>
   <div
    ref={scrollContainer}
    className="flex flex-col gap-y-3 overflow-y-auto my-2 p-4 custom-scrollbar"
    style={{ marginBottom: `${containerMargin}rem` }}
   >
    {Array.from({ length: 10 }).map((_, i) => (
     <UserMessage
      key={i}
      username="test"
      message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
     />
    ))}
   </div>
   <div className="w-full bg-transparent h-4 shrink-0" />
   <TextInput setContainerMargin={setContainerMargin} />
  </div>
 );
}

export default App;
