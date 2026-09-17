import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe2,
  LayoutDashboard,
  Menu,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import "./hero.css";

import mainHome from "./assets/main-home.png";
import mainMenu from "./assets/main-menu.png";
import mainAbout from "./assets/main-about.png";
import mainReviews from "./assets/main-reviews.png";
import mainLogin from "./assets/main-login.png";
import adminDashboard from "./assets/admin-dashboard.png";
import adminProducts from "./assets/admin-products.png";
import adminStaff from "./assets/admin-staff.png";
import adminPayments from "./assets/admin-payments.png";

const fallbackReviews = [
  { id: 1, name: "Priya Sharma", role: "Restaurant Owner", rating: 5, text: "A complete restaurant system in one place. The website and admin panel made daily operations much easier." },
  { id: 2, name: "Rahul Das", role: "Business Owner", rating: 5, text: "The ordering flow feels professional and the admin dashboard gives a clear view of the business." },
  { id: 3, name: "Ananya Roy", role: "Restaurant Manager", rating: 5, text: "Simple for customers, powerful for the team. Everything feels connected and easy to manage." },
];

const mainShots = [
  ["Home", mainHome, "Customer Website"],
  ["Menu", mainMenu, "Food Ordering"],
  ["About", mainAbout, "Brand Story"],
  ["Reviews", mainReviews, "Social Proof"],
  ["Login", mainLogin, "Customer Account"],
];

const adminShots = [
  ["Dashboard", adminDashboard, "Business Overview"],
  ["Products", adminProducts, "Menu Management"],
  ["Staff", adminStaff, "Team & Duties"],
  ["Payments", adminPayments, "UPI & Payments"],
];

const plans = [
  {
    key: "regular",
    name: "Regular",
    price: "₹9,999",
    period: "/ year",
    desc: "Complete restaurant website and management system.",
    features: [
      "Premium restaurant website",
      "Online food ordering",
      "Menu & product management",
      "Customer OTP login",
      "Orders & order tracking",
      "Admin dashboard",
      "Staff & duties",
      "Tables & operations",
      "Payments / UPI",
      "Customer reviews",
      "Mobile responsive website",
    ],
    excluded: ["Custom domain setup"],
  },
  {
    key: "plus",
    name: "Plus",
    price: "₹18,999",
    period: "/ year",
    desc: "Regular plus custom domain and stronger branding.",
    popular: true,
    features: [
      "Everything in Regular",
      "Custom domain setup",
      "Custom restaurant branding",
      "Logo & visual identity setup",
      "Offer / banner management",
      "Priority support",
      "Priority updates",
    ],
    excluded: [],
  },
  {
    key: "app",
    name: "App",
    price: "₹39,999",
    period: "/ package",
    desc: "Complete web + admin + dedicated Android app package.",
    features: [
      "Everything in Plus",
      "Dedicated Android app",
      "App branding",
      "App icon & launch assets",
      "Customer ordering through app",
      "Website + Admin + App ecosystem",
      "Deployment assistance",
      "Priority technical support",
    ],
    excluded: [],
  },
];

function readReviews() {
  try {
    const value = JSON.parse(localStorage.getItem("kaveri-reviews") || "null");
    return Array.isArray(value) && value.length ? value : fallbackReviews;
  } catch {
    return fallbackReviews;
  }
}

