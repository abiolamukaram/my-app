"use client"

import { CldUploadWidget } from 'next-cloudinary';
// import { CldImage } from 'next-cloudinary';
import { Button } from '../ui/button';
import { Plus, Trash } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}


const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value
  }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className='mb-4 flex flex-wrap items-center gap-4'>
        {value.map((url) => (
          // eslint-disable-next-line react/jsx-key
          <div key={url} className='relative w-[200px] h-[200px]'>
            <div className='absolute top-0 right-0 z-10'>
              <Button type='button' onClick={() => onRemove(url)} size="sm" className='bg-red-1 text-white'>
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image 
              src={url} 
              alt="collection" 
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="myyu6boo" 
      onSuccess={onSuccess}
      onError={(error) => console.error('Upload Error:', error)}
      >
        {({ open }) => {
          return (
            <Button onClick={() => open()} className='bg-grey-1 text-white'>
             <Plus className='h-4 w-4 mr-2' /> 
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
