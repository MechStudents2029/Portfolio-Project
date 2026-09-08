# Adam — Portfolio Chatbot

A terminal-styled chat interface that answers questions about your real projects,
powered by the Claude API. Edit `lib/projects.js` to update what it knows about you.

## Get it running locally

```bash
npm install
```

Create a `.env.local` file (copy `.env.example`) and add your Anthropic API key:

```bash
cp .env.example .env.local
# then edit .env.local and paste your real key
```

Get a key at https://console.anthropic.com/ (Settings > API Keys) if you don't have one.

```bash
npm run dev
```

Open http://localhost:3000 — test it works before deploying.

## Deploy tonight (GitHub + Vercel, no CLI needed)

1. **Push this to a new GitHub repo:**
   ```bash
   git init
   git add .
   git commit -m "portfolio chatbot"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
   (Create the empty repo on github.com first, then copy its URL into the command above.)

2. **Go to https://vercel.com and sign in with GitHub.**

3. Click **Add New > Project**, select your new repo, and click **Import**.
   Vercel auto-detects Next.js — don't change any build settings.

4. Before clicking Deploy, expand **Environment Variables** and add:
   - `ANTHROPIC_API_KEY` = your real key

5. Click **Deploy**. In ~60 seconds you get a live URL like
   `your-repo.vercel.app`.

6. Any time you `git push` again, Vercel redeploys automatically.

## Adding your GitHub projects with real links

Open `lib/projects.js` and fill in the empty `link: ""` fields with your repo URLs
(e.g. `https://github.com/MechStudents2029/Hardware-project`). You can also add
more projects to the array — no other code needs to change.

## Notes

- The bot only ever says what's in `lib/projects.js` — it's instructed not to
  invent facts, so it's safe to leave running unattended.
- Swap `"model": "claude-sonnet-5"` in `app/api/chat/route.js` for a cheaper
  model like `"claude-haiku-4-5-20251001"` if you want to cut API costs.
