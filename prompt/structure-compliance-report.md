# 구조 준수 작업 결과

## 기준 및 작업 이력

- 기준: 이 작업에서 상충 항목을 정리한 `prompt/structure-prompt.md`. 원본 문서와 100% 동일한 기준이라고 주장하지 않는다.
- 기존 미커밋 작업: `c725871`로 develop에 커밋하고 origin/develop push 완료.
- 작업 브랜치: `feature/structure-compliance` (develop에서 생성).
- 기존 페이지·도메인·PageProvider·Modal 골격을 유지하고 구조 위반과 스타일만 정리했다.

## 명확히 한 기준

1. 초기 SCSS 전문도 4배수 디자인과 루트 Prettier 설정을 따른다. 전문 예시를 실제 파일과 함께 갱신했다. Reset은 Tailwind base 레이어 안에 두고 제목 내부 요소는 폰트를 상속한다.
2. mobile은 344px을 기준으로 21.5rem, tablet은 768px/48rem, pc는 1440px/90rem이다. 기본 브레이크포인트는 wildcard 초기화로 제거했다.
3. 정적 px/rem 디자인 값에 4배수를 적용한다. 비율, unitless 값, 런타임 측정·애니메이션 중간값은 예외다.
4. 고정 UI 스타일은 Tailwind로 작성한다. 동적 측정값, 컴포넌트로 전달받는 스타일/색상, CSS 변수, GSAP/Motion/WebGL 제어값만 인라인 예외로 남겼다.
5. 인증 API가 없는 현재 정적 사이트에서는 쿠키 인증·refresh·Slack 연동과 도메인 API/query 골격을 임의로 추가하지 않는다. 인증/외부 연동을 도입하면 shared API에서 처리한다. 요청/응답 suffix 규칙은 정적 도메인 모델 및 shared 내부 타입과 구분했다.

## 라우트별 준수

| 라우트 | page→view→panel | Panel 직접 섹션 조립 | model/Provider | ui 섹션 분리 | entities 경유 | 비고 |
| --- | --- | --- | --- | --- | --- | --- |
| / | 준수 | 준수 | HomePageProvider | 준수 | benefit/company | Modal + 테스트 훅 |
| /about | 준수 | 준수 | AboutPageProvider | 준수 | company | Modal + 테스트 훅 |
| /services | 준수 | 준수 | ServicesPageProvider | 준수 | service/company | Modal + 테스트 훅 |
| /benefits | 준수 | 준수 | BenefitsPageProvider | 준수 | benefit/company | Modal + 테스트 훅 |
| /equipment | 준수 | 준수 | EquipmentPageProvider | 준수 | equipment/company | Modal + 테스트 훅 |

- page는 서버 컴포넌트로 metadata, Main, View만 담당한다.
- View는 Panel만 렌더한다. 동적 import의 중복 로딩 UI를 제거했다.
- Panel은 섹션과 Modal을 직접 조립한다. 별도 Page/Sections 래퍼를 추가하지 않았다.
- 정적 도메인 데이터는 entities/constants + model에 남겼다. HTTP 호출·queryKey 검증은 현재 라우트에 적용 대상이 없다.
- Location의 주소 복사 메시지와 공통 Header 메뉴는 해당 컴포넌트의 로컬 상태로 유지했다.

## 구조 및 스타일 검증

- 금지 반응형 프리픽스: 작업 전 897건 → 작업 후 0건.
- 금지 자식/조상 arbitrary selector: 작업 전 642건 → 작업 후 0건.
- 검사 범위: src의 TS/TSX 문자열·template fragment와 CSS/SCSS. 주석·문서 예시·sm/md/lg 사이즈 객체 키는 제외. 자기 자신 상태 selector는 허용.
- 역방향 layer import: 0건.
- 실제 브레이크포인트 정의는 shared/styles/global.css 하나이며 JS 감지도 해당 CSS 토큰을 읽는다.
- 기존 max-width 스택은 좁은 화면 기본값과 tablet/pc 덮어쓰기 형태로 다시 작성했다. 장비 그리드는 1/2/3열이다.
- 존재하지 않는 SCSS import 11개를 제거하고 파일명 대소문자를 일치시켰다.
- 초기 SCSS 4개 파일은 갱신된 문서 예시와 일치한다.
- 정적 px/rem 수치 검색에서 4배수 위반 후보 0건 (미디어 rem은 기본 폰트 기준으로 별도 판정).
- 공통 API 응답 파싱·실패 메시지·204 응답을 처리하고 Headers/FormData를 보존한다. 클라이언트 인증 만료는 공통 이벤트/토스트로 처리한다.
- 쓰기 요청 loading 카운터를 공통 ApiLoading UI에 연결했다. 서버 오류는 wrapper에서 기록한다.

