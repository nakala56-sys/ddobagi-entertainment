# 또바기 엔터테인먼트 — 최종 구현 기획

## 기준과 목적

- 구조의 기준은 `structure-prompt.md`이며, 이 문서가 별도의 아키텍처를 정의하지 않는다.
- 사용자가 제공한 회사소개서의 전문 장비 설치·세팅, 원격 기술지원, 디렉팅, 디자인 제작, 이벤트 기획, 뷰티 지원을 콘텐츠 기준으로 삼는다.
- 크리에이터가 회사의 지원 시스템과 방송 환경을 이해하고 외부 상담 채널로 이동하는 브랜드 사이트를 만든다.
- 모든 페이지 본문은 CSR로 렌더링한다. API·인증·CMS·Supabase를 사용하지 않는다.
- 현재 브랜치에서 작업한다. 기존 관리자·문의·뉴스·렌탈 라우트를 교체하고 해당 런타임 의존성을 제거한다.

## 화면과 콘텐츠

| 라우트 | 목적 | Panel이 직접 조립하는 ui 섹션 |
| --- | --- | --- |
| `/` | 브랜드와 지원 시스템의 입구 | HeroIntro, BrandIntro, SupportOverview, StudioPreview, CreatorStories, FinalCta, Modal |
| `/about` | 브랜드 철학과 위치 소개 | AboutHero, BrandPhilosophy, BrandMessage, Location, Modal |
| `/services` | 회사가 제공하는 실제 지원 서비스 소개 | ServicesHero, ServicesOverview, ServicesSlider, ServicesClosing, Modal |
| `/equipment` | 방송 장비와 공간 소개 | EquipmentHero, EquipmentShowcase, EquipmentGrid, StudioEnvironment, Modal |
| `/benefits` | 크리에이터가 받는 지원 소개 | BenefitsHero, BenefitsOverview, BenefitsStickyCards, BenefitsClosing, Modal |

본문 22개 섹션과 라우트별 Modal을 구성한다. Home의 폴더명은 구조 규칙의 골든 패스인 `home`을 사용한다.

### Home

1. HeroIntro: “YOUR COLOR. YOUR STAGE.” — 크리에이터의 개성을 위한 브랜드 메시지.
2. BrandIntro: 함께 성장하는 파트너라는 회사의 방향. About으로 연결.
3. SupportOverview: 소개서의 6개 지원 항목. Benefits로 연결.
4. StudioPreview: 소개서의 실제 방송 환경. Equipment로 연결.
5. CreatorStories: 소개서에 담긴 소속 크리에이터 활동 이미지와 설명.
6. FinalCta: 외부 카카오 상담으로 연결.

### About

1. AboutHero: 개성과 가능성을 발견하는 회사 소개.
2. BrandPhilosophy: 개개인의 색깔과 지속적인 지원을 설명. 데스크톱은 이미지 sticky, 텍스트 순차 등장.
3. BrandMessage: “꾸준히. 한결같이. 함께.” — 페이지의 핵심 Pin 인터랙션.
4. Location: 기획 문서의 학동로4길 주소, 주소 안내 그래픽, 주소 복사, 네이버 지도 검색 링크. 지도 SDK를 불러오지 않으며 그래픽은 실제 도로 약도가 아니다.

### Services

1. ServicesHero: “YOU CREATE. WE SUPPORT.”
2. ServicesOverview: 5개 서비스 목록. 데스크톱 포인터·키보드 focus 시 이미지 프리뷰.
3. ServicesSlider: 설치·세팅 / 원격 기술지원 / 맞춤 디렉팅 / 디자인 콘텐츠 제작 / 이벤트 콘텐츠 기획. 데스크톱 Pin 가로 이동, 현재 항목·진행도 표시.
4. ServicesClosing: 지원 서비스 상담 CTA.

### Equipment

1. EquipmentHero: 콘텐츠를 위한 방송 환경 안내.
2. EquipmentShowcase: 카메라 / 조명 / 오디오 / 방송용 PC / 송출 시스템 / 스튜디오. 데스크톱 Pin 전환.
3. EquipmentGrid: 같은 6개 카테고리를 일반 스크롤로 읽을 수 있게 정리.
4. StudioEnvironment: 소개서의 스튜디오 이미지와 상담 CTA.

