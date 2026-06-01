# PRD — trinactremesel.cz (statický web)

**Verze:** 0.2
**Autor projektu:** Ondřej Pelikán
**Datum:** 2026-06-01

## Zamčená rozhodnutí (2026-06-01)

| # | Téma | Volba |
|---|---|---|
| 1 | Typografie | **Cesta A** — Poppins na všechno (kontinuita) |
| 2 | Barvy | **Achromatická paleta** — bílá / šedé / černá, jako současný web |
| 3 | Platby | **ComGate / GoPay** + malý backend na Cloudflare Workers |
| 4 | Fotky v1 | **Placeholdery** — Káťa kóduje proti šedým boxům, Ondřej dodá originály později |
| 5 | GitHub repo | název `13remesel` (zatím lokálně, remote později) |

Otevřené (nebrání startu): DPH status, Cloudflare účet, autor obchodních podmínek.

---

## 1. Cíl

Nahradit současný Squarespace web (trinactremesel.cz) ručně psaným statickým webem hostovaným na GitHub Pages. Web slouží jako vizitka a hlavní kanál pro získávání klientů na služby Ondřeje Pelikána — kurzy venkovských řemesel, „hodinový děd" a odborné prohlídky nemovitostí před koupí.

**Měřitelné cíle:**
- LCP < 1.5s na 4G mobilu (klíčový vstup je z mobilů).
- Lighthouse ≥ 95 ve všech čtyřech kategoriích (Performance, A11y, Best Practices, SEO).
- HTML editace bez znalosti build toolů — Ondřej musí umět změnit telefon nebo přidat odstavec sám.
- Zachování / zlepšení pozic na klíčové fráze (viz §7).

## 2. Non-goals

- Žádný CMS, žádný headless backend, žádná databáze.
- Žádný JS framework (React / Vue / Svelte / Astro / 11ty).
- Žádný rezervační kalendář ani správa termínů.
- Žádné více-jazyčné verze. Pouze čeština.
- Žádné uživatelské účty, komentáře, blog s archivy. (Blog je k diskuzi — viz §13.)

**Co JE in-scope (a dříve bylo z non-goals vyňato):**
- Platba předem za tři balíčky (500 / 7000 / 13 000 Kč) přes externí platební bránu. Viz §11a.

## 3. Cílovka

**Primární persona:** lidé 30–55 let, kteří kupují nebo zdědili starou chalupu na Vysočině / Sedlčansku / Písecku / Středočesku a netuší, co s tím. Často Pražáci stěhující se na venkov. Mají rozpočet, ale ne neomezený. Hledají někoho, kdo je nenatáhne a poradí svépomocí.

**Sekundární persona:** lidé hledající kurzy řemesel (řez ovocných stromů, sečení kosou, truhlářství), rodiče přemýšlející o domácím vzdělávání, lidé bez vlastní nemovitosti zvažující koupi.

**Vstupní kanály:** organický Google ("odborná prohlídka nemovitosti", "hodinový děd Písek", "kurz sečení kosou"), doporučení, sdílení.

## 4. Information architecture

Současný Squarespace má 3 stránky v menu. Doporučení: **zachovat tuto strukturu** a nepředělávat na 5–6 stránek (kurzy / prohlídky / hodinový děd zvlášť), protože:

