import ReactTextareaAutosize from "react-textarea-autosize";

const TextInput = ({ setContainerMargin }: { setContainerMargin: React.Dispatch<React.SetStateAction<number>> }) => {
 return (
  <div className="shrink-0 mt-auto border-t-2 border-white/20 flex absolute w-full bg-gray-900 bottom-0">
   <div className="relative flex-grow flex before:absolute before:inset-0 before:pointer-events-none before:mr-2 before:bg-custom-gradient before:scale-[101%] before:translate-x-1">
    <ReactTextareaAutosize
     autoFocus
     className="flex-grow py-2 px-14 w-full h-full bg-transparent text-white/80 placeholder-white/60 resize-none custom-scrollbar"
     placeholder="Type a message"
     minRows={2}
     maxRows={6}
     onHeightChange={(height) => {
      setContainerMargin(height / 18);
     }}
    />
   </div>
  </div>
 );
};
export default TextInput;
