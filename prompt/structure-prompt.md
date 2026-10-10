# 구조 통일 리팩토링 프롬프트

> **용도:** 1인 3프로젝트 환경에서 코드 규칙을 한 번에 맞출 때, AI/개발자에게 그대로 붙여넣는 프롬프트  
> **상세 설명:** [structure-guide.md](./structure-guide.md)

---

## 프롬프트 (아래부터 복사)

````
현재 프로젝트를 분석한 뒤, 아래 규칙에 맞지 않는 기존 파일을 리팩토링해라.
목표: FSD + 라우트 중심 혼합 구조(Optional FSD)를 모든 페이지에 통일한다.
팀 맥락: 1인당 3개 프로젝트 — URL만 알면 코드 위치를 추론할 수 있게 한다.

## MUST (반드시)

### 레이어 흐름
모든 페이지는 아래 흐름을 따른다.
app/page.tsx (서버) → views/*View.tsx → widgets/Panel.tsx → widgets/ui/*

import 방향:
app → views → widgets → features → entities → shared
(역방향 금지, shared는 어디서든 OK)

### app
- 라우팅: src/app
- 공개: src/app/(site)/...
- 로그인 이후: src/app/(login)/...
- page.tsx: 서버 컴포넌트, 파일명 page.tsx 고정
- page.tsx 역할: metadata, cookies()/searchParams(필요 시), Main 래핑, View 렌더만
- API Route: src/app/api/... (page UI 규칙과 분리)

### views
- 경로: src/views/{라우트 세그먼트}/
- 파일명: {RouteName}View.tsx
- Panel만 렌더 (얇은 adapter)
- 서버 fetch 결과·searchParams를 client에 넘길 때만 props adapter 허용

### widgets (라우트 미러링)
- 경로: src/widgets/{라우트 세그먼트}/ (views와 동일)
- 필수 파일: Panel.tsx ("use client"), index.ts (export { default as XxxPanel } from "./Panel")
- ui/: 섹션 컴포넌트 + ui/index.ts (named export)
- Panel: import * as Layer from "@/widgets/.../ui" 로 **섹션을 직접** 조립한다 (`Layer.SectionA`, `Layer.SectionB`, `Layer.Modal` 형태)
- Panel은 `Layer.*Page`, `Layer.*Sections`처럼 **조립 역할을 대신하는 ui 컴포넌트 1개만** 렌더하지 않는다
- 기본 골격은 `src/widgets/members/details` 구조를 우선 참조한다
- 별도 공통 래퍼 컴포넌트(`PageFrame`, `PageSection`, `RouteScaffold` 등)를 새로 만들지 말고, Panel 안에서 바로 ui 섹션을 조립한다
- 라우트 전용 상태가 없더라도 기본적으로 `ui/Modal.tsx`, `modal/`, `model/useConfirmModalStore.ts`를 만들고 `Layer.Modal`을 Panel에 포함한다
- 기본 모달은 테스트용 `"test"` 타겟 1개가 바로 열고 닫히는 형태로 세팅한다
- 라우트 전용 상태가 비어 있더라도 테스트용 `useSearch` 같은 기본 훅 1개는 먼저 만든다

### PageProvider (조건부 MUST)
IF 2개 이상 ui 섹션이 같은 페이지 상태·행동(선택/필터/페이징/사이드패널 등)을 공유 THEN:
- widgets/{route}/model/ 생성
- {RouteName}PageProvider + use{RouteName}Provider + 목적형 하위 훅
- Panel.tsx가 PageProvider로 ui 섹션 전체를 감쌈
- ui 섹션은 use{RouteName}Provider()로 상태 소비 (페이지 공유 useState 금지)
- 기본 scaffold 단계에서는 `members/details`처럼 Provider + 테스트용 search hook + Modal 섹션이 먼저 동작하도록 만든 뒤, 실제 요구사항에 맞춰 확장한다

### entities
- 도메인 데이터: src/entities/{domain}/
- API가 있는 도메인은 api/{domain}.api.ts, api/{domain}.query.ts, model/{domain}.type.ts를 둔다. 정적 데이터만 있는 도메인은 constants/ + model/로 구성하고 API/query 파일을 억지로 만들지 않는다.
- lib/, constants/ 필요 시 허용
- features/widgets/views에 {domain}.api.ts / .query.ts 새로 만들지 마라

### shared API / fetch
- 공통 fetch 레이어: src/shared/lib/api/
- 필수 파일: server.ts, client.ts
- 파일이 없으면 `src/shared/lib/api/server.ts`, `src/shared/lib/api/client.ts`를 생성한다
- 서버 컴포넌트 / server action / route handler에서 API 호출 시 `server.ts` 사용
- client component / browser event handler에서 API 호출 시 `client.ts` 사용
- entities/{domain}/api/*.api.ts 는 fetch를 직접 구현하지 말고 `serverFetch` 또는 `clientFetch`만 조합해서 사용
- entities/{domain}/api/*.api.ts 는 endpoint, method, payload 조립만 담당하고 인증·에러 처리·응답 파싱은 shared fetch wrapper에 위임한다
- entities/{domain}/api/*.query.ts 는 `*.api.ts`를 감싸는 query option / hook만 담당하고 fetch, 인증, 공통 에러 처리를 넣지 않는다
- 인증, 공통 headers, 공통 에러 처리, 재시도, refresh 같은 횡단 관심사는 shared/lib/api에 모은다
- 인증이 있는 프로젝트에서 accessToken / refreshToken / cookies / auth header / hmac header 처리는 `server.ts`에 우선 모은다
- `server.ts`는 공통 headers, 응답 파싱, 공통 에러 추적을 담당한다. 인증 API가 존재하는 프로젝트에서는 쿠키 기반 인증과 refresh 재시도를 추가한다. 인증 API가 없는 정적 사이트에 임의의 인증 endpoint를 만들지 않는다.
- `client.ts`는 브라우저 요청용 wrapper로 두고 `401`, `419` 같은 인증 만료 응답의 공통 후처리를 담당한다
- `client.ts`는 POST / PUT / PATCH / DELETE 요청에 대한 공통 loading UX와 에러 후처리를 담당한다
- Slack tracking(연동이 있을 때), 공통 에러 로깅, 응답 메시지 정규화는 domain api가 아니라 shared/lib/api에서 처리한다
- `response.ok` 검사, `response.json()` 파싱, 실패 시 throw는 shared fetch wrapper가 공통 처리한다
- features/widgets/views에는 fetch wrapper를 새로 만들지 마라

### features
- 유스케이스(capability)명: features/auth, features/manageNews, features/submitInquiry
- 여러 라우트에서 재사용되는 UI·로직만
- 화면 조립은 widgets, 라우트 전용 상태는 widgets/model

### 공통 슬라이스 (라우트 미러링 예외)
- widgets/layout/ — Main, 사이트 공통 shell, subpage 컴포넌트
- widgets/admin/shared/ — admin 공통 레이아웃·store
- widgets/{route}/model/ — 해당 라우트 전용 PageProvider·훅

### 기본 scaffold MUST
- 새 라우트 구조를 만들 때는 아래 골격을 기본값으로 생성한다

```text
src/widgets/{route}/
  Panel.tsx
  index.ts
  modal/
    TestModal.tsx 또는 {RouteName}Modal.tsx
  model/
    useConfirmModalStore.ts
  ui/
    Title.tsx
    Action.tsx
    Analysis.tsx
    Modal.tsx
    index.ts
````

- 위 이름은 기본 scaffold 기준이다
- 실제 목적이 명확해지면 `Title/Action/Analysis`는 목적형 이름으로 바꿔도 되지만, 최소한 `Modal.tsx`는 기본 포함한다
- `ui/Modal.tsx`는 `modal/` 아래 테스트용 모달 export를 감싸는 얇은 연결 파일로 만든다
- `Panel.tsx`는 기본적으로 `<Layer.Modal />`을 포함해야 한다
- 테스트만 가능한 초기 상태라도 바로 렌더 가능한 더미 섹션을 만들어 구조를 비워두지 않는다

### 스타일 / 디자인
- Tailwind CSS를 100% 활용한다. 컴포넌트·섹션 UI 스타일은 Tailwind 유틸리티 클래스로 작성한다
- 기존에 CSS/SCSS로 작성된 스타일은 Tailwind CSS로 전환한다 (공통 base/abstracts 초기 세팅 제외)
- 프로젝트 루트 `.prettierrc`를 반드시 준수한다 (semi, trailingComma, printWidth, tabWidth, bracketSpacing, arrowParens, singleAttributePerLine, bracketSameLine 등)
- 정적으로 지정하는 px/rem 간격·크기·타이포 수치에 **4배수 디자인**을 100% 준수한다 (예: 4, 8, 12, 16… / root 10px에서 0.4rem, 0.8rem, 1.2rem, 1.6rem…). 0, 비율(fr/%/vw/vh/em), unitless 값, 런타임 측정·애니메이션 중간값은 이 규칙의 대상이 아니다.
- 미디어쿼리의 rem은 기본 글자 크기 기준이므로 root의 62.5%와 구분한다. JS 반응형 감지도 `shared/styles/global.css`의 토큰을 읽고, 별도 px 경계값을 만들지 않는다.
- 브레이크포인트는 `src/shared/styles/global.css`의 `@theme`에 정의하고, 이 값만 사용한다:

```css
@theme {
    --breakpoint-*: initial; /* Tailwind 기본 브레이크포인트 제거 */
    --breakpoint-mobile: 21.5rem; /* 344px 이상 */
    --breakpoint-tablet: 48rem; /* 768px 이상 */
    --breakpoint-pc: 90rem; /* 1440px 이상 */
}
```

- 반응형 유틸리티 프리픽스는 **`mobile:` / `tablet:` / `pc:`만 100% 사용**한다. 예: `mobile:flex`, `tablet:block`, `pc:grid`
- 반응형은 **mobile-first (min-width)** 로 작성한다. 기본 클래스 = 가장 좁은 화면, `tablet:` / `pc:`로 커질수록 덮어쓴다
- `@theme`의 브레이크포인트는 `--breakpoint-*: initial`로 기본값을 제거한 뒤 `--breakpoint-mobile` / `--breakpoint-tablet` / `--breakpoint-pc`만 둔다. 그 외 브레이크포인트 변수·커스텀 variant를 추가하거나 남겨두지 않는다
- `src/app/globals.css` 등에 남아 있는 구 브레이크포인트 정의(`--breakpoint-sm`~`2xl`, `--breakpoint-compact`/`site`/`wide` 등)는 제거하고, 반응형 정의는 `src/shared/styles/global.css` `@theme`로 단일화한다

#### 반응형 — 금지 프리픽스 (현재 프로젝트에서 발견·전환 필수)
아래 프리픽스는 **전부 제거**하고 `mobile:` / `tablet:` / `pc:`로 재작성한다. 이름만 바꾸는 1:1 치환 금지.

| 금지 (구) | 비고 |
| --------- | ---- |
| `sm:` `md:` `lg:` `xl:` `2xl:` | Tailwind 기본 |
| `compact:` `site:` `wide:` `phablet:` | 프로젝트 구 커스텀 (min-width) |
| `max-compact:` `max-site:` `max-wide:` | 프로젝트 구 커스텀 (max-width) |
| 기타 `max-*:` 반응형 프리픽스 | max-width variant 일체 |

#### 반응형 — 전환 매핑 (참고)
정확한 px가 달라도 **의도(좁음/중간/넓음)** 를 아래 3단으로 합친다.

| 구 프리픽스 의도 | 새 프리픽스 |
| ---------------- | ----------- |
| `compact:` / `max-compact:` / `sm:` / `phablet:` 근처 | `mobile:` (또는 기본 클래스) |
| `site:` / `max-site:` / `md:` / `lg:` 근처 | `tablet:` |
| `wide:` / `max-wide:` / `xl:` / `2xl:` / PC 레이아웃 | `pc:` |

#### 반응형 — 재작성 예시 (MUST)
`max-*`는 “이하에서 적용”이므로, mobile-first로 **기본값 ↔ 큰 화면** 순서를 뒤집어 다시 쓴다.

```tsx
// ❌ 구 (max-width 스택)
className="grid grid-cols-3 max-site:grid-cols-2 max-compact:grid-cols-1"

