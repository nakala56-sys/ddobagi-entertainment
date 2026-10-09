# GradientWave

WebGL로 화면 위쪽에 중심을 둔 큰 원의 반지름을 확장해 아래로 내려오는 원호 파동을 만듭니다.
`색상 1 → 흰색 → 색상 2 → 흰색 → …` 순서로 재생하며 색상끼리 혼합하지 않습니다.
흰색 파동이 화면 전체를 비운 뒤 다음 색상이 시작됩니다.
제목의 굴절·색 분리도 색상과 흰색 파동의 경계에 맞춰 렌더링합니다.
별도 라이브러리 없이 사용하며, 제목은 선택 가능한 HTML 텍스트로 유지됩니다.

```tsx
import { GradientWave } from "@/shared/ui/gradient-wave/GradientWave";

<GradientWave
    text={["당신만의 색깔.", "당신만의 무대."]}
    as="h2"
    className="px-8 py-24"
    textClassName="text-center text-4xl site:text-7xl leading-[round(up,1.25em,0.4rem)]"
    colors={["#91dff2", "#c8b9f4", "#eef08b", "#f5b8bd"]}
    speed={0.8}
    distortion={0.8}
>
    <p className="mt-8 text-center text-base">아래에 들어갈 설명</p>
</GradientWave>
```

| Prop | 용도 |
| --- | --- |
| `text` | 문장 문자열(`\n` 줄바꿈) 또는 줄 단위 배열. 긴 문장은 자동 줄바꿈 |
| `as`, `id` | 제목 태그(`h1`·`h2`·`h3`, 기본 `h2`)와 접근성 참조 ID |
| `className`, `textClassName` | 컨테이너와 제목의 Tailwind 스타일 |
| `colors` | 순서대로 재생할 6자리 HEX 색상 4개(밝은 색상 권장). 각 색상 뒤에는 흰색 파동이 옴 |
| `speed` | 상대 속도. 기본 `1`, `0`은 정지 |
| `distortion` | 굴절·색 분리 강도 `0`~`2`. 기본 `1` |
| `before`, `children` | 제목 위·아래에 넣을 콘텐츠 |

화면 밖이나 숨겨진 탭에서는 재생을 멈춥니다. 페이지 로더 안에서는
`page:reveal` 이후 재생합니다. 모션 감소 설정과 WebGL 미지원·컨텍스트 손실 시에는
정적인 그라데이션과 HTML 제목을 표시하고, 컨텍스트 복구 시 다시 렌더링합니다.
레이아웃·폰트 변경 시에만 텍스트 텍스처를 갱신하며 렌더링 배율은 최대 1.5입니다.
