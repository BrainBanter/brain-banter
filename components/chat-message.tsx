"use client"
require('dotenv').config();

import { useTheme } from "next-themes";
import { BeatLoader } from "react-spinners"
import { Copy, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast"
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";

import OpenAI from "openai";
let apiKey = "xxx";
console.log('api key', apiKey)
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });


async function textToSpeech(content: string) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: content,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  const blob = new Blob([buffer], { type: 'audio/mpeg' });
  const url = URL.createObjectURL(blob);

  return url;
}


export interface ChatMessageProps {
  role: "system" | "user",
  content?: string,
  isLoading?: boolean,
  src?: string
}

export const ChatMessage = ({
  role,
  content,
  isLoading,
  src
}: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      // it's ok if the message has no content
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard",
    });
  }

  const onPlay = async () => {
    if (!content) {
      // it's ok if the message has no content
      return;
    }

    console.log('MVP imminent')
    // const audioUrl = await textToSpeech(content);
    // const audio = new Audio(audioUrl);
    // audio.play();
  
    toast({
      description: "Message queued to play audio.",
    });
  }


  return (
    <div className={cn(
      "group flex items-start gap-x-3 py-4 w-full",
      role === "user" && "justify-end"    // if the user is talking, we want the message on the right
    )}>
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading
          ? <BeatLoader 
              size={5}
              color={theme === "light" ? "black" : "white"}
            />
          : content
        }
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <>
          <Button
            onClick={onCopy}
            className="opacity-0 group-hover:opacity-100 transition" // opacity-0 hides it, until the hover
            size="icon"
            variant="ghost"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
          onClick={onPlay} // replace for MVP
          className="opacity-0 group-hover:opacity-100 transition" // opacity-0 hides it, until the hover
          size="icon"
          variant="ghost"
        >
          {/* replace following line with Play */}
          <Play className="w-4 h-4" /> 
        </Button>
      </>
      
      )}
    </div>
  )
}