이미지는 회사소개서의 방송 환경 사례다. 실제 제품의 단독 촬영 이미지나 확인되지 않은 제품 모델·성능으로 표현하지 않는다.

### Benefits

1. BenefitsHero: 크리에이터가 콘텐츠에 집중할 수 있도록 지원한다는 메시지.
2. BenefitsOverview: 소개서의 6개 지원 항목.
3. BenefitsStickyCards: 방송 환경 / 방송 운영 / 콘텐츠 성장 / 개인 스타일링의 4개 그룹. 데스크톱 카드 쌓기.
4. BenefitsClosing: 함께 성장하는 메시지와 상담 CTA.

뷰티 지원은 소개서에 안내된 제휴 케어로 표현하고, 범위·조건은 상담으로 안내한다. 실제 정산 이미지로 일반적인 수익을 보장하거나 임의의 통계를 만들지 않는다.

## 디자인과 공통 화면

- 대형 영문 타이포그래피, 한글 설명, 충분한 여백.
- 밝은 종이색 `#f6f5f0`, 어두운 녹색 계열 `#181a16`, 골드 `#aa8d54`.
- 기존 SUIT 폰트와 공통 스타일 기반 유지.
- 헤더: 5개 라우트 메뉴, 상담 링크, 모바일 메뉴.
- 푸터: 회사명·주소·전화·페이지 메뉴.
- QuickMenu: 카카오 상담·맨 위로 이동.
- 기존 코드의 카카오 링크·전화번호를 사용하고, 주소는 승인된 기획 문서를 사용한다. 출시 시 연락처의 운영 유효성을 확인한다.
- 소개서 이미지를 로컬 WebP로 추출한다. PDF 원본의 해상도를 넘는 디테일을 보장하지 않는다. 원본 사진이 확보되면 같은 파일 경로로 교체할 수 있다.

## 구조와 CSR

```text
app/(site)/{route}/page.tsx — Server Component
  metadata + Main + View 렌더만
    → views/{route}/{RouteName}View.tsx — Client Component
      next/dynamic({ ssr: false })로 해당 Panel만 연결
        → widgets/{route}/Panel.tsx — Client Component
          PageProvider 안에서 Layer.* 섹션을 직접 나열
            → widgets/{route}/ui/*.tsx
```

- View는 UI 조립·도메인 데이터·비즈니스 로직을 갖지 않는다.
- Panel은 `import * as Layer from "@/widgets/{route}/ui"`를 사용한다.
- Panel에 네이티브 div와 ref를 둘 수 있지만 별도 PageFrame·PageSections·ClientPage 래퍼를 생성하지 않는다.
- 섹션 간 공유 상태는 해당 route/model의 PageProvider로 관리한다.
- features는 여러 페이지에서 재사용하는 `contactCreator`만 담당한다.
- entities는 company/service/equipment/benefit의 정적 데이터와 도메인 타입을 소유한다.
- API 호출이 없으므로 도메인 API·Query 함수를 만들지 않는다. 필수 shared/lib/api/server.ts, client.ts는 유지하며 화면에서 실행하지 않는다.
- 서버 metadata·HTML shell과 클라이언트 본문을 구분한다. Next 빌드의 static 표시는 HTML shell이 사전 생성된다는 뜻이며, 본문은 브라우저에서 렌더링된다.
- not-found/error/global-error는 Next 프레임워크의 오류 처리 파일이며 일반 page.tsx 라우트 조립 규칙과 구분한다.

## 필수 scaffold

모든 route/widget에는 Panel.tsx, index.ts, ui/index.ts, ui/Modal.tsx, modal/TestModal.tsx, model/useConfirmModalStore.ts를 둔다.

- store의 target은 `"test"`이며 즉시 열고 닫을 수 있다.
- 목적형 기본 훅: useHomeExplore, useBrandExplore, useServiceExplore, useEquipmentExplore, useBenefitExplore.
- 기본 훅은 keyword/page/submittedKeyword와 setKeyword/setPage/search/reset을 제공한다.
- 각 라우트 Context에서 훅 반환값을 value로 연결한다.
- 개발용 모달의 입력·검색·페이지·초기화 UI에서 실제 동작을 확인한다.
- 모달 트리거와 테스트 화면은 개발 환경에서만 표시한다. 공개 사이트에는 테스트 기능을 노출하지 않는다.

