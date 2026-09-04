"use client";

import { useRef, useState } from "react";
import Icon from "../core/Icon";
import { uploadToCloudinary } from "@/lib/cloudinary";

const FOLDERS = [
  { value: "creators", label: "Creators & clients" },
  { value: "stories", label: "Case-study portraits" },
  { value: "testimonials", label: "Testimonials" },
  { value: "founders", label: "Team / founders" },
  { value: "process", label: "Process photos" },
  { value: "logo", label: "Logos" },
  { value: "", label: "Other (root of orgix-media)" },
];

const TYPE_LABEL = { image: "image", video: "video", raw: "file" };

function copy(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
  return Promise.resolve();
}

export default function MediaUploader() {
  const input = useRef(null);
  const [folder, setFolder] = useState("creators");
  const [dragging, setDragging] = useState(false);
  const [items, setItems] = useState([]); // {file, status, url, error, publicId}

  const addFiles = (list) => {
    const fresh = [...list].filter((f) => f.type.startsWith("image") || f.type.startsWith("video"));
    if (!fresh.length) return;
    setItems((prev) => [
      ...prev,
      ...fresh.map((file) => ({ file, status: "queued", url: "", error: "" })),
    ]);
    fresh.forEach((file) => run(file));
  };

  const run = async (file) => {
    setItems((prev) => prev.map((i) => (i.file === file ? { ...i, status: "uploading" } : i)));
    const res = await uploadToCloudinary(file, { folder: FOLDERS.find((f) => f.value === folder)?.value ?? folder });
    setItems((prev) =>
      prev.map((i) =>
        i.file === file
          ? {
              ...i,
              status: res.ok ? "done" : "error",
              url: res.secureUrl || "",
              publicId: res.publicId || "",
              error: res.error || "",
            }
          : i
      )
    );
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const statusMeta = {
    queued: { label: "Queued", cls: "", icon: "clock" },
    uploading: { label: "Uploading…", cls: "", icon: "loop" },
    done: { label: "Uploaded", cls: "ok", icon: "check" },
    error: { label: "Failed", cls: "bad", icon: "close" },
  };

  return (
    <div>
      <div
        className={`drop ${dragging ? "drag" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => input.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && input.current?.click()}
        aria-label="Upload media to Cloudinary — click or drop files"
      >
        <input
          ref={input}
          type="file"
          multiple
          accept="image/*,video/mp4,video/webm,video/quicktime"
          hidden
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <span
          className="ic"
          style={{
            width: 62,
            height: 62,
            borderRadius: 20,
            display: "grid",
            placeItems: "center",
            margin: "0 auto 18px",
            background: "rgba(139,92,246,.16)",
            color: "var(--violet-2)",
          }}
        >
          <Icon name="arrowDown" size={26} />
        </span>
        <h3 className="display" style={{ fontSize: 20 }}>
          Drop images or videos here
        </h3>
        <p style={{ color: "var(--ink-3)", marginTop: 8, fontSize: 14 }}>
          or <span style={{ color: "var(--lime)", fontWeight: 800 }}>browse files</span> — stored in your Cloudinary, delivered via CDN
        </p>
      </div>

      <div className="f-field" style={{ maxWidth: 340, marginTop: 22 }}>
        <label htmlFor="folder">Store under</label>
        <select id="folder" value={folder} onChange={(e) => setFolder(e.target.value)}>
          {FOLDERS.map((f) => (
            <option key={f.value || "root"} value={f.value}>
              orgix-media/{f.value ? `${f.value}/` : ""}
              {f.label !== "Other (root of orgix-media)" ? ` — ${f.label}` : ""}
            </option>
          ))}
        </select>
      </div>

      {items.length > 0 && (
        <ul className="up-list">
          {items.map((i, idx) => {
            const st = statusMeta[i.status];
            const preview =
              i.status === "done" && i.file.type.startsWith("image") ? (
                <img src={i.url} alt="" width={64} height={64} />
              ) : i.status === "done" ? (
                <span className="up-video">
                  <Icon name="play" size={22} />
                </span>
              ) : (
                <span className="up-video">
                  <Icon name={st.icon} size={20} />
                </span>
              );
            return (
              <li className="up-item" key={`${i.file.name}-${idx}`}>
                <span className="up-thumb">{preview}</span>
                <div className="up-meta">
                  <b>{i.file.name}</b>
                  <span className={`up-status ${st.cls}`}>
                    {st.label}
                    {i.status === "done" ? " · " + TYPE_LABEL[mediaTypeLbl(i.file)] : ""}
                    {i.error ? ` · ${i.error}` : ""}
                  </span>
                </div>
                {i.status === "done" && (
                  <button
                    className="btn btn--ghost btn--sm"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await copy(i.url);
                      const btn = e.currentTarget;
                      btn.textContent = "Copied ✓";
                      setTimeout(() => (btn.textContent = "Copy URL"), 1600);
                    }}
                  >
                    Copy URL
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function mediaTypeLbl(file) {
  const ext = (file?.name || "").split(".").pop().toLowerCase();
  if (["mp4", "webm", "mov", "m4v"].includes(ext)) return "video";
  return "image";
}
