import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "@/App.css";
import { Phone, MessageSquare, Mail, Gift, Facebook, MapPin, ArrowUpRight, Star, X, ChevronLeft, ChevronRight } from "lucide-react";

const BOOKING_URL = "https://charmedbeauty918.glossgenius.com/booking-flow";
const PHONE_DISPLAY = "(732) 955-9096";
const PHONE_TEL = "tel:+17329559096";
const PHONE_SMS = "sms:+17329559096";
const EMAIL = "Charmedbeautynj@gmail.com";
const EMAIL_HREF = "mailto:Charmedbeautynj@gmail.com";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=1201+Hooper+Ave+Sola+Salon+Studios+Toms+River+NJ+08753";
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Charmed+Beauty+9+%26+18+Toms+River+NJ+08753";

/* ---- Full service menu (real studio menu, booked through GlossGenius) ---- */
const MENU = [
  {
    id: "cuts",
    num: "A",
    title: "Cuts & Styling",
    blurb: "Shape engineered around bone structure and growth pattern.",
    items: [
      { name: "Women's Haircut & Blow-Dry", note: "Curling iron / flat iron extra", time: "30 min", price: "$50+" },
      { name: "Women's Haircut — No Blow-Dry", note: "", time: "30 min", price: "Price varies" },
      { name: "Men's Haircut", note: "", time: "30 min", price: "$25" },
      { name: "Kids Haircut (9 yrs & younger)", note: "Blow-dry extra", time: "30 min", price: "$22+" },
      { name: "Bang Trim", note: "", time: "15 min", price: "$10+" },
      { name: "Blow-Out", note: "", time: "30 min", price: "$45+" },
      { name: "Blow-Out with Curls", note: "", time: "60 min", price: "$55+" },
      { name: "Curls", note: "", time: "60 min", price: "Price varies" },
    ],
  },
  {
    id: "color",
    num: "B",
    title: "Colour & Dimension",
    blurb: "Hand-mapped formulas, custom toning, honest grow-out.",
    items: [
      { name: "Single Process Color", note: "Root touch-up. Toners & long hair extra", time: "90 min", price: "$65+" },
      { name: "Full Foil Highlights", note: "Toners, root tap / smudge & long hair extra", time: "120 min", price: "$165+" },
      { name: "Partial Foil Highlights", note: "Toners, root tap / smudge & long hair extra", time: "90 min", price: "$115+" },
      { name: "Face Frame Foil", note: "Toners, root tap / smudge & long hair extra", time: "45 min", price: "Price varies" },
      { name: "Balayage / Foilayage", note: "Toners, root tap / smudge & long hair extra", time: "120 min", price: "$195+" },
      { name: "Balayage Face Frame", note: "Toners, root tap / smudge & long hair extra", time: "45 min", price: "Price varies" },
      { name: "Full Foil Babylights", note: "Toners, root tap / smudge & long hair extra", time: "90 min", price: "$195+" },
      { name: "Partial Babylights", note: "Toners, root tap / smudge & long hair extra", time: "120 min", price: "$150+" },
      { name: "Lowlights", note: "Toners, root tap / smudge & long hair extra", time: "60 min", price: "$85+" },
      { name: "Double Process", note: "", time: "120 min", price: "Price varies" },
      { name: "Fantasy Colors", note: "Vivids, colour melts, creative placement", time: "120 min", price: "Price varies" },
      { name: "Toner / Glaze", note: "", time: "45 min", price: "$35+" },
      { name: "Glaze with Blow-Out", note: "", time: "90 min", price: "$75+" },
    ],
  },
  {
    id: "treatments",
    num: "C",
    title: "Treatments & Texture",
    blurb: "Repair and smoothing that holds through your routine.",
    items: [
      { name: "Keratin Treatment", note: "Months of glass-smooth, humidity-proof hair", time: "120 min", price: "$250" },
      { name: "K18 Treatment — Add-On", note: "Molecular repair after lightening", time: "25 min", price: "$45" },
      { name: "Perms", note: "Haircut and blow-dry not included", time: "90 min", price: "Price varies" },
    ],
  },
  {
    id: "occasion",
    num: "D",
    title: "Occasion & Bridal",
    blurb: "Event architecture for hair — weddings, proms, photoshoots.",
    items: [{ name: "Updo", note: "Bridal party & trial runs by request", time: "60 min", price: "$95+" }],
  },
];

/* ---- Real client work (photographed in-studio) ---- */
const FILTERS = [
  { id: "all", label: "All Work" },
  { id: "color", label: "Colour" },
  { id: "occasion", label: "Occasion & Bridal" },
  { id: "cuts", label: "Cuts & Styling" },
  { id: "transformations", label: "Transformations" },
];

