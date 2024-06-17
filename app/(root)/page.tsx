
import { InitialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModel } from "@/components/models/initial-model";


export default async function Home() {

  const userProfile = await InitialProfile();
  
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: userProfile.id
        }
      }
    }
  })

  if (server) { 
    return redirect(`/servers/${server.id}`); 
  }

  return <div>
  <InitialModel/>
  </div>
}
