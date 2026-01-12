import { redirect } from "next/navigation";

export default function AdminReservationsPage() {
  redirect("/auth/admin/reservations/settlements");
}
