import SingOutButton from "@/components/auth/SingOutButton";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import React from "react";


type Props = {};

export default async function page({}: Props) {
  const user:any = await getUser();
  if(!user){
    redirect('/')
  }
  return <div>
    <h1>You are login as {user.name}</h1>
    <div>
        <SingOutButton> Sing Out </SingOutButton>
    </div>
  </div>;
}