const WORK = [
  { n: 1, cat: "occasion", alt: "Soft blonde curled occasion updo styled at Charmed Beauty 9 & 18 in Toms River NJ", label: "Soft Curled Updo", svc: "Updo" },
  { n: 2, cat: "occasion", alt: "Bridal updo with pearl hairpiece created in Toms River NJ", label: "Bridal Pearl Updo", svc: "Updo" },
  { n: 3, cat: "cuts", alt: "Precision layered short cut on silver hair", label: "Layered Short Cut", svc: "Women's Haircut" },
  { n: 4, cat: "cuts", alt: "Textured dark short haircut with soft volume", label: "Textured Short Cut", svc: "Women's Haircut" },
  { n: 5, cat: "color", alt: "Violet fantasy hair colour applied at a Toms River NJ salon", label: "Violet Fantasy Colour", svc: "Fantasy Colors" },
  { n: 6, cat: "transformations", alt: "Before and after blonde balayage transformation", label: "Balayage Transformation", svc: "Balayage / Foilayage" },
  { n: 7, cat: "cuts", alt: "Men's skin fade haircut", label: "Men's Skin Fade", svc: "Men's Haircut" },
  { n: 8, cat: "occasion", alt: "Bridal half-up style finished with fresh florals", label: "Bridal Half-Up", svc: "Updo" },
  { n: 9, cat: "occasion", alt: "Dark curls pinned into a half-up occasion style", label: "Pinned Half-Up", svc: "Updo" },
  { n: 10, cat: "transformations", alt: "Brunette to blonde colour transformation before and after", label: "Brunette To Blonde", svc: "Balayage / Foilayage" },
  { n: 11, cat: "color", alt: "Teal and violet colour melt on long hair", label: "Teal Violet Melt", svc: "Fantasy Colors" },
  { n: 12, cat: "occasion", alt: "High volume blonde updo for a formal event", label: "Volume Updo", svc: "Updo" },
  { n: 13, cat: "cuts", alt: "Blonde layered blow-out with movement", label: "Layered Blow-Out", svc: "Blow-Out" },
  { n: 14, cat: "occasion", alt: "Braided formal updo with crystal pin", label: "Braided Formal Updo", svc: "Updo" },
  { n: 15, cat: "color", alt: "Vivid magenta hair colour on long straight hair", label: "Magenta Vivid", svc: "Fantasy Colors" },
  { n: 16, cat: "occasion", alt: "Dimensional bronde curls styled half-up", label: "Dimensional Curls", svc: "Blow-Out with Curls" },
  { n: 17, cat: "occasion", alt: "Bridal curled updo finished with pins", label: "Bridal Curled Updo", svc: "Updo" },
  { n: 18, cat: "occasion", alt: "Braided blonde updo for a wedding party", label: "Braided Blonde Updo", svc: "Updo" },
  { n: 19, cat: "cuts", alt: "Dark cropped pixie cut with texture", label: "Cropped Pixie", svc: "Women's Haircut" },
  { n: 20, cat: "cuts", alt: "Blonde pixie cut with soft layers", label: "Blonde Pixie", svc: "Women's Haircut" },
  { n: 21, cat: "cuts", alt: "Ash blonde layered bob with soft waves", label: "Ash Blonde Bob", svc: "Women's Haircut" },
];

const REVIEWS = [
  {
    quote: "Always accommodating, amazing colorist, does exactly what you want and makes you feel like family.",
    name: "Debbie King",
    tag: "Verified Client Review",
  },
  {
    quote:
      "Joanne is amazing! Always providing great feedback on ideas and how they'll look — suggestions when you just want a change and don't know what. Love her!!",
    name: "Odette",
    tag: "Verified Client Review",
  },
  { quote: "I love leaving feeling refreshed! Andrea knows what works and it's always great!!", name: "Melody", tag: "Verified Client Review" },
  { quote: "Love Joanne, she's the best!", name: "Maria", tag: "Verified Client Review" },
];

const HOURS = [
  ["Monday", "9:00 AM — 5:00 PM"],
  ["Tuesday", "9:00 AM — 5:00 PM"],
  ["Wednesday", "9:30 AM — 7:00 PM"],
  ["Thursday", "9:30 AM — 5:00 PM"],
  ["Friday", "9:30 AM — 3:00 PM"],
  ["Saturday", "9:00 AM — 3:00 PM"],
  ["Sunday", "Closed"],
];

const TEAM_PHONES = [
  ["Joanne", "(732) 330-4850", "tel:+17323304850"],
  ["Andrea", "(732) 955-9096", "tel:+17329559096"],
  ["Lisa", "(732) 678-8547", "tel:+17326788547"],
  ["Phyllis", "(732) 581-6319", "tel:+17325816319"],
];

const TOWNS = [
  ["Toms River", "5 min"],
  ["Brick", "15 min"],
  ["Beachwood", "10 min"],
  ["Pine Beach", "10 min"],
  ["Island Heights", "10 min"],
  ["Bayville", "15 min"],
  ["Lakewood", "20 min"],
  ["Seaside Heights", "20 min"],
  ["Lavallette", "20 min"],
  ["Point Pleasant", "25 min"],
  ["Jackson", "25 min"],
  ["Forked River", "25 min"],
  ["Manahawkin", "35 min"],
];

/* Scroll-reveal wrapper: entrance-only motion */
const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("is-visible"), delay);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

const BookLink = ({ href = BOOKING_URL, className = "", testId, label, children }) => (
  <a data-testid={testId} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={className}>
    {children}
  </a>
);

/* ---------------- Header ---------------- */
const NAV = [
  ["01", "Manifesto", "#manifesto"],
  ["02", "The Work", "#work"],
  ["03", "Full Menu", "#menu"],
  ["04", "Gift Cards", "#gift-cards"],
  ["05", "Reviews", "#reviews"],
  ["06", "Artists", "#artists"],
  ["07", "Visit", "#location"],
];

