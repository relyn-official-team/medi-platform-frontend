# 공개 페이지 발견 경로 보완 — 2026-09-24

## 변경 내용

- `/services`에 공개 서비스 안내를 추가했다. 기존 공개 페이지 16개(플랫폼 소개 5개 언어, 상담 5개, 글 6개)를 목적·언어별로 연결한다. 기존 사업 홈페이지에는 안내 링크만 추가하고 글 본문을 섞지 않는다.
- 홈페이지 하단에 언어별 링크를 항상 표시하고 모든 공개 페이지에서 서비스 안내로 돌아갈 수 있도록 연결했다.
- 상담 페이지에 다른 언어 상담·관련 가이드 링크, 일본어·번체 가이드에 해당 언어 상담 링크를 추가했다.
- 앞서 테스트 폴더에만 있던 첫 글 → 후기 글 연결도 포함했다.
- 사이트맵에 서비스 안내를 추가해 총 17개 대표 URL을 싣는다. 기존 글, 번역본, 상담 페이지의 대표 주소와 카드 → 본문 대표 주소는 유지한다.
- `/auth` 공통 레이아웃에 `noindex, nofollow`를 명시하고 공개 홈페이지의 대표 주소·언어 메타데이터 상속을 제거했다. `/auth`, `/admin`, `/dashboard`에 같은 HTTP 색인 제외 헤더를 추가했다.
- 병원, 에이전시, 관리자, 로그인 경로는 서비스 안내·사이트맵에 추가하지 않았다. 기존 robots.txt 차단, 루트 기본 noindex, 개인정보 페이지 제외, 인증 리디렉션은 유지한다.

## 로컬 이동 오류 수정

초기 버전은 서비스 안내와 안내 목록의 링크를 운영 도메인으로 고정해 두었다. 따라서 로컬에서 클릭하면 운영 사이트로 이동했고, 아직 배포하지 않은 `/services`에서 404가 표시됐다. `http://localhost:3000/services` 자체는 HTTP 200으로 열리는 것을 확인했다.

실제 화면에서 누르는 내부 링크는 `/services`, `/customerinquiry/ja` 같은 현재 사이트 기준 경로로 수정했다. 검색 메타데이터와 사이트맵은 기존 운영 대표 주소를 유지한다. 검증 스크립트도 링크의 실제 이동 주소를 검사하도록 보완했다. 운영 주소를 강제로 localhost로 바꾸어 검사하지 않는다.

로컬에서 `npm run start`로 테스트한다면 프런트엔드를 중지한 뒤 `npm run build`와 `npm run start`를 다시 실행해야 수정된 링크가 보인다. `npm run dev`는 소스 변경을 자동 반영한다.

## 검증

- Next.js 운영 빌드와 TypeScript 검사 통과.
- 운영 빌드 서버에서 공개 17개 URL의 HTTP 200, index/follow, 대표 주소, 초기 HTML 링크를 검사했다. 홈페이지에서 링크를 따라 17개 모두 도달한다.
- 로그인·가입·내 정보 및 병원·에이전시·관리자 대표 경로 6개의 색인 제외 헤더를 확인했다. 인증이 필요한 세 영역은 기존대로 로그인으로 이동한다.
- 생성된 비공개 HTML 30개 모두 noindex/nofollow이며 공개 대표 주소·언어 링크를 상속하지 않는 것을 확인했다.
- 카드 6개의 본문 대표 주소, 개인정보 noindex, robots.txt의 기존 4개 차단, 사이트맵의 공개 URL 제한을 확인했다.
- 새 파일과 수정한 가이드·상담 파일의 ESLint 검사 통과. HomePageClient.tsx에는 변경 전부터 있던 Window.gtag의 any 타입 경고가 오류로 남아 있다. 전체 프로젝트 lint 통과로 표시하지 않는다.
- 서비스 안내의 PC·모바일 화면을 확인했다.

검증 명령:

```sh
npm run build
npm run start -- -p 3187 -H 127.0.0.1
node scripts/check-public-indexing.cjs http://127.0.0.1:3187
```

## 배포 시 주의할 위치

프런트엔드와 백엔드는 **별도 Git 저장소**다. 백엔드 폴더에서 commit/push/pull하면 이 프런트엔드 변경이 배포되지 않는다.

Windows 명령 프롬프트에서, 다른 변경이 없는지 `git status` 확인 후:

```bat
cd /d Z:\Projects\medi-platform\frontend
git status --short
git add app/auth/layout.tsx app/services/page.tsx app/sitemap.ts app/customerinquiry/CustomerInquiryClient.tsx app/customerinquiry/b2b/B2BThailandLandingClient.tsx app/korean-skin-treatments/upsell-kr/page.tsx app/korean-skin-treatments/upsell-kr/cards/page.tsx app/korean-skin-treatments/upsell-tw/GuideChrome.tsx app/korean-skin-treatments/upsell-jp/GuideChrome.tsx app/korean-skin-treatments/review-guide-kr/GuideChrome.tsx app/korean-skin-treatments/review-guide-shared/GuideChrome.tsx components/pages/HomePageClient.tsx components/common/PublicResourceLinks.tsx components/common/PublicResourceLinks.module.css lib/public-navigation.ts next.config.ts scripts/check-public-indexing.cjs docs/indexing-discovery-2026-09-24.md
git commit -m "Improve public page discovery and preserve private page noindex"
git push origin main
```

EC2에서 아래 명령을 순서대로 실행한다. 앞 명령이 실패하면 다음 단계로 넘어가지 않는다. 백엔드 재빌드나 DB 변경은 필요 없다.

```sh
cd /home/ec2-user/apps/frontend
git pull --ff-only origin main
source ../backend/scripts/load-ssm-env.sh
npm run build
pm2 reload frontend --update-env
```

환경변수 값은 출력할 필요가 없다. `.env*`, `.data`, `.next`, `node_modules`는 파일 복사 대상이 아니다. 특히 운영 하트 집계를 저장하는 `.data`는 보존한다. 기존 PM2 프로세스의 이름 `frontend`를 사용하므로 번호 0/1에 의존하지 않는다.

## 운영 배포 후 확인

```sh
node scripts/check-public-indexing.cjs
```

이 명령은 Google 색인 여부가 아니라 운영 응답·발견 경로·비공개 제외가 배포됐는지 검사한다.

- `https://relynplatform.com/services`가 열리고 사이트맵의 URL이 17개인지 확인한다.
- Search Console에서 새 서비스 안내와 이전에 알려지지 않았던 상담 대표 URL을 검사한다. 실제 URL 테스트에서 가져오기·색인 허용을 확인한 후 필요한 최초 색인 요청을 한다.
- 이미 요청한 글에 같은 요청을 반복한다고 색인이 빨라지지는 않는다.

## 판단의 한계

이 변경은 확인된 내부 연결 부족을 보완한다. 이미 크롤링된 페이지가 Google 평가에서 미색인으로 남는 이유 전체를 해결했다고 확정할 수 없으며, 색인 완료·검색 노출·순위를 보장하지 않는다. 코드 반영, 운영 서버 배포, Google의 재수집·색인은 각각 별도 단계다.
