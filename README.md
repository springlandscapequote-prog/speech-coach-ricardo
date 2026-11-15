# Ricardo's Speech Coach

Private, phone-first practice app for Ricardo, a salesperson for Spring Landscape and Winter Bright. It is a Spanish/English copy of the articulation and charisma coach, rewritten around sales calls: new leads, site visits, packages, price, objections, and the close.

Static files, no build step, no accounts, no analytics. Practice data stays in the browser (`localStorage` keys `ricardo-speech.v1.*` and IndexedDB `ricardo-speech-coach`). The default language is Español. Practice scripts, tongue twisters, and the teleprompter stay in English.

Open `index.html` on a phone, or add it to the home screen. GitHub Pages serves this folder from the repository root.

Phone checks, from the repo root:

```
python3 -m http.server 8765 --bind 127.0.0.1
NODE_PATH=/tmp/pw/node_modules BASE=http://127.0.0.1:8765/ node tests/phone.mjs
```