const Header = () => (
  <header className="border-b border-[#2E2E36] bg-[#000000]/95 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
      <a href="#hero" data-testid="header-brand" className="flex items-center space-x-2 sm:space-x-3 shrink-0">
        <span className="w-3 h-3 bg-[#D4A373] shrink-0" aria-hidden="true"></span>
        <span className="font-manifesto tracking-tight text-[13px] sm:text-base xl:text-lg uppercase text-white whitespace-nowrap">Charmed Beauty 9 &amp; 18</span>
      </a>
      <nav aria-label="Section navigation" className="hidden lg:flex items-center justify-center flex-1 gap-4 xl:gap-7 text-[11px] xl:text-xs font-mono uppercase tracking-widest text-[#B6B6C0]">
        {NAV.map(([, label, href]) => (
          <a
            key={href}
            data-testid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
            href={href}
            className="whitespace-nowrap hover:text-white transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>
      <BookLink
        testId="header-book-btn"
        label="Book an appointment online"
        className="px-3 sm:px-5 py-2 bg-[#D4A373] text-black text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shrink-0"
      >
        <span className="sm:hidden">Book</span>
        <span className="hidden sm:inline">Book Online</span>
      </BookLink>
    </div>
    <nav aria-label="Quick section navigation" className="lg:hidden border-t border-[#2E2E36] overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-5 px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-[#B6B6C0] w-max">
        {NAV.map(([, label, href]) => (
          <a key={href} data-testid={`mobile-nav-${label.toLowerCase().replace(/\s+/g, "-")}`} href={href} className="whitespace-nowrap hover:text-white transition-colors">
            {label}
          </a>
        ))}
      </div>
    </nav>
  </header>
);

/* ---------------- Hero ---------------- */
const Hero = () => (
  <section
    id="hero"
    data-testid="hero-section"
    aria-labelledby="hero-headline"
    className="relative overflow-hidden pt-10 pb-16 md:py-40 px-6 border-b border-[#2E2E36] md:min-h-[92vh] flex items-start md:items-center"
  >
    <div className="hero-grid" aria-hidden="true"></div>
    <div className="hero-scan" aria-hidden="true"></div>

    <div className="hero-photo hidden md:block" aria-hidden="true">
      <img
        src="https://images.unsplash.com/photo-1546704972-a85cd1688ac6?q=80&w=1100&auto=format&fit=crop"
        alt=""
        width="1100"
        height="1650"
        fetchpriority="high"
        decoding="async"
        className="hero-photo-img"
      />
    </div>

    <span className="hero-watermark hidden xl:block" aria-hidden="true">9&amp;18</span>

    <div className="max-w-7xl mx-auto w-full relative z-10">
      <div className="max-w-5xl">
        <p data-testid="hero-tagline" className="hero-in d1 inline-flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.12em] sm:tracking-[0.25em] text-[#D4A373] mb-6 border border-[#D4A373]/30 px-3 sm:px-4 py-2">
          <span className="w-1.5 h-1.5 bg-[#D4A373] shrink-0 animate-pulse" aria-hidden="true"></span>
          Hair Salon • Toms River, NJ 08753
        </p>
        <h1
          id="hero-headline"
          data-testid="hero-headline"
          className="hero-in d2 font-manifesto text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-white leading-[0.88] mb-6"
        >
          Charmed<br />Beauty<br />
          <span className="text-[#D4A373]">9 &amp; 18</span>
        </h1>
        <p data-testid="hero-subhead" className="hero-in d3 font-serif-accent italic text-2xl md:text-4xl text-[#ECECEC] mb-10">
          Couture color. Lasting precision.
        </p>
        <div className="hero-in d4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <p className="text-lg md:text-xl text-[#B6B6C0] font-light leading-relaxed">
              A woman-owned hair studio on Hooper Ave serving Toms River, Brick, Beachwood, Bayville and the Jersey Shore.
              Dimensional color, architectural cuts, keratin smoothing and bridal styling — designs nobody else in town
              does, built to last weeks.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col space-y-4">
            <BookLink
              testId="hero-book-btn"
              label="Book an appointment online"
              className="w-full py-4 bg-white text-black font-manifesto text-xl uppercase tracking-wider text-center hover:bg-[#D4A373] transition-colors"
            >
              Book Now
            </BookLink>
            <span className="text-xs font-mono text-[#B6B6C0] text-center">Live calendar • Instant confirmation</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Manifesto ---------------- */
const CHAPTERS = [
  {
    n: "01",
    accent: true,
    title: "Zero Cookie-Cutter Color",
    body: "Every head is an individual canvas. No formula cards, no rinse-and-repeat — each color plan is mapped to your tone, texture, and how you actually live.",
  },
  {
    n: "02",
    accent: false,
    title: "Precision Cut Architecture",
    body: "Cuts are built, not trimmed. Shape is engineered around bone structure and growth pattern so the style holds long after you leave the suite.",
  },
  {
    n: "03",
    accent: false,
    title: "Color That Outlasts Weeks",
    body: "Meticulous prep, custom toning, and honest aftercare. Work that looks freshly done through your busiest routine — that is the standard, not the exception.",
  },
];

const Manifesto = () => (
  <section id="manifesto" data-testid="manifesto-section" aria-label="Studio manifesto" className="py-24 px-6 border-b border-[#2E2E36]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      {CHAPTERS.map((c, i) => (
        <Reveal key={c.n} delay={i * 150}>
          <div data-testid={`manifesto-chapter-${c.n}`} className={`border-t-2 pt-6 ${c.accent ? "border-[#D4A373]" : "border-[#6E6E78]"}`}>
            <span className="text-xs font-mono text-[#D4A373] tracking-[0.3em]">{c.n}</span>
            <h2 className="text-xl font-bold uppercase tracking-wide text-white mt-2 mb-3">{c.title}</h2>
            <p className="text-sm text-[#B6B6C0] leading-relaxed">{c.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ---------------- Marquee strip ---------------- */
const Marquee = () => {
  const items = ["Dimensional Color", "Precision Cuts", "Keratin Smoothing", "Blow-Outs", "Balayage", "Bridal Updos", "Fantasy Color"];
  const row = [...items, ...items];
  return (
    <div data-testid="marquee-strip" aria-hidden="true" className="border-b border-[#2E2E36] bg-[#000000] py-4 overflow-hidden">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={i} className="font-manifesto uppercase text-2xl md:text-3xl tracking-tight text-[#33333B] px-8 whitespace-nowrap">
            {item} <span className="text-[#D4A373] px-4">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ---------------- The Work: real client gallery + lightbox ---------------- */
const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);

  const shown = useMemo(() => (filter === "all" ? WORK : WORK.filter((w) => w.cat === filter)), [filter]);

  const step = useCallback(
    (dir) => {
      setOpen((cur) => {
        if (cur === null) return cur;
        const idx = shown.findIndex((w) => w.n === cur);
        const next = (idx + dir + shown.length) % shown.length;
        return shown[next].n;
      });
    },
    [shown]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const active = open === null ? null : WORK.find((w) => w.n === open);

  return (
    <section id="work" data-testid="work-section" aria-labelledby="work-heading" className="py-24 px-6 border-b border-[#2E2E36]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373]">02 / Client Work</span>
              <h2 id="work-heading" className="font-manifesto text-4xl sm:text-6xl uppercase text-white mt-2">
                Real Hair.<br />Real Clients.
              </h2>
            </div>
            <p className="text-sm text-[#B6B6C0] max-w-sm font-mono leading-relaxed">
              Photographed in our Toms River suite. Tap any look, then book the exact service behind it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div role="group" aria-label="Filter client work by category" className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                data-testid={`work-filter-${f.id}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] border transition-colors ${
                  filter === f.id
                    ? "bg-[#D4A373] text-black border-[#D4A373]"
                    : "text-[#B6B6C0] border-[#2E2E36] hover:border-[#D4A373] hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <ul data-testid="work-grid" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 list-none">
          {shown.map((w, i) => (
            <li key={w.n}>
              <button
                type="button"
                data-testid={`work-tile-${w.n}`}
                onClick={() => setOpen(w.n)}
                className="work-tile group relative block w-full aspect-square overflow-hidden bg-[#0A0A0C]"
                aria-label={`View larger: ${w.label}`}
              >
                <img
                  src={`/images/gallery/work-${String(w.n).padStart(2, "0")}.webp`}
                  alt={w.alt}
                  width="444"
                  height="444"
                  loading={i < 6 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute bottom-0 left-0 right-0 p-3 text-left translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300">
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-white leading-tight">{w.label}</span>
                  <span className="block text-[10px] font-mono uppercase text-[#D4A373] mt-1">{w.svc}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <BookLink
              testId="work-book-btn"
              label="Book the look — online booking"
              className="px-8 py-4 bg-[#D4A373] text-black text-xs font-mono uppercase tracking-[0.2em] hover:bg-white transition-colors w-fit"
            >
              Book Your Look
            </BookLink>
            <span className="text-xs font-mono text-[#B6B6C0] uppercase tracking-widest">
              {WORK.length} recent looks • Colour, cuts, bridal &amp; transformations
            </span>
          </div>
        </Reveal>
      </div>

      {active && (
        <div
          data-testid="work-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.label}
          className="lightbox fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 bg-[#000000]/95 backdrop-blur-md"
          onClick={() => setOpen(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/images/gallery/work-${String(active.n).padStart(2, "0")}.webp`}
              alt={active.alt}
              width="444"
              height="444"
              className="w-full max-h-[62vh] object-contain border border-[#2E2E36] bg-[#0A0A0C]"
            />
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p data-testid="lightbox-label" className="font-manifesto uppercase text-2xl text-white leading-none">{active.label}</p>
                <p className="text-xs font-mono uppercase tracking-widest text-[#D4A373] mt-2">Service: {active.svc}</p>
              </div>
              <BookLink
                testId="lightbox-book-btn"
                label={`Book ${active.svc}`}
                className="px-6 py-3 bg-[#D4A373] text-black text-xs font-mono uppercase tracking-[0.2em] hover:bg-white transition-colors w-fit"
              >
                Book This Look
              </BookLink>
            </div>
            <button
              type="button"
              data-testid="lightbox-close"
              onClick={() => setOpen(null)}
              aria-label="Close image viewer"
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 bg-[#D4A373] text-black flex items-center justify-center hover:bg-white transition-colors"
            >
              <X size={18} />
            </button>
            <button
              type="button"
              data-testid="lightbox-prev"
              onClick={() => step(-1)}
              aria-label="Previous look"
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-14 w-10 h-10 bg-[#15151A] border border-[#2E2E36] text-white flex items-center justify-center hover:border-[#D4A373] hover:text-[#D4A373] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              data-testid="lightbox-next"
              onClick={() => step(1)}
              aria-label="Next look"
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-14 w-10 h-10 bg-[#15151A] border border-[#2E2E36] text-white flex items-center justify-center hover:border-[#D4A373] hover:text-[#D4A373] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

/* ---------------- Editorial Interlude (type-only) ---------------- */
const Interlude = () => (
  <section data-testid="interlude-section" aria-label="Studio promise" className="py-28 md:py-36 px-6 border-b border-[#2E2E36] relative overflow-hidden">
    <div className="max-w-7xl mx-auto relative">
      <Reveal>
        <div className="flex items-center gap-6 mb-10">
          <span className="w-3 h-3 bg-[#D4A373]" aria-hidden="true"></span>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#B6B6C0]">The Charmed Standard</span>
        </div>
        <blockquote className="font-serif-accent italic text-3xl sm:text-5xl md:text-6xl text-white leading-[1.15] max-w-5xl">
          “Designs nobody else in town does —<span className="text-[#D4A373]"> precision work that lasts weeks.”</span>
        </blockquote>
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
          <BookLink
            testId="interlude-book-btn"
            label="Book your chair online"
            className="inline-block px-8 py-4 border border-[#D4A373] text-[#D4A373] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#D4A373] hover:text-black transition-colors w-fit"
          >
            Book Your Chair
          </BookLink>
          <span className="text-xs font-mono text-[#B6B6C0] uppercase tracking-widest">The owner’s promise — in her own words</span>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Full Menu: category cards + revealed panel ---------------- */
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

const Menu = () => {
  const [openId, setOpenId] = useState(MENU[0].id);
  const group = MENU.find((g) => g.id === openId);

  return (
    <section id="menu" data-testid="menu-section" aria-labelledby="menu-heading" className="py-24 px-6 border-b border-[#2E2E36]">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373]">03 / Full Service Menu</span>
              <h2 id="menu-heading" className="font-manifesto text-4xl sm:text-6xl uppercase text-white mt-2">
                Services &amp; Pricing
              </h2>
            </div>
            <p className="text-sm text-[#B6B6C0] max-w-sm font-mono leading-relaxed">
              Pick a category — its full price list opens right here. No endless scrolling.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div role="tablist" aria-label="Service categories" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {MENU.map((g) => {
              const on = g.id === openId;
              return (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  id={`menu-tab-${g.id}`}
                  aria-selected={on}
                  aria-controls="menu-panel"
                  data-testid={`menu-tab-${g.id}`}
                  onClick={() => setOpenId(g.id)}
                  className={`menu-card text-left p-5 sm:p-6 border transition-colors ${
                    on ? "bg-[#D4A373] border-[#D4A373] text-black" : "border-[#2E2E36] text-white hover:border-[#D4A373]"
                  }`}
                >
                  <span className={`font-manifesto text-2xl sm:text-3xl leading-none ${on ? "text-black" : "text-[#D4A373]"}`}>{g.num}</span>
                  <span className="block font-manifesto uppercase text-base sm:text-xl leading-tight mt-3">{g.title}</span>
                  <span className={`block text-[11px] font-mono uppercase tracking-widest mt-3 ${on ? "text-black/70" : "text-[#B6B6C0]"}`}>
                    {g.items.length} service{g.items.length > 1 ? "s" : ""}
                  </span>
                  <span className={`block text-[11px] font-mono mt-2 leading-relaxed ${on ? "text-black/80" : "text-[#6E6E78]"}`}>
                    {g.blurb}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id="menu-panel"
          key={openId}
          role="tabpanel"
          aria-labelledby={`menu-tab-${openId}`}
          data-testid={`menu-group-${openId}`}
          className="menu-panel mt-10 border border-[#2E2E36]"
        >
          <div className="flex items-baseline gap-4 px-4 sm:px-6 py-5 border-b border-[#2E2E36] bg-[#15151A]">
            <span className="font-manifesto text-2xl uppercase text-[#D4A373] leading-none">{group.num}</span>
            <h3 className="font-manifesto text-xl sm:text-2xl uppercase text-white leading-none">{group.title}</h3>
          </div>
          <ul className="divide-y divide-[#2E2E36] list-none">
            {group.items.map((s) => (
              <li key={s.name}>
                <div
                  data-testid={`menu-item-${slug(s.name)}`}
                  className="service-row py-5 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 md:items-center"
                >
                  <div className="md:col-span-6">
                    <h4 className="text-lg md:text-xl font-bold uppercase text-white tracking-wide">{s.name}</h4>
                    {s.note && <p className="text-xs font-mono text-[#B6B6C0] mt-1">{s.note}</p>}
                  </div>
                  <div className="hidden md:block md:col-span-2 text-xs font-mono uppercase text-[#B6B6C0]">{s.time}</div>
                  <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-4 md:gap-6">
                    <span className="md:hidden text-xs font-mono uppercase text-[#B6B6C0]">{s.time}</span>
                    <span className="service-price font-mono text-lg md:text-xl text-white font-semibold whitespace-nowrap">{s.price}</span>
                    <BookLink
                      testId={`menu-book-${slug(s.name)}`}
                      label={`Book ${s.name}`}
                      className="px-4 py-2 border border-[#D4A373] text-[#D4A373] text-xs font-mono uppercase hover:bg-[#D4A373] hover:text-black transition-colors whitespace-nowrap"
                    >
                      Book
                    </BookLink>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={150}>
          <p className="mt-8 text-xs font-mono text-[#B6B6C0] leading-relaxed max-w-2xl">
            Prices start at the listed rate. Long, dense or previously-coloured hair, added toners and root work are quoted at
            the chair. Not sure what you need? Call or text and we’ll map it out with you.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

/* ---------------- Gift Cards ---------------- */
const GIFT_AMOUNTS = ["$50", "$95", "$165", "Any Amount"];
const GIFT_PHONE_DISPLAY = "(732) 330-4850";
const GIFT_TEL = "tel:+17323304850";
const GIFT_SMS = "sms:+17323304850";

const GiftCards = () => (
  <section id="gift-cards" data-testid="gift-cards-section" aria-labelledby="gift-heading" className="py-24 px-6 border-b border-[#2E2E36] bg-[#000000]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <Reveal className="lg:col-span-6">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373]">04 / Gift Cards</span>
        <h2 id="gift-heading" className="font-manifesto text-4xl sm:text-6xl uppercase text-white mt-2 mb-6">
          Give The<br />Chair Away
        </h2>
        <p className="text-base md:text-lg text-[#B6B6C0] font-light leading-relaxed max-w-xl mb-8">
          A Charmed Beauty gift card is the present nobody re-gifts. Redeemable on anything on the menu — balayage,
          a precision cut, keratin smoothing or a bridal updo. Perfect for birthdays, bridal parties, teacher
          thank-yous and last-minute saves.
        </p>

        <ul className="flex flex-wrap gap-2 mb-8 list-none" data-testid="gift-amounts">
          {GIFT_AMOUNTS.map((a) => (
            <li key={a} className="px-4 py-2 border border-[#2E2E36] text-xs font-mono uppercase tracking-[0.15em] text-[#B6B6C0]">
              {a}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
          <a
            data-testid="gift-text-btn"
            href={`${GIFT_SMS}?body=Hi%20Charmed%20Beauty%20—%20I%27d%20like%20to%20buy%20a%20gift%20card.`}
            className="w-full sm:w-auto px-8 py-4 bg-[#D4A373] text-black text-xs font-mono uppercase tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare size={14} aria-hidden="true" /> Text To Buy
          </a>
          <a
            data-testid="gift-call-btn"
            href={GIFT_TEL}
            className="w-full sm:w-auto px-8 py-4 border border-[#D4A373] text-[#D4A373] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#D4A373] hover:text-black transition-colors flex items-center justify-center gap-2"
          >
            <Phone size={14} aria-hidden="true" /> {GIFT_PHONE_DISPLAY}
          </a>
          <a
            data-testid="gift-email-btn"
            href={`${EMAIL_HREF}?subject=Gift%20Card%20Request`}
            className="w-full sm:w-auto px-8 py-4 border border-[#2E2E36] text-[#B6B6C0] text-xs font-mono uppercase tracking-[0.2em] hover:border-[#D4A373] hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Mail size={14} aria-hidden="true" /> Email Us
          </a>
        </div>
        <p className="mt-6 text-[11px] font-mono text-[#6E6E78] leading-relaxed max-w-md">
          Gift cards are arranged directly with Joanne — text, call or email and we’ll have one ready, physical or
          sent straight to their phone.
        </p>
      </Reveal>

      <Reveal delay={150} className="lg:col-span-6">
        <div data-testid="gift-card-visual" className="gift-card p-8 sm:p-10 border border-[#D4A373]/60 bg-[#0A0A0C] relative overflow-hidden">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[#D4A373]" aria-hidden="true"></span>
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#D4A373]">Gift Card</span>
            </div>
            <Gift size={22} className="text-[#D4A373]" aria-hidden="true" />
          </div>
          <p className="font-manifesto uppercase text-4xl sm:text-5xl text-white leading-[0.9] mt-10">
            Charmed<br />Beauty<br /><span className="text-[#D4A373]">9 &amp; 18</span>
          </p>
          <p className="font-serif-accent italic text-xl sm:text-2xl text-[#B6B6C0] mt-8">Couture color. Lasting precision.</p>
          <div className="mt-10 pt-6 border-t border-[#2E2E36] flex items-end justify-between gap-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#6E6E78]">
              Redeemable on any service
              <br />1201 Hooper Ave · Toms River, NJ
            </span>
            <span className="font-mono text-2xl text-white">$ ___</span>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Reviews ---------------- */
const Reviews = () => (
  <section id="reviews" data-testid="reviews-section" aria-labelledby="reviews-heading" className="relative py-24 px-6 border-b border-[#2E2E36] overflow-hidden bg-[#000000]">
    <div className="max-w-7xl mx-auto relative">
      <Reveal>
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373]">05 / Studio Verification</span>
            <h2 id="reviews-heading" className="font-manifesto text-4xl sm:text-5xl uppercase text-white mt-2">
              Verified Client Reviews
            </h2>
          </div>
          <div className="flex gap-10 md:gap-16">
            <div data-testid="review-count" className="text-left md:text-right">
              <div className="font-manifesto text-6xl md:text-7xl text-[#D4A373] leading-none">675</div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#B6B6C0] mt-1">Client Reviews</div>
            </div>
            <a data-testid="google-rating" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="text-left md:text-right group">
              <div className="font-manifesto text-6xl md:text-7xl text-white leading-none group-hover:text-[#D4A373] transition-colors">5.0</div>
              <div className="flex md:justify-end gap-1 mt-1" role="img" aria-label="Rated 5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-[#C9A227]" fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#B6B6C0] mt-1 group-hover:text-white transition-colors">
                54+ Google Reviews
              </div>
            </a>
          </div>
        </div>
      </Reveal>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 list-none">
        {REVIEWS.map((r, i) => (
          <li key={r.name}>
            <Reveal delay={i * 120}>
              <figure data-testid={`review-card-${i}`} className="review-card p-8 bg-[#15151A]/90 backdrop-blur-md border border-[#2E2E36] h-full flex flex-col justify-between">
                <blockquote className="font-serif-accent italic text-lg md:text-xl text-[#ECECEC] leading-relaxed mb-6">“{r.quote}”</blockquote>
                <figcaption className="text-xs font-mono text-[#D4A373] uppercase">
                  {r.name} • {r.tag}
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/* ---------------- The Artists ---------------- */
const Artists = () => (
  <section id="artists" data-testid="artists-section" aria-labelledby="artists-heading" className="py-24 px-6 border-b border-[#2E2E36]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <Reveal className="lg:col-span-5 order-2 lg:order-1">
        <div className="relative border border-[#2E2E36] overflow-hidden group">
          <img
            data-testid="team-photo"
            src="/images/team.webp"
            alt="The stylists of Charmed Beauty 9 & 18 inside Sola Salon Studios, Toms River NJ"
            width="487"
            height="510"
            className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-0 p-4 bg-black/80 backdrop-blur-md border border-[#2E2E36] m-4">
            <span className="text-xs font-mono text-[#D4A373] uppercase">The Hands Behind The Work</span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={150} className="lg:col-span-7 order-1 lg:order-2">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373]">06 / The Artists</span>
        <h2 id="artists-heading" className="font-manifesto text-4xl sm:text-6xl uppercase text-white mt-2 mb-6">
          Four Stylists.<br />One Standard.
        </h2>
        <p className="text-base md:text-lg text-[#B6B6C0] font-light leading-relaxed mb-8 max-w-xl">
          A woman-owned collective inside Sola Salon Studios. Every artist runs her own chair, her own craft, her own
          clientele — call or text your stylist directly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {TEAM_PHONES.map(([name, num, tel]) => (
            <a
              key={name}
              data-testid={`artist-${name.toLowerCase()}`}
              href={tel}
              aria-label={`Call ${name} at ${num}`}
              className="group p-6 flex items-center justify-between border border-[#2E2E36] transition-colors hover:border-[#D4A373] hover:bg-[#15151A]"
            >
              <span>
                <span className="text-white font-bold uppercase tracking-wide block">{name}</span>
                <span className="block text-xs font-mono text-[#B6B6C0] mt-1 group-hover:text-[#D4A373] transition-colors">{num}</span>
              </span>
              <ArrowUpRight size={18} className="text-[#D4A373] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Service area (local SEO) ---------------- */
const ServiceArea = () => (
  <section id="areas" data-testid="service-area-section" aria-labelledby="areas-heading" className="py-24 px-6 border-b border-[#2E2E36]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
      <Reveal className="lg:col-span-5">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373]">07 / Service Area</span>
        <h2 id="areas-heading" className="font-manifesto text-4xl sm:text-5xl uppercase text-white mt-2 mb-6">
          Serving Ocean County
        </h2>
        <p className="text-base text-[#B6B6C0] font-light leading-relaxed max-w-lg">
          We sit on Hooper Ave in Toms River, minutes from Route 37 and the Garden State Parkway — an easy drive from Brick,
          Beachwood, Bayville, Lakewood, Island Heights, Seaside Heights, Point Pleasant, Jackson, Forked River and
          Manahawkin. Clients come from all over the Jersey Shore for colour and bridal work they can’t get closer to home.
        </p>
      </Reveal>
      <Reveal delay={150} className="lg:col-span-7">
        <ul data-testid="towns-list" className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 list-none">
          {TOWNS.map(([town, drive]) => (
            <li key={town} className="border border-[#2E2E36] p-5 hover:border-[#D4A373] transition-colors">
              <span className="block text-white font-bold uppercase text-sm tracking-wide">{town}</span>
              <span className="block text-[11px] font-mono text-[#B6B6C0] mt-1">{drive} away</span>
            </li>
          ))}
          <li className="border border-[#D4A373]/40 bg-[#15151A] p-5 col-span-2 flex items-center">
            <BookLink
              testId="areas-book-btn"
              label="Book online from anywhere in Ocean County"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373] hover:text-white transition-colors flex items-center gap-2"
            >
              Booking online takes a minute <ArrowUpRight size={14} aria-hidden="true" />
            </BookLink>
          </li>
        </ul>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Location ---------------- */
const Location = () => (
  <section id="location" data-testid="location-section" aria-labelledby="location-heading" className="py-24 px-6 border-b border-[#2E2E36]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <Reveal>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373]">08 / Studio Location</span>
          <h2 id="location-heading" className="font-manifesto text-4xl sm:text-5xl uppercase text-white mt-2 mb-6">
            Toms River Studio
          </h2>
          <div className="space-y-4 text-sm text-[#B6B6C0]">
            <address data-testid="studio-address" className="text-white font-medium text-base not-italic">
              1201 Hooper Ave, Sola Salon Studios, Suite 8 &amp; 9<br />
              Toms River, NJ 08753
            </address>
            <p>Private suite booked exclusively per guest. One-on-one undivided focus, every appointment.</p>

            <div className="pt-4 border-t border-[#2E2E36] font-mono text-xs space-y-2" data-testid="studio-hours">
              {HOURS.map(([day, time]) => (
                <div key={day} className="flex justify-between">
                  <span className="uppercase text-[#B6B6C0]">{day}</span>
                  <span className={time === "Closed" ? "text-[#B6B6C0]" : "text-white"}>{time}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#2E2E36] font-mono text-xs space-y-2">
              <div className="text-[#D4A373] uppercase tracking-widest mb-2">Call or text your stylist directly</div>
              <a data-testid="location-main-phone" href={PHONE_TEL} className="flex justify-between items-center group">
                <span className="uppercase text-[#B6B6C0]">Studio line</span>
                <span className="text-white group-hover:text-[#D4A373] transition-colors">{PHONE_DISPLAY}</span>
              </a>
              <a data-testid="location-email" href={EMAIL_HREF} className="flex justify-between items-center gap-4 group">
                <span className="uppercase text-[#B6B6C0]">Email</span>
                <span className="text-white group-hover:text-[#D4A373] transition-colors break-all text-right">{EMAIL}</span>
              </a>
              <a data-testid="location-all-artists" href="#artists" className="flex justify-between items-center group">
                <span className="uppercase text-[#B6B6C0]">All four stylists</span>
                <span className="text-white group-hover:text-[#D4A373] transition-colors flex items-center gap-1">
                  See Artists <ArrowUpRight size={12} aria-hidden="true" />
                </span>
              </a>
            </div>

            <div className="pt-4 border-t border-[#2E2E36]">
              <a
                data-testid="facebook-link"
                href="https://www.facebook.com/charmedbeautynj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs font-mono uppercase text-white hover:text-[#D4A373] transition-colors"
              >
                <Facebook size={14} className="text-[#D4A373]" aria-hidden="true" />
                <span>Facebook — @charmedbeautynj</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-7">
        <Reveal delay={150}>
          <div className="border border-[#2E2E36] overflow-hidden group hover:border-[#D4A373] transition-colors">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">
              <iframe
                data-testid="google-map-embed"
                title="Map of Charmed Beauty 9 & 18 at 1201 Hooper Ave, Toms River, NJ 08753"
                src="https://maps.google.com/maps?q=Charmed%20Beauty%209%20%26%2018%2C%201201%20Hooper%20Ave%2C%20Toms%20River%2C%20NJ%2008753&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="map-dark absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center gap-2 text-[10px] sm:text-xs font-mono text-[#D4A373] pointer-events-none">
                <span className="bg-black/85 px-2 py-1 border border-[#2E2E36]">TOMS RIVER, NJ</span>
                <span className="bg-black/85 px-2 py-1 border border-[#2E2E36]">ZIP: 08753</span>
              </div>
            </div>
            <div className="border-t border-[#2E2E36] bg-[#000000] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <MapPin size={12} className="text-[#D4A373]" aria-hidden="true" /> Charmed Beauty 9 &amp; 18
                </span>
                <p className="text-[11px] font-mono text-[#B6B6C0] mt-1">1201 Hooper Ave, Suite 8 &amp; 9 · Toms River, NJ 08753</p>
              </div>
              <a
                data-testid="map-link"
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-3 border border-[#D4A373] text-xs font-mono uppercase text-[#D4A373] hover:bg-[#D4A373] hover:text-black transition-colors flex items-center justify-center gap-1"
              >
                Open in Maps <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Final CTA ---------------- */
const FinalCTA = () => (
  <section id="contact" data-testid="final-cta-section" aria-labelledby="cta-heading" className="py-28 px-6 bg-[#000000] text-center relative overflow-hidden">
    <div className="max-w-3xl mx-auto relative">
      <Reveal>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4A373]">Ready for Your Booking</span>
        <h2 id="cta-heading" className="font-manifesto text-5xl sm:text-7xl uppercase text-white mt-3 mb-6">
          Reserve Your Slot Now
        </h2>
        <p className="text-[#B6B6C0] text-base mb-10 max-w-xl mx-auto">
          Real-time availability for colour, cuts, treatments and occasion styling — book in under a minute.
        </p>
        <div className="max-w-md mx-auto">
          <BookLink
            testId="final-book-btn"
            label="Book an appointment online"
            className="block w-full py-5 bg-[#D4A373] text-black font-manifesto text-2xl uppercase tracking-wider hover:bg-white transition-colors shadow-2xl"
          >
            Book Now
          </BookLink>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-mono text-[#B6B6C0]">
            <a data-testid="cta-call-link" href={PHONE_TEL} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={12} aria-hidden="true" /> {PHONE_DISPLAY}
            </a>
            <a data-testid="cta-text-link" href={PHONE_SMS} className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageSquare size={12} aria-hidden="true" /> Text us
            </a>
            <a data-testid="cta-email-link" href={EMAIL_HREF} className="flex items-center gap-2 hover:text-white transition-colors break-all">
              <Mail size={12} aria-hidden="true" /> {EMAIL}
            </a>
          </div>
          <p className="mt-6 text-[11px] font-mono text-[#B6B6C0]/80 leading-relaxed">
            50% fee for no-shows or cancellations within 24 hours • 3.5% card processing fee
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Footer ---------------- */
const Footer = () => (
  <footer className="py-10 px-6 border-t border-[#2E2E36] bg-[#000000]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#B6B6C0]">
      <div className="uppercase text-white font-bold">Charmed Beauty 9 &amp; 18 • Toms River, NJ</div>
      <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <a href="#hero" className="hover:text-white transition-colors">Top</a>
        <a href="#work" className="hover:text-white transition-colors">The Work</a>
        <a href="#menu" className="hover:text-white transition-colors">Menu</a>
        <a href="#gift-cards" className="hover:text-white transition-colors">Gift Cards</a>
        <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
        <a href="#artists" className="hover:text-white transition-colors">Artists</a>
        <a href="#location" className="hover:text-white transition-colors">Visit</a>
        <BookLink testId="footer-book-link" label="Book online" className="hover:text-white transition-colors">Book</BookLink>
        <a data-testid="footer-email" href={EMAIL_HREF} className="hover:text-white transition-colors">Email Us</a>
      </nav>
      <div className="flex items-center gap-4">
        <span>Woman-Owned Atelier</span>
        <a data-testid="footer-mo-studio" href="https://mozeid.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A373] transition-colors">
          Designed by Mo Studio
        </a>
      </div>
    </div>
  </footer>
);

/* ---------------- Floating Book Now ---------------- */
const FloatingBook = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let nearEnd = true;
    const blocked = new Map();
    const targets = [
      document.getElementById("hero"),
      document.getElementById("contact"),
      document.querySelector("footer"),
    ].filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          blocked.set(e.target, e.isIntersecting);
        });
        nearEnd = [...blocked.values()].some(Boolean);
        setShow(!nearEnd);
      },
      { threshold: 0.01 }
    );
    targets.forEach((t) => io.observe(t));

    return () => io.disconnect();
  }, []);

  return (
    <div className={`float-wrap ${show ? "is-visible" : ""}`} aria-hidden={!show}>
      <BookLink
        testId="floating-book-btn"
        label="Book an appointment online"
        className="px-5 py-3 sm:px-6 sm:py-4 bg-[#D4A373] text-black font-manifesto uppercase tracking-wider text-sm sm:text-base shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:bg-white transition-colors flex items-center gap-2"
      >
        Book Now <ArrowUpRight size={16} aria-hidden="true" />
      </BookLink>
    </div>
  );
};

function App() {
  return (
    <div className="bg-[#0A0A0C] text-[#ECECEC] antialiased min-h-screen font-sans">
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <Marquee />
        <Gallery />
        <Interlude />
        <Menu />
        <GiftCards />
        <Reviews />
        <Artists />
        <ServiceArea />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingBook />
    </div>
  );
}

export default App;
