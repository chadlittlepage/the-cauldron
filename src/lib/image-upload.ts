import { supabase } from '@/lib/supabase';

const MAX_SIZE = 512;
const QUALITY = 0.85;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/** Resize an image file to fit within MAX_SIZE x MAX_SIZE and convert to WebP. */
function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error('Image must be under 5 MB'));
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;
      if (width > MAX_SIZE || height > MAX_SIZE) {
        const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Failed to encode image'))),
        'image/webp',
        QUALITY,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/** Upload an avatar image to Supabase Storage. Returns the public URL. */
export async function uploadAvatar(file: File, userId: string): Promise<string> {
  const blob = await resizeImage(file);
  const path = `${userId}/avatar.webp`;

  const { error } = await supabase.storage
    .from('avatars')
    .upload(path, blob, { contentType: 'image/webp', upsert: true });
  if (error) throw error;

  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  // Append cache-buster so browsers pick up new avatar immediately
  return `${data.publicUrl}?v=${Date.now()}`;
}
