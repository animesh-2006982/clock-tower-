import React, { useEffect, useState, useMemo } from "react";
import { db } from "./firebase";
import { collection, doc, onSnapshot, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import HeroPage from "./Hero/HeroPage.jsx";
import {
  Search,
  MapPin,
  ShoppingCart,
  Menu as MenuIcon,
  X,
  Plus,
  Minus,
  Star,
  QrCode,
  Sparkles,
  LayoutDashboard,
  Package,
  Tag,
  Users,
  Warehouse,
  LayoutGrid,
  ClipboardList,
  UserCircle2,
  Settings as SettingsIcon,
  ChevronRight,
  ChevronLeft,
  Check,
  AlertTriangle,
  Trash2,
  Pencil,
  LogOut,
  Download,
  RefreshCw,
  Lock,
  Bell,
  Flame,
  Leaf,
  Image as ImageIcon,
  Type,
  CreditCard,
  Truck,
  MessageSquare,
  Save,
  Eye,
  Smartphone,
  ReceiptText,
  ChefHat,
  CircleDollarSign,
  Phone, SlidersHorizontal
} from "lucide-react";

/* =========================================================
   KAVERI KITCHEN
   Premium warm restaurant theme
   ========================================================= */

const INK = "#4C1504";
const INK_SOFT = "#6A2A1A";
const BONE = "#FFF4EE";
const BRASS = "#FF6B4A";
const BRASS_SOFT = "#FF9A7A";
const LINE = "rgba(76,21,4,0.12)";

const serif = {
  fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif"
};

const CATEGORIES = [
  "All"
];

/* =========================================================
   PROMOTIONAL BANNERS
   Homepage banner images controlled from Admin > Website Content
   ========================================================= */

const seedOfferBanners = () => [
  {
    id: "offer-1",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1800&q=90",
    alt: "Special pizza offer",
    title: "Weekend Pizza Celebration",
    subtitle: "Hot, fresh and ready for your table.",
    buttonText: "Explore Offer",
    enabled: true
  },
  {
    id: "offer-2",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1800&q=90",
    alt: "Weekend burger offer",
    title: "Burger Weekend",
    subtitle: "Big flavours. Freshly grilled.",
    buttonText: "Order Now",
    enabled: true
  },
  {
    id: "offer-3",
    image:
      "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=1800&q=90",
    alt: "Momo special offer",
    title: "Momo Special",
    subtitle: "Steamed fresh with house chutney.",
    buttonText: "View Menu",
    enabled: true
  }
];

/* =========================================================
   PRODUCT DATA
   ========================================================= */

const seedProducts = () => [
  {
    id: "p1",
    name: "Chicken Momo",
    category: "Momo",
    price: 180,
    rating: 4.8,
    veg: false,
    bestseller: true,
    available: true,
    qty: "8 pcs",
    desc: "Steamed dumplings with a peppery chicken filling and house chutney.",
    img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "p2",
    name: "Veg Momo",
    category: "Momo",
    price: 150,
    rating: 4.5,
    veg: true,
    bestseller: false,
    available: true,
    qty: "8 pcs",
    desc: "Cabbage, carrot and onion folded into a light steamed wrapper.",
    img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "p3",
    name: "Chicken Pizza",
    category: "Italian",
    price: 399,
    rating: 4.9,
    veg: false,
    bestseller: true,
    available: true,
    qty: '9" regular',
    desc: "Loaded with chicken, mozzarella and fresh vegetables.",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "p4",
    name: "Chicken Biryani",
    category: "Biryani",
    price: 280,
    rating: 4.7,
    veg: false,
    bestseller: true,
    available: true,
    qty: "1 plate",
    desc: "Slow-cooked basmati layered with marinated chicken and saffron.",
    img: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "p5",
    name: "Chicken Leg",
    category: "Chicken",
    price: 250,
    rating: 4.8,
    veg: false,
    bestseller: false,
    available: true,
    qty: "2 pcs",
    desc: "Crispy spiced chicken leg, tandoor finished.",
    img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "p6",
    name: "Paneer Butter Masala",
    category: "Indian",
    price: 220,
    rating: 4.6,
    veg: true,
    bestseller: false,
    available: true,
    qty: "1 bowl",
    desc: "Paneer in a silky tomato-butter gravy, served with a side of rice.",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "p7",
    name: "French Fries",
    category: "Chinese",
    price: 120,
    rating: 4.4,
    veg: true,
    bestseller: false,
    available: true,
    qty: "1 basket",
    desc: "Salted, crisped twice, served with a smoked chilli dip.",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "p8",
    name: "Cold Drink",
    category: "Drinks",
    price: 60,
    rating: 4.2,
    veg: true,
    bestseller: false,
    available: true,
    qty: "300ml",
    desc: "Chilled soft drink, pick your favourite.",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "p9",
    name: "Gulab Jamun",
    category: "Desserts",
    price: 90,
    rating: 4.7,
    veg: true,
    bestseller: false,
    available: true,
    qty: "2 pcs",
    desc: "Warm milk dumplings soaked in cardamom syrup.",
    img: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "p10",
    name: "Chilli Chicken",
    category: "Chinese",
    price: 260,
    rating: 4.6,
    veg: false,
    bestseller: true,
    available: true,
    qty: "1 plate",
    desc: "Wok-tossed chicken in a sharp garlic-chilli glaze.",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=85"
  }
];

/* =========================================================
   STAFF
   ========================================================= */

const seedStaff = () => [
  {
    id: "s1",
    name: "Rahul Mehta",
    email: "manager@kaverikitchen.in",
    role: "Manager",
    active: true
  },
  {
    id: "s2",
    name: "Ananya Roy",
    email: "cashier@kaverikitchen.in",
    role: "Cashier",
    active: true
  },
  {
    id: "s3",
    name: "Arjun Das",
    email: "kitchen@kaverikitchen.in",
    role: "Kitchen Staff",
    active: true
  }
];

/* =========================================================
   INVENTORY
   ========================================================= */

const seedInventory = () => [
  {
    id: "i1",
    item: "Chicken",
    unit: "kg",
    stock: 18,
    min: 6,
    status: "In Stock"
  },
  {
    id: "i2",
    item: "Basmati Rice",
    unit: "kg",
    stock: 24,
    min: 8,
    status: "In Stock"
  },
  {
    id: "i3",
    item: "Mozzarella",
    unit: "kg",
    stock: 4,
    min: 6,
    status: "Low Stock"
  },
  {
    id: "i4",
    item: "Paneer",
    unit: "kg",
    stock: 8,
    min: 4,
    status: "In Stock"
  },
  {
    id: "i5",
    item: "Cooking Oil",
    unit: "L",
    stock: 3,
    min: 5,
    status: "Low Stock"
  }
];

/* =========================================================
   TABLES
   ========================================================= */

const seedTables = () => [
  { id: 1, name: "Table 1", seats: 2, status: "Available" },
  { id: 2, name: "Table 2", seats: 4, status: "Occupied" },
  { id: 3, name: "Table 3", seats: 4, status: "Available" },
  { id: 4, name: "Table 4", seats: 6, status: "Cleaning" },
  { id: 5, name: "Table 5", seats: 4, status: "Occupied" },
  { id: 6, name: "Table 6", seats: 2, status: "Available" }
];

/* =========================================================
   ORDERS
   ========================================================= */

const seedOrders = () => [
  {
    id: "ORD-1042",
    type: "Delivery",
    customer: "Ankit Sharma",
    phone: "98xxxxxx21",
    address: "44 MG Road",
    items: [{ name: "Chicken Biryani", qty: 1 }],
    total: 280,
    status: "Preparing",
    time: "10 min ago"
  },
  {
    id: "ORD-1041",
    type: "Takeaway",
    customer: "Meera Iyer",
    phone: "97xxxxxx08",
    items: [
      { name: "Chicken Pizza", qty: 1 },
      { name: "Cold Drink", qty: 1 }
    ],
    total: 459,
    status: "Ready",
    time: "22 min ago"
  },
  {
    id: "ORD-1040",
    type: "Dine-in",
    customer: "Table 5",
    items: [
      { name: "Chicken Momo", qty: 1 },
      { name: "Cold Drink", qty: 2 },
      { name: "Chicken Pizza", qty: 1 }
    ],
    total: 699,
    status: "New",
    time: "3 min ago"
  }
];

const STATUS_FLOW = [
  "New",
  "Accepted",
  "Preparing",
  "Ready",
  "Out for Delivery",
  "Delivered",
  "Cancelled"
];

const money = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

const readStored = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => readStored(key, initialValue));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Keep changes in memory when browser storage is unavailable.
    }
  }, [key, value]);

  return [value, setValue];
}

const seedSiteContent = () => ({
  heroEyebrow: "FRESH · HANDCRAFTED · DELICIOUS",
  heroTitle: "Savor the Taste of\nPerfection.",
  heroText: "Fresh ingredients, mouth-watering recipes and a passion for good food — freshly prepared at our kitchen.",
  heroMainImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=88",
  heroLeftImage: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=900&q=88",
  heroRightImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58da?auto=format&fit=crop&w=900&q=88",
  offerBanners: readStored("kaveri-offer-banners", seedOfferBanners()),
  offerKicker: "KAVERI KITCHEN · FOOD EDITION",
  offerSideLabel: "DAILY SPECIAL",
  offerFloatingLabel: "HANDCRAFTED",
  offerFloatingText: "Made fresh.\nServed warm.",
  offerMetaText: "FRESH / LOCAL / BOLD",
  signatureTitle: "Our Signature Dishes",
  signatureText: "Classic favourites and modern creations prepared fresh for every order.",
  aboutEyebrow: "MADE WITH LOVE",
  aboutTitle: "Good food.\nGood mood.",
  aboutText: "Carefully selected ingredients, balanced flavours and a kitchen that cares about every plate.",
  aboutImage: "",
  reviewsTitle: "They Love Us",
  reviewsText: "Good food, warm service and plenty of reasons to come back.",
  arKicker: "NEXT IN DINING",
  arTitle: "See your food\nbefore it arrives.",
  arText: "We are preparing an augmented-reality menu so you can preview selected dishes on your own table before ordering.",
  arTags: "3D Food Preview,Table View,Coming Soon",
  finalEyebrow: "KAVERI KITCHEN",
  finalTitle: "Don't Wait —\nOrder Now!",
  finalText: "Freshly prepared favourites delivered straight to your door.",
  footerTagline: "Fresh food, warm service and flavours worth coming back for.",
  footerHours: "11:00 AM – 11:00 PM",
  footerDays: "Open Every Day"
});

const seedPaymentSettings = () => ({
  upiEnabled: true,
  upiId: "kaverikitchen@upi",
  merchantName: "Kaveri Kitchen",
  qrImage: "",
  cashEnabled: true,
  cardEnabled: true
});


/* =========================================================
   SHARED UI
   ========================================================= */

function Badge({ children, tone = "brass" }) {
  const tones = {
    brass: {
      bg: "rgba(255,107,74,0.12)",
      color: BRASS
    },
    green: {
      bg: "rgba(90,168,110,0.15)",
      color: "#4F8A5D"
    },
    red: {
      bg: "rgba(214,90,90,0.12)",
      color: "#C84632"
    },
    grey: {
      bg: "rgba(76,21,4,0.07)",
      color: "#75635B"
    }
  };

  const t = tones[tone] || tones.grey;

  return (
    <span
      style={{
        background: t.bg,
        color: t.color,
        fontSize: 11,
        padding: "4px 9px",
        borderRadius: 999,
        letterSpacing: 0.2,
        fontWeight: 700
      }}
    >
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    Available: "green",
    Occupied: "red",
    Cleaning: "grey",
    New: "brass",
    Accepted: "brass",
    Preparing: "brass",
    Ready: "green",
    "Out for Delivery": "brass",
    Delivered: "green",
    Cancelled: "red",
    "In Stock": "green",
    "Low Stock": "brass",
    "Out of Stock": "red"
  };

  return (
    <Badge tone={map[status] || "grey"}>
      {status}
    </Badge>
  );
}

/* =========================================================
   ROOT APP
   ========================================================= */

