"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
 import {
   DndContext,
   closestCenter,
   PointerSensor,
   useSensor,
   useSensors,
 } from "@dnd-kit/core";

 import {
   SortableContext,
   useSortable,
   verticalListSortingStrategy,
   arrayMove,
 } from "@dnd-kit/sortable";

 import { CSS } from "@dnd-kit/utilities";

interface PriceItem {
  id: number;
  procedureName: string;
  originalPrice: number;
  discountPrice: number;
}

 function SortableRow({
  item,
  children,
}: {
  item: PriceItem;
  children: React.ReactNode;
}) {
  const { attributes, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

 return (
   <div
     ref={setNodeRef}
     style={style}
     className="grid grid-cols-[32px_2fr_1fr_1fr_auto] items-center gap-2 p-2"
   >
     {children}
   </div>
 );
}

function DragHandle({ id }: { id: number }) {
  const { listeners, attributes } = useSortable({ id });

  return (
    <div
      {...listeners}
      {...attributes}
      className="cursor-grab text-gray-400 px-2 select-none"
      title="드래그하여 순서 변경"
    >
      ⋮⋮
    </div>
  );
}


export default function HospitalPricingSection({
  items,
  onChange,
}: {
  items: PriceItem[];
  onChange: () => void;
}) {
  const [localItems, setLocalItems] = useState<PriceItem[]>([]);
const [editingId, setEditingId] = useState<number | null>(null);
 const [editingField, setEditingField] =
   useState<"procedureName" | "originalPrice" | "discountPrice" | null>(null);
const [editValue, setEditValue] = useState<{
  procedureName: string;
  originalPrice: string;
  discountPrice: string;
} | null>(null);
  const [name, setName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

   const sensors = useSensors(
   useSensor(PointerSensor)
 );

 useEffect(() => {
   setLocalItems(items);
 }, [items]);
  const addItem = async () => {
    if (!name || !originalPrice || !discountPrice) return;

    await api.post("/hospital/pricing", {
      procedureName: name.trim(),
      originalPrice: Number(originalPrice),
      discountPrice: Number(discountPrice),
    });

    setName("");
    setOriginalPrice("");
    setDiscountPrice("");
    onChange();
  };

  const removeItem = async (id: number) => {
    await api.delete(`/hospital/pricing/${id}`);
   setLocalItems((prev) => prev.filter((i) => i.id !== id));
   onChange();
  };

  const saveOrder = async () => {
  await api.patch("/hospital/pricing/sort", {
    items: localItems.map((item, index) => ({
      id: item.id,
      sortOrder: index,
    })),
  });
  onChange(); // fetchProfile
};

const handleDeleteAll = async () => {
  if (!confirm("수가표를 모두 삭제하시겠습니까?")) return;

  await api.delete("/hospital/pricing");
  onChange();
};

const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  await api.post("/hospital/pricing/excel", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  onChange();
};

const handleExcelDownload = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

  // 인증 쿠키/헤더 유지된 상태로 파일 다운로드
  window.open(`${baseUrl}/hospital/pricing/excel`, "_blank");
};

const getDiscountRate = (item: PriceItem) => {
  if (!item.originalPrice || item.originalPrice <= 0) return 0;
  return Math.round(
    ((item.originalPrice - item.discountPrice) / item.originalPrice) * 100
  );
};

const saveEdit = async (id: number) => {
  if (!editValue) return;

  await api.patch(`/hospital/pricing/${id}`, {
    procedureName: editValue.procedureName,
    originalPrice: Number(editValue.originalPrice),
    discountPrice: Number(editValue.discountPrice),
  });

  setEditingId(null);
  setEditingField(null);
  setEditValue(null);
  onChange();
};

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-4">
      <h2 className="text-sm font-semibold text-gray-700">수가표</h2>

      <p className="text-xs text-orange-600 bg-orange-50 border border-orange-200 rounded-md p-2">
        실제 할인중 금액의 수가표로 명시해주셔야 환자유치에 용이합니다.<br></br>※ 수가표 수정은 PC에서 수정을 권장합니다.<br></br>※ 기존 수가표가 있는 상태에서 엑셀 업로드 시, 기존 수가표는 뒤로 밀리게 됩니다.<br></br>※ 업로드 양식은 엑셀 다운로드 하여 확인 바랍니다.
        <br></br><br></br>⚠️붉은색으로 표시되는 수가표는 할인율 50% 이상 적용된 수가표 입니다. 할인율 49%이하로 가격 수정 바랍니다.⚠️
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <Input
          placeholder="시술명"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="정가 (원)"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />
        <Input
          type="number"
          placeholder="할인가 (원)"
          value={discountPrice}
          onChange={(e) => setDiscountPrice(e.target.value)}
        />
        <Button type="button" onClick={addItem}>
          추가
        </Button>
      </div>
 <div className="flex items-center justify-between gap-2">
   <div className="flex gap-2">
     <Button
       size="sm"
       variant="destructive"
       type="button"
       onClick={handleDeleteAll}
     >
       전체 삭제
     </Button>

     <Button size="sm" variant="outline" type="button">
       엑셀 업로드
       <input
         type="file"
         accept=".xlsx,.xls"
         className="hidden"
         onChange={handleExcelUpload}
       />
     </Button>

     <Button
   size="sm"
   variant="outline"
   type="button"
   onClick={handleExcelDownload}
 >
   엑셀 다운로드
 </Button>
   </div>

   <Button size="sm" variant="outline" type="button" onClick={saveOrder}>
     순서 저장
   </Button>
 </div>


      {localItems.length > 0 && (
        
 <DndContext
   sensors={sensors}
   collisionDetection={closestCenter}
   onDragEnd={(event) => {
     const { active, over } = event;
     if (!over || active.id === over.id) return;

     setLocalItems((prev) => {
       const oldIndex = prev.findIndex((i) => i.id === active.id);
       const newIndex = prev.findIndex((i) => i.id === over.id);
       return arrayMove(prev, oldIndex, newIndex);
     });
   }}
 >
 <SortableContext
   items={localItems.map((i) => i.id)}
   strategy={verticalListSortingStrategy}
 >
   <div className="mt-2 max-h-[560px] overflow-y-auto space-y-1 pr-1">
 {localItems.map((it) => {
   const discountRate = getDiscountRate(it);
   const highlight = discountRate > 49;

   return (
     <SortableRow key={it.id} item={it}>
      <DragHandle id={it.id} />
      
{/* 시술명 */}
<div
  className={`rounded-md px-3 py-2 shadow-sm text-sm cursor-pointer
    ${highlight ? "bg-pink-100 text-red-600" : "bg-gray-100 text-gray-800"}`}
  onClick={() => {
    setEditingId(it.id);
    setEditingField("procedureName");
    setEditValue({
      procedureName: it.procedureName,
      originalPrice: String(it.originalPrice),
      discountPrice: String(it.discountPrice),
    });
  }}
>
  {editingId === it.id && editingField === "procedureName" ? (
    <input
      className="w-full bg-transparent outline-none"
      value={editValue?.procedureName ?? ""}
      onChange={(e) =>
        setEditValue((v) => v && { ...v, procedureName: e.target.value })
      }
      onBlur={() => saveEdit(it.id)}
      autoFocus
    />
  ) : (
    it.procedureName
  )}
</div>

{/* 정가 */}
<div
  className={`rounded-md px-3 py-2 shadow-sm text-sm text-right cursor-pointer
    ${highlight ? "bg-pink-100 text-red-500 line-through" : "bg-gray-100 text-gray-400 line-through"}`}
   onClick={() => {
   setEditingId(it.id);
   setEditingField("originalPrice");
   setEditValue({
     procedureName: it.procedureName,
     originalPrice: String(it.originalPrice),
     discountPrice: String(it.discountPrice),
   });
 }}
>
  {editingId === it.id && editingField === "originalPrice" ? (
    <input
      type="number"
      className="w-full bg-transparent outline-none text-right"
      value={editValue?.originalPrice ?? ""}
      onChange={(e) =>
        setEditValue((v) => v && { ...v, originalPrice: e.target.value })
      }
      onBlur={() => saveEdit(it.id)}
    />
  ) : (
    `${it.originalPrice.toLocaleString()}원`
  )}
</div>

{/* 할인가 */}
<div
  className={`rounded-md px-3 py-2 shadow-sm text-sm font-semibold text-right cursor-pointer
    ${highlight ? "bg-pink-100 text-red-600" : "bg-gray-100 text-gray-900"}`}
   onClick={() => {
   setEditingId(it.id);
   setEditingField("discountPrice");
   setEditValue({
     procedureName: it.procedureName,
     originalPrice: String(it.originalPrice),
     discountPrice: String(it.discountPrice),
   });
 }}
>
  {editingId === it.id && editingField === "discountPrice" ? (
    <input
      type="number"
      className="w-full bg-transparent outline-none text-right"
      value={editValue?.discountPrice ?? ""}
      onChange={(e) =>
        setEditValue((v) => v && { ...v, discountPrice: e.target.value })
      }
      onBlur={() => saveEdit(it.id)}
    />
  ) : (
    `${it.discountPrice.toLocaleString()}원`
  )}
</div>

           <div className="text-right">
             <button
               type="button"
               className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-2 rounded-md shadow-sm"
               onClick={() => removeItem(it.id)}
             >
               삭제
             </button>
           </div>
     </SortableRow>
   );
 })}
     </div>
   </SortableContext>
 </DndContext>

      )}
    </div>
  );
}
