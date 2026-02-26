import { useState } from "react";

const STYLES = [
  { name: "Knotless Box Braids", price: "$180", duration: "5–6 hrs", desc: "Lightweight, natural-looking box braids with no tension at the root. Perfect for protective styling.", tag: "Best Seller", emoji: "✦" },
  { name: "Fulani Braids", price: "$160", duration: "4–5 hrs", desc: "Tribal-inspired braids with cornrows, beads, and a signature center braid. A cultural classic.", tag: "Trending", emoji: "◈" },
  { name: "Ghana Braids", price: "$150", duration: "3–4 hrs", desc: "Feed-in cornrows that gradually increase in size. Sleek, elegant, and long-lasting.", tag: "", emoji: "◇" },
  { name: "Lemonade Braids", price: "$140", duration: "3–4 hrs", desc: "Side-swept cornrows in a distinctive pattern. Bold and iconic.", tag: "", emoji: "◆" },
  { name: "Goddess Locs", price: "$220", duration: "6–7 hrs", desc: "Bohemian faux locs with wavy, flowing ends for a natural, free-spirited look.", tag: "Luxe", emoji: "✿" },
  { name: "Senegalese Twists", price: "$170", duration: "5–6 hrs", desc: "Silky rope twists that are lightweight and versatile. Great for any occasion.", tag: "", emoji: "∞" },
  { name: "Butterfly Locs", price: "$200", duration: "5–6 hrs", desc: "Distressed, feathery locs with a textured, voluminous finish. Ultra-fashionable.", tag: "Trending", emoji: "❋" },
  { name: "Full Wig Install", price: "$120", duration: "1–2 hrs", desc: "Professional lace wig install with natural hairline. Includes glue-free or adhesive options.", tag: "Wig", emoji: "◉" },
  { name: "Frontal Wig Install", price: "$150", duration: "2–3 hrs", desc: "13x4 or 13x6 lace frontal install with customized hairline. Seamless and undetectable.", tag: "Wig", emoji: "◉" },
];

const REVIEWS = [
  { name: "Amara J.", rating: 5, date: "Feb 2025", style: "Knotless Box Braids", text: "Absolutely stunning work. My hair lasted 3 months and still looked fresh. Isi is so talented and patient!" },
  { name: "Destiny M.", rating: 5, date: "Jan 2025", style: "Goddess Locs", text: "I cried when I saw the final result — in the best way. She really listened to what I wanted and delivered perfectly." },
  { name: "Kezia O.", rating: 5, date: "Jan 2025", style: "Frontal Wig Install", text: "The most natural install I've ever had. Nobody could tell it wasn't my real hair. Booking again next month!" },
  { name: "Tolu A.", rating: 5, date: "Dec 2024", style: "Fulani Braids", text: "The beads, the pattern, the precision — chef's kiss. She paid attention to every single detail." },
  { name: "Nadia R.", rating: 4, date: "Dec 2024", style: "Butterfly Locs", text: "Gorgeous locs, very clean work. Salon is cozy and welcoming. Took a little longer than expected but 100% worth it." },
  { name: "Simone B.", rating: 5, date: "Nov 2024", style: "Lemonade Braids", text: "I've been to many braiders and Isi is on another level. My edges were laid, braids were neat and tight without pain." },
];

const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// Fake booked slots
const BOOKED = { "2026-2-27": ["9:00 AM","1:00 PM"], "2026-2-28": ["10:00 AM","3:00 PM"], "2026-3-5": ["9:00 AM"], "2026-3-12": ["2:00 PM","4:00 PM"] };

