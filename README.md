# 디펜스투데이 카드뉴스 HUB

인스타그램 카드뉴스의 "원문은 프로필 링크에서" 링크로 들어왔을 때 보이는 페이지입니다.
매일(또는 격일) 올리는 카드뉴스 게시물 1개마다 기사 1~여러 건을 묶어 보여주고, 카드를 누르면 원문이 새 탭으로 열립니다.

| 주소 | 내용 |
|---|---|
| `/` | 최근 7일 게시물 (최신순, 맨 위에 NEW) |
| `/report` | '주간 리포트' 탭: 최신 주 리포트. 표지의 **지난 리포트 보기**로 다른 주 선택, **URL 복사**로 고정 주소 복사 |
| `/report/2026-W46` | 그 주(월~일) 리포트: 표지·일자별 보도. 링크를 보내면 미리보기 이미지가 자동으로 붙음 |
| `/monthly` | '월간 리포트' 탭: 최신 달 리포트. 지난 리포트 보기·URL 복사는 주간과 같음 |
| `/monthly/2026-11` | 그 달 리포트: 표지·주차별 보도(각 주차에서 주간 리포트로 이동). 미리보기 이미지 자동 |
| `/archive` | 예전 주소. `/monthly` 로 자동 연결 |
| `/week/2026-W46` | 예전 주소. `/report/2026-W46` 으로 자동 연결 |
| `/admin` | 관리자 (발행·수정·삭제) |

각 게시물에는 날짜와 **뉴스 / 칼럼** 꼬리표가 붙습니다. 꼬리표는 디펜스투데이 기사 분류를 보고 자동으로 정합니다
(오피니언·밀리터리+ → 칼럼, 나머지 → 뉴스).

---

## 1. 게시물 올리는 법 (30초)

1. 브라우저에서 `사이트주소/admin` 으로 들어갑니다. (예: `https://via-media-ten.vercel.app/admin`)
2. 관리자 비밀번호를 넣고 **로그인**.
3. **새 게시물** 화면이 뜹니다. 날짜는 오늘로 자동 입력되어 있습니다. 다르면 고치세요.
4. **기사 주소** 칸에 디펜스투데이 기사 주소를 붙여넣습니다. 기사가 더 있으면 **+ 기사 추가**.
   - 붙여넣으면 0.5초 뒤 제목·사진·분류(뉴스/칼럼)가 자동으로 채워집니다.
   - 이상하면 **분류**, **제목**, **이미지 주소** 칸을 직접 고치면 됩니다.
     (이미지 주소는 기사 사진에 마우스 오른쪽 클릭 → "이미지 주소 복사")
   - ↑ ↓ 로 순서를 바꿀 수 있습니다.
   - **머리글**은 선택입니다. 비워 두면 날짜와 꼬리표만 보입니다.
5. 아래 **미리보기**를 확인하고 맨 아래 **발행**. 바로 메인 맨 위에 걸립니다.

**고치기·지우기**: 관리자 화면 아래 **발행한 게시물** 목록에서 **수정** 또는 **삭제**. 삭제는 확인 창이 한 번 뜹니다.

> 디펜스투데이(defensetoday.kr) 주소가 아니면 "디펜스투데이 기사 주소만 등록할 수 있습니다"라고 뜨며 등록되지 않습니다.

**주간 리포트**: 따로 만들 필요 없이, 그 주에 올린 게시물로 자동으로 채워집니다.
그 주 일요일까지는 '작성 중', 지나면 '발행 완료'로 표시됩니다.
표지에 2~3줄 요약을 넣고 싶으면 관리자 화면 **주간 리포트 에디터 노트**에서 주차를 고르고 쓴 뒤 **노트 저장** (비우면 표시 안 함).

**터미널에서 올리기** (개발자·Claude용): `npm run publish -- 기사주소1 기사주소2`
(`--date 2026-11-17`, `--topic "머리글"`, 저장 없이 확인만: `--dry-run`)

---

## 2. 필요한 환경변수

"환경변수"는 비밀번호·열쇠 같은 설정값입니다. 두 군데에 같은 값이 들어가 있어야 합니다.
- 내 컴퓨터: 프로젝트 폴더의 `.env.local` 파일
- 실제 사이트: Vercel → 프로젝트 → **Settings** → **Environment Variables**

| 이름 | 의미 | 어디서 구하나 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | DB 주소 | Supabase → 프로젝트 → **Project Settings** → **API** → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | DB 읽기용 공개 키 | 같은 화면의 `anon` `public` 키 |
| `SUPABASE_SERVICE_ROLE_KEY` | DB 쓰기용 비밀 키 (절대 공개 금지) | 같은 화면의 `service_role` 키 (**Reveal** 클릭) |
| `ADMIN_PASSWORD` | 관리자 비밀번호 | 직접 정합니다. 바꾸면 기존 로그인은 모두 풀립니다 |
| `CRON_SECRET` | DB 자동 중지 방지용 예약 작업의 암호 | 아무 긴 문자열 (예: 비밀번호 생성기로 32자) |
| `NEXT_PUBLIC_SITE_URL` | (선택) 공유 미리보기에 쓸 사이트 주소 | 예: `https://cardnews.defensetoday.kr`. 없으면 Vercel 주소를 자동 사용 |
| `NEXT_PUBLIC_ALLOWED_DOMAINS` | (선택) 허용 매체 도메인, 쉼표로 구분 | 없으면 `defensetoday.kr`. 매체를 늘릴 때만 (예: `defensetoday.kr,example.com`) |