## 실행 검증

- npm run format:check: 통과.
- npm run lint: 오류 0건, 기존 경고 2건 (GoogleTagManager inline script, Skeleton img).
- npm test: 2개 파일, 9개 테스트 통과. 기존 가격 포맷 및 요청 동시성·loading 해제·401/419·FormData/Headers·비정상 JSON·네트워크 실패를 검증했다.
- npm run build: 프로덕션 build 및 TypeScript 검증 통과.
- Chromium: 5개 페이지 × 375/768/1440px 총 15개 조합에서 페이지 표시, 이미지 로딩, 루트 폰트/브레이크포인트, 가로 넘침을 확인했다.
- 5개 페이지의 모바일 메뉴 열기/닫기 및 테스트 Modal 검색·닫기를 확인했다.
- 일반 모션 환경에서 home 갤러리, services 슬라이더, benefits 카드, equipment 쇼케이스의 data 상태 활성화를 확인했다. 실제 Next Link로 5개 페이지를 순차 이동하고 home 복귀 시 로딩·DOM 정리도 확인했다. 브라우저 오류 0건.
- 기존 사용자 dev 서버는 중단하지 않았다. 개발 검증은 /private/tmp 임시 사본의 별도 서버, 프로덕션 로딩 검증은 별도 start 서버에서 진행했다.

## 남은 항목과 범위

검증 범위 안에서 확인된 구조·스타일 미준수 항목은 없다. 모든 화면 폭·모든 애니메이션 중간 프레임을 검증했다는 의미는 아니다. 현재 존재하지 않는 로그인/admin/API 및 외부 서버 인증·Slack 연동은 적용 대상이 아니다. lint의 기존 경고 2건은 이번 구조 통일과 무관해 유지했다.

## 폴더 요약

```text
app/(site)/  → /, about, services, benefits, equipment
views/       → home, about, services, benefits, equipment
widgets/     → 동일 5개 라우트 + layout
features/    → contactCreator
entities/    → company, service, benefit, equipment
shared/      → lib/api, lib/breakpoints, styles, ui, model 등
```

## 변경/생성/삭제 파일

포맷 변경은 .prettierrc 일치에 필요한 범위만 포함한다. 아래 목록은 기존 작업 커밋 c725871 이후의 이번 구조 통일 변경이다.

### 생성

- `src/shared/lib/api/client.test.ts`
- `src/shared/lib/api/error.ts`
- `src/shared/lib/breakpoints.ts`
- `src/widgets/layout/ApiLoading.tsx`
- `prompt/structure-compliance-report.md`

### 삭제

- `src/app/globals.css`

### 수정

- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `prompt/structure-prompt.md`
- `src/app/(site)/about/page.tsx`
- `src/app/(site)/benefits/page.tsx`
- `src/app/(site)/equipment/page.tsx`
- `src/app/(site)/layout.tsx`
- `src/app/(site)/page.tsx`
- `src/app/(site)/services/page.tsx`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/entities/benefit/constants/benefits.ts`
- `src/entities/equipment/constants/equipment.ts`
- `src/entities/service/constants/services.ts`
- `src/features/contactCreator/ContactCreatorButton.tsx`
- `src/shared/lib/api/client.ts`
- `src/shared/lib/api/server.ts`
- `src/shared/lib/seo.ts`
- `src/shared/styles/abstracts/Variables.scss`
- `src/shared/styles/base/Fonts.scss`
- `src/shared/styles/base/Resets.scss`
- `src/shared/styles/global.css`
- `src/shared/styles/index.scss`
- `src/shared/ui/composed/Modal.tsx`
- `src/shared/ui/gradient-wave/GradientWave.tsx`
- `src/shared/ui/gradient-wave/renderer.ts`
- `src/shared/ui/kit/Checkbox.tsx`
- `src/shared/ui/kit/Input.tsx`
- `src/shared/ui/kit/Link.tsx`
- `src/shared/ui/kit/Portal.tsx`
- `src/shared/ui/kit/Skeleton.tsx`
- `src/shared/ui/kit/Text/ui/Reveal.tsx`
- `src/shared/ui/kit/Text/ui/Rolling.tsx`
- `src/shared/ui/kit/Text/ui/Shimmer.tsx`
- `src/shared/ui/kit/TextArea.tsx`
- `src/shared/ui/reveal/Text.tsx`
- `src/shared/ui/transition/PageTransition.tsx`
- `src/shared/ui/transition/Transition.tsx`
- `src/shared/utils/animation.ts`
- `src/views/about/AboutView.tsx`
- `src/views/benefits/BenefitsView.tsx`
- `src/views/equipment/EquipmentView.tsx`
- `src/views/home/HomeView.tsx`
- `src/views/services/ServicesView.tsx`
- `src/widgets/about/Panel.tsx`
- `src/widgets/about/modal/TestModal.tsx`
- `src/widgets/about/model/useBrandExplore.ts`
- `src/widgets/about/ui/AboutHero.tsx`
- `src/widgets/about/ui/BrandMessage.tsx`
- `src/widgets/about/ui/BrandPhilosophy.tsx`
- `src/widgets/about/ui/Location.tsx`
- `src/widgets/benefits/Panel.tsx`
- `src/widgets/benefits/modal/TestModal.tsx`
- `src/widgets/benefits/model/useBenefitExplore.ts`
- `src/widgets/benefits/ui/BenefitsClosing.tsx`
- `src/widgets/benefits/ui/BenefitsHero.tsx`
- `src/widgets/benefits/ui/BenefitsOverview.tsx`
- `src/widgets/benefits/ui/BenefitsStickyCards.tsx`
- `src/widgets/equipment/Panel.tsx`
- `src/widgets/equipment/modal/TestModal.tsx`
- `src/widgets/equipment/model/useEquipmentExplore.ts`
- `src/widgets/equipment/ui/EquipmentGrid.tsx`
- `src/widgets/equipment/ui/EquipmentHero.tsx`
- `src/widgets/equipment/ui/EquipmentShowcase.tsx`
- `src/widgets/equipment/ui/StudioEnvironment.tsx`
- `src/widgets/home/modal/TestModal.tsx`
- `src/widgets/home/model/useHomeExplore.ts`
- `src/widgets/home/ui/BeliefMoments.tsx`
- `src/widgets/home/ui/BrandIntro.tsx`
- `src/widgets/home/ui/CreatorGallery.tsx`
- `src/widgets/home/ui/CreatorStories.tsx`
- `src/widgets/home/ui/FinalCta.tsx`
- `src/widgets/home/ui/HeroIntro.tsx`
- `src/widgets/home/ui/StudioPreview.tsx`
- `src/widgets/home/ui/SupportOverview.tsx`
- `src/widgets/layout/Main.tsx`
- `src/widgets/layout/Progress.tsx`
- `src/widgets/layout/QuickMenu.tsx`
- `src/widgets/layout/Sidebar.tsx`
- `src/widgets/layout/Toast.tsx`
- `src/widgets/layout/ui/SiteFooter.tsx`
- `src/widgets/layout/ui/SiteHeader.tsx`
- `src/widgets/services/Panel.tsx`
- `src/widgets/services/modal/TestModal.tsx`
- `src/widgets/services/model/useServiceExplore.ts`
- `src/widgets/services/ui/ServicesClosing.tsx`
- `src/widgets/services/ui/ServicesHero.tsx`
- `src/widgets/services/ui/ServicesOverview.tsx`
- `src/widgets/services/ui/ServicesSlider.tsx`
- `tsconfig.json`
