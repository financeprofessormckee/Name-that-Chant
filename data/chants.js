/*
 * Repertoire for "Name That Chant".
 *
 * Each entry is one famous Gregorian chant (all public-domain melodies). The
 * `abc` field holds the opening notes in ABC notation (https://abcnotation.com/)
 * — the tool renders it as an engraved staff and can play it back. Deliberately
 * NO title (T:) or composer (C:) line inside the abc, so the rendered score never
 * gives away the answer.
 *
 * --------------------------------------------------------------------------
 * NOTE TO THE MUSICIAN (verify against the Liber Usualis):
 * The incipits below are a FIRST-PASS DRAFT, encoded from memory. Chant is
 * unmetered and modal, so each is written as:
 *   - M:none          unmetered (no time signature, no barline rhythm implied)
 *   - L:1/4           a bare note is one beat; the | marks are phrase divisions
 *   - K:C             no key signature — the church modes are white-note modes,
 *                     told apart by their FINAL (the note a phrase comes to rest
 *                     on), not by sharps/flats. The `use` field names the mode.
 * Please check each melody and fix any wrong notes — it's just text. An ABC
 * cheat sheet:
 *   - C D E F G A B = the octave from middle C up;  c d e f g a b = next octave up
 *   - C, = octave down;  c' = octave up again
 *   - ^ = sharp, _ = flat, = = natural   (chant rarely needs more than _b / B-flat)
 *   - With "L:1/4" a bare letter is a quarter; A2 = half, A/ = eighth
 *   - | is a phrase division,  z is a rest
 * Add a chant by copying a block and filling it in. Four or more are needed so
 * each question has wrong answers to choose from.
 * --------------------------------------------------------------------------
 */

