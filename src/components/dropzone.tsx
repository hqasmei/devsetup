'use client';

import React from 'react';

import { OurFileRouter } from '@/app/api/uploadthing/core';
import axios from 'axios';

import { UploadDropzone } from '@uploadthing/react';

const Dropzone = () => {
  const handleUploadComplete = async (res: any) => {
    try {
      const values = { imageUrl: res[0].fileUrl };
      // Do something with the response
      await axios.post('/api/images/add', values);

      // console.log('Files: ', res);
      // alert('Upload Completed');
    } catch {
      console.log('Error getting response');
    }
  };

  return (
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
  );
};

export default Dropzone;