function goMain() {
  window.location.href = "/main";
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroPage() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mainIndex, setMainIndex] = useState(0);
  const [adminIndex, setAdminIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviews, setReviews] = useState(readReviews);

  useEffect(() => {
    const timer = setInterval(() => {
      setMainIndex((i) => (i + 1) % mainShots.length);
      setAdminIndex((i) => (i + 1) % adminShots.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const refresh = () => setReviews(readReviews());
    window.addEventListener("storage", refresh);
    const timer = setInterval(refresh, 1500);
    return () => {
      window.removeEventListener("storage", refresh);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (reviews.length < 2) return;
    const timer = setInterval(() => setReviewIndex((i) => (i + 1) % reviews.length), 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const review = reviews[reviewIndex % reviews.length] || fallbackReviews[0];

  const choosePlan = (plan) => {
    const message = `Hello Knowledgebeyond, I want the ${plan.name} plan (${plan.price}${plan.period}). Please share the subscription process.`;
    window.open(`https://wa.me/919863795417?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="kb-page">
      <header className="kb-nav">
        <div className="kb-wrap kb-nav-in">
          <button className="kb-logo" onClick={() => scrollToId("top")} type="button">
            <span className="kb-logo-mark"><i /><i /></span>
            <span><b>knowledgebeyond</b><small>Ideas · Websites · Growth</small></span>
          </button>

          <nav className={mobileMenu ? "kb-links open" : "kb-links"}>
            {[["top", "Home"], ["features", "Features"], ["screenshots", "Screenshots"], ["pricing", "Pricing"], ["reviews", "Reviews"], ["contact", "Contact"]].map(([id, label]) => (
              <button key={id} onClick={() => { scrollToId(id); setMobileMenu(false); }} type="button">{label}</button>
            ))}
          </nav>

          <div className="kb-nav-actions">
            <button className="kb-demo-btn" onClick={goMain} type="button">Live Demo</button>
            <button className="kb-primary" onClick={() => scrollToId("pricing")} type="button">Get Started <ArrowRight size={16} /></button>
            <button className="kb-menu" onClick={() => setMobileMenu((v) => !v)} type="button">{mobileMenu ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="kb-hero">
          <div className="kb-wrap kb-hero-grid">
            <div className="kb-copy">
              <span className="kb-eyebrow"><Sparkles size={14} /> Restaurant Digital Platform</span>
              <h1>Your restaurant.<span> Smarter online.</span></h1>
              <p>A premium website, online ordering system and powerful admin panel — built to help restaurants look professional and run better.</p>
              <div className="kb-actions">
                <button className="kb-primary" onClick={() => scrollToId("pricing")} type="button">Explore Plans <ArrowRight size={17} /></button>
                <button className="kb-secondary" onClick={goMain} type="button">Check Live Website <ArrowRight size={17} /></button>
              </div>
              <div className="kb-points">
                <div><Check /> Website + Admin in one system</div>
                <div><Check /> Orders, menu, staff and payments connected</div>
                <div><Check /> Mobile-first customer experience</div>
              </div>
            </div>

            <div className="kb-hero-visual">
              <div className="kb-glow g1" /><div className="kb-glow g2" />
              <div className="kb-float kb-float-top"><Zap size={16} /><span>Fast setup<b>Ready to launch</b></span></div>
              <div className="kb-screen screen-back"><div className="kb-bar">Customer Website</div><img src={mainHome} alt="Restaurant website" /></div>
              <div className="kb-screen screen-front"><div className="kb-bar">Admin Dashboard</div><img src={adminDashboard} alt="Restaurant admin dashboard" /></div>
              <div className="kb-float kb-float-bottom"><MonitorSmartphone size={17} /><span>Web + Mobile<b>Built for customers</b></span></div>
            </div>
          </div>
        </section>

        <section className="kb-trust">
          <div className="kb-wrap kb-trust-grid">
            <span><Globe2 /> Professional Website</span><span><LayoutDashboard /> Powerful Admin</span><span><Zap /> Online Ordering</span><span><ShieldCheck /> Secure Workflow</span><span><MonitorSmartphone /> Mobile Ready</span>
          </div>
        </section>

        <section className="kb-section" id="features">
          <div className="kb-wrap">
            <div className="kb-heading"><small>WHAT YOU GET</small><h2>Everything your restaurant needs <em>to grow online.</em></h2><p>From the first website visit to the final order, every major part of the customer and restaurant workflow is connected.</p></div>
            <div className="feature-grid">
              <article className="feature-main"><div><small>01 · CUSTOMER EXPERIENCE</small><h3>A website that feels like your brand.</h3><p>Showcase your food, build trust, collect reviews and make ordering simple on every screen.</p></div><img src={mainHome} alt="Main restaurant website" /></article>
              {[ ["Restaurant Website", "Premium customer-facing restaurant experience.", mainHome, Globe2], ["Admin Dashboard", "Orders, revenue and operations in one view.", adminDashboard, LayoutDashboard], ["Menu & Products", "Manage dishes, prices, categories and stock.", adminProducts, Menu], ["Mobile Ready", "A touch-friendly experience for phones.", mainMenu, MonitorSmartphone], ["Customer Accounts", "Simple OTP-based customer access.", mainLogin, ShieldCheck], ["Payments / UPI", "Digital payment settings and QR support.", adminPayments, Zap] ].map(([title, desc, img, Icon]) => <article className="feature-card" key={title}><span className="feature-icon"><Icon size={19} /></span><h3>{title}</h3><p>{desc}</p><img src={img} alt={title} /></article>)}
            </div>
          </div>
        </section>

        <section className="kb-section white" id="screenshots">
          <div className="kb-wrap">
            <div className="kb-heading"><small>REAL PRODUCT SCREENS</small><h2>See the website. <em>See the admin.</em></h2><p>These are real screens from the restaurant system, not generic mockups.</p></div>

            <div className="shot-row">
              <div className="shot-copy"><small>01 · MAIN WEBSITE</small><h3>{mainShots[mainIndex][0]}</h3><p>Customer-facing experience for browsing the menu, learning about the restaurant and ordering.</p><div className="shot-controls"><button onClick={() => setMainIndex((i) => (i - 1 + mainShots.length) % mainShots.length)} type="button"><ChevronLeft /></button><span>{mainIndex + 1} / {mainShots.length}</span><button onClick={() => setMainIndex((i) => (i + 1) % mainShots.length)} type="button"><ChevronRight /></button></div></div>
              <div className="large-shot"><img src={mainShots[mainIndex][1]} alt={mainShots[mainIndex][0]} /></div>
            </div>

            <div className="shot-row reverse">
              <div className="shot-copy"><small>02 · ADMIN PANEL</small><h3>{adminShots[adminIndex][0]}</h3><p>Manage products, staff, payments and restaurant operations from one dashboard.</p><div className="shot-controls"><button onClick={() => setAdminIndex((i) => (i - 1 + adminShots.length) % adminShots.length)} type="button"><ChevronLeft /></button><span>{adminIndex + 1} / {adminShots.length}</span><button onClick={() => setAdminIndex((i) => (i + 1) % adminShots.length)} type="button"><ChevronRight /></button></div></div>
              <div className="large-shot"><img src={adminShots[adminIndex][1]} alt={adminShots[adminIndex][0]} /></div>
            </div>

            <div className="thumbs">{[...mainShots, ...adminShots].map(([name, img]) => <button key={name} onClick={() => { const a = mainShots.findIndex((s) => s[0] === name); const b = adminShots.findIndex((s) => s[0] === name); if (a >= 0) setMainIndex(a); if (b >= 0) setAdminIndex(b); }} type="button"><img src={img} alt={name} /><span>{name}</span></button>)}</div>
          </div>
        </section>

        <section className="kb-section how">
          <div className="kb-wrap"><div className="kb-heading"><small>HOW IT WORKS</small><h2>From website visit <em>to restaurant growth.</em></h2></div><div className="steps"><article><b>01</b><Globe2 /><h3>Choose your plan</h3><p>Pick Regular, Plus or App for the level of digital setup you need.</p></article><article><b>02</b><ShieldCheck /><h3>We configure it</h3><p>Restaurant details, branding, menu, ordering and admin settings are prepared.</p></article><article><b>03</b><MonitorSmartphone /><h3>Launch & sell</h3><p>Your website and admin workflow go live so your team can start taking orders.</p></article></div></div>
        </section>

        <section className="pricing" id="pricing">
          <div className="kb-wrap"><div className="kb-heading dark"><small>OUR PLANS</small><h2>Choose the package <em>that fits your restaurant.</em></h2><p>Start simple, unlock custom domain support, or go all the way with a complete mobile app package.</p></div><div className="plans">{plans.map((plan) => <article key={plan.key} className={`plan ${plan.popular ? "popular" : ""}`}>
            {plan.popular && <label>MOST POPULAR</label>}<div className="plan-top"><div><small>RESTAURANT SYSTEM</small><h3>{plan.name}</h3></div><span>{plan.key === "app" ? <MonitorSmartphone /> : plan.key === "plus" ? <Sparkles /> : <Globe2 />}</span></div><p className="plan-desc">{plan.desc}</p><div className="price"><strong>{plan.price}</strong><span>{plan.period}</span></div><div className="plan-lines" />
            <div className="checks">{plan.features.map((f) => <div key={f}><Check />{f}</div>)}{plan.excluded.map((f) => <div className="no" key={f}><X />{f}</div>)}</div><button className="plan-btn" onClick={() => choosePlan(plan)} type="button">Choose {plan.name} <ArrowRight size={16} /></button>
          </article>)}</div><p className="pricing-note"><ShieldCheck size={16} /> Domain, payment gateway and app-store charges may apply separately where relevant.</p></div>
        </section>

        <section className="kb-section white" id="reviews">
          <div className="kb-wrap"><div className="review-head"><div className="kb-heading left"><small>CONNECTED REVIEWS</small><h2>Real feedback from <em>your restaurant.</em></h2><p>The Hero page reads the same <code>kaveri-reviews</code> data used by the restaurant site.</p></div><div className="rating"><strong>5.0</strong><div><div>★★★★★</div><small>{reviews.length} customer reviews</small></div></div></div>
            <article className="featured-review"><div className="stars">★★★★★</div><blockquote>“{review.text}”</blockquote><div className="review-person"><span>{(review.name || "C").charAt(0)}</span><div><b>{review.name || "Verified Customer"}</b><small>{review.role || "Customer"}</small></div></div><div className="review-nav"><button onClick={() => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length)} type="button"><ChevronLeft /></button><span>{reviewIndex + 1} / {reviews.length}</span><button onClick={() => setReviewIndex((i) => (i + 1) % reviews.length)} type="button"><ChevronRight /></button></div></article>
          </div>
        </section>

        <section className="final-cta"><div className="kb-wrap cta-box"><div><small>READY TO LAUNCH?</small><h2>Give your restaurant <em>a better digital experience.</em></h2><p>Explore the live Clock Tower demo or start your own Knowledgebeyond package.</p></div><div><button className="kb-primary" onClick={goMain} type="button">Open Live Restaurant <ArrowRight size={17} /></button><button className="kb-secondary" onClick={() => scrollToId("pricing")} type="button">View Plans</button></div></div></section>
      </main>

      <footer className="kb-footer" id="contact"><div className="kb-wrap footer-grid"><div><div className="kb-logo"><span className="kb-logo-mark"><i /><i /></span><span><b>knowledgebeyond</b><small>Ideas · Websites · Growth</small></span></div><p>Digital products, websites and practical systems for modern businesses.</p></div><div><h4>Explore</h4><button onClick={() => scrollToId("features")} type="button">Features</button><button onClick={() => scrollToId("screenshots")} type="button">Screenshots</button><button onClick={() => scrollToId("pricing")} type="button">Pricing</button><button onClick={goMain} type="button">Live Website</button></div><div><h4>Contact</h4><a href="tel:+919863795417">+91 9863795417</a><a href="tel:+919101512112">+91 9101512112</a><a href="mailto:animeshdebnath445@gmail.com">animeshdebnath445@gmail.com</a><a href="mailto:goswaminavonil@gmail.com">goswaminavonil@gmail.com</a></div><div><h4>Creator · Designer · Developer</h4><strong>Animesh Debnath</strong><p>Turning ideas into digital products.</p></div></div><div className="kb-wrap footer-bottom"><span>© {new Date().getFullYear()} Knowledgebeyond. All Rights Reserved.</span><span>Website · Admin · App</span></div></footer>
    </div>
  );
}
