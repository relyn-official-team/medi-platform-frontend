import ChatThreadItem from "./ChatThreadItem";
import { ChatThreadItem as Thread } from "@/types/chat";

interface Props {
  items: Thread[];
  onSelect: (reservationId: number) => void;
}

export default function ChatThreadList({ items, onSelect }: Props) {
  if (!items || items.length === 0) {
    return (
      <div className="p-6 text-sm text-gray-400">
        아직 채팅이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gray-50">
      {items.map((item) => (
        <ChatThreadItem
          key={`${item.reservationId}`}
          item={item}
          onClick={() => onSelect(item.reservationId)}
        />
      ))}
    </div>
  );
}