export default function IsiBraids() {
  const [page, setPage] = useState("home");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [calMonth, setCalMonth] = useState(2); // March
  const [calYear, setCalYear] = useState(2026);
  const [bookingForm, setBookingForm] = useState({ name: "", phone: "", service: "", notes: "" });
  const [bookingDone, setBookingDone] = useState(false);
  const [filterTag, setFilterTag] = useState("All");

  const today = new Date();

  function submitBooking() {
    if (!selectedDate || !selectedTime || !bookingForm.name || !bookingForm.service) return;
    setBookingDone(true);
  }

  const tags = ["All", "Best Seller", "Trending", "Luxe", "Wig"];
  const filtered = filterTag === "All" ? STYLES : STYLES.filter(s => s.tag === filterTag);

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDay(calYear, calMonth);
  const calDays = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  function isBooked(day) {
    if (!day) return false;
    const key = `${calYear}-${calMonth}-${day}`;
    return BOOKED[key]?.length === TIMES.length;
  }
  function isPast(day) {
    if (!day) return false;
    const d = new Date(calYear, calMonth, day);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  }
  function getAvailableTimes(day) {
    const key = `${calYear}-${calMonth}-${day}`;
    const booked = BOOKED[key] || [];
    return TIMES.filter(t => !booked.includes(t));
  }

  const c = {
    bg: "#0D0D0D",
    gold: "#C9A84C",
    goldLight: "#E8C96B",
    cream: "#F5EDD8",
    muted: "#7A6E5F",
    card: "#181818",
    border: "#2A2A2A",
    text: "#F0E8D8",
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Styles", id: "styles" },
    { label: "Book", id: "book" },
    { label: "Reviews", id: "reviews" },
    { label: "About", id: "about" },
  ];

  return (
    <div style={{ background: c.bg, minHeight: "100vh", color: c.text, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0D0D0D; } ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 3px; }
        ::selection { background: #C9A84C33; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .nav-link { transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #C9A84C; }
        .style-card:hover { border-color: #C9A84C55 !important; transform: translateY(-4px); background: #1E1A14 !important; }
        .style-card { transition: all 0.3s ease; }
        .time-btn:hover { background: #C9A84C22 !important; border-color: #C9A84C !important; }
        .cal-day:hover { background: #C9A84C22 !important; cursor: pointer; }
        .book-btn:hover { background: #E8C96B !important; }
        .tag-btn:hover { border-color: #C9A84C !important; color: #C9A84C !important; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "#0D0D0Ddd", backdropFilter: "blur(12px)", borderBottom: `1px solid ${c.border}`, padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "68px" }}>
        <div onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
          <span style={{ fontSize: "22px", fontWeight: "700", letterSpacing: "3px", color: c.gold, textTransform: "uppercase" }}>ISI</span>
          <span style={{ fontSize: "22px", fontWeight: "300", letterSpacing: "3px", color: c.cream }}> BRAIDS</span>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {navItems.map(n => (
            <span key={n.id} className="nav-link" onClick={() => setPage(n.id)}
              style={{ fontSize: "13px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "1.5px", textTransform: "uppercase", color: page === n.id ? c.gold : c.muted, fontWeight: page === n.id ? "500" : "300", borderBottom: page === n.id ? `1px solid ${c.gold}` : "none", paddingBottom: "2px" }}>
              {n.label}
            </span>
          ))}
        </div>
        <button className="book-btn" onClick={() => setPage("book")} style={{ background: c.gold, color: "#0D0D0D", border: "none", borderRadius: "2px", padding: "10px 24px", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", fontWeight: "500", transition: "background 0.2s" }}>
          Book Now
        </button>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <div>
          {/* Hero */}
          <div style={{ minHeight: "92vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "0 80px" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, #C9A84C0A 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #C9A84C05 0%, transparent 50%)" }} />
            {/* Decorative lines */}
            <div style={{ position: "absolute", right: "8%", top: "10%", bottom: "10%", width: "1px", background: `linear-gradient(to bottom, transparent, ${c.gold}44, transparent)` }} />
            <div style={{ position: "absolute", right: "12%", top: "20%", bottom: "20%", width: "1px", background: `linear-gradient(to bottom, transparent, ${c.gold}22, transparent)` }} />

            <div style={{ maxWidth: "620px", animation: "fadeUp 0.9s ease" }}>
              <p style={{ fontSize: "12px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "4px", color: c.gold, textTransform: "uppercase", marginBottom: "24px" }}>Premium African Hair Artistry</p>
              <h1 style={{ fontSize: "clamp(52px, 7vw, 88px)", fontWeight: "300", lineHeight: "1.05", letterSpacing: "-1px", marginBottom: "24px" }}>
                Where <em style={{ fontStyle: "italic", color: c.gold }}>braids</em><br />
                become art.
              </h1>
              <p style={{ fontSize: "18px", fontWeight: "300", color: c.muted, lineHeight: "1.8", maxWidth: "460px", marginBottom: "48px", fontFamily: "'DM Sans', sans-serif" }}>
                Expert African braiding, faux locs, twists & wig installations. Protecting your crown with care and precision.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button className="book-btn" onClick={() => setPage("book")} style={{ background: c.gold, color: "#0D0D0D", border: "none", padding: "16px 40px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontWeight: "500", borderRadius: "2px", transition: "background 0.2s" }}>
                  Book Appointment
                </button>
                <button onClick={() => setPage("styles")} style={{ background: "transparent", color: c.cream, border: `1px solid ${c.border}`, padding: "16px 40px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontWeight: "300", borderRadius: "2px" }}>
                  View Styles
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {[["500+", "Happy Clients"], ["9", "Signature Styles"], ["5★", "Avg. Rating"], ["3+", "Years Experience"]].map(([n, l]) => (
              <div key={l} style={{ padding: "40px", textAlign: "center", borderRight: `1px solid ${c.border}` }}>
                <div style={{ fontSize: "36px", fontWeight: "600", color: c.gold, marginBottom: "6px" }}>{n}</div>
                <div style={{ fontSize: "12px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", color: c.muted, textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Featured styles */}
          <div style={{ padding: "100px 80px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px" }}>
              <div>
                <p style={{ fontSize: "11px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "4px", color: c.gold, textTransform: "uppercase", marginBottom: "12px" }}>Our Craft</p>
                <h2 style={{ fontSize: "48px", fontWeight: "300" }}>Signature Styles</h2>
              </div>
              <span onClick={() => setPage("styles")} style={{ color: c.gold, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", letterSpacing: "1px", borderBottom: `1px solid ${c.gold}44`, paddingBottom: "2px" }}>View all styles →</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {STYLES.slice(0, 3).map(s => (
                <div key={s.name} className="style-card" style={{ background: c.card, border: `1px solid ${c.border}`, padding: "36px 28px" }}>
                  <div style={{ fontSize: "28px", marginBottom: "16px", color: c.gold }}>{s.emoji}</div>
                  <h3 style={{ fontSize: "22px", fontWeight: "400", marginBottom: "10px" }}>{s.name}</h3>
                  <p style={{ fontSize: "14px", fontFamily: "'DM Sans', sans-serif", color: c.muted, lineHeight: "1.7", marginBottom: "24px" }}>{s.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "24px", fontWeight: "600", color: c.gold }}>{s.price}</span>
                    <span style={{ fontSize: "12px", fontFamily: "'DM Sans', sans-serif", color: c.muted }}>{s.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA strip */}
          <div style={{ margin: "0 80px 100px", background: `linear-gradient(135deg, #1A1508, #221C08)`, border: `1px solid ${c.gold}33`, padding: "60px 80px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "36px", fontWeight: "300", marginBottom: "10px" }}>Ready to transform your look?</h3>
              <p style={{ color: c.muted, fontFamily: "'DM Sans', sans-serif" }}>Book your appointment today. Limited slots available each week.</p>
            </div>
            <button className="book-btn" onClick={() => setPage("book")} style={{ background: c.gold, color: "#0D0D0D", border: "none", padding: "18px 48px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontWeight: "500", borderRadius: "2px", whiteSpace: "nowrap", transition: "background 0.2s" }}>
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* STYLES PAGE */}
      {page === "styles" && (
        <div style={{ padding: "80px" }}>
          <p style={{ fontSize: "11px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "4px", color: c.gold, textTransform: "uppercase", marginBottom: "12px" }}>The Menu</p>
          <h2 style={{ fontSize: "56px", fontWeight: "300", marginBottom: "16px" }}>Our Styles</h2>
          <p style={{ color: c.muted, fontFamily: "'DM Sans', sans-serif", marginBottom: "48px", maxWidth: "500px", lineHeight: "1.8" }}>Every style is crafted with precision, using quality extensions and techniques refined over years of practice.</p>

          {/* Filter tags */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "48px", flexWrap: "wrap" }}>
            {tags.map(tag => (
              <button key={tag} className="tag-btn" onClick={() => setFilterTag(tag)} style={{ background: filterTag === tag ? c.gold : "transparent", color: filterTag === tag ? "#0D0D0D" : c.muted, border: `1px solid ${filterTag === tag ? c.gold : c.border}`, padding: "8px 20px", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", transition: "all 0.2s" }}>
                {tag}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
            {filtered.map((s, i) => (
              <div key={s.name} className="style-card" style={{ background: c.card, border: `1px solid ${c.border}`, padding: "36px 28px", animationDelay: `${i * 0.05}s`, position: "relative", overflow: "hidden" }}>
                {s.tag && (
                  <div style={{ position: "absolute", top: "16px", right: "16px", background: c.gold + "22", color: c.gold, fontSize: "10px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "1.5px", textTransform: "uppercase", padding: "4px 10px", border: `1px solid ${c.gold}44` }}>{s.tag}</div>
                )}
                <div style={{ fontSize: "32px", marginBottom: "20px", color: c.gold }}>{s.emoji}</div>
                <h3 style={{ fontSize: "24px", fontWeight: "400", marginBottom: "12px" }}>{s.name}</h3>
                <p style={{ fontSize: "14px", fontFamily: "'DM Sans', sans-serif", color: c.muted, lineHeight: "1.8", marginBottom: "28px" }}>{s.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "20px", borderTop: `1px solid ${c.border}` }}>
                  <span style={{ fontSize: "28px", fontWeight: "600", color: c.gold }}>{s.price}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "12px", fontFamily: "'DM Sans', sans-serif", color: c.muted, letterSpacing: "1px" }}>DURATION</div>
                    <div style={{ fontSize: "14px", fontFamily: "'DM Sans', sans-serif", color: c.cream }}>{s.duration}</div>
                  </div>
                </div>
                <button className="book-btn" onClick={() => { setBookingForm(f => ({ ...f, service: s.name })); setPage("book"); }} style={{ marginTop: "20px", width: "100%", background: "transparent", color: c.gold, border: `1px solid ${c.gold}55`, padding: "12px", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", transition: "background 0.2s" }}>
                  Book This Style
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOK PAGE */}
      {page === "book" && (
        <div style={{ padding: "80px", maxWidth: "1100px" }}>
          <p style={{ fontSize: "11px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "4px", color: c.gold, textTransform: "uppercase", marginBottom: "12px" }}>Reserve Your Seat</p>
          <h2 style={{ fontSize: "56px", fontWeight: "300", marginBottom: "48px" }}>Book an Appointment</h2>

          {bookingDone ? (
            <div style={{ background: c.card, border: `1px solid ${c.gold}55`, padding: "60px", textAlign: "center", maxWidth: "560px" }}>
              <div style={{ fontSize: "48px", marginBottom: "24px" }}>✦</div>
              <h3 style={{ fontSize: "32px", fontWeight: "300", color: c.gold, marginBottom: "16px" }}>You're booked!</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: c.muted, lineHeight: "1.8", marginBottom: "8px" }}>
                <strong style={{ color: c.cream }}>{bookingForm.name}</strong> — {bookingForm.service}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: c.muted }}>
                {selectedDate && `${MONTHS[calMonth]} ${selectedDate}, ${calYear}`} at {selectedTime}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: c.muted, marginTop: "16px", fontSize: "13px" }}>We'll confirm via phone. See you soon 🌟</p>
              <button onClick={() => { setBookingDone(false); setSelectedDate(null); setSelectedTime(null); setBookingForm({ name: "", phone: "", service: "", notes: "" }); }} style={{ marginTop: "32px", background: "transparent", color: c.gold, border: `1px solid ${c.gold}`, padding: "12px 32px", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", borderRadius: "2px" }}>
                Book Another
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
              {/* Calendar */}
              <div>
                <div style={{ background: c.card, border: `1px solid ${c.border}`, padding: "32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                    <button onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1); } else setCalMonth(m => m-1); }} style={{ background: "none", border: "none", color: c.muted, cursor: "pointer", fontSize: "20px", padding: "4px 10px" }}>‹</button>
                    <span style={{ fontSize: "18px", fontWeight: "400" }}>{MONTHS[calMonth]} {calYear}</span>
                    <button onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1); } else setCalMonth(m => m+1); }} style={{ background: "none", border: "none", color: c.muted, cursor: "pointer", fontSize: "20px", padding: "4px 10px" }}>›</button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", marginBottom: "8px" }}>
                    {DAYS.map(d => <div key={d} style={{ textAlign: "center", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", color: c.muted, padding: "6px 0", letterSpacing: "1px" }}>{d}</div>)}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px" }}>
                    {calDays.map((day, i) => {
                      const past = isPast(day);
                      const booked = isBooked(day);
                      const isSelected = selectedDate === day;
                      const isSun = day ? new Date(calYear, calMonth, day).getDay() === 0 : false;
                      return (
                        <div key={i} className={day && !past && !booked && !isSun ? "cal-day" : ""}
                          onClick={() => { if (day && !past && !booked && !isSun) { setSelectedDate(day); setSelectedTime(null); } }}
                          style={{ textAlign: "center", padding: "8px 4px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", borderRadius: "2px", background: isSelected ? c.gold : "transparent", color: !day ? "transparent" : past || isSun ? c.border : booked ? c.muted : isSelected ? "#0D0D0D" : c.cream, cursor: day && !past && !booked && !isSun ? "pointer" : "default", textDecoration: booked && day ? "line-through" : "none", transition: "background 0.15s" }}>
                          {day || ""}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: "20px", display: "flex", gap: "20px", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", color: c.muted }}>
                    <span>⬛ Unavailable</span>
                    <span style={{ color: c.gold }}>■ Selected</span>
                  </div>
                </div>

                {/* Times */}
                {selectedDate && (
                  <div style={{ marginTop: "24px", background: c.card, border: `1px solid ${c.border}`, padding: "28px" }}>
                    <div style={{ fontSize: "13px", fontFamily: "'DM Sans', sans-serif", color: c.muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>Available Times — {MONTHS[calMonth]} {selectedDate}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                      {getAvailableTimes(selectedDate).map(t => (
                        <button key={t} className="time-btn" onClick={() => setSelectedTime(t)} style={{ background: selectedTime === t ? c.gold : "transparent", color: selectedTime === t ? "#0D0D0D" : c.cream, border: `1px solid ${selectedTime === t ? c.gold : c.border}`, padding: "12px 8px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", borderRadius: "2px", transition: "all 0.2s" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Form */}
              <div style={{ background: c.card, border: `1px solid ${c.border}`, padding: "36px" }}>
                <div style={{ fontSize: "13px", fontFamily: "'DM Sans', sans-serif", color: c.muted, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "28px" }}>Your Details</div>
                {[["Full Name *", "name", "text"], ["Phone Number *", "phone", "tel"]].map(([label, field, type]) => (
                  <div key={field} style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", color: c.muted, textTransform: "uppercase", marginBottom: "8px" }}>{label}</label>
                    <input type={type} value={bookingForm[field]} onChange={e => setBookingForm(f => ({ ...f, [field]: e.target.value }))}
                      style={{ width: "100%", background: "#0D0D0D", border: `1px solid ${c.border}`, color: c.cream, padding: "14px 16px", fontSize: "15px", fontFamily: "'Cormorant Garamond', serif", outline: "none", borderRadius: "2px" }} />
                  </div>
                ))}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", color: c.muted, textTransform: "uppercase", marginBottom: "8px" }}>Service *</label>
                  <select value={bookingForm.service} onChange={e => setBookingForm(f => ({ ...f, service: e.target.value }))}
                    style={{ width: "100%", background: "#0D0D0D", border: `1px solid ${c.border}`, color: bookingForm.service ? c.cream : c.muted, padding: "14px 16px", fontSize: "15px", fontFamily: "'Cormorant Garamond', serif", outline: "none", borderRadius: "2px", cursor: "pointer" }}>
                    <option value="">Select a style...</option>
                    {STYLES.map(s => <option key={s.name} value={s.name}>{s.name} — {s.price}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: "28px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", color: c.muted, textTransform: "uppercase", marginBottom: "8px" }}>Notes (optional)</label>
                  <textarea value={bookingForm.notes} onChange={e => setBookingForm(f => ({ ...f, notes: e.target.value }))} rows={3} placeholder="Hair length, special requests..."
                    style={{ width: "100%", background: "#0D0D0D", border: `1px solid ${c.border}`, color: c.cream, padding: "14px 16px", fontSize: "15px", fontFamily: "'Cormorant Garamond', serif", outline: "none", borderRadius: "2px", resize: "vertical" }} />
                </div>

                {/* Summary */}
                {(selectedDate || selectedTime || bookingForm.service) && (
                  <div style={{ background: "#0D0D0D", border: `1px solid ${c.gold}33`, padding: "20px", marginBottom: "24px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", lineHeight: "2" }}>
                    {selectedDate && <div style={{ color: c.muted }}>📅 {MONTHS[calMonth]} {selectedDate}, {calYear}</div>}
                    {selectedTime && <div style={{ color: c.muted }}>🕐 {selectedTime}</div>}
                    {bookingForm.service && <div style={{ color: c.muted }}>✂️ {bookingForm.service}</div>}
                  </div>
                )}

                <button className="book-btn" onClick={submitBooking}
                  disabled={!selectedDate || !selectedTime || !bookingForm.name || !bookingForm.service}
                  style={{ width: "100%", background: (!selectedDate || !selectedTime || !bookingForm.name || !bookingForm.service) ? c.border : c.gold, color: "#0D0D0D", border: "none", padding: "18px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", textTransform: "uppercase", cursor: (!selectedDate || !selectedTime || !bookingForm.name || !bookingForm.service) ? "not-allowed" : "pointer", fontWeight: "500", borderRadius: "2px", transition: "background 0.2s" }}>
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* REVIEWS PAGE */}
      {page === "reviews" && (
        <div style={{ padding: "80px" }}>
          <p style={{ fontSize: "11px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "4px", color: c.gold, textTransform: "uppercase", marginBottom: "12px" }}>What Clients Say</p>
          <h2 style={{ fontSize: "56px", fontWeight: "300", marginBottom: "16px" }}>Reviews & Ratings</h2>

          {/* Overall rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "40px", marginBottom: "64px", padding: "40px", background: c.card, border: `1px solid ${c.border}`, maxWidth: "540px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "72px", fontWeight: "600", color: c.gold, lineHeight: "1" }}>4.9</div>
              <div style={{ fontSize: "24px", color: c.gold, marginTop: "8px" }}>★★★★★</div>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", color: c.muted, marginBottom: "16px", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase" }}>Overall Rating</div>
              {[[5,"████████████",92],[4,"██",7],[3,"",1]].map(([stars, bar, pct]) => (
                <div key={stars} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", fontFamily: "'DM Sans', sans-serif", color: c.muted, width: "20px" }}>{stars}★</span>
                  <div style={{ width: "120px", height: "6px", background: c.border, borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: c.gold }} />
                  </div>
                  <span style={{ fontSize: "11px", fontFamily: "'DM Sans', sans-serif", color: c.muted }}>{pct}%</span>
                </div>
              ))}
              <div style={{ marginTop: "16px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", color: c.muted }}>Based on {REVIEWS.length} reviews</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "24px" }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: c.card, border: `1px solid ${c.border}`, padding: "32px", position: "relative" }}>
                <div style={{ fontSize: "40px", color: c.gold + "22", position: "absolute", top: "20px", right: "24px", fontFamily: "serif", lineHeight: "1" }}>"</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{r.name}</div>
                    <div style={{ fontSize: "12px", fontFamily: "'DM Sans', sans-serif", color: c.gold }}>{r.style}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: c.gold, letterSpacing: "2px" }}>{"★".repeat(r.rating)}<span style={{ color: c.border }}>{"★".repeat(5 - r.rating)}</span></div>
                    <div style={{ fontSize: "11px", fontFamily: "'DM Sans', sans-serif", color: c.muted, marginTop: "4px" }}>{r.date}</div>
                  </div>
                </div>
                <p style={{ fontSize: "16px", fontWeight: "300", lineHeight: "1.8", color: "#C8BFB0", fontStyle: "italic" }}>"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABOUT PAGE */}
      {page === "about" && (
        <div style={{ padding: "80px", maxWidth: "900px" }}>
          <p style={{ fontSize: "11px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "4px", color: c.gold, textTransform: "uppercase", marginBottom: "12px" }}>The Artist</p>
          <h2 style={{ fontSize: "56px", fontWeight: "300", marginBottom: "48px" }}>About Isi Braids</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
            <div>
              <div style={{ width: "100%", aspectRatio: "3/4", background: `linear-gradient(135deg, #1A1508, #2A2010)`, border: `1px solid ${c.gold}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "80px", color: c.gold + "44" }}>
                ✦
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: "32px", fontWeight: "300", marginBottom: "24px", color: c.gold }}>Crafting beauty,<br /><em>one braid at a time.</em></h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: c.muted, lineHeight: "1.9", marginBottom: "24px" }}>
                Isi Braids was founded on the belief that African hair is a canvas — rich with culture, heritage, and beauty. With over 3 years of dedicated craft, we specialize in protective styles that honor tradition while embracing modern creativity.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: c.muted, lineHeight: "1.9", marginBottom: "40px" }}>
                From the intricate patterns of Fulani braids to flawless wig installations, every client leaves feeling like royalty. Your hair's health and your comfort are always the top priority.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px" }}>
                {[["Specialties", "Knotless braids, Locs, Wig installs"], ["Location", "By appointment only"], ["Hours", "Mon–Sat · 9AM–6PM"], ["Experience", "3+ years & 500+ clients"]].map(([k, v]) => (
                  <div key={k} style={{ padding: "20px", background: c.card, border: `1px solid ${c.border}` }}>
                    <div style={{ fontSize: "10px", fontFamily: "'DM Sans', sans-serif", color: c.gold, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>{k}</div>
                    <div style={{ fontSize: "14px", fontFamily: "'DM Sans', sans-serif", color: c.cream }}>{v}</div>
                  </div>
                ))}
              </div>
              <button className="book-btn" onClick={() => setPage("book")} style={{ background: c.gold, color: "#0D0D0D", border: "none", padding: "16px 40px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontWeight: "500", borderRadius: "2px", transition: "background 0.2s" }}>
                Book with Isi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${c.border}`, padding: "48px 80px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "40px" }}>
        <div>
          <div style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "3px", color: c.gold, textTransform: "uppercase", marginBottom: "6px" }}>ISI BRAIDS</div>
          <div style={{ fontSize: "13px", fontFamily: "'DM Sans', sans-serif", color: c.muted }}>Premium African Hair Artistry</div>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {navItems.map(n => (
            <span key={n.id} onClick={() => setPage(n.id)} style={{ fontSize: "12px", fontFamily: "'DM Sans', sans-serif", color: c.muted, cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase" }}>{n.label}</span>
          ))}
        </div>
        <div style={{ fontSize: "12px", fontFamily: "'DM Sans', sans-serif", color: c.muted }}>© 2026 Isi Braids</div>
      </footer>
    </div>
  );
}
