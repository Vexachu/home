
# KidCoder Starter (Multipage)
A simple, calm‑blue multipage site for beginner-friendly coding lessons.

## Structure
- `index.html` — homepage with lesson cards
- `assets/style.css` — theme & layout
- `assets/app.js` — tabs + editor wiring
- `lessons/intro/index.html` — lesson with tabs and in‑browser editors (JS + Python via Skulpt CDN)
- `lessons/typing/index.html` — minimal typing practice
- `lessons/why-code/index.html` — slide‑style motivation cards

## Notes
- Python runs in‑browser using Skulpt (via CDN). Turtle draws into the `#py-canvas` div.
- JS runs inside a sandboxed iframe. `console.log` output appears in the console panel.
- You can add more lessons by copying a lesson folder and editing content.
- Color scheme sticks to calm blues; tweak `:root` vars in `assets/style.css`.
