'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useFormState } from '../../../contexts/form-context';

type TFormValues = {
  last: string;
};

export function SetupLastForm() {
  const [isCreated, setCreated] = useState(false);
  const { setFormData, formData, onHandleBack } = useFormState();
  const { register, handleSubmit } = useForm<TFormValues>({
    defaultValues: formData,
  });

  const onHandleFormSubmit = (data: TFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setCreated(true);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <div className="flex gap-1 flex-col">
        <label htmlFor="last">lLast</label>
        <input
          id="last"
          {...register('last')}
          className="border h-11 px-4 rounded-md focus:outline-blue-500 "
          required={true}
        />
      </div>
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={onHandleBack}
          className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md"
        >
          Back
        </button>
        <button className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md">
          Create
        </button>
      </div>
    </form>
  );
}
