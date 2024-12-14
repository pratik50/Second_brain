import { useEffect, useState } from "react";
import { PlusIcon } from "../components/icons/PlusIcon";
import { ShareIcon } from "../components/icons/ShareIcon";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { Sidebar } from "../components/ui/Sidebar";
import { useContents } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {content, refresh} = useContents();
  
  useEffect(()=> {
    refresh()
  },[modalOpen])

  async function shareBrain() {
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
      share: true
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    console.log(response);
    
    const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
    alert(shareUrl) 
  }

  return (
    <div>
      <div>
        <Sidebar />
      </div>

      <div className=" pl-4 ml-72 min-h-screen border-l-1 bg-gray-100">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />

        <div className="flex justify-end">
          <Button
            startIcon={<ShareIcon size="md" />}
            variant="secondary"
            text="Share Brain"
            onClick={shareBrain}
          />
          <Button
            startIcon={<PlusIcon size="md" />}
            variant="primary"
            text="Add Content"
            onClick={() => {
              setModalOpen(true);
            }}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          {content.map(({_id, title, link, type}) => (
              <Card key={_id}
                title={title}
                link={link}
                type={type} />
          ))}
        </div>
      </div>
    </div>
  );
}