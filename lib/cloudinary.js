// Client-side Cloudinary upload helper.
// Uses an unsigned preset (orgix_web) so no API secret ever touches the browser.
// Defaults match the Orgix cloud — override per deployment with:
//   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
//   NEXT_PUBLIC_CLOUDINARY_PRESET
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dwjr5yrir",
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "orgix_web",
};

const VIDEO_EXT = ["mp4", "webm", "mov", "m4v"];
const IMAGE_EXT = ["jpg", "jpeg", "png", "webp", "gif", "avif", "svg"];

export function mediaType(file) {
  const ext = (file?.name || "").split(".").pop().toLowerCase();
  if (VIDEO_EXT.includes(ext)) return "video";
  if (IMAGE_EXT.includes(ext)) return "image";
  return "raw";
}

/**
 * Upload one file to Cloudinary under orgix-media/<folder>/<name>.
 * Returns { ok, publicId, secureUrl, error? }.
 */
export async function uploadToCloudinary(file, { folder = "" } = {}) {
  const type = mediaType(file);
  const base = file.name.replace(/\.[^.]+$/, "");
  const clean = folder.replace(/^\/+|\/+$/g, "");
  const publicId = clean ? `${clean}/${base}` : base;

  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", cloudinaryConfig.uploadPreset);
  fd.append("public_id", publicId);
  fd.append("overwrite", "true");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/${type}/upload`,
      { method: "POST", body: fd }
    );
    const json = await res.json();
    if (!res.ok) {
      return { ok: false, error: json?.error?.message || `Upload failed (${res.status})` };
    }
    return { ok: true, publicId: json.public_id, secureUrl: json.secure_url };
  } catch {
    return { ok: false, error: "Network error — check your connection." };
  }
}
