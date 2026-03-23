# The Agile Athlete 🏃‍♂️

> 言い訳を、データに変える。肉体という最強のプロダクトをアジャイルに開発する。

## 🚀 Vercelデプロイ手順（10分でできる）

### Step 1: Supabase プロジェクト作成

1. [supabase.com](https://supabase.com) でアカウント作成 → 「New Project」
2. プロジェクト名: `agile-athlete`、DB Password をメモ
3. **SQL Editor** を開き、`supabase_migration.sql` の内容を全コピー→実行
4. **Authentication → Providers → Email** を有効化（Magic Link）
5. **Project Settings → API** から以下をコピー:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 2: GitHubにアップロード

1. GitHub で新リポジトリ作成（例: `agile-athlete`）
2. ZIPを解凍し、**中身のファイル**（app/, components/ など）を全選択
3. GitHubのリポジトリページにドラッグ＆ドロップ → Commit

   ⚠️ フォルダごとではなく**中身だけ**をアップロード！

### Step 3: Vercelにデプロイ

1. [vercel.com](https://vercel.com) でアカウント作成 → 「Add New Project」
2. GitHubリポジトリを選択 → Import
3. **Environment Variables** に以下を追加:
   ```
   NEXT_PUBLIC_SUPABASE_URL    = https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...
   ```
4. **Deploy** をクリック → 2〜3分でデプロイ完了！

---

## 🛠️ ローカル開発

```bash
# 依存インストール
npm install

# 環境変数設定
cp .env.local.example .env.local
# .env.local にSupabaseのURLとキーを記入

# 開発サーバー起動
npm run dev
# → http://localhost:3000
```

## 📁 ファイル構成

```
agile-athlete/
├── app/
│   ├── (app)/
│   │   ├── home/page.tsx      # ホーム（スプリント + バグログ）
│   │   ├── feed/page.tsx      # コミュニティフィード
│   │   ├── retro/page.tsx     # KPTレトロスペクティブ
│   │   └── profile/page.tsx   # プロフィール
│   └── api/
│       ├── bugs/route.ts      # バグ起票API
│       ├── sprints/route.ts   # スプリント管理API
│       ├── feed/route.ts      # フィードAPI
│       └── retros/route.ts    # レトロAPI
├── components/
│   ├── bug/
│   │   ├── BugFab.tsx         # +Bugボタン
│   │   ├── BugTracker.tsx     # バグ起票フロー統合
│   │   ├── BugList.tsx        # バグ一覧
│   │   └── AhaMoment.tsx      # Aha!アニメーション
│   ├── sprint/
│   │   ├── SprintCard.tsx     # スプリントカード
│   │   └── StatsRow.tsx       # 統計
│   └── ui/
│       ├── BottomSheet.tsx    # Bottom Sheet
│       └── BottomNav.tsx      # ナビゲーション
├── lib/
│   ├── supabase/              # Supabaseクライアント
│   └── master.ts              # マスターデータ
└── supabase_migration.sql     # DB初期設定SQL
```

## 🔄 修正・運用

| 修正したい箇所 | 編集ファイル |
|---|---|
| バグタグの種類 | `lib/master.ts` → BUG_TAGS |
| パッチの候補 | `lib/master.ts` → PATCHES |
| カラーテーマ | `app/globals.css` → :root |
| ホーム画面のレイアウト | `app/(app)/home/page.tsx` |
| アニメーション | `components/bug/AhaMoment.tsx` |

GitHubで直接ファイルを編集（鉛筆アイコン → Commit）するとVercelに自動反映されます。
