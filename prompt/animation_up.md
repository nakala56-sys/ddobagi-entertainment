지금 내가 너에게 전송한 내용도 추가해줘  
첨부한 「또바기 회사소개서.pdf」 12페이지를 확인했어.

---

GSAP ScrollTrigger와 Timeline을 활용한 인터랙티브 기업 홈페이지를 설계하려 할 때, 가장 중요한 원칙은 '섹션 단위 명확한 역할 분리'와 'ScrollTrigger와 Timeline의 독립적 운용'이야. 각 섹션은 자신이 맡은 내용만 책임지고, GSAP 애니메이션 및 트리거 역시 해당 섹션 내부에서만 생성·관리해야 해. 이렇게 하면 사용성과 유지보수, 그리고 페이지/섹션 간 역할 분리가 확실해져.

브랜드 특성을 고려했을 때는 미니멀 레이아웃, 대형 타이포그래피, 감각적인 비주얼 소재, 그리고 자연스러운 스크롤 기반 애니메이션이 사이트 전반을 아우르는 방향이 적합할 것 같아.

이번엔 기존에 기획된 About, Services, Equipment, Benefits 외에 Home 메인 랜딩을 새롭게 설계함과 동시에, Home/서브페이지 전체 사이트 구조와 각 섹션의 인터랙션까지 통합적으로 설명할게.

---

## 전체 사이트 구조

```
Home (/)
│
├── About (/about)
│   ├── 01. About Hero
│   ├── 02. Brand Philosophy
│   ├── 03. Brand Message
│   └── 04. Location
│
├── Services (/services)
│   ├── 01. Services Hero
│   ├── 02. Services Overview
│   ├── 03. Services Horizontal Slider
│   └── 04. Services Closing
│
├── Equipment (/equipment)
│   ├── 01. Equipment Hero
│   ├── 02. Equipment Showcase
│   ├── 03. Equipment Grid
│   └── 04. Studio Environment
│
└── Benefits (/benefits)
    ├── 01. Benefits Hero
    ├── 02. Benefits Overview
    ├── 03. Benefits Sticky Cards
    └── 04. Benefits Closing
```

---

## Home — 메인 랜딩페이지 기획 (PDF 내용 반영)

특히 「또바기 회사소개서.pdf」 12페이지를 비롯한 2~12페이지를 참고하여, Home은 단순 요약 화면이 아니라 "방송 환경 → 지원 시스템 → 실제 활동 → 성장 가능성"이라는 메시지 흐름으로 구성된 브랜딩 랜딩 페이지로 설계해야 해.  
PDF에서 강조된 또바기의 차별화 요소는 아래와 같아.

- 방송 환경: 전문 장비, 스튜디오, 방송 세팅 지원
- 운영 지원: 상시 원격, 방송 디렉팅, 콘텐츠 제작
- 성장 지원: 이벤트 기획/디자인/뷰티 시술
- 실제 운영: 소속 크리에이터 방송/사례
- 스튜디오: 경쟁·대형 엑셀 스튜디오 등 차별화된 시설
- 운영 신뢰도: 실방기반 정산 시스템 등

이런 콘텐츠를 반영해 Home을 7개 독립 섹션으로 기획함(모든 섹션은 컴포넌트 분리 및 useGSAP() 개별 관리 추천):

### 전체 Home 구조 및 섹션 요약

| 순서 | 섹션명                 | 유형                 | GSAP 인터랙션             | Pin 여부 |
| ---- | ---------------------- | -------------------- | ------------------------- | -------- |
| 01   | Hero                   | Fullscreen Visual    | Typography + Video Reveal | X        |
| 02   | Introduction           | Brand Introduction   | Scroll Text Reveal        | O        |
| 03   | Support System         | Horizontal Slider    | Horizontal Scroll         | O        |
| 04   | Studio Showcase        | Image Gallery        | Pinned Image Transition   | O        |
| 05   | Creator Activity       | Creator Showcase     | Parallax Gallery          | X        |
| 06   | Transparent Settlement | Information Showcase | Sticky Content Reveal     | O        |
| 07   | Closing CTA            | Fullscreen Message   | Typography Reveal         | X        |

---

#### Section 01. Hero

- 브랜드의 첫인상, 타이포그래피+방송/스튜디오 영상 풀스크린 비주얼
- Fade-in, 아래→위 등장, 영상 Zoom, 텍스트 이동 등 Timeline 구성
- Pin 없이 자연스러운 인트로 효과

#### Section 02. Introduction

- 브랜드 철학, Sticky Typography Reveal
- "우리는 사람의 매력을 발견하고, 가능성을 함께 키워갑니다"
- 스크롤에 따라 문장 강조 및 Sequential Fade-in/out
- Pin: true, scrub, stagger 등 활용, 추천 스크롤 길이 150~200vh

#### Section 03. Support System

- 또바기에서 제공하는 지원 시스템 카테고리별 Horizontal Slider
- PDF 2~8p 내용(스튜디오/장비/운영/디렉팅/디자인/이벤트/뷰티 등)
- 실제 구현은 ScrollTrigger pin으로 고정 후 세로 스크롤→가로이동
- 카드 이동, 확대/축소, 진행 바, 마지막 카드에서 Pin 해제
- Benefits 등 다음 페이지로 연결되는 CTA도 포함

#### Section 04. Studio Showcase

- 경쟁 엑셀 스튜디오, 대형 엑셀 스튜디오 등 실제 시설 중심의 Pinned Gallery
- 각 스튜디오 이미지/설명, scale 및 clip-path로 트랜지션, 페이지 인디케이터
- Pin 구간 약 300~400vh