- Veškerý obsah služeb je provázaný (jeden „Grunt" pokrývá i prohlídku i kurz).
- Long-form homepage s dobře strukturovanými H2 funguje na SEO srovnatelně s rozsekaným webem a je editorsky jednodušší.
- Tři H1 stránky = tři místa, kam Ondřej musí sahat při změně, ne osm.

**Struktura webu:**

| URL | Účel | Zdroj |
|---|---|---|
| `/` | Hero + 12 řemesel + jak to chodí + ceník + kontakt | `texty/01-homepage.md` |
| `/muj-pribeh/` | Životopisné vyprávění + vzdělání | `texty/02-about.md` |
| `/trinacte-remeslo/` | Báseň „Tohle musíš udělat co nejdřív" | `texty/03-trinacte-remeslo.md` |
| `/404.html` | Chybová stránka | nový |

**Globální navigace** (header na všech stránkách):
`Domov · Můj příběh · Třinácté řemeslo · Kontakt` (Kontakt = kotva `/#kontakt`)

**Patička** (na všech stránkách):
Kontakt, sídlo (Chyšky), telefon do 19h, e-mail, IBAN, copyright, odkaz na GitHub repo (volitelně).

## 5. Stránka po stránce

### 5.1 `/` (index.html)

**H1:** Třináct řemesel

**Bloky (v tomto pořadí):**

1. **Hero** — H1, podtitul, jedna velká fotka (autor v krajině / u chalupy), 2 CTA (`Zavolat 776 700 801` + `Napsat e-mail`).
2. **Sekce „Dvanáct a jedno řemeslo"** — 12 karet (Zednictví, Prohlídka nemovitosti, Voda, Historie domu, Les a krajina, Sečení, Zahrada, Truhlářství, Topení, Přiměřené technologie, Život na venkově, Svařování). Každá karta:
   - H2 + krátký nadpis-otázka
   - Hlavní text (2–4 odstavce)
   - `<details>`/`<summary>` akordeon „Otázky, které spolu probereme" (kde existují v textu).
   - Fotka.
3. **„Jak to chodí?"** — H2 + popis formátu návštěvy.
4. **„Kolik to teda stojí?"** — H2 + tři balíčky (500 / 7000 / 13 000 Kč) jako tři jasně oddělené karty.
5. **Kontakt (#kontakt)** — H2 + telefon, mail, číslo účtu, doprava, sleva-na-vyžádání.

**SEO:**
- `<title>`: „Třináct řemesel — kurzy, hodinový děd a prohlídky nemovitostí · Ondřej Pelikán, Chyšky"
- meta description: jeden odstavec opisující službu.
- JSON-LD: `LocalBusiness` + `Person`.

### 5.2 `/muj-pribeh/`

**H1:** Můj příběh

Vyprávění (cca 1300 slov) + sekce „Výběr ze vzdělání" jako `<ol>` / timeline. Jedna nebo dvě fotky.

`<title>`: „Můj příběh · Ondřej Pelikán | Třináct řemesel"
JSON-LD: `Person`, `ProfilePage`.

### 5.3 `/trinacte-remeslo/`

**H1:** Třinácté řemeslo
**Podtitul:** „I vlastnictví nemovitosti má svoji poezii. Poznejte opus, který vám ukáže, že nejste sami."

**Sazba básně:**
- Každý řádek = vlastní `<p>` nebo `<div class="verse">`.
- Vzdušné řádkování (line-height 1.7+, větší margin mezi verši).
- Centrované, max-width zhruba 32rem, větší serifová velikost.
- **Beze změny** — fonetická čeština („sme", „koupěj", „přiď") je záměr.
- Podpis kurzívou na konci: *(Ondřej Pelikán, 2024)*.

`<title>`: „Třinácté řemeslo — Tohle musíš udělat co nejdřív | Třináct řemesel"

### 5.4 `/404.html`

Krátká stránka, odkaz zpět na homepage. Hláška ve stylu webu (něco jako „Tady to končí jako ta silnice za vsí. Vraťte se.").

## 6. Design

### 6.1 Vizuální jazyk

- **Rustikální, autentický, řemeslný** — ne hipster-řemeslný (žádné stylizované sekery v ikonách), spíš poctivý.
- **Hodně bílého prostoru**, velké fotky, klidná typografie.
- **Mobile-first**, ale na desktopu nesmí být "nataženo" — max-width contentu okolo 70ch.

### 6.2 Typografie

**Co používá současný web (extrakce z trinactremesel.cz, 2026-06-01):**

- Jediný custom font: **Poppins** (Google Fonts).
- Načtené řezy: `400`, `400 italic`, `700`, `700 bold italic`.
- Poppins je **geometrický sans-serif** — použitý jak na nadpisy, tak na běžný text.

**Konflikt s původním zadáním:**
Původní brief: „serif na nadpisy, dobře čitelný sans na text." Aktuální web žádný serif nemá. Před implementací potřebujeme jednu z následujících cest:

- **Cesta A — kontinuita s původním webem:** Poppins na všechno. Plus: nulový vizuální skok pro vracející se návštěvníky, jeden font = menší payload. Mínus: méně rustikální, dál od briefu.
- **Cesta B — naplnit brief:** přidat serif na H1/H2. _Návrhy:_ **Source Serif 4**, **EB Garamond**, **Fraunces** (Fraunces má krásnou volitelnou kurzívu, mírně rustikální). Body Poppins (kontinuita) nebo Inter. Plus: blíž zadání, vlastnější tvář. Mínus: dva fonty = větší payload, vizuální posun.
- **Cesta C — celý font swap:** zahodit Poppins, použít pár jako **Fraunces + Inter**. Plus: nejvíc autorské, nejvíc rustikální. Mínus: největší skok, největší riziko regrese stylu.

→ Viz §13, otevřená otázka č. 13.

V každé cestě platí:
- **Self-host fontů** (subset s českou diakritikou) → žádný third-party request, lepší privacy a rychlost.
- Ověřit kompletní české znaky (ř, ě, ů, ž, š, č, ť, ď, ň).
- Báseň: serif nebo větší cut Poppins-u (1.25rem), záměrně vzdušné řádkování, kurzíva jen na podpis.

### 6.3 Barvy

**Co používá současný web (extrakce z site.css, HSL → HEX):**

| Squarespace token | HSL | HEX | Co to je |
|---|---|---|---|
| `--white` | `0, 0%, 100%` | `#FFFFFF` | bílá |
| `--lightAccent` | `0, 0%, 96.08%` | `#F5F5F5` | velmi světlá šedá |
| `--accent` | `0, 0%, 85.1%` | `#D9D9D9` | světlá šedá |
| `--darkAccent` | `0, 0%, 47.45%` | `#797979` | střední šedá |
| `--black` | `0, 0%, 0%` | `#000000` | černá |

**Klíčové zjištění:** paleta je **úplně achromatická**. Žádné hnědé, žádné zemité tóny, žádný „rustikální" akcent. „Rustikální" pocit aktuálně nese **typografie + fotografie + bílý prostor**, ne barva.

**Doporučení pro nový web:**
- Buď zachovat achromatičnost (kontinuita) a posílit rustikálnost čistě fotografií,
- nebo přidat **jeden teplý akcent** (např. `#7A3B2E` nebo `#8B4513` zemitě hnědá) pro linky a CTA — drobný posun, ale výrazně víc charakteru.

Pracovní paleta pro v1 (k odsouhlasení):

| Token | Hex | Použití |
|---|---|---|
| `--bg` | `#FFFFFF` | pozadí (čistě bílá, achromatická — žádné teplé tóny) |
| `--surface` | `#FFFFFF` | karty, panely |
| `--ink` | `#1A1A1A` | text |
| `--muted` | `#797979` | sekundární text (kontinuita s `--darkAccent`) |
| `--accent` | `#7A3B2E` | linky, CTA (volitelně — viz výše) |
| `--rule` | `#E5E5E5` | rámečky, oddělovače |

Tmavý režim: **NE** v první verzi.

### 6.4 Komponenty

- **Header**: jednoduchý, sticky volitelně. Mobilní menu = hamburger → fullscreen overlay (vanilla JS).
- **Karty řemesel**: vlevo / vpravo střídavá fotka + text, na mobilu vždy fotka nahoře.
- **Akordeon otázek**: nativní `<details>` (žádný JS, žádné ARIA dance).
- **Ceník**: tři karty vedle sebe (desktop) / pod sebou (mobil), prostřední lehce zvýrazněná (Grunt).
- **CTA tlačítka**: `tel:` a `mailto:` — žádný formulář ve fázi 1.

### 6.5 Fotky

- **Formát:** `<picture>` s AVIF + WebP fallback + JPEG fallback.
- **Velikosti:** 3 šířky (480 / 960 / 1600 px), `srcset` + `sizes`.
- **`loading="lazy"`** na vše pod foldem.
- **`width` + `height` atributy** povinné kvůli CLS.
- Originály do `assets/img/_src/`, vygenerované varianty do `assets/img/`. Build skript zařídí generování.

## 7. SEO

### 7.1 Klíčové fráze (k ověření v Search Console)

- "odborná prohlídka nemovitosti před koupí"
- "kurz sečení kosou"
- "kurz řezu ovocných stromů"
- "hodinový děd Písek" / "Chyšky" / "Sedlčany"
- "rekonstrukce staré chalupy svépomocí"
- "třináct řemesel" (brand)

### 7.2 Technické

- Každá stránka: unikátní `<title>` (≤ 60 znaků), `<meta name="description">` (≤ 160 znaků).
- Open Graph + Twitter Card pro každou stránku (vlastní OG obrázek 1200×630 v `assets/img/og/`).
- JSON-LD: `Person`, `LocalBusiness` (s adresou Chyšky, telefonem, otevírací dobou „do 19h"), `Service` pro každou ze tří hlavních služeb.
- `sitemap.xml` + `robots.txt`.
- Kanonické URL.
- Žádné `?utm_` parametry v interních odkazech.

### 7.3 URL migrace ze Squarespace

| Squarespace URL | Nová URL | Strategie |
|---|---|---|
| `/` | `/` | beze změny |
| `/muj-pribeh` | `/muj-pribeh/` | beze změny |
| `/nco-navc-1` | `/trinacte-remeslo/` | změna URL — vyžaduje 301 redirect |

**Problém:** GitHub Pages nepodporuje 301 redirecty. Možnosti:
- **A)** Cloudflare před GitHub Pages → udělat redirect rule (doporučeno).
- **B)** HTML meta-refresh + canonical na nové URL v souboru `nco-navc-1/index.html` (suboptimální, ale funguje).
- **C)** Smířit se se ztrátou linkjuice (URL je zjevně systémový slug, asi nemá moc backlinků).

Doporučuju **A** pokud má Ondřej Cloudflare. Jinak **B**.

## 8. Přístupnost (a11y)

- WCAG 2.1 AA jako cíl.
- Kontrast ≥ 4.5:1 pro text.
- Sémantické HTML (`<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`).
- `<html lang="cs">`.
- Skip-link na main.
- Klávesnice: každá interaktivní věc focusovatelná, viditelný focus ring.
- Alt texty u všech informativních obrázků; `alt=""` u dekoračních.
- Žádné karusely.
- Animace respektují `prefers-reduced-motion`.

## 9. Výkon

**Budget:**

| Metrika | Cíl |
|---|---|
| LCP (4G mobil) | < 1.5s |
| CLS | < 0.05 |
| INP | < 200ms |
| Total HTML+CSS na homepage | < 50 KB |
| Total JS na homepage | < 5 KB |
| Hero obrázek | < 80 KB (AVIF) |
| Webfonts | < 60 KB total, self-host, `font-display: swap` |

- Žádné externí trackery, žádný analytics by default (k diskuzi viz §13).
- CSS jeden soubor, žádný kritický CSS inline split — web je dost malý, aby to nebylo třeba.

## 10. Tech stack & build

### 10.1 Co je v repu

```
13remesel/
├── PRD.md
├── README.md
├── build.js                 # ~80 LOC, zero deps
├── _partials/
│   ├── head.html            # <head> šablona se sloty
│   ├── header.html
│   └── footer.html
├── _pages/                  # zdroje stránek (jen <main> obsah)
│   ├── index.html
│   ├── muj-pribeh.html
│   └── trinacte-remeslo.html
├── assets/
│   ├── css/{reset,tokens,style}.css
│   ├── js/main.js
│   ├── img/_src/            # originály (gitignored po commitu — nebo LFS)
│   ├── img/                 # vygenerované varianty (committed)
│   ├── fonts/
│   └── icons/
├── texty/                   # zdrojové texty v MD (referenční)
├── dist/                    # build výstup — to, co publikuje GH Pages
├── CNAME                    # trinactremesel.cz
├── robots.txt
├── sitemap.xml
└── 404.html
```

### 10.2 Build skript

`build.js` (Node, žádné dependencies):
1. Načte `_partials/{head,header,footer}.html`.
2. Pro každý soubor v `_pages/`: nahradí `<!-- HEAD -->`, `<!-- HEADER -->`, `<!-- FOOTER -->` placeholdery.
3. Vyplní per-page `{{title}}`, `{{description}}`, `{{ogImage}}` z front-matteru na začátku souboru.
4. Zapíše do `dist/`.
5. Vygeneruje `sitemap.xml`.

Build je idempotentní, spouští se `npm run build` (kde `package.json` má jen `"build": "node build.js"`).

### 10.3 Image pipeline (volitelné, ale doporučeno)

`build.js` zavolá `sharp` (jediná dependency) pro generování `srcset` variant z `_src/`. Pokud to budí odpor, jde to obejít manuálně přes Squoosh CLI.

**Otevřená otázka:** povolíme jednu dependency (`sharp`) pro images, nebo ne?

### 10.4 Lokální vývoj

`python3 -m http.server 8000` v `dist/`. Žádný dev server, žádný HMR.

## 11a. Platby — e-shop pro tři balíčky

**Cíl:** návštěvník může kliknout u jednoho ze tří balíčků na „Koupit" a zaplatit kartou bez dalšího dohadování.

**Tři produkty:**
| Balíček | Cena |
|---|---|
| Jen to naťuknout | 500 Kč |
| Setkání Grunt | 7 000 Kč |
| Grunt i glajcha | 13 000 Kč |

**Možnosti integrace** (k rozhodnutí — viz Open Questions):

- **A) Stripe Payment Links** *(doporučeno pro start)*
  - Ondřej si v Stripe Dashboardu vytvoří 3 produkty + 3 Payment Linky.
  - Tlačítka na webu jsou jen `<a href="https://buy.stripe.com/...">`.
  - **Plusy:** zero backend, hotovo za hodinu, Apple Pay / Google Pay / karta zdarma, automatická účtenka.
  - **Mínusy:** poplatek ~1.4% + 6 Kč na EU karty / 2.9% + 6 Kč non-EU; nemá Czech bank-button (online platba ČSOB/KB tlačítkem); UI v češtině je OK ale ne 100% lokalizované.

- **B) ComGate / GoPay**
  - Lokální české brány, mají bank-buttony („Platba 24") které Češi znají.
  - **Mínusy:** vyžaduje backend pro podepsání requestů → potřebujeme malou serverless funkci (Cloudflare Workers / Netlify Functions) → narušuje „čistě statický" princip.

- **C) QR platba + ručně**
  - Generujeme QR platbu (SPAYD) pro každý balíček s předvyplněnou částkou a VS.
  - Klient zaplatí ze své banky, Ondřej dostane info na účtu, ručně potvrdí.
  - **Plusy:** zero poplatky, zero integrace, statické.
  - **Mínusy:** žádná automatika, žádný callback, žádné karetní platby. Není to „e-shop", je to „zaplaťte si sami".

