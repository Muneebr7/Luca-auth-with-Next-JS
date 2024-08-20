import TabSwitcher from "@/components/TabSwitcher";
import SingIn from "../components/auth/SingIn";
import SingUp from "../components/auth/SingUp";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser()

  if(user){
    redirect('/admin')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
   
      <TabSwitcher SingInTab={<SingIn />} SingUpTab={<SingUp />} />

    </main>
  );
}
