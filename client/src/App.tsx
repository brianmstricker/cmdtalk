import UserMessage from "./components/UserMessage";

function App() {
 return (
  <div className="relative h-[80%] border-2 min-h-[200px] p-4 mx-2 sm:mx-6 my-4 w-full max-w-6xl border-white/20">
   <h1 className="absolute text-[1.65rem] font-black tracking-widest -top-10 left-0">cmdtalk</h1>
   <UserMessage />
  </div>
 );
}

export default App;