**Doporučení:** **A (Stripe Payment Links)** pro v1. Pokud po nějaké době Ondřej zjistí, že čeští klienti chtějí bank-button, přejde na B (s drobným backend doplňkem).

**UI v ceníku:**
- Pod každým ze tří balíčků dvě tlačítka:
  - **Zaplatit kartou** → Stripe Payment Link
  - **Domluvit jinak** → kotva na #kontakt
- Pod nimi malý text: „Po platbě se Ondřej ozve do 24 h s termínem."

**Fakturace / účetnictví:**
- Stripe pošle účtenku, ale faktura = doklad pro klientovo účetnictví → musí ji Ondřej stejně vystavit (z Fakturoidu / iDokladu).
- **Otevřená otázka:** je Ondřej plátce DPH? (Mění Stripe konfiguraci.)

**Right of withdrawal / GDPR:**
- E-shop s digitální/službou: 14denní právo na odstoupení. Doplnit krátkou stránku `/obchodni-podminky/` a `/ochrana-osobnich-udaju/`.

## 11. Hosting & deploy

- **GitHub Pages** z větve `main` nebo `gh-pages`.
- **Doména:** `trinactremesel.cz` (CNAME).
- **HTTPS:** automatické přes GitHub Pages.
- **Cloudflare** (volitelně) pro 301 redirecty + DDoS / cache.
- **Deploy:** GitHub Action která spustí `node build.js` a publikuje `dist/` (nebo přes GH Pages „Build from Actions").

## 12. Out of scope (verze 1)

- Blog / aktuality.
- Newsletter.
- Kalendář volných termínů.
- Online platby.
- Galerie realizací (může být v2).
- Reference / recenze (může být v2 — sbírat texty průběžně).
- Vícejazyčnost.

## 13. Otevřené otázky pro Ondřeje / Káťu

1. **Doména:** vlastní Ondřej `trinactremesel.cz` u nějakého registrátora? Půjde DNS přepnout na GitHub Pages?
2. **Cloudflare:** používá ho? (Klíčové pro 301 redirecty.)
3. **GitHub repo:** existuje už `13remesel` na GitHubu, nebo ho založíme nový?
4. **Analytics:** žádný / Plausible (placený, GDPR-friendly) / GoatCounter (open-source, free) / GA4 (s cookie lištou)? Doporučuju **GoatCounter**.
5. **Kontaktní formulář:** stačí `tel:` a `mailto:`, nebo chceme i formulář (Formspree / Web3Forms)?
6. **Fotky:** existují originály z fotografického vzdělání Ondřeje (SPŠG Hellichova)? Nebo budeme dělat fotku?
7. **Logo:** v `/logo.jpeg` máme rastr. Půjde dodat SVG nebo aspoň vyšší rozlišení?
8. **Favicon:** odvodit z loga, nebo navrhnout vlastní (např. monogram „13Ř")?
9. **OG obrázky:** generovat ručně pro 3 stránky, nebo automaticky build skriptem?
10. **Sharp jako jediná dep:** OK?
11. **Blog v budoucnu:** chce Ondřej psát, nebo to nikdy nepoužije? (Ovlivní to, jestli si rezervovat URL `/zapisky/`.)
12. **Cookie lišta:** pokud nepojede analytics + nepoužijeme webfonty z CDN → **nepotřebujeme** ji. Souhlas?
13. **Typografie — cesta A / B / C** (viz §6.2). Pro rozhodnutí pomůže: kolik váhu má pro Ondřeje kontinuita pro stávající návštěvníky vs. naplnění briefu „serif na nadpisy"?
14. **Akcentní barva:** nechat čistě achromatický web, nebo přidat zemitý teplý akcent (cca `#7A3B2E`)?
15. **Platební brána:** A (Stripe Payment Links) / B (ComGate + Workers) / C (jen QR platba)?
16. **DPH:** je Ondřej plátce? Ovlivňuje fakturaci v Stripe.
17. **Obchodní podmínky + GDPR text:** kdo je napíše? (Můžeme nadhodit vzorové texty, ale měl by je zkontrolovat někdo, kdo rozumí.)

## 14. Milníky

| # | Co | Výstup |
|---|---|---|
| M1 | PRD schválen | tento dokument |
| M2 | Design tokens + typografie + reset | `tokens.css`, `style.css` (kostra) |
| M3 | Build skript + partials | `build.js`, `_partials/*` |
| M4 | Homepage (bez fotek, lorem fotky) | `dist/index.html` |
| M5 | Můj příběh + Třinácté řemeslo | `dist/muj-pribeh/`, `dist/trinacte-remeslo/` |
| M6 | Fotky, OG obrázky, favicon | `assets/img/*` |
| M7 | SEO finalizace (JSON-LD, sitemap, OG) | hotové meta |
| M8 | Stripe Payment Links + tlačítka v ceníku | platba funguje |
| M9 | Obchodní podmínky + GDPR + 14denní odstoupení | `/obchodni-podminky/`, `/ochrana-osobnich-udaju/` |
| M10 | Lighthouse audit + a11y review | ≥ 95 / všechny barvy |
| M11 | Doména, DNS, deploy | žije na trinactremesel.cz |

---

*Tento dokument je živý. Změny rozhodnutí se promítají sem, ne do conversation logu.*