## 중앙 애니메이션

모든 GSAP·ScrollTrigger·Lenis 구현과 관련 이벤트·측정·정리는 `src/shared/utils/animation.ts`에서만 작성한다.

```text
Animation.layout
  common / header / main / footer / progress
Animation.landing.section
  heroIntro / brandIntro / supportOverview / studioPreview / creatorStories / finalCta
Animation.about.section
  hero / brandPhilosophy / brandMessage / location
Animation.services.section
  hero / overview / slider / closing
Animation.equipment.section
  hero / showcase / grid / studioEnvironment
Animation.benefits.section
  hero / overview / stickyCards / closing
```

- 섹션은 ref.current를 Animation 함수에 전달하고 반환된 cleanup을 effect에서 반환한다.
- 각 함수는 해당 섹션으로 selector를 제한하고 독립적인 Timeline·ScrollTrigger를 만든다.
- GSAP matchMedia context로 반응형 분기와 정리를 담당한다.
- 공통 Lenis는 SiteLayout에서 한 번 초기화하고 GSAP ticker/ScrollTrigger와 동기화한다.
- unmount 시 ticker·리스너·트리거·pin 상태·인라인 스타일을 정리한다.
- 이미지 로딩·폰트 준비·화면 크기 변화 시 측정을 갱신한다.
- 페이지 변경 시 측정을 갱신하되 무조건 scrollTo(0, 0)으로 브라우저 뒤로가기 복원을 덮어쓰지 않는다.

## 모바일·접근성

- 900px 미만: 가로 스크롤·Pin 쇼케이스·카드 쌓기는 일반 세로 콘텐츠.
- 포인터 프리뷰는 모바일에서 숨기고 서비스 상세 카드에 이미지를 제공.
- 모션 감소: 본문 콘텐츠 바로 표시, Pin·패럴랙스·등장 효과·Lenis 비활성화.
- 모바일 메뉴와 모달은 native dialog로 포커스 제한·Escape 닫기 지원.
- 외부 링크 새 창 안내, 이미지 alt, 제목 구조, 본문 바로가기, 키보드 focus 표시.
- 현재 카드 상태는 이미지와 텍스트를 함께 표시하며 카운터만으로 의미를 전달하지 않는다.

## 제거·유지 범위

- 제거: 기존 상담/렌탈/BJ지원/뉴스/문의 결과/관리자/qna 라우트, 모든 API Route, 관리자 proxy, 인증·Query·동적 팝업 Provider.
- 제거: 위 기능의 entities/features/widgets/views 및 Supabase·메일·CMS 전용 shared 구현과 패키지.
- 유지: 일반 공통 UI·스타일·에러 처리·정적 metadata·shared fetch wrapper.
- 기존 Supabase migration은 과거 이력으로 남으며 런타임에서 사용하지 않는다. 외부 데이터베이스는 변경하지 않는다.
- 현재 작업 디렉터리의 사용자 변경사항을 확인한 상태에서 승인된 교체 범위를 반영한다.

## 완료 기준

1. 5개 라우트가 page → View → Panel → ui를 따르고 Panel이 직접 섹션을 조립한다.
2. 라우트별 Provider·목적형 훅·test 모달이 연결되어 있다.
3. GSAP 호출은 animation.ts에만 있고 route/section으로 구분된다.
4. 페이지 UI에서 API/Supabase 요청이 발생하지 않는다.
5. 모바일·모션 감소 상태에서도 모든 본문을 읽을 수 있다.
6. 페이지 이동/재방문/화면 크기 변경 후 pin·ticker·리스너가 중복되지 않는다.
7. 상담·지도 링크·주소 복사·모바일 메뉴가 동작한다.
8. 이전 라우트/API는 제거되어 404를 반환하고 sitemap은 새 라우트만 포함한다.
9. lint/build와 기존 테스트를 통과한다. 변경 목록·준수 표·최종 트리는 implementation-report.md에 기록한다.