export default function HotelSystem() {
  const [view, setView] = useState(() => {
    const path = window.location.pathname.toLowerCase();

    if (path === "/admin" || path === "/admin/") {
      try {
        return localStorage.getItem("kaveri-current-staff")
          ? "admin"
          : "adminLogin";
      } catch {
        return "adminLogin";
      }
    }

    // Public entry flow:
    // /      -> Hero / landing presentation page
    // /main  -> actual restaurant main website
    if (path === "/main" || path === "/main/") {
      return "landing";
    }

    return "hero";
  });

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Public menu is controlled by Admin through Firestore.
  // If Firestore is unavailable, the original seed menu remains visible.
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const firebaseProducts = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }));

        // Public menu is strictly controlled by Admin. No demo/curated items.
        setProducts(firebaseProducts);

        setProductsLoading(false);
      },
      (error) => {
        console.error("Firestore products error:", error);
        setProducts([]);
        setProductsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  const [staff, setStaff] = usePersistentState("kaveri-staff", seedStaff());
  const [inventory, setInventory] = usePersistentState("kaveri-inventory", seedInventory());
  const [tables, setTables] = usePersistentState("kaveri-tables", seedTables());
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Orders are stored in Firestore so the public website and Admin panel
  // always use the same realtime order data.
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const firebaseOrders = snapshot.docs
          .map((item) => ({
            id: item.id,
            ...item.data()
          }))
          .sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || 0;
            return bTime - aTime;
          });

        setOrders(firebaseOrders);
        setOrdersLoading(false);
      },
      (error) => {
        console.error("Firestore orders error:", error);
        setOrdersLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  const savedSiteContent = readStored("kaveri-site-content", {});
  const savedLegacyOffers = readStored("kaveri-offer-banners", seedOfferBanners());
  const initialSiteContent = {
    ...seedSiteContent(),
    ...savedSiteContent,
    offerBanners:
      Array.isArray(savedSiteContent.offerBanners) && savedSiteContent.offerBanners.length
        ? savedSiteContent.offerBanners
        : Array.isArray(savedLegacyOffers) && savedLegacyOffers.length
          ? savedLegacyOffers
          : seedOfferBanners()
  };
  const [siteContent, setSiteContent] = useState(initialSiteContent);
  const [siteContentLoading, setSiteContentLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "siteContent"),
      (snapshot) => {
        if (snapshot.exists()) {
          setSiteContent((current) => ({
            ...current,
            ...snapshot.data()
          }));
        } else {
          setSiteContent(initialSiteContent);
        }
        setSiteContentLoading(false);
      },
      (error) => {
        console.error("Firestore site content error:", error);
        setSiteContentLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  const [paymentSettings, setPaymentSettings] = usePersistentState(
    "kaveri-payment-settings",
    { ...seedPaymentSettings(), ...readStored("kaveri-payment-settings", {}) }
  );

  // Payment QR link is controlled from Admin through Firestore.
  // This keeps the public UPI checkout synced with the Admin QR link.
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "paymentSettings"),
      (snapshot) => {
        if (snapshot.exists()) {
          setPaymentSettings((current) => ({
            ...current,
            ...snapshot.data()
          }));
        }
      },
      (error) => {
        console.error("Firestore payment settings error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const [hotel, setHotel] = usePersistentState("kaveri-hotel", {
    name: "Kaveri Kitchen",
    phone: "+91 98765 43210",
    address: "44 MG Road, Guwahati, Assam",
    about:
      "A modern restaurant serving Indian, Chinese and Italian favourites — dine-in, takeaway or delivered to your door.",
    logo: ""
  });

  // Sync Admin > Settings website name/details from Firestore in realtime.
  // This keeps the public website and Admin on the same settings document.
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "hotel"),
      (snapshot) => {
        if (snapshot.exists()) {
          setHotel((current) => ({
            ...current,
            ...snapshot.data()
          }));
        }
      },
      (error) => {
        console.error("Firestore hotel settings error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const [cart, setCart] = useState({});
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return Boolean(localStorage.getItem("kaveri-current-staff"));
    } catch {
      return false;
    }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("kaveri-current-user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const syncUser = () => {
      try {
        const saved = localStorage.getItem("kaveri-current-user");
        setCurrentUser(saved ? JSON.parse(saved) : null);
      } catch {
        setCurrentUser(null);
      }
    };
    window.addEventListener("kaveri-auth-changed", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("kaveri-auth-changed", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const addToCart = (id, delta) => {
    setCart((current) => {
      const next = {
        ...current,
        [id]: Math.max(0, (current[id] || 0) + delta)
      };

      if (next[id] === 0) {
        delete next[id];
      }

      return next;
    });
  };

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const placeOrder = async (order) => {
    const orderId = order?.id || `ORD-${String(Date.now()).slice(-8)}`;

    const payload = {
      ...order,
      id: orderId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(doc(db, "orders", orderId), payload);
    setCart({});
    return orderId;
  };

  const goToLogin = () => {
    setView("userLogin");
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem("kaveri-current-user");
      window.dispatchEvent(new Event("kaveri-auth-changed"));
    } catch {}
    setView("landing");
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const nav = (target) => {
    if (target === "order" && !currentUser) {
      goToLogin();
      return;
    }

    if (target === "login") {
      goToLogin();
      return;
    }

    setView(target);

    window.scrollTo?.({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          view === "admin" || view === "adminLogin" || view === "userLogin"
            ? INK
            : BONE,
        color:
          view === "admin" || view === "adminLogin" || view === "userLogin"
            ? BONE
            : INK,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}
    >
      {view !== "landing" &&
 view !== "admin" &&
 view !== "adminLogin" && (
  <SiteHeader
    view={view}
    nav={nav}
    cartCount={cartCount}
    hotelName={hotel.name}
    hotelLogo={hotel.logo}
    currentUser={currentUser}
    onUserLogout={handleUserLogout}
  />
)}
      {view === "hero" && <HeroPage />}

      {view === "landing" && (
        <Landing
          nav={nav}
          products={products}
          hotel={hotel}
          siteContent={siteContent}
          cartCount={cartCount}
          currentUser={currentUser}
          onUserLogout={handleUserLogout}
        />
      )}

      {view === "order" && (
        <OrderPage
          products={products}
          cart={cart}
          addToCart={addToCart}
          placeOrder={placeOrder}
          orders={orders}
          currentUser={currentUser}
          paymentSettings={paymentSettings}
          nav={nav}
        />
      )}

      {view === "cart" && (
        <CartPage
          products={products}
          cart={cart}
          addToCart={addToCart}
          nav={nav}
          cartCount={cartCount}
        />
      )}

      {view === "digital" && (
        <DigitalMenu
          products={products}
          hotel={hotel}
          nav={nav}
        />
      )}

      {view === "userLogin" && (
        <UserLogin
          hotel={hotel}
          currentUser={currentUser}
          onAuthenticated={(user) => {
            setCurrentUser(user);
            try {
              localStorage.setItem(
                "kaveri-current-user",
                JSON.stringify(user)
              );
              window.dispatchEvent(new Event("kaveri-auth-changed"));
            } catch {}
            nav("order");
          }}
          nav={nav}
        />
      )}

      {view === "adminLogin" && (
        <AdminLogin
          onLogin={(staffAccount) => {
            setIsAdmin(true);
            try {
              if (staffAccount) {
                localStorage.setItem(
                  "kaveri-current-staff",
                  JSON.stringify(staffAccount)
                );
              }
            } catch {}
            setView("admin");
            window.history.replaceState({}, "", "/admin");
          }}
          nav={nav}
        />
      )}

      {view === "admin" && isAdmin && (
        <AdminApp
          products={products}
          setProducts={setProducts}
          staff={staff}
          setStaff={setStaff}
          inventory={inventory}
          setInventory={setInventory}
          tables={tables}
          setTables={setTables}
          orders={orders}
          setOrders={setOrders}
          hotel={hotel}
          setHotel={setHotel}
          onLogout={() => {
            setIsAdmin(false);
            try {
              localStorage.removeItem("kaveri-current-staff");
            } catch {}
            setView("landing");
            window.history.replaceState({}, "", "/");
            window.scrollTo?.({ top: 0, behavior: "smooth" });
          }}
          nav={nav}
        />
      )}

      {view !== "admin" &&
        view !== "adminLogin" && (
          <>
            <SiteFooter
              hotel={hotel}
              nav={nav}
              siteContent={siteContent}
            />
          </>
        )}
    </div>
  );
}

/* =========================================================
   HEADER
   ========================================================= */

function SiteHeader({
  view,
  nav,
  cartCount,
  hotelName,
  hotelLogo,
  currentUser = null,
  onUserLogout
}) {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    setOpen(false);
    if (view !== "landing") {
      nav("landing");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 80);
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <>
      <header className="food-header">
        <div className="food-header-inner">

          <button
            className="brand-button"
            onClick={() => nav("landing")}
            aria-label={`${hotelName} home`}
          >
            {hotelLogo ? (
              <img
                src={hotelLogo}
                alt={`${hotelName} logo`}
                style={{
                  width: 38,
                  height: 38,
                  objectFit: "contain",
                  borderRadius: 10,
                  background: "#fff4ee",
                  padding: 4,
                  flex: "0 0 auto"
                }}
              />
            ) : (
              <span className="brand-mark">K</span>
            )}

            <span>
              <strong>{hotelName}</strong>
              <small>RESTAURANT • KITCHEN</small>
            </span>
          </button>

          <nav
            className="desktop-nav"
            aria-label="Main navigation"
          >
            <button
              onClick={() => nav("landing")}
              className={view === "landing" ? "active" : ""}
            >
              Home
            </button>

            <button
              onClick={() => nav("order")}
              className={view === "order" ? "active" : ""}
            >
              Menu
            </button>

            <button
              onClick={() => scrollToSection("about-section")}
            >
              About
            </button>

            <button
              onClick={() => scrollToSection("reviews-section")}
            >
              Reviews
            </button>
          </nav>

          <div className="header-actions">

            <button
              className="header-cart-button"
              onClick={() => {
                const isMobile = window.matchMedia
                  ? window.matchMedia("(max-width: 768px)").matches
                  : window.innerWidth <= 768;
                nav(isMobile ? "cart" : "order");
              }}
              aria-label={`Cart${cartCount ? `, ${cartCount} items` : ""}`}
            >
              <ShoppingCart size={18} />

              <span className="header-cart-label">
                Cart
              </span>

              {cartCount > 0 && (
                <span className="header-cart-badge">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="header-order-button"
              onClick={() => nav("order")}
            >
              Order Food
              <ChevronRight size={14} />
            </button>

            <button
              className={`header-login-button${currentUser ? " is-authenticated" : ""}`}
              onClick={() => (currentUser ? onUserLogout?.() : nav("login"))}
            >
              <UserCircle2 size={14} />
              {currentUser ? "Logout" : "Login"}
            </button>

            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setOpen((current) => !current)}
              aria-label="Open menu"
            >
              {open ? <X size={20} /> : <MenuIcon size={20} />}
            </button>

          </div>
        </div>

        {open && (
          <div className="mobile-menu">
            <button
              onClick={() => {
                nav("landing");
                setOpen(false);
              }}
              className={view === "landing" ? "active" : ""}
            >
              Home
            </button>

            <button
              onClick={() => {
                nav("order");
                setOpen(false);
              }}
              className={view === "order" ? "active" : ""}
            >
              Menu
            </button>

            <button onClick={() => scrollToSection("about-section")}>
              About
            </button>

            <button onClick={() => scrollToSection("reviews-section")}>
              Reviews
            </button>

            <button
              onClick={() => {
                nav("cart");
                setOpen(false);
              }}
            >
              Cart{cartCount > 0 ? ` (${cartCount})` : ""}
            </button>

            <button
              onClick={() => {
                nav("order");
                setOpen(false);
              }}
            >
              Order Food
            </button>

            <button
              onClick={() => {
                if (currentUser) {
                  onUserLogout?.();
                } else {
                  nav("login");
                }
                setOpen(false);
              }}
            >
              {currentUser ? "Logout" : "Login"}
            </button>
          </div>
        )}
      </header>
    </>
  );
}

/* =========================================================
   AR MENU — COMING SOON
   ========================================================= */

function ARComingSoon({ nav, siteContent = seedSiteContent() }) {
  const now = new Date();

  return (
    <section className="ar-coming-section" aria-label="AR menu coming soon">
      <div className="ar-coming-shell">
        <div className="ar-coming-copy">
          <span className="ar-coming-kicker">{siteContent.arKicker}</span>

          <h2 style={{ ...serif, whiteSpace: "pre-line" }}>
            {siteContent.arTitle}
          </h2>

          <p>{siteContent.arText}</p>

          <div className="ar-coming-tags">
            {siteContent.arTags.split(",").map((tag) => (
              <span key={tag}>{tag.trim()}</span>
            ))}
          </div>

          <button
            type="button"
            className="ar-coming-button"
            onClick={() => nav("order")}
          >
            Explore the Menu
            <ChevronRight size={16} />
          </button>
        </div>

        <LiveCalendar />
      </div>
    </section>
  );
}

/* =========================================================
   LIVE CALENDAR PREVIEW
   Automatically follows the visitor's local date.
   ========================================================= */

function LiveCalendar() {
  const getDate = () => new Date();
  const [today, setToday] = useState(getDate);
  const [shownMonth, setShownMonth] = useState(
    () => new Date(getDate().getFullYear(), getDate().getMonth(), 1)
  );

  useEffect(() => {
    const update = () => {
      const current = getDate();
      setToday(current);
    };

    update();
    const timer = window.setInterval(update, 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const month = shownMonth.getMonth();
  const year = shownMonth.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  const isCurrentMonth =
    month === currentMonth && year === currentYear;

  const monthLabel = shownMonth.toLocaleDateString("en-IN", {
    month: "long"
  });

  const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const calendarCells = [];

  for (let i = 0; i < firstDay; i += 1) {
    calendarCells.push({ blank: true, key: `blank-${i}` });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    calendarCells.push({
      day,
      key: `day-${day}`,
      active: isCurrentMonth && day === currentDay
    });
  }

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push({
      blank: true,
      key: `tail-${calendarCells.length}`
    });
  }

  const goMonth = (delta) => {
    setShownMonth(
      new Date(
        shownMonth.getFullYear(),
        shownMonth.getMonth() + delta,
        1
      )
    );
  };

  const goToday = () => {
    setShownMonth(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );
  };

  const years = [year - 3, year - 2, year - 1, year, year + 1, year + 2, year + 3];

  return (
    <div className="ar-coming-visual live-calendar-visual">
      <div className="calendar-orbit orbit-one" />
      <div className="calendar-orbit orbit-two" />

      <div className="live-calendar-card">
        <div className="calendar-topbar">
          <button
            type="button"
            className="calendar-mini-button"
            onClick={() => goMonth(-1)}
            aria-label="Previous month"
          >
            <ChevronLeft size={14} />
          </button>

          <button
            type="button"
            className="calendar-month-button"
            onClick={goToday}
            title="Jump to today"
          >
            {monthLabel}
            <span>{year}</span>
          </button>

          <button
            type="button"
            className="calendar-mini-button"
            onClick={() => goMonth(1)}
            aria-label="Next month"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="calendar-body">
          <div className="calendar-weekdays">
            {weekdayLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className="calendar-grid">
            {calendarCells.map((cell) =>
              cell.blank ? (
                <span className="calendar-day blank" key={cell.key} />
              ) : (
                <span
                  className={`calendar-day ${cell.active ? "today" : ""}`}
                  key={cell.key}
                >
                  {cell.day}
                </span>
              )
            )}
          </div>
        </div>

        <aside className="calendar-years" aria-label="Years">
          {years.map((itemYear) => (
            <button
              type="button"
              key={itemYear}
              className={itemYear === year ? "active" : ""}
              onClick={() =>
                setShownMonth(
                  new Date(
                    itemYear,
                    month,
                    1
                  )
                )
              }
            >
              {itemYear}
            </button>
          ))}
        </aside>

        <div className="calendar-footer-line">
          <span className="calendar-live-dot" />
          Live calendar · updates daily
        </div>

        <div className="calendar-today-chip">
          <strong>
            {today.toLocaleDateString("en-IN", {
              weekday: "short",
              day: "2-digit",
              month: "short"
            })}
          </strong>
          <span>Today</span>
        </div>
      </div>

      <div className="calendar-float-card calendar-float-top">
        <span className="calendar-live-dot" />
        Live Date
      </div>

      <div className="calendar-float-card calendar-float-bottom">
        <Sparkles size={13} />
        Smart Experience
      </div>
    </div>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */

function SiteFooter({ hotel, nav, siteContent = seedSiteContent() }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2fr 1fr 1fr 1fr",
            gap: 30
          }}
        >

          <div>
            <div
              style={{
                ...serif,
                fontSize: 27,
                marginBottom: 10
              }}
            >
              {hotel.name}
            </div>

            <p>
              {siteContent.footerTagline}
            </p>
          </div>

          <div>
            <h4>Navigate</h4>

            <div style={{ display: "grid", gap: 7 }}>
              <button
                onClick={() => nav("landing")}
                style={{
                  background: "none",
                  border: 0,
                  textAlign: "left",
                  padding: 0,
                  color: "inherit"
                }}
              >
                Home
              </button>

              <button
                onClick={() => nav("order")}
                style={{
                  background: "none",
                  border: 0,
                  textAlign: "left",
                  padding: 0,
                  color: "inherit"
                }}
              >
                Menu
              </button>

            </div>
          </div>

          <div>
            <h4>Contact</h4>

            <p>{hotel.phone}</p>
            <p>{hotel.address}</p>
          </div>

          <div>
            <h4>Hours</h4>
            <p>{siteContent.footerHours}</p>
            <p>{siteContent.footerDays}</p>
          </div>

        </div>

        <div
          style={{
            marginTop: 35,
            paddingTop: 18,
            borderTop:
              "1px solid rgba(255,255,255,0.1)",
            fontSize: 11
          }}
        >
          © {new Date().getFullYear()} {hotel.name}. Built as a working prototype.
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   NEW REFERENCE-STYLE LANDING PAGE
   ========================================================= */

function Landing({
  nav,
  products,
  hotel,
  siteContent = seedSiteContent(),
  cartCount = 0,
  currentUser = null,
  onUserLogout
}) {
  const HERO_FALLBACK =
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=90";


  const dishImageMap = {
    "chicken momo":
      "https://images.pexels.com/photos/36173262/pexels-photo-36173262.jpeg?auto=compress&cs=tinysrgb&w=900",
    "veg momo":
      "https://images.pexels.com/photos/28445589/pexels-photo-28445589.jpeg?auto=compress&cs=tinysrgb&w=900",
    "chicken pizza":
      "https://images.pexels.com/photos/5639548/pexels-photo-5639548.jpeg?auto=compress&cs=tinysrgb&w=900",
    "chicken biryani":
      "https://images.pexels.com/photos/4224314/pexels-photo-4224314.jpeg?auto=compress&cs=tinysrgb&w=900",
    "chicken leg":
      "https://images.pexels.com/photos/36480176/pexels-photo-36480176.jpeg?auto=compress&cs=tinysrgb&w=900",
    "paneer butter masala":
      "https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=900",
    "french fries":
      "https://images.pexels.com/photos/8880729/pexels-photo-8880729.jpeg?auto=compress&cs=tinysrgb&w=900",
    "cold drink":
      "https://images.pexels.com/photos/20045266/pexels-photo-20045266.jpeg?auto=compress&cs=tinysrgb&w=900",
    "gulab jamun":
      "https://images.pexels.com/photos/9198596/pexels-photo-9198596.jpeg?auto=compress&cs=tinysrgb&w=900",
    "chilli chicken":
      "https://images.pexels.com/photos/28674534/pexels-photo-28674534.jpeg?auto=compress&cs=tinysrgb&w=900",
    "chiken fry":
      "https://images.pexels.com/photos/35267270/pexels-photo-35267270.jpeg?auto=compress&cs=tinysrgb&w=900",
    "chicken fry":
      "https://images.pexels.com/photos/35267270/pexels-photo-35267270.jpeg?auto=compress&cs=tinysrgb&w=900"
  };

  const getDishImage = (dish) =>
    String(dish?.img || "").trim() ||
    "";

  const liveProducts = products
    .filter((product) => product.available !== false)
    .map((product) => ({
      ...product,
      img: getDishImage(product),
      salesCount: Number(product.salesCount || 0)
    }));

  // Best sellers are calculated from real paid-order salesCount.
  // bestseller=true is a secondary priority for products that have not sold yet.
  const autoBestSellerRanking = [...liveProducts].sort((a, b) => {
    const salesDiff = Number(b.salesCount || 0) - Number(a.salesCount || 0);
    if (salesDiff !== 0) return salesDiff;
    const bestDiff = Number(Boolean(b.bestseller)) - Number(Boolean(a.bestseller));
    if (bestDiff !== 0) return bestDiff;
    return Number(b.rating || 0) - Number(a.rating || 0);
  });

  const markedOrSold = autoBestSellerRanking.filter((product) =>
    Number(product.salesCount || 0) > 0 || product.bestseller
  );

  const autoBestSellers = markedOrSold.length
    ? markedOrSold
    : autoBestSellerRanking.slice(0, 6);

  const manualMenuIds = Array.isArray(siteContent.menuExperienceManualIds)
    ? siteContent.menuExperienceManualIds
    : [];

  const menuExperienceItems =
    siteContent.menuExperienceMode === "manual" && manualMenuIds.length
      ? manualMenuIds
          .map((id) => liveProducts.find((product) => String(product.id) === String(id)))
          .filter(Boolean)
      : autoBestSellers.slice(0, 6);

  const madeWithLoveDish =
    siteContent.madeWithLoveMode === "manual" && siteContent.madeWithLoveManualId
      ? liveProducts.find((product) => String(product.id) === String(siteContent.madeWithLoveManualId)) || autoBestSellers[0]
      : autoBestSellers[0];

  const menuCategories = [
    "All",
    ...Array.from(new Set(liveProducts.map((product) => product.category).filter(Boolean)))
  ];

  const heroMainImage = siteContent.heroMainImage || HERO_FALLBACK;

  const [menuCategory, setMenuCategory] = useState("All");
  const [menuMotionIndex, setMenuMotionIndex] = useState(0);

  /* AUTO MENU EXPERIENCE SLIDER */
  useEffect(() => {
    if (menuMotionIndex >= menuExperienceItems.length) {
      setMenuMotionIndex(0);
    }
  }, [menuExperienceItems.length, menuMotionIndex]);

  useEffect(() => {
    if (menuExperienceItems.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setMenuMotionIndex((current) => (current + 1) % menuExperienceItems.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [menuExperienceItems.length]);

  const [momentOpen, setMomentOpen] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [reviews, setReviews] = useState(() =>
    readStored("kaveri-reviews", [
      {
        id: "r1",
        name: "Priya Sharma",
        text:
          "Everything was beautifully prepared and tasted amazing.",
        rating: 5,
        color: "pink"
      },
      {
        id: "r2",
        name: "Rahul Das",
        text:
          "The biryani and pizza were absolutely delicious.",
        rating: 5,
        color: "peach"
      },
      {
        id: "r3",
        name: "Ananya Roy",
        text:
          "Great food, fast service and beautiful presentation.",
        rating: 5,
        color: "lavender"
      }
    ])
  );
  const [activeReview, setActiveReview] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
useEffect(() => {
    const onScroll = () => {
      const root = document.querySelector(".cinematic-restaurant-page");
      if (!root) return;
      const hero = root.querySelector(".cinematic-main-hero");
      if (!hero) return;
      const heroHeight = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / heroHeight)
      );
      root.style.setProperty("--scroll-progress", progress.toFixed(3));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".cin-reveal");
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!reviews.length) return undefined;
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [reviews.length]);

  useEffect(() => {
    try {
      localStorage.setItem("kaveri-reviews", JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  const filteredMenu =
    menuCategory === "All"
      ? liveProducts
      : liveProducts.filter(
          (item) =>
            item.category.toLowerCase() === menuCategory.toLowerCase()
        );

  const featuredDishes = filteredMenu;

  const moments = [
    {
      eyebrow: "01 · THE TABLE",
      title: "Slow dining, warm light.",
      text:
        "A beautifully paced dining experience designed around the table — warm service, bold flavours and food worth staying for.",
      image: siteContent.momentImage1 || ""
    },
    {
      eyebrow: "02 · THE KITCHEN",
      title: "Made with intention.",
      text:
        "Fresh ingredients, careful preparation and a kitchen rhythm that keeps every plate consistent from first order to final bite.",
      image: siteContent.momentImage2 || ""
    },
    {
      eyebrow: "03 · THE MOMENT",
      title: "Food becomes memory.",
      text:
        "Come for the dish. Stay for the atmosphere. Leave with a reason to return.",
      image: siteContent.momentImage3 || ""
    }
  ];

  const submitFeedback = (event) => {
    event.preventDefault();

    if (!feedbackRating) {
      alert("Please select a star rating.");
      return;
    }

    if (!feedbackName.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!feedbackText.trim()) {
      alert("Please write your feedback.");
      return;
    }

    const colors = ["pink", "peach", "lavender"];

    const newReview = {
      id: `review-${Date.now()}`,
      name: feedbackName.trim(),
      text: feedbackText.trim(),
      rating: feedbackRating,
      color: colors[reviews.length % colors.length]
    };

    setReviews((current) => [...current, newReview]);
    setFeedbackRating(0);
    setFeedbackName("");
    setFeedbackText("");
    setFeedbackOpen(false);
    setActiveReview(reviews.length);
  };

  const goSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    setMobileNavOpen(false);
  };

  const currentReview = reviews[activeReview % Math.max(reviews.length, 1)] || {
    name: "Customer",
    text: "A beautiful dining experience.",
    rating: 5
  };

  return (
    <div className="restaurant-home cinematic-restaurant-page">
      <section className="cinematic-main-hero" id="home-section">
        <div className="cin-hero-backdrop" aria-label="Restaurant hero photo area" />

        <div className="cin-hero-vignette" />
        <div className="cin-hero-grain" />

        <header className="cin-hero-header">
          <button
            type="button"
            className="cin-brand"
            onClick={() => goSection("home-section")}
          >
            {hotel.logo ? (
              <img src={hotel.logo} alt={`${hotel.name} logo`} />
            ) : (
              <span className="cin-brand-mark">K</span>
            )}
            <span>
              <strong>{hotel.name}</strong>
              <small>RESTAURANT · KITCHEN</small>
            </span>
          </button>

          <nav className="cin-main-nav" aria-label="Restaurant navigation">
            <button type="button" onClick={() => goSection("home-section")}>
              Home
            </button>
            <button type="button" onClick={() => nav("order")}>
              Menu
            </button>
            <button type="button" onClick={() => goSection("story-section")}>
              Story
            </button>
            <button type="button" onClick={() => goSection("reviews-section")}>
              Reviews
            </button>
          </nav>

          <div className="cin-header-actions">
            <button
              type="button"
              className="cin-ghost-action"
              onClick={() => nav("order")}
            >
              <ShoppingCart size={15} />
              Cart{cartCount ? ` · ${cartCount}` : ""}
            </button>
            <button
              type="button"
              className="cin-fill-action"
              onClick={() => nav("order")}
            >
              Order Food
              <ChevronRight size={14} />
            </button>
            <button
              type="button"
              className={`cin-login-action${currentUser ? " is-authenticated" : ""}`}
              onClick={() => {
                if (currentUser) {
                  onUserLogout?.();
                } else {
                  nav("login");
                }
              }}
              title={currentUser ? "Logout" : "Login"}
            >
              <UserCircle2 size={13} />
              {currentUser ? "Logout" : "Login"}
            </button>
          </div>

          <button
            type="button"
            className="cin-mobile-menu-button"
            onClick={() => setMobileNavOpen((current) => !current)}
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </header>

        {mobileNavOpen && (
          <div className="cin-mobile-nav">
            <button type="button" onClick={() => goSection("home-section")}>
              Home
            </button>
            <button type="button" onClick={() => nav("order")}>
              Menu
            </button>
            <button type="button" onClick={() => goSection("story-section")}>
              Story
            </button>
            <button type="button" onClick={() => goSection("reviews-section")}>
              Reviews
            </button>
            <button
              type="button"
              onClick={() => {
                nav("cart");
                setMobileNavOpen(false);
              }}
            >
              <ShoppingCart size={15} />
              Cart{cartCount ? ` · ${cartCount}` : ""}
            </button>
            <button type="button" onClick={() => nav("order")}>
              Order Food
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentUser) {
                  onUserLogout?.();
                  setMobileNavOpen(false);
                } else {
                  nav("login");
                  setMobileNavOpen(false);
                }
              }}
            >
              {currentUser ? "Logout" : "Login"}
            </button>
          </div>
        )}

        <div className="cin-hero-content">
          <span className="cin-overline">EST. 2026 · GUWAHATI</span>

          <h1>
            <span>{hotel.name.split(" ").slice(0, -1).join(" ") || hotel.name}</span>
            <em>{hotel.name.split(" ").slice(-1)[0]}</em>
          </h1>

          <p>
            A contemporary table for people who love beautiful food, warm
            service and memorable evenings.
          </p>

          <div className="cin-hero-buttons">
            <button
              type="button"
              className="cin-luxury-button"
              onClick={() => nav("order")}
            >
              Discover the Menu
              <ChevronRight size={16} />
            </button>

            <button
              type="button"
              className="cin-hero-link"
              onClick={() => goSection("story-section")}
            >
              Explore our story
            </button>
          </div>
        </div>

        <div className="cin-hero-caption">
          <span>01</span>
          <span>THE ART OF DINING</span>
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="cin-scroll-indicator">
          <span />
        </div>
      </section>

      <section className="cin-blur-transition cin-drinks-cinematic">
        <video
          className="cin-drinks-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          poster=""
        >
          <source src="/soft-drink-cinematic.mp4" type="video/mp4" />
        </video>

        <div className="cin-drinks-video-fallback" aria-hidden="true" />
        <div className="cin-drinks-vignette" aria-hidden="true" />
        <div className="cin-drinks-glow" aria-hidden="true" />
        <div className="cin-drinks-grain" aria-hidden="true" />

        <div className="cin-transition-copy cin-reveal">
          <span>{siteContent.heroEyebrow}</span>
          <h2>
            {String(siteContent.heroTitle || "Savor the Taste of\nPerfection.")
              .split("\n")
              .map((line, index) => (
                <React.Fragment key={`${line}-${index}`}>
                  {index > 0 && <br />}
                  {index === String(siteContent.heroTitle || "").split("\n").length - 1 ? (
                    <em>{line}</em>
                  ) : (
                    line
                  )}
                </React.Fragment>
              ))}
          </h2>
          <p>
            {siteContent.heroText.replace("our kitchen", hotel.name)}
          </p>
          <button type="button" onClick={() => nav("order")}>
            Explore the experience
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <section className="cin-menu-section" id="menu-section">
        <div className="cin-menu-stage">
          <div className="cin-menu-stage-copy cin-reveal">
            <span className="cin-section-index">02 · MENU EXPERIENCE</span>
            <h2>{siteContent.signatureTitle || "Food that deserves a closer look."}</h2>
            <p>
              {siteContent.signatureText || "Discover the dishes our guests are choosing most. This section is connected directly to your admin menu."}
            </p>
            <div className="cin-motion-dots">
              {menuExperienceItems.map((dish, index) => (
                <button
                  type="button"
                  key={`best-dot-${dish.id}`}
                  className={index === menuMotionIndex ? "active" : ""}
                  onClick={() => setMenuMotionIndex(index)}
                  aria-label={`Show ${dish.name}`}
                />
              ))}
            </div>
          </div>

          <div className="cin-menu-motion cin-best-seller-stage">
            <div className="cin-menu-motion-glow" />

            {menuExperienceItems.length > 0 ? (
              <article
                key={menuExperienceItems[menuMotionIndex]?.id || "menu-experience-empty"}
                className="cin-best-seller-card cin-best-seller-single-card"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  nav("order");
                }}
              >
                <div className="cin-best-seller-image">
                  {menuExperienceItems[menuMotionIndex]?.img ? (
                    <img
                      src={menuExperienceItems[menuMotionIndex].img}
                      alt={menuExperienceItems[menuMotionIndex].name}
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.add("show");
                      }}
                    />
                  ) : null}

                  <div
                    className={`cin-menu-card-image-placeholder${
                      menuExperienceItems[menuMotionIndex]?.img ? "" : " show"
                    }`}
                  />

                  <span>
                    #{String(menuMotionIndex + 1).padStart(2, "0")} · BEST SELLER
                  </span>
                </div>

                <div className="cin-best-seller-info">
                  <div>
                    <small>BEST SELLER</small>
                    <h3>{menuExperienceItems[menuMotionIndex]?.name}</h3>
                  </div>
                  <strong>₹{menuExperienceItems[menuMotionIndex]?.price}</strong>
                </div>
              </article>
            ) : (
              <div className="cin-best-seller-empty">
                Add menu items from Admin → Menu &amp; Products.
              </div>
            )}
          </div>

            <button
              type="button"
              className="cin-motion-order"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                nav("order");
              }}
            >
              View Full Menu
              <ArrowRightFallback />
            </button>
          </div>

        <div className="cin-menu-catalog cin-reveal">
          <div className="cin-catalog-heading">
            <div>
              <span className="cin-section-index">03 · COMPLETE CATALOG</span>
              <h2>Every plate. Every craving.</h2>
            </div>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                nav("order");
              }}
            >
              Open ordering
              <ChevronRight size={15} />
            </button>
          </div>

          <div className="cin-category-scroll">
            {menuCategories.map((category) => (
              <button
                type="button"
                key={category}
                className={menuCategory === category ? "active" : ""}
                onClick={() => setMenuCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="cin-menu-grid">
            {featuredDishes.map((dish, index) => (
              <article
                className="cin-menu-card"
                key={`${dish.id}-${index}`}
                onClick={() => nav("order")}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    nav("order");
                  }
                }}
              >
                <div className="cin-menu-card-image">
                  {dish.img ? (
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="cin-menu-card-live-image"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                        event.currentTarget.nextElementSibling?.classList.add("show");
                      }}
                    />
                  ) : null}
                  <div
                    className={`cin-menu-card-image-placeholder${dish.img ? "" : " show"}`}
                    style={{ width: "100%", height: "100%" }}
                    aria-label={`${dish.name} photo area`}
                  />
                  <span>{dish.category}</span>
                  <strong>★</strong>
                </div>
                <div className="cin-menu-card-body">
                  <div>
                    <h3>{dish.name}</h3>
                    <p>{dish.desc}</p>
                  </div>
                  <div className="cin-menu-card-price">
                    <span>{dish.qty || "1 serving"}</span>
                    <strong>₹{dish.price}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cin-story-section cin-made-with-love-section" id="story-section">
        <div className="cin-story-image cin-made-with-love-image">
          {madeWithLoveDish?.img ? (
            <img
              src={madeWithLoveDish.img}
              alt={madeWithLoveDish.name || "Made With Love"}
              className="cin-story-live-image"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                event.currentTarget.nextElementSibling?.classList.add("show");
              }}
            />
          ) : null}
          <div
            className={`cin-story-image-placeholder${madeWithLoveDish?.img ? "" : " show"}`}
            style={{ width: "100%", height: "100%" }}
            aria-label="Made With Love food photo area"
          />
          <div className="cin-story-image-overlay" />
          {madeWithLoveDish?.name ? (
            <div className="cin-made-with-love-badge">
              <span>{siteContent.madeWithLoveMode === "manual" ? "ADMIN PICK" : "TOP SELLER"}</span>
              <strong>{madeWithLoveDish.name}</strong>
            </div>
          ) : null}
        </div>

        <div className="cin-story-content cin-reveal">
          <span className="cin-section-index">{siteContent.aboutEyebrow}</span>
          <h2>{siteContent.aboutTitle}</h2>
          <p>{siteContent.aboutText}</p>

          <div className="cin-story-stats">
            <div>
              <strong>01</strong>
              <span>Freshly prepared</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Warm hospitality</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Made to remember</span>
            </div>
          </div>

          <button
            type="button"
            className="cin-outline-light"
            onClick={() => nav("order")}
          >
            Explore Menu
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <section className="cin-moments-section">
        <div className="cin-moments-heading cin-reveal">
          <span className="cin-section-index">04 · THE EXPERIENCE</span>
          <h2>
            Three moments.
            <em> One table.</em>
          </h2>
          <p>
            Different moods, different plates, one restaurant experience
            designed around the people at the table.
          </p>
        </div>

        <div className="cin-moments-grid">
          {moments.map((moment, index) => (
            <article
              className={`cin-moment-card cin-moment-${index + 1} cin-reveal`}
              key={moment.eyebrow}
            >
              <div className="cin-moment-image">
                {moment.image ? (
                  <img
                    src={moment.image}
                    alt={moment.title}
                    className="cin-moment-live-image"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}
                <div
                  className={`cin-moment-image-placeholder${moment.image ? "" : " show"}`}
                  style={{ width: "100%", height: "100%" }}
                  aria-label={`${moment.title} photo area`}
                />
              </div>

              <div className="cin-moment-overlay">
                <span>{moment.eyebrow}</span>
                <h3>{moment.title}</h3>
                <button
                  type="button"
                  onClick={() => setMomentOpen(moment)}
                >
                  Explore
                  <ChevronRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cin-review-section" id="reviews-section">
        <div className="cin-review-bg" />
        <div className="cin-review-wrap">
          <div className="cin-review-heading cin-reveal">
            <span className="cin-section-index">05 · GUEST VOICES</span>
            <h2>They came for dinner.<br />They stayed in the story.</h2>
            <p>{siteContent.reviewsText}</p>
          </div>

          <div className="cin-review-showcase cin-reveal">
            <QuoteMark />

            <div className="cin-review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  fill="currentColor"
                  opacity={
                    star <= Number(currentReview.rating || 5) ? 1 : 0.25
                  }
                />
              ))}
            </div>

            <blockquote>“{currentReview.text}”</blockquote>

            <div className="cin-review-person">
              <span>{String(currentReview.name || "C").charAt(0)}</span>
              <div>
                <strong>{currentReview.name || "Verified Customer"}</strong>
                <small>Verified Customer</small>
              </div>
            </div>

            <div className="cin-review-controls">
              <button
                type="button"
                onClick={() =>
                  setActiveReview(
                    (current) =>
                      (current - 1 + reviews.length) % reviews.length
                  )
                }
                aria-label="Previous review"
              >
                <ChevronLeft size={17} />
              </button>

              <div>
                {reviews.map((review, index) => (
                  <button
                    type="button"
                    key={review.id || `${review.name}-${index}`}
                    className={index === activeReview ? "active" : ""}
                    onClick={() => setActiveReview(index)}
                    aria-label={`Show review ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveReview(
                    (current) => (current + 1) % reviews.length
                  )
                }
                aria-label="Next review"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          <div className="cin-review-actions">
            <button type="button" onClick={() => setFeedbackOpen(true)}>
              <Star size={15} />
              Give Feedback
            </button>
            <button type="button" onClick={() => setReviewsModalOpen(true)}>
              See All Reviews
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className="cin-final-section">
        <div className="cin-final-inner cin-reveal">
          <span>{siteContent.finalEyebrow}</span>
          <h2>{siteContent.finalTitle}</h2>
          <p>{siteContent.finalText}</p>
          <div>
            <button
              type="button"
              className="cin-luxury-button"
              onClick={() => nav("order")}
            >
              Reserve the flavour
              <ChevronRight size={16} />
            </button>
            <button
              type="button"
              className="cin-final-text-link"
              onClick={() => nav("digital")}
            >
              Digital Menu
            </button>
          </div>
        </div>
      </section>

      {momentOpen && (
        <div
          className="cin-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setMomentOpen(null);
            }
          }}
        >
          <div className="cin-moment-modal" role="dialog" aria-modal="true">
            <button
              type="button"
              className="cin-modal-close"
              onClick={() => setMomentOpen(null)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="cin-modal-image">
              <div className="cin-modal-image-placeholder" style={{ width: "100%", height: "100%" }} aria-label={`${momentOpen.title} photo area`} />
            </div>

            <div className="cin-modal-body">
              <span>{momentOpen.eyebrow}</span>
              <h2>{momentOpen.title}</h2>
              <p>{momentOpen.text}</p>
              <button
                type="button"
                className="cin-luxury-button"
                onClick={() => {
                  setMomentOpen(null);
                  nav("order");
                }}
              >
                Explore Menu
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {feedbackOpen && (
        <div
          className="cin-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setFeedbackOpen(false);
            }
          }}
        >
          <div className="cin-feedback-modal" role="dialog" aria-modal="true">
            <button
              type="button"
              className="cin-modal-close"
              onClick={() => setFeedbackOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <span className="cin-section-index">GUEST FEEDBACK</span>
            <h2>Tell us about your table.</h2>

            <div className="cin-feedback-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={star <= feedbackRating ? "active" : ""}
                  onClick={() => setFeedbackRating(star)}
                  aria-label={`${star} stars`}
                >
                  <Star size={22} fill="currentColor" />
                </button>
              ))}
            </div>

            <form onSubmit={submitFeedback}>
              <input
                value={feedbackName}
                onChange={(event) => setFeedbackName(event.target.value)}
                placeholder="Your name"
              />
              <textarea
                value={feedbackText}
                onChange={(event) => setFeedbackText(event.target.value)}
                placeholder="Share your experience"
                rows={4}
              />
              <button type="submit" className="cin-luxury-button">
                Publish Feedback
                <ChevronRight size={15} />
              </button>
            </form>
          </div>
        </div>
      )}

      {reviewsModalOpen && (
        <div
          className="cin-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setReviewsModalOpen(false);
            }
          }}
        >
          <div className="cin-all-reviews-modal" role="dialog" aria-modal="true">
            <button
              type="button"
              className="cin-modal-close"
              onClick={() => setReviewsModalOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <span className="cin-section-index">ALL REVIEWS</span>
            <h2>What our guests remember.</h2>

            <div className="cin-all-review-grid">
              {reviews.map((review) => (
                <article key={review.id || review.name}>
                  <div className="cin-review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={13}
                        fill="currentColor"
                        opacity={
                          star <= Number(review.rating || 5) ? 1 : 0.25
                        }
                      />
                    ))}
                  </div>
                  <p>“{review.text}”</p>
                  <strong>{review.name}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

function ArrowRightFallback() {
  return <ChevronRight size={16} />;
}

function QuoteMark() {
  return <span className="cin-quote-mark">“</span>;
}

function SectionHeading({ title, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          ...serif,
          fontSize: 24,
          color: INK
        }}
      >
        {title}
      </div>

      {sub && (
        <div
          style={{
            fontSize: 13,
            color: "rgba(76,21,4,0.55)",
            marginTop: 4
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function categoryEmoji(category) {
  const map = {
    Momo: "🥟",
    Chicken: "🍗",
    Biryani: "🍛",
    Chinese: "🥡",
    Indian: "🍲",
    Drinks: "🥤",
    Desserts: "🍮",
    Italian: "🍕"
  };

  return map[category] || "🍽️";
}

/* =========================================================
   DISH CARD
   ========================================================= */

function DishCard({
  d,
  qty = 0,
  onAdd,
  onClick,
  compact
}) {
  const isImage =
    typeof d.img === "string" &&
    (d.img.startsWith("http") ||
      d.img.startsWith("/") ||
      d.img.startsWith("./"));

  return (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        border: "1px solid rgba(76,21,4,0.08)",
        borderRadius: 16,
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 7px 24px rgba(76,21,4,0.05)"
      }}
    >
      <div
        style={{
          height: compact ? 105 : 185,
          background: "#fff0e8",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {isImage ? (
          <img
            src={d.img}
            alt={d.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 54
            }}
          >
            {d.img || "🍽️"}
          </div>
        )}

        {d.bestseller && (
          <div
            style={{
              position: "absolute",
              top: 9,
              left: 9
            }}
          >
            <Badge tone="brass">Bestseller</Badge>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            top: 9,
            right: 9,
            width: 28,
            height: 28,
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.94)"
          }}
        >
          {d.veg ? (
            <Leaf
              size={15}
              color="#4F8A5D"
            />
          ) : (
            <Flame
              size={15}
              color="#E85D3F"
            />
          )}
        </div>
      </div>

      <div
        style={{
          padding: 14,
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            fontWeight: 750,
            fontSize: 14,
            color: INK
          }}
        >
          {d.name}
        </div>

        {!compact && (
          <div
            style={{
              fontSize: 12,
              color: "rgba(76,21,4,0.55)",
              marginTop: 5,
              lineHeight: 1.45
            }}
          >
            {d.desc}
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: 8,
            fontSize: 12,
            color: "rgba(76,21,4,0.55)"
          }}
        >
          <Star
            size={12}
            fill={BRASS}
            color={BRASS}
          />
          {d.rating}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            gap: 8
          }}
        >
          <div
            style={{
              fontWeight: 850,
              fontSize: 15,
              color: "#E95738"
            }}
          >
            {money(d.price)}
          </div>

          {onAdd && (
            qty === 0 ? (
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onAdd(1);
                }}
                style={{
                  background: BRASS,
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  width: 34,
                  height: 34,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Plus size={16} />
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: INK,
                  borderRadius: 10,
                  padding: "4px 6px"
                }}
              >
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onAdd(-1);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: BONE,
                    cursor: "pointer"
                  }}
                >
                  <Minus size={14} />
                </button>

                <span
                  style={{
                    color: BONE,
                    fontSize: 13,
                    minWidth: 14,
                    textAlign: "center",
                    fontWeight: 700
                  }}
                >
                  {qty}
                </span>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onAdd(1);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: BONE,
                    cursor: "pointer"
                  }}
                >
                  <Plus size={14} />
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE CART PAGE
   ========================================================= */

function CartPage({ products, cart, addToCart, nav, cartCount }) {
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      return product ? { ...product, qty } : null;
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const deliveryFee = subtotal >= 500 ? 0 : subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <main className="mobile-cart-page">
      <div className="mobile-cart-shell">
        <button type="button" className="mobile-cart-back" onClick={() => nav("order")}>
          <ChevronLeft size={18} />
          <span>Back to Menu</span>
        </button>

        <div className="mobile-cart-heading">
          <span className="eyebrow">YOUR ORDER</span>
          <h1 style={serif}>Cart</h1>
          <p>{cartCount} {cartCount === 1 ? "item" : "items"} selected</p>
        </div>

        {cartItems.length === 0 ? (
          <section className="mobile-cart-empty">
            <div className="mobile-cart-empty-icon"><ShoppingCart size={30} /></div>
            <span className="eyebrow">EMPTY CART</span>
            <h2 style={serif}>Your cart is waiting.</h2>
            <p>Add something delicious from the menu to get started.</p>
            <button type="button" className="mobile-cart-primary" onClick={() => nav("order")}>
              Browse Menu <ChevronRight size={17} />
            </button>
          </section>
        ) : (
          <>
            <section className="mobile-cart-items-card">
              <div className="mobile-cart-card-heading">
                <div>
                  <span className="eyebrow">SELECTED DISHES</span>
                  <h2 style={serif}>Your favourites</h2>
                </div>
                <span className="mobile-cart-item-count">{cartCount}</span>
              </div>

              <div className="mobile-cart-items">
                {cartItems.map((item) => (
                  <article className="mobile-cart-item" key={item.id}>
                    <div className="mobile-cart-item-image">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="mobile-cart-item-content">
                      <div className="mobile-cart-item-heading">
                        <div>
                          <h3>{item.name}</h3>
                          <span>{money(item.price)} each</span>
                        </div>
                        <strong>{money(item.price * item.qty)}</strong>
                      </div>
                      <div className="mobile-cart-qty-row">
                        <span>{item.qty} {item.qty === 1 ? "item" : "items"}</span>
                        <div className="mobile-cart-qty">
                          <button type="button" onClick={() => addToCart(item.id, -1)}>
                            <Minus size={14} />
                          </button>
                          <strong>{item.qty}</strong>
                          <button type="button" onClick={() => addToCart(item.id, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mobile-cart-summary-card">
              <span className="eyebrow">BILL SUMMARY</span>
              <h2 style={serif}>Almost there</h2>
              <div className="mobile-cart-summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <div className="mobile-cart-summary-row"><span>Delivery</span><strong>{deliveryFee === 0 ? "FREE" : money(deliveryFee)}</strong></div>
              <div className="mobile-cart-summary-total"><span>Total</span><strong>{money(total)}</strong></div>
              <button type="button" className="mobile-cart-primary" onClick={() => { try { sessionStorage.setItem("kaveri-open-checkout", "type"); } catch {} nav("order"); }}>
                Proceed to Checkout <ChevronRight size={17} />
              </button>
              <button type="button" className="mobile-cart-secondary" onClick={() => nav("order")}>Add More Food</button>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   ORDER PAGE
   ========================================================= */

function OrderPage({
  products,
  cart,
  addToCart,
  placeOrder,
  orders = [],
  currentUser,
  paymentSettings = seedPaymentSettings(),
  nav
}) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [section, setSection] = useState("menu");
  const [checkoutStep, setCheckoutStep] = useState("browse");
  const [orderType, setOrderType] = useState("Delivery");
  const [details, setDetails] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.mobile || "",
    address: currentUser?.address || "",
    landmark: "",
    instructions: "",
    table: ""
  });
  const [confirmedId, setConfirmedId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Pay on Delivery / Counter");
  const [upiPaymentAcknowledged, setUpiPaymentAcknowledged] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [vegOnly, setVegOnly] = useState(false);
  const [priceFilter, setPriceFilter] = useState("all");
  const [loyaltyCustomers, setLoyaltyCustomers] = useState([]);
  const [loyaltyPointsInput, setLoyaltyPointsInput] = useState("");
  const [loyaltyPointValue, setLoyaltyPointValue] = useState(1);

  useEffect(() => {
    try {
      const requestedStep = sessionStorage.getItem("kaveri-open-checkout");
      if (requestedStep) {
        setCheckoutStep(requestedStep);
        sessionStorage.removeItem("kaveri-open-checkout");
      }
    } catch {}
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "loyalty"),
      (snapshot) => {
        if (snapshot.exists()) {
          setLoyaltyPointValue(Math.max(0.01, Number(snapshot.data().pointValue ?? 1)));
        }
      },
      (error) => console.error("Firestore loyalty settings listener error:", error)
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "loyalty"),
      (snapshot) => {
        setLoyaltyCustomers(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
      },
      (error) => {
        console.error("Firestore loyalty listener error:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  const orderCategories = [
    "All",
    ...Array.from(
      new Set(
        products
          .filter((p) => p.available !== false)
          .map((p) => String(p.category || "").trim())
          .filter(Boolean)
      )
    )
  ];

  const list = products
    .filter(
      (p) =>
        p.available !== false &&
        (cat === "All" || p.category === cat) &&
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        (!vegOnly || p.veg === true || String(p.type || "").toLowerCase() === "veg") &&
        (
          priceFilter === "all" ||
          (priceFilter === "under250" && Number(p.price) < 250) ||
          (priceFilter === "250to500" && Number(p.price) >= 250 && Number(p.price) <= 500) ||
          (priceFilter === "over500" && Number(p.price) > 500)
        )
    )
    .sort((a, b) => {
      if (sortBy === "priceLow") return Number(a.price) - Number(b.price);
      if (sortBy === "priceHigh") return Number(b.price) - Number(a.price);
      if (sortBy === "name") return String(a.name).localeCompare(String(b.name));
      if (sortBy === "rating") return Number(b.rating || 0) - Number(a.rating || 0);
      return 0;
    });

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      return product ? { ...product, qty } : null;
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const deliveryFee =
    orderType === "Delivery" && subtotal > 0
      ? subtotal >= 500 ? 0 : 40
      : 0;

  const loyaltyPhone = String(details.phone || currentUser?.mobile || "").replace(/\D/g, "");
  const loyaltyCustomer = loyaltyCustomers.find(
    (customer) => String(customer.phone || "").replace(/\D/g, "") === loyaltyPhone
  );
  const availableLoyaltyPoints = Math.max(0, Number(loyaltyCustomer?.availablePoints ?? loyaltyCustomer?.points ?? 0));
  const maxRedeemablePoints = Math.min(availableLoyaltyPoints, Math.floor(Math.max(0, subtotal) / loyaltyPointValue));
  const requestedLoyaltyPoints = Math.max(0, Math.floor(Number(loyaltyPointsInput) || 0));
  const loyaltyPointsUsed = Math.min(requestedLoyaltyPoints, maxRedeemablePoints);
  const loyaltyDiscount = loyaltyPointsUsed * loyaltyPointValue;
  const total = Math.max(0, subtotal + deliveryFee - loyaltyDiscount);

  const sortedOrders = orders.filter((order) =>
    currentUser?.mobile
      ? String(order.phone || "").replace(/\D/g, "") ===
        String(currentUser.mobile).replace(/\D/g, "")
      : true
  );

  const activeOrders = sortedOrders.filter(
    (order) => !["Delivered", "Cancelled"].includes(order.status)
  );

  const selectedOrder =
    sortedOrders.find((order) => order.id === selectedOrderId) ||
    activeOrders[0] ||
    sortedOrders[0] ||
    null;

  const statusFlow = [
    "New",
    "Accepted",
    "Preparing",
    "Ready",
    "Out for Delivery",
    "Delivered"
  ];

  const statusIndex = (status) =>
    statusFlow.indexOf(status);

  const submitOrder = async (forceUpiPaid = false) => {
    if (!cartItems.length) return;
    const upiPaid = paymentMethod === "UPI" && (upiPaymentAcknowledged || forceUpiPaid);
    if (paymentMethod === "UPI" && !upiPaid) {
      alert("Please complete the UPI payment and tap 'I have completed the UPI payment' before placing the order.");
      return;
    }

    const id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const savedId = await placeOrder({
        id,
        type: orderType,
        customer:
          orderType === "Dine-in"
            ? `Table ${details.table || "-"}`
            : details.name || "Guest",
        phone: details.phone,
        address: details.address,
        landmark: details.landmark,
        instructions: details.instructions,
        table: details.table,
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          qty: item.qty,
          price: item.price,
          points: Number(item.points || item.loyaltyPoints || 0),
          img: item.img
        })),
        subtotal,
        deliveryFee,
        loyaltyPointsUsed,
        loyaltyDiscount,
        total,
        paymentMethod,
        paymentStatus: upiPaid ? "Paid" : "Pending",
        paymentConfirmed: upiPaid,
        paymentConfirmedAt: upiPaid ? new Date().toISOString() : null,
        status: "New",
        time: "just now"
      });

      setConfirmedId(savedId);
      setSelectedOrderId(savedId);
      setLoyaltyPointsInput("");
      setCheckoutStep("confirmed");
      setSection("orders");
    } catch (error) {
      console.error("Order save failed:", error);
      alert(error?.message || "Unable to place order. Please try again.");
    }
  };

  const openOrders = () => {
    setSection("orders");
    setCheckoutStep("browse");
    setSelectedOrderId(activeOrders[0]?.id || sortedOrders[0]?.id || null);
  };

  const cancelOrder = async (order) => {
    if (!order?.id) return;
    if (order.status !== "New") {
      alert("This order can only be cancelled while it is New.");
      return;
    }
    const confirmed = window.confirm(`Cancel order ${order.id}?`);
    if (!confirmed) return;
    try {
      await updateDoc(doc(db, "orders", order.id), {
        status: "Cancelled",
        cancelledBy: "customer",
        cancelledAt: new Date().toISOString(),
        updatedAt: serverTimestamp(),
        customerPhone: String(order.phone || "").replace(/\D/g, "")
      });
      setSelectedOrderId(order.id);
    } catch (error) {
      console.error("Order cancellation failed:", error);
      alert(error?.message || "Unable to cancel this order.");
    }
  };

  if (checkoutStep === "confirmed") {
    return (
      <div className="order-page">
        <div className="order-content">
          <div
            style={{
              minHeight: "72vh",
              display: "grid",
              placeItems: "center",
              padding: "55px 20px"
            }}
          >
            <div
              style={{
                width: "min(620px,100%)",
                padding: 35,
                background: "#fff",
                borderRadius: 24,
                textAlign: "center",
                border: "1px solid rgba(76,21,4,0.08)",
                boxShadow: "0 18px 55px rgba(76,21,4,0.08)"
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  margin: "0 auto 16px",
                  borderRadius: "50%",
                  background: "#e8f2e5",
                  color: "#4f8a5d",
                  display: "grid",
                  placeItems: "center"
                }}
              >
                <Check size={31} />
              </div>

              <h2
                style={{
                  ...serif,
                  margin: 0,
                  color: INK,
                  fontSize: 36
                }}
              >
                Order Confirmed
              </h2>

              <p style={{ color: "#806b63", fontSize: 13 }}>
                Order <strong>{confirmedId}</strong> has been placed successfully.
              </p>
              {paymentMethod === "UPI" && (
                <div className="payment-confirmation-success">
                  <span>✓</span>
                  <div><strong>UPI payment confirmed</strong><small>Your order is now confirmed and sent to the restaurant.</small></div>
                </div>
              )}

              <p style={{ color: "#806b63", fontSize: 13, marginBottom: 22 }}>
                Total: <strong>{money(total)}</strong> · {orderType}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10
                }}
              >
                <button
                  className="btn-primary"
                  onClick={() => {
                    setCheckoutStep("browse");
                    setSection("orders");
                  }}
                >
                  Track My Order
                </button>

                <button
                  onClick={() => {
                    setCheckoutStep("browse");
                    setSection("menu");
                  }}
                  style={{
                    minHeight: 46,
                    border: "1px solid rgba(76,21,4,0.12)",
                    borderRadius: 999,
                    background: "#fff",
                    color: INK,
                    fontWeight: 800,
                    cursor: "pointer"
                  }}
                >
                  Order More Food
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-content">
        <div
          className="order-page-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 20
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: BRASS,
                background: "rgba(255,107,74,0.08)",
                borderRadius: 999,
                padding: "7px 11px",
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                marginBottom: 10
              }}
            >
              <ClipboardList size={13} /> Restaurant Orders
            </div>

            <h1>{section === "orders" ? "My Orders" : "Order Food"}</h1>

            <p>
              {section === "orders"
                ? "Track your current orders and view your order history."
                : "Choose your favourites and order fresh from our kitchen."}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexShrink: 0
            }}
          >
            <button
              type="button"
              onClick={() => {
                setSection("menu");
                setCheckoutStep("browse");
              }}
              className={`order-section-button ${section === "menu" ? "active" : ""}`}
            >
              Order Food
            </button>

            {section !== "orders" && (
              <button
                type="button"
                onClick={openOrders}
                className="order-section-button"
              >
                <ClipboardList size={14} />
                My Orders
                {activeOrders.length > 0 && (
                  <span className="order-count-badge">
                    {activeOrders.length}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {section === "orders" ? (
          <div className="my-orders-layout">
            <div className="my-orders-list">
              <div className="my-orders-list-header">
                <h2>Your Orders</h2>
                <span>{sortedOrders.length}</span>
              </div>

              {sortedOrders.length === 0 ? (
                <div className="orders-empty">
                  <ClipboardList size={30} />
                  <h3>No orders yet</h3>
                  <p>Your orders will appear here after checkout.</p>
                  <button
                    className="btn-primary"
                    onClick={() => setSection("menu")}
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                sortedOrders.map((order) => (
                  <button
                    type="button"
                    key={order.id}
                    className={`order-history-card ${
                      selectedOrder?.id === order.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedOrderId(order.id)}
                  >
                    <div className="order-history-top">
                      <strong>{order.id}</strong>
                      <Badge
                        tone={
                          order.status === "Delivered"
                            ? "green"
                            : order.status === "Cancelled"
                              ? "red"
                              : "brass"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>

                    <div className="order-history-items">
                      {(order.items || []).slice(0, 2).map((item, index) => (
                        <span key={index}>
                          {item.qty}× {item.name}
                          {index < Math.min(order.items?.length || 0, 2) - 1 ? ", " : ""}
                        </span>
                      ))}
                      {(order.items?.length || 0) > 2 && (
                        <span> +{order.items.length - 2} more</span>
                      )}
                    </div>

                    <div className="order-history-bottom">
                      <span>{order.type}</span>
                      <span className="order-history-actions">
                        <strong>{money(order.total)}</strong>
                        {order.status === "New" && (
                          <button
                            type="button"
                            className="order-history-cancel"
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              cancelOrder(order);
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {selectedOrder && (
              <div className="order-tracking-card">
                <div className="order-detail-header">
                  <div>
                    <span>ORDER DETAILS</span>
                    <h2>{selectedOrder.id}</h2>
                    <p>
                      {selectedOrder.time} · {selectedOrder.type}
                    </p>
                  </div>

                  <div className="order-detail-actions">
                    <Badge
                      tone={
                        selectedOrder.status === "Delivered"
                          ? "green"
                          : selectedOrder.status === "Cancelled"
                            ? "red"
                            : "brass"
                      }
                    >
                      {selectedOrder.status}
                    </Badge>
                    {selectedOrder.status === "New" && (
                      <button
                        type="button"
                        className="order-cancel-button"
                        onClick={() => cancelOrder(selectedOrder)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>

                {selectedOrder.status === "Cancelled" ? (
                  <div className="cancelled-order-message">
                    <X size={19} />
                    This order was cancelled.
                  </div>
                ) : (
                  <div className="order-status-box">
                    <div className="order-status-title">Order Status</div>

                    <div className="status-track">
                      <div className="status-track-line" />

                      {statusFlow.map((status, index) => {
                        const current = statusIndex(selectedOrder.status);
                        const done = index <= current;

                        return (
                          <div className="status-step" key={status}>
                            <div className={`status-dot ${done ? "done" : ""}`}>
                              {done ? <Check size={14} /> : null}
                            </div>
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="current-status-row">
                      <span>Current Status</span>
                      <strong>{selectedOrder.status}</strong>
                    </div>
                  </div>
                )}

                <div className="ordered-items-title">
                  Items Ordered
                </div>

                <div className="ordered-items-list">
                  {(selectedOrder.items || []).map((item, index) => (
                    <div className="ordered-item" key={index}>
                      <div>
                        <strong>
                          {item.qty} × {item.name}
                        </strong>
                        {item.price && (
                          <span>{money(item.price)} each</span>
                        )}
                      </div>

                      {item.price && (
                        <strong>
                          {money(item.price * item.qty)}
                        </strong>
                      )}
                    </div>
                  ))}
                </div>

                <div className="order-info-grid">
                  <div>
                    <span>Customer</span>
                    <strong>{selectedOrder.customer}</strong>
                  </div>
                  <div>
                    <span>Total</span>
                    <strong>{money(selectedOrder.total)}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : checkoutStep === "browse" ? (
          <div className="order-layout">
            <div>
              <div className="menu-search-row">
                <div className="menu-search-box">
                  <Search size={17} color="#9a8780" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search dishes..."
                  />
                  {query && (
                    <button
                      type="button"
                      className="menu-search-clear"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className={`menu-filter-button${filterOpen ? " active" : ""}`}
                  onClick={() => setFilterOpen((open) => !open)}
                >
                  <SlidersHorizontal size={16} />
                  Filter
                  {(sortBy !== "default" || vegOnly || priceFilter !== "all") && (
                    <span className="menu-filter-count">•</span>
                  )}
                </button>
              </div>

              {filterOpen && (
                <div className="menu-filter-panel">
                  <div className="menu-filter-field">
                    <label>Sort by</label>
                    <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                      <option value="default">Recommended</option>
                      <option value="rating">Top rated</option>
                      <option value="priceLow">Price: Low to High</option>
                      <option value="priceHigh">Price: High to Low</option>
                      <option value="name">Name: A–Z</option>
                    </select>
                  </div>

                  <div className="menu-filter-field">
                    <label>Price</label>
                    <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)}>
                      <option value="all">Any price</option>
                      <option value="under250">Under ₹250</option>
                      <option value="250to500">₹250–₹500</option>
                      <option value="over500">Above ₹500</option>
                    </select>
                  </div>

                  <label className="menu-filter-check">
                    <input
                      type="checkbox"
                      checked={vegOnly}
                      onChange={(event) => setVegOnly(event.target.checked)}
                    />
                    <span>Vegetarian only</span>
                  </label>

                  <button
                    type="button"
                    className="menu-filter-reset"
                    onClick={() => {
                      setSortBy("default");
                      setPriceFilter("all");
                      setVegOnly(false);
                    }}
                  >
                    Reset
                  </button>
                </div>
              )}

              <div className="order-category-row">
                {orderCategories.map((category) => (
                  <button
                    key={category}
                    className={`category-pill ${cat === category ? "active" : ""}`}
                    onClick={() => setCat(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="bestseller-grid">
                {list.map((dish) => (
                  <DishCard
                    key={dish.id}
                    d={dish}
                    qty={cart[dish.id] || 0}
                    onAdd={(delta) => addToCart(dish.id, delta)}
                  />
                ))}
              </div>

              {list.length === 0 && (
                <div className="empty-state">
                  No dishes match your search.
                </div>
              )}
            </div>

            <div className="cart-card">
              <div className="cart-header-row">
                <h3>Your Cart</h3>
                {cartItems.length > 0 && (
                  <button onClick={openOrders}>
                    My Orders
                  </button>
                )}
              </div>

              {cartItems.length === 0 && (
                <div className="cart-empty-message">
                  Add dishes to get started.
                </div>
              )}

              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img src={item.img} alt={item.name} />
                  </div>

                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>{money(item.price * item.qty)}</p>
                  </div>

                  <div className="qty-controls">
                    <button onClick={() => addToCart(item.id, -1)}>
                      <Minus size={13} />
                    </button>
                    <strong>{item.qty}</strong>
                    <button onClick={() => addToCart(item.id, 1)}>
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              ))}

              {cartItems.length > 0 && (
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <strong>{money(subtotal)}</strong>
                  </div>

                  <div className="summary-row">
                    <span>Delivery</span>
                    <strong>
                      {deliveryFee === 0 ? "FREE" : money(deliveryFee)}
                    </strong>
                  </div>

                  <div className="summary-row total">
                    <span>Total</span>
                    <strong>{money(total)}</strong>
                  </div>

                  <button
                    className="btn-primary"
                    style={{ width: "100%", marginTop: 15 }}
                    onClick={() => setCheckoutStep("type")}
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : checkoutStep === "type" ? (
          <CheckoutBox
            title="Choose order type"
            onBack={() => setCheckoutStep("browse")}
          >
            {["Delivery", "Takeaway", "Dine-in"].map((type) => (
              <button
                type="button"
                key={type}
                className={`checkout-option ${orderType === type ? "active" : ""}`}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setOrderType(type);
                }}
              >
                {type}
              </button>
            ))}

            <button
              className="btn-primary"
              style={{ width: "100%", marginTop: 10 }}
              onClick={() => setCheckoutStep("details")}
            >
              Continue
            </button>
          </CheckoutBox>
        ) : checkoutStep === "details" ? (
          <CheckoutBox
            title="Your details"
            onBack={() => setCheckoutStep("type")}
          >
            {orderType === "Dine-in" ? (
              <Field
                label="Table number"
                value={details.table}
                onChange={(value) =>
                  setDetails({ ...details, table: value })
                }
              />
            ) : (
              <>
                <Field
                  label="Name"
                  value={details.name}
                  onChange={(value) =>
                    setDetails({ ...details, name: value })
                  }
                />
                <Field
                  label="Phone"
                  value={details.phone}
                  onChange={(value) =>
                    setDetails({ ...details, phone: value })
                  }
                />
                {orderType === "Delivery" && (
                  <>
                    <Field
                      label="Address"
                      value={details.address}
                      onChange={(value) =>
                        setDetails({ ...details, address: value })
                      }
                    />
                    <Field
                      label="Landmark"
                      value={details.landmark}
                      onChange={(value) =>
                        setDetails({ ...details, landmark: value })
                      }
                    />
                    <Field
                      label="Delivery instructions"
                      value={details.instructions}
                      onChange={(value) =>
                        setDetails({ ...details, instructions: value })
                      }
                    />
                  </>
                )}
              </>
            )}

            <button
              className="btn-primary"
              style={{ width: "100%", marginTop: 10 }}
              onClick={() => setCheckoutStep("payment")}
            >
              Continue to Payment
            </button>
          </CheckoutBox>
        ) : (
          <CheckoutBox
            title="Payment"
            onBack={() => setCheckoutStep("details")}
          >
            <div className="payment-hero-card">
              <div className="payment-hero-icon">₹</div>
              <div>
                <span>AMOUNT PAYABLE</span>
                <strong>{money(total)}</strong>
                <small>Secure checkout · No hidden charges</small>
              </div>
            </div>

            <div className="payment-section-label">Choose payment method</div>

            <div className="payment-methods">
              {[
                {
                  id: "Pay on Delivery / Counter",
                  title: "Pay at Delivery / Counter",
                  subtitle: "Cash or UPI when you receive your order",
                  icon: "💵",
                  badge: "Recommended"
                },
                {
                  id: "UPI",
                  title: "UPI",
                  subtitle: `Google Pay, PhonePe, Paytm and more · ${paymentSettings.upiId || ""}`,
                  icon: "◉"
                },
                {
                  id: "Card",
                  title: "Credit / Debit Card",
                  subtitle: "Visa, Mastercard and other cards",
                  icon: "▣"
                }
              ].filter((method) => (method.id === "UPI" ? paymentSettings.upiEnabled : method.id === "Card" ? paymentSettings.cardEnabled : paymentSettings.cashEnabled)).map((method) => (
                <button
                  type="button"
                  className={`payment-method-card ${paymentMethod === method.id ? "active" : ""}`}
                  key={method.id}
                  onClick={() => {
                    setPaymentMethod(method.id);
                    setUpiPaymentAcknowledged(false);
                  }}
                >
                  <span className="payment-method-icon">{method.icon}</span>

                  <span className="payment-method-copy">
                    <strong>{method.title}</strong>
                    <small>{method.subtitle}</small>
                  </span>

                  {method.badge && (
                    <span className="payment-method-badge">{method.badge}</span>
                  )}

                  <span className="payment-radio">
                    {paymentMethod === method.id ? <Check size={13} /> : null}
                  </span>
                </button>
              ))}
            </div>

            {paymentMethod === "UPI" && (
              <div className="admin-upi-checkout-card">
                <div className="admin-upi-checkout-head">
                  <div>
                    <strong>Scan to Pay</strong>
                    <span>{paymentSettings.merchantName || "Restaurant"}</span>
                  </div>
                  <span className="admin-upi-id">{paymentSettings.upiId}</span>
                </div>
                {paymentSettings.qrImage ? (
                  <img src={paymentSettings.qrImage} alt="UPI payment QR" className="admin-upi-checkout-qr" />
                ) : (
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(`upi://pay?pa=${paymentSettings.upiId || ""}&pn=${paymentSettings.merchantName || "Restaurant"}&am=${Number(total || 0).toFixed(2)}&cu=INR`)}`}
                    alt="Generated UPI payment QR"
                    className="admin-upi-checkout-qr generated-upi-qr"
                  />
                )}
                <a
                  className="upi-open-app-button"
                  href={`upi://pay?pa=${encodeURIComponent(paymentSettings.upiId || "")}&pn=${encodeURIComponent(paymentSettings.merchantName || "Restaurant")}&am=${Number(total || 0).toFixed(2)}&cu=INR`}
                >
                  Open UPI App · {money(total)}
                </a>
                <p>Scan the QR or open your UPI app, complete the payment, then tap the confirmation button below. </p>
                <button
                  type="button"
                  className={`upi-payment-done-button ${upiPaymentAcknowledged ? "confirmed" : ""}`}
                  onClick={async () => {
                    setUpiPaymentAcknowledged(true);
                    await submitOrder(true);
                  }}
                >
                  {upiPaymentAcknowledged ? "✓ Payment confirmed · Order processing" : "I have completed the UPI payment"}
                </button>
                <small className="upi-verification-note">This is a customer confirmation step; live bank/payment-gateway verification requires a payment gateway integration.</small>
              </div>
            )}

            <div
              style={{
                marginTop: 16,
                padding: 16,
                border: "1px solid rgba(76,21,4,0.12)",
                borderRadius: 14,
                background: "#fffaf7"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                <div>
                  <strong style={{ display: "block", color: "#4c1504" }}>Loyalty Rewards</strong>
                  <small style={{ color: "#8a7770" }}>Available: {availableLoyaltyPoints} points · 1 point = ₹{loyaltyPointValue}</small>
                </div>
                {availableLoyaltyPoints > 0 && <span style={{ color: "#4c1504", fontWeight: 750 }}>{availableLoyaltyPoints} pts</span>}
              </div>

              {availableLoyaltyPoints > 0 ? (
                <>
                  <label style={{ display: "block", marginTop: 12, fontSize: 12, fontWeight: 750, color: "#4c1504" }}>
                    Points to use
                    <input
                      type="number"
                      min="0"
                      max={maxRedeemablePoints}
                      step="1"
                      value={loyaltyPointsInput}
                      onChange={(event) => setLoyaltyPointsInput(event.target.value)}
                      placeholder={`Max ${maxRedeemablePoints}`}
                      style={{ display: "block", width: "100%", boxSizing: "border-box", marginTop: 6, padding: "10px 12px", border: "1px solid rgba(76,21,4,0.14)", borderRadius: 9, background: "#fff", color: "#4c1504" }}
                    />
                  </label>
                  {loyaltyPointsUsed > 0 && (
                    <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", color: "#4c1504" }}>
                      <span>Loyalty discount</span><strong>-{money(loyaltyDiscount)}</strong>
                    </div>
                  )}
                  {maxRedeemablePoints === 0 && <small style={{ display: "block", marginTop: 7, color: "#8a7770" }}>No points can be used on this order.</small>}
                </>
              ) : (
                <small style={{ display: "block", marginTop: 8, color: "#8a7770" }}>Enter the same phone number used for your loyalty account to use points.</small>
              )}
            </div>

            <div className="payment-security-note">
              <Lock size={14} />
              <span>Your payment details are handled securely.</span>
            </div>

            <button
              className="payment-place-order-btn"
              onClick={submitOrder}
            >
              <span>Place Order</span>
              <strong>{money(total)}</strong>
              <ChevronRight size={17} />
            </button>
          </CheckoutBox>
        )}
      </div>
      {Object.values(cart).some((qty) => Number(qty) > 0) && (
        <button
          type="button"
          className="mobile-floating-cart-button"
          onClick={() => nav("cart")}
          aria-label="Open cart"
        >
          <span><ShoppingCart size={17} /> View Cart</span>
          <strong>{cartItems.reduce((sum, item) => sum + Number(item.qty || 0), 0)} items</strong>
          <ChevronRight size={17} />
        </button>
      )}
    </div>
  );
}


function Field({ label, value, onChange, placeholder = "" }) {
  return (
    <label
      style={{
        display: "block",
        color: INK,
        fontSize: 12,
        fontWeight: 750,
        marginBottom: 12
      }}
    >
      {label}
      <input
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        style={{
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          marginTop: 6,
          minHeight: 44,
          border: `1px solid ${LINE}`,
          borderRadius: 10,
          background: "#fffaf7",
          color: INK,
          padding: "10px 12px",
          outline: "none"
        }}
      />
    </label>
  );
}

function CheckoutBox({ title, onBack, children }) {
  return (
    <div className="checkout-box">
      <button type="button" className="checkout-back" onClick={onBack}>
        <ChevronLeft size={14} /> Back
      </button>
      <h2>{title}</h2>
      {children}
    </div>
  );
}


/* =========================================================
   DIGITAL MENU
   ========================================================= */

function DigitalMenu({
  products,
  hotel,
  nav
}) {
  const [query, setQuery] =
    useState("");

  const grouped = CATEGORIES
    .filter((category) =>
      category !== "All"
    )
    .map((category) => ({
      cat: category,
      items: products.filter(
        (product) =>
          product.category ===
            category &&
          product.available &&
          product.name
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )
      )
    }))
    .filter(
      (group) =>
        group.items.length
    );

  return (
    <div
      className="digital-menu-page"
      style={{
        minHeight: "100vh"
      }}
    >
      <div className="reference-container">

        <div className="digital-menu-header">
          <h1>
            Digital Menu
          </h1>

          <p>
            Browse {hotel.name}'s menu,
            discover your favourites and
            order directly from the table.
          </p>

          <button
            className="btn-primary"
            onClick={() =>
              nav("order")
            }
          >
            Order Food
            <ChevronRight
              size={16}
            />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#fff",
            border:
              "1px solid rgba(76,21,4,0.1)",
            borderRadius: 14,
            padding: "13px 15px",
            marginBottom: 28
          }}
        >
          <Search size={17} />

          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search the menu..."
            style={{
              flex: 1,
              border: 0,
              outline: 0,
              background: "transparent",
              color: INK
            }}
          />
        </div>

        {grouped.map((group) => (
          <div
            key={group.cat}
            style={{
              marginBottom: 38
            }}
          >
            <h2
              style={{
                ...serif,
                color: INK,
                marginBottom: 15,
                fontSize: 29
              }}
            >
              {group.cat}
            </h2>

            <div
              className="digital-menu-grid"
              style={{
                gridTemplateColumns:
                  "repeat(3,minmax(0,1fr))"
              }}
            >
              {group.items.map(
                (dish) => (
                  <DishCard
                    key={dish.id}
                    d={dish}
                    compact
                    onClick={() =>
                      nav("order")
                    }
                  />
                )
              )}
            </div>
          </div>
        ))}

        <div
          style={{
            marginTop: 15,
            padding: 30,
            borderRadius: 24,
            background:
              "linear-gradient(135deg,#4c1504,#6a2a1a)",
            color: "#fff"
          }}
        >
          <Sparkles
            size={22}
            color={BRASS_SOFT}
          />

          <h2
            style={{
              ...serif,
              color: "#fff",
              margin:
                "10px 0 8px"
            }}
          >
            AR Menu
          </h2>

          <p
            style={{
              marginBottom: 15,
              color:
                "rgba(255,255,255,0.72)"
            }}
          >
            See selected dishes in an
            augmented-reality experience
            before ordering.
          </p>

          <Badge tone="brass">
            Coming Soon
          </Badge>
        </div>

      </div>
    </div>
  );
}

/* =========================================================
   CUSTOMER LOGIN / SIGN UP
   ========================================================= */

function UserLogin({
  hotel,
  onAuthenticated,
  nav
}) {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState({
    name: "",
    address: "",
    mobile: ""
  });
  const [showDemoOtp, setShowDemoOtp] = useState(false);

  const normalizeMobile = (value) =>
    value.replace(/\D/g, "").slice(-10);

  const getAccounts = () => {
    try {
      const saved = localStorage.getItem("kaveri-users");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const saveAccounts = (accounts) => {
    try {
      localStorage.setItem(
        "kaveri-users",
        JSON.stringify(accounts)
      );
    } catch {
      // Local storage may be blocked; login still works in memory.
    }
  };

  const issueOtp = (number, nextStep) => {
    const clean = normalizeMobile(number);

    if (clean.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return false;
    }

    const code = String(
      Math.floor(1000 + Math.random() * 9000)
    );

    setMobile(clean);
    setGeneratedOtp(code);
    setOtp("");
    setStep(nextStep);
    setShowDemoOtp(true);
    setMessage(`Demo OTP: ${code}`);
    return true;
  };

  const verifyOtp = () => {
    if (otp.length !== 4) {
      setMessage("Enter the complete 4-digit OTP.");
      return;
    }

    if (otp !== generatedOtp) {
      setMessage("Incorrect OTP. Please try again.");
      return;
    }

    const clean = normalizeMobile(mobile);
    const accounts = getAccounts();

    if (mode === "signup") {
      const exists = accounts.some(
        (user) => normalizeMobile(user.mobile) === clean
      );

      if (exists) {
        setMode("login");
        setStep("mobile");
        setOtp("");
        setGeneratedOtp("");
        setShowDemoOtp(false);
        setMessage(
          "This number is already registered. Please login instead."
        );
        return;
      }

      const user = {
        id: `user-${Date.now()}`,
        name: account.name.trim(),
        address: account.address.trim(),
        mobile: clean
      };

      saveAccounts([...accounts, user]);

      setMode("login");
      setStep("mobile");
      setMobile(clean);
      setOtp("");
      setGeneratedOtp("");
      setShowDemoOtp(false);
      setMessage(
        "Account created successfully. Login with your mobile number to continue."
      );
      return;
    }

    const user = accounts.find(
      (item) => normalizeMobile(item.mobile) === clean
    );

    if (!user) {
      setMessage(
        "No account found. Please create an account first."
      );
      setStep("mobile");
      return;
    }

    setShowDemoOtp(false);
    setMessage("");
    onAuthenticated(user);
  };

  const submitLogin = (event) => {
    event.preventDefault();

    const clean = normalizeMobile(mobile);

    if (clean.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    const exists = getAccounts().some(
      (item) => normalizeMobile(item.mobile) === clean
    );

    if (!exists) {
      setMessage(
        "No account found with this mobile number. Create an account first."
      );
      return;
    }

    issueOtp(clean, "loginOtp");
  };

  const submitSignup = (event) => {
    event.preventDefault();

    const clean = normalizeMobile(account.mobile);

    if (!account.name.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!account.address.trim()) {
      setMessage("Please enter your address.");
      return;
    }

    if (clean.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setAccount((current) => ({
      ...current,
      mobile: clean
    }));

    issueOtp(clean, "signupOtp");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setStep(nextMode === "login" ? "mobile" : "form");
    setOtp("");
    setGeneratedOtp("");
    setShowDemoOtp(false);
    setMessage("");

    if (nextMode === "login") {
      setMobile(account.mobile || "");
    }
  };

  const updateOtp = (value) => {
    const clean = value.replace(/\D/g, "").slice(0, 4);
    setOtp(clean);

    if (message && !message.startsWith("Demo OTP")) {
      setMessage("");
    }
  };

  return (
    <main className="customer-auth-page">
      <div className="customer-auth-background" />

      <div className="customer-auth-shell">
        <section className="customer-auth-visual">
          <img
            src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=90"
            alt="Fresh restaurant food"
            className="customer-auth-photo"
          />

          <div className="customer-auth-photo-overlay" />

          <div className="customer-auth-visual-content">
            <div className="customer-auth-logo-mini">
              {hotel.logo ? (
                <img
                  src={hotel.logo}
                  alt={`${hotel.name} logo`}
                  style={{
                    width: 34,
                    height: 34,
                    objectFit: "contain",
                    borderRadius: 9,
                    background: "#fff4ee",
                    padding: 4
                  }}
                />
              ) : (
                <span>K</span>
              )}
              <strong>{hotel.name}</strong>
            </div>

            <div className="customer-auth-pill">
              <Star size={13} fill="currentColor" />
              PREMIUM DINING EXPERIENCE
            </div>

            <h1 style={serif}>
              Good food.
              <br />
              Great moments.
            </h1>

            <p>
              Order your favourites, save your address and
              track every order — all from one account.
            </p>

            <div className="customer-auth-benefits">
              <div>
                <span className="benefit-icon">
                  <Check size={14} />
                </span>
                <span>Fast 4-digit OTP login</span>
              </div>

              <div>
                <span className="benefit-icon">
                  <Check size={14} />
                </span>
                <span>Saved customer details</span>
              </div>

              <div>
                <span className="benefit-icon">
                  <Check size={14} />
                </span>
                <span>Easy order tracking</span>
              </div>
            </div>
          </div>
        </section>

        <section className="customer-auth-panel">
          <button
            type="button"
            className="customer-auth-back"
            onClick={() => nav("landing")}
          >
            <ChevronLeft size={16} />
            Back to restaurant
          </button>

          <div className="customer-auth-panel-head">
            <div className="customer-auth-mark">K</div>
            <div>
              <span className="customer-auth-panel-brand">
                {hotel.name}
              </span>
              <span className="customer-auth-panel-subtitle">
                CUSTOMER ACCOUNT
              </span>
            </div>
          </div>

          <div className="customer-auth-tabs">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => switchMode("login")}
            >
              Login
            </button>

            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => switchMode("signup")}
            >
              Create Account
            </button>
          </div>

          <div className="customer-auth-heading">
            <span className="eyebrow">
              {mode === "login"
                ? "WELCOME BACK"
                : "NEW CUSTOMER"}
            </span>

            <h2 style={serif}>
              {mode === "login"
                ? "Login to order"
                : "Create your account"}
            </h2>

            <p>
              {mode === "login"
                ? "Use your mobile number and a 4-digit OTP. No password required."
                : "Enter your details once, verify your mobile and start ordering."}
            </p>
          </div>

          {mode === "login" && step === "mobile" && (
            <form
              className="customer-auth-form"
              onSubmit={submitLogin}
            >
              <label>
                Mobile Number
                <div className="customer-phone-field">
                  <span>+91</span>
                  <input
                    value={mobile}
                    onChange={(event) =>
                      setMobile(
                        event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10)
                      )
                    }
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    placeholder="98765 43210"
                    required
                  />
                </div>
              </label>

              <button
                className="customer-auth-primary"
                type="submit"
              >
                Send 4-Digit OTP
                <ChevronRight size={17} />
              </button>
            </form>
          )}

          {mode === "login" && step === "loginOtp" && (
            <div className="customer-auth-form">
              <div className="customer-otp-banner">
                <div className="customer-otp-banner-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Verify +91 {mobile}
                  </strong>
                  <span>
                    Enter the 4-digit code sent to your mobile.
                  </span>
                </div>
              </div>

              {showDemoOtp && (
                <button
                  type="button"
                  className="customer-demo-otp"
                  onClick={() => setOtp(generatedOtp)}
                >
                  Demo OTP: <strong>{generatedOtp}</strong>
                  <span>Tap to fill</span>
                </button>
              )}

              <label>
                4-Digit OTP
                <input
                  className="customer-otp-input"
                  value={otp}
                  onChange={(event) =>
                    updateOtp(event.target.value)
                  }
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="••••"
                  autoFocus
                />
              </label>

              <button
                className="customer-auth-primary"
                type="button"
                onClick={verifyOtp}
              >
                Verify & Continue
                <Check size={17} />
              </button>

              <button
                type="button"
                className="customer-auth-text-button"
                onClick={() => {
                  setStep("mobile");
                  setOtp("");
                  setGeneratedOtp("");
                  setShowDemoOtp(false);
                  setMessage("");
                }}
              >
                Change mobile number
              </button>
            </div>
          )}

          {mode === "signup" && step === "form" && (
            <form
              className="customer-auth-form"
              onSubmit={submitSignup}
            >
              <label>
                Full Name
                <input
                  value={account.name}
                  onChange={(event) =>
                    setAccount({
                      ...account,
                      name: event.target.value
                    })
                  }
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                />
              </label>

              <label>
                Address
                <textarea
                  value={account.address}
                  onChange={(event) =>
                    setAccount({
                      ...account,
                      address: event.target.value
                    })
                  }
                  placeholder="House, road, area, city"
                  rows={3}
                  required
                />
              </label>

              <label>
                Mobile Number
                <div className="customer-phone-field">
                  <span>+91</span>
                  <input
                    value={account.mobile}
                    onChange={(event) =>
                      setAccount({
                        ...account,
                        mobile: event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10)
                      })
                    }
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    placeholder="98765 43210"
                    required
                  />
                </div>
              </label>

              <button
                className="customer-auth-primary"
                type="submit"
              >
                Verify Mobile
                <ChevronRight size={17} />
              </button>
            </form>
          )}

          {mode === "signup" && step === "signupOtp" && (
            <div className="customer-auth-form">
              <div className="customer-otp-banner">
                <div className="customer-otp-banner-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Verify +91 {mobile}
                  </strong>
                  <span>
                    One last step — verify your 4-digit OTP.
                  </span>
                </div>
              </div>

              {showDemoOtp && (
                <button
                  type="button"
                  className="customer-demo-otp"
                  onClick={() => setOtp(generatedOtp)}
                >
                  Demo OTP: <strong>{generatedOtp}</strong>
                  <span>Tap to fill</span>
                </button>
              )}

              <label>
                4-Digit OTP
                <input
                  className="customer-otp-input"
                  value={otp}
                  onChange={(event) =>
                    updateOtp(event.target.value)
                  }
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="••••"
                  autoFocus
                />
              </label>

              <button
                className="customer-auth-primary"
                type="button"
                onClick={verifyOtp}
              >
                Create Account
                <Check size={17} />
              </button>

              <button
                type="button"
                className="customer-auth-text-button"
                onClick={() => {
                  setStep("form");
                  setOtp("");
                  setGeneratedOtp("");
                  setShowDemoOtp(false);
                  setMessage("");
                }}
              >
                Edit details
              </button>
            </div>
          )}

          {message && (
            <div className="customer-auth-message">
              {message}
            </div>
          )}

          <div className="customer-auth-footer-note">
            <Lock size={13} />
            Login is required before you can place an order.
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   ADMIN LOGIN
   ========================================================= */

function AdminLogin({
  onLogin,
  nav
}) {
  const [form, setForm] =
    useState({
      user: "",
      pass: ""
    });

  const submit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div
      className="admin-login-page"
    >
      <form
        className="admin-login-card"
        onSubmit={submit}
      >
        <div
          style={{
            color: BRASS,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.3,
            marginBottom: 7
          }}
        >
          HOTEL MANAGEMENT
        </div>

        <h1>
          Staff Login
        </h1>

        <p>
          Sign in to manage the
          restaurant.
        </p>

        <div className="form-group">
          <label>
            Email / Username
          </label>

          <input
            value={form.user}
            onChange={(event) =>
              setForm({
                ...form,
                user: event.target
                  .value
              })
            }
            placeholder="manager@kaverikitchen.in"
          />
        </div>

        <div className="form-group">
          <label>
            Password
          </label>

          <input
            type="password"
            value={form.pass}
            onChange={(event) =>
              setForm({
                ...form,
                pass: event.target
                  .value
              })
            }
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{
            width: "100%"
          }}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() =>
            alert(
              "Password reset functionality can be connected to your backend later."
            )
          }
          style={{
            display: "block",
            margin:
              "15px auto 0",
            border: 0,
            background: "none",
            color:
              "rgba(76,21,4,0.55)",
            fontSize: 12
          }}
        >
          Forgot Password?
        </button>

        <button
          type="button"
          onClick={() =>
            nav("landing")
          }
          style={{
            display: "block",
            margin:
              "18px auto 0",
            border: 0,
            background: "none",
            color:
              "rgba(76,21,4,0.45)",
            fontSize: 12
          }}
        >
          ← Back to site
        </button>
      </form>
    </div>
  );
}

/* =========================================================
   ADMIN NAVIGATION
   ========================================================= */

const NAV_ITEMS = [
  { k: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { k: "website", label: "Website Content", icon: ImageIcon },
  { k: "products", label: "Menu & Products", icon: Package },
  { k: "pricing", label: "Price & Menu", icon: Tag },
  { k: "staff", label: "Staff & Duties", icon: Users },
  { k: "inventory", label: "Inventory", icon: Warehouse },
  { k: "tables", label: "Tables & Orders", icon: LayoutGrid },
  { k: "orders", label: "Orders", icon: ClipboardList },
  { k: "delivery", label: "Delivery", icon: Truck },
  { k: "customers", label: "Customers", icon: UserCircle2 },
  { k: "payments", label: "Payments / UPI", icon: CreditCard },
  { k: "arMenu", label: "AR Menu", icon: Sparkles },
  { k: "settings", label: "Settings", icon: SettingsIcon }
];

/* =========================================================
   ADMIN APP
   ========================================================= */

function AdminApp(props) {
  const [section, setSection] =
    useState("dashboard");

  const {
    onLogout,
    nav
  } = props;

  return (
    <div
      className="admin-shell"
      style={{
        display: "grid",
        gridTemplateColumns:
          "240px minmax(0,1fr)"
      }}
    >
      <aside
        className="admin-sidebar"
        style={{
          minHeight: "100vh",
          padding: "22px 13px",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh"
        }}
      >
        <div
          style={{
            padding:
              "7px 12px 20px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10
            }}
          >
            {props.hotel.logo ? (
              <img
                src={props.hotel.logo}
                alt={`${props.hotel.name} logo`}
                style={{
                  width: 40,
                  height: 40,
                  objectFit: "contain",
                  borderRadius: 10,
                  background: "#fff4ee",
                  padding: 5,
                  flex: "0 0 auto"
                }}
              />
            ) : (
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.12)",
                  display: "grid",
                  placeItems: "center",
                  ...serif,
                  fontSize: 21,
                  color: "#fff",
                  flex: "0 0 auto"
                }}
              >
                K
              </div>
            )}

            <div>
              <div
                style={{
                  ...serif,
                  fontSize: 21,
                  color: "#fff"
                }}
              >
                {props.hotel.name}
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: "rgba(255,244,238,0.48)",
                  marginTop: 4
                }}
              >
                Restaurant Management
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            flex: 1
          }}
        >
          {NAV_ITEMS.map(
            (item) => {
              const Icon =
                item.icon;

              const active =
                section === item.k;

              return (
                <button
                  key={item.k}
                  onClick={() =>
                    setSection(
                      item.k
                    )
                  }
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: 10,
                    width: "100%",
                    padding:
                      "11px 12px",
                    borderRadius: 11,
                    border: 0,
                    cursor:
                      "pointer",
                    fontSize: 13,
                    textAlign: "left",
                    background:
                      active
                        ? "rgba(255,107,74,0.14)"
                        : "transparent",
                    color: active
                      ? BRASS_SOFT
                      : "rgba(255,244,238,0.72)",
                    fontWeight:
                      active
                        ? 750
                        : 500
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            }
          )}
        </div>

        <div
          style={{
            borderTop:
              "1px solid rgba(255,244,238,0.1)",
            paddingTop: 12,
            display: "flex",
            flexDirection:
              "column",
            gap: 4
          }}
        >
          <button
            onClick={() =>
              nav("landing")
            }
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 9,
              padding:
                "10px 12px",
              border: 0,
              background:
                "transparent",
              color:
                "rgba(255,244,238,0.6)",
              cursor:
                "pointer"
            }}
          >
            <ChevronLeft size={16} />
            View Site
          </button>

          <button
            onClick={onLogout}
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 9,
              padding:
                "10px 12px",
              border: 0,
              background:
                "transparent",
              color:
                "#ff9a7a",
              cursor:
                "pointer"
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main
        className="admin-main"
        style={{
          padding:
            "28px 34px 65px",
          minWidth: 0
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            marginBottom: 28
          }}
        >
          <div
            style={{
              ...serif,
              fontSize: 27,
              color: INK
            }}
          >
            {
              NAV_ITEMS.find(
                (item) =>
                  item.k === section
              )?.label
            }
          </div>

          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 13
            }}
          >
            <Bell
              size={17}
              color="#765f56"
            />

            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background:
                  BRASS,
                display: "grid",
                placeItems:
                  "center",
                color: "#fff",
                fontSize: 12,
                fontWeight: 800
              }}
            >
              KK
            </div>
          </div>
        </div>

        {section ===
          "dashboard" && (
          <AdminDashboard
            {...props}
          />
        )}

        {section === "website" && (
          <AdminWebsiteContent {...props} />
        )}

        {section ===
          "products" && (
          <AdminProducts
            {...props}
          />
        )}

        {section ===
          "pricing" && (
          <AdminPricing
            {...props}
          />
        )}

        {section ===
          "staff" && (
          <AdminStaff
            {...props}
          />
        )}

        {section ===
          "inventory" && (
          <AdminInventory
            {...props}
          />
        )}

        {section ===
          "tables" && (
          <AdminTables
            {...props}
          />
        )}

        {section ===
          "orders" && (
          <AdminOrders
            {...props}
          />
        )}

        {section === "delivery" && (
          <AdminDelivery {...props} />
        )}

        {section === "payments" && (
          <AdminPayments {...props} />
        )}

        {section ===
          "customers" && (
          <AdminCustomers
            {...props}
          />
        )}

        {section ===
          "arMenu" && (
          <AdminARMenu
            {...props}
          />
        )}

        {section ===
          "settings" && (
          <AdminSettings
            {...props}
          />
        )}
      </main>
    </div>
  );
}

/* =========================================================
   ADMIN SHARED COMPONENTS
   ========================================================= */

function Panel({
  title,
  children,
  right
}) {
  return (
    <div
      className="admin-card"
      style={{
        padding: 20,
        marginBottom: 20
      }}
    >
      {title && (
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            marginBottom: 17
          }}
        >
          <div
            style={{
              fontWeight: 750,
              fontSize: 15,
              color: INK
            }}
          >
            {title}
          </div>

          {right}
        </div>
      )}

      {children}
    </div>
  );
}

function StatCard({
  label,
  value,
  tone
}) {
  return (
    <div
      className="stat-card"
      style={{
        padding: 19
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "#8A7770",
          fontWeight: 650
        }}
      >
        {label}
      </div>

      <div
        className="admin-stat-value"
        style={{
          fontSize: 27,
          fontWeight: 800,
          marginTop: 8,
          color:
            tone === "brass"
              ? BRASS
              : INK,
          ...serif
        }}
      >
        {value}
      </div>
    </div>
  );
}

function IconBtn({
  icon: Icon,
  onClick,
  tone = "default"
}) {
  const danger =
    tone === "danger";

  return (
    <button
      onClick={onClick}
      style={{
        background: danger
          ? "#fde8e3"
          : "#fff3ed",
        border: 0,
        borderRadius: 9,
        width: 33,
        height: 33,
        display: "flex",
        alignItems:
          "center",
        justifyContent:
          "center",
        cursor: "pointer",
        color: danger
          ? "#C84632"
          : INK
      }}
    >
      <Icon size={14} />
    </button>
  );
}

function Toggle({
  on,
  onClick,
  good
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40,
        height: 22,
        borderRadius: 999,
        border: 0,
        cursor: "pointer",
        background: on
          ? good
            ? "#62855A"
            : BRASS
          : "#dccdc6",
        position: "relative"
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: on ? 21 : 3,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#fff",
          transition:
            "left .15s"
        }}
      />
    </button>
  );
}

/* =========================================================
   ADMIN DASHBOARD
   ========================================================= */

function AdminDashboard({
  orders,
  tables,
  inventory,
  products
}) {
  const todayRevenue =
    orders.reduce(
      (sum, order) =>
        sum + Number(order.total || 0),
      0
    );

  const pending =
    orders.filter(
      (order) =>
        ![
          "Delivered",
          "Cancelled"
        ].includes(order.status)
    ).length;

  const available =
    tables.filter(
      (table) =>
        table.status ===
        "Available"
    ).length;

  const lowStock =
    inventory.filter(
      (item) => {
        const qty =
          item.qty ??
          item.stock ??
          0;

        const min =
          item.min ?? 0;

        return qty <= min;
      }
    ).length;

  const trend = [
    42,
    58,
    51,
    66,
    74,
    60,
    82
  ];

  return (
    <div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(5,minmax(0,1fr))",
          gap: 14,
          marginBottom: 22
        }}
      >
        <StatCard
          label="Today's Orders"
          value={orders.length}
        />

        <StatCard
          label="Today's Revenue"
          value={money(
            todayRevenue
          )}
          tone="brass"
        />

        <StatCard
          label="Pending Orders"
          value={pending}
        />

        <StatCard
          label="Available Tables"
          value={available}
        />

        <StatCard
          label="Low Stock Items"
          value={lowStock}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1.35fr 1fr",
          gap: 16
        }}
      >
        <Panel title="Orders this week">

          <div
            style={{
              display: "flex",
              alignItems:
                "flex-end",
              gap: 10,
              height: 165
            }}
          >
            {trend.map(
              (value, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: "100%",
                    display:
                      "flex",
                    flexDirection:
                      "column",
                    justifyContent:
                      "flex-end",
                    alignItems:
                      "center",
                    gap: 6
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: value,
                      background:
                        index ===
                        trend.length -
                          1
                          ? BRASS
                          : "#f5b7a5",
                      borderRadius:
                        "7px 7px 3px 3px"
                    }}
                  />

                  <span
                    style={{
                      fontSize: 10,
                      color:
                        "#927f77"
                    }}
                  >
                    {
                      "MTWTFSS"[
                        index
                      ]
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </Panel>

        <Panel title="Popular dishes">

          {products
            .filter(
              (product) =>
                product.bestseller
            )
            .slice(0, 6)
            .map((product) => (
              <div
                key={product.id}
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  fontSize: 13,
                  padding:
                    "10px 0",
                  borderBottom:
                    `1px solid ${LINE}`,
                  color: INK
                }}
              >
                <span>
                  {product.name}
                </span>

                <span
                  style={{
                    color:
                      BRASS,
                    fontWeight:
                      750
                  }}
                >
                  {money(
                    product.price
                  )}
                </span>
              </div>
            ))}

        </Panel>
      </div>
    </div>
  );
}

