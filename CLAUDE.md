# trinactremesel.cz

Statický web pro Ondřeje Pelikána (kurzy venkovských řemesel, hodinový děd,
odborné prohlídky nemovitostí). Zero-framework, zero-deps. Zdroj pravdy pro
produktová rozhodnutí je **`PRD.md`** (v0.3) — čti ho před větší úpravou obsahu.

Obecné preference k mému stylu práce a estetice jsou v `~/.claude/CLAUDE.md`
(achromatická paleta, poměr fotek, Brave/adblock past atd.) — platí i tady.

## Stack a build

- Vanilla HTML/CSS/JS, žádný framework, žádný bundler.
- `build.js` (ESM) skládá `_partials/{head,header,footer}.html` + `_pages/*.html` → `docs/`.
- Front-matter je v HTML komentáři `<!--meta ... -->` na začátku každé stránky v `_pages/`.
- Příkazy:
  - `npm run build` — lokální cesty (`/assets/...`), pro Forpsi FTP deploy
  - `npm run build:ghpages` — `BASE_PATH=/13remesel`, pro GitHub Pages
  - `npm run serve` — `docs/` na `localhost:8000` (python http.server)
- **`docs/` je generovaný výstup, needituj ho ručně** — vždy uprav zdroj v `_pages/`/`_partials/`/`assets/` a přebuildni.

## Deploy (dvojí, přes `.github/workflows/deploy.yml`)

Push na `main` spustí dvě paralelní jobs:
1. **GitHub Pages** — `build:ghpages` → `docs/` → GH Pages (koci-sabachova.github.io/13remesel/).
2. **Forpsi FTP** — `build` (normální cesty) → FTP na `ftpx.forpsi.com`, produkční doména **www.trinactremesel.cz**. Heslo v repo secretu `FTP_PASSWORD`.

Takže custom doména už neběží přes GitHub Pages/Cloudflare DNS (jak plánovalo staré PRD M11) — je na Forpsi hostingu, GH Pages běží souběžně jako záloha/staging pod `/13remesel/`.

## Struktura

- `_pages/{index,muj-pribeh,obchodni-podminky,svatba,trinacte-remeslo}.html`
- Odkaz „Třinácté řemeslo" v hlavní navigaci (`_partials/header.html`) vede na interní
  `/trinacte-remeslo/` — celá báseň "Tohle musíš udělat co nejdřív" je znovu na stránce (obnoveno
  8. 9. 2026, byla mezitím krátce nahrazená proklikávací stránkou jen s odkazem na Ondřejův web).
  Hero má nadpis "I vlastnictví nemovitosti má svoji poezii..." a hned pod ním malý odkaz
  `www.ondrapelikan.cz →` na Ondřejův osobní web (`.poem-out__url` v `assets/css/style.css`) —
  odkaz zůstal, jen se přesunul k nadpisu místo pod celou báseň/jako obal celého hera.
  Zdrojový text básně je i v `texty/03-trinacte-remeslo.md` (autorská hovorová čeština — nespisovňovat).
- `_partials/{head,header,footer}.html`
- `assets/css/{reset,tokens,style,fonts}.css`, `assets/js/main.js`, `assets/img/`
- `texty/0X-*.md` — referenční texty od Ondřeje
- `PRD.md` — produktová rozhodnutí, single source of truth

## ⚠️ Stránka `svatba` je jiný projekt ve stejném repu

`_pages/svatba.html` + `svatba-galerie/` + `svatba/` (fotky, projevy, PDF pozvánka) jsou
**soukromá svatební stránka** (fotogalerie + vyznání), heslem/gate chráněná, `noindex, nofollow`.
Nesouvisí s byznysem Třinácti řemesel — nepřidávat do hlavní navigace, nelinkovat z SEO obsahu,
neřešit v kontextu Ondřejova řemeslného positioningu. Galerie se generuje buildem
z `assets/img/svatba/foto-XXX-{full,thumb}.jpg` + manifest.

## Otevřené TODO (ověřeno v kódu, ne jen z paměti)

- **Platby:** `_pages/index.html` má stále placeholdery `STRIPE_LINK_NATUKNOUT` / `STRIPE_LINK_GRUNT` / `STRIPE_LINK_GLAJCHA` — čeká se, až Ondřej v Stripe Dashboardu vytvoří 3 produkty a vygeneruje Payment Links.
- **GDPR:** stará poznámka tady tvrdila, že `obchodni-podminky.html` odkazuje na neexistující `/ochrana-osobnich-udaju/` — ověřeno 8. 9. 2026, že to už neplatí: GDPR obsah je přímo v `obchodni-podminky.html` bodě 9, žádný takový odkaz/chybějící stránka v kódu není.
- Žádný `CNAME` soubor v repu (custom doména jde přes Forpsi FTP job, ne přes GH Pages CNAME mechanismus — to je v pořádku, jen si to nepamatovat obráceně).

## Poznámky k obsahu

- Báseň „Třinácté řemeslo" (dřív na zrušené stránce, teď jen v `texty/03-trinacte-remeslo.md`) je záměrně v obecné/hovorové češtině — nespisovňovat, autorský záměr.
- Kontakt Ondřeje: tel 776 700 801 (do 19h), e-mail ondrej@trinactremesel.cz, IČO 87057239, neplátce DPH, adresa **Ratibořec 1, 398 53 Chyšky** (opraveno 8. 9. 2026 — dřív tu byl nesouhlasící údaj "Chyšky 1, 399 01 Chyšky – Ratibořec"; tahle verze sedí napříč `index.html`, `muj-pribeh.html` i `obchodni-podminky.html`).
- Anti-spam: e-mailové odkazy jdou přes `.js-mail` s `data-u`/`data-d`, sestaví se v `main.js` po loadu — žádný `@` v HTML zdroji. Viz i obecná Brave/adblock poznámka v globálním CLAUDE.md pro pojmenovávání assetů.

## SEO (stav k 8. 9. 2026)

Podrobný protokol (co je hotové, anotovaný JSON-LD, co se dá dělat dál) je v
artefaktu poslaném Kateřině — shrnutí zde pro budoucí referenci:

- Title/meta description na `index.html` doplněny o spádové město (Milevsko).
- `areaServed` v JSON-LD rozšířeno o 7 okresních měst Jihočeského kraje + Milevsko
  (vedle původních 3 krajů) — reálná spádová oblast, ne nasypaná klíčová slova.
- Zkoušely jsme keyword "kicker" (`<h1 class="hero__kicker">` nad heslem "Jsem
  Ondřej Pelikán.") a doplněný seznam otázek u sekce `id="prohlidka"` — obojí
  zase odstraněno 8. 9. 2026 na žádost Kateřiny, Ondřej si texty přepíše sám.
  Hero je zpátky v původním stavu (`<h1 class="hero__title">Jsem Ondřej Pelikán.</h1>`).
- `knowsAbout`/skryté "Číst dál" seznamy u řemesel: NEcpat tam nové vymyšlené
  věci — fungují, jen když sedí na to, co je fakticky na stránce.
- Opraven nesoulad v `obchodni-podminky.html` bodě 9 — tvrdil "web nepoužívá žádné
  analytické ani reklamní cookies", ačkoliv `head.html` na všech stránkách načítá
  GA4 (`G-0MVQLS3BZB`). Text teď GA4 přiznává.
