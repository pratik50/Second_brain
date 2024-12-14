import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignUp() {

  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password
    })
    navigate("/signin")
    alert('You have sined Up')
  }


  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input refrence={usernameRef} placeholder="Username" />
        <Input refrence={passwordRef} placeholder="Password" />

        <div className="flex justify-center pt-4 ">
          <Button onClick={signup} loading={false} variant={"primary"} text={"Sign Up"} fullWidth={true} />
        </div>
      </div>
    </div>
  );
}