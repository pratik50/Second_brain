import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkIcon } from "../icons/LInkIcon";
import { Logo } from "../icons/Logo";
import { TagsIcon } from "../icons/TagsIcon";
import { TwitterIcon } from "../icons/TwitterIcon"
import { YouTubeIcon } from "../icons/YouTubeIcon";
import { Button } from "./Button";
import { SidebarItems } from "./SidebarItem"

export const Sidebar = () => {
    return (
      <div className="flex h-screen bg-white border-r fixed top-0 left-0 transition-all duration-300 md:w-64 w-16">
        <div className=" md:pl-4 pt-6 flex flex-col">
          <div className="flex">
            <div className="flex items-center pl-2 md:justify-start">
              <Logo size="2xl" />
            </div>
            <div>
              <h1 className="font-bold pl-2 text-2xl hidden md:block">Second Brain</h1>
            </div>            
          </div>

          <div className="pt-7 flex flex-col justify-center items-center md:items-start">
            <SidebarItems text="Tweets" icon={<TwitterIcon size={"lg"} />} />
            <SidebarItems text="Videos" icon={<YouTubeIcon size={"lg"} />} />
            <SidebarItems text="Documents" icon={<DocumentIcon size={"lg"} />} />
            <SidebarItems text="Links" icon={<LinkIcon size={"lg"} />} />
            <SidebarItems text="Tags" icon={<TagsIcon size={"lg"} />} />
          </div>

            <div className="flex justify-center mt-auto mb-2">
              <Button variant={"secondary"} text={"Logout"} />
            </div>
          </div>
      </div>
        
    );
}