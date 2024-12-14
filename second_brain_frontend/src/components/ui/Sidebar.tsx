import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkIcon } from "../icons/LInkIcon";
import { Logo } from "../icons/Logo";
import { TagsIcon } from "../icons/TagsIcon";
import { TwitterIcon } from "../icons/TwitterIcon"
import { YouTubeIcon } from "../icons/YouTubeIcon";
import { SidebarItems } from "./SidebarItem"

export const Sidebar = () => {
    return (
      <div className="h-screen bg-white border-r w-72 fixed top-0 left-0 pl-4 pt-6">
        <div>
          <div className="flex items-center">
            <Logo size="2xl" />
            <h1 className="font-bold pl-2 text-2xl">Second Brain</h1>
          </div>
          <div className="pt-7">
            <SidebarItems text="Tweets" icon={<TwitterIcon size={"lg"} />} />
            <SidebarItems text="Videos" icon={<YouTubeIcon size={"lg"} />} />
            <SidebarItems text="Documents" icon={<DocumentIcon size={"lg"} />} />
            <SidebarItems text="Links" icon={<LinkIcon size={"lg"} />} />
            <SidebarItems text="Tags" icon={<TagsIcon size={"lg"} />} />
          </div>
        </div>
      </div>
    );
}