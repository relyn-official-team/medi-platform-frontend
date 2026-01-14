import MobileHeader from "@/components/agency/MobileHeader";
import NotificationSettings from "@/components/notifications/NotificationSettings";

export default function AgencyNotificationPage() {
  return (
    <>
      <MobileHeader title="알림 설정" showBack />
      <div className="h-12 md:hidden" />
      <div className="max-w-md mx-auto px-6 py-6">
        <NotificationSettings />
      </div>
    </>
  );
}
