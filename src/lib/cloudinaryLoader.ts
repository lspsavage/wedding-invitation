import { ImageLoaderProps } from "next/image";

export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  // If the source is not a Cloudinary URL, return it as is (useful for local fallbacks like /hero.png)
  if (!src.includes("res.cloudinary.com")) {
    return src;
  }

  // Cloudinary URLs typically look like:
  // https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/sample.jpg
  // We split by "/upload/" to inject our transformations
  const urlParts = src.split("/upload/");

  if (urlParts.length !== 2) {
    return src;
  }

  const baseUrl = urlParts[0];
  const imagePath = urlParts[1];

  // Define transformations:
  // f_auto: automatic format selection (WebP, AVIF, etc.)
  // q_auto: automatic quality optimization
  // w_<width>: resize the image based on Next.js requested width
  // c_limit: resize the image to fit within the specified width, but do not scale up
  const params = [
    "f_auto",
    "q_auto",
    `w_${width}`,
    "c_limit"
  ];

  // If a specific quality is provided by the Next.js Image component, override q_auto
  if (quality) {
    params.push(`q_${quality}`);
  }

  const transformations = params.join(",");

  // Return the transformed URL
  return `${baseUrl}/upload/${transformations}/${imagePath}`;
}
