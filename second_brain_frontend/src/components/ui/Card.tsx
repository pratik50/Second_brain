import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string,
  link: string,
  type: string
}

export const Card = (props: CardProps) => {
  return (
    <div>
      <div className="bg-white p-4 rounded-xl border-gray-200 shadow-sm max-w-72 border min-w-72 min-h-96">
        <div className="flex justify-between">
          <div className="flex items-center text-base">
            <div className="pr-2 text-gray-900 ">
              <ShareIcon size="md" />
            </div>
            <div className="text-lg pr-2">{props.title}</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="pr-2 text-gray-500 cursor-pointer">
              <ShareIcon size="md" />
            </div>
            <div className="text-gray-500 cursor-pointer ">
              <DeleteIcon size="md" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          {props.type == "youtube" && (
            <iframe
              className="w-full rounded-xl"
              src={props.link.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {props.type == "tweet" && (
            <blockquote className="twitter-tweet">
              <a href={props.link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}