"use client";

import { useRef, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";

interface InteriorImage {
  id: string;
  url: string;
  isCover?: boolean;
}

export default function HospitalInteriorImagesSection({
  items,
  onChange,
}: {
  items: InteriorImage[];
  onChange: () => void;
}) {
  

  const uploadImage = async (file: File) => {
    if (file.size > 3 * 1024 * 1024) {
   alert("이미지는 3MB 이하만 업로드 가능합니다.");
   return;
 }
 
    const formData = new FormData();
    formData.append("image", file);

    await api.post("/hospital/images", formData,);

    onChange(); // fetchProfile
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const deleteImage = async (id: string) => {
    await api.delete(`/hospital/images/${id}`);
    onChange();
  };

    const setCover = async (id: string) => {
    await api.patch(`/hospital/images/${id}/cover`);
    onChange();
  };

  return (
    <section className="rounded-xl border bg-white p-4 space-y-4">
      <h2 className="text-sm font-semibold text-gray-700">
        병원 인테리어 이미지
      </h2>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
             if (f) {
     const preview = URL.createObjectURL(f);
     setPreviewUrls((prev: string[]) => [preview, ...prev]);
     uploadImage(f);
   }
        }}
      />

      <Button
        type="button"
        variant="outline"
        onClick={() => fileRef.current?.click()}
      >
        이미지 업로드
      </Button>

      {items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map((img) => (
            <div key={img.id} className="relative group">
              <img
                src={img.url}
                alt="hospital-interior"
                className="rounded-md border object-cover h-32 w-full"
              />

              {img.isCover && (
                <div className="absolute top-1 left-1 text-xs bg-black/60 text-white rounded px-2 py-1">
                  대표
                </div>
              )}

              <button
                className="absolute bottom-1 left-1 hidden group-hover:block
                           text-xs bg-black/60 text-white rounded px-2 py-1"
                disabled={!!img.isCover}
                onClick={() => setCover(img.id)}
              >
                대표 설정
              </button>


              <button
                className="absolute top-1 right-1 hidden group-hover:block
                           text-xs bg-black/60 text-white rounded px-2 py-1"
                onClick={() => deleteImage(img.id)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">
        ※ 실제 병원 내부 사진만 업로드해주세요.
      </p>
    </section>
  );
}
