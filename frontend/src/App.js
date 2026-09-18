import { useEffect, useRef } from "react";
import "@/App.css";
import { Phone, MessageSquare, Facebook, MapPin, ArrowUpRight, Star } from "lucide-react";

const BOOKING_URL = "https://charmedbeauty918.glossgenius.com";
const PHONE_DISPLAY = "(732) 955-9096";
const PHONE_TEL = "tel:+17329559096";
const PHONE_SMS = "sms:+17329559096";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=1201+Hooper+Ave+Sola+Salon+Studios+Toms+River+NJ+08753";
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Charmed+Beauty+9+%26+18+Toms+River+NJ+08753";

const SERVICES = [
  {
    id: "balayage",
    tag: "Color / Signature",
    name: "Balayage / Foilayage",
    desc: "Hand-painted dimensional color with a lived-in grow-out. Toners, root work and long hair quoted at the chair.",
    price: "$195+",
  },
  {
    id: "babylights",
    tag: "Color / Dimension",
    name: "Full Foil Babylights",
    desc: "Micro-fine foiling for seamless, light-saturated brightness from root to end.",
    price: "$195+",
  },
  {
    id: "highlights",
    tag: "Color / Dimension",
    name: "Full Foil Highlights",
    desc: "Classic full-head foiling, finished with custom toning for clean, expensive color.",
    price: "$165+",
  },
  {
    id: "keratin",
    tag: "Treatment / Smoothing",
    name: "Keratin Treatment",
    desc: "Two hours in the chair. Months of glass-smooth, humidity-proof hair.",
    price: "$250",
  },
  {
    id: "cut",
    tag: "Cut / Core",
    name: "Women's Haircut & Blow-Dry",
    desc: "Precision cutting built around your bone structure, finished with a full blow-dry style.",
    price: "$50+",
  },
  {
    id: "blowout",
    tag: "Finish / Style",
    name: "Blow-Out",
    desc: "The signature finish — volume, movement, and polish that turns a Tuesday into an occasion.",
    price: "$45+",
  },
  {
    id: "updo",
    tag: "Occasion",
    name: "Updo",
    desc: "Event architecture for hair. Weddings, photoshoots, and nights that need a silhouette.",
    price: "$95+",
  },
];

