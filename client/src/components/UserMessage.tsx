const UserMessage = ({ username, message }: { username: string; message: string }) => {
 return (
  <div className="flex gap-2">
   <div className="font-bold">{username}: </div>
   <div>{message}</div>
  </div>
 );
};
export default UserMessage;
