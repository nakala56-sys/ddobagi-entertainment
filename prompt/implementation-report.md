# 또바기 엔터테인먼트 — 구현 결과

작업 브랜치: `develop` (브랜치 생성·전환·merge·배포 없음). 작업 시작 시 파일 상태를 기준으로 변경 목록을 작성했다. 사용자가 이미 삭제한 관리자 page는 아래 삭제 목록에서 중복 집계하지 않았다.

## 구현 결과

- 기존 라우트·API·인증·CMS 런타임을 제거하고 5개 페이지·22개 본문 섹션으로 교체했다.
- 서버 page는 metadata/Main/View만 담당하고 클라이언트 View에서 해당 Panel을 `ssr: false`로 연결한다.
- 모든 Panel이 `Layer.*` 섹션을 직접 나열하며 route/model의 Provider를 사용한다.
- 모든 GSAP·ScrollTrigger·Lenis 구현은 `src/shared/utils/animation.ts`에만 존재한다.
- 회사소개서 이미지를 로컬 WebP로 추출했다. 출처는 `public/images/ASSET-SOURCES.md`에 기록했다.
- Supabase·React Query·CMS 에디터·메일·차트 패키지를 제거했다. 사용자 작업에서 추가된 `@gsap/react`는 보존했다.
- 기존의 일반 공통 UI·스타일·shared fetch wrapper는 유지했다. 과거 Supabase migration과 기존 정적 에셋은 런타임에서 사용하지 않으며 이력으로 보존했다.

## 라우트별 준수 표

| 라우트 | page→View→Panel | Panel 직접 섹션 조립 | model/Provider | ui 섹션 분리 | entities 경유 | CSR |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 준수 | 준수 | 연결·동작 확인 | 준수 | 정적 도메인 데이터 | 본문 확인 |
| `/about` | 준수 | 준수 | 연결·동작 확인 | 준수 | 정적 도메인 데이터 | 본문 확인 |
| `/services` | 준수 | 준수 | 연결·동작 확인 | 준수 | 정적 도메인 데이터 | 본문 확인 |
| `/equipment` | 준수 | 준수 | 연결·동작 확인 | 준수 | 정적 도메인 데이터 | 본문 확인 |
| `/benefits` | 준수 | 준수 | 연결·동작 확인 | 준수 | 정적 도메인 데이터 | 본문 확인 |

기본 scaffold: 모든 라우트의 `ui/Modal.tsx`, `modal/TestModal.tsx`, `model/useConfirmModalStore.ts`, 목적형 상태 훅과 Context를 포함한다. 개발 환경에서 test 타겟 모달을 열고 키워드/페이지/검색/초기화를 검증했다. production에서는 테스트 트리거가 나타나지 않는다.

미준수 구조 항목: 없음. API/인증 처리 규칙은 API 실행이 없는 이번 사이트에서는 적용 대상이 없다. 필수 공통 server/client fetch 파일은 유지한다. Next의 error/not-found 파일은 일반 page 라우트와 구분한다.

## 검증

| 항목 | 결과 |
| --- | --- |
| `npm run lint` | 오류 0, 기존 공통 코드 경고 4 |
| `npm run test` | 기존 테스트 3개 통과 |
| `npm run build` | 컴파일·TypeScript·정적 HTML shell 생성 통과 |
| 구조 검사 | 5개 server page/CSR View/Panel 직접 조립/필수 scaffold/import 방향/중앙 GSAP 확인 |
| 브라우저 화면 | 1440px·390px에서 5개 라우트, 섹션 개수, main 1개, 가로 overflow 없음 확인 |
| CSR | 응답 HTML에 본문 hero 마크업이 없고 브라우저에서 본문이 표시됨을 확인 |
| 데이터 요청 | production·development 페이지에서 `/api/` 요청 없음 |
| 기본 인터랙션 | 모바일 메뉴 이동·닫기, 주소 복사, 서비스 목록 앵커 이동 확인 |
| GSAP | 각 서브페이지 Pin, 실제 휠 입력의 서비스 1→2→3→4→5 진행 확인 |
| 생명주기 | 클라이언트 이동/뒤로가기 시 이전 Pin 제거, 재방문 시 단일 Pin 확인 |
| 반응형 | 모션 감소·모바일 크기에서 Pin 해제, 데스크톱·일반 모션 복귀 시 재생성 확인 |
| 기본 모달 | 5개 라우트의 열기/Escape 닫기/검색/페이지 변경/초기화 통과 |
| 기존 라우트 | 상담·렌탈·BJ지원·뉴스·관리자·qna·문의 결과·기존 API의 대표 10개 URL이 404 |
| sitemap | 새 라우트 포함, 뉴스 경로 제거 |
| runtime | 검증 중 page error·console error 없음 |

