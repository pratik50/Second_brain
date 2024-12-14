import { useRef, useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "tweet"
}

export function CreateContentModal({ open, onClose }: any) {

  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);


  async function addContent() {

    const title = titleRef.current?.value;
    const link  = linkRef.current?.value;

    await axios.post(`${BACKEND_URL}/api/v1/content`, {
      title,
      link,
      type
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })

    onClose()

  }

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60"></div>

          <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
            <div className="bg-white opacity-100 p-4 rounded-md shadow-lg">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CloseIcon size={"md"} />
                </div>
              </div>

              <div className="space-y-2">
                <Input refrence={titleRef} placeholder={"Title"} />
                <Input refrence={linkRef} placeholder={"Link"} />
              </div>
              <div>
                <h1>Type</h1>
                <div className="flex gap-1 justify-center pb-2">
                  <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                    setType(ContentType.Youtube)
                  }}></Button>
                  <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                    setType(ContentType.Twitter)
                  }}></Button>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Button onClick={addContent} variant={"secondary"} text={"Save to Second Brain"} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
