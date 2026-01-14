import NotificationSettings from "@/components/notifications/NotificationSettings";

export default function HospitalNotificationPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-6">
      <h1 className="text-lg font-semibold mb-4">알림 설정</h1>
      <NotificationSettings />
    </div>
  );
}
