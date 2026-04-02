"use client";

import { useState, useEffect, useRef } from "react";
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
  category?: string | null;
  procedureName: string;
  originalPrice: number | null;
  discountPrice: number;
  commissionRate?: number | null;
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
     className="grid grid-cols-[28px_1.15fr_2.1fr_1.15fr_1.15fr_1fr_auto] items-center gap-2 p-2"
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [localItems, setLocalItems] = useState<PriceItem[]>([]);
const [editingId, setEditingId] = useState<number | null>(null);
 const [editingField, setEditingField] =
  useState<
    | "category"
    | "procedureName"
    | "originalPrice"
    | "discountPrice"
    | "commissionRate"
    | null
  >(null);
const [editValue, setEditValue] = useState<{
  category: string;
  procedureName: string;
  originalPrice: string;
  discountPrice: string;
  commissionRate: string;
} | null>(null);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [commissionRate, setCommissionRate] = useState("");

   const sensors = useSensors(
   useSensor(PointerSensor)
 );

 useEffect(() => {
   setLocalItems(items);
 }, [items]);
  const addItem = async () => {
    if (!name || !discountPrice) return;

    await api.post("/hospital/pricing", {
      category: category.trim() || null,
      procedureName: name.trim(),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      discountPrice: Number(discountPrice),
      commissionRate: commissionRate ? Number(commissionRate) : null,
    });

    setCategory("");
    setName("");
    setOriginalPrice("");
    setDiscountPrice("");
    setCommissionRate("");
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

  e.target.value = "";
  onChange();
};

const handleExcelDownload = () => {
    window.open("/api/hospital/pricing/excel", "_blank");
};

const getDiscountRate = (item: PriceItem) => {
  if (!item.originalPrice || item.originalPrice <= 0) return 0;
  return Math.round(
    ((item.originalPrice - item.discountPrice) / item.originalPrice) * 100
  );
};

const saveEdit = async (id: number) => {
  if (!editValue) return;

  const payload: Record<string, any> = {
    procedureName: editValue.procedureName.trim(),
    discountPrice: Number(editValue.discountPrice),
  };

  if (editValue.category !== "") {
    payload.category = editValue.category.trim();
  } else {
    payload.category = null;
  }

  payload.originalPrice =
    editValue.originalPrice !== "" ? Number(editValue.originalPrice) : null;

  payload.commissionRate =
    editValue.commissionRate !== "" ? Number(editValue.commissionRate) : null;
    
  await api.patch(`/hospital/pricing/${id}`, payload);

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

      <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
  <Input
    placeholder="카테고리"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  />
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
        <Input
          type="number"
          step="0.1"
          placeholder="수수료율 (%)"
          value={commissionRate}
          onChange={(e) => setCommissionRate(e.target.value)}
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

{/* 숨겨진 파일 input */}
<input
  ref={fileInputRef}
  type="file"
  accept=".xlsx,.xls"
  className="hidden"
  onChange={handleExcelUpload}
/>

<Button
  size="sm"
  variant="outline"
  type="button"
  onClick={() => fileInputRef.current?.click()}
>
  엑셀 업로드
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
<div
  className={`rounded-md px-2 py-2 shadow-sm text-xs whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer
    ${highlight ? "bg-pink-100 text-red-600" : "bg-gray-100 text-gray-800"}`}
  onClick={() => {
    setEditingId(it.id);
    setEditingField("category");
    setEditValue({
      category: it.category ?? "",
      procedureName: it.procedureName,
      originalPrice: String(it.originalPrice ?? ""),
      discountPrice: String(it.discountPrice),
      commissionRate: String(it.commissionRate ?? ""),
    });
  }}
>
  {editingId === it.id && editingField === "category" ? (
    <input
      className="w-full bg-transparent outline-none"
      value={editValue?.category ?? ""}
      onChange={(e) =>
        setEditValue((v) => v && { ...v, category: e.target.value })
      }
      onBlur={() => saveEdit(it.id)}
      autoFocus
    />
  ) : (
    it.category || "-"
  )}
</div>
      
{/* 시술명 */}
<div
  className={`rounded-md px-2 py-2 shadow-sm text-xs whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer
    ${highlight ? "bg-pink-100 text-red-600" : "bg-gray-100 text-gray-800"}`}
  onClick={() => {
    setEditingId(it.id);
    setEditingField("procedureName");
    setEditValue({
  category: it.category ?? "",
  procedureName: it.procedureName,
  originalPrice: String(it.originalPrice ?? ""),
  discountPrice: String(it.discountPrice),
  commissionRate: String(it.commissionRate ?? ""),
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
  className={`rounded-md px-2 py-2 shadow-sm text-xs text-right whitespace-nowrap cursor-pointer
    ${highlight ? "bg-pink-100 text-red-500 line-through" : "bg-gray-100 text-gray-400 line-through"}`}
   onClick={() => {
   setEditingId(it.id);
   setEditingField("originalPrice");
   setEditValue({
  category: it.category ?? "",
  procedureName: it.procedureName,
  originalPrice: String(it.originalPrice ?? ""),
  discountPrice: String(it.discountPrice),
  commissionRate: String(it.commissionRate ?? ""),
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
    it.originalPrice != null ? `${it.originalPrice.toLocaleString()}원` : "-"
  )}
</div>

{/* 할인가 */}
<div
  className={`rounded-md px-2 py-2 shadow-sm text-xs font-semibold text-right whitespace-nowrap cursor-pointer
    ${highlight ? "bg-pink-100 text-red-600" : "bg-gray-100 text-gray-900"}`}
   onClick={() => {
   setEditingId(it.id);
   setEditingField("discountPrice");
   setEditValue({
  category: it.category ?? "",
  procedureName: it.procedureName,
  originalPrice: String(it.originalPrice ?? ""),
  discountPrice: String(it.discountPrice),
  commissionRate: String(it.commissionRate ?? ""),
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
<div
  className={`rounded-md px-2 py-2 shadow-sm text-xs font-medium text-right whitespace-nowrap cursor-pointer
    ${highlight ? "bg-pink-100 text-red-600" : "bg-gray-100 text-gray-900"}`}
  onClick={() => {
    setEditingId(it.id);
    setEditingField("commissionRate");
    setEditValue({
      category: it.category ?? "",
      procedureName: it.procedureName,
      originalPrice: String(it.originalPrice ?? ""),
      discountPrice: String(it.discountPrice),
      commissionRate: String(it.commissionRate ?? ""),
    });
  }}
>
  {editingId === it.id && editingField === "commissionRate" ? (
    <input
      type="number"
      step="0.1"
      className="w-full bg-transparent outline-none text-right"
      value={editValue?.commissionRate ?? ""}
      onChange={(e) =>
        setEditValue((v) => v && { ...v, commissionRate: e.target.value })
      }
      onBlur={() => saveEdit(it.id)}
    />
  ) : (
    it.commissionRate != null ? `${it.commissionRate}%` : "-"
  )}
</div>

           <div className="text-right">
             <button
               type="button"
               className="bg-red-500 hover:bg-red-600 text-white text-[11px] px-3 py-2 rounded-md shadow-sm whitespace-nowrap"
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
