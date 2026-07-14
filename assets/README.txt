OFFICIAL ARTWORK — drop-in slots
================================

The app auto-loads these files if present. Add them here (same folder) and
commit + push. If a file is missing, the app shows a clean fallback instead.

  emblem.png    -> the official FIFA World Cup 2026 emblem (shown in the hero).
                   Transparent PNG or SVG works best. If you use SVG, rename the
                   <img> src in index.html to emblem.svg.
  mascot1.png   -> mascot artwork (e.g. Maple).   Transparent PNG, ~200px tall.
  mascot2.png   -> mascot artwork (e.g. Zayu).
  mascot3.png   -> mascot artwork (e.g. Clutch).
  panini.png    -> the "Official Sticker Collection" / Panini lockup (hero footer).

After adding files, bump the CACHE version in ../sw.js (v3 -> v4) so installed
phones pick up the change, then: git add -A && git commit && git push.

Note: the FIFA/Panini artwork is their trademark — fine to use on your own
personal album tracker; sourcing those image files is your call.
