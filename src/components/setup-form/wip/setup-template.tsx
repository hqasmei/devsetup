'use client';

import React, { useState } from 'react';

import { OurFileRouter } from '@/app/api/uploadthing/core';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { UploadDropzone } from '@uploadthing/react';

import { useFormState } from '../../../contexts/form-context';

type TFormValues = {
  images: string[];
};

const formSchema = z.object({
  images: z.array(z.string()).min(1, {
    message: 'At least one image is required.',
  }),
});

export function SetupTemplateForm() {
  const { onHandleNext, setFormData, onHandleBack, formData } = useFormState();
  console.log(formData);
  const [imageUrls, setImageUrls] = useState<string[]>(formData.images || []);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: { images: imageUrls }, // Pass the images array as default values
    resolver: zodResolver(formSchema),
  });

  const onHandleFormSubmit = (data: TFormValues) => {
    setFormData((prev: any) => ({ ...prev, images: data.images }));
    onHandleNext();
  };

  const handleUploadComplete = async (res: any) => {
    const newImageUrl = res[0].fileUrl;
    setImageUrls((prevImageUrls) => [...prevImageUrls, newImageUrl]);
    setFormData((prev: any) => {
      if (prev.images) {
        return { ...prev, images: [...prev.images, newImageUrl] };
      } else {
        return { ...prev, images: [newImageUrl] };
      }
    });
    console.log(`New image URL: ${newImageUrl}`);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <div className="flex gap-1 flex-col">
        <Label htmlFor="images" className="pb-2">
          Add Template
        </Label>
        <UploadDropzone<OurFileRouter>
          className="border-dashed border-2 col-span-3 border-zinc-500 w-full h-64 rounded-lg flex items-center justify-center hover:border-solid"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => handleUploadComplete(res)}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
          onUploadBegin={(name) => {
            // Do something once upload begins
            console.log('Uploading: ', name);
          }}
        />
        {errors.images && (
          <span className="text-red-500 py-1">{errors.images.message}</span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            className="rounded"
          />
        ))}
      </div>
      <div className="w-full flex justify-center space-x-6">
        <Button
          size="lg"
          variant="outline"
          type="button"
          onClick={onHandleBack}
          className="w-full"
        >
          Back
        </Button>
        <Button size="lg" variant="default" type="submit" className="w-full">
          Next
        </Button>
      </div>
    </form>
  );
}
