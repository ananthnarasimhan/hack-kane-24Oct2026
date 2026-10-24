# KaneCLI workflow

## Run the planner

Install dependencies with `npm install`, then start the browser app with
`npm run dev`. Vite serves the planner at `http://localhost:5173`. Use
`npm run build` to create a production build in `dist/`.

The planner is a frontend-only prototype. Build selections stay in memory for
the current page session and reset when the page is refreshed. Its Catalog is
synthetic demo data, not hardware advice.
The planner's aircraft and component images are synthetic illustrations made for
this prototype; they are not photos or specifications of manufacturer products.

KaneCLI is configured for the Test Manager destination **oct24 hackathon / oct
24 hackathon**. Local Chrome is available and the current account has an active
OAuth session.

## Requirements-to-tests

1. Put the approved product requirements (PRD, specification, or acceptance
   notes) in this repository.
2. Ingest the document with `kane-cli context ingest <path> --mode agent`.
3. Review the extracted use cases, then have KaneCLI design the runnable
   `_test.md` files. Do not hand-author test cases: this keeps every test tied
   to reviewed acceptance criteria.
4. Run an individual designed test with `kane-cli testmd run <path> --agent`,
   or the suite with `kane-cli testrun run <paths> --agent < /dev/null`.
5. Use `kane-cli cover` to measure requirement coverage and inspect sealed
   evidence after each execution.

## Local conventions

- Keep secrets and environment-specific values under `.testmuai/variables/`;
  that directory is intentionally ignored.
- Never commit `.context/` or `.testmuai/evidence/`.
- Add an application URL or start command before the first browser run. The
  current KaneCLI default URL is the KaneAI playground and should be replaced
  for this project when the target app is known.
