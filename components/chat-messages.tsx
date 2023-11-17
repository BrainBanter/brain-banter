"use client";

import { Companion } from "@prisma/client";
import { ChatMessage } from "@/components/chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: any[];
  isLoading: boolean;
  companion: Companion;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  companion
}: ChatMessagesProps) => {

  const scrollRef = useRef<ElementRef<"div">>(null);

  // if there's no previous messages, then we set a timeout of 1sec
  // So it looks like the bot is typing for 1 second when the user logs in
  const [ fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false)


  useEffect(() => {
    const timeout=setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout)
    }
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]) // this is the scroll reference behaviour, everytime a message is added/changed.

  return (
    <div className="flex-1 overflow-auto pr-4">
      <ChatMessage 
        isLoading={fakeLoading}
        src={companion.src}
        role="system"
        content={`Hello I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage 
          key={message.content}
          role={message.role}
          content={message.content}
          src={companion.src}
        />
      ))}

      {/* The below is happening while we're waiting on the API call (4:15:40) */}
      {isLoading && (
        <ChatMessage 
          role="system"
          src={companion.src}
          isLoading
        />
      )}
      <div ref={scrollRef} />
    </div>
  )
}