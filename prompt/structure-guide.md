# FSD + 라우트 중심 혼합 아키텍처 — 팀 가이드

> **용도:** 사람이 읽는 설계·온보딩 문서  
> **AI 리팩토링:** [structure-prompt.md](./structure-prompt.md) 를 사용

---

## 1. 왜 이 구조인가

팀원이 **1인당 3개 프로젝트**를 담당하면서, 프로젝트마다 폴더·네이밍·상태 위치가 달라 **코드 통일이 어려웠다.**  
이 가이드는 그 규칙을 **한 세트로 묶기 위한 팀 표준**이다.

핵심 선택:

- **순수 FSD 아님** → URL(라우트)을 1차 탐색 축으로 삼은 **Optional FSD**
- 슬라이스 이름을 외우기보다 **브라우저 주소만 알면 코드 위치를 추론**
- 복잡도에 따라 PageProvider 등 패턴을 **선택** (단, MUST 규칙은 고정)

| 레이어 | 구조 축 | 역할 |
|--------|---------|------|
| `app` | 라우트 | Next.js App Router, 서버 page, API Route |
| `views` | 라우트 | page ↔ Panel 중계 (얇은 adapter) |
| `widgets` | 라우트 | 클라이언트 조립, 섹션 UI, 페이지 전용 model |
| `features` | 유스케이스 | 재사용 기능 UI·로직 |
| `entities` | 도메인 | API, Query, 타입, 도메인 로직 |
| `shared` | 전역 | 공통 UI, 훅, 유틸, 스타일 |

---

## 2. 온보딩 치트시트

1. **화면 코드** — URL → `src/widgets/{경로}/`
2. **데이터/API** — 도메인 → `src/entities/{domain}/`
3. **재사용 기능** — 유스케이스 → `src/features/{capability}/`

예: `/admin/inquiries` → `widgets/admin/inquiries/` · 문의 데이터 → `entities/inquiry/`

---

## 3. 의존성(import) 방향

```
app → views → widgets → features → entities → shared
```

- 역방향 import 금지
- `shared`는 모든 레이어에서 사용 가능
- `views`는 `widgets` Panel만 import
- 도메인 데이터는 **entities**만 (`features`/`widgets`에 `{domain}.api.ts` 생성 금지)

---

## 4. 핵심 흐름

```
app (서버)
  → views (얇은 adapter)
    → widgets/Panel (클라이언트 조립 ± PageProvider)
      → widgets/ui (섹션)
        → features / entities
```

### 골든 패스 — admin 복합 페이지

```
src/app/(login)/admin/inquiries/page.tsx
src/views/admin/inquiries/AdminInquiriesView.tsx
src/widgets/admin/inquiries/Panel.tsx          ← AdminInquiriesPageProvider
src/widgets/admin/inquiries/model/             ← Context + 하위 훅
src/widgets/admin/inquiries/ui/InquiryTable.tsx
src/widgets/admin/inquiries/ui/InquiryDetailSidebar.tsx
```

### 골든 패스 — 단순 페이지 (Provider 생략)

```
src/app/(site)/consulting/page.tsx
src/views/consulting/ConsultingView.tsx
src/widgets/consulting/Panel.tsx
src/widgets/consulting/ui/ConsultingGuide.tsx
```

### 서버 데이터 전달 패턴

```
page (서버 fetch) → View(props) → Panel → ui
```

예: `news/[slug]`, `admin/inquiries/email-preview`

---

## 5. app

- `src/app/(site)/...` — 공개 사이트
- `src/app/(login)/...` — 로그인 이후(관리자)
- `src/app/api/...` — API Route (UI page 규칙과 별도)

### page.tsx (서버 컴포넌트)

**하는 일만:**

- `metadata`
- `cookies()` / `searchParams` (필요 시)
- `Main` 래핑
- `views/.../*View.tsx` 렌더

**하지 않는 것:** UI 직접 조립, widgets/ui·features 직접 import

```tsx
import { cookies } from "next/headers";
import { HomeView } from "@/views/home/HomeView";
import Main from "@/widgets/layout/Main";

export default async function HomePage() {
    const cookieStore = await cookies();
    void cookieStore; // 동적 렌더 / 향후 auth 대비 — 프로젝트 표준

    return (
        <Main id="home" className={{ inner: "", container: "min-h-[calc(100svh-10.8rem)]" }}>
            <HomeView />
        </Main>
    );
}
```

