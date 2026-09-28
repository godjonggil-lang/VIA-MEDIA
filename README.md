# 디펜스투데이 카드뉴스 HUB

인스타그램 카드뉴스의 "원문은 프로필 링크에서" 링크로 들어왔을 때 보이는 페이지입니다.
이번 주 기사 6건(국방안보 뉴스 3 + 안보 칼럼 3)을 보여주고, 카드를 누르면 원문이 새 탭으로 열립니다.

| 주소 | 내용 |
|---|---|
| `/` | 이번 주 카드뉴스 6건 |
| `/archive` | 이전 카드뉴스 (주차 목록, 최신순) |
| `/week/2026-W38` | 특정 주차 |
| `/admin` | 관리자 (발행·수정·삭제) |

---

## 1. 매주 업데이트하는 법 (2분)

1. 브라우저에서 `사이트주소/admin` 으로 들어갑니다. (예: `https://via-media-ten.vercel.app/admin`)
2. 관리자 비밀번호를 넣고 **로그인**.
3. **새 주차 발행** 화면이 뜹니다. 주차 ID(예: `2026-W40`)와 기간(`2026. 09. 28 - 10. 02`)은
   오늘 날짜로 자동 입력되어 있습니다. 다르면 고치세요. 주차 ID를 바꾸면 기간도 자동으로 바뀝니다.
4. **이주의 국방안보 뉴스** 1·2·3번 칸, **이주의 안보 칼럼** 1·2·3번 칸에
   디펜스투데이 기사 주소를 하나씩 붙여넣습니다.
   - 붙여넣으면 0.5초 뒤 제목과 사진이 자동으로 채워집니다.
   - 제목 끝의 " - 디펜스투데이"는 자동으로 지워집니다.
   - 제목이나 사진이 이상하면 그 아래 **제목**, **이미지 주소** 칸을 직접 고치면 됩니다.
     (이미지 주소는 기사 사진에 마우스 오른쪽 클릭 → "이미지 주소 복사")
5. 아래 **미리보기**에서 실제 화면과 똑같이 보이는지 확인합니다.
6. 맨 아래 **발행** 버튼을 누릅니다. 바로 메인에 걸리고, 지난주 것은 자동으로 "이전 카드뉴스"로 넘어갑니다.

**고치기·지우기**: 관리자 화면 아래 **발행한 주차** 목록에서 **수정** 또는 **삭제**를 누릅니다.
삭제는 확인 창이 한 번 뜹니다. "이번 주" 주차를 지우면 그 전 주차가 자동으로 "이번 주"가 됩니다.

> 디펜스투데이(defensetoday.kr) 주소가 아니면 "디펜스투데이 기사 주소만 등록할 수 있습니다"라고 뜨며 등록되지 않습니다.

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

샘플 데이터(2026-W38)를 넣으려면:

```bash
npm run seed
```

---

## 4. 처음 배포하기

이 저장소는 이미 GitHub(`godjonggil-lang/VIA-MEDIA`)와 Vercel, Supabase에 연결되어 있습니다.
새로 만드는 경우와 기존 연결을 쓰는 경우 모두 아래 순서대로 하면 됩니다.

### ① Supabase에 표 만들기 (처음 한 번)
1. [supabase.com/dashboard](https://supabase.com/dashboard) 로그인 → 프로젝트 클릭
   (새로 만들 때: **New project** → 이름 입력, 비밀번호 생성, Region은 **Northeast Asia (Seoul)** → **Create new project**)
2. 왼쪽 메뉴 **SQL Editor** → **New query**
3. 이 폴더의 `supabase/schema.sql` 파일 내용을 전부 복사해 붙여넣기 → 오른쪽 아래 **Run**
4. "Success" 가 뜨면 끝. (여러 번 실행해도 괜찮습니다)

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
- `lib/config.ts` — 사이트명, **허용 도메인 목록**, 섹션 정의
- `lib/safe-fetch.ts` — 허용 도메인만 여는 fetch (리다이렉트 3회·매 단계 재검사, 8초, 5MB)
- `app/api/fetch-meta` — og:title/og:image 수집 (관리자 로그인 필요)
- `app/api/image` — 기사 이미지 프록시 (image/* 만 통과, SVG 제외, 장기 캐시)
- `lib/session.ts` — iron-session 서명 쿠키. `SESSION_SECRET`(32자 이상)을 따로 두지 않으면
  `ADMIN_PASSWORD`+`SUPABASE_SERVICE_ROLE_KEY` 로부터 유도
- `supabase/schema.sql` — 테이블(`weeks`, `items`), RLS(공개 읽기만), 발행/삭제 함수(트랜잭션)
- 메인·아카이브는 ISR(10분) + 발행 시 `revalidatePath` 로 즉시 갱신
