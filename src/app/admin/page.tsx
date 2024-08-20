import SingOutButton from "@/components/auth/SingOutButton";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import React from "react";


type Props = {};

export default async function page({}: Props) {
  const user:any = await getUser();

  if (!user) {
    return redirect("/");
  }

  return <div>You are Login As {user.name}
    <div>
        <SingOutButton> Sing Out </SingOutButton>
    </div>
  </div>;
}