---

## 6. views

- `src/views/{라우트 세그먼트}/{RouteName}View.tsx`
- **Panel만 렌더** (기본)

### 유지 이유

- 서버 page ↔ 클라이언트 Panel 경계
- `searchParams` / 서버 fetch → props adapter
- 권한·실험군별 Panel 분기

### pass-through만인 View

6개월 이상 props·분기 없이 pass-through만이면 `page → Panel` 직결 **검토 가능** (팀 합의 후).  
통일 기간에는 **View 유지 MUST** (프롬프트와 동일).

---

## 7. widgets

### 라우트 미러링 (기본)

`views`와 동일한 URL 세그먼트: `widgets/home`, `widgets/admin/inquiries`

### 라우트 미러링 예외 (공통 슬라이스)

| 경로 | 역할 |
|------|------|
| `widgets/layout/` | Main, Header/Footer shell, SubPage 공통 컴포넌트 |
| `widgets/admin/shared/` | AdminLayout, admin 공통 store·UI |

### 폴더 구조

```
widgets/{route}/
  Panel.tsx
  index.ts                    ← export { default as XxxPanel } from "./Panel"
  ui/
    index.ts
  model/                      ← 상태 공유 페이지만
```

### Panel.tsx

**복합 페이지:**

```tsx
"use client";

import { AdminInquiriesPageProvider } from "@/widgets/admin/inquiries/model/AdminInquiriesContext";
import * as Layer from "@/widgets/admin/inquiries/ui";

export default function Panel() {
    return (
        <AdminInquiriesPageProvider>
            <Layer.InquiryManagement />
        </AdminInquiriesPageProvider>
    );
}
```

**단순 페이지:**

```tsx
"use client";

import * as Layer from "@/widgets/consulting/ui";

export default function Panel() {
    return <Layer.ConsultingGuide />;
}
```

### widgets/ui

- 섹션 단위, **목적형 PascalCase** (`HeroIntro`, `InquiryTable`)
- `Title`/`Status`/`Analysis` — 정말 최선일 때만
- 프레젠테이션 + entities query까지 OK
- **페이지 공유 상태 금지** → model + Provider

---

## 8. PageProvider / model

### 필요 조건

| 상황 | PageProvider |
|------|--------------|
| 2+ ui 섹션이 같은 상태·행동 공유 | **필수** |
| 필터/선택/페이징/사이드패널 등 | **필수** |
| 단일 섹션 정적 안내 | 생략 |

### 위치

1. **라우트 전용** → `widgets/{route}/model/` (기본)
2. **여러 라우트 재사용** → `features/{capability}/model/` (드묾)

### 네이밍

| 대상 | 규칙 |
|------|------|
| Context 파일 | `{RouteName}Context.tsx` 권장 |
| Provider | `{RouteName}PageProvider` |
| 소비 훅 | `use{RouteName}Provider` |
| 하위 훅 | 목적형 (`useInquirySelection`, `useNewsListPaging`) |

### 구현 패턴

```tsx
"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import useInquirySelection from "@/widgets/admin/inquiries/model/useInquirySelection";
import useInquiryFilter from "@/widgets/admin/inquiries/model/useInquiryFilter";

type AdminInquiriesContextValue =
    & ReturnType<typeof useInquirySelection>
    & ReturnType<typeof useInquiryFilter>;

const AdminInquiriesContext = createContext<AdminInquiriesContextValue | null>(null);

export const AdminInquiriesPageProvider = ({ children }: { children: ReactNode }) => {
    const selection = useInquirySelection();
    const filter = useInquiryFilter();

    return (
        <AdminInquiriesContext.Provider value={{ ...selection, ...filter }}>
            {children}
        </AdminInquiriesContext.Provider>
    );
};

export const useAdminInquiriesProvider = () => {
    const ctx = useContext(AdminInquiriesContext);
    if (!ctx) throw new Error("useAdminInquiriesProvider는 AdminInquiriesPageProvider 안에서만 사용");
    return ctx;
};
```

### 품질 가이드 (안티패턴)

