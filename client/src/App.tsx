import { useEffect, useRef, useState } from "react";
import TextInput from "./components/TextInput";
import UserMessage from "./components/UserMessage";
import { useQuery } from "@tanstack/react-query";
import { useBoundStore } from "./store/store";
import SetUsername from "./components/SetUsername";
import NoMessages from "./components/NoMessages";

function App() {
 const [containerMargin, setContainerMargin] = useState(3.5);
 const scrollContainer = useRef<HTMLDivElement>(null);
 const user = useBoundStore((state) => state.user);
 const { data, isFetching } = useQuery({ queryKey: ["messages"], queryFn: getMessages, refetchOnWindowFocus: false });
 async function getMessages() {
  const response = await fetch("http://127.0.0.1:8000/api/messages");
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
    {isFetching ? (
     Array.from({ length: 3 }).map((_, i) => <div key={i} className="animate-pulse bg-gray-800 h-8 w-full" />)
    ) : (
     <>
      {!data || !data.length || data.length === 0 ? (
       <NoMessages />
      ) : (
       data.map((message: { username: string; body: string }, i: number) => (
        <UserMessage key={i} username={message.username} message={message.body} />
       ))
      )}
     </>
    )}
    {/* {Array.from({ length: 10 }).map((_, i) => (
     <UserMessage
      key={i}
      username="test"
      message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
     />
    ))} */}
   </div>
   <div className="w-full bg-transparent h-4 shrink-0" />
   {user ? <TextInput setContainerMargin={setContainerMargin} /> : <SetUsername />}
  </div>
 );
}

export default App;
