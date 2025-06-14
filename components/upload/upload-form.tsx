"use client";
import UploadFormInput from "@/components/upload/upload-form-input";
import React from "react";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";
const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF !"
    ),
});

export default function UploadForm() {

    const {startUpload , routeConfig} = useUploadThing("pdfUploader",{
        onClientUploadComplete:()=>{
            console.log("upload successfully!");
        },
        onUploadError : (err)=>{
            toast.message('Error occured while uploading',{
                description: err.message,
            })
            
        },
        onUploadBegin :({file})=>{
            console.log("upload has begun for ", file);
        }
    })

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    //validate the fields
    //schema validation using zod
    const validatedFields = schema.safeParse({file});

    console.log(validatedFields)

    if(!validatedFields.success){
        toast.error(' ❌ Something went wrong',{
            description:
                validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file'
        })
        return;
    }

    toast.info('📄 Uploading PDF',{
        description: ' We are uploading your PDF! '
    })

    //upload the file to uploadthing
    const resp = await startUpload([file]);
    if(!resp){
        toast.error('Something went wrong',{
            description: 'Please use a different file',
        })
        return;
    }

    toast.message('📄 Processing PDF',{
        icon: null ,
        description: 'Hang tight! Our AI is reading through your document! ✨'
    })

    //parse the pdf using lang chain

    const summary = await generatePdfSummary(resp);
    console.log({summary})
    //summarize the pdf using AI
    //save the summary to the database
    //redirect to the id summary page
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