// ✅ 신 (mobile-first, 허용 프리픽스만)
className="grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-3"
```

```tsx
// ❌ 구
className="py-30 max-site:py-18 flex max-site:flex-col site:text-5xl xl:text-[8rem]"

// ✅ 신
className="py-18 tablet:py-30 flex flex-col tablet:flex-row text-[4rem] tablet:text-5xl pc:text-[8rem]"
```

#### 자식 선택자 arbitrary variant — 사용 금지 (MUST)
프로젝트 정리 시 부모 `className`에서 자식을 겨냥하는 arbitrary variant를 **쓰지 않는다**. 스타일은 **해당 요소에 직접** `className`으로 부여한다.

| 금지 패턴 | 예시 |
| --------- | ---- |
| 자식 타겟 `[&_tag]:` / `[&_tag_…]:` | `[&_h3]:`, `[&_p]:`, `[&_nav]:`, `[&_a]:`, `[&_span]:` |
| 조상/컨텍스트 `[_&]:` / `[.class_&]:` | `[.section-dark_&]:`, `[.is-horizontal_&]:`, `[.split-copy_&]:` |
| 반응형과 결합된 자식 variant | `tablet:[&_h3]:text-lg`, `max-site:[&_p]:text-xs` |

`hover:` / `focus:` / `disabled:` / `aria-*:` / `data-*:` 및 자기 자신 클래스·순서 같은 **자기 자신 상태** variant는 허용한다. 애니메이션 상태는 대상 요소에 `data-*`를 설정해 소비한다. 금지 대상은 **다른 요소를 선택자로 찌르는** 패턴이다.

```tsx
// ❌ 구 — 부모에서 자식 스타일링
<article className="[&_h3]:mt-8 [&_h3]:text-2xl [&_p]:text-base [&_p]:mt-4">
    <h3>{title}</h3>
    <p>{desc}</p>
