interface Props {
  content: string;
}

export default function SystemMessageItem({ content }: Props) {
  return (
    <div className="flex justify-center py-2">
      <div className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
        {content}
      </div>
    </div>
  );
}