window.CHANT_PIECES = [
  {
    id: "dies-irae",
    title: "Dies irae",
    use: "Requiem sequence · Mode I",
    era: "Sequence, 13th c.",
    fact: "The medieval sequence for the Mass for the Dead. Its brooding opening motif is the most-quoted melody in all of Western music — Berlioz, Liszt, Rachmaninoff and a thousand film scores borrow it as a sign of doom.",
    abc: "X:1\nM:none\nL:1/4\nK:C\nF F E F | D E C D |]"
  },
  {
    id: "salve-regina",
    title: "Salve Regina",
    use: "Marian antiphon · Mode I",
    era: "Marian antiphon, 11th c.",
    fact: "The 'solemn tone' of the great closing antiphon to Our Lady, sung at Compline from Trinity to Advent. Traditionally ascribed to Hermann of Reichenau ('Hermann the Lame').",
    abc: "X:1\nM:none\nL:1/4\nK:C\nD F G A | G F G A |]"
  },
  {
    id: "veni-creator",
    title: "Veni Creator Spiritus",
    use: "Pentecost hymn · Mode VIII",
    era: "Hymn, 9th c.",
    fact: "The hymn to the Holy Spirit (ascribed to Rabanus Maurus), sung at Pentecost, ordinations, and the opening of a conclave or council.",
    abc: "X:1\nM:none\nL:1/4\nK:C\nG A c c | c B c d | c A c B | G2 |]"
  },
  {
    id: "pange-lingua",
    title: "Pange lingua gloriosi",
    use: "Corpus Christi hymn · Mode III",
    era: "Hymn, 13th c.",
    fact: "St Thomas Aquinas's hymn for Corpus Christi; its final two stanzas are the 'Tantum ergo' sung at Benediction of the Blessed Sacrament.",
    abc: "X:1\nM:none\nL:1/4\nK:C\nG A c c | B c A G | A c B G |]"
  },
  {
    id: "victimae-paschali",
    title: "Victimae paschali laudes",
    use: "Easter sequence · Mode I",
    era: "Sequence, 11th c.",
    fact: "The sequence for Easter Day, with its famous dialogue 'Dic nobis, Maria, quid vidisti in via?' — one of only a handful of sequences kept after the Council of Trent.",
    abc: "X:1\nM:none\nL:1/4\nK:C\nF F G F E D | F G A G F | F2 |]"
  },
  {
    id: "ave-maris-stella",
    title: "Ave maris stella",
    use: "Marian hymn · Mode I",
    era: "Hymn, 8th–9th c.",
    fact: "'Hail, star of the sea' — the Vespers hymn for Marian feasts, set countless times in polyphony (Dufay, Josquin, Monteverdi).",
    abc: "X:1\nM:none\nL:1/4\nK:C\nD F E D | C D F F | E G F E D | D2 |]"
  },
  {
    id: "puer-natus-est",
    title: "Puer natus est nobis",
    use: "Christmas introit · Mode VII",
    era: "Introit (Mass of the Day)",
    fact: "'Unto us a child is born' — the introit of the Mass of Christmas Day, its bright Mode VII matching the joy of the Nativity.",
    abc: "X:1\nM:none\nL:1/4\nK:C\nG c c d | c A c c | B c A G | G2 |]"
  },
  {
    id: "adoro-te-devote",
    title: "Adoro te devote",
    use: "Eucharistic hymn · Mode V",
    era: "Hymn, 13th c.",
    fact: "Another of Aquinas's Eucharistic hymns ('Godhead here in hiding'), a favorite for private devotion after Communion.",
    abc: "X:1\nM:none\nL:1/4\nK:C\nF G A c | A G F G | A2 |]"
  },
  {
    id: "ubi-caritas",
    title: "Ubi caritas et amor",
    use: "Maundy Thursday antiphon · Mode VI",
    era: "Antiphon, 8th–10th c.",
    fact: "Sung at the washing of feet on Holy Thursday: 'Where charity and love are, there God is.' Its gentle Mode VI refrain returns between verses.",
    abc: "X:1\nM:none\nL:1/4\nK:C\nF G A A | G F G A | F2 |]"
  },
  {
    id: "veni-veni-emmanuel",
    title: "Veni, veni Emmanuel",
    use: "Advent hymn · Mode I",
    era: "Melody, 15th c. (text earlier)",
    fact: "'O come, O come, Emmanuel' — the Advent paraphrase of the great 'O' Antiphons. The instantly recognizable tune comes from a 15th-century French processional.",
    abc: "X:1\nM:none\nL:1/4\nK:C\nE E G A B | B A B c B | A G A B G E |]"
  },
  {
    id: "kyrie-de-angelis",
    title: "Kyrie (Missa de Angelis)",
    use: "Mass VIII Ordinary · Mode V",
    era: "Mass Ordinary, c. 15th–16th c.",
    fact: "The Kyrie of the 'Missa de Angelis' (Mass VIII) — the best-known of all the chant Mass settings, the one most congregations can still sing from memory.",
    abc: "X:1\nM:none\nL:1/4\nK:C\nC E G G a | g f g a g |]"
  },
  {
    id: "requiem-aeternam",
    title: "Requiem aeternam",
    use: "Requiem introit · Mode VI",
    era: "Introit (Mass for the Dead)",
    fact: "'Eternal rest grant unto them, O Lord' — the introit that opens the Requiem Mass and gives it its name.",
    abc: "X:1\nM:none\nL:1/4\nK:C\nF G A A G | A G F | F2 |]"
  },
  {
    id: "regina-caeli",
    title: "Regina caeli",
    use: "Marian antiphon · Mode VI",
    era: "Marian antiphon, 12th c.",
    fact: "The Eastertide antiphon to Our Lady ('Queen of heaven, rejoice, alleluia'), which replaces the Angelus through the fifty days of Easter.",
    abc: "X:1\nM:none\nL:1/4\nK:C\nF G A c | A G A | G F |]"
  },
  {
    id: "asperges-me",
    title: "Asperges me",
    use: "Sprinkling rite · Mode IV",
    era: "Antiphon (Ps. 51)",
    fact: "Sung as the priest sprinkles the people with holy water before the principal Sunday Mass: 'Thou shalt sprinkle me, O Lord, with hyssop, and I shall be clean.'",
    abc: "X:1\nM:none\nL:1/4\nK:C\nG A G E | G A c A | G2 |]"
  }
];
