# Codexa - Bosh Sahifa (Landing Page) Tavsifi

Bu hujjat Codexa loyihasining asosiy sahifasi (tizimga kirishdan oldingi landing page) haqida batafsil ma'lumot beradi. Sayt zamonaviy veb-dizayn standartlariga mos ravishda, yuqori sifatli animatsiyalar va premium "dark mode" (qorong'u rejim) estetikasida yaratilgan.

## 1. Sayt Strukturasi va Komponentlar

Saytning bosh sahifasi uzluksiz va silliq (smooth) o'tishlarga ega bo'lgan quyidagi asosiy qismlardan iborat:

*   **Loader:** Sayt yuklanayotganda ekranda paydo bo'ladigan progress bar va logotip. Animatsiya tugagach sahifa ochiladi.
*   **CustomCursor & MouseBackground:** Foydalanuvchi sichqonchasi harakatiga moslashadigan maxsus kursor va orqa fon interaktivligi.
*   **Navbar:** Yuqori navigatsiya paneli (menyu).
*   **Hero Section:** Asosiy ekran. "Biznesingizni Kelajakka Olib Chiqamiz" degan katta sarlavha, zarrachalar to'ri (ParticleGrid) va harakatga keltiruvchi (CTA) tugmalar joylashgan qism.
*   **Marquee:** Yuguruvchi qator (cheksiz aylanadigan matnlar yoki logotiplar).
*   **BusinessShowcase:** Biznes xizmatlari va imkoniyatlarini ko'rsatuvchi bo'lim.
*   **Process:** Ish jarayoni va bosqichlarini tushuntirib beruvchi qism.
*   **Comparison:** Boshqalardan ustunlik yoki "Oldin/Keyin" kabi taqqoslash bo'limi.
*   **Portfolio:** Qilingan ishlar va loyihalar galereyasi.
*   **Testimonials:** Mijozlar fikrlari va sharhlari.
*   **Numbers (Statistikalar):** 200+ loyihalar, 98% qoniqish, 5+ yillik tajriba kabi raqamlar aks etgan blok.
*   **CTA (Call to Action):** Foydalanuvchini harakatga chorlovchi yakuniy chaqiriq qismi (masalan, "Loyihani boshlash").
*   **Footer:** Saytning eng pastki qismi (havolalar, aloqa ma'lumotlari).

## 2. Dizayn va "UI/UX" Estetikasi

Sayt dizayni **Premium Dark Mode** (Qorong'u rejim) uslubida qurilgan bo'lib, o'zida quyidagi zamonaviy trendlarni jamlagan:

*   **Glassmorphism (Shisha effekti):** Kartalar va panellar orqa fonni biroz xiralashtirib (blur 40px, saturate 150%) shaffof shisha ko'rinishida ishlangan (`.glass-card`).
*   **Noise Overlay (Shovqin teksturasi):** Butun sayt foniga juda nozik shovqin teksturasi (SVG noise) berilgan. Bu saytga chuqurlik va tabiiy ko'rinish bag'ishlaydi.
*   **Tipografiya:** Asosiy shriftlar sifatida `Inter` va `Space Grotesk` (sarlavhalar uchun) ishlatilgan. Katta, aniq va o'qishga qulay matnlar ierarxiyasi qo'llanilgan.
*   **Gradiyentlar:** Matnlar va tugmalarda chiroyli yorqin gradiyentlar (Oqdan och ko'k ranggacha) ishlatilgan.

## 3. Ranglar Palitrasi (Colors)

Ranglar sxemasi qorong'u va futurisitik ruhda tanlangan:

*   **Orqa fon (Backgrounds):**
    *   Asosiy fon: `#050505` (Juda to'q qora)
    *   Ikkilamchi fonlar: `#0A0A0A`, `#111111`
*   **Matn ranglari (Text):**
    *   Asosiy: `#ffffff` (Oq)
    *   Ikkilamchi: `rgba(255, 255, 255, 0.7)`
*   **Aksent ranglar (Accent):**
    *   Asosiy aksent: `#00e5ff` (Yorqin moviy/Neon ko'k)
    *   Och aksent: `#e0f2fe`
*   **Glow va Gradiyentlar:**
    *   Oqdan kulrangga o'tuvchi asosiy gradiyent: `linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)`
    *   Neon ko'k yorqin gradiyent (Glow): `rgba(0, 229, 255, 0.15)`

## 4. Animatsiyalar va Interaktivlik

Saytda foydalanuvchini hayratda qoldirish uchun (WOW effekt) bir qancha ilg'or animatsiyalar ishlatilgan:

*   **Lenis Smooth Scrolling:** Odatiy qotib-qotib tushadigan skroll o'rniga, judayam silliq va inersiya bilan ishlaydigan skroll (Lenis kutubxonasi yordamida) o'rnatilgan.
*   **GSAP & ScrollTrigger:** Barcha komponentlar ekranga ko'ringan paytda (scroll qilinganda) paydo bo'lish animatsiyalari GSAP orqali qilingan. Masalan, matnlar pastdan yuqoriga aylanib chiqadi, rasmlar va panellar sekin yorishib paydo bo'ladi.
*   **Cinematic Entrance (Kino uslubidagi kirish):** Sayt birinchi marta yuklanganda sarlavhalar, tugmalar va statistikalar ma'lum bir kechikish (delay) bilan ketma-ket, xuddi kinolardagidek paydo bo'ladi.
*   **Magnetic Buttons (Magnit tugmalar):** Foydalanuvchi sichqonchasini tugmaga yaqinlashtirganda, tugma o'ziga tortilib, sichqoncha harakatiga moslashadi.
*   **Parallax Effekti:** Skroll qilinganda turli elementlar turli tezlikda harakatlanadi, bu esa 3D chuqurlik hissini beradi.
*   **Hover Effektlar:** Elementlar ustiga sichqoncha borganda (hover), yorqinlashish (glow) va yuqoriga ko'tarilish (translateY) kabi mikro-animatsiyalar qo'llanilgan.
*   **Pulse animatsiyasi:** Badge (Yorliq) lardagi miltillovchi nuqta (`badgePulse`).