기존 lint 경고: GoogleTagManager의 inline script 안내, Skeleton의 img 안내, Shimmer/Text의 effect dependency 안내. 이번 작업의 페이지·애니메이션·Provider에서는 경고가 없다.

## 콘텐츠 확인 사항

- 장비 사진은 소개서의 작은 방송 환경 이미지에서 추출하여 해상도가 제한된다. 원본 사진으로 교체할 수 있도록 경로를 고정했다.
- 뷰티 지원은 제휴 안내로 표현하며 구체적인 제공 조건이나 수익 보장을 추가하지 않았다.
- 주소 그래픽은 위치 안내용이며 실제 도로 약도가 아니다. 정확한 위치 안내는 외부 지도 검색 링크로 연결한다.
- 기존 코드의 전화·카카오 주소를 사용했다. 외부 상담 채널의 현재 운영 여부와 공개 연락처는 출시 전 확인 대상이다.

## 변경·생성·삭제 파일 목록

생성 97개 · 수정 30개 · 삭제 261개. 일반 공통 UI는 관련 없는 리팩토링을 하지 않았다.

### 생성

- `src/app/(site)/about/page.tsx`
- `src/app/(site)/benefits/page.tsx`
- `src/app/(site)/equipment/page.tsx`
- `src/app/(site)/services/page.tsx`
- `src/entities/benefit/constants/benefits.ts`
- `src/entities/benefit/model/benefit.type.ts`
- `src/entities/company/constants/company.ts`
- `src/entities/company/model/company.type.ts`
- `src/entities/equipment/constants/equipment.ts`
- `src/entities/equipment/model/equipment.type.ts`
- `src/entities/service/constants/services.ts`
- `src/entities/service/model/service.type.ts`
- `src/features/contactCreator/ContactCreatorButton.tsx`
- `src/features/contactCreator/index.ts`
- `src/shared/config/navigation.ts`
- `src/shared/lib/clipboard.ts`
- `src/views/about/AboutView.tsx`
- `src/views/benefits/BenefitsView.tsx`
- `src/views/equipment/EquipmentView.tsx`
- `src/views/services/ServicesView.tsx`
- `src/widgets/about/Panel.tsx`
- `src/widgets/about/index.ts`
- `src/widgets/about/modal/TestModal.tsx`
- `src/widgets/about/model/AboutContext.tsx`
- `src/widgets/about/model/useBrandExplore.ts`
- `src/widgets/about/model/useConfirmModalStore.ts`
- `src/widgets/about/ui/AboutHero.tsx`
- `src/widgets/about/ui/BrandMessage.tsx`
- `src/widgets/about/ui/BrandPhilosophy.tsx`
- `src/widgets/about/ui/Location.tsx`
- `src/widgets/about/ui/Modal.tsx`
- `src/widgets/about/ui/index.ts`
- `src/widgets/benefits/Panel.tsx`
- `src/widgets/benefits/index.ts`
- `src/widgets/benefits/modal/TestModal.tsx`
- `src/widgets/benefits/model/BenefitsContext.tsx`
- `src/widgets/benefits/model/useBenefitExplore.ts`
- `src/widgets/benefits/model/useConfirmModalStore.ts`
- `src/widgets/benefits/ui/BenefitsClosing.tsx`
- `src/widgets/benefits/ui/BenefitsHero.tsx`
- `src/widgets/benefits/ui/BenefitsOverview.tsx`
- `src/widgets/benefits/ui/BenefitsStickyCards.tsx`
- `src/widgets/benefits/ui/Modal.tsx`
- `src/widgets/benefits/ui/index.ts`
- `src/widgets/equipment/Panel.tsx`
- `src/widgets/equipment/index.ts`
- `src/widgets/equipment/modal/TestModal.tsx`
- `src/widgets/equipment/model/EquipmentContext.tsx`
- `src/widgets/equipment/model/useConfirmModalStore.ts`
- `src/widgets/equipment/model/useEquipmentExplore.ts`
- `src/widgets/equipment/ui/EquipmentGrid.tsx`
- `src/widgets/equipment/ui/EquipmentHero.tsx`
- `src/widgets/equipment/ui/EquipmentShowcase.tsx`
- `src/widgets/equipment/ui/Modal.tsx`
- `src/widgets/equipment/ui/StudioEnvironment.tsx`
- `src/widgets/equipment/ui/index.ts`
- `src/widgets/home/modal/TestModal.tsx`
- `src/widgets/home/model/HomeContext.tsx`
- `src/widgets/home/model/useConfirmModalStore.ts`
- `src/widgets/home/model/useHomeExplore.ts`
- `src/widgets/home/ui/BrandIntro.tsx`
- `src/widgets/home/ui/CreatorStories.tsx`
- `src/widgets/home/ui/FinalCta.tsx`
- `src/widgets/home/ui/Modal.tsx`
- `src/widgets/home/ui/StudioPreview.tsx`
- `src/widgets/home/ui/SupportOverview.tsx`
- `src/widgets/services/Panel.tsx`
- `src/widgets/services/index.ts`
- `src/widgets/services/modal/TestModal.tsx`
- `src/widgets/services/model/ServicesContext.tsx`
- `src/widgets/services/model/useConfirmModalStore.ts`
- `src/widgets/services/model/useServiceExplore.ts`
- `src/widgets/services/ui/Modal.tsx`
- `src/widgets/services/ui/ServicesClosing.tsx`
- `src/widgets/services/ui/ServicesHero.tsx`
- `src/widgets/services/ui/ServicesOverview.tsx`
- `src/widgets/services/ui/ServicesSlider.tsx`
- `src/widgets/services/ui/index.ts`
- `public/images/about/brand.webp`
- `public/images/about/location.svg`
- `public/images/benefits/beauty.webp`
- `public/images/equipment/audio.webp`
- `public/images/equipment/camera.webp`
- `public/images/equipment/lighting.webp`
- `public/images/equipment/pc.webp`
- `public/images/equipment/streaming.webp`
- `public/images/equipment/studio.webp`
- `public/images/home/creator-stories.webp`
- `public/images/home/hero.webp`
- `public/images/home/studio.webp`
- `public/images/services/design.webp`
- `public/images/services/directing.webp`
- `public/images/services/events.webp`
- `public/images/services/remote.webp`
- `public/images/services/setup.webp`
- `public/images/ASSET-SOURCES.md`
- `prompt/implementation-report.md`

