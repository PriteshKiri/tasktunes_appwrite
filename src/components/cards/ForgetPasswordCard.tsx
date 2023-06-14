const ForgetPasswordCard = ({ setUser, user, resetUser }: any) => {
  return (
    <div className=" p-8 sm:p-[50px] sm:bg-gradient-to-r  from-[#15283d] via-black to-[#0d2f2c] rounded-3xl">
      <div className="relative rounded-3xl sm:max-w-xl sm:mx-auto bg-black w-full h-full text-black sm:w-[500px] sm:height-[500px]">
        <div className="relative px-6 sm:px-4 py-24 sm:py-10 pt-[35px] shadow-lg rounded-3xl sm:p-10 sm:pb-20 text-white bg-black/60 bdr-all">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold  text-left ">
                Reset your <span className="text-blue-400">Password</span>
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 pt-2 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className=" w-full !bg-gray-700 !text-white !outline-0  border border-gray-300 text-gray-900 text-sm rounded-[8px] focus:!ring-blue-500 focus:!border-blue-500 block  p-[10px] border-gray-600 !placeholder:gray-400 !placeholder:[14px] mt-[25px]"
                    placeholder="Password"
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                  />
                </div>

                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className=" w-full !bg-gray-700 !text-white !outline-0  border border-gray-300 text-gray-900 text-sm rounded-[8px] focus:!ring-blue-500 focus:!border-blue-500 block  p-[10px] border-gray-600 !placeholder:gray-400 !placeholder:[14px] mt-[25px]"
                    placeholder="Password"
                    onChange={(e) => {
                      setUser({ ...user, passwordCheck: e.target.value });
                    }}
                  />
                </div>
                <div className="relative">
                  <button
                    className="bg-blue-500 hover:bg-blue-500/60 cursor-pointer text-white rounded-md px-4 py-2 text-sm mt-4"
                    onClick={resetUser}
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordCard;
