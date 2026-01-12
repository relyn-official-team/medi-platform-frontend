// frontend/components/chat/ChatInputBox.tsx
"use client";

import { useState } from "react";

interface Props {
  onSend: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInputBox({
  onSend,
  disabled = false,
  placeholder,
}: Props) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (disabled) return;
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="border-t p-3 flex gap-2">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()}
        disabled={disabled}
        className="flex-1 border rounded px-3 py-2 text-sm"
        placeholder={placeholder ?? "메시지를 입력하세요"}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className={`px-4 py-2 text-sm rounded ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        전송
      </button>
    </div>
  );
}
