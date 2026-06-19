# Name That Chant

A liturgical trivia drill: the opening notes of a famous Gregorian chant appear
as engraved notation, and you name the chant and its place in the liturgy from
four choices. You can also hear the snippet played back in an organ voicing.

**Scoring:** one point per correct identification; tracks streak, best streak
(saved in your browser), and accuracy. Streaks are kept separately from the
companion game, *Name That Organ Piece*.

## How to use it

- A short passage of notation appears at the top. Pick the matching chant from the
  four options (mouse, or number keys **1–4**).
- **▶ Hear it** plays the passage (a church-organ voicing via the bundled synth —
  needs an internet connection the first time, to fetch the instrument sounds).
- After answering, the chant's name, its liturgical use, and a note are revealed.
- **Enter** or **N** brings up the next chant.

No accounts, no sign-in, nothing leaves your browser.

## Editing the repertoire

All content lives in [`data/chants.js`](data/chants.js) — one block per chant,
each with its title, its liturgical `use` (which doubles as the mode label), a
note, and the opening notes in **ABC notation**. There's a cheat sheet at the top
of that file.

> The incipits shipped here are a **first-pass draft encoded from memory** — please
> verify each melody against the *Liber Usualis* and correct anything off. The
> notation never shows the title, so it doesn't give the answer away.

### How chant is notated here

Chant is unmetered and modal, so every entry uses `M:none` (no time signature),
`L:1/4` (a bare note is one beat; `|` marks a phrase division), and `K:C` (no key
signature). The church modes are white-note modes told apart by their *final*, not
by sharps or flats — the `use` field names the mode for each chant.

## What's bundled

- `vendor/abcjs-basic-min.js` — the [abcjs](https://abcjs.net) library (v6.4.4)
  that renders the notation and synthesizes playback. It's a single vendored file,
  so the page is fully self-contained (no build step, no backend).
- `vendor/abcjs.LICENSE` — abcjs is **MIT-licensed** (© 2009–2024 Paul Rosen and
  Gregory Dyke). MIT only requires that this copyright and permission notice ship
  alongside the code, which this file satisfies; you're free to use, deploy, and
  modify it, including for class. No attribution is required in the page UI.

## Possible future additions

- Square-note (neume) rendering instead of modern staves, for authenticity.
- A "type the answer" mode with forgiving text matching.
- A "harder" mode that shows fewer notes.
