import { FC } from 'react';

const MainErrorBoundary: FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-fit items-center gap-x-4">
        <div className="flex h-[9rem] w-[9rem] items-center justify-center rounded-full bg-[#fff] shadow-box">
          {/* <img src={Logo} alt="logo" className="w-[5rem]" /> */}
        </div>
        <div className="flex w-fit flex-col items-start gap-y-2 text-main">
          <div className="text-4xl font-bold">Oops...</div>
          <span>Oops, Something went wrong</span>
        </div>
      </div>
    </div>
  );
};

export default MainErrorBoundary;
