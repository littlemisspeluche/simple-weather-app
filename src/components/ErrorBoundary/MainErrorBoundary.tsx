import { FC } from 'react';
import { TbFaceIdError } from 'react-icons/tb';

const MainErrorBoundary: FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center m-6">
      <div className="flex w-fit items-center gap-x-4">
        <TbFaceIdError size={'5rem'} />
        <div className="flex w-fit flex-col items-start gap-y-2 text-main">
          <div className="text-4xl font-bold">Oops...</div>
          <span>Something went wrong</span>
        </div>
      </div>
    </div>
  );
};

export default MainErrorBoundary;