### 수정

- `.env.example`
- `package-lock.json`
- `package.json`
- `prompt/project-docu.md`
- `src/app/(site)/layout.tsx`
- `src/app/(site)/page.tsx`
- `src/app/error.tsx`
- `src/app/global-error.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/shared/lib/seo.ts`
- `src/shared/ui/composed/Modal.tsx`
- `src/shared/utils/animation.ts`
- `src/views/home/HomeView.tsx`
- `src/widgets/home/Panel.tsx`
- `src/widgets/home/ui/HeroIntro.tsx`
- `src/widgets/home/ui/index.ts`
- `src/widgets/layout/Footer.tsx`
- `src/widgets/layout/Header.tsx`
- `src/widgets/layout/Main.tsx`
- `src/widgets/layout/Progress.tsx`
- `src/widgets/layout/QuickMenu.tsx`
- `src/widgets/layout/Sidebar.tsx`
- `src/widgets/layout/Toast.tsx`
- `src/widgets/layout/ui/SiteFooter.tsx`
- `src/widgets/layout/ui/SiteHeader.tsx`
- `src/widgets/layout/ui/index.ts`

### 삭제

- `src/app/(site)/bjSupport/.gitkeep`
- `src/app/(site)/bjSupport/page.tsx`
- `src/app/(site)/consulting/.gitkeep`
- `src/app/(site)/consulting/page.tsx`
- `src/app/(site)/equipmentRental/.gitkeep`
- `src/app/(site)/equipmentRental/page.tsx`
- `src/app/(site)/news/[slug]/.gitkeep`
- `src/app/(site)/news/[slug]/page.tsx`
- `src/app/(site)/news/page.tsx`
- `src/app/(site)/send/failed/page.tsx`
- `src/app/(site)/send/success/page.tsx`
- `src/app/(site)/studioRental/.gitkeep`
- `src/app/(site)/studioRental/page.tsx`
- `src/app/admin/layout.tsx`
- `src/app/admin/login/.gitkeep`
- `src/app/api/admin/account/manager/[id]/route.ts`
- `src/app/api/admin/account/manager/route.ts`
- `src/app/api/admin/banners/[id]/route.ts`
- `src/app/api/admin/banners/route.ts`
- `src/app/api/admin/dashboard/route.ts`
- `src/app/api/admin/global-modals/[id]/route.ts`
- `src/app/api/admin/global-modals/route.ts`
- `src/app/api/admin/inquiries/[id]/comments/route.ts`
- `src/app/api/admin/inquiries/[id]/resend-answer/route.ts`
- `src/app/api/admin/inquiries/[id]/route.ts`
- `src/app/api/admin/inquiries/route.ts`
- `src/app/api/admin/news/[id]/route.ts`
- `src/app/api/admin/news/route.ts`
- `src/app/api/admin/page-contents/[id]/route.ts`
- `src/app/api/admin/page-contents/route.ts`
- `src/app/api/admin/uploads/route.ts`
- `src/app/api/auth/login/route.ts`
- `src/app/api/auth/logout/route.ts`
- `src/app/api/auth/session/route.ts`
- `src/app/api/banners/route.ts`
- `src/app/api/global-modals/route.ts`
- `src/app/api/inquiries/route.ts`
- `src/app/api/news/[slug]/route.ts`
- `src/app/api/news/route.ts`
- `src/app/api/page-contents/[slug]/route.ts`
- `src/app/api/reports/route.ts`
- `src/app/api/uploads/route.ts`
- `src/app/providers/AuthProvider.tsx`
- `src/app/providers/PlanProvider.tsx`
- `src/app/providers/PopupProvider.tsx`
- `src/app/providers/QueryProvider.tsx`
- `src/app/qna/[slug]/page.tsx`
- `src/entities/asset/api/asset.api.ts`
- `src/entities/asset/api/asset.query.ts`
- `src/entities/asset/model/asset.type.ts`
- `src/entities/auth/api/auth.api.ts`
- `src/entities/auth/api/auth.query.ts`
- `src/entities/auth/model/auth.type.ts`
- `src/entities/banner/api/banner.api.ts`
- `src/entities/banner/api/banner.query.ts`
- `src/entities/banner/model/banner.type.ts`
- `src/entities/common/store/useConfirmModalStore.ts`
- `src/entities/dashboard/api/dashboard.api.ts`
- `src/entities/dashboard/api/dashboard.query.ts`
- `src/entities/dashboard/model/dashboard.type.ts`
- `src/entities/globalModal/api/globalModal.api.ts`
- `src/entities/globalModal/api/globalModal.query.ts`
- `src/entities/globalModal/model/globalModal.type.ts`
- `src/entities/globalModal/model/useGlobalModalPreviewStore.ts`
- `src/entities/inquiry/api/inquiry.api.ts`
- `src/entities/inquiry/api/inquiry.query.ts`
- `src/entities/inquiry/constants/regionOptions.ts`
- `src/entities/inquiry/lib/bjSupportReferral.ts`
- `src/entities/inquiry/lib/buildMessageBody.ts`
- `src/entities/inquiry/lib/formFields.test.ts`
- `src/entities/inquiry/lib/formFields.ts`
- `src/entities/inquiry/lib/inquiry.server.ts`
- `src/entities/inquiry/lib/inquiryNotification.server.ts`
- `src/entities/inquiry/lib/inquiryRateLimit.server.ts`
- `src/entities/inquiry/lib/publicPath.ts`
- `src/entities/inquiry/model/inquiry.type.ts`
- `src/entities/managerAccount/api/managerAccount.api.ts`
- `src/entities/managerAccount/api/managerAccount.query.ts`
- `src/entities/managerAccount/model/managerAccount.type.ts`
- `src/entities/news/api/news.api.ts`
- `src/entities/news/api/news.query.ts`
- `src/entities/news/model/news.type.ts`
- `src/entities/pageContent/api/pageContent.api.ts`
- `src/entities/pageContent/api/pageContent.query.ts`
- `src/entities/pageContent/model/pageContent.type.ts`
- `src/entities/report/api/report.api.ts`
- `src/entities/report/api/report.query.ts`
- `src/entities/report/model/report.type.ts`
- `src/features/auth/.gitkeep`
- `src/features/auth/AdminAuthGuard.tsx`
- `src/features/auth/AdminLoginForm.tsx`
- `src/features/manageGlobalModal/GlobalModalEditor.tsx`
- `src/features/manageNews/.gitkeep`
- `src/features/manageNews/NewsEditor.tsx`
- `src/features/submitInquiry/.gitkeep`
- `src/features/submitInquiry/InquiryForm.tsx`
- `src/proxy.ts`
- `src/shared/api/.gitkeep`
- `src/shared/api/SupabaseServer.ts`
- `src/shared/config/Supabase.ts`
- `src/shared/lib/AdminAccess.ts`
- `src/shared/lib/AdminAccountAuth.ts`
- `src/shared/lib/JsonLd.ts`
- `src/shared/lib/adminApi.ts`
- `src/shared/lib/asset.server.ts`
- `src/shared/lib/managerAccountSchema.ts`
- `src/shared/lib/resend.ts`
- `src/shared/lib/richText/richText.ts`
- `src/shared/lib/validation/parseRequest.ts`
- `src/shared/lib/validation/schemas/auth.ts`
- `src/shared/lib/validation/schemas/inquiry.test.ts`
- `src/shared/lib/validation/schemas/inquiry.ts`
- `src/shared/lib/validation/schemas/report.ts`
- `src/shared/types/Database.ts`
- `src/shared/ui/richText/RichTextEditor.tsx`
- `src/shared/ui/richText/RichTextRenderer.tsx`
- `src/shared/ui/richText/extensions/ResizableImageNodeView.tsx`
- `src/shared/ui/richText/extensions/imageDrag.ts`
- `src/shared/ui/richText/extensions/imageLayout.ts`
- `src/shared/ui/richText/extensions/imageSelection.ts`
- `src/shared/ui/richText/extensions/resizableImage.ts`
- `src/shared/ui/richText/extensions/richTextExtensions.ts`
- `src/shared/ui/richText/toolbar/ColorPickerPopover.tsx`
- `src/shared/ui/richText/toolbar/RichTextToolbar.tsx`
- `src/shared/ui/richText/toolbar/colorPalette.ts`
- `src/shared/ui/richText/toolbar/icons.tsx`
- `src/views/admin/.gitkeep`
- `src/views/admin/account/manager/AdminAccountManagerView.tsx`
- `src/views/admin/inquiries/AdminInquiriesView.tsx`
- `src/views/admin/inquiries/AdminInquiryEmailPreviewView.tsx`
- `src/views/admin/login/AdminLoginView.tsx`
- `src/views/admin/modals/AdminModalsView.tsx`
- `src/views/admin/news/AdminNewsView.tsx`
- `src/views/bjSupport/.gitkeep`
- `src/views/bjSupport/BjSupportView.tsx`
- `src/views/consulting/.gitkeep`
- `src/views/consulting/ConsultingView.tsx`
- `src/views/equipmentRental/.gitkeep`
- `src/views/equipmentRental/EquipmentRentalView.tsx`
- `src/views/landing/.gitkeep`
- `src/views/landing/HomeView.tsx`
- `src/views/news/detail/.gitkeep`
- `src/views/news/detail/NewsDetailView.tsx`
- `src/views/news/list/.gitkeep`
- `src/views/news/list/NewsListView.tsx`
- `src/views/send/failed/FailedView.tsx`
- `src/views/send/success/SuccessView.tsx`
- `src/views/studioRental/.gitkeep`
- `src/views/studioRental/StudioRentalView.tsx`
- `src/widgets/admin/account/manager/Panel.tsx`
- `src/widgets/admin/account/manager/index.ts`
- `src/widgets/admin/account/manager/ui/ManagerAccountList.tsx`
- `src/widgets/admin/account/manager/ui/ManagerAccountSidebar.tsx`
- `src/widgets/admin/account/manager/ui/ManagerAccountWorkspace.tsx`
- `src/widgets/admin/account/manager/ui/index.ts`
- `src/widgets/admin/inquiries/Panel.tsx`
- `src/widgets/admin/inquiries/emailPreview/Panel.tsx`
- `src/widgets/admin/inquiries/emailPreview/index.ts`
- `src/widgets/admin/inquiries/index.ts`
- `src/widgets/admin/inquiries/ui/EmailPreview.tsx`
- `src/widgets/admin/inquiries/ui/InquiryDetailContent.tsx`
- `src/widgets/admin/inquiries/ui/InquiryDetailSidebar.tsx`
- `src/widgets/admin/inquiries/ui/InquiryManagement.tsx`
- `src/widgets/admin/inquiries/ui/InquiryTable.tsx`
- `src/widgets/admin/inquiries/ui/index.ts`
- `src/widgets/admin/login/Panel.tsx`
- `src/widgets/admin/login/index.ts`
- `src/widgets/admin/login/ui/LoginScreen.tsx`
- `src/widgets/admin/login/ui/index.ts`
- `src/widgets/admin/modals/Panel.tsx`
- `src/widgets/admin/modals/index.ts`
- `src/widgets/admin/modals/ui/ModalManagement.tsx`
- `src/widgets/admin/modals/ui/index.ts`
- `src/widgets/admin/news/Panel.tsx`
- `src/widgets/admin/news/index.ts`
- `src/widgets/admin/news/ui/NewsManagement.tsx`
- `src/widgets/admin/news/ui/index.ts`
- `src/widgets/admin/shared/AdminLayout.tsx`
- `src/widgets/admin/shared/model/useAdminSidePanelStore.ts`
- `src/widgets/bjSupport/Panel.tsx`
- `src/widgets/bjSupport/index.ts`
- `src/widgets/bjSupport/ui/BjSupportBenefits.tsx`
- `src/widgets/bjSupport/ui/BjSupportInquiryForm.tsx`
- `src/widgets/bjSupport/ui/SupportGuide.tsx`
- `src/widgets/bjSupport/ui/index.ts`
- `src/widgets/consulting/Panel.tsx`
- `src/widgets/consulting/index.ts`
- `src/widgets/consulting/ui/ConsultingGuide.tsx`
- `src/widgets/consulting/ui/index.ts`
- `src/widgets/equipmentRental/Panel.tsx`
- `src/widgets/equipmentRental/index.ts`
- `src/widgets/equipmentRental/ui/RentalGuide.tsx`
- `src/widgets/equipmentRental/ui/index.ts`
- `src/widgets/home/modal/InquiryModal.tsx`
- `src/widgets/home/modal/index.ts`
- `src/widgets/home/modal/inquiryModal/InquiryModalFields.tsx`
- `src/widgets/home/modal/inquiryModal/constants.ts`
- `src/widgets/home/modal/inquiryModal/types.ts`
- `src/widgets/home/modal/inquiryModal/validateInquiryFields.ts`
- `src/widgets/home/ui/BroadcastEnvironment.tsx`
- `src/widgets/home/ui/ExpertNetwork.tsx`
- `src/widgets/home/ui/FinalCtaSection.tsx`
- `src/widgets/home/ui/Floating.tsx`
- `src/widgets/home/ui/OperationKnowhow.tsx`
- `src/widgets/home/ui/PartnerRecruit.tsx`
- `src/widgets/home/ui/RecordGraph.tsx`
- `src/widgets/home/ui/TransparencyProof.tsx`
- `src/widgets/home/ui/TrustPrinciples.tsx`
- `src/widgets/home/ui/recordGraph/GraphVer3.tsx`
- `src/widgets/home/ui/recordGraph/constants.ts`
- `src/widgets/landing/Panel.tsx`
- `src/widgets/landing/index.ts`
- `src/widgets/landing/modal/InquiryModal.tsx`
- `src/widgets/landing/modal/index.ts`
- `src/widgets/landing/modal/inquiryModal/InquiryModalFields.tsx`
- `src/widgets/landing/modal/inquiryModal/constants.ts`
- `src/widgets/landing/modal/inquiryModal/types.ts`
- `src/widgets/landing/modal/inquiryModal/validateInquiryFields.ts`
- `src/widgets/landing/ui/BroadcastEnvironment.tsx`
- `src/widgets/landing/ui/ExpertNetwork.tsx`
- `src/widgets/landing/ui/FinalCtaSection.tsx`
- `src/widgets/landing/ui/Floating.tsx`
- `src/widgets/landing/ui/HeroIntro.tsx`
- `src/widgets/landing/ui/OperationKnowhow.tsx`
- `src/widgets/landing/ui/PartnerRecruit.tsx`
- `src/widgets/landing/ui/RecordGraph.tsx`
- `src/widgets/landing/ui/TransparencyProof.tsx`
- `src/widgets/landing/ui/TrustPrinciples.tsx`
- `src/widgets/landing/ui/index.ts`
- `src/widgets/landing/ui/recordGraph/GraphVer3.tsx`
- `src/widgets/landing/ui/recordGraph/constants.ts`
- `src/widgets/layout/ApiPendingOverlay.tsx`
- `src/widgets/layout/Report.tsx`
- `src/widgets/layout/ui/AdminHeader.tsx`
- `src/widgets/layout/ui/AdminSidebar.tsx`
- `src/widgets/layout/ui/GlobalModalLayer.tsx`
- `src/widgets/layout/ui/SubPageLayout.tsx`
- `src/widgets/layout/ui/subPage/InfoCard.tsx`
- `src/widgets/layout/ui/subPage/InquiryRequestForm.tsx`
- `src/widgets/layout/ui/subPage/NoticeBox.tsx`
- `src/widgets/layout/ui/subPage/StudioSlider.tsx`
- `src/widgets/layout/ui/subPage/SubPageHero.tsx`
- `src/widgets/layout/ui/subPage/SubPageSection.tsx`
- `src/widgets/layout/ui/subPage/SubPageSplit.tsx`
- `src/widgets/news/detail/Panel.tsx`
- `src/widgets/news/detail/index.ts`
- `src/widgets/news/detail/ui/NewsArticle.tsx`
- `src/widgets/news/detail/ui/index.ts`
- `src/widgets/news/list/Panel.tsx`
- `src/widgets/news/list/index.ts`
- `src/widgets/news/list/ui/NewsFeed.tsx`
- `src/widgets/news/list/ui/index.ts`
- `src/widgets/send/failed/Panel.tsx`
- `src/widgets/send/failed/index.ts`
- `src/widgets/send/success/Panel.tsx`
- `src/widgets/send/success/index.ts`
- `src/widgets/send/ui/InquiryResult.tsx`
- `src/widgets/studioRental/Panel.tsx`
- `src/widgets/studioRental/index.ts`
- `src/widgets/studioRental/ui/StudioGuide.tsx`
- `src/widgets/studioRental/ui/index.ts`

