"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";

type HospitalAccount = {
  id: string; // User.id
  email: string;
  createdAt: string;
  isActive: boolean;
  hospital: {
    name: string | null;
    address: string | null;
    hotlinePhone: string | null;
  } | null;
};

type AgencyAccount = {
  id: string; // User.id
  email: string;
  createdAt: string;
  isActive: boolean;
  agency: {
    name: string | null;
    phone: string | null;
    taxType: "GENERAL" | "WITHHOLDING_33";
    address: string | null;
    line: string | null;
    whatsapp: string | null;
    wechat: string | null;
  } | null;
};

function fmt(dt: string) {
  const d = new Date(dt);
  return isNaN(d.getTime()) ? dt : d.toLocaleString();
}

export default function AdminAccountsPage() {
  // lists
  const [hospitalItems, setHospitalItems] = useState<HospitalAccount[]>([]);
  const [agencyItems, setAgencyItems] = useState<AgencyAccount[]>([]);
  const [loadingHosp, setLoadingHosp] = useState(false);
  const [loadingAg, setLoadingAg] = useState(false);

  // search
  const [hospitalQ, setHospitalQ] = useState("");
  const [agencyQ, setAgencyQ] = useState("");
  const dHospitalQ = useDebounce(hospitalQ, 300);
  const dAgencyQ = useDebounce(agencyQ, 300);

  // create dialogs
  const [openHospCreate, setOpenHospCreate] = useState(false);

 // hospital name edit dialog
 const [openHospNameEdit, setOpenHospNameEdit] = useState(false);
 const [editingHospUserId, setEditingHospUserId] = useState<string | null>(null);
 const [editingHospName, setEditingHospName] = useState("");

  const [openAgCreate, setOpenAgCreate] = useState(false);

  // hospital create form
  const [hEmail, setHEmail] = useState("");
  const [hPassword, setHPassword] = useState("");
  const [hName, setHName] = useState("");
  const [hAddress, setHAddress] = useState("");
  const [hHotline, setHHotline] = useState("");
  const [hCountry, setHCountry] = useState("");

  // agency create form
  const [aEmail, setAEmail] = useState("");
  const [aPassword, setAPassword] = useState("");
  const [aName, setAName] = useState("");
  const [aPhone, setAPhone] = useState("");
  const [aAddress, setAAddress] = useState("");
  const [aTaxType, setATaxType] = useState<"GENERAL" | "WITHHOLDING_33">("GENERAL");
  const [aCountry, setACountry] = useState("");
  const [aLine, setALine] = useState("");
  const [aWhatsapp, setAWhatsapp] = useState("");
  const [aWechat, setAWechat] = useState("");

  const fetchHospitals = async () => {
    try {
      setLoadingHosp(true);
      const res = await api.get<HospitalAccount[]>("/admin/accounts/hospitals", {
        params: { q: dHospitalQ || undefined },
      });
      setHospitalItems(res.data);
    } finally {
      setLoadingHosp(false);
    }
  };

  const fetchAgencies = async () => {
    try {
      setLoadingAg(true);
      const res = await api.get<AgencyAccount[]>("/admin/accounts/agencies", {
        params: { q: dAgencyQ || undefined },
      });
      setAgencyItems(res.data);
    } finally {
      setLoadingAg(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dHospitalQ]);

  useEffect(() => {
    fetchAgencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dAgencyQ]);

  const resetPassword = async (userId: string) => {
    if (!confirm("비밀번호를 123!@# 으로 초기화할까요?")) return;
    await api.patch(`/admin/accounts/${userId}/reset-password`);
    alert("비밀번호가 123!@# 으로 초기화되었습니다.");
  };

  const toggleActive = async (userId: string, kind: "hospital" | "agency") => {
    const res = await api.patch<{ id: string; isActive: boolean }>(
      `/admin/accounts/${userId}/toggle-active`
    );

    if (kind === "hospital") {
      setHospitalItems((prev) =>
        prev.map((x) => (x.id === userId ? { ...x, isActive: res.data.isActive } : x))
      );
    } else {
      setAgencyItems((prev) =>
        prev.map((x) => (x.id === userId ? { ...x, isActive: res.data.isActive } : x))
      );
    }
  };

  const createHospital = async () => {
    if (!hEmail.trim() || !hPassword.trim() || !hName.trim()) {
      alert("email / password / 병원명은 필수입니다.");
      return;
    }

    await api.post("/admin/accounts/hospitals", {
      email: hEmail.trim(),
      password: hPassword.trim(),
      name: hName.trim(),
      address: hAddress.trim() || undefined,
      hotlinePhone: hHotline.trim() || undefined,
      country: hCountry.trim() || undefined,
    });

    setOpenHospCreate(false);
    setHEmail("");
    setHPassword("");
    setHName("");
    setHAddress("");
    setHHotline("");
    setHCountry("");

    await fetchHospitals();
  };

  const createAgency = async () => {
    if (!aEmail.trim() || !aPassword.trim() || !aName.trim()) {
      alert("email / password / 사업자명은 필수입니다.");
      return;
    }

    await api.post("/admin/accounts/agencies", {
      email: aEmail.trim(),
      password: aPassword.trim(),
      name: aName.trim(),
      phone: aPhone.trim() || undefined,
      address: aAddress.trim() || undefined,
      taxType: aTaxType,
      country: aCountry.trim() || undefined,
      line: aLine.trim() || undefined,
      whatsapp: aWhatsapp.trim() || undefined,
      wechat: aWechat.trim() || undefined,
    });

    setOpenAgCreate(false);
    setAEmail("");
    setAPassword("");
    setAName("");
    setAPhone("");
    setAAddress("");
    setATaxType("GENERAL");
    setACountry("");
    setALine("");
    setAWhatsapp("");
    setAWechat("");

    await fetchAgencies();
  };

  const hospCount = useMemo(() => hospitalItems.length, [hospitalItems]);
  const agCount = useMemo(() => agencyItems.length, [agencyItems]);

 const updateHospitalName = async () => {
   if (!editingHospUserId || !editingHospName.trim()) {
     alert("병원명을 입력해주세요.");
     return;
   }

   const res = await api.patch<{ name: string }>(
     `/admin/accounts/hospitals/${editingHospUserId}/name`,
     { name: editingHospName.trim() }
   );

setHospitalItems((prev) =>
  prev.map((x) => {
    if (x.id !== editingHospUserId) return x;
   if (!x.hospital) return x;

    return {
      ...x,
      hospital: {
        ...x.hospital, // 🔴 기존 address / hotlinePhone 유지
        name: res.data.name,
      },
    };
  })
);


   setOpenHospNameEdit(false);
   setEditingHospUserId(null);
   setEditingHospName("");
 };


  return (
    <div className="space-y-6">
      {/* 상단 액션 */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">계정관리</h1>

        <div className="flex gap-2">
          <Button onClick={() => setOpenHospCreate(true)}>병원 회원가입</Button>
          <Button variant="outline" onClick={() => setOpenAgCreate(true)}>
            에이전시 회원가입
          </Button>
        </div>
      </div>

      {/* 병원 블럭 */}
      <section className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="font-semibold text-gray-900">
            병원 계정 리스트 <span className="text-gray-500 text-sm">({hospCount})</span>
          </div>
          <div className="w-80">
            <Input
              value={hospitalQ}
              onChange={(e) => setHospitalQ(e.target.value)}
              placeholder="검색: email / 병원명 / 주소 / 핫라인"
            />
          </div>
        </div>

        <div className="max-h-[420px] overflow-auto">
          <table className="min-w-[1200px] w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
              <tr className="text-left">
                <th className="p-3 w-[200px]">액션</th>
                <th className="p-3 w-[180px]">생성일시</th>
                <th className="p-3 w-[260px]">계정명(email)</th>
                <th className="p-3 w-[220px]">id(User.id)</th>
                <th className="p-3 w-[180px]">핫라인 번호</th>
                <th className="p-3 w-[220px]">병원명</th>
                <th className="p-3">주소</th>
              </tr>
            </thead>
            <tbody>
              {hospitalItems.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => resetPassword(row.id)}
                      >
                        비밀번호 초기화
                      </Button>

                      {row.isActive ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => toggleActive(row.id, "hospital")}
                        >
                          사용중지
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => toggleActive(row.id, "hospital")}
                        >
                          사용
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="p-3">{fmt(row.createdAt)}</td>
                  <td className="p-3">{row.email}</td>
                  <td className="p-3 font-mono text-xs">{row.id}</td>
                  <td className="p-3">{row.hospital?.hotlinePhone ?? "-"}</td>
                  <td className="p-3">
                  <div className="flex items-center gap-2">
    <span>{row.hospital?.name ?? "-"}</span>
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        setEditingHospUserId(row.id);
        setEditingHospName(row.hospital?.name ?? "");
        setOpenHospNameEdit(true);
      }}
    >
      병원명 수정
    </Button>
  </div>
                  </td>
                  <td className="p-3">{row.hospital?.address ?? "-"}</td>
                </tr>
              ))}
              {hospitalItems.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-gray-500" colSpan={7}>
                    {loadingHosp ? "불러오는 중..." : "데이터 없음"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 에이전시 블럭 */}
      <section className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="font-semibold text-gray-900">
            에이전시 계정 리스트 <span className="text-gray-500 text-sm">({agCount})</span>
          </div>
          <div className="w-80">
            <Input
              value={agencyQ}
              onChange={(e) => setAgencyQ(e.target.value)}
              placeholder="검색: email / 사업자명 / 주소 / 번호 / 메신저"
            />
          </div>
        </div>

        <div className="max-h-[420px] overflow-auto">
          <table className="min-w-[1700px] w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
              <tr className="text-left">
                <th className="p-3 w-[200px]">액션</th>
                <th className="p-3 w-[180px]">생성일시</th>
                <th className="p-3 w-[260px]">계정명(email)</th>
                <th className="p-3 w-[220px]">id(User.id)</th>
                <th className="p-3 w-[140px]">번호</th>
                <th className="p-3 w-[220px]">사업자명</th>
                <th className="p-3 w-[160px]">계약형태(taxType)</th>
                <th className="p-3 w-[320px]">주소</th>
                <th className="p-3 w-[180px]">라인</th>
                <th className="p-3 w-[180px]">왓츠앱</th>
                <th className="p-3 w-[180px]">위챗</th>
              </tr>
            </thead>
            <tbody>
              {agencyItems.map((row) => (
                <tr key={row.id} className="border-b border-gray-100">
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => resetPassword(row.id)}
                      >
                        비밀번호 초기화
                      </Button>

                      {row.isActive ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => toggleActive(row.id, "agency")}
                        >
                          사용중지
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => toggleActive(row.id, "agency")}
                        >
                          사용
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="p-3">{fmt(row.createdAt)}</td>
                  <td className="p-3">{row.email}</td>
                  <td className="p-3 font-mono text-xs">{row.id}</td>
                  <td className="p-3">{row.agency?.phone ?? "-"}</td>
                  <td className="p-3">{row.agency?.name ?? "-"}</td>
                  <td className="p-3">{row.agency?.taxType ?? "-"}</td>
                  <td className="p-3">{row.agency?.address ?? "-"}</td>
                  <td className="p-3">{row.agency?.line ?? "-"}</td>
                  <td className="p-3">{row.agency?.whatsapp ?? "-"}</td>
                  <td className="p-3">{row.agency?.wechat ?? "-"}</td>
                </tr>
              ))}
              {agencyItems.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-gray-500" colSpan={11}>
                    {loadingAg ? "불러오는 중..." : "데이터 없음"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 병원 생성 Dialog */}
      <Dialog open={openHospCreate} onOpenChange={setOpenHospCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>병원 회원가입(관리자)</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input value={hEmail} onChange={(e) => setHEmail(e.target.value)} placeholder="email *" />
            <Input
              value={hPassword}
              onChange={(e) => setHPassword(e.target.value)}
              placeholder="password *"
              type="password"
            />
            <Input value={hName} onChange={(e) => setHName(e.target.value)} placeholder="병원명 *" />
            <Input value={hHotline} onChange={(e) => setHHotline(e.target.value)} placeholder="핫라인 번호" />
            <Input value={hAddress} onChange={(e) => setHAddress(e.target.value)} placeholder="주소" />
            <Input value={hCountry} onChange={(e) => setHCountry(e.target.value)} placeholder="국가(옵션)" />
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenHospCreate(false)}>닫기</Button>
            <Button onClick={createHospital}>생성</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

 {/* 병원명 수정 Dialog */}
 <Dialog open={openHospNameEdit} onOpenChange={setOpenHospNameEdit}>
   <DialogContent className="max-w-md">
     <DialogHeader>
       <DialogTitle>병원명 수정</DialogTitle>
     </DialogHeader>

     <div className="space-y-3">
       <Input
         value={editingHospName}
         onChange={(e) => setEditingHospName(e.target.value)}
         placeholder="병원명"
       />
     </div>

     <DialogFooter className="mt-4">
       <Button
         variant="outline"
         onClick={() => setOpenHospNameEdit(false)}
       >
         취소
       </Button>
       <Button onClick={updateHospitalName}>
         저장
       </Button>
     </DialogFooter>
   </DialogContent>
 </Dialog>


      {/* 에이전시 생성 Dialog */}
      <Dialog open={openAgCreate} onOpenChange={setOpenAgCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>에이전시 회원가입(관리자)</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input value={aEmail} onChange={(e) => setAEmail(e.target.value)} placeholder="email *" />
            <Input
              value={aPassword}
              onChange={(e) => setAPassword(e.target.value)}
              placeholder="password *"
              type="password"
            />
            <Input value={aName} onChange={(e) => setAName(e.target.value)} placeholder="사업자명 *" />
            <Input value={aPhone} onChange={(e) => setAPhone(e.target.value)} placeholder="번호" />

<Select
  value={aTaxType}
  onChange={(e) =>
    setATaxType(e.target.value as "GENERAL" | "WITHHOLDING_33")
  }
>
  <option value="GENERAL">GENERAL (일반과세)</option>
  <option value="WITHHOLDING_33">WITHHOLDING_33 (원천징수 3.3%)</option>
</Select>

            <Input value={aAddress} onChange={(e) => setAAddress(e.target.value)} placeholder="주소" />
            <Input value={aLine} onChange={(e) => setALine(e.target.value)} placeholder="라인 계정" />
            <Input value={aWhatsapp} onChange={(e) => setAWhatsapp(e.target.value)} placeholder="왓츠앱 계정" />
            <Input value={aWechat} onChange={(e) => setAWechat(e.target.value)} placeholder="위챗 계정" />
            <Input value={aCountry} onChange={(e) => setACountry(e.target.value)} placeholder="국가(옵션)" />
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenAgCreate(false)}>닫기</Button>
            <Button onClick={createAgency}>생성</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
