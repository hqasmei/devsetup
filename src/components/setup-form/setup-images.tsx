'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { deleteUploadThingImage } from '@/actions/delete-uploadthing-image';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getFileKey } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { UploadDropzone } from '@uploadthing/react';

import { useFormState } from '../../contexts/form-context';

type TFormValues = {
  images: string[];
};

const formSchema = z.object({
  images: z.array(z.string()).min(1, {
    message: 'At least one image is required.',
  }),
});

export function SetupImagesForm({
  setShowModal,
}: {
  setShowModal: (show: boolean) => void;
}) {
  const { setFormData, onHandleBack, formData } = useFormState();

  const [imageUrls, setImageUrls] = useState<string[]>(formData.images || []);
  const router = useRouter();
  const {
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: { images: imageUrls }, // Pass the images array as default values
  });

  const onHandleFormSubmit = async (data: TFormValues) => {
    try {
      const setupNameValues = { name: formData.name };

      const { data: setupData } = await axios.post(
        '/api/setup/add',
        setupNameValues,
      );

      for (const imageUrl of formData.images) {
        const setupImageValues = {
          setupId: setupData[0].setup_id,
          imageUrl: imageUrl,
        };

        await axios.post('/api/setup-image/add', setupImageValues);
      }
      router.refresh();
      setShowModal(false);
      toast.success(`Created ${formData.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadComplete = async (res: any) => {
    for (const item of res) {
      const newImageUrl = item.fileUrl;
      setFormData((prev: any) => {
        if (prev.images) {
          return { ...prev, images: [...prev.images, newImageUrl] };
        } else {
          return { ...prev, images: [newImageUrl] };
        }
      });
      setImageUrls((prevImageUrls) => [...prevImageUrls, newImageUrl]);
    }
  };

  const handleRemoveImage = async (index: number) => {
    const removedImageUrl = imageUrls[index];
    const fileKey = getFileKey(removedImageUrl);

    try {
      // Call the deleteUploadThingImage function with the URL of the image to delete
      // if (fileKey) {
      //   await deleteUploadThingImage(fileKey);
      // }

      // Remove the image URL from imageUrls and formData.images
      const updatedImageUrls = [...imageUrls];
      const updatedFormDataImages = formData.images ? [...formData.images] : [];

      updatedImageUrls.splice(index, 1);
      if (updatedFormDataImages.length > index) {
        updatedFormDataImages.splice(index, 1);
      }

      setImageUrls(updatedImageUrls);
      setFormData((prev: any) => {
        return { ...prev, images: updatedFormDataImages };
      });
    } catch (error) {
      console.error('Error deleting the image:', error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <div className="flex gap-1 flex-col">
        <Label htmlFor="images" className="pb-2">
          Add Images
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
          <div key={index} className="relative">
            <img src={imageUrl} alt={`Image ${index}`} className="rounded" />
            <button
              type="button"
              className="absolute -top-2  -right-2"
              onClick={() => handleRemoveImage(index)}
            >
              <Icon
                icon="carbon:close-filled"
                width="24"
                height="24"
                className="text-red-800 hover:text-red-600"
              />
            </button>
          </div>
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
        <Button
          size="lg"
          disabled={imageUrls.length === 0}
          variant="default"
          type="submit"
          className="w-full"
        >
          Create
        </Button>
      </div>
    </form>
  );
}