## 실제 app/views/widgets/features/entities/shared 트리

프로젝트: `/Users/gimsangjun/Documents/3React/NextJs/ddobagi`

```text
src/
├── app/
│   ├── (site)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── benefits/
│   │   │   └── page.tsx
│   │   ├── equipment/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── .gitkeep
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── debug/
│   │   ├── admin-richtext/
│   │   └── tiptap/
│   ├── providers/
│   │   ├── GlobalErrorBoundary.tsx
│   │   └── GlobalErrorListener.tsx
│   ├── error.tsx
│   ├── favicon.ico
│   ├── global-error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── entities/
│   ├── benefit/
│   │   ├── constants/
│   │   │   └── benefits.ts
│   │   └── model/
│   │       └── benefit.type.ts
│   ├── company/
│   │   ├── constants/
│   │   │   └── company.ts
│   │   └── model/
│   │       └── company.type.ts
│   ├── equipment/
│   │   ├── constants/
│   │   │   └── equipment.ts
│   │   └── model/
│   │       └── equipment.type.ts
│   └── service/
│       ├── constants/
│       │   └── services.ts
│       └── model/
│           └── service.type.ts
├── features/
│   └── contactCreator/
│       ├── ContactCreatorButton.tsx
│       └── index.ts
├── shared/
│   ├── config/
│   │   ├── .gitkeep
│   │   └── navigation.ts
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── useNavigate.ts
│   │   ├── useScrollProgress.ts
│   │   └── useSectionTheme.ts
│   ├── lib/
│   │   ├── analytics/
│   │   │   └── GoogleTagManager.tsx
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── .gitkeep
│   │   ├── Motion.ts
│   │   ├── clipboard.ts
│   │   ├── seo.ts
│   │   ├── siteUrl.ts
│   │   └── toast.ts
│   ├── model/
│   │   └── stores/
│   │       ├── useApiPendingStore.ts
│   │       └── useToastStore.ts
│   ├── stores/
│   │   └── useLayoutStore.ts
│   ├── style/
│   │   └── scss/
│   │       ├── abstracts/
│   │       │   └── Variables.scss
│   │       ├── base/
│   │       │   ├── fonts.scss
│   │       │   └── reset.scss
│   │       └── index.scss
│   ├── types/
│   │   └── .gitkeep
│   ├── ui/
│   │   ├── composed/
│   │   │   └── Modal.tsx
│   │   ├── kit/
│   │   │   ├── Text/
│   │   │   │   ├── ui/
│   │   │   │   │   ├── Marquee.tsx
│   │   │   │   │   ├── Reveal.tsx
│   │   │   │   │   ├── Rolling.tsx
│   │   │   │   │   └── Shimmer.tsx
│   │   │   │   └── index.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Calendar.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Link.tsx
│   │   │   ├── Portal.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── TextArea.tsx
│   │   ├── model/
│   │   │   └── ui-props.ts
│   │   ├── reveal/
│   │   │   ├── Text.tsx
│   │   │   └── index.ts
│   │   ├── transition/
│   │   │   ├── RouteTransition.tsx
│   │   │   ├── Transition.tsx
│   │   │   └── index.ts
│   │   ├── .gitkeep
│   │   └── UIComponent.tsx
│   └── utils/
│       ├── animation.ts
│       ├── formatPrice.test.ts
│       └── formatPrice.ts
├── views/
│   ├── about/
│   │   └── AboutView.tsx
│   ├── benefits/
│   │   └── BenefitsView.tsx
│   ├── equipment/
│   │   └── EquipmentView.tsx
│   ├── home/
│   │   ├── .gitkeep
│   │   └── HomeView.tsx
│   └── services/
│       └── ServicesView.tsx
└── widgets/
    ├── about/
    │   ├── modal/
    │   │   └── TestModal.tsx
    │   ├── model/
    │   │   ├── AboutContext.tsx
    │   │   ├── useBrandExplore.ts
    │   │   └── useConfirmModalStore.ts
    │   ├── ui/
    │   │   ├── AboutHero.tsx
    │   │   ├── BrandMessage.tsx
    │   │   ├── BrandPhilosophy.tsx
    │   │   ├── Location.tsx
    │   │   ├── Modal.tsx
    │   │   └── index.ts
    │   ├── Panel.tsx
    │   └── index.ts
    ├── benefits/
    │   ├── modal/
    │   │   └── TestModal.tsx
    │   ├── model/
    │   │   ├── BenefitsContext.tsx
    │   │   ├── useBenefitExplore.ts
    │   │   └── useConfirmModalStore.ts
    │   ├── ui/
    │   │   ├── BenefitsClosing.tsx
    │   │   ├── BenefitsHero.tsx
    │   │   ├── BenefitsOverview.tsx
    │   │   ├── BenefitsStickyCards.tsx
    │   │   ├── Modal.tsx
    │   │   └── index.ts
    │   ├── Panel.tsx
    │   └── index.ts
    ├── equipment/
    │   ├── modal/
    │   │   └── TestModal.tsx
    │   ├── model/
    │   │   ├── EquipmentContext.tsx
    │   │   ├── useConfirmModalStore.ts
    │   │   └── useEquipmentExplore.ts
    │   ├── ui/
    │   │   ├── EquipmentGrid.tsx
    │   │   ├── EquipmentHero.tsx
    │   │   ├── EquipmentShowcase.tsx
    │   │   ├── Modal.tsx
    │   │   ├── StudioEnvironment.tsx
    │   │   └── index.ts
    │   ├── Panel.tsx
    │   └── index.ts
    ├── home/
    │   ├── modal/
    │   │   └── TestModal.tsx
    │   ├── model/
    │   │   ├── HomeContext.tsx
    │   │   ├── useConfirmModalStore.ts
    │   │   └── useHomeExplore.ts
    │   ├── ui/
    │   │   ├── BrandIntro.tsx
    │   │   ├── CreatorStories.tsx
    │   │   ├── FinalCta.tsx
    │   │   ├── HeroIntro.tsx
    │   │   ├── Modal.tsx
    │   │   ├── StudioPreview.tsx
    │   │   ├── SupportOverview.tsx
    │   │   └── index.ts
    │   ├── Panel.tsx
    │   └── index.ts
    ├── layout/
    │   ├── ui/
    │   │   ├── SiteFooter.tsx
    │   │   ├── SiteHeader.tsx
    │   │   └── index.ts
    │   ├── Footer.tsx
    │   ├── Header.tsx
    │   ├── Main.tsx
    │   ├── Progress.tsx
    │   ├── QuickMenu.tsx
    │   ├── Sidebar.tsx
    │   └── Toast.tsx
    └── services/
        ├── modal/
        │   └── TestModal.tsx
        ├── model/
        │   ├── ServicesContext.tsx
        │   ├── useConfirmModalStore.ts
        │   └── useServiceExplore.ts
        ├── ui/
        │   ├── Modal.tsx
        │   ├── ServicesClosing.tsx
        │   ├── ServicesHero.tsx
        │   ├── ServicesOverview.tsx
        │   ├── ServicesSlider.tsx
        │   └── index.ts
        ├── Panel.tsx
        └── index.ts
```

## 새 이미지 트리

```text
public/images/
├── home/
│   ├── creator-stories.webp
│   ├── hero.webp
│   └── studio.webp
├── about/
│   ├── brand.webp
│   └── location.svg
├── services/
│   ├── design.webp
│   ├── directing.webp
│   ├── events.webp
│   ├── remote.webp
│   └── setup.webp
├── equipment/
│   ├── audio.webp
│   ├── camera.webp
│   ├── lighting.webp
│   ├── pc.webp
│   ├── streaming.webp
│   └── studio.webp
└── benefits/
    └── beauty.webp
```
