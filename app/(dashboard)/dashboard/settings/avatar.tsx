import React, { useEffect, useState } from 'react';
import { Database } from '@/config/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import LoadingSpinner from '@/app/(dashboard)/dashboard/components/LoadingSpinner';

type Profiles = Database['public']['Tables']['userProfiles']['Row'];

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string; 
  url: Profiles['avatar_url'];
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClientComponentClient<Database>();
  const [uploading, setUploading] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const deletePreviousAvatar = async () => {
    try {
      if (url) {
        const previousAvatarPath = url.split('/').pop();
        if (previousAvatarPath) {
          await supabase.storage.from('avatars').remove([previousAvatarPath]);
        }
      }
    } catch (error) {
      console.log('Error deleting previous avatar: ', error);
    }
  };

  const downloadImage = async (path: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.storage.from('avatars').download(path);
      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true);
      setIsLoading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const allowedFileTypes = ['jpg', 'jpeg', 'png', 'gif'];

      if (!fileExt || !allowedFileTypes.includes(fileExt)) {
        throw new Error('Invalid file type. Only JPG, PNG, and GIF files are allowed.');
      }

      if (file.size > 1024 * 1024) {
        throw new Error('File size exceeds the limit. Please upload an image up to 1MB.');
      }

      // Delete the previous avatar image
      await deletePreviousAvatar();

      const timestamp = Date.now(); // Use timestamp to make the filename unique.
      const filePath = `/${uid}-${timestamp}.${fileExt}`;

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.log((error as Error).message || 'Error uploading avatar!');
    } finally {
      setUploading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      downloadImage(url);
    }
  }, [url]);

  return (
    <div className="col-span-full flex items-center gap-x-8">
      <div className={`w-${size}px h-${size}px`} style={{ minWidth: size, minHeight: size }}>
        {loading ? (
          <div className={`relative w-${size} h-${size} `} style={{ minWidth: size, minHeight: size }}>
            <div className="absolute inset-0 flex justify-center items-center border border-zinc-600 rounded-lg">
              <LoadingSpinner size="10" />
            </div>
          </div>
        ) : (
          avatarUrl ? (
            <Image
              width={size}
              height={size}
              src={avatarUrl}
              alt="Avatar"
              className="avatar image border border-zinc-600 rounded-lg"
              style={{ height: size, width: size }}
            />
          ) : (
            <div className="avatar no-image" style={{ height: size, width: size }} />
          )
        )}
        <div style={{ width: size }}>
          <input
            style={{
              visibility: 'hidden',
              position: 'absolute',
            }}
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      </div>
      <div>
        <button
          type="button"
          className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
          onClick={() => {
            const fileInput = document.getElementById('single');
            if (fileInput) {
              fileInput.click();
            }
          }}
        >
          {uploading ? 'Uploading ...' : 'Change Avatar'}
        </button>
        <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF, or PNG. 1MB max.</p>
      </div>
    </div>
  );
}
