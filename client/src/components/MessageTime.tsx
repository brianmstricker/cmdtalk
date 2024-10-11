const buttons = [
 { id: 1, time: 5 },
 { id: 2, time: 10 },
 { id: 3, time: 25 },
 { id: 4, time: 60 },
];

const MessageTime = () => {
 return (
  <div className="bg-gray-900 ml-auto px-10">
   <div className="flex border-x-2 border-t-2 border-x-white/20 border-t-white/20 divide-x-2 divide-white/20">
    {buttons.map((button) => (
     <button key={button.id} className="w-12 py-0.5 hover:bg-white/10 outline-none focus:bg-white/10">
      {button.time}m
     </button>
    ))}
   </div>
  </div>
 );
};
export default MessageTime;
