"use client";

import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { toast } from "sonner";
type Props = {};

function UploadPage({}: Props) {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    toast.error("File upload failed", {
      description: `Unsupported file type: ${file.file.type}`,
    });
    console.error("File upload failed:", file.errors[0].message);
  };

  const onDropAccepted = (uploadedFiles: File[]) => {
    try {
      startUpload(uploadedFiles, { configId: undefined });
      setIsDragOver(false);
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };
  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState<number>(45);
  const router = useRouter();
  const { startUpload, routeConfig, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: ([data]) => {
        const configId = data.serverData.configId;
        startTransition(() => {
          router.push(`/configure/design?id=${configId}`);
        });
      },
      onUploadProgress(p) {
        setUploadProgress(p);
      },
    }
  );
  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-foreground/10 p-2 ring-1 ring-inset ring-muted-foreground/20 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-primary/40 bg-primary/40": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          accept={{
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
          }}
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="h-full w-full flex flex-1 flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input type="" {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="size-10 text-foreground/40 mb-2" />
              ) : isPending || isUploading ? (
                <Loader2 className="size-6 animate-spin text-foreground/30 mb-4" />
              ) : (
                <Image className="size-6 text-foreground/40 mb-2" />
              )}
              <div className="flex flex-col items-center justify-center mb-2 text-sm text-foreground/50">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      className="mt-2 w-40 h-2 bg-secondary/30"
                      value={uploadProgress}
                      max={100}
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop your Image</span>
                    here to Upload.
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to Upload</span> or
                    drag and drop an image file here.
                  </p>
                )}
              </div>
              {isPending ? null : (
                <p className="text-xs text-foreground/30">.png, .jpeg, .jpg</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}

export default UploadPage;