- **God Context** — 하위 훅 5~6개+ 한 Provider에 몰기 → 도메인별 context 분리 검토
- **깊은 중첩 state** (`queue.confirm.main...`) → 얕고 평평한 반환 권장
- **ui 내부 useState**로 섹션 간 공유 → model로 이동

### admin/shared store

`widgets/admin/shared/model/useAdminSidePanelStore`처럼 **admin 전역 UI 상태**는 shared에 두고, **페이지 비즈니스 상태**만 route model에 둔다.

---

## 9. features

**capability명** (라우트명 아님):

| 슬라이스 | 예 |
|----------|-----|
| `features/auth` | AdminLoginForm, AdminAuthGuard |
| `features/manageNews` | NewsEditor |
| `features/manageGlobalModal` | GlobalModalEditor |
| `features/submitInquiry` | 문의 제출 폼 (여러 subpage에서 재사용) |

- 화면 조립 ❌ → widgets
- 라우트 전용 상태 ❌ → widgets/model
- domain api/query ❌ → entities

---

## 10. entities

```
entities/{domain}/
  api/{domain}.api.ts
  api/{domain}.query.ts
  model/{domain}.type.ts
  lib/          ← formFields, server helper 등
  constants/
```

참조: `entities/banner/`, `entities/inquiry/`

- 클라이언트: `shared/lib/api/client.ts`
- 서버: `shared/lib/api/server.ts`

---

## 11. shared · layout · providers

**shared:** 스타일, kit UI, hooks, utils, 전역 store

**widgets/layout/Main.tsx:** pathname 기반 페이지 래퍼

**app/layout.tsx** Provider 순서:

```
GlobalErrorBoundary → QueryProvider → AuthProvider
  → GlobalErrorListener → Header → Sidebar → PopupProvider
  → children → Footer → Progress → Toast
```

Provider 파일: `src/app/providers/`

---

## 12. 신규 페이지 체크리스트

- [ ] `app/.../page.tsx`
- [ ] `views/.../{Name}View.tsx`
- [ ] `widgets/.../Panel.tsx` + `index.ts`
- [ ] `widgets/.../ui/` + `ui/index.ts`
- [ ] (조건부) `widgets/.../model/` + PageProvider
- [ ] (조건부) `entities/{domain}/` 또는 기존 entity 사용
- [ ] (조건부) `features/{capability}/` 또는 기존 feature 사용

미완성: `page → view → Panel` + `ServicePlaceholder`

---

## 13. 금지 사항

- page에서 UI/widgets/ui/features 직접 렌더
- views에 로직 · entities/features import
- widgets/views/features에 domain api/query/type 중복
- ui 섹션에 페이지 공유 useState
- ui 파일명·훅 이름 기계적 템플릿 복붙

---

## 14. 알려진 예외 · 마이그레이션

| 항목 | 현재 | 목표 |
|------|------|------|
| `qna/[slug]` | page가 widgets/ui 직접 렌더 | page→view→widgets/qna/detail |
| admin 복합 페이지 | ui에 상태 흩어짐 | PageProvider + model |
| `InquiryRequestForm` | widgets/layout에 300줄+ | features/submitInquiry |

**권장 순서:** qna 정렬 → admin PageProvider → submitInquiry 통합 → entities/import 위반 수정

---

## 15. 트레이드오프

**장점**

- URL = 코드 위치 → 멀티 프로젝트 전환 속도
- entities → 데이터 경계
- PageProvider → 복잡 페이지 상태 일관성

**비용**

- app/views/widgets 3중 미러링 → URL 변경 시 3곳 동기화
- views pass-through → 파일 수 증가
- Optional → PR 리뷰·프롬프트로 MUST 항목 enforcement 필요

---

## 16. FSD + 라우트 혼합 요약

1. FSD의 shared · entities · features 개념 유지
2. pages/widgets를 **URL 세그먼트**로 재해석
3. views = Next.js App Router 전용 adapter
4. widgets = 라우트 조립 중심
5. features = capability명
6. PageProvider + widgets/model = 페이지 로컬 상태
7. import 방향만 FSD에서 차용, 폴더명은 라우트 우선
8. 1인 3프로젝트 → **"화면 어디?" = URL**
9. Optional = 단순 페이지는 Provider 생략
10. **통일 enforcement** = [structure-prompt.md](./structure-prompt.md) + 라우트별 준수 표