const REVIEWS = [
  {
    quote:
      "Always accommodating, amazing colorist, does exactly what you want and makes you feel like family.",
    name: "Debbie King",
    tag: "Verified GlossGenius Review",
  },
  {
    quote:
      "Joanne is amazing! Always providing great feedback on ideas and how they'll look — suggestions when you just want a change and don't know what. Love her!!",
    name: "Odette",
    tag: "Verified GlossGenius Review",
  },
  {
    quote: "I love leaving feeling refreshed! Andrea knows what works and it's always great!!",
    name: "Melody",
    tag: "Verified GlossGenius Review",
  },
  {
    quote: "Love Joanne, she's the best!",
    name: "Maria",
    tag: "Verified GlossGenius Review",
  },
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
  ["Andrea", "(732) 955-9096", "tel:+17329559096"],
  ["Lisa", "(732) 678-8547", "tel:+17326788547"],
  ["Phyllis", "(732) 581-6319", "tel:+17325816319"],
  ["Joanne", "(732) 330-4850", "tel:+17323304850"],
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

const BookLink = ({ href = BOOKING_URL, className = "", testId, children }) => (
  <a
    data-testid={testId}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
  >
    {children}
  </a>
);

/* ---------------- Header ---------------- */
const Header = () => (
  <header className="border-b border-[#25252B] bg-[#080809]/95 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#hero" data-testid="header-brand" className="flex items-center space-x-3">
        <span className="w-3 h-3 bg-[#D4A373]"></span>
        <span className="font-manifesto tracking-tight text-lg uppercase text-white">
          Charmed Beauty 9 &amp; 18
        </span>
      </a>
      <nav className="hidden md:flex items-center space-x-8 text-xs font-mono uppercase tracking-widest text-[#8E8E98]">
        <a data-testid="nav-manifesto" href="#manifesto" className="hover:text-white transition-colors">01 / Manifesto</a>
        <a data-testid="nav-offerings" href="#offerings" className="hover:text-white transition-colors">02 / Offerings</a>
        <a data-testid="nav-standards" href="#standards" className="hover:text-white transition-colors">03 / Standards</a>
        <a data-testid="nav-artists" href="#artists" className="hover:text-white transition-colors">04 / Artists</a>
        <a data-testid="nav-location" href="#location" className="hover:text-white transition-colors">05 / Location</a>
      </nav>
      <BookLink
        testId="header-book-btn"
        className="px-5 py-2 bg-[#D4A373] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
      >
        Direct Booking
      </BookLink>
    </div>
  </header>
);

/* ---------------- Hero ---------------- */
const Hero = () => (
  <section
    id="hero"
    data-testid="hero-section"
    className="relative overflow-hidden py-28 md:py-40 px-6 border-b border-[#25252B] min-h-[92vh] flex items-center"
  >
    <div className="hero-glow -top-1/4 -right-1/4" aria-hidden="true"></div>
    <div className="max-w-7xl mx-auto w-full relative">
      <div className="max-w-5xl">
        <div
          data-testid="hero-tagline"
          className="hero-in d1 text-xs font-mono uppercase tracking-[0.25em] text-[#D4A373] mb-6"
        >
          Studio Discipline • Toms River, NJ 08753
        </div>
        <h1
          data-testid="hero-headline"
          className="hero-in d2 font-manifesto text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-white leading-[0.88] mb-6"
        >
          Charmed<br />Beauty<br />
          <span className="text-[#D4A373]">9 &amp; 18</span>
        </h1>
        <div
          data-testid="hero-subhead"
          className="hero-in d3 font-serif-accent italic text-2xl md:text-4xl text-[#ECECEC] mb-10"
        >
          Couture color. Lasting precision.
        </div>
        <div className="hero-in d4 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <p className="text-lg md:text-xl text-[#8E8E98] font-light leading-relaxed">
              Designs nobody else in town does — precision work that lasts weeks. Dimensional
              color, architectural cuts, and smoothing treatments engineered around your hair,
              your routine, your reflection.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col space-y-4">
            <BookLink
              testId="hero-book-btn"
              className="w-full py-4 bg-white text-black font-manifesto text-xl uppercase tracking-wider text-center hover:bg-[#D4A373] transition-colors"
            >
              Book Now
            </BookLink>
            <span className="text-xs font-mono text-[#8E8E98] text-center">
              Live GlossGenius calendar • Instant confirmation
            </span>
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
  <section id="manifesto" data-testid="manifesto-section" className="py-24 px-6 border-b border-[#25252B]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      {CHAPTERS.map((c, i) => (
        <Reveal key={c.n} delay={i * 150}>
          <div
            data-testid={`manifesto-chapter-${c.n}`}
            className={`border-t-2 pt-6 ${c.accent ? "border-[#D4A373]" : "border-[#8E8E98]"}`}
          >
            <span className="text-xs font-mono text-[#D4A373] tracking-[0.3em]">{c.n}</span>
            <h2 className="text-xl font-bold uppercase tracking-wide text-white mt-2 mb-3">{c.title}</h2>
            <p className="text-sm text-[#8E8E98] leading-relaxed">{c.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ---------------- Marquee strip ---------------- */
const Marquee = () => {
  const items = ["Dimensional Color", "Precision Cuts", "Keratin Smoothing", "Blow-Outs", "Balayage", "Occasion Styling"];
  const row = [...items, ...items];
  return (
    <div data-testid="marquee-strip" className="border-b border-[#25252B] bg-[#080809] py-4 overflow-hidden">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span
            key={i}
            className="font-manifesto uppercase text-2xl md:text-3xl tracking-tight text-[#3A3A42] px-8 whitespace-nowrap"
          >
            {item} <span className="text-[#D4A373] px-4">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ---------------- Framed media ---------------- */
const MediaFrame = () => (
  <section className="py-16 px-6">
    <Reveal>
      <div
        data-testid="craft-frame"
        className="max-w-7xl mx-auto aspect-[4/5] sm:aspect-[16/10] w-full border border-[#25252B] relative overflow-hidden flex flex-col justify-end"
      >
        <img
          src="/images/studio.png"
          alt="Inside the private Charmed Beauty suite — styling chair, mirror and chandelier"
          className="frame-img absolute inset-0 w-full h-full object-cover opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#2D2218]/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-[#080809]/20 to-transparent"></div>
        <div className="relative max-w-md bg-black/80 backdrop-blur-md p-4 border border-[#25252B] m-8">
          <span className="text-xs font-mono text-[#D4A373] uppercase">The Actual Studio</span>
          <p className="text-sm text-white font-medium mt-1">
            Private suite 8 &amp; 9, Sola Salon Studios, Toms River
          </p>
        </div>
      </div>
    </Reveal>
  </section>
);

/* ---------------- Offerings ---------------- */
const Offerings = () => (
  <section id="offerings" data-testid="offerings-section" className="py-24 px-6 border-b border-[#25252B]">
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373]">02 / Treatment Catalog</span>
            <h2 className="font-manifesto text-4xl sm:text-6xl uppercase text-white mt-2">Services &amp; Pricing</h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#8E8E98] max-w-sm font-mono">
            Official GlossGenius menu rates. Reserve directly online.
          </p>
        </div>
      </Reveal>

      <div className="divide-y divide-[#25252B] border-y border-[#25252B]">
        {SERVICES.map((s, i) => (
          <Reveal key={s.id} delay={i * 60}>
            <div
              data-testid={`service-row-${s.id}`}
              className="service-row py-8 px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-4">
                <span className="text-xs font-mono text-[#D4A373] uppercase">{s.tag}</span>
                <h3 className="text-2xl font-bold uppercase text-white mt-1">{s.name}</h3>
              </div>
              <div className="md:col-span-5 text-sm text-[#8E8E98]">{s.desc}</div>
              <div className="md:col-span-3 flex items-center justify-between md:justify-end md:space-x-8">
                <span data-testid={`service-price-${s.id}`} className="service-price font-mono text-xl text-white font-semibold">
                  {s.price}
                </span>
                <BookLink
                  testId={`service-book-${s.id}`}
                  className="px-4 py-2 border border-[#D4A373] text-[#D4A373] text-xs font-mono uppercase hover:bg-[#D4A373] hover:text-black transition-colors"
                >
                  Book
                </BookLink>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p className="mt-6 text-xs font-mono text-[#8E8E98]">
          Full menu — men's cuts, kids cuts, fantasy color, perms &amp; more — on the live booking calendar.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Standards / Reviews ---------------- */
const Standards = () => (
  <section id="standards" data-testid="standards-section" className="relative py-24 px-6 border-b border-[#25252B] overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
      loading="lazy"
    />
    <div className="max-w-7xl mx-auto relative">
      <Reveal>
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373]">03 / Studio Verification</span>
            <h2 className="font-manifesto text-4xl sm:text-5xl uppercase text-white mt-2">Verified Client Reviews</h2>
          </div>
          <div className="flex gap-10 md:gap-16">
            <div data-testid="review-count" className="text-left md:text-right">
              <div className="font-manifesto text-6xl md:text-7xl text-[#D4A373] leading-none">675</div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#8E8E98] mt-1">
                GlossGenius Reviews
              </div>
            </div>
            <a
              data-testid="google-rating"
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left md:text-right group"
            >
              <div className="font-manifesto text-6xl md:text-7xl text-white leading-none group-hover:text-[#D4A373] transition-colors">
                5.0
              </div>
              <div className="flex md:justify-end gap-1 mt-1" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-[#C9A227]" fill="currentColor" />
                ))}
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#8E8E98] mt-1 group-hover:text-white transition-colors">
                54 Google Reviews
              </div>
            </a>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 120}>
            <div
              data-testid={`review-card-${i}`}
              className="review-card p-8 bg-[#18181C]/90 backdrop-blur-md border border-[#25252B] h-full flex flex-col justify-between"
            >
              <p className="font-serif-accent italic text-lg md:text-xl text-[#ECECEC] leading-relaxed mb-6">
                “{r.quote}”
              </p>
              <div className="text-xs font-mono text-[#D4A373] uppercase">
                {r.name} • {r.tag}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- The Artists (team photo) ---------------- */
const Artists = () => (
  <section id="artists" data-testid="artists-section" className="py-24 px-6 border-b border-[#25252B]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <Reveal className="lg:col-span-5 order-2 lg:order-1">
        <div className="relative border border-[#25252B] overflow-hidden group">
          <img
            data-testid="team-photo"
            src="/images/team.png"
            alt="The Charmed Beauty 9 & 18 stylists at Sola Salon Studios"
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080809]/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 bg-black/80 backdrop-blur-md border border-[#25252B] m-4">
            <span className="text-xs font-mono text-[#D4A373] uppercase">The Hands Behind The Work</span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={150} className="lg:col-span-7 order-1 lg:order-2">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373]">04 / The Artists</span>
        <h2 className="font-manifesto text-4xl sm:text-6xl uppercase text-white mt-2 mb-6">
          Four Stylists.<br />One Standard.
        </h2>
        <p className="text-base md:text-lg text-[#8E8E98] font-light leading-relaxed mb-8 max-w-xl">
          A woman-owned collective inside Sola Salon Studios. Every artist runs her own chair,
          her own craft, her own clientele — call or text your stylist directly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#25252B] border border-[#25252B]">
          {TEAM_PHONES.map(([name, num, tel]) => (
            <a
              key={name}
              data-testid={`artist-${name.toLowerCase()}`}
              href={tel}
              className="group bg-[#0E0E10] p-6 flex items-center justify-between hover:bg-[#18181C] transition-colors"
            >
              <div>
                <div className="text-white font-bold uppercase tracking-wide">{name}</div>
                <div className="text-xs font-mono text-[#8E8E98] mt-1 group-hover:text-[#D4A373] transition-colors">
                  {num}
                </div>
              </div>
              <ArrowUpRight size={18} className="text-[#D4A373] opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Location ---------------- */
const Location = () => (
  <section id="location" data-testid="location-section" className="py-24 px-6 border-b border-[#25252B]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <Reveal>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D4A373]">05 / Studio Location</span>
          <h2 className="font-manifesto text-4xl sm:text-5xl uppercase text-white mt-2 mb-6">Toms River Studio</h2>
          <div className="space-y-4 text-sm text-[#8E8E98]">
            <p data-testid="studio-address" className="text-white font-medium text-base">
              1201 Hooper Ave, Sola Salon Studios, Suite 8 &amp; 9<br />
              Toms River, NJ 08753
            </p>
            <p>Private suite booked exclusively per guest. One-on-one undivided focus, every appointment.</p>

            <div className="pt-4 border-t border-[#25252B] font-mono text-xs space-y-2" data-testid="studio-hours">
              {HOURS.map(([day, time]) => (
                <div key={day} className="flex justify-between">
                  <span className="uppercase text-[#8E8E98]">{day}</span>
                  <span className={time === "Closed" ? "text-[#8E8E98]" : "text-white"}>{time}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#25252B] font-mono text-xs space-y-2">
              <div className="text-[#D4A373] uppercase tracking-widest mb-2">Call or text your stylist directly</div>
              <a data-testid="location-main-phone" href={PHONE_TEL} className="flex justify-between items-center group">
                <span className="uppercase text-[#8E8E98]">Main line — Andrea</span>
                <span className="text-white group-hover:text-[#D4A373] transition-colors">{PHONE_DISPLAY}</span>
              </a>
              <a data-testid="location-all-artists" href="#artists" className="flex justify-between items-center group">
                <span className="uppercase text-[#8E8E98]">All four stylists</span>
                <span className="text-white group-hover:text-[#D4A373] transition-colors flex items-center gap-1">See Artists <ArrowUpRight size={12} /></span>
              </a>
            </div>

            <div className="pt-4 border-t border-[#25252B]">
              <a
                data-testid="facebook-link"
                href="https://www.facebook.com/charmedbeautynj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs font-mono uppercase text-white hover:text-[#D4A373] transition-colors"
              >
                <Facebook size={14} className="text-[#D4A373]" />
                <span>Facebook — @charmedbeautynj</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-7">
        <Reveal delay={150}>
          <a
            data-testid="map-link"
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-[16/9] w-full bg-gradient-to-br from-[#18181C] via-[#231A12] to-[#0E0E10] border border-[#25252B] p-6 flex flex-col justify-between group hover:border-[#D4A373] transition-colors"
          >
            <div className="flex justify-between items-center text-xs font-mono text-[#D4A373]">
              <span>MAP COORDINATES: TOMS RIVER, NJ</span>
              <span>ZIP: 08753</span>
            </div>
            <div className="flex items-end justify-between">
              <div className="bg-black/90 p-4 border border-[#25252B] max-w-sm">
                <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <MapPin size={12} className="text-[#D4A373]" /> Charmed Beauty 9 &amp; 18
                </span>
                <p className="text-[11px] text-[#8E8E98] mt-1">1201 Hooper Ave, Suite 8 &amp; 9</p>
              </div>
              <span className="text-xs font-mono uppercase text-[#8E8E98] group-hover:text-[#D4A373] transition-colors flex items-center gap-1">
                Open in Maps <ArrowUpRight size={14} />
              </span>
            </div>
          </a>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Final CTA ---------------- */
const FinalCTA = () => (
  <section id="contact" data-testid="final-cta-section" className="py-28 px-6 bg-[#080809] text-center relative overflow-hidden">
    <div className="hero-glow -bottom-1/3 -left-1/4" aria-hidden="true"></div>
    <div className="max-w-3xl mx-auto relative">
      <Reveal>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4A373]">Ready for Your Booking</span>
        <h2 className="font-manifesto text-5xl sm:text-7xl uppercase text-white mt-3 mb-6">
          Reserve Your Slot Now
        </h2>
        <p className="text-[#8E8E98] text-base mb-10 max-w-xl mx-auto">
          Live online booking powered by GlossGenius. Real-time availability for color, cuts,
          treatments, and occasion styling.
        </p>
        <div className="max-w-md mx-auto">
          <BookLink
            testId="final-book-btn"
            className="block w-full py-5 bg-[#D4A373] text-black font-manifesto text-2xl uppercase tracking-wider hover:bg-white transition-colors shadow-2xl"
          >
            Book Now
          </BookLink>
          <div className="mt-6 flex items-center justify-center space-x-6 text-xs font-mono text-[#8E8E98]">
            <a data-testid="cta-call-link" href={PHONE_TEL} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={12} /> {PHONE_DISPLAY}
            </a>
            <a data-testid="cta-text-link" href={PHONE_SMS} className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageSquare size={12} /> Text us
            </a>
          </div>
          <p className="mt-6 text-[11px] font-mono text-[#8E8E98]/70 leading-relaxed">
            50% fee for no-shows or cancellations within 24 hours • 3.5% card processing fee
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---------------- Footer ---------------- */
const Footer = () => (
  <footer className="py-10 px-6 border-t border-[#25252B] bg-[#080809]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#8E8E98]">
      <div className="uppercase text-white font-bold">Charmed Beauty 9 &amp; 18 • Toms River, NJ</div>
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <a href="#hero" className="hover:text-white transition-colors">Top</a>
        <a href="#manifesto" className="hover:text-white transition-colors">Manifesto</a>
        <a href="#offerings" className="hover:text-white transition-colors">Offerings</a>
        <a href="#standards" className="hover:text-white transition-colors">Standards</a>
        <a href="#artists" className="hover:text-white transition-colors">Artists</a>
        <a href="#location" className="hover:text-white transition-colors">Location</a>
        <BookLink testId="footer-book-link" className="hover:text-white transition-colors">Book</BookLink>
      </nav>
      <div className="flex items-center gap-4">
        <span>Woman-Owned Atelier</span>
        <a
          data-testid="footer-mo-studio"
          href="https://mozeid.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#D4A373] transition-colors"
        >
          Designed by Mo Studio
        </a>
      </div>
    </div>
  </footer>
);

/* ---------------- Floating Book Now ---------------- */
const FloatingBook = () => (
  <BookLink
    testId="floating-book-btn"
    className="float-book fixed bottom-6 right-6 z-50 px-6 py-4 bg-[#D4A373] text-black font-manifesto uppercase tracking-wider text-base hover:bg-white transition-colors flex items-center gap-2"
  >
    Book Now <ArrowUpRight size={16} />
  </BookLink>
);

function App() {
  return (
    <div className="grain bg-[#0E0E10] text-[#ECECEC] antialiased min-h-screen font-sans">
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Marquee />
        <MediaFrame />
        <Offerings />
        <Standards />
        <Artists />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingBook />
    </div>
  );
}

export default App;
