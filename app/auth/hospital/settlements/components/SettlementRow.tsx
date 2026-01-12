"use client";

import { SettlementItem, SettlementType } from "../types";

const LABEL_MAP: Record<SettlementType, string> = {
  CHARGE_REQUEST: "충전 요청",
  CHARGE_COMPLETED: "충전 완료",
  CHARGE_REJECTED: "충전 거절",
  AGENCY_FEE: "에이전시 수수료 지급",
  PLATFORM_FEE: "플랫폼 수수료 지급",
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatYmdHm(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;

  const yyyy = d.getFullYear();
  const mm = pad2(d.getMonth() + 1);
  const dd = pad2(d.getDate());
  const hh = pad2(d.getHours());
  const mi = pad2(d.getMinutes());

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

function formatMoney(n: number) {
  const abs = Math.abs(n);
  const v = abs.toLocaleString("ko-KR");
  return `${n < 0 ? "-" : "+"}${v}원`;
}


export default function SettlementRow({ item }: { item: SettlementItem }) {
  const amountClass =
    item.amount > 0
      ? "text-blue-600"
      : item.amount < 0
      ? "text-red-600"
      : "text-gray-700";

  return (
    <tr className="border-t">
      <td className="px-4 py-3 text-gray-800 whitespace-nowrap">
        {formatYmdHm(item.createdAt)}
      </td>

      <td className="px-4 py-3 text-gray-800">
        <div className="font-medium">{LABEL_MAP[item.type] ?? item.type}</div>

        {item.type === "AGENCY_FEE" && (
          <div className="text-xs text-gray-500 mt-1 leading-5">
            {item.agencyName ? <span>{item.agencyName}</span> : null}
            {item.patientName ? (
              <span>
                {item.agencyName ? " / " : ""}
                {item.patientName}
                {item.patientNationality ? ` (${item.patientNationality})` : ""}
              </span>
            ) : null}
            {item.reservationDate || item.reservationTime ? (
              <span>
                {(item.agencyName || item.patientName) ? " / " : ""}
                {item.reservationDate ?? ""}
                {item.reservationTime ? ` ${item.reservationTime}` : ""}
              </span>
            ) : null}
          </div>
        )}
      </td>

      <td className={`px-4 py-3 text-right font-semibold ${amountClass}`}>
        {formatMoney(item.amount)}
      </td>

    </tr>
  );
}
