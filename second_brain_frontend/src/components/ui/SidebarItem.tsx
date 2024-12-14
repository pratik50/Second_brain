import { ReactElement } from "react";

export function SidebarItems({ icon, text }: {
  text: string,
  icon: ReactElement
}) {
  return (
    <div className="flex pl-4 items-center cursor-pointer hover:bg-gray-200 max-w-48 rounded-md group">
      <div className="text-gray-900 p-2 group-hover:text-black">{icon}</div>
      <div className="text-gray-500 p-2 text-lg group-hover:text-black">{text}</div>
    </div>
  );
}