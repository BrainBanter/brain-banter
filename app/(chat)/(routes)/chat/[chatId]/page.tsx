import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatClient } from "./components/client";

import prismadb from "@/lib/prismadb";

interface ChatIdPageProps {
  // params here stores all the URL that doesn't include search params
  // i.e. the id in the URL when looking up the message
  // if we were searching for a message, those details would be in searchParams
  params: {
    chatId: string
  }
}

const ChatIdPage = async ({
  params
}: ChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc"
        },
        where: {
          userId, // this makes sure we pull only the message from the logged in user
        }
      },
      _count: {
        select: {
          messages: true
        }
      }
    }
  });

  if (!companion) {
    return redirect("/");
  }

  return ( 
    <ChatClient companion={companion} />
   );
}
 
export default ChatIdPage