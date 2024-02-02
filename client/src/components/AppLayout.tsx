import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return <div className='flex flex-col min-h-full'>{children}</div>;
};

export default AppLayout;
