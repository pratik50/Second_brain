import { ReactElement } from "react";

export function SidebarItems({ icon, text }: {
  text: string,
  icon: ReactElement
}) {
  return (
    <div className="flex pl-2 md:pl-4 mt-2 md:mt-0 items-center cursor-pointer hover:bg-gray-200 min-w-full rounded-md group">
      <div className="text-gray-900 p-2 group-hover:text-black">{icon}</div>
      <div className="text-gray-500 p-2 text-lg group-hover:text-black hidden md:block">{text}</div>
    </div>
  );
}