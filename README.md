
# VIT BFHL API (Express)

## What this does
Implements the `/bfhl` POST API required by the VIT Full Stack Question (classifies input, sums numbers, builds alternating-caps reversed string).

## Environment
Set these (locally or in your hosting dashboard):
- `FULL_NAME` — e.g. `mohith behara` (lower/upper doesn't matter)
- `DOB_DDMMYYYY` — e.g. `17091999`
- `EMAIL` — your email
- `ROLL_NUMBER` — your college roll

## Run locally
```bash
npm install
FULL_NAME="mohith behara" DOB_DDMMYYYY="17091999" EMAIL="you@vit.ac.in" ROLL_NUMBER="22BCE5001" npm start
```
Then test:
```bash
curl -s -X POST http://localhost:3000/bfhl   -H "Content-Type: application/json"   -d '{"data":["a","1","334","4","R","$"]}' | jq
```

## Deploy to Render (recommended)
1. Push these files to a new **public GitHub repo**.
2. Create a free Render account → **New** → **Web Service** → Connect your repo.
3. Build Command: `npm install`  
   Start Command: `npm start`
4. Add Environment Variables: `FULL_NAME`, `DOB_DDMMYYYY`, `EMAIL`, `ROLL_NUMBER`.
5. Deploy. Your endpoint will look like: `https://<your-service>.onrender.com/bfhl`

## Railway (alternative)
- Create a new project → Deploy from GitHub → Add the same environment variables → Deploy.
