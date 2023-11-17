"use client"

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // this prevents hydration issues by checking if we're mounted
  // I'm not sure what hydration is yet, but this is basically mounting the component (useEffect)
  // if the component is not mounted, we return null and prevents the code below from running
  // this means that the code below only runs when mounted
  // this is important for use with Cloudinary, because we don't want to run this code on the server
  if (!isMounted) return null;   

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        onUpload = {(result: any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1
        }}
        uploadPreset="jr67my5m"
      >
        <div className="
          p-4 
          border-4 
          border-dashed 
          border-primary/10 
          rounded-lg 
          hover:opacity-75 
          transition 
          flex 
          flex-col 
          space-y-2 
          items-center 
          justify-center
        ">
          <div className="relative h-40 w-40">
            <Image 
              fill
              alt="Upload"
              src={value || "/placeholder.svg"}
              className="rounded-lg object-cover"
            />
          </div>

        </div>
      </CldUploadButton>
    </div>
  )
}
