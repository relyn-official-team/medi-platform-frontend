/* eslint-disable no-undef */
/* firebase-messaging-sw.js */

importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js");

/**
 * ⚠️ 주의
 * - 이 파일은 빌드 시 번들되지 않음
 * - process.env 사용 불가
 * - 값은 문자열로 직접 삽입
 */

firebase.initializeApp({
  apiKey: "AIzaSyD9ebhBYiFIbmeAzMDeRnkRmt4VS4lixX4",
  authDomain: "relyn-web-push.firebaseapp.com",
  projectId: "relyn-web-push",
  storageBucket: "relyn-web-push.firebasestorage.app",
  messagingSenderId: "132070712574",
  appId: "1:132070712574:web:7d6f259714805838cdf1af",
});

const messaging = firebase.messaging();

/**
 * 백그라운드 푸시 수신
 */
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw] Background message ", payload);

 const notificationTitle =
   payload.data?.title || "RELYN 알림";


  const notificationOptions = {
    body: payload.data?.body || "",
    icon: "/relyn_logo_push.jpg",
    badge: "/relyn_logo_push.jpg",
   data: {
     link: payload.data?.link,
   },
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

/**
 * 알림 클릭 처리
 */
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const link = event.notification?.data?.link;
  if (!link) return;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(link) && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(link);
        }
      })
  );
});