</article>

// ✅ 신 — 각 요소에 직접 className
<article>
    <h3 className="mt-8 text-2xl">{title}</h3>
    <p className="mt-4 text-base">{desc}</p>
</article>
```

```tsx
// ❌ 구
<div className="max-site:[&_h3]:text-lg tablet:[&_p]:text-xs">...</div>

// ✅ 신 — 반응형도 해당 태그에 직접
<div>
    <h3 className="text-base tablet:text-lg">...</h3>
    <p className="text-xs tablet:text-sm">...</p>
</div>
```

- 초기 스타일 세팅은 SCSS로 구성한다. 아래 3개 파일은 **내용을 그대로** 생성한다 (축약·임의 작성 금지). 전문 갱신 시 4배수 디자인과 `.prettierrc`를 우선 적용한다.
- `index.scss`와 `global.css`를 root layout에서 불러온다. reset은 `@layer base`에 두어 Tailwind 유틸리티가 우선 적용되도록 한다.
- `src/shared/styles/index.scss`는 아래 구조로 세팅한다:

```scss
// base 초기 세팅 스타일
@use "base/Fonts";
@use "base/Resets";

// abstracts 전역변수
@use "abstracts/Variables";
```

- `src/shared/styles/base/Fonts.scss` — 아래 내용을 그대로 생성:

```scss
@font-face {
    font-family: "SUIT";
    font-weight: 100;
    font-style: normal;
    font-display: swap;
    src: url("/fonts/suit/woff2/SUIT-Thin.woff2") format("woff2");
}

@font-face {
    font-family: "SUIT";
    font-weight: 200;
    font-style: normal;
    font-display: swap;
    src: url("/fonts/suit/woff2/SUIT-ExtraLight.woff2") format("woff2");
}

@font-face {
    font-family: "SUIT";
    font-weight: 300;
    font-style: normal;
    font-display: swap;
    src: url("/fonts/suit/woff2/SUIT-Light.woff2") format("woff2");
}

