import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useFormState } from '../../contexts/form-context';

type TFormValues = {
  name: string;
};

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.',
  }),
});

export function SetupNameForm() {
  const { onHandleNext, setFormData, formData } = useFormState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: formData,
    resolver: zodResolver(formSchema), // Use zodResolver to integrate zod
  });

  const onHandleFormSubmit = (data: TFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext();
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <div className="flex gap-1 flex-col">
        <Label htmlFor="name" className='pb-2'>Name</Label>
        <Input
          id="name"
          placeholder="Setup name"
          {...register('name')}
          className={`${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && (
          <span className="text-red-500 py-1">{errors.name.message}</span>
        )}
      </div>
      <div className="flex justify-end">
        <Button size="lg" variant="default" type="submit" className="w-full">
          Next
        </Button>
      </div>
    </form>
  );
}
