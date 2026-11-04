import imageCompression from 'browser-image-compression';

export interface CompressionProgressCallback {
  (progress: number): void;
}

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  onProgress?: CompressionProgressCallback;
}

/**
 * Compresses an uploaded image file on the client-side and converts it to modern WebP format.
 * Reduces bandwidth usage and ensures fast loading speeds across low-connectivity mobile networks in Bohol.
 *
 * @param imageFile - Raw user file (JPEG, PNG, HEIC, etc.)
 * @param customOptions - Optional overrides for compression parameters
 * @returns Compressed WebP File instance
 */
export async function compressImageToWebP(
  imageFile: File,
  customOptions?: CompressionOptions
): Promise<File> {
  // If the file is already a tiny WebP (under 200KB), return as-is
  if (imageFile.type === 'image/webp' && imageFile.size < 200 * 1024) {
    return imageFile;
  }

  const defaultOptions = {
    maxSizeMB: 0.8, // Target maximum file size 800KB
    maxWidthOrHeight: 1920, // Max 1080p / 1440p dimensions
    useWebWorker: true,
    fileType: 'image/webp',
    initialQuality: 0.85,
  };

  const options = {
    ...defaultOptions,
    ...customOptions,
  };

  try {
    const compressedBlob = await imageCompression(imageFile, options);

    // Generate clean file name with .webp extension
    const baseName = imageFile.name.substring(0, imageFile.name.lastIndexOf('.')) || imageFile.name;
    const webpFileName = `${baseName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.webp`;

    return new File([compressedBlob], webpFileName, {
      type: 'image/webp',
      lastModified: Date.now(),
    });
  } catch (error) {
    console.warn('[ImageCompression] Fallback: Compression failed or unsupported, using original file', error);
    return imageFile;
  }
}

/**
 * Human-readable file size formatter
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