@font-face {
    font-family: "SUIT";
    font-weight: 400;
    font-style: normal;
    font-display: swap;
    src: url("/fonts/suit/woff2/SUIT-Regular.woff2") format("woff2");
}

@font-face {
    font-family: "SUIT";
    font-weight: 500;
    font-style: normal;
    font-display: swap;
    src: url("/fonts/suit/woff2/SUIT-Medium.woff2") format("woff2");
}

@font-face {
    font-family: "SUIT";
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    src: url("/fonts/suit/woff2/SUIT-SemiBold.woff2") format("woff2");
}

@font-face {
    font-family: "SUIT";
    font-weight: 700;
    font-style: normal;
    font-display: swap;
    src: url("/fonts/suit/woff2/SUIT-Bold.woff2") format("woff2");
}

@font-face {
    font-family: "SUIT";
    font-weight: 800;
    font-style: normal;
    font-display: swap;
    src: url("/fonts/suit/woff2/SUIT-ExtraBold.woff2") format("woff2");
}

@font-face {
    font-family: "SUIT";
    font-weight: 900;
    font-style: normal;
    font-display: swap;
    src: url("/fonts/suit/woff2/SUIT-Heavy.woff2") format("woff2");
}
```

- `src/shared/styles/base/Resets.scss` — 아래 내용을 그대로 생성:

```scss
@layer base {
    :root {
        // 초기 설정
        font-family:
            var(--custom-font),
            -apple-system,
            BlinkMacSystemFont,
            "Malgun Gothic",
            "맑은 고딕",
            helvetica,
            "Apple SD Gothic Neo",
            sans-serif;
        font-size: var(--root-font-size);
        font-weight: 600;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        background: var(--color-background-light);

        color: var(--color-gray-1000);
    }

    html {
        line-height: 1.25; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
        max-width: 100%;
        background: var(--color-background-light);
        scrollbar-width: none;
    }

    ::selection {
        background: var(--color-brand-100);
        color: var(--color-brand-700);
    }

    * {
        scrollbar-width: thin;
        box-sizing: border-box;
    }

    body {
        position: relative;
        // overflow-y: hidden;
        min-height: 100dvh;
        width: 100%;
        background-color: var(--color-background-light);

        display: block;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    main {
        scrollbar-color: rgba(0, 29, 58, 0.18) transparent;
        scrollbar-width: thin;
    }

    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    button,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
        font-size: inherit;
        margin: 0;
        padding: 0;
        vertical-align: baseline;
        color: inherit;
        line-height: inherit;
    }

    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }

    body {
        font-size: 1.6rem;
        line-height: 1;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    ol,
    ul {
        list-style: none;
    }

    blockquote,
    q {
        quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: "";
        content: none;
    }

    audio {
        display: none;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    input {
        height: var(--input-height);
        padding: var(--input-padding);
    }

    a {
        display: inline-block;
        text-decoration: none;
    }

    hr {
        height: 4px;
        background: var(--color-gray-200);
    }

    button {
        cursor: pointer;
        border: none;
        padding: 0;
        margin: 0;
        background: none;
    }

    input {
        &:focus {
            outline: none;
        }
    }
}
```

- `src/shared/styles/abstracts/Variables.scss` — 아래 내용을 그대로 생성:

```scss
:root {
    /* 폰트 */
    --custom-font: "SUIT";
    --root-font-size: 62.5%;
    --default-font-size: 1.6rem;
    // --default-font-size: 1.6rem;

    --preview-font: "NanumMyeongjo";
    // --preview-font: "NanumMyeongjo";

    /* 배경 색상 */
    --color-background-light: #ffffff;
    --color-background-outside: #ffffff;
    --color-background-normal: white;
    --color-background-funnel: #ffffff;

    /* 텍스트 색상 */
    --color-main-text-light: var(--color-gray-800);

    /* 브랜드 색상 */
    --color-brand-900: #095eb9;
    --color-brand-800: #1870c5;
    --color-brand-700: #2982d1;
    --color-brand-600: #3b92dd;
    --color-brand-500: #3c9aff; /* 기본 강조색 */
    --color-brand-400: #5aaaff;
    --color-brand-300: #83c1ff;
    --color-brand-200: #b0d8ff;
    --color-brand-100: #eaf1ff; /* 부드러운 배경용 */
    --color-brand-50: #f4f7ff; /* 거의 흰색에 가까운 파랑기 배경 */

    /* 그레이 색상 */
    --color-gray-50: #f9fafb;
    --color-gray-100: #f2f4f6;
    --color-gray-200: #e5e8eb;
    --color-gray-300: #d1d6db;
    --color-gray-400: #b0b8c1;
    --color-gray-500: #8b95a1;
    --color-gray-600: #6b7684;
    --color-gray-700: #4e5968;
    --color-gray-800: #333d4b;
    --color-gray-900: #191f28;
    --color-gray-1000: #000000;

    /* 동의 색상 (그린) */
    --color-green-50: #f0faf6;
    --color-green-100: #aeefd5;
    --color-green-200: #76e4b8;
    --color-green-300: #3fd599;
    --color-green-400: #15c47e;
    --color-green-500: #03b26c;
    --color-green-600: #02a262;
    --color-green-700: #029359;
    --color-green-800: #028450;
    --color-green-900: #027648;

    /* 부정 색상 (레드) */
    --color-red-50: #ffeeee;
    --color-red-100: #ffd4d6;
    --color-red-200: #feafb4;
    --color-red-300: #fb8890;
    --color-red-400: #f66570;
    --color-red-500: #f04452;
    --color-red-600: #e42939;
    --color-red-700: #d22030;
    --color-red-800: #bc1b2a;
    --color-red-900: #a51926;
    // --color-red-500: #a51926;

    /* 블루 계열 색상 */
    --color-blue-900: #1957c2;
    --color-blue-800: #1b64da;
    --color-blue-700: #2272eb;
    --color-blue-600: #3182f6; /* 메인 블루: 중간 */
    --color-blue-500: #4593fc;
    --color-blue-400: #64a8ff;
    --color-blue-300: #90c2ff;
    --color-blue-200: #c9e2ff;
    --color-blue-100: #e8f3ff;
    --color-blue-50: #f4f7ff; /* 가장 밝은 블루 */

    /* 경고 색상 (오렌지) */
    --color-orange-900: #a33100;
    --color-orange-500: #ff7337;
    --color-orange-50: #fff4ef;

    /* 헤더, 푸터, 배너 크기 */
    --button-height: 4rem;
    --button-min-height: 3.2rem;
    --nav-height: 5.2rem;
    --header-height: 4.8rem;
    --notice-height: 4rem;
    --footer-height: calc(1.6rem * 8);
    --letter-line-height: 1.29;

    --tool-height: 4.8rem;
    --tool-width: 24.4rem;

    --preview-width: 37.6rem;
    --preview-height: 66.8rem;

    --modal-width: 46.4rem;

    /* 레이아웃 간격 */
    --section-space: 12.8rem;
    --between-space: 1.2rem;

    /* 입력 폼 */
    --input-height: 4.4rem;
    --input-padding: 0.4rem 0;
    --input-date-width: 12.4rem;

    --shadow-normal: 0 20px 52px 0 var(--color-gray-400);
    // --shadow-normal: inset 0 0 0 4px var(--color-gray-200), 0 20px 36px 0px #0000000d;
    --shadow-popup:
        0 4px 4px 4px #2929290a, 0 4px 4px -4px #29292905, 0 8px 8px -4px #2929290a, 0 12px 12px -8px #2929290a, 0 24px 24px -12px #2929290a, 0 48px 48px -24px #5e5e6a94, 0 0 0 4px #2929290a,
        inset 0 -4px 4px -4px #3333330f;
    // --shadow-normal: 0 4px 4px 4px #2929290a,0 4px 4px -4px #29292905,0 8px 8px -4px #2929290a,0 12px 12px -8px #2929290a,0 24px 24px -12px #2929290a,0 48px 48px -24px #2929290a,0 0 0 4px #2929290a,inset 0 -4px 4px -4px #3333330f;
    --shadow-hard:
        inset 0 0 0 4px var(--color-gray-500), 0 20px 8px #731f0803, 0 12px 8px #731f080a, 0 4px 4px #731f0812, 0 4px 4px #731f0814, 0 0 0 4px var(--color-gray-200), inset 0 4px 4px #ffffff1f;

    --shadow-border-normal: inset 0 0 0 4px var(--color-gray-200);
    --shadow-border-hover: inset 0 0 0 4px var(--color-blue-300);
    --shadow-border-fail-normal: inset 0 0 0 4px var(--color-red-500);
    --shadow-border-fail-hover: inset 0 0 0 4px var(--color-red-500);
    --shadow-border-brand: inset 0 0 0 4px var(--color-brand-500);

    --shadow-brand-hard:
        inset 0 0 0 4px var(--color-brand-500), 0 20px 8px #731f0803, 0 12px 8px #731f080a, 0 4px 4px #731f0812, 0 4px 4px #731f0814, 0 0 0 4px var(--color-brand-500), inset 0 4px 4px #ffffff1f;

    --empty-element-height: calc(1.6rem * 15);
    --empty-action-height: calc(1.6rem * 3);
    --empty-filter-height: calc(1.6rem * 2);
    --empty-pagination-height: calc(1.6rem * 2);

    /* 버튼 크기 */
    --button-sm-height: 3.2rem;
    --button-sm-padding: 0.4rem 0.4rem;

    --button-md-height: 3.6rem;
    --button-md-padding: 0.4rem 1.2rem;

    --button-lg-height: 5.2rem;
    --button-lg-padding: 1.2rem 2rem;

    /* 버튼 크기 */
    --button-height-xxs: 2rem;
    --button-height-xs: 2.8rem;
    --button-height-sm: 3.6rem;
    --button-height-md: 4.4rem;
    --button-height-lg: 4.8rem;

    /* 반응형 사이즈 */
    --size-pc-full-hd: 1920px;
    --size-pc-wide: 1440px;
    --size-pc: 1024px;
    --size-tablet: 768px;
    --size-phablet: 512px;
    --size-mobile: 376px;
    --sidebar-sub-width: calc(1.6rem * 18);
    // --sidebar-sub-width: 28.8rem;

    /* 라이브러리 관련 */
    --toastify-toast-min-height: auto !important;

    /* 스크롤 탑 위치 */
    --scroll-top: 0;
}
```

## MUST NOT (금지)

- page.tsx에서 widgets/ui/features 직접 렌더 (View 경유 필수)
- views에 비즈니스 로직, entities/features 직접 import
- page/views에서 widgets 없이 features 직접 연결
- features/widgets/views에 domain api/query/type 중복 생성
- features/widgets/views에 client/server fetch 함수 중복 생성
- entities/{domain}/api/\*.api.ts 에서 `fetch` 직접 호출
- entities/{domain}/api/\*.query.ts 에 인증/에러/HTTP 로직 혼합
- shared/lib/api 외 다른 공통 HTTP 유틸, axios wrapper, fetch wrapper 생성
- 도메인 API 함수, query 훅, 요청/응답 타입에서 `Fetch` / `Query` / `Payload` / `Response` suffix 규칙을 어기는 임의 네이밍 (정적 도메인 모델과 shared wrapper 내부 타입은 적용 대상 아님)
- ui 섹션에 페이지 공유 상태(useState) — PageProvider/model로 이동
- 모든 페이지 ui 파일명 Title/Status/Analysis 획일화
- useSearch 등 예시 훅 이름 기계 복붙
- 지시하지 않은 공통 래퍼 컴포넌트(`PageFrame`, `PageSection`, `PageContainer`, `RouteLayout` 등) 임의 생성
- Panel에서 children 기반 추상 레이아웃 컴포넌트로 한 번 더 감싸는 패턴
- `ui/{RouteName}Page.tsx`, `ui/*Page.tsx`, `ui/*Sections.tsx` 등 **Panel 조립을 대신하는 중간 래퍼** 생성 후 Panel에서 `<Layer.*Page />`만 렌더
- Panel 파일 안에 `EstimatePage`처럼 **내부 서브 컴포넌트를 만들어 섹션 조립을 숨기는 패턴** (섹션은 `ui/`에 두고 Panel이 `Layer.*`로 직접 나열)
- Modal 없는 빈 scaffold 생성
- 테스트용 state/hook 없이 껍데기 파일만 만드는 방식
- 정적 UI 스타일을 인라인 CSS·별도 CSS 모듈·임의 SCSS로 새로 작성 (공통 base/abstracts 초기 세팅 제외)
- 동적 스타일 예외는 런타임 측정값, 컴포넌트 API로 전달받는 색상·스타일, CSS 변수, GSAP/Motion/WebGL의 애니메이션 제어값에 한정한다. 고정된 레이아웃·색상·폰트 선언은 Tailwind에 둔다.
- `mobile:` / `tablet:` / `pc:` 이외의 반응형 프리픽스 사용 (`sm`/`md`/`lg`/`xl`/`2xl`, `compact`/`site`/`wide`/`phablet`, `max-compact`/`max-site`/`max-wide`, 기타 `max-*`)
- 구 max-width 클래스를 새 이름으로만 바꿔 두는 1:1 치환 (반드시 mobile-first로 재작성)
- `@theme` 또는 globals에 구 브레이크포인트 변수(`--breakpoint-sm`~`2xl`, `--breakpoint-compact`/`site`/`wide` 등)를 남기거나 추가
- 4배수가 아닌 spacing/size 값 사용
- `.prettierrc`와 다른 포맷(들여쓰기 2칸, printWidth 무시, semi 생략 등)으로 코드 작성
- `global.css`의 `@theme` 브레이크포인트(`mobile`/`tablet`/`pc`)를 무시하거나 임의 미디어쿼리로 대체
- `Fonts.scss` / `Resets.scss` / `Variables.scss`를 빈 파일·축약본·임의 내용으로 생성 (프롬프트에 명시된 전문을 그대로 사용)
- 자식/조상 선택자 arbitrary variant 사용 (`[&_h3]:`, `[&_p]:`, `[.section-dark_&]:`, `tablet:[&_nav]:flex` 등) — 스타일은 대상 요소에 직접 부여

## 주의사항 — Panel 섹션 조립 (자주 하는 실수)

> **검수 시 Panel.tsx만 열어서 확인한다.** `ui/index.ts`에 섹션이 많아도, Panel이 `Layer.*Page` 하나만 렌더하면 **미준수**다.

### ❌ 안티패턴 — Panel이 조립을 위임

```tsx
// Panel.tsx — 금지
<NoticePageProvider>
    <Layer.NoticePage />
    <Layer.Modal />
</NoticePageProvider>;

// ui/NoticePage.tsx — 여기서 Title + Lists 조립 (금지)
export const NoticePage = () => (
    <main>
        <NoticeTitle />
        <NoticeLists />
    </main>
);
```

Panel이 얇아 보여서 “구조가 맞다”고 오판하기 쉽다. **조립 책임은 반드시 Panel에 있어야 한다.**

### ✅ 올바른 패턴 — Panel이 섹션을 직접 나열

```tsx
// Panel.tsx
import { NoticeLists, NoticeTitle } from "@/features/noticeList";

<NoticePageProvider>
    <main className="...">
        <NoticeTitle />
        <Suspense fallback={<Loading />}>
            <NoticeLists type="list" />
        </Suspense>
    </main>
    <Layer.Modal />
</NoticePageProvider>;
```

- `main` / `div` 레이아웃 클래스는 Panel에 둬도 된다 (공통 래퍼 컴포넌트 파일을 새로 만들지 말 것)
- `Suspense`·라우트 분기(`useParams`)는 Panel 또는 **단일 섹션 ui**에 둘 수 있다. 단, **2개 이상 섹션 조립은 Panel에서 `Layer.A` + `Layer.B`로 보여야 한다**
- 여러 라우트가 쓰는 UI(`NoticeLists` 등)는 `features/{capability}`로 빼고, 각 Panel에서 `features` + `Layer.*`로 조립한다. `widgets/A/ui`가 `widgets/B/ui`를 import하지 않게 한다

### 자가 점검 체크리스트 (리팩토링·신규 라우트 공통)

1. `Panel.tsx`에 `<Layer.*Page />`, `<Layer.*Sections />` 단독 렌더가 있는가? → 있으면 분해
2. Panel 본문에 `const XxxPage = () => ...` 내부 컴포넌트가 섹션을 조립하는가? → `ui/` 섹션으로 이동 후 Panel에서 `Layer.*` 나열
3. `ui/` 파일명이 `*Page.tsx`인데 Panel이 직접 조립하지 않는가? → 삭제 또는 섹션 단위로 rename
4. 완료 후 **라우트별 준수 표**에 `Panel 직접 섹션 조립` 열을 반드시 기록한다

## IF / THEN (판단 규칙)

| 조건                                | 행동                                                           |
| ----------------------------------- | -------------------------------------------------------------- |
| 단일 섹션 정적 안내 페이지          | PageProvider 생략, Panel → ui 1개                              |
| 2+ 섹션 상태 공유                   | PageProvider + widgets/{route}/model 필수                      |
| 여러 라우트에서 같은 폼/에디터      | features/{capability}로 추출                                   |
| 서버에서 fetch한 데이터 전달        | page → View(props) → Panel → ui                                |
| API 호출 함수 위치를 정해야 함      | entities/{domain}/api는 shared/lib/api/client 또는 server 조합 |
| 서버 실행 컨텍스트에서 API 호출     | `serverFetch` 사용 + 쿠키/refresh/auth 처리 위임               |
| 브라우저 실행 컨텍스트에서 API 호출 | `clientFetch` 사용 + 401/419/loading 처리 위임                 |
| query 파일을 만들 때                | query option/hook만 두고 HTTP 세부 구현 금지                   |
| admin 목록+상세+사이드패널          | PageProvider + ui를 List/DetailSidebar 등으로 분리             |
| 미완성 페이지                       | page→view→Panel 골격 + ServicePlaceholder                      |

## PageProvider 구현 스켈레톤

widgets/{route}/model/{RouteName}Context.tsx:

"use client";

- createContext + {RouteName}PageProvider
- model/ 하위 훅 ReturnType을 spread해서 value 합침
- use{RouteName}Provider() — Provider 밖 사용 시 throw

widgets/{route}/model/useXxx.ts:

- default export 가능
- 페이지 UI 상태·행동만 (API는 entities query 사용)
- 반환 구조는 얕고 평평하게 (깊은 중첩 queue.confirm... 지양)

테스트용 기본 훅(useSearch 권장) 최소 조건:

- `useState` 기반
- 검색어 1개 + page 1개 정도의 최소 payload 보유
- `setKeyword`, `setPage`, `reset`, `search` 같은 테스트 가능한 액션 노출
- 실제 요구사항이 없어도 Provider/value 연결이 바로 가능해야 함

Panel.tsx:
<RouteNamePageProvider>
<Layer.SectionA />
<Layer.SectionB />
<Layer.Modal />
</RouteNamePageProvider>

## 네이밍

- View: {RouteName}View.tsx
- Panel export: {RouteName}Panel
- Provider: {RouteName}PageProvider
- 소비 훅: use{RouteName}Provider
- `entities/{domain}/api/*.api.ts` export 함수명: 동사 + 도메인/리소스 + `Fetch`
- `entities/{domain}/api/*.query.ts` export 함수명: `use` + 동사 + 도메인/리소스 + `Query`
- `entities/{domain}/model/*.type.ts` 요청 타입명: 의미 + `Payload`
- `entities/{domain}/model/*.type.ts` 응답 타입명: 의미 + `Response`
- 동사 규칙: 조회=`get`, 생성/등록=`set` 또는 `post`, 수정=`patch`, 삭제=`delete`, refresh/revoke/token 같은 인증 액션은 API 의미를 유지한다
- 컬렉션/단건 suffix 규칙: 목록=`List`, 상세=`Detail` 또는 `Details`, 페이지네이션 목록=`Paging`, 설정=`Config`, 상태=`State`, 로그=`Logs`, 통계=`Statistics`, 랭킹=`Rankings`
- query 함수명은 대응 api 함수명을 기준으로 `use` + `{Fetch 제거한 이름}` + `Query` 형태를 우선 사용한다
- queryKey 규칙: `[도메인 KEY 상수, 세부 리소스 식별자, 상태/파라미터...]` 형태의 배열을 기본으로 사용한다
- queryKey 첫 원소는 문자열 하드코딩보다 `MmachineRoutes.KEY_*` 같은 도메인 상수를 우선 사용한다
- queryKey 세부 식별자는 `"detail"`, `"list"`, `"paging"`, `"current"`, `"statistics"` 같은 목적형 문자열 또는 훅 식별 문자열을 사용한다
- queryKey 가변 값은 `storeIdx`, id, pathName, page, pageSize, 날짜 범위, payload 순으로 필요한 값만 평평하게 넣고 깊은 객체 중첩은 지양한다
- mutation 후 무효화/재조회는 기본적으로 동일한 첫 원소 KEY 상수를 기준으로 `invalidateQueries` 또는 `refetchQueries` 한다
- payload/response 타입명도 api/query에서 쓰는 리소스 명과 최대한 동일한 어근을 유지한다
- ui 섹션: 목적형 PascalCase (HeroIntro, InquiryTable, FilterBar)
- Context 파일: {RouteName}Context.tsx 권장 (레거시 SubscriptionContext.tsx 허용)
- 기본 scaffold 훅명: `useSearch` 허용
- 기본 테스트 모달 store 이름: `useConfirmModalStore` 권장
- 기본 테스트 모달 target 이름: `"test"` 권장

## 골든 패스 참조 (이 프로젝트)

/admin/inquiries:
app/(login)/admin/inquiries/page.tsx
→ views/admin/inquiries/AdminInquiriesView.tsx
→ widgets/admin/inquiries/Panel.tsx (AdminInquiriesPageProvider)
→ widgets/admin/inquiries/model/ + ui/InquiryTable, ui/InquiryDetailSidebar

/ (home) — Provider 생략:
app/(site)/page.tsx → views/home/HomeView.tsx → widgets/home/Panel.tsx → widgets/home/ui/\*

/members/details — 기본 scaffold 참조:
app/(login)/members/details/page.tsx
→ views/members/details/MemberDetailsView.tsx
→ widgets/members/details/Panel.tsx
→ widgets/members/details/model/useConfirmModalStore.ts
→ widgets/members/details/ui/Modal.tsx
→ widgets/members/details/modal/SubscriptionModal.tsx

API 네이밍 골든 샘플:

- `getStoreAgencyInfoFetch` ↔ `useGetStoreAgencyInfoQuery`
- `getDashboardFetch` ↔ `useGetDashboardQuery`
- `getProdGroupListPagingFetch` ↔ `GetProdGroupListPagingPayload` / `GetProdGroupListPagingResponse`
- `getNoticeDetailFetch` ↔ `useGetNoticeDetailQuery` ↔ `GetNoticeDetailPayload` / `GetNoticeDetailResponse`

queryKey 골든 샘플:

- `[MmachineRoutes.KEY_NOTICE, payload.noticeId]`
- `[MmachineRoutes.KEY_HISTORY, "daily", payload.StartDate, payload.EndDate, payload.Page, payload.PageSize]`
- `[MmachineRoutes.KEY_HOME, persistStoreIdx, currentPathName]`

## 작업 순서

1. 모든 page.tsx가 View 경유하는지 확인 (qna 등 예외 수정)
2. views ↔ widgets 라우트 1:1 미러링 확인
3. **모든 Panel.tsx가 `Layer.*Page` 없이 섹션을 직접 조립하는지 확인**
4. admin 복합 페이지 PageProvider + model + ui 분리
5. entities 중복 제거, import 방향 위반 수정
6. 새로 만드는 모든 라우트에 기본 Modal + 테스트용 useSearch scaffold가 들어갔는지 확인
7. `global.css` `@theme` 브레이크포인트·Tailwind 유틸·4배수·`.prettierrc` 준수 여부 확인
8. `src/shared/styles` 초기 SCSS(`Fonts.scss`/`Resets.scss`/`Variables.scss` 전문 그대로 + `index.scss`) 세팅 확인
9. 반응형 프리픽스 전수 점검: `sm`/`md`/`lg`/`xl`/`2xl`/`compact`/`site`/`wide`/`phablet`/`max-*` 잔존 0건, `mobile`/`tablet`/`pc`만 사용
10. `src/app/globals.css` 등 구 `--breakpoint-*` 정의 제거·`shared/styles/global.css` `@theme`로 단일화 확인
11. 자식/조상 arbitrary variant(`[&_…]`, `[.…_&]`) 잔존 0건 확인 — 스타일은 대상 요소 직접 className으로 이동

## 완료 후 출력 (필수)

1. 변경/생성/삭제 파일 목록
2. 라우트별 준수 표:

| 라우트 | page→view→panel | **Panel 직접 섹션 조립** | model/Provider | ui 섹션 분리 | entities 경유 | 비고 |
| ------ | --------------- | ------------------------ | -------------- | ------------ | ------------- | ---- |

3. 아직 미준수 항목과 이유
4. app / views / widgets / features / entities 트리 요약
5. 스타일 준수 요약: Tailwind 전환 여부, 반응형(`mobile`/`tablet`/`pc`만·구 프리픽스 잔존 0), 자식 arbitrary variant 잔존 0, 4배수, `.prettierrc`, `shared/styles` 초기 세팅
6. 반응형 잔존 검색 결과 요약 (금지 프리픽스 매치 수 = 0이어야 함)
7. 자식/조상 arbitrary variant 잔존 검색 결과 요약 (`[&_` / `[.` + `_&]` 매치 수 = 0이어야 함)

````

---

## 사용법

1. 위 ``` 블록 전체를 AI 또는 작업 티켓에 붙여넣기
2. 프로젝트별 특수 라우트가 있으면 `## IF / THEN` 아래에 한 줄 추가
3. 완료 후 **라우트별 준수 표**로 3개 프로젝트 결과를 비교

## MUST TOP 5 (팀 통일 최소셋)

프롬프트가 길면 아래 항목만이라도 프로젝트 간 통일:

1. `app → views → widgets/Panel → ui`
2. `widgets` 경로 = URL 세그먼트
3. **Panel이 `Layer.*`로 섹션을 직접 조립 (`*Page` 중간 래퍼 금지)**
4. `entities/{domain}/api + model` 패턴
5. `features` = capability명 (라우트명 아님)
6. 2+ 섹션 상태 공유 → `widgets/{route}/model` + PageProvider
7. Tailwind + 반응형은 `mobile`/`tablet`/`pc`만 (구 `max-site`/`compact`/`xl` 등 금지) + 자식 arbitrary variant 금지 + 4배수 + `.prettierrc` + `shared/styles` 초기 SCSS
````
