const SingleSongCard = () => {
  return (
    <div className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm">
      <div
        className="w-12 h-12 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1550871685-92364adac4f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG11c2ljJTIwdGh1bWJuYWlsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60")`,
        }}
      ></div>
      <div className="flex w-full">
        <div className="text-white flex justify-center flex-col pl-4 w-5/6">
          <div className="cursor-pointer hover:underline">Mamta Interlude</div>
          <div className="text-xs text-gray-400 cursor-pointer hover:underline">
            Mahesh Dalle
          </div>
        </div>
        <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
          <div>3:44</div>
          {/* <div className="text-gray-400 text-lg flex justify-center items-center pl-3">
            ...
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
