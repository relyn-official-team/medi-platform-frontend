interface Props {
  date: string;
}

export default function ChatDateDivider({ date }: Props) {
  return (
    <div className="flex justify-center py-2">
      <div className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
        {date}
      </div>
    </div>
  );
}
