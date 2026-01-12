"use client";

import SettlementRow from "./SettlementRow";
import { SettlementItem } from "../types";

interface Props {
  items: SettlementItem[];
  loading: boolean;
}

export default function SettlementTable({ items, loading }: Props) {
  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      <div className="px-4 py-3 border-b">
        <h2 className="text-sm font-semibold">내역</h2>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left font-medium px-4 py-3 w-[180px]">
                일시
              </th>
              <th className="text-left font-medium px-4 py-3">구분</th>
              <th className="text-right font-medium px-4 py-3 w-[160px]">
                금액
              </th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={3}>
                  로딩 중...
                </td>
              </tr>
            )}

            {!loading && items.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={3}>
                  해당 기간 내 내역이 없습니다.
                </td>
              </tr>
            )}

            {!loading &&
              items.map((it) => <SettlementRow key={it.id} item={it} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
