import React, { useState, useMemo } from "react";
import {
  Search, MapPin, ShoppingCart, Menu as MenuIcon, X, Plus, Minus, Star,
  QrCode, Sparkles, LayoutDashboard, Package, Tag, Users, Warehouse,
  LayoutGrid, ClipboardList, UserCircle2, Settings as SettingsIcon,
  ChevronRight, ChevronLeft, Check, AlertTriangle, Trash2, Pencil,
  LogOut, Download, RefreshCw, Lock, Bell, Flame, Leaf
} from "lucide-react";

/* ---------------------------------------------------------------
   TOKENS
   Ink background, warm brass accent, bone text on dark, editorial
   serif display paired with a plain sans body. Built for "Kaveri
   Kitchen" — a fictional hotel-restaurant used as concrete subject
   matter for the demo data.
---------------------------------------------------------------- */
const INK = "#14181A";
const INK_SOFT = "#1D2326";
const BONE = "#F3EEE3";
const BRASS = "#C8963E";
const BRASS_SOFT = "#E4B65F";
const LINE = "rgba(243,238,227,0.12)";

const serif = { fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif" };

const CATEGORIES = ["All", "Momo", "Chicken", "Biryani", "Chinese", "Indian", "Drinks", "Desserts", "Italian"];

const seedProducts = () => ([
  { id: "p1", name: "Chicken Momo", category: "Momo", price: 180, rating: 4.8, veg: false, bestseller: true, available: true, qty: "8 pcs", desc: "Steamed dumplings with a peppery chicken filling and house chutney.", img: "🥟" },
  { id: "p2", name: "Veg Momo", category: "Momo", price: 150, rating: 4.5, veg: true, bestseller: false, available: true, qty: "8 pcs", desc: "Cabbage, carrot and onion folded into a light steamed wrapper.", img: "🥟" },
  { id: "p3", name: "Chicken Pizza", category: "Italian", price: 399, rating: 4.9, veg: false, bestseller: true, available: true, qty: "9\" regular", desc: "Loaded with chicken, mozzarella and fresh vegetables.", img: "🍕" },
  { id: "p4", name: "Chicken Biryani", category: "Biryani", price: 280, rating: 4.7, veg: false, bestseller: true, available: true, qty: "1 plate", desc: "Slow-cooked basmati layered with marinated chicken and saffron.", img: "🍛" },
  { id: "p5", name: "Chicken Leg", category: "Chicken", price: 250, rating: 4.8, veg: false, bestseller: false, available: true, qty: "2 pcs", desc: "Crispy spiced chicken leg, tandoor finished.", img: "🍗" },
  { id: "p6", name: "Paneer Butter Masala", category: "Indian", price: 220, rating: 4.6, veg: true, bestseller: false, available: true, qty: "1 bowl", desc: "Paneer in a silky tomato-butter gravy, served with a side of rice.", img: "🍲" },
  { id: "p7", name: "French Fries", category: "Chinese", price: 120, rating: 4.4, veg: true, bestseller: false, available: true, qty: "1 basket", desc: "Salted, crisped twice, served with a smoked chilli dip.", img: "🍟" },
  { id: "p8", name: "Cold Drink", category: "Drinks", price: 60, rating: 4.2, veg: true, bestseller: false, available: true, qty: "300ml", desc: "Chilled soft drink, pick your favourite.", img: "🥤" },
  { id: "p9", name: "Gulab Jamun", category: "Desserts", price: 90, rating: 4.7, veg: true, bestseller: false, available: true, qty: "2 pcs", desc: "Warm milk dumplings soaked in cardamom syrup.", img: "🍮" },
  { id: "p10", name: "Chilli Chicken", category: "Chinese", price: 260, rating: 4.6, veg: false, bestseller: true, available: true, qty: "1 plate", desc: "Wok-tossed chicken in a sharp garlic-chilli glaze.", img: "🌶️" },
]);

const seedStaff = () => ([
  { id: "s1", name: "Rina Das", role: "Super Admin", email: "rina@kaverikitchen.in", active: true },
  { id: "s2", name: "Manoj Rao", role: "Manager", email: "manoj@kaverikitchen.in", active: true },
  { id: "s3", name: "Priya Nair", role: "Kitchen Staff", email: "priya@kaverikitchen.in", active: true },
  { id: "s4", name: "Aman Gill", role: "Waiter", email: "aman@kaverikitchen.in", active: true },
  { id: "s5", name: "Sunita Roy", role: "Cashier", email: "sunita@kaverikitchen.in", active: false },
]);

const seedInventory = () => ([
  { id: "i1", name: "Chicken", qty: 10, unit: "kg", min: 5, supplier: "Local Poultry Co.", updated: "Today, 9:10 AM" },
  { id: "i2", name: "Momo Wrapper", qty: 150, unit: "pcs", min: 100, supplier: "Everfresh Wraps", updated: "Today, 8:40 AM" },
  { id: "i3", name: "Cold Drink", qty: 40, unit: "bottles", min: 24, supplier: "Beverage Hub", updated: "Yesterday, 6:20 PM" },
  { id: "i4", name: "Pizza Base", qty: 6, unit: "pcs", min: 10, supplier: "Bake House", updated: "Today, 7:55 AM" },
  { id: "i5", name: "Paneer", qty: 3, unit: "kg", min: 5, supplier: "Local Dairy", updated: "Today, 9:30 AM" },
]);

const seedTables = () => ([
  { id: "t1", name: "Table 1", status: "Available", order: [] },
  { id: "t2", name: "Table 2", status: "Occupied", order: [{ name: "Momo", qty: 1, price: 180 }, { name: "Cold Drink", qty: 2, price: 60 }] },
  { id: "t3", name: "Table 3", status: "Available", order: [] },
  { id: "t4", name: "Table 4", status: "Cleaning", order: [] },
  { id: "t5", name: "Table 5", status: "Occupied", order: [{ name: "Chicken Momo", qty: 1, price: 180 }, { name: "Cold Drink", qty: 2, price: 60 }, { name: "Chicken Pizza", qty: 1, price: 399 }] },
  { id: "t6", name: "Table 6", status: "Available", order: [] },
]);

const seedOrders = () => ([
  { id: "ORD-1042", type: "Delivery", customer: "Ankit Sharma", phone: "98xxxxxx21", address: "44 MG Road", items: [{ name: "Chicken Biryani", qty: 1 }], total: 280, status: "Preparing", time: "10 min ago" },
  { id: "ORD-1041", type: "Takeaway", customer: "Meera Iyer", phone: "97xxxxxx08", items: [{ name: "Chicken Pizza", qty: 1 }, { name: "Cold Drink", qty: 1 }], total: 459, status: "Ready", time: "22 min ago" },
  { id: "ORD-1040", type: "Dine-in", customer: "Table 5", items: [{ name: "Chicken Momo", qty: 1 }, { name: "Cold Drink", qty: 2 }, { name: "Chicken Pizza", qty: 1 }], total: 699, status: "New", time: "3 min ago" },
]);

const STATUS_FLOW = ["New", "Accepted", "Preparing", "Ready", "Out for Delivery", "Delivered", "Cancelled"];
const money = (n) => `\u20b9${n.toLocaleString("en-IN")}`;

/* ---------------------------------------------------------------
   SHARED BITS
---------------------------------------------------------------- */
function Badge({ children, tone = "brass" }) {
  const tones = {
    brass: { bg: "rgba(200,150,62,0.15)", color: BRASS_SOFT },
    green: { bg: "rgba(90,168,110,0.15)", color: "#7FCB93" },
    red: { bg: "rgba(214,90,90,0.15)", color: "#E58080" },
    grey: { bg: "rgba(243,238,227,0.08)", color: "rgba(243,238,227,0.6)" },
  };
  const t = tones[tone];
  return (
    <span style={{ background: t.bg, color: t.color, fontSize: 11, padding: "3px 8px", borderRadius: 999, letterSpacing: 0.3 }}>
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    Available: "green", Occupied: "red", Cleaning: "grey",
    New: "brass", Accepted: "brass", Preparing: "brass", Ready: "green",
    "Out for Delivery": "brass", Delivered: "green", Cancelled: "red",
    "In Stock": "green", "Low Stock": "brass", "Out of Stock": "red",
  };
  return <StatusBadgeInner status={status} tone={map[status] || "grey"} />;
}
function StatusBadgeInner({ status, tone }) { return <Badge tone={tone}>{status}</Badge>; }

/* ---------------------------------------------------------------
   ROOT APP
---------------------------------------------------------------- */
export default function HotelSystem() {
  const [view, setView] = useState("landing"); // landing | order | digital | adminLogin | admin
  const [products, setProducts] = useState(seedProducts());
  const [staff, setStaff] = useState(seedStaff());
  const [inventory, setInventory] = useState(seedInventory());
  const [tables, setTables] = useState(seedTables());
  const [orders, setOrders] = useState(seedOrders());
  const [hotel, setHotel] = useState({ name: "Kaveri Kitchen", phone: "+91 98765 43210", address: "44 MG Road, Guwahati, Assam", about: "A modern hotel kitchen serving Indian, Chinese and Italian favourites — dine-in, takeaway or delivered to your door." });
  const [cart, setCart] = useState({}); // id -> qty
  const [isAdmin, setIsAdmin] = useState(false);

  const addToCart = (id, delta) => {
    setCart((c) => {
      const next = { ...c, [id]: Math.max(0, (c[id] || 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const placeOrder = (order) => {
    setOrders((o) => [order, ...o]);
    setCart({});
  };

  const nav = (v) => { setView(v); window.scrollTo?.(0, 0); };

  return (
    <div style={{ minHeight: "100%", background: view === "admin" || view === "adminLogin" ? INK : BONE, color: view === "admin" || view === "adminLogin" ? BONE : INK, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {view !== "admin" && view !== "adminLogin" && (
        <SiteHeader view={view} nav={nav} cartCount={cartCount} hotelName={hotel.name} />
      )}

      {view === "landing" && <Landing nav={nav} products={products} hotel={hotel} />}
      {view === "order" && (
        <OrderPage products={products} cart={cart} addToCart={addToCart} placeOrder={placeOrder} nav={nav} />
      )}
      {view === "digital" && <DigitalMenu products={products} hotel={hotel} nav={nav} />}
      {view === "adminLogin" && <AdminLogin onLogin={() => { setIsAdmin(true); setView("admin"); }} nav={nav} />}
      {view === "admin" && isAdmin && (
        <AdminApp
          products={products} setProducts={setProducts}
          staff={staff} setStaff={setStaff}
          inventory={inventory} setInventory={setInventory}
          tables={tables} setTables={setTables}
          orders={orders} setOrders={setOrders}
          hotel={hotel} setHotel={setHotel}
          onLogout={() => { setIsAdmin(false); nav("landing"); }}
          nav={nav}
        />
      )}
      {view !== "admin" && view !== "adminLogin" && <SiteFooter hotel={hotel} nav={nav} />}
    </div>
  );
}

/* ---------------------------------------------------------------
   SITE HEADER / FOOTER
---------------------------------------------------------------- */
function SiteHeader({ view, nav, cartCount, hotelName }) {
  const [open, setOpen] = useState(false);
  const links = [
    { k: "landing", label: "Home" },
    { k: "order", label: "Order Food" },
    { k: "digital", label: "Digital Menu" },
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: BONE, borderBottom: `1px solid rgba(20,24,26,0.1)` }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => nav("landing")} style={{ ...serif, fontSize: 22, letterSpacing: 0.3, background: "none", border: "none", cursor: "pointer", color: INK }}>
          {hotelName}
        </button>
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }} className="hidden-mobile">
          {links.map((l) => (
            <button key={l.k} onClick={() => nav(l.k)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: view === l.k ? BRASS : INK, fontWeight: view === l.k ? 600 : 400, borderBottom: view === l.k ? `2px solid ${BRASS}` : "2px solid transparent", paddingBottom: 4 }}>
              {l.label}
            </button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={() => nav("order")} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: INK }} aria-label="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: -8, right: -10, background: BRASS, color: INK, fontSize: 10, fontWeight: 700, borderRadius: 999, minWidth: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => nav("adminLogin")} style={{ background: INK, color: BONE, border: "none", borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Lock size={13} /> Staff Login
          </button>
        </div>
      </div>
    </header>
  );
}

function SiteFooter({ hotel, nav }) {
  return (
    <footer style={{ background: INK, color: BONE, marginTop: 40 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 32 }}>
        <div>
          <div style={{ ...serif, fontSize: 20, marginBottom: 10 }}>{hotel.name}</div>
          <p style={{ color: "rgba(243,238,227,0.65)", fontSize: 14, maxWidth: 340, lineHeight: 1.6 }}>{hotel.about}</p>
        </div>
        <div>
          <div style={{ fontSize: 12, letterSpacing: 0.5, color: "rgba(243,238,227,0.5)", marginBottom: 10 }}>Explore</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
            <button onClick={() => nav("order")} style={{ background: "none", border: "none", color: BONE, textAlign: "left", cursor: "pointer", padding: 0 }}>Order Food</button>
            <button onClick={() => nav("digital")} style={{ background: "none", border: "none", color: BONE, textAlign: "left", cursor: "pointer", padding: 0 }}>Digital Menu</button>
            <button onClick={() => nav("adminLogin")} style={{ background: "none", border: "none", color: BONE, textAlign: "left", cursor: "pointer", padding: 0 }}>Staff Login</button>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, letterSpacing: 0.5, color: "rgba(243,238,227,0.5)", marginBottom: 10 }}>Visit</div>
          <p style={{ fontSize: 14, color: "rgba(243,238,227,0.75)", lineHeight: 1.7 }}>{hotel.address}<br />{hotel.phone}</p>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${LINE}`, textAlign: "center", padding: "16px", fontSize: 12, color: "rgba(243,238,227,0.4)" }}>
        © {new Date().getFullYear()} {hotel.name}. Built as a working prototype.
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------
   LANDING
---------------------------------------------------------------- */
function Landing({ nav, products, hotel }) {
  const best = products.filter((p) => p.bestseller && p.available);
  const popular = products.filter((p) => p.available).slice(0, 8);
  return (
    <div>
      {/* HERO */}
      <section style={{ background: INK, color: BONE }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "88px 24px 72px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, color: BRASS_SOFT, letterSpacing: 0.4, marginBottom: 18 }}>Delivery · Takeaway · Dine-in</div>
            <h1 style={{ ...serif, fontSize: 52, lineHeight: 1.1, margin: "0 0 20px" }}>
              Delicious food,<br />delivered to your door.
            </h1>
            <p style={{ fontSize: 17, color: "rgba(243,238,227,0.7)", maxWidth: 440, lineHeight: 1.6, marginBottom: 32 }}>
              Order your favourite dishes from {hotel.name}, or scan the table QR to browse our full digital menu.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              <button onClick={() => nav("order")} style={{ background: BRASS, color: INK, border: "none", padding: "14px 26px", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Order Now</button>
              <button onClick={() => nav("digital")} style={{ background: "transparent", color: BONE, border: `1px solid ${LINE}`, padding: "14px 26px", borderRadius: 6, fontSize: 15, cursor: "pointer" }}>View Digital Menu</button>
            </div>
          </div>
          <div style={{ background: INK_SOFT, borderRadius: 12, padding: 32, border: `1px solid ${LINE}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(243,238,227,0.06)", borderRadius: 8, padding: "12px 14px", marginBottom: 18 }}>
              <Search size={16} color="rgba(243,238,227,0.5)" />
              <span style={{ fontSize: 14, color: "rgba(243,238,227,0.5)" }}>Search dishes, cuisines…</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, fontSize: 13, color: "rgba(243,238,227,0.55)" }}>
              <MapPin size={14} /> Delivering near Guwahati, Assam
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {best.slice(0, 4).map((d) => (
                <div key={d.id} style={{ background: "rgba(243,238,227,0.05)", borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 26 }}>{d.img}</div>
                  <div style={{ fontSize: 13, marginTop: 6 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: BRASS_SOFT, marginTop: 2 }}>{money(d.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px 8px" }}>
        <SectionHeading title="What are you craving?" />
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8 }}>
          {CATEGORIES.filter((c) => c !== "All").map((c) => (
            <button key={c} onClick={() => nav("order")} style={{ flex: "0 0 auto", background: "#fff", border: "1px solid rgba(20,24,26,0.08)", borderRadius: 10, padding: "18px 22px", cursor: "pointer", textAlign: "center", minWidth: 96 }}>
              <div style={{ fontSize: 26 }}>{categoryEmoji(c)}</div>
              <div style={{ fontSize: 13, marginTop: 8 }}>{c}</div>
            </button>
          ))}
        </div>
      </section>

      {/* POPULAR */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 24px 8px" }}>
        <SectionHeading title="Popular right now" sub="Loved by regulars this week" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {popular.map((d) => <DishCard key={d.id} d={d} onClick={() => nav("order")} compact />)}
        </div>
      </section>

      {/* DIGITAL MENU CTA */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ background: INK, color: BONE, borderRadius: 14, padding: 44, display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 24 }}>
          <div>
            <div style={{ fontSize: 12, color: BRASS_SOFT, letterSpacing: 0.4, marginBottom: 8 }}>AT THE TABLE</div>
            <div style={{ ...serif, fontSize: 28, marginBottom: 8 }}>Scan. Browse. Order.</div>
            <p style={{ color: "rgba(243,238,227,0.65)", fontSize: 14, maxWidth: 420 }}>Every table carries a QR code that opens our full digital menu — no app, no waiting for a printed card.</p>
          </div>
          <button onClick={() => nav("digital")} style={{ background: BRASS, color: INK, border: "none", padding: "14px 24px", borderRadius: 8, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
            <QrCode size={18} /> Open Digital Menu
          </button>
        </div>
      </section>

      {/* AR MENU COMING SOON */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 72px" }}>
        <div style={{ border: `1px solid rgba(200,150,62,0.35)`, borderRadius: 14, padding: 44, textAlign: "center", background: "linear-gradient(180deg, rgba(200,150,62,0.06), transparent)" }}>
          <Sparkles size={22} color={BRASS} style={{ marginBottom: 12 }} />
          <div style={{ ...serif, fontSize: 30, marginBottom: 10 }}>See your food before you order it</div>
          <p style={{ color: "rgba(20,24,26,0.6)", maxWidth: 480, margin: "0 auto 22px", fontSize: 15, lineHeight: 1.6 }}>
            Experience our dishes in Augmented Reality — point your phone at the table and see the plate life-size, before it arrives.
          </p>
          <Badge tone="brass">AR MENU — COMING SOON</Badge>
          <div style={{ marginTop: 20 }}>
            <button disabled style={{ background: "rgba(20,24,26,0.08)", color: "rgba(20,24,26,0.45)", border: "none", padding: "12px 22px", borderRadius: 6, fontSize: 14, cursor: "not-allowed" }}>
              Explore AR Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ title, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ ...serif, fontSize: 24 }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: "rgba(20,24,26,0.5)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function categoryEmoji(c) {
  const map = { Momo: "🥟", Chicken: "🍗", Biryani: "🍛", Chinese: "🥡", Indian: "🍲", Drinks: "🥤", Desserts: "🍮", Italian: "🍕" };
  return map[c] || "🍽️";
}

/* ---------------------------------------------------------------
   DISH CARD (reused in landing / order / digital menu)
---------------------------------------------------------------- */
function DishCard({ d, qty = 0, onAdd, onClick, compact }) {
  return (
    <div
      onClick={onClick}
      style={{ background: "#fff", border: "1px solid rgba(20,24,26,0.08)", borderRadius: 12, overflow: "hidden", cursor: onClick ? "pointer" : "default", display: "flex", flexDirection: "column" }}
    >
      <div style={{ height: compact ? 96 : 120, background: "#F0EAD9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, position: "relative" }}>
        {d.img}
        {d.bestseller && <div style={{ position: "absolute", top: 8, left: 8 }}><Badge tone="brass">Bestseller</Badge></div>}
        <div style={{ position: "absolute", top: 8, right: 8 }}>
          {d.veg ? <Leaf size={16} color="#3E8E52" /> : <Flame size={16} color="#B4472B" />}
        </div>
      </div>
      <div style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</div>
        {!compact && <div style={{ fontSize: 12, color: "rgba(20,24,26,0.55)", marginTop: 4, lineHeight: 1.4 }}>{d.desc}</div>}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, fontSize: 12, color: "rgba(20,24,26,0.6)" }}>
          <Star size={12} fill={BRASS} color={BRASS} /> {d.rating}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{money(d.price)}</div>
          {onAdd && (
            qty === 0 ? (
              <button onClick={(e) => { e.stopPropagation(); onAdd(1); }} style={{ background: INK, color: BONE, border: "none", borderRadius: 6, width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Plus size={15} />
              </button>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: INK, borderRadius: 6, padding: "4px 6px" }}>
                <button onClick={(e) => { e.stopPropagation(); onAdd(-1); }} style={{ background: "none", border: "none", color: BONE, cursor: "pointer" }}><Minus size={14} /></button>
                <span style={{ color: BONE, fontSize: 13, minWidth: 14, textAlign: "center" }}>{qty}</span>
                <button onClick={(e) => { e.stopPropagation(); onAdd(1); }} style={{ background: "none", border: "none", color: BONE, cursor: "pointer" }}><Plus size={14} /></button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ORDER PAGE (browse + cart + checkout)
---------------------------------------------------------------- */
function OrderPage({ products, cart, addToCart, placeOrder, nav }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [step, setStep] = useState("browse"); // browse | type | details | payment | confirmed
  const [orderType, setOrderType] = useState("Delivery");
  const [details, setDetails] = useState({ name: "", phone: "", address: "", landmark: "", instructions: "", table: "" });
  const [confirmedId, setConfirmedId] = useState(null);

  const list = products.filter((p) => p.available && (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(query.toLowerCase()));
  const cartItems = Object.entries(cart).map(([id, qty]) => ({ ...products.find((p) => p.id === id), qty })).filter((x) => x.id);
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const canCheckout = subtotal > 0;

  const submitOrder = () => {
    const id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    placeOrder({
      id, type: orderType,
      customer: orderType === "Dine-in" ? `Table ${details.table || "-"}` : details.name || "Guest",
      phone: details.phone, address: details.address,
      items: cartItems.map((i) => ({ name: i.name, qty: i.qty })),
      total: subtotal, status: "New", time: "just now",
    });
    setConfirmedId(id);
    setStep("confirmed");
  };

  if (step === "confirmed") {
    return (
      <div style={{ maxWidth: 560, margin: "80px auto", textAlign: "center", padding: "0 24px" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(90,168,110,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Check size={30} color="#3E8E52" />
        </div>
        <div style={{ ...serif, fontSize: 26, marginBottom: 8 }}>Order confirmed</div>
        <p style={{ color: "rgba(20,24,26,0.6)", marginBottom: 6 }}>Your order <strong>{confirmedId}</strong> has been sent to the kitchen.</p>
        <p style={{ color: "rgba(20,24,26,0.6)", marginBottom: 28 }}>Total: <strong>{money(subtotal)}</strong> · {orderType}</p>
        <button onClick={() => { setStep("browse"); nav("landing"); }} style={{ background: INK, color: BONE, border: "none", padding: "12px 24px", borderRadius: 6, cursor: "pointer" }}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 24px 80px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
      <div>
        <div style={{ ...serif, fontSize: 28, marginBottom: 18 }}>Order food</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid rgba(20,24,26,0.1)", borderRadius: 8, padding: "10px 14px", marginBottom: 18 }}>
          <Search size={16} color="rgba(20,24,26,0.4)" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search dishes, cuisines…" style={{ border: "none", outline: "none", fontSize: 14, flex: 1, background: "transparent" }} />
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", marginBottom: 22, paddingBottom: 4 }}>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} style={{ flex: "0 0 auto", border: "none", borderRadius: 999, padding: "8px 16px", fontSize: 13, cursor: "pointer", background: cat === c ? INK : "#fff", color: cat === c ? BONE : INK, boxShadow: cat === c ? "none" : "0 0 0 1px rgba(20,24,26,0.1) inset" }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {list.map((d) => <DishCard key={d.id} d={d} qty={cart[d.id] || 0} onAdd={(delta) => addToCart(d.id, delta)} />)}
          {list.length === 0 && <div style={{ color: "rgba(20,24,26,0.5)", fontSize: 14 }}>No dishes match your search.</div>}
        </div>
      </div>

      {/* CART / CHECKOUT PANEL */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid rgba(20,24,26,0.08)", padding: 20, position: "sticky", top: 90 }}>
        {step === "browse" && (
          <>
            <div style={{ fontWeight: 600, marginBottom: 14 }}>Your cart</div>
            {cartItems.length === 0 && <div style={{ fontSize: 13, color: "rgba(20,24,26,0.5)" }}>Add dishes to get started.</div>}
            {cartItems.map((i) => (
              <div key={i.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 10 }}>
                <span>{i.qty} × {i.name}</span>
                <span>{money(i.price * i.qty)}</span>
              </div>
            ))}
            {cartItems.length > 0 && (
              <>
                <div style={{ borderTop: `1px solid rgba(20,24,26,0.08)`, marginTop: 8, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                  <span>Subtotal</span><span>{money(subtotal)}</span>
                </div>
                <button disabled={!canCheckout} onClick={() => setStep("type")} style={{ marginTop: 16, width: "100%", background: INK, color: BONE, border: "none", borderRadius: 6, padding: "12px", cursor: "pointer" }}>
                  Review Order
                </button>
              </>
            )}
          </>
        )}

        {step === "type" && (
          <CheckoutStep title="Choose order type" onBack={() => setStep("browse")}>
            {["Delivery", "Takeaway", "Dine-in"].map((t) => (
              <button key={t} onClick={() => setOrderType(t)} style={{ width: "100%", textAlign: "left", padding: "12px 14px", borderRadius: 8, marginBottom: 8, cursor: "pointer", border: orderType === t ? `2px solid ${BRASS}` : "1px solid rgba(20,24,26,0.1)", background: orderType === t ? "rgba(200,150,62,0.08)" : "#fff" }}>
                {t}
              </button>
            ))}
            <button onClick={() => setStep("details")} style={{ marginTop: 10, width: "100%", background: INK, color: BONE, border: "none", borderRadius: 6, padding: "12px", cursor: "pointer" }}>Continue</button>
          </CheckoutStep>
        )}

        {step === "details" && (
          <CheckoutStep title="Your details" onBack={() => setStep("type")}>
            {orderType === "Dine-in" ? (
              <Field label="Table number" value={details.table} onChange={(v) => setDetails({ ...details, table: v })} />
            ) : (
              <>
                <Field label="Name" value={details.name} onChange={(v) => setDetails({ ...details, name: v })} />
                <Field label="Phone" value={details.phone} onChange={(v) => setDetails({ ...details, phone: v })} />
                {orderType === "Delivery" && (
                  <>
                    <Field label="Address" value={details.address} onChange={(v) => setDetails({ ...details, address: v })} />
                    <Field label="Landmark" value={details.landmark} onChange={(v) => setDetails({ ...details, landmark: v })} />
                    <Field label="Delivery instructions" value={details.instructions} onChange={(v) => setDetails({ ...details, instructions: v })} />
                  </>
                )}
              </>
            )}
            <button onClick={() => setStep("payment")} style={{ marginTop: 10, width: "100%", background: INK, color: BONE, border: "none", borderRadius: 6, padding: "12px", cursor: "pointer" }}>Continue to Payment</button>
          </CheckoutStep>
        )}

        {step === "payment" && (
          <CheckoutStep title="Payment" onBack={() => setStep("details")}>
            <div style={{ fontSize: 13, color: "rgba(20,24,26,0.6)", marginBottom: 14 }}>Total due: <strong>{money(subtotal)}</strong></div>
            {["Pay on Delivery / Counter", "UPI", "Card"].map((m) => (
              <div key={m} style={{ padding: "10px 12px", border: "1px solid rgba(20,24,26,0.1)", borderRadius: 8, marginBottom: 8, fontSize: 13 }}>{m}</div>
            ))}
            <button onClick={submitOrder} style={{ marginTop: 10, width: "100%", background: BRASS, color: INK, border: "none", borderRadius: 6, padding: "12px", fontWeight: 600, cursor: "pointer" }}>Place Order</button>
          </CheckoutStep>
        )}
      </div>
    </div>
  );
}

function CheckoutStep({ title, onBack, children }) {
  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "rgba(20,24,26,0.5)", marginBottom: 12, padding: 0 }}>
        <ChevronLeft size={14} /> Back
      </button>
      <div style={{ fontWeight: 600, marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ fontSize: 11, color: "rgba(20,24,26,0.5)" }}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", border: "1px solid rgba(20,24,26,0.15)", borderRadius: 6, padding: "9px 10px", fontSize: 13, marginTop: 4, outline: "none" }} />
    </div>
  );
}

/* ---------------------------------------------------------------
   DIGITAL MENU (mobile-first, QR-triggered)
---------------------------------------------------------------- */
function DigitalMenu({ products, hotel, nav }) {
  const grouped = CATEGORIES.filter((c) => c !== "All").map((c) => ({ cat: c, items: products.filter((p) => p.category === c && p.available) })).filter((g) => g.items.length);
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 0 60px" }}>
      <div style={{ background: INK, color: BONE, padding: "40px 24px 28px", textAlign: "center" }}>
        <div style={{ ...serif, fontSize: 24 }}>{hotel.name}</div>
        <div style={{ fontSize: 12, color: "rgba(243,238,227,0.55)", marginTop: 6 }}>Digital Menu</div>
      </div>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid rgba(20,24,26,0.1)", borderRadius: 8, padding: "10px 12px", marginBottom: 20 }}>
          <Search size={15} color="rgba(20,24,26,0.4)" />
          <span style={{ fontSize: 13, color: "rgba(20,24,26,0.4)" }}>Search the menu…</span>
        </div>
        {grouped.map((g) => (
          <div key={g.cat} style={{ marginBottom: 26 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>{g.cat}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {g.items.map((d) => (
                <div key={d.id} style={{ display: "flex", gap: 12, background: "#fff", border: "1px solid rgba(20,24,26,0.08)", borderRadius: 10, padding: 10 }}>
                  <div style={{ width: 52, height: 52, background: "#F0EAD9", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{d.img}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(20,24,26,0.5)", marginTop: 2 }}>{d.desc}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, alignItems: "center" }}>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{money(d.price)}</span>
                      <span style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}><Star size={11} fill={BRASS} color={BRASS} />{d.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ border: `1px solid rgba(200,150,62,0.35)`, borderRadius: 12, padding: 22, textAlign: "center", marginBottom: 22 }}>
          <Sparkles size={18} color={BRASS} style={{ marginBottom: 8 }} />
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>AR Menu</div>
          <div style={{ fontSize: 12, color: "rgba(20,24,26,0.55)", marginBottom: 10 }}>See any dish in augmented reality before you order.</div>
          <Badge tone="brass">Coming Soon</Badge>
        </div>

        <button onClick={() => nav("order")} style={{ width: "100%", background: INK, color: BONE, border: "none", borderRadius: 8, padding: "14px", fontSize: 14, cursor: "pointer", marginBottom: 10 }}>
          Order from this menu
        </button>
        <div style={{ textAlign: "center", fontSize: 12, color: "rgba(20,24,26,0.45)" }}>{hotel.phone} · {hotel.address}</div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ADMIN LOGIN
---------------------------------------------------------------- */
function AdminLogin({ onLogin, nav }) {
  const [form, setForm] = useState({ user: "", pass: "" });
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: 360, background: INK_SOFT, border: `1px solid ${LINE}`, borderRadius: 12, padding: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: 0.5, color: "rgba(243,238,227,0.5)", marginBottom: 6 }}>HOTEL MANAGEMENT</div>
        <div style={{ ...serif, fontSize: 24, marginBottom: 24 }}>Staff Login</div>
        <label style={{ fontSize: 11, color: "rgba(243,238,227,0.5)" }}>Email / Username</label>
        <input value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })} placeholder="you@kaverikitchen.in" style={{ width: "100%", background: "rgba(243,238,227,0.06)", border: `1px solid ${LINE}`, borderRadius: 6, padding: "10px 12px", color: BONE, margin: "6px 0 16px", outline: "none" }} />
        <label style={{ fontSize: 11, color: "rgba(243,238,227,0.5)" }}>Password</label>
        <input type="password" value={form.pass} onChange={(e) => setForm({ ...form, pass: e.target.value })} placeholder="••••••••" style={{ width: "100%", background: "rgba(243,238,227,0.06)", border: `1px solid ${LINE}`, borderRadius: 6, padding: "10px 12px", color: BONE, margin: "6px 0 22px", outline: "none" }} />
        <button onClick={onLogin} style={{ width: "100%", background: BRASS, color: INK, border: "none", borderRadius: 6, padding: "12px", fontWeight: 600, cursor: "pointer" }}>Login</button>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <button style={{ background: "none", border: "none", color: "rgba(243,238,227,0.5)", fontSize: 12, cursor: "pointer" }}>Forgot Password?</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 18, borderTop: `1px solid ${LINE}`, paddingTop: 14 }}>
          <button onClick={() => nav("landing")} style={{ background: "none", border: "none", color: "rgba(243,238,227,0.4)", fontSize: 12, cursor: "pointer" }}>← Back to site</button>
        </div>
        <div style={{ marginTop: 14, fontSize: 11, color: "rgba(243,238,227,0.35)", textAlign: "center" }}>Prototype — any credentials will sign you in.</div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ADMIN APP SHELL
---------------------------------------------------------------- */
const NAV_ITEMS = [
  { k: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { k: "products", label: "Products", icon: Package },
  { k: "pricing", label: "Price & Menu", icon: Tag },
  { k: "staff", label: "Staff Manager", icon: Users },
  { k: "inventory", label: "Inventory", icon: Warehouse },
  { k: "tables", label: "Tables", icon: LayoutGrid },
  { k: "orders", label: "Orders", icon: ClipboardList },
  { k: "customers", label: "Customers", icon: UserCircle2 },
  { k: "digitalMenu", label: "Digital Menu", icon: QrCode },
  { k: "arMenu", label: "AR Menu", icon: Sparkles },
  { k: "settings", label: "Settings", icon: SettingsIcon },
];

function AdminApp(props) {
  const [section, setSection] = useState("dashboard");
  const { onLogout, nav } = props;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "230px 1fr", minHeight: "100vh" }}>
      <aside style={{ background: INK_SOFT, borderRight: `1px solid ${LINE}`, padding: "20px 12px", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "8px 12px 20px" }}>
          <div style={{ ...serif, fontSize: 18 }}>{props.hotel.name}</div>
          <div style={{ fontSize: 11, color: "rgba(243,238,227,0.45)" }}>Hotel Management</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = section === item.k;
            return (
              <button key={item.k} onClick={() => setSection(item.k)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, textAlign: "left", background: active ? "rgba(200,150,62,0.15)" : "transparent", color: active ? BRASS_SOFT : "rgba(243,238,227,0.75)" }}>
                <Icon size={16} /> {item.label}
              </button>
            );
          })}
        </div>
        <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 10, display: "flex", flexDirection: "column", gap: 2 }}>
          <button onClick={() => nav("landing")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, background: "transparent", color: "rgba(243,238,227,0.6)" }}>
            <ChevronLeft size={16} /> View site
          </button>
          <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, background: "transparent", color: "rgba(229,128,128,0.8)" }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main style={{ padding: "26px 32px 60px", overflowX: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}>
          <div style={{ ...serif, fontSize: 22 }}>{NAV_ITEMS.find((n) => n.k === section)?.label}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Bell size={17} color="rgba(243,238,227,0.6)" />
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: BRASS, display: "flex", alignItems: "center", justifyContent: "center", color: INK, fontSize: 13, fontWeight: 700 }}>RD</div>
          </div>
        </div>

        {section === "dashboard" && <AdminDashboard {...props} />}
        {section === "products" && <AdminProducts {...props} />}
        {section === "pricing" && <AdminPricing {...props} />}
        {section === "staff" && <AdminStaff {...props} />}
        {section === "inventory" && <AdminInventory {...props} />}
        {section === "tables" && <AdminTables {...props} />}
        {section === "orders" && <AdminOrders {...props} />}
        {section === "customers" && <AdminCustomers {...props} />}
        {section === "digitalMenu" && <AdminDigitalMenu {...props} />}
        {section === "arMenu" && <AdminARMenu {...props} />}
        {section === "settings" && <AdminSettings {...props} />}
      </main>
    </div>
  );
}

/* Reusable admin bits */
function Panel({ title, children, right }) {
  return (
    <div style={{ background: INK_SOFT, border: `1px solid ${LINE}`, borderRadius: 12, padding: 20, marginBottom: 20 }}>
      {title && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}
function StatCard({ label, value, tone }) {
  return (
    <div style={{ background: INK_SOFT, border: `1px solid ${LINE}`, borderRadius: 12, padding: 18 }}>
      <div style={{ fontSize: 12, color: "rgba(243,238,227,0.5)" }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, marginTop: 8, color: tone === "brass" ? BRASS_SOFT : BONE, ...serif }}>{value}</div>
    </div>
  );
}
function IconBtn({ icon: Icon, onClick, tone = "default" }) {
  const color = tone === "danger" ? "#E58080" : "rgba(243,238,227,0.7)";
  return (
    <button onClick={onClick} style={{ background: "rgba(243,238,227,0.06)", border: "none", borderRadius: 6, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color }}>
      <Icon size={14} />
    </button>
  );
}

/* ---------------------------------------------------------------
   ADMIN: DASHBOARD
---------------------------------------------------------------- */
function AdminDashboard({ orders, tables, inventory, products }) {
  const todayRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => !["Delivered", "Cancelled"].includes(o.status)).length;
  const available = tables.filter((t) => t.status === "Available").length;
  const lowStock = inventory.filter((i) => i.qty <= i.min).length;
  const trend = [42, 58, 51, 66, 74, 60, 82];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 22 }}>
        <StatCard label="Today's Orders" value={orders.length} />
        <StatCard label="Today's Revenue" value={money(todayRevenue)} tone="brass" />
        <StatCard label="Pending Orders" value={pending} />
        <StatCard label="Available Tables" value={available} />
        <StatCard label="Low Stock Items" value={lowStock} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
        <Panel title="Orders this week">
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140 }}>
            {trend.map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: "100%", height: v, background: i === trend.length - 1 ? BRASS : "rgba(200,150,62,0.35)", borderRadius: 4 }} />
                <span style={{ fontSize: 10, color: "rgba(243,238,227,0.4)" }}>{"MTWTFSS"[i]}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Popular dishes">
          {products.filter((p) => p.bestseller).slice(0, 5).map((p) => (
            <div key={p.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "8px 0", borderBottom: `1px solid ${LINE}` }}>
              <span>{p.img} {p.name}</span>
              <span style={{ color: "rgba(243,238,227,0.5)" }}>{money(p.price)}</span>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ADMIN: PRODUCTS
---------------------------------------------------------------- */
function AdminProducts({ products, setProducts }) {
  const [form, setForm] = useState({ name: "", category: "Momo", qty: "", price: "", desc: "" });

  const addProduct = () => {
    if (!form.name || !form.price) return;
    setProducts((ps) => [...ps, {
      id: `p${Date.now()}`, name: form.name, category: form.category, price: Number(form.price),
      rating: 4.5, veg: false, bestseller: false, available: true, qty: form.qty || "1 plate",
      desc: form.desc || "Freshly prepared.", img: categoryEmoji(form.category),
    }]);
    setForm({ name: "", category: "Momo", qty: "", price: "", desc: "" });
  };

  const remove = (id) => setProducts((ps) => ps.filter((p) => p.id !== id));
  const toggle = (id, key) => setProducts((ps) => ps.map((p) => p.id === id ? { ...p, [key]: !p[key] } : p));

  return (
    <div>
      <Panel title="Add Product">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr) auto", gap: 10, alignItems: "end" }}>
          <AdminField label="Dish Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <div>
            <div style={{ fontSize: 11, color: "rgba(243,238,227,0.5)", marginBottom: 4 }}>Category</div>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={selStyle}>
              {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <AdminField label="Quantity" value={form.qty} onChange={(v) => setForm({ ...form, qty: v })} placeholder="e.g. 8 pcs" />
          <AdminField label="Price (₹)" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
          <AdminField label="Description" value={form.desc} onChange={(v) => setForm({ ...form, desc: v })} />
          <button onClick={addProduct} style={btnBrass}>Save Product</button>
        </div>
      </Panel>

      <Panel title={`All Products (${products.length})`}>
        <table style={tableStyle}>
          <thead><tr>{["", "Dish", "Category", "Price", "Bestseller", "Available", ""].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} style={{ borderTop: `1px solid ${LINE}` }}>
                <td style={tdStyle}><span style={{ fontSize: 20 }}>{p.img}</span></td>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>{p.category}</td>
                <td style={tdStyle}>{money(p.price)}</td>
                <td style={tdStyle}><Toggle on={p.bestseller} onClick={() => toggle(p.id, "bestseller")} /></td>
                <td style={tdStyle}><Toggle on={p.available} onClick={() => toggle(p.id, "available")} good /></td>
                <td style={tdStyle}><IconBtn icon={Trash2} tone="danger" onClick={() => remove(p.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

function Toggle({ on, onClick, good }) {
  return (
    <button onClick={onClick} style={{ width: 36, height: 20, borderRadius: 999, border: "none", cursor: "pointer", background: on ? (good ? "#3E8E52" : BRASS) : "rgba(243,238,227,0.15)", position: "relative" }}>
      <span style={{ position: "absolute", top: 2, left: on ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .15s" }} />
    </button>
  );
}

/* ---------------------------------------------------------------
   ADMIN: PRICING / MENU
---------------------------------------------------------------- */
function AdminPricing({ products, setProducts }) {
  const updatePrice = (id, price) => setProducts((ps) => ps.map((p) => p.id === id ? { ...p, price: Number(price) || 0 } : p));
  return (
    <Panel title="Price & Menu">
      <table style={tableStyle}>
        <thead><tr>{["Image", "Dish", "Category", "Price", "Rating", "Availability"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} style={{ borderTop: `1px solid ${LINE}` }}>
              <td style={tdStyle}><span style={{ fontSize: 20 }}>{p.img}</span></td>
              <td style={tdStyle}>{p.name}</td>
              <td style={tdStyle}>{p.category}</td>
              <td style={tdStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span>₹</span>
                  <input defaultValue={p.price} onBlur={(e) => updatePrice(p.id, e.target.value)} style={{ width: 70, background: "rgba(243,238,227,0.06)", border: `1px solid ${LINE}`, borderRadius: 4, color: BONE, padding: "4px 6px" }} />
                </div>
              </td>
              <td style={tdStyle}>⭐ {p.rating}</td>
              <td style={tdStyle}><StatusBadge status={p.available ? "In Stock" : "Out of Stock"} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

/* ---------------------------------------------------------------
   ADMIN: STAFF
---------------------------------------------------------------- */
const ROLES = ["Super Admin", "Manager", "Kitchen Staff", "Waiter", "Cashier", "Inventory Manager", "Delivery Staff"];
function AdminStaff({ staff, setStaff }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Waiter" });
  const add = () => {
    if (!form.name || !form.email) return;
    setStaff((s) => [...s, { id: `s${Date.now()}`, ...form, active: true }]);
    setForm({ name: "", email: "", role: "Waiter" });
  };
  const toggleActive = (id) => setStaff((s) => s.map((m) => m.id === id ? { ...m, active: !m.active } : m));
  const remove = (id) => setStaff((s) => s.filter((m) => m.id !== id));

  return (
    <div>
      <Panel title="Add Staff">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 10, alignItems: "end" }}>
          <AdminField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <AdminField label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <div>
            <div style={{ fontSize: 11, color: "rgba(243,238,227,0.5)", marginBottom: 4 }}>Role</div>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={selStyle}>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <button onClick={add} style={btnBrass}>Add Staff</button>
        </div>
      </Panel>
      <Panel title={`Team (${staff.length})`}>
        <table style={tableStyle}>
          <thead><tr>{["Name", "Email", "Role", "Status", ""].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
          <tbody>
            {staff.map((m) => (
              <tr key={m.id} style={{ borderTop: `1px solid ${LINE}` }}>
                <td style={tdStyle}>{m.name}</td>
                <td style={tdStyle}>{m.email}</td>
                <td style={tdStyle}>{m.role}</td>
                <td style={tdStyle}><button onClick={() => toggleActive(m.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}><StatusBadge status={m.active ? "In Stock" : "Out of Stock"} /></button></td>
                <td style={tdStyle}><IconBtn icon={Trash2} tone="danger" onClick={() => remove(m.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

/* ---------------------------------------------------------------
   ADMIN: INVENTORY
---------------------------------------------------------------- */
function AdminInventory({ inventory, setInventory }) {
  const [form, setForm] = useState({ name: "", qty: "", unit: "kg", min: "" });
  const add = () => {
    if (!form.name || !form.qty) return;
    setInventory((inv) => [...inv, { id: `i${Date.now()}`, name: form.name, qty: Number(form.qty), unit: form.unit, min: Number(form.min) || 1, supplier: "—", updated: "Just now" }]);
    setForm({ name: "", qty: "", unit: "kg", min: "" });
  };
  const adjust = (id, delta) => setInventory((inv) => inv.map((i) => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta), updated: "Just now" } : i));
  const statusFor = (i) => i.qty === 0 ? "Out of Stock" : i.qty <= i.min ? "Low Stock" : "In Stock";

  return (
    <div>
      <Panel title="Add Inventory Item">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: 10, alignItems: "end" }}>
          <AdminField label="Item name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <AdminField label="Quantity" value={form.qty} onChange={(v) => setForm({ ...form, qty: v })} />
          <div>
            <div style={{ fontSize: 11, color: "rgba(243,238,227,0.5)", marginBottom: 4 }}>Unit</div>
            <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} style={selStyle}>
              {["kg", "pcs", "bottles", "litres", "packs"].map((u) => <option key={u}>{u}</option>)}
            </select>
          </div>
          <AdminField label="Minimum stock" value={form.min} onChange={(v) => setForm({ ...form, min: v })} />
          <button onClick={add} style={btnBrass}>Add Item</button>
        </div>
      </Panel>
      <Panel title="Stock">
        <table style={tableStyle}>
          <thead><tr>{["Item", "Stock", "Min", "Supplier", "Status", "Updated", "Adjust"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
          <tbody>
            {inventory.map((i) => (
              <tr key={i.id} style={{ borderTop: `1px solid ${LINE}` }}>
                <td style={tdStyle}>{i.name}</td>
                <td style={tdStyle}>{i.qty} {i.unit}</td>
                <td style={tdStyle}>{i.min} {i.unit}</td>
                <td style={tdStyle}>{i.supplier}</td>
                <td style={tdStyle}><StatusBadge status={statusFor(i)} /></td>
                <td style={tdStyle}><span style={{ fontSize: 11, color: "rgba(243,238,227,0.4)" }}>{i.updated}</span></td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <IconBtn icon={Minus} onClick={() => adjust(i.id, -1)} />
                    <IconBtn icon={Plus} onClick={() => adjust(i.id, 1)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

/* ---------------------------------------------------------------
   ADMIN: TABLES
---------------------------------------------------------------- */
function AdminTables({ tables, setTables, products }) {
  const [openId, setOpenId] = useState(null);
  const table = tables.find((t) => t.id === openId);
  const subtotal = (t) => t.order.reduce((s, i) => s + i.price * i.qty, 0);

  const addItem = (name, price) => {
    setTables((ts) => ts.map((t) => {
      if (t.id !== openId) return t;
      const existing = t.order.find((o) => o.name === name);
      const order = existing ? t.order.map((o) => o.name === name ? { ...o, qty: o.qty + 1 } : o) : [...t.order, { name, qty: 1, price }];
      return { ...t, order, status: "Occupied" };
    }));
  };
  const markAvailable = () => setTables((ts) => ts.map((t) => t.id === openId ? { ...t, order: [], status: "Available" } : t));

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {tables.map((t) => (
          <button key={t.id} onClick={() => setOpenId(t.id)} style={{ background: INK_SOFT, border: `1px solid ${LINE}`, borderRadius: 12, padding: 18, cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{t.name}</div>
            <StatusBadge status={t.status} />
            {t.order.length > 0 && <div style={{ fontSize: 11, color: "rgba(243,238,227,0.45)", marginTop: 8 }}>{t.order.length} items · {money(subtotal(t))}</div>}
          </button>
        ))}
      </div>

      {table && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }} onClick={() => setOpenId(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: INK_SOFT, border: `1px solid ${LINE}`, borderRadius: 14, padding: 26, width: 420, maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ ...serif, fontSize: 20 }}>{table.name}</div>
              <button onClick={() => setOpenId(null)} style={{ background: "none", border: "none", color: BONE, cursor: "pointer" }}><X size={18} /></button>
            </div>
            <StatusBadge status={table.status} />
            <div style={{ marginTop: 16, marginBottom: 10, fontSize: 12, color: "rgba(243,238,227,0.5)" }}>Current Order</div>
            {table.order.length === 0 && <div style={{ fontSize: 13, color: "rgba(243,238,227,0.4)", marginBottom: 12 }}>No items yet.</div>}
            {table.order.map((o, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0" }}>
                <span>{o.qty} × {o.name}</span><span>{money(o.qty * o.price)}</span>
              </div>
            ))}
            {table.order.length > 0 && (
              <div style={{ borderTop: `1px solid ${LINE}`, marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                <span>Subtotal</span><span>{money(subtotal(table))}</span>
              </div>
            )}
            <div style={{ marginTop: 16, marginBottom: 8, fontSize: 12, color: "rgba(243,238,227,0.5)" }}>Add item</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
              {products.filter((p) => p.available).slice(0, 8).map((p) => (
                <button key={p.id} onClick={() => addItem(p.name, p.price)} style={{ fontSize: 12, background: "rgba(243,238,227,0.06)", border: `1px solid ${LINE}`, borderRadius: 999, padding: "6px 10px", color: BONE, cursor: "pointer" }}>
                  + {p.name}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ ...btnBrass, flex: 1 }}>Generate Bill</button>
              <button onClick={markAvailable} style={{ flex: 1, background: "rgba(243,238,227,0.08)", color: BONE, border: `1px solid ${LINE}`, borderRadius: 6, padding: "10px", cursor: "pointer" }}>Mark Available</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   ADMIN: ORDERS
---------------------------------------------------------------- */
function AdminOrders({ orders, setOrders }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Today", "Pending", "Preparing", "Completed", "Cancelled", "Delivery", "Dine-in", "Takeaway"];
  const advance = (id) => setOrders((os) => os.map((o) => {
    if (o.id !== id) return o;
    const i = STATUS_FLOW.indexOf(o.status);
    return { ...o, status: STATUS_FLOW[Math.min(i + 1, STATUS_FLOW.length - 2)] };
  }));
  const cancel = (id) => setOrders((os) => os.map((o) => o.id === id ? { ...o, status: "Cancelled" } : o));

  const filtered = orders.filter((o) => {
    if (filter === "All" || filter === "Today") return true;
    if (filter === "Pending") return !["Delivered", "Cancelled"].includes(o.status);
    if (filter === "Completed") return o.status === "Delivered";
    if (["Delivery", "Dine-in", "Takeaway"].includes(filter)) return o.type === filter;
    return o.status === filter;
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{ border: "none", borderRadius: 999, padding: "6px 14px", fontSize: 12, cursor: "pointer", background: filter === f ? BRASS : "rgba(243,238,227,0.06)", color: filter === f ? INK : "rgba(243,238,227,0.7)" }}>{f}</button>
        ))}
      </div>
      <Panel>
        <table style={tableStyle}>
          <thead><tr>{["Order", "Type", "Customer", "Items", "Total", "Status", "Time", ""].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} style={{ borderTop: `1px solid ${LINE}` }}>
                <td style={tdStyle}>{o.id}</td>
                <td style={tdStyle}>{o.type}</td>
                <td style={tdStyle}>{o.customer}{o.phone ? ` · ${o.phone}` : ""}</td>
                <td style={tdStyle}>{o.items.map((i) => `${i.qty}×${i.name}`).join(", ")}</td>
                <td style={tdStyle}>{money(o.total)}</td>
                <td style={tdStyle}><StatusBadge status={o.status} /></td>
                <td style={tdStyle}><span style={{ fontSize: 11, color: "rgba(243,238,227,0.4)" }}>{o.time}</span></td>
                <td style={tdStyle}>
                  {!["Delivered", "Cancelled"].includes(o.status) && (
                    <div style={{ display: "flex", gap: 4 }}>
                      <button onClick={() => advance(o.id)} style={{ ...btnBrass, padding: "5px 10px", fontSize: 11 }}>Advance</button>
                      <IconBtn icon={X} tone="danger" onClick={() => cancel(o.id)} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

/* ---------------------------------------------------------------
   ADMIN: CUSTOMERS
---------------------------------------------------------------- */
function AdminCustomers({ orders }) {
  const map = {};
  orders.forEach((o) => {
    if (!o.phone) return;
    if (!map[o.phone]) map[o.phone] = { name: o.customer, phone: o.phone, orders: 0, spend: 0 };
    map[o.phone].orders += 1;
    map[o.phone].spend += o.total;
  });
  const customers = Object.values(map);
  return (
    <Panel title={`Customers (${customers.length})`}>
      {customers.length === 0 && <div style={{ fontSize: 13, color: "rgba(243,238,227,0.5)" }}>Customers appear here once delivery or takeaway orders come in.</div>}
      <table style={tableStyle}>
        <thead><tr>{["Name", "Phone", "Orders", "Total Spend"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr></thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.phone} style={{ borderTop: `1px solid ${LINE}` }}>
              <td style={tdStyle}>{c.name}</td>
              <td style={tdStyle}>{c.phone}</td>
              <td style={tdStyle}>{c.orders}</td>
              <td style={tdStyle}>{money(c.spend)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

/* ---------------------------------------------------------------
   ADMIN: DIGITAL MENU (QR)
---------------------------------------------------------------- */
function AdminDigitalMenu() {
  const [token, setToken] = useState("KVK-2026-A1");
  const url = `https://kaverikitchen.example/menu/${token}`;
  return (
    <Panel title="Digital Menu QR">
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 28, alignItems: "center" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <QRVisual seed={token} />
        </div>
        <div>
          <div style={{ fontSize: 13, color: "rgba(243,238,227,0.6)", marginBottom: 6 }}>Menu URL</div>
          <div style={{ fontSize: 13, background: "rgba(243,238,227,0.06)", border: `1px solid ${LINE}`, borderRadius: 6, padding: "8px 10px", marginBottom: 16, wordBreak: "break-all" }}>{url}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={btnBrass}><Download size={13} style={{ marginRight: 6 }} />Download QR</button>
            <button onClick={() => setToken(`KVK-2026-${Math.random().toString(36).slice(2, 6).toUpperCase()}`)} style={{ background: "rgba(243,238,227,0.08)", color: BONE, border: `1px solid ${LINE}`, borderRadius: 6, padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <RefreshCw size={13} /> Regenerate
            </button>
          </div>
          <p style={{ fontSize: 12, color: "rgba(243,238,227,0.45)", marginTop: 16, maxWidth: 360 }}>Print this code on table cards, receipts and the entrance signage. Scanning it opens the live digital menu, so price changes made in Price &amp; Menu appear instantly.</p>
        </div>
      </div>
    </Panel>
  );
}

function QRVisual({ seed }) {
  // deterministic pseudo-QR pattern generated from the seed string, purely decorative
  const grid = 10;
  let s = 0; for (let i = 0; i < seed.length; i++) s += seed.charCodeAt(i) * (i + 1);
  const cells = [];
  let x = s;
  for (let i = 0; i < grid * grid; i++) { x = (x * 1103515245 + 12345) & 0x7fffffff; cells.push(x % 5 === 0); }
  return (
    <svg viewBox={`0 0 ${grid} ${grid}`} width={170} height={170}>
      <rect width={grid} height={grid} fill="#fff" />
      {cells.map((on, i) => on && <rect key={i} x={i % grid} y={Math.floor(i / grid)} width={1} height={1} fill={INK} />)}
      {[[0,0],[grid-3,0],[0,grid-3]].map(([cx,cy],idx) => (
        <g key={idx}>
          <rect x={cx} y={cy} width={3} height={3} fill={INK} />
          <rect x={cx+0.6} y={cy+0.6} width={1.8} height={1.8} fill="#fff" />
          <rect x={cx+1.1} y={cy+1.1} width={0.8} height={0.8} fill={INK} />
        </g>
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------
   ADMIN: AR MENU
---------------------------------------------------------------- */
function AdminARMenu() {
  const [shown, setShown] = useState(true);
  return (
    <Panel title="AR Menu (Coming Soon)">
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 18 }}>
        <Sparkles size={20} color={BRASS} />
        <div>
          <div style={{ fontSize: 13, color: "rgba(243,238,227,0.75)", lineHeight: 1.6, maxWidth: 560 }}>
            The Augmented Reality menu lets a guest point their phone at the table and see a life-size 3D render of a dish — with name, price, ingredients, portion, calories, ratings and live availability — before ordering. The UI and component structure are ready; 3D/WebAR capture is not yet built.
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "rgba(243,238,227,0.05)", borderRadius: 8, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Show "Coming Soon" teaser on site</div>
          <div style={{ fontSize: 11, color: "rgba(243,238,227,0.45)" }}>Displays the AR Menu section on the landing page and digital menu.</div>
        </div>
        <Toggle on={shown} onClick={() => setShown((s) => !s)} good />
      </div>
      <div style={{ fontSize: 12, color: "rgba(243,238,227,0.4)" }}>Planned flow: Choose Dish → View AR → Scan / Launch AR → See 3D dish on table → View details.</div>
    </Panel>
  );
}

/* ---------------------------------------------------------------
   ADMIN: SETTINGS
---------------------------------------------------------------- */
function AdminSettings({ hotel, setHotel }) {
  const [form, setForm] = useState(hotel);
  return (
    <Panel title="Hotel Settings">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 640 }}>
        <AdminField label="Hotel name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <AdminField label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <div style={{ gridColumn: "1 / -1" }}>
          <AdminField label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <div style={{ fontSize: 11, color: "rgba(243,238,227,0.5)", marginBottom: 4 }}>About</div>
          <textarea value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} rows={3} style={{ ...selStyle, width: "100%", resize: "vertical" }} />
        </div>
      </div>
      <button onClick={() => setHotel(form)} style={{ ...btnBrass, marginTop: 16 }}>Save Settings</button>
    </Panel>
  );
}

/* ---------------------------------------------------------------
   SHARED ADMIN STYLES / FIELDS
---------------------------------------------------------------- */
const tableStyle = { width: "100%", borderCollapse: "collapse", fontSize: 13 };
const thStyle = { textAlign: "left", fontSize: 11, color: "rgba(243,238,227,0.45)", padding: "0 10px 10px", fontWeight: 500 };
const tdStyle = { padding: "10px", verticalAlign: "middle" };
const selStyle = { width: "100%", background: "rgba(243,238,227,0.06)", border: `1px solid ${LINE}`, borderRadius: 6, padding: "9px 10px", color: BONE, fontSize: 13, outline: "none" };
const btnBrass = { background: BRASS, color: INK, border: "none", borderRadius: 6, padding: "10px 16px", fontWeight: 600, cursor: "pointer", fontSize: 13 };

function AdminField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: "rgba(243,238,227,0.5)", marginBottom: 4 }}>{label}</div>
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} style={selStyle} />
    </div>
  );
}