#### Section 05. Creator Activity

- 실제 소속 크리에이터의 방송 사례(방송화면/촬영 이미지) Parallax 갤러리
- PDF 9p 참고, 비대칭 카드 레이아웃
- 각 이미지별 다른 parallax + 등장/사라짐 효과, Pin 없이 일반 스크롤
- 실제 이미지 사용 전에는 사용 권한 체크

#### Section 06. Transparent Settlement

- 신뢰도를 강조하는 정산/운영 시스템(12p 실제 정산시스템 캡처 등)
- Sticky Content Reveal 방식, 메시지별 자동 전환
- Pin:true, scrub, autoAlpha, yPercent 등 활용(200~250vh)
- 실제 자료 사용시 민감 정보 표기 유의

#### Section 07. Closing CTA

- 브랜드 메시지+CTA+타이포그래피+대형 버튼
- 배경 이미지 zoom/fade, CTA 순차 등장
- Pin 없이 자연스러운 스크롤

---

### 최종 Home 컴포넌트 구조

```
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <IntroductionSection />
      <SupportSystemSection />
      <StudioShowcaseSection />
      <CreatorActivitySection />
      <SettlementSection />
      <ClosingSection />
    </main>
  );
}
```

각 섹션은 useGSAP() hook으로 개별 애니메이션 관리, DOM cleanup 필수.

---

### 서브페이지(About/Services/Equipment/Benefits) 구조 요약

- 각 페이지는 총 4개 섹션
- 각 섹션은 자신의 역할만 수행(슬라이드, 지도, 메시지 등)
- 일반 스크롤과 Pin/Sticky 효과를 혼용
- 모바일에서는 Pin 구간을 줄이고 세로 카드 슬라이더/스와이프로 변환 권장
- 장비지원, 지원혜택 페이지는 제공 대상·설명 차별화 필요
- 성형시술 등 민감 내용은 실제 제공 범위 확정 후 구체화

#### 예시: Services

```
export default function ServicesPage() {
  return (
    <main>
      <ServicesHeroSection />
      <ServicesOverviewSection />
      <ServicesSliderSection />
      <ServicesClosingSection />
    </main>
  );
}
```

---

### GSAP 설계/구현 원칙

| 항목          | 권장 방식                        |
| ------------- | -------------------------------- |
| Timeline      | 섹션별 useGSAP() 독립 관리       |
| ScrollTrigger | 섹션 내부에서 생성/파괴          |
| Pin           | 주요 인터랙션(Sticky,Slider)에만 |
| Cleanup       | context 기반 애니메이션 해제     |
| 반응형        | gsap.matchMedia() 활용           |
| 접근성        | prefers-reduced-motion 대응      |
| 이미지 로딩   | 레이아웃 확보, refresh 필요시    |

---

### 전체 페이지 인터랙션 요약

| 페이지    | 섹션          | 인터랙션                | Pin |
| --------- | ------------- | ----------------------- | --- |
| Home      | Hero          | Typography+Video Reveal | X   |
| Home      | Introduction  | Sticky Text Reveal      | O   |
| Home      | Support       | Horizontal Scroll       | O   |
| Home      | Studio        | Pinned Gallery          | O   |
| Home      | Creator       | Parallax Image Gallery  | X   |
| Home      | Settlement    | Sticky Content Reveal   | O   |
| Home      | Closing       | Typography+CTA Reveal   | X   |
| About     | Hero          | Typography Reveal       | X   |
| About     | Philosophy    | Sticky Text Reveal      | O   |
| About     | Brand Message | Sequential Typography   | O   |
| About     | Location      | Map Reveal              | X   |
| Services  | Hero          | Image Parallax          | X   |
| Services  | Overview      | Hover Image Preview     | X   |
| Services  | Slider        | Horizontal Scroll       | O   |
| Services  | Closing       | Image Zoom              | X   |
| Equipment | Hero          | Typography Reveal       | X   |
| Equipment | Showcase      | Product Transition      | O   |
| Equipment | Grid          | Stagger Grid Reveal     | X   |
| Equipment | Studio        | Fullscreen Image Reveal | X   |
| Benefits  | Hero          | Typography Reveal       | X   |
| Benefits  | Overview      | Asymmetric Grid Reveal  | X   |
| Benefits  | Sticky Cards  | Stacking Cards          | O   |
| Benefits  | Closing       | Background Reveal       | X   |

---

### 기획/설계 주안점

- Home은 요약이 아니라 실제 환경·운영·지원 사례 중심의 First Impression 페이지
- 각 섹션의 애니메이션·인터랙션은 GSAP ScrollTrigger/Timeline을 섹션 단위로 독립 관리
- 모바일은 Pin이나 가로 Scroll 효과를 세로/List/스와이프로 변환
- 페이지 역할 명확화
    - Home: 브랜드 신뢰/매력 시각화
    - About: 브랜드 철학, 회사 정보
    - Services: 매니지먼트/제공 서비스
    - Equipment: 방송 장비/스튜디오
    - Benefits: 지원 혜택 명확화
- 실제 이미지·방송화면·운영지표(정산) 등 강한 신뢰 요소 적극 활용

이렇게 구성할 경우, 모든 페이지가 각자의 스토리와 포인트를 갖게 되며, 특히 Home은 PDF에 드러난 실질적 운영력·방송 환경 등의 강점을 시각적으로 극대화해서 방문자 경험의 첫 순간을 압도할 수 있어.

---
