import TextInput from "./components/TextInput";
import UserMessage from "./components/UserMessage";

function App() {
 return (
  <div className="relative h-full max-h-[80vh] border-2 min-h-[200px] mx-2 sm:mx-6 my-4 w-full max-w-6xl border-white/20 flex flex-col">
   <h1 className="absolute text-[1.65rem] font-black tracking-widest -top-10 left-0">cmdtalk</h1>
   <div className="flex flex-col gap-y-3 overflow-y-auto mr-2 my-2 p-4 custom-scrollbar">
    <UserMessage
     username="test"
     message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
    />
    <UserMessage
     username="test"
     message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
    />
    <UserMessage
     username="test"
     message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
    />
    <UserMessage
     username="test"
     message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
    />
    <UserMessage
     username="test"
     message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
    />
    <UserMessage
     username="test"
     message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
    />
    <UserMessage
     username="test"
     message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
    />
    <UserMessage
     username="test"
     message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
    />
    <UserMessage
     username="test"
     message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
    />
    <UserMessage
     username="test"
     message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
    />
    <UserMessage
     username="test"
     message="really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. really long message. "
    />
   </div>
   <TextInput />
  </div>
 );
}

export default App;