> Supabase 무료 플랜은 1주일간 접속이 없으면 자동으로 멈춥니다. `CRON_SECRET`이 Vercel에 있어야
> 3일마다 자동으로 DB를 깨우는 예약 작업(`vercel.json`)이 동작합니다.

---

## 3. 내 컴퓨터에서 돌려보기

처음 한 번:

```bash
npm install
```

`.env.local` 파일에 위 표의 값을 넣은 뒤:

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 을 엽니다. 관리자는 `http://localhost:3000/admin`.

---

## 4. 처음 배포하기

이 저장소는 이미 GitHub(`godjonggil-lang/VIA-MEDIA`)와 Vercel, Supabase에 연결되어 있습니다.
새로 만드는 경우와 기존 연결을 쓰는 경우 모두 아래 순서대로 하면 됩니다.

### ① Supabase에 표 만들기 (처음 한 번)
1. [supabase.com/dashboard](https://supabase.com/dashboard) 로그인 → 프로젝트 클릭
   (새로 만들 때: **New project** → 이름 입력, 비밀번호 생성, Region은 **Northeast Asia (Seoul)** → **Create new project**)
2. 왼쪽 메뉴 **SQL Editor** → **New query**
3. 이 폴더의 `supabase/schema.sql` 파일 내용을 전부 복사해 붙여넣기 → 오른쪽 아래 **Run**
4. 같은 방법으로 `supabase/migrate-posts.sql`(게시물 표), `supabase/week-notes.sql`(리포트 노트 표)도 **Run**
5. "Success" 가 뜨면 끝. (여러 번 실행해도 괜찮습니다)

### ② Vercel에 환경변수 넣기
1. [vercel.com](https://vercel.com) 로그인 → 프로젝트 클릭
   (새로 만들 때: **Add New…** → **Project** → GitHub 저장소 옆 **Import**)
2. 위쪽 **Settings** → 왼쪽 **Environment Variables**
3. 2장 표의 이름과 값을 하나씩 넣고 **Save**. (Environments는 Production, Preview 모두 체크)
4. 이미 있는 값이면 오른쪽 **⋯** → **Edit** 으로 확인

### ③ 배포
- GitHub의 `main` 브랜치에 코드가 올라가면 Vercel이 자동으로 배포합니다.
- 환경변수를 바꾼 뒤에는 Vercel → **Deployments** → 맨 위 항목 **⋯** → **Redeploy** 를 한 번 눌러야 반영됩니다.

### ④ (선택) 주소 바꾸기
- **Vercel 주소 이름 바꾸기**: Vercel → **Settings** → **General** → **Project Name** 을
  `defensetoday-cardnews` 로 바꾸면 주소가 `defensetoday-cardnews.vercel.app` 이 됩니다.
  (**Settings** → **Domains** 에서 새 `.vercel.app` 주소가 붙었는지 확인)
- **회사 하위 도메인 쓰기**(무료): Vercel → **Settings** → **Domains** → `cardnews.defensetoday.kr` 입력 → **Add**.
  화면에 나오는 CNAME 값을 회사 도메인 관리 담당자에게 전달하면 됩니다.
- **GitHub 저장소 이름 바꾸기**: GitHub 저장소 → **Settings** → **Repository name** 수정 → **Rename**.
  Vercel 연결은 자동으로 따라갑니다.

---

## 5. 구조 메모 (개발자용)

- Next.js 16 (App Router) + TypeScript + Tailwind 4, DB는 Supabase(Postgres, `supabase-js`)
- `lib/config.ts` — 사이트명, **허용 도메인 목록**, 뉴스/칼럼 분류 규칙, 메인 표시 기간(7일)
- `lib/safe-fetch.ts` — 허용 도메인만 여는 fetch (리다이렉트 3회·매 단계 재검사, 8초, 5MB)
- `app/api/fetch-meta` — og:title/og:image 수집 (관리자 로그인 필요)
- `app/api/image` — 기사 이미지 프록시 (image/* 만 통과, SVG 제외, 장기 캐시)
- `lib/session.ts` — iron-session 서명 쿠키. `SESSION_SECRET`(32자 이상)을 따로 두지 않으면
  `ADMIN_PASSWORD`+`SUPABASE_SERVICE_ROLE_KEY` 로부터 유도
- `supabase/migrate-posts.sql` — 게시물 표(`posts`, `post_items`), RLS(공개 읽기만), 저장/삭제 함수.
  예전 주간 표(`weeks`, `items`, `supabase/schema.sql`)는 기록용으로 남아 있고 화면에서는 쓰지 않음
- `lib/report.ts`, `app/report/`, `app/monthly/` — 주간·월간 리포트. 표지는 `components/ReportCover.tsx`,
  공유 미리보기 이미지는 `lib/report-og.tsx` 를 함께 쓴다
  (한글 글꼴은 jsDelivr 의 Pretendard 서브셋을 런타임에 받아 씀)
- `scripts/publish.mjs` — 터미널 발행. 저장 후 `/api/revalidate`(service role 키에서 유도한 토큰)로 페이지 즉시 갱신
- 메인·아카이브는 ISR(10분) + 발행 시 `revalidatePath` 로 즉시 갱신
