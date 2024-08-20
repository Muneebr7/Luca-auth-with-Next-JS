import TabSwitcher from "@/components/TabSwitcher";
import SingIn from "./auth/SingIn";
import SingUp from "./auth/SingUp";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
   
      <TabSwitcher SingInTab={<SingIn />} SingUpTab={<SingUp />} />

    </main>
  );
}
