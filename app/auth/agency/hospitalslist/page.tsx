 import { Suspense } from "react";
 import AgencyHospitalsClient from "./AgencyHospitalsClient";



export default function AgencyHospitalsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-gray-400">로딩중...</div>}>
      <AgencyHospitalsClient />
    </Suspense>
  );
}