/* =========================================================
   ADMIN PRODUCTS
   ========================================================= */

function AdminProducts({
  products,
  setProducts
}) {
  const [form, setForm] =
    useState({
      name: "",
      category: "Momo",
      qty: "",
      price: "",
      desc: ""
    });

  const addProduct = () => {
    if (
      !form.name ||
      !form.price
    ) {
      return;
    }

    setProducts(
      (current) => [
        ...current,
        {
          id: `p${Date.now()}`,
          name: form.name,
          category:
            form.category,
          price:
            Number(form.price),
          rating: 4.5,
          veg: false,
          bestseller: false,
          available: true,
          qty:
            form.qty ||
            "1 plate",
          desc:
            form.desc ||
            "Freshly prepared.",
          img:
            categoryEmoji(
              form.category
            )
        }
      ]
    );

    setForm({
      name: "",
      category: "Momo",
      qty: "",
      price: "",
      desc: ""
    });
  };

  const remove = (id) =>
    setProducts(
      (current) =>
        current.filter(
          (product) =>
            product.id !== id
        )
    );

  const toggle = (
    id,
    key
  ) =>
    setProducts(
      (current) =>
        current.map(
          (product) =>
            product.id === id
              ? {
                  ...product,
                  [key]:
                    !product[key]
                }
              : product
        )
    );

  return (
    <div>

      <Panel title="Add Product">

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(5,minmax(0,1fr)) auto",
            gap: 10,
            alignItems:
              "end"
          }}
        >
          <AdminField
            label="Dish Name"
            value={form.name}
            onChange={(value) =>
              setForm({
                ...form,
                name: value
              })
            }
          />

          <div>
            <div
              style={{
                fontSize: 11,
                marginBottom: 5,
                color: "#8a7770"
              }}
            >
              Category
            </div>

            <select
              value={
                form.category
              }
              onChange={(event) =>
                setForm({
                  ...form,
                  category:
                    event.target
                      .value
                })
              }
              style={selStyle}
            >
              {CATEGORIES
                .filter(
                  (category) =>
                    category !==
                    "All"
                )
                .map(
                  (category) => (
                    <option
                      key={category}
                    >
                      {category}
                    </option>
                  )
                )}
            </select>
          </div>

          <AdminField
            label="Quantity"
            value={form.qty}
            onChange={(value) =>
              setForm({
                ...form,
                qty: value
              })
            }
            placeholder="e.g. 8 pcs"
          />

          <AdminField
            label="Price"
            value={form.price}
            onChange={(value) =>
              setForm({
                ...form,
                price: value
              })
            }
          />

          <AdminField
            label="Description"
            value={form.desc}
            onChange={(value) =>
              setForm({
                ...form,
                desc: value
              })
            }
          />

          <button
            onClick={addProduct}
            style={btnBrass}
          >
            Save Product
          </button>
        </div>
      </Panel>

      <Panel
        title={`All Products (${products.length})`}
      >
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {[
                  "Dish",
                  "Category",
                  "Price",
                  "Bestseller",
                  "Available",
                  ""
                ].map((heading) => (
                  <th key={heading}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {products.map(
                (product) => (
                  <tr
                    key={
                      product.id
                    }
                  >
                    <td>
                      <strong>
                        {
                          product.name
                        }
                      </strong>
                    </td>

                    <td>
                      {
                        product.category
                      }
                    </td>

                    <td>
                      {money(
                        product.price
                      )}
                    </td>

                    <td>
                      <Toggle
                        on={
                          product.bestseller
                        }
                        onClick={() =>
                          toggle(
                            product.id,
                            "bestseller"
                          )
                        }
                      />
                    </td>

                    <td>
                      <Toggle
                        on={
                          product.available
                        }
                        onClick={() =>
                          toggle(
                            product.id,
                            "available"
                          )
                        }
                        good
                      />
                    </td>

                    <td>
                      <IconBtn
                        icon={Trash2}
                        tone="danger"
                        onClick={() =>
                          remove(
                            product.id
                          )
                        }
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* =========================================================
   ADMIN PRICING
   ========================================================= */

function AdminPricing({
  products,
  setProducts
}) {
  const [draftPrices, setDraftPrices] = useState({});
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const initialPrices = {};
    products.forEach((product) => {
      initialPrices[product.id] = product.price;
    });
    setDraftPrices(initialPrices);
  }, [products]);

  const updateDraftPrice = (id, price) => {
    setDraftPrices((current) => ({
      ...current,
      [id]: price
    }));
    setSaved(false);
  };

  const savePrices = async () => {
    setSaving(true);
    setSaved(false);

    try {
      await Promise.all(
        products.map((product) =>
          updateDoc(doc(db, "products", product.id), {
            price: Number(draftPrices[product.id]) || 0
          })
        )
      );

      setProducts((current) =>
        current.map((product) => ({
          ...product,
          price: Number(draftPrices[product.id]) || 0
        }))
      );

      setSaved(true);
      window.setTimeout(() => setSaved(false), 1800);
    } catch (error) {
      console.error("Firestore price update error:", error);
      alert("Price could not be saved to Firebase. Check Firestore permissions.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Panel
      title="Price & Menu"
      right={
        <button
          type="button"
          onClick={savePrices}
          disabled={saving}
          style={{
            ...btnBrass,
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "10px 15px",
            opacity: saving ? 0.7 : 1,
            cursor: saving ? "not-allowed" : "pointer"
          }}
        >
          <Save size={15} />
          {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
        </button>
      }
    >

      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {[
                "Dish",
                "Category",
                "Price",
                "Rating",
                "Availability"
              ].map(
                (heading) => (
                  <th key={heading}>
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {products.map(
              (product) => (
                <tr
                  key={
                    product.id
                  }
                >
                  <td>
                    {
                      product.name
                    }
                  </td>

                  <td>
                    {
                      product.category
                    }
                  </td>

                  <td>
                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: 5
                      }}
                    >
                      ₹

                      <input
                        value={
                          draftPrices[product.id] ?? product.price ?? ""
                        }
                        onChange={(event) =>
                          updateDraftPrice(
                            product.id,
                            event.target.value
                          )
                        }
                        style={{
                          width: 90,
                          padding:
                            "8px 10px",
                          border:
                            "1px solid rgba(76,21,4,0.12)",
                          borderRadius: 9,
                          color: INK,
                          background:
                            "#fff"
                        }}
                      />
                    </div>
                  </td>

                  <td>
                    ⭐{" "}
                    {
                      product.rating
                    }
                  </td>

                  <td>
                    <StatusBadge
                      status={
                        product.available
                          ? "In Stock"
                          : "Out of Stock"
                      }
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

/* =========================================================
   STAFF
   ========================================================= */

const ROLES = [
  "Super Admin",
  "Manager",
  "Kitchen Staff",
  "Waiter",
  "Cashier",
  "Inventory Manager",
  "Delivery Staff"
];

function AdminStaff({
  staff,
  setStaff
}) {
  const DUTIES = ["Kitchen", "Packing", "Cashier", "Dine-in", "Delivery", "Inventory"];
  const [form, setForm] = useState({ name: "", email: "", role: "Waiter", duties: ["Dine-in"] });

  const add = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    setStaff((current) => [
      ...current,
      { id: `s${Date.now()}`, ...form, active: true, duties: form.duties.length ? form.duties : ["Dine-in"] }
    ]);
    setForm({ name: "", email: "", role: "Waiter", duties: ["Dine-in"] });
  };

  const toggleActive = (id) => setStaff((current) => current.map((member) => member.id === id ? { ...member, active: !member.active } : member));
  const remove = (id) => setStaff((current) => current.filter((member) => member.id !== id));
  const toggleDuty = (duty) => setForm((current) => ({ ...current, duties: current.duties.includes(duty) ? current.duties.filter((item) => item !== duty) : [...current.duties, duty] }));
  const updateDuty = (id, duty) => setStaff((current) => current.map((member) => member.id === id ? { ...member, duties: (member.duties || []).includes(duty) ? (member.duties || []).filter((item) => item !== duty) : [...(member.duties || []), duty] } : member));

  return (
    <div>
      <Panel title="Add staff & assign duties" right={<Users size={16} color={BRASS} />}>
        <div className="staff-form-grid">
          <AdminField label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
          <AdminField label="Email / phone" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
          <div><div className="admin-mini-label">Role</div><select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={selStyle}>{ROLES.map((role) => <option key={role}>{role}</option>)}</select></div>
          <button onClick={add} style={btnBrass}><Plus size={14} /> Add Staff</button>
        </div>
        <div className="duty-picker">
          <div className="admin-mini-label">Primary duties</div>
          {DUTIES.map((duty) => <button type="button" key={duty} className={form.duties.includes(duty) ? "selected" : ""} onClick={() => toggleDuty(duty)}>{duty}</button>)}
        </div>
      </Panel>

      <Panel title={`Team (${staff.length})`}>
        <div className="staff-cards-grid">
          {staff.map((member) => (
            <article className="staff-admin-card" key={member.id}>
              <div className="staff-card-head">
                <div className="staff-avatar">{member.name.slice(0,1).toUpperCase()}</div>
                <div><strong>{member.name}</strong><span>{member.email}</span></div>
                <button className="icon-only-button" onClick={() => remove(member.id)}><Trash2 size={14} /></button>
              </div>
              <div className="staff-role-line"><span>{member.role}</span><button onClick={() => toggleActive(member.id)} className={member.active ? "staff-live" : "staff-off"}>{member.active ? "Active" : "Off Duty"}</button></div>
              <div className="staff-duties-label">Assigned work</div>
              <div className="staff-duty-list">
                {DUTIES.map((duty) => <button type="button" key={duty} className={(member.duties || []).includes(duty) ? "selected" : ""} onClick={() => updateDuty(member.id, duty)}>{duty}</button>)}
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* =========================================================
   INVENTORY
   ========================================================= */

function AdminInventory({
  inventory,
  setInventory
}) {
  const [form, setForm] =
    useState({
      name: "",
      qty: "",
      unit: "kg",
      min: ""
    });

  const add = () => {
    if (
      !form.name ||
      !form.qty
    ) {
      return;
    }

    setInventory(
      (current) => [
        ...current,
        {
          id: `i${Date.now()}`,
          name: form.name,
          qty: Number(
            form.qty
          ),
          unit: form.unit,
          min:
            Number(
              form.min
            ) || 1,
          supplier: "—",
          updated: "Just now"
        }
      ]
    );

    setForm({
      name: "",
      qty: "",
      unit: "kg",
      min: ""
    });
  };

  const adjust = (
    id,
    delta
  ) =>
    setInventory(
      (current) =>
        current.map((item) => {
          if (
            item.id !== id
          ) {
            return item;
          }

          const currentQty =
            item.qty ??
            item.stock ??
            0;

          return {
            ...item,
            qty: Math.max(
              0,
              currentQty +
                delta
            ),
            updated:
              "Just now"
          };
        })
    );

  const statusFor = (item) => {
    const qty =
      item.qty ??
      item.stock ??
      0;

    const min =
      item.min ?? 0;

    if (qty === 0) {
      return "Out of Stock";
    }

    if (qty <= min) {
      return "Low Stock";
    }

    return "In Stock";
  };

  return (
    <div>

      <Panel title="Add Inventory Item">

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr 1fr 1fr auto",
            gap: 10,
            alignItems:
              "end"
          }}
        >
          <AdminField
            label="Item name"
            value={form.name}
            onChange={(value) =>
              setForm({
                ...form,
                name: value
              })
            }
          />

          <AdminField
            label="Quantity"
            value={form.qty}
            onChange={(value) =>
              setForm({
                ...form,
                qty: value
              })
            }
          />

          <div>
            <div
              style={{
                fontSize: 11,
                marginBottom: 5,
                color:
                  "#8a7770"
              }}
            >
              Unit
            </div>

            <select
              value={form.unit}
              onChange={(event) =>
                setForm({
                  ...form,
                  unit:
                    event.target
                      .value
                })
              }
              style={selStyle}
            >
              {[
                "kg",
                "pcs",
                "bottles",
                "litres",
                "packs"
              ].map(
                (unit) => (
                  <option
                    key={unit}
                  >
                    {unit}
                  </option>
                )
              )}
            </select>
          </div>

          <AdminField
            label="Minimum stock"
            value={form.min}
            onChange={(value) =>
              setForm({
                ...form,
                min: value
              })
            }
          />

          <button
            onClick={add}
            style={btnBrass}
          >
            Add Item
          </button>
        </div>
      </Panel>

      <Panel title="Stock">

        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {[
                  "Item",
                  "Stock",
                  "Min",
                  "Supplier",
                  "Status",
                  "Updated",
                  "Adjust"
                ].map(
                  (heading) => (
                    <th
                      key={
                        heading
                      }
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {inventory.map(
                (item) => {
                  const qty =
                    item.qty ??
                    item.stock ??
                    0;

                  const name =
                    item.name ??
                    item.item ??
                    "Unnamed";

                  return (
                    <tr
                      key={
                        item.id
                      }
                    >
                      <td>
                        {name}
                      </td>

                      <td>
                        {qty}{" "}
                        {
                          item.unit
                        }
                      </td>

                      <td>
                        {item.min ??
                          0}{" "}
                        {
                          item.unit
                        }
                      </td>

                      <td>
                        {item.supplier ??
                          "—"}
                      </td>

                      <td>
                        <StatusBadge
                          status={statusFor(
                            item
                          )}
                        />
                      </td>

                      <td>
                        {
                          item.updated
                        }
                      </td>

                      <td>
                        <div
                          style={{
                            display:
                              "flex",
                            gap: 5
                          }}
                        >
                          <IconBtn
                            icon={
                              Minus
                            }
                            onClick={() =>
                              adjust(
                                item.id,
                                -1
                              )
                            }
                          />

                          <IconBtn
                            icon={
                              Plus
                            }
                            onClick={() =>
                              adjust(
                                item.id,
                                1
                              )
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* =========================================================
   TABLES
   ========================================================= */

function AdminTables({
  tables,
  setTables,
  products
}) {
  const [openId, setOpenId] =
    useState(null);

  const table =
    tables.find(
      (item) =>
        item.id === openId
    );

  const currentOrder =
    table?.order || [];

  const subtotal = (items) =>
    items.reduce(
      (sum, item) =>
        sum +
        Number(item.price || 0) *
          Number(item.qty || 0),
      0
    );

  const addItem = (
    name,
    price
  ) => {
    setTables(
      (current) =>
        current.map(
          (item) => {
            if (
              item.id !==
              openId
            ) {
              return item;
            }

            const order =
              item.order || [];

            const existing =
              order.find(
                (entry) =>
                  entry.name ===
                  name
              );

            const nextOrder =
              existing
                ? order.map(
                    (entry) =>
                      entry.name ===
                      name
                        ? {
                            ...entry,
                            qty:
                              entry.qty +
                              1
                          }
                        : entry
                  )
                : [
                    ...order,
                    {
                      name,
                      qty: 1,
                      price
                    }
                  ];

            return {
              ...item,
              order:
                nextOrder,
              status:
                "Occupied"
            };
          }
        )
    );
  };

  const markAvailable =
    () => {
      setTables(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              openId
                ? {
                    ...item,
                    order:
                      [],
                    status:
                      "Available"
                  }
                : item
          )
      );

      setOpenId(null);
    };

  return (
    <div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,minmax(0,1fr))",
          gap: 14
        }}
      >
        {tables.map(
          (item) => {
            const order =
              item.order || [];

            return (
              <button
                key={
                  item.id
                }
                onClick={() =>
                  setOpenId(
                    item.id
                  )
                }
                style={{
                  background:
                    "#fff",
                  border:
                    "1px solid rgba(76,21,4,0.08)",
                  borderRadius: 18,
                  padding: 18,
                  cursor:
                    "pointer",
                  textAlign:
                    "left",
                  boxShadow:
                    "0 7px 20px rgba(76,21,4,0.05)"
                }}
              >
                <div
                  style={{
                    fontWeight:
                      800,
                    color: INK,
                    marginBottom: 9
                  }}
                >
                  {item.name}
                </div>

                <StatusBadge
                  status={
                    item.status
                  }
                />

                {order.length >
                  0 && (
                  <div
                    style={{
                      fontSize: 11,
                      color:
                        "#85736c",
                      marginTop: 9
                    }}
                  >
                    {
                      order.length
                    }{" "}
                    items ·{" "}
                    {money(
                      subtotal(
                        order
                      )
                    )}
                  </div>
                )}
              </button>
            );
          }
        )}
      </div>

      {table && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setOpenId(null)
          }
        >
          <div
            className="modal-card"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div
              className="modal-header"
            >
              <div>
                <h2>
                  {
                    table.name
                  }
                </h2>

                <StatusBadge
                  status={
                    table.status
                  }
                />
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setOpenId(null)
                }
              >
                <X size={17} />
              </button>
            </div>

            <div
              style={{
                fontWeight:
                  750,
                marginBottom:
                  10,
                color: INK
              }}
            >
              Current Order
            </div>

            {currentOrder.length ===
              0 && (
              <div
                style={{
                  color:
                    "#89766e",
                  fontSize: 13,
                  marginBottom:
                    12
                }}
              >
                No items yet.
              </div>
            )}

            {currentOrder.map(
              (item, index) => (
                <div
                  key={index}
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    gap: 15,
                    padding:
                      "7px 0",
                    color: INK,
                    fontSize: 13
                  }}
                >
                  <span>
                    {item.qty} ×{" "}
                    {item.name}
                  </span>

                  <span>
                    {money(
                      item.qty *
                        item.price
                    )}
                  </span>
                </div>
              )
            )}

            {currentOrder.length >
              0 && (
              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  marginTop: 8,
                  paddingTop: 12,
                  borderTop:
                    `1px solid ${LINE}`,
                  fontWeight:
                    800
                }}
              >
                <span>
                  Subtotal
                </span>

                <span>
                  {money(
                    subtotal(
                      currentOrder
                    )
                  )}
                </span>
              </div>
            )}

            <div
              style={{
                marginTop: 20,
                marginBottom: 9,
                fontWeight: 750,
                color: INK
              }}
            >
              Add Item
            </div>

            <div
              style={{
                display:
                  "flex",
                flexWrap:
                  "wrap",
                gap: 7,
                marginBottom: 18
              }}
            >
              {products
                .filter(
                  (product) =>
                    product.available
                )
                .slice(0, 8)
                .map(
                  (product) => (
                    <button
                      key={
                        product.id
                      }
                      onClick={() =>
                        addItem(
                          product.name,
                          product.price
                        )
                      }
                      style={{
                        fontSize: 11,
                        background:
                          "#fff0eb",
                        border:
                          "1px solid rgba(255,107,74,0.15)",
                        borderRadius:
                          999,
                        padding:
                          "7px 10px",
                        color:
                          INK,
                        cursor:
                          "pointer"
                      }}
                    >
                      +{" "}
                      {
                        product.name
                      }
                    </button>
                  )
                )}
            </div>

            <div
              style={{
                display:
                  "flex",
                gap: 9
              }}
            >
              <button
                style={{
                  ...btnBrass,
                  flex: 1
                }}
                onClick={() =>
                  alert(
                    "Bill generation can be connected to your printer/POS backend."
                  )
                }
              >
                Generate Bill
              </button>

              <button
                onClick={
                  markAvailable
                }
                style={{
                  flex: 1,
                  background:
                    "#fff0eb",
                  color: INK,
                  border:
                    "1px solid rgba(76,21,4,0.1)",
                  borderRadius:
                    10,
                  padding:
                    "10px",
                  cursor:
                    "pointer",
                  fontWeight:
                    700
                }}
              >
                Mark Available
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   ORDERS
   ========================================================= */

function AdminOrders({ orders, setOrders }) {
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const filters = ["All", "Pending", "Preparing", "Ready", "Out for Delivery", "Delivered", "Cancelled", "Delivery", "Dine-in", "Takeaway"];

  const advance = (id) => setOrders((current) => current.map((order) => {
    if (order.id !== id) return order;
    const index = STATUS_FLOW.indexOf(order.status);
    if (index < 0) return order;
    const next = STATUS_FLOW[Math.min(index + 1, STATUS_FLOW.length - 2)];
    return { ...order, status: next, notification: next === "Out for Delivery" ? `Your order ${order.id} is out for delivery.` : next === "Delivered" ? `Your order ${order.id} has been delivered successfully.` : undefined };
  }));

  const cancel = (id) => setOrders((current) => current.map((order) => order.id === id ? { ...order, status: "Cancelled", notification: `Your order ${order.id} has been cancelled.` } : order));
  const filtered = orders.filter((order) => filter === "All" || filter === "Pending" ? (filter === "Pending" ? !["Delivered", "Cancelled"].includes(order.status) : true) : ["Delivery", "Dine-in", "Takeaway"].includes(filter) ? order.type === filter : order.status === filter);

  return (
    <div className="orders-admin-wrap">
      <div className="cms-hero-head">
        <div><span className="cms-kicker">ORDER OPERATIONS</span><h2>Orders</h2><p>See who ordered, exact dishes, quantities, total price and the current status.</p></div>
        <div className="orders-total-pill"><ReceiptText size={15} /> {orders.length} total orders</div>
      </div>
      <div className="order-filter-pills">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
      <Panel>
        <div className="data-table-wrap">
          <table className="data-table order-admin-table">
            <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Type</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong><div className="muted-cell">{order.time || "just now"}</div></td>
                  <td><strong>{order.customer || "Guest"}</strong><div className="muted-cell">{order.phone || "No phone"}</div></td>
                  <td><div className="order-items-cell">{(order.items || []).map((item, index) => <span key={index}>{item.qty}× {item.name}</span>)}</div></td>
                  <td><strong>{money(order.total)}</strong><div className="muted-cell">{order.paymentMethod || "Payment not recorded"}</div></td>
                  <td>{order.type}</td>
                  <td><StatusBadge status={order.status} /></td>
                  <td><div className="order-actions-inline"><button className="details-button" onClick={() => setSelectedOrder(order)}>Details</button>{!["Delivered", "Cancelled"].includes(order.status) && <button className="advance-button" onClick={() => advance(order.id)}>Advance</button>}{order.status !== "Cancelled" && <button className="icon-only-button danger" onClick={() => cancel(order.id)}><X size={14} /></button>}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {selectedOrder && <div className="admin-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedOrder(null); }}>
        <div className="admin-modal-card order-detail-modal">
          <button className="admin-modal-close" onClick={() => setSelectedOrder(null)}><X size={16} /></button>
          <span className="cms-kicker">ORDER DETAILS</span><h3>{selectedOrder.id}</h3>
          <div className="order-detail-customer"><div className="delivery-customer-icon"><UserCircle2 size={18} /></div><div><strong>{selectedOrder.customer || "Guest"}</strong><span>{selectedOrder.phone || "—"}</span><span>{selectedOrder.address || (selectedOrder.type === "Dine-in" ? selectedOrder.customer : "—")}</span></div></div>
          <div className="detail-items-list">{(selectedOrder.items || []).map((item, index) => <div key={index}><div><strong>{item.qty}× {item.name}</strong><span>Unit price {money(item.price || 0)}</span></div><strong>{money(Number(item.qty || 0) * Number(item.price || 0))}</strong></div>)}</div>
          <div className="order-detail-total"><span>Total</span><strong>{money(selectedOrder.total)}</strong></div>
          <div className="detail-grid"><div><span>Order type</span><strong>{selectedOrder.type}</strong></div><div><span>Status</span><strong>{selectedOrder.status}</strong></div><div><span>Payment</span><strong>{selectedOrder.paymentMethod || "Not recorded"}</strong></div><div><span>Time</span><strong>{selectedOrder.time || "—"}</strong></div></div>
        </div>
      </div>}
    </div>
  );
}

/* =========================================================
   CUSTOMERS
   ========================================================= */

function AdminCustomers({
  orders
}) {
  const customerMap = {};

  orders.forEach(
    (order) => {
      if (!order.phone) {
        return;
      }

      if (
        !customerMap[
          order.phone
        ]
      ) {
        customerMap[
          order.phone
        ] = {
          name:
            order.customer,
          phone:
            order.phone,
          orders: 0,
          spend: 0
        };
      }

      customerMap[
        order.phone
      ].orders += 1;

      customerMap[
        order.phone
      ].spend +=
        Number(
          order.total || 0
        );
    }
  );

  const customers =
    Object.values(
      customerMap
    );

  return (
    <Panel
      title={`Customers (${customers.length})`}
    >
      {customers.length ===
        0 && (
        <div className="empty-state">
          Customers will appear
          after delivery or
          takeaway orders.
        </div>
      )}

      {customers.length >
        0 && (
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {[
                  "Name",
                  "Phone",
                  "Orders",
                  "Total Spend"
                ].map(
                  (heading) => (
                    <th
                      key={
                        heading
                      }
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {customers.map(
                (customer) => (
                  <tr
                    key={
                      customer.phone
                    }
                  >
                    <td>
                      {
                        customer.name
                      }
                    </td>

                    <td>
                      {
                        customer.phone
                      }
                    </td>

                    <td>
                      {
                        customer.orders
                      }
                    </td>

                    <td
                      style={{
                        color:
                          BRASS,
                        fontWeight:
                          800
                      }}
                    >
                      {money(
                        customer.spend
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}

/* =========================================================
   OFFERS & BANNERS ADMIN
   ========================================================= */

/* =========================================================
   WEBSITE CONTENT / CMS
   ========================================================= */

function WebsiteBannerManager({ form, update }) {
  const banners = Array.isArray(form.offerBanners)
    ? form.offerBanners
    : [];

  const [newUrl, setNewUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [uploadKey, setUploadKey] = useState(0);

  const addBanner = (banner) => {
    update("offerBanners", [
      ...banners,
      {
        id: `offer-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        image: banner.image,
        alt: banner.alt || "Special offer",
        title: banner.title || "Special Offer",
        subtitle: banner.subtitle || "Freshly prepared for you.",
        buttonText: banner.buttonText || "Order Now",
        enabled: banner.enabled !== false
      }
    ]);
  };

  const addUrlBanner = () => {
    const image = newUrl.trim();
    if (!image) {
      alert("Please enter a banner image URL.");
      return;
    }
    addBanner({ image, alt: newAlt.trim() || "Special offer" });
    setNewUrl("");
    setNewAlt("");
  };

  const uploadBanner = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Please choose an image smaller than 1.5 MB for browser storage.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      addBanner({
        image: String(reader.result || ""),
        alt: file.name.replace(/\.[^/.]+$/, "") || "Uploaded banner"
      });
      setUploadKey((key) => key + 1);
    };
    reader.readAsDataURL(file);
  };

  const updateBanner = (id, key, value) => {
    update(
      "offerBanners",
      banners.map((banner) =>
        banner.id === id ? { ...banner, [key]: value } : banner
      )
    );
  };

  const deleteBanner = (id) => {
    update(
      "offerBanners",
      banners.filter((banner) => banner.id !== id)
    );
  };

  const moveBanner = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= banners.length) return;
    const next = [...banners];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    update("offerBanners", next);
  };

  return (
    <div className="website-banner-manager">
      <div className="website-banner-toolbar">
        <div>
          <div className="website-banner-title">Banner carousel</div>
          <p className="website-banner-help">
            Add as many homepage banner images as needed. The first three are shown with the existing customer carousel controls; every saved banner is available here.
          </p>
        </div>
        <span className="website-banner-count">{banners.length} banners</span>
      </div>

      <div className="website-banner-add-grid">
        <div className="cms-field">
          <label>Banner image URL</label>
          <input
            value={newUrl}
            placeholder="https://.../offer-banner.jpg"
            onChange={(e) => setNewUrl(e.target.value)}
          />
        </div>
        <div className="cms-field">
          <label>Image description</label>
          <input
            value={newAlt}
            placeholder="Weekend special offer"
            onChange={(e) => setNewAlt(e.target.value)}
          />
        </div>
        <button type="button" className="btn-primary website-banner-add-btn" onClick={addUrlBanner}>
          <Plus size={16} /> Add Banner
        </button>
        <label className="website-banner-upload-btn">
          <ImageIcon size={16} /> Upload image
          <input key={uploadKey} type="file" accept="image/*" onChange={uploadBanner} hidden />
        </label>
      </div>

      <div className="website-banner-list">
        {banners.map((banner, index) => (
          <article className="website-banner-item" key={banner.id || `banner-${index}`}>
            <div className="website-banner-thumb-wrap">
              <img
                src={banner.image}
                alt={banner.alt || "Banner preview"}
                className="website-banner-thumb"
                onError={(event) => {
                  event.currentTarget.style.opacity = "0.22";
                }}
              />
              <span className={banner.enabled === false ? "website-banner-status hidden" : "website-banner-status"}>
                {banner.enabled === false ? "Hidden" : "Live"}
              </span>
            </div>

            <div className="website-banner-fields">
              <div className="cms-field">
                <label>Image description</label>
                <input value={banner.alt || ""} onChange={(e) => updateBanner(banner.id, "alt", e.target.value)} />
              </div>
              <div className="cms-field">
                <label>Heading</label>
                <input value={banner.title || ""} onChange={(e) => updateBanner(banner.id, "title", e.target.value)} />
              </div>
              <div className="cms-field">
                <label>Subtext</label>
                <input value={banner.subtitle || ""} onChange={(e) => updateBanner(banner.id, "subtitle", e.target.value)} />
              </div>
              <div className="cms-field">
                <label>Button</label>
                <input value={banner.buttonText || ""} onChange={(e) => updateBanner(banner.id, "buttonText", e.target.value)} />
              </div>
              <div className="cms-field cms-span-2">
                <label>Image URL / stored image</label>
                <input value={banner.image || ""} onChange={(e) => updateBanner(banner.id, "image", e.target.value)} />
              </div>
              <label className="website-banner-live-toggle">
                <input
                  type="checkbox"
                  checked={banner.enabled !== false}
                  onChange={(e) => updateBanner(banner.id, "enabled", e.target.checked)}
                />
                Show on homepage
              </label>
            </div>

            <div className="website-banner-actions">
              <button type="button" className="btn-ghost" disabled={index === 0} onClick={() => moveBanner(index, -1)} title="Move up"><ChevronLeft size={15} /></button>
              <button type="button" className="btn-ghost" disabled={index === banners.length - 1} onClick={() => moveBanner(index, 1)} title="Move down"><ChevronRight size={15} /></button>
              <button type="button" className="btn-ghost website-banner-delete" onClick={() => deleteBanner(banner.id)}><Trash2 size={15} /> Delete</button>
            </div>
          </article>
        ))}

        {banners.length === 0 && (
          <div className="website-banner-empty">
            <ImageIcon size={30} />
            <strong>No homepage banners yet</strong>
            <span>Add a URL or upload an image above.</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminWebsiteContent({ siteContent, setSiteContent }) {
  const [form, setForm] = useState(() => ({ ...seedSiteContent(), ...siteContent }));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm((current) => ({ ...current, ...siteContent }));
  }, [siteContent]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const uploadImage = (key, event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2 MB for browser storage.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update(key, String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const save = () => {
    setSiteContent(form);
    try {
      localStorage.setItem("kaveri-offer-banners", JSON.stringify(form.offerBanners || []));
    } catch {}
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const input = (key, label, placeholder = "", multiline = false) => (
    <div className="cms-field">
      <label>{label}</label>
      {multiline ? (
        <textarea value={form[key] || ""} placeholder={placeholder} onChange={(e) => update(key, e.target.value)} rows={4} />
      ) : (
        <input value={form[key] || ""} placeholder={placeholder} onChange={(e) => update(key, e.target.value)} />
      )}
    </div>
  );

  const imageField = (key, label) => (
    <div className="cms-image-field">
      {input(key, label, "https://...")}
      <label className="cms-upload-button">
        <ImageIcon size={14} /> Upload from computer
        <input type="file" accept="image/*" onChange={(e) => uploadImage(key, e)} hidden />
      </label>
      {form[key] && <img src={form[key]} alt="CMS preview" className="cms-image-preview" />}
    </div>
  );

  return (
    <div className="cms-wrap">
      <div className="cms-hero-head">
        <div>
          <span className="cms-kicker">FULL WEBSITE CONTROL</span>
          <h2>Homepage Content Manager</h2>
          <p>Change homepage text and imagery from one place. Save once and the customer-facing page updates immediately.</p>
        </div>
        <button className="btn-primary cms-save-btn" onClick={save}>
          <Save size={15} /> {saved ? "Saved" : "Save All Changes"}
        </button>
      </div>

      <Panel title="Hero section" right={<Type size={16} color={BRASS} />}>
        <div className="cms-grid-2">
          {input("heroEyebrow", "Eyebrow text")}
          {input("heroTitle", "Main headline", "Savor the Taste of\nPerfection.", true)}
          <div className="cms-field cms-span-2">{input("heroText", "Hero description", "Fresh ingredients...", true)}</div>
        </div>
        <div className="cms-image-grid">
          {imageField("heroMainImage", "Main hero image")}
          {imageField("heroLeftImage", "Left floating food image")}
          {imageField("heroRightImage", "Right floating food image")}
        </div>
      </Panel>

      <Panel title="Homepage banner images" right={<ImageIcon size={16} color={BRASS} />}>
        <WebsiteBannerManager form={form} update={update} />
      </Panel>

      <Panel title="Homepage menu / signature section" right={<Package size={16} color={BRASS} />}>
        <div className="cms-grid-2">
          {input("signatureTitle", "Section title")}
          {input("signatureText", "Section description", "Classic favourites...", true)}
        </div>
      </Panel>

      <Panel title="About section" right={<ChefHat size={16} color={BRASS} />}>
        <div className="cms-grid-2">
          {input("aboutEyebrow", "Eyebrow")}
          {input("aboutTitle", "Heading", "Good food.\nGood mood.", true)}
          <div className="cms-span-2">{input("aboutText", "Description", "Carefully selected ingredients...", true)}</div>
        </div>
        {imageField("aboutImage", "About section image")}
      </Panel>

      <Panel title="Reviews section" right={<MessageSquare size={16} color={BRASS} />}>
        <div className="cms-grid-2">
          {input("reviewsTitle", "Review heading")}
          {input("reviewsText", "Review section description", "Good food, warm service...", true)}
        </div>
      </Panel>

      <Panel title="AR Coming Soon section" right={<Sparkles size={16} color={BRASS} />}>
        <div className="cms-grid-2">
          {input("arKicker", "AR kicker")}
          {input("arTitle", "AR headline", "See your food\nbefore it arrives.", true)}
          <div className="cms-span-2">{input("arText", "AR description", "Preview selected dishes...", true)}</div>
          <div className="cms-span-2">{input("arTags", "AR tags", "3D Food Preview,Table View,Coming Soon")}</div>
        </div>
      </Panel>

      <Panel title="Final order call-to-action" right={<ShoppingCart size={16} color={BRASS} />}>
        <div className="cms-grid-2">
          {input("finalEyebrow", "Eyebrow")}
          {input("finalTitle", "Heading", "Don't Wait —\nOrder Now!", true)}
          <div className="cms-span-2">{input("finalText", "Description", "Freshly prepared favourites...", true)}</div>
        </div>
      </Panel>

      <Panel title="Footer content" right={<ReceiptText size={16} color={BRASS} />}>
        <div className="cms-grid-2">
          {input("footerTagline", "Footer tagline", "Fresh food...", true)}
          {input("footerHours", "Opening hours")}
          {input("footerDays", "Opening days")}
        </div>
      </Panel>
    </div>
  );
}

/* =========================================================
   DELIVERY CONTROL
   ========================================================= */

function AdminDelivery({ orders, setOrders }) {
  const [selected, setSelected] = useState(null);
  const deliveryOrders = orders.filter((order) => order.type === "Delivery");

  const statusMessage = (status, order) => {
    const first = order.customer || "Customer";
    if (status === "Out for Delivery") return `Hi ${first}, your order ${order.id} is out for delivery.`;
    if (status === "Delivered") return `Your order ${order.id} has been delivered successfully. Thank you!`;
    if (status === "Ready") return `Your order ${order.id} is ready for pickup/delivery.`;
    return `Order ${order.id} is now ${status}.`;
  };

  const setStatus = (id, status) => {
    setOrders((current) => current.map((order) => {
      if (order.id !== id) return order;
      const message = statusMessage(status, order);
      return { ...order, status, notification: message, notificationTime: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) };
    }));
    if (["Out for Delivery", "Delivered"].includes(status)) {
      alert(`Customer notification prepared for ${orders.find((o) => o.id === id)?.phone || "customer"}.\n\n${statusMessage(status, orders.find((o) => o.id === id) || {})}\n\nFor real SMS delivery, connect an SMS provider/backend.`);
    }
  };

  return (
    <div className="delivery-admin-wrap">
      <div className="cms-hero-head">
        <div>
          <span className="cms-kicker">LIVE DELIVERY OPERATIONS</span>
          <h2>Delivery Control</h2>
          <p>Move orders through delivery stages and keep the customer-facing status in sync.</p>
        </div>
        <div className="delivery-live-badge"><span /> {deliveryOrders.length} delivery orders</div>
      </div>

      <div className="delivery-kanban">
        {deliveryOrders.length === 0 ? (
          <Panel title="No delivery orders"><div className="orders-empty">New delivery orders will appear here.</div></Panel>
        ) : deliveryOrders.map((order) => (
          <article className="delivery-order-card" key={order.id}>
            <div className="delivery-order-top">
              <div><strong>{order.id}</strong><span>{order.time || "just now"}</span></div>
              <StatusBadge status={order.status} />
            </div>
            <div className="delivery-customer">
              <div className="delivery-customer-icon"><Truck size={15} /></div>
              <div><strong>{order.customer}</strong><span>{order.phone || "No phone"}</span><span>{order.address || "Address not added"}</span></div>
            </div>
            <div className="delivery-items-mini">
              {(order.items || []).map((item, index) => <div key={index}><span>{item.qty}× {item.name}</span><strong>{money(Number(item.qty || 0) * Number(item.price || 0))}</strong></div>)}
            </div>
            {order.notification && <div className="delivery-notice"><MessageSquare size={13} /><span>{order.notification}</span></div>}
            <div className="delivery-actions">
              {[["Accepted", "Accept"], ["Preparing", "Start Kitchen"], ["Ready", "Ready"], ["Out for Delivery", "Out for Delivery"], ["Delivered", "Delivered ✓"]].map(([status, label]) => (
                <button key={status} className={order.status === status ? "active" : ""} disabled={order.status === status || order.status === "Delivered"} onClick={() => setStatus(order.id, status)}>{label}</button>
              ))}
              <button className="delivery-details-btn" onClick={() => setSelected(order)}>Details</button>
            </div>
          </article>
        ))}
      </div>

      {selected && <div className="admin-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
        <div className="admin-modal-card">
          <button className="admin-modal-close" onClick={() => setSelected(null)}><X size={16} /></button>
          <span className="cms-kicker">DELIVERY DETAILS</span>
          <h3>{selected.id}</h3>
          <div className="detail-grid">
            <div><span>Customer</span><strong>{selected.customer}</strong></div>
            <div><span>Phone</span><strong>{selected.phone || "—"}</strong></div>
            <div className="detail-grid-wide"><span>Address</span><strong>{selected.address || "—"}</strong></div>
            <div><span>Payment</span><strong>{selected.paymentMethod || "Not recorded"}</strong></div>
            <div><span>Total</span><strong>{money(selected.total)}</strong></div>
          </div>
        </div>
      </div>}
    </div>
  );
}

/* =========================================================
   PAYMENT / UPI CONTROL
   ========================================================= */

function AdminPayments({ paymentSettings, setPaymentSettings, hotel }) {
  const [form, setForm] = useState(() => ({ ...seedPaymentSettings(), ...paymentSettings }));
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm((current) => ({ ...current, ...paymentSettings })), [paymentSettings]);

  const uploadQr = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Please select an image file.");
    if (file.size > 2 * 1024 * 1024) return alert("Please keep the QR image below 2 MB.");
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, qrImage: String(reader.result || "") }));
    reader.readAsDataURL(file);
  };

  const save = () => {
    setPaymentSettings(form);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="payment-admin-wrap">
      <div className="cms-hero-head">
        <div>
          <span className="cms-kicker">ONLINE PAYMENTS</span>
          <h2>UPI & Payment Settings</h2>
          <p>Upload your own QR image. Customers will see it automatically when they select UPI at checkout.</p>
        </div>
        <button className="btn-primary cms-save-btn" onClick={save}><Save size={15} /> {saved ? "Saved" : "Save Payment Settings"}</button>
      </div>

      <Panel title="Available payment methods" right={<CreditCard size={16} color={BRASS} />}>
        <div className="payment-toggle-grid">
          {[
            ["cashEnabled", "Cash / Counter", "Accept pay-at-delivery or counter payments."],
            ["upiEnabled", "UPI", "Show UPI with QR at checkout."],
            ["cardEnabled", "Cards", "Keep the card option visible."],
          ].map(([key, title, sub]) => (
            <button key={key} type="button" className={`payment-toggle-card ${form[key] ? "active" : ""}`} onClick={() => setForm((current) => ({ ...current, [key]: !current[key] }))}>
              <span className="payment-toggle-icon">{key === "upiEnabled" ? "◉" : key === "cardEnabled" ? "▣" : "₹"}</span>
              <span><strong>{title}</strong><small>{sub}</small></span>
              <span className={`mini-switch ${form[key] ? "on" : ""}`}><i /></span>
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="UPI merchant details" right={<CircleDollarSign size={16} color={BRASS} />}>
        <div className="cms-grid-2">
          <div className="cms-field"><label>UPI ID</label><input value={form.upiId || ""} onChange={(e) => setForm((c) => ({ ...c, upiId: e.target.value }))} placeholder="restaurant@upi" /></div>
          <div className="cms-field"><label>Merchant name</label><input value={form.merchantName || hotel?.name || ""} onChange={(e) => setForm((c) => ({ ...c, merchantName: e.target.value }))} /></div>
        </div>
        <div className="upi-admin-upload">
          <div>
            <span className="cms-kicker">QR IMAGE</span>
            <h3>Customer payment QR</h3>
            <p>Upload the QR image you provide. It is shown only when UPI is selected during checkout.</p>
            <label className="cms-upload-button"><ImageIcon size={14} /> Upload QR image<input type="file" accept="image/*" onChange={uploadQr} hidden /></label>
          </div>
          <div className="upi-admin-preview">
            {form.qrImage ? <img src={form.qrImage} alt="UPI QR preview" /> : <QRVisual seed={form.upiId || "KAVERI-UPI"} />}
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* =========================================================
   DIGITAL MENU ADMIN
   ========================================================= */

function AdminDigitalMenu() {
  const [token, setToken] =
    useState("KVK-2026-A1");

  const url =
    `https://kaverikitchen.example/menu/${token}`;

  const downloadQr =
    () => {
      alert(
        "Connect a real QR generator library/backend here for downloadable QR files."
      );
    };

  return (
    <Panel title="Digital Menu QR">

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "230px 1fr",
          gap: 30,
          alignItems:
            "center"
        }}
      >
        <div
          style={{
            background:
              "#ffffff",
            borderRadius: 20,
            padding: 20,
            display: "grid",
            placeItems:
              "center"
          }}
        >
          <QRVisual
            seed={token}
          />
        </div>

        <div>

          <div
            style={{
              fontSize: 12,
              color: "#8A7770",
              marginBottom: 7
            }}
          >
            Menu URL
          </div>

          <div
            style={{
              fontSize: 12,
              background:
                "#fff8f4",
              border:
                "1px solid rgba(76,21,4,0.09)",
              borderRadius: 11,
              padding:
                "11px 12px",
              marginBottom: 16,
              wordBreak:
                "break-all",
              color: INK
            }}
          >
            {url}
          </div>

          <div
            style={{
              display:
                "flex",
              gap: 8,
              flexWrap:
                "wrap"
            }}
          >
            <button
              style={btnBrass}
              onClick={
                downloadQr
              }
            >
              <Download
                size={13}
              />
              Download QR
            </button>

            <button
              onClick={() =>
                setToken(
                  `KVK-2026-${Math.random()
                    .toString(
                      36
                    )
                    .slice(
                      2,
                      6
                    )
                    .toUpperCase()}`
                )
              }
              style={{
                background:
                  "#fff0eb",
                color: INK,
                border:
                  "1px solid rgba(76,21,4,0.1)",
                borderRadius:
                  10,
                padding:
                  "10px 15px",
                cursor:
                  "pointer",
                display:
                  "flex",
                alignItems:
                  "center",
                gap: 6,
                fontWeight:
                  700
              }}
            >
              <RefreshCw
                size={13}
              />
              Regenerate
            </button>
          </div>

          <p
            style={{
              fontSize: 12,
              color:
                "#8A7770",
              marginTop: 17,
              maxWidth: 450
            }}
          >
            Use this QR destination
            for table cards, receipts
            and entrance signage.
          </p>

        </div>
      </div>
    </Panel>
  );
}

/* =========================================================
   QR VISUAL
   ========================================================= */

function QRVisual({
  seed
}) {
  const grid = 21;

  let hash = 0;

  for (
    let index = 0;
    index < seed.length;
    index += 1
  ) {
    hash =
      (hash * 31 +
        seed.charCodeAt(
          index
        )) &
      0x7fffffff;
  }

  const cells = [];

  let x =
    hash || 123456;

  for (
    let index = 0;
    index <
    grid * grid;
    index += 1
  ) {
    x =
      (x * 1103515245 +
        12345) &
      0x7fffffff;

    cells.push(
      x % 5 === 0 ||
      x % 7 === 0
    );
  }

  const finder = (
    x,
    y
  ) => (
    <g>
      <rect
        x={x}
        y={y}
        width="7"
        height="7"
        fill={INK}
      />

      <rect
        x={x + 1}
        y={y + 1}
        width="5"
        height="5"
        fill="#fff"
      />

      <rect
        x={x + 2}
        y={y + 2}
        width="3"
        height="3"
        fill={INK}
      />
    </g>
  );

  return (
    <svg
      viewBox={`0 0 ${grid} ${grid}`}
      width="175"
      height="175"
      style={{
        display: "block"
      }}
    >
      <rect
        width={grid}
        height={grid}
        fill="#fff"
      />

      {cells.map(
        (active, index) =>
          active && (
            <rect
              key={index}
              x={
                index %
                grid
              }
              y={Math.floor(
                index /
                  grid
              )}
              width="1"
              height="1"
              fill={INK}
            />
          )
      )}

      {finder(0, 0)}

      {finder(
        grid - 7,
        0
      )}

      {finder(
        0,
        grid - 7
      )}
    </svg>
  );
}

/* =========================================================
   AR MENU
   ========================================================= */

function AdminARMenu() {
  const [shown, setShown] =
    useState(true);

  return (
    <Panel title="AR Menu">

      <div
        style={{
          display:
            "flex",
          alignItems:
            "flex-start",
          gap: 15,
          marginBottom: 18
        }}
      >
        <div
          style={{
            width: 43,
            height: 43,
            display: "grid",
            placeItems:
              "center",
            borderRadius: 13,
            background:
              "#fff0eb"
          }}
        >
          <Sparkles
            size={20}
            color={BRASS}
          />
        </div>

        <div>
          <h3
            style={{
              marginBottom: 6,
              color: INK
            }}
          >
            Augmented Reality Menu
          </h3>

          <p
            style={{
              margin: 0,
              fontSize: 13,
              color:
                "#7b6961",
              maxWidth: 650
            }}
          >
            Guests will be able to view
            selected dishes in an AR
            experience before ordering.
          </p>
        </div>
      </div>

      <div
        style={{
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "space-between",
          padding:
            "15px 16px",
          background:
            "#fff8f4",
          borderRadius:
            14
        }}
      >
        <div>
          <strong
            style={{
              display:
                "block",
              color: INK,
              marginBottom:
                4
            }}
          >
            Show Coming Soon
          </strong>

          <span
            style={{
              fontSize: 11,
              color:
                "#89766f"
            }}
          >
            Display the AR section
            on the website and menu.
          </span>
        </div>

        <Toggle
          on={shown}
          onClick={() =>
            setShown(
              (current) =>
                !current
            )
          }
          good
        />
      </div>

      <div
        style={{
          marginTop: 14,
          fontSize: 12,
          color:
            "#89766f"
        }}
      >
        Planned flow: Choose Dish →
        View AR → Launch AR →
        See 3D dish → View details.
      </div>
    </Panel>
  );
}

/* =========================================================
   SETTINGS
   ========================================================= */

function AdminSettings({
  hotel,
  setHotel
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    about: "",
    logo: "",
    ...hotel
  });

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file for the logo.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert("Please choose a logo image smaller than 3 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({
        ...current,
        logo: String(reader.result || "")
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <Panel title="Hotel Settings">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          maxWidth: 860
        }}
      >
        <div
          style={{
            gridColumn: "1 / -1",
            padding: 16,
            border: "1px solid rgba(76,21,4,0.12)",
            borderRadius: 14,
            background: "rgba(255,255,255,0.72)",
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          <div
            style={{
              width: 78,
              height: 78,
              borderRadius: 16,
              background: "#fff",
              border: "1px solid rgba(76,21,4,0.10)",
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
              flex: "0 0 auto"
            }}
          >
            {form.logo ? (
              <img
                src={form.logo}
                alt="Restaurant logo preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: 8
                }}
              />
            ) : (
              <span
                style={{
                  ...serif,
                  fontSize: 30,
                  color: BRASS,
                  fontWeight: 700
                }}
              >
                K
              </span>
            )}
          </div>

          <div style={{ minWidth: 220, flex: 1 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: INK,
                marginBottom: 4
              }}
            >
              Restaurant Logo
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#8a7770",
                lineHeight: 1.5,
                marginBottom: 10
              }}
            >
              Upload your logo. PNG, JPG or WEBP · maximum 3 MB.
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <label
                style={{
                  ...btnBrass,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  margin: 0
                }}
              >
                <UploadIconFallback />
                {form.logo ? "Change Logo" : "Upload Logo"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleLogoChange}
                  style={{ display: "none" }}
                />
              </label>

              {form.logo && (
                <button
                  type="button"
                  onClick={() => setForm((current) => ({ ...current, logo: "" }))}
                  style={{
                    border: "1px solid rgba(76,21,4,0.14)",
                    background: "#fff",
                    color: INK,
                    borderRadius: 10,
                    padding: "9px 12px",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Remove Logo
                </button>
              )}
            </div>
          </div>
        </div>

        <AdminField
          label="Website name"
          value={form.name}
          onChange={(value) => setForm({ ...form, name: value })}
        />

        <AdminField
          label="Phone"
          value={form.phone}
          onChange={(value) => setForm({ ...form, phone: value })}
        />

        <div style={{ gridColumn: "1 / -1" }}>
          <AdminField
            label="Address"
            value={form.address}
            onChange={(value) => setForm({ ...form, address: value })}
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <div
            style={{
              fontSize: 11,
              color: "#8a7770",
              marginBottom: 5
            }}
          >
            About
          </div>

          <textarea
            value={form.about}
            onChange={(event) =>
              setForm({ ...form, about: event.target.value })
            }
            rows={4}
            style={{
              width: "100%",
              minHeight: 100,
              padding: 12,
              border: "1px solid rgba(76,21,4,0.12)",
              borderRadius: 11,
              background: "#fff",
              color: INK,
              resize: "vertical",
              outline: "none",
              fontFamily: "inherit",
              fontSize: 13
            }}
          />
        </div>
      </div>

      <button
        onClick={async () => {
          const nextHotel = {
            ...hotel,
            ...form,
            name: String(form.name || "").trim()
          };

          if (!nextHotel.name) {
            alert("Please enter a website name.");
            return;
          }

          // Update the current UI immediately.
          setHotel(nextHotel);

          // Persist the website name in Firestore so the public website
          // can receive the change on every device/browser.
          try {
            await setDoc(
              doc(db, "settings", "hotel"),
              {
                name: nextHotel.name,
                updatedAt: serverTimestamp()
              },
              { merge: true }
            );

            alert("Website name saved successfully.");
          } catch (error) {
            console.error("Website name sync failed:", error);
            alert(
              "Saved locally, but could not sync the website name to Firebase. Please check Firestore Rules."
            );
          }
        }}
        style={{
          ...btnBrass,
          marginTop: 17
        }}
      >
        Save Settings
      </button>
    </Panel>
  );
}

/* =========================================================
   ADMIN FIELD
   ========================================================= */

function UploadIconFallback() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 20,
        height: 20,
        display: "grid",
        placeItems: "center",
        borderRadius: 6,
        background: "#fff0eb",
        color: BRASS,
        fontWeight: 900
      }}
    >
      ↑
    </span>
  );
}

function AdminField({
  label,
  value,
  onChange,
  placeholder
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          color: "#8a7770",
          marginBottom: 5
        }}
      >
        {label}
      </div>

      <input
        value={value}
        placeholder={
          placeholder
        }
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        style={{
          width: "100%",
          minHeight: 42,
          background:
            "#fff",
          border:
            "1px solid rgba(76,21,4,0.12)",
          borderRadius: 10,
          padding:
            "9px 11px",
          color: INK,
          fontSize: 13,
          outline: "none"
        }}
      />
    </div>
  );
}

/* =========================================================
   ADMIN TABLE / BUTTON STYLES
   ========================================================= */

const tableStyle = {
  width: "100%",
  borderCollapse:
    "collapse",
  fontSize: 13
};

const thStyle = {
  textAlign: "left",
  fontSize: 11,
  color: "#8A7770",
  padding:
    "0 10px 10px",
  fontWeight: 700
};

const tdStyle = {
  padding: "12px 10px",
  verticalAlign:
    "middle",
  color: INK
};

const selStyle = {
  width: "100%",
  minHeight: 42,
  background:
    "#fff",
  border:
    "1px solid rgba(76,21,4,0.12)",
  borderRadius: 10,
  padding:
    "9px 10px",
  color: INK,
  fontSize: 13,
  outline: "none"
};

const btnBrass = {
  background: BRASS,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding:
    "10px 16px",
  fontWeight: 800,
  cursor: "pointer",
  fontSize: 12,
  display: "inline-flex",
  alignItems:
    "center",
  justifyContent:
    "center",
  gap: 6,
  minHeight: 42
};