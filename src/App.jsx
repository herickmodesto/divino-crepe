import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/payment-modal.css";
import "./styles/shopping-cart.css";

import { CONFIG } from "./data/config";
import { ALL_ITEMS, ADDONS } from "./data/menu";
import { money } from "./utils/helpers";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import Toolbar from "./components/Toolbar";
import ItemCard from "./components/ItemCard";
import CartPanel from "./components/CartPanel";
import ShoppingCartPage from "./components/ShoppingCartPage";
import Toast from "./components/Toast";
import AddonsModal from "./components/AddonsModal";
import ComboModal from "./components/ComboModal";
import AcaiModal from "./components/AcaiModal";
import PaymentModal from "./components/PaymentModal";
import FavCard from "./components/FavCard";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [category, setCategory] = useState("Tudo");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({
    name: "",
    address: "",
    pay: "Pix",
    fee: "",
    notes: "",
  });
  const [mobileCart, setMobileCart] = useState(false);
  const [addonModalItem, setAddonModalItem] = useState(null);
  const [comboModalItem, setComboModalItem] = useState(null);
  const [acaiModalItem, setAcaiModalItem] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [currentSubtotal, setCurrentSubtotal] = useState(0);
  const toastTimer = useRef(null);

  const showToast = useCallback((msg) => {
    setToast("");
    clearTimeout(toastTimer.current);
    requestAnimationFrame(() => {
      setToast(msg);
      toastTimer.current = setTimeout(() => setToast(""), 1600);
    });
  }, []);

  useEffect(() => {
    const handler = () => setActiveSection("menu");
    window.addEventListener("navigate-menu", handler);
    return () => window.removeEventListener("navigate-menu", handler);
  }, []);

  const handleFavorite = useCallback((itemId, isFavorited) => {
    setFavorites((prev) => {
      if (isFavorited) {
        if (!prev.includes(itemId)) {
          return [...prev, itemId];
        }
      } else {
        return prev.filter((id) => id !== itemId);
      }
      return prev;
    });
  }, []);
  const filtered = useMemo(() => {
    const q = query
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return ALL_ITEMS.filter((it) => {
      if (category !== "Tudo" && it.category !== category) return false;
      if (!q) return true;
      const hay = `${it.name} ${it.desc || ""} ${it.category}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return hay.includes(q);
    });
  }, [category, query]);

  const grouped = useMemo(() => {
    const m = {};
    filtered.forEach((it) => {
      m[it.category] = m[it.category] || [];
      m[it.category].push(it);
    });
    return m;
  }, [filtered]);

  const addToCart = useCallback(
    (item) => {
      if (item.acaiAddons) {
        setAcaiModalItem(item);
        return;
      }
      if (item.addons) {
        setAddonModalItem(item);
        return;
      }

      setCart((prev) => {
        const existing = prev.find((x) => x.id === item.id);
        if (existing)
          return prev.map((x) =>
            x.id === item.id ? { ...x, qty: x.qty + 1 } : x
          );
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            category: item.category,
            qty: 1,
          },
        ];
      });
      showToast(`${item.name} adicionado`);
    },
    [showToast]
  );
  const handleAddonConfirm = useCallback(
    (itemWithAddons) => {
      const addonsStr = itemWithAddons.selectedAddons
        .map((a) => a.name)
        .join(", ");
      const itemId = `${itemWithAddons.id}--${addonsStr}`;

      setCart((prev) => {
        const existing = prev.find((x) => x.id === itemId);
        if (existing)
          return prev.map((x) =>
            x.id === itemId ? { ...x, qty: x.qty + 1 } : x
          );
        return [
          ...prev,
          {
            id: itemId,
            name: itemWithAddons.name,
            price: itemWithAddons.price,
            category: itemWithAddons.category,
            selectedAddons: itemWithAddons.selectedAddons,
            qty: 1,
          },
        ];
      });
      showToast(`${itemWithAddons.name} adicionado`);
      setAddonModalItem(null);
    },
    [showToast]
  );

  const handleAcaiConfirm = useCallback(
    (acaiWithOptions) => {
      const optionsStr = [
        acaiWithOptions.selectedCobertura.name,
        ...acaiWithOptions.selectedComplementos.map((c) => c.name),
      ].join(", ");
      const itemId = `${acaiWithOptions.id}--${optionsStr}`;

      setCart((prev) => {
        const existing = prev.find((x) => x.id === itemId);
        if (existing)
          return prev.map((x) =>
            x.id === itemId ? { ...x, qty: x.qty + 1 } : x
          );
        return [
          ...prev,
          {
            id: itemId,
            name: acaiWithOptions.name,
            price: acaiWithOptions.totalPrice,
            category: acaiWithOptions.category,
            selectedCobertura: acaiWithOptions.selectedCobertura,
            selectedComplementos: acaiWithOptions.selectedComplementos,
            complementsExtra: acaiWithOptions.complementsExtra,
            extraPrice: acaiWithOptions.extraPrice,
            qty: 1,
          },
        ];
      });
      showToast(`${acaiWithOptions.name} adicionado`);
      setAcaiModalItem(null);
    },
    [showToast]
  );

  const handlePromoAdd = useCallback(
    (promoItem) => {
      const price = parseFloat(promoItem.price.replace(",", "."));
      const base = {
        id: `promo-${promoItem.id}`,
        name: promoItem.title,
        price,
        desc: promoItem.description,
        image: promoItem.image,
        category: "Promoção",
      };
      if (promoItem.itemType === "combo") {
        setComboModalItem(base);
      } else if (promoItem.itemType === "pizza") {
        setAddonModalItem({ ...base, addons: true });
      } else {
        setCart((prev) => {
          const existing = prev.find((x) => x.id === base.id);
          if (existing) return prev.map((x) => x.id === base.id ? { ...x, qty: x.qty + 1 } : x);
          return [...prev, { ...base, qty: 1 }];
        });
        showToast(`${base.name} adicionado`);
        setActiveSection("menu");
      }
    },
    [showToast]
  );

  const handleComboConfirm = useCallback(
    (item) => {
      const extra = (item.comboAddons.pizza1?.price || 0) + (item.comboAddons.pizza2?.price || 0);
      const totalPrice = item.price + extra;
      const p1 = item.comboAddons.pizza1?.name || "Sem Borda";
      const p2 = item.comboAddons.pizza2?.name || "Sem Borda";
      const cartId = `${item.id}--${p1}--${p2}`;

      setCart((prev) => {
        const existing = prev.find((x) => x.id === cartId);
        if (existing)
          return prev.map((x) => x.id === cartId ? { ...x, qty: x.qty + item.qty } : x);
        return [
          ...prev,
          {
            id: cartId,
            name: item.name,
            price: totalPrice,
            category: item.category,
            comboAddons: item.comboAddons,
            qty: item.qty,
          },
        ];
      });
      showToast(`${item.name} adicionado`);
      setComboModalItem(null);
      setActiveSection("menu");
    },
    [showToast]
  );

  const inc = useCallback(
    (id) =>
      setCart((p) =>
        p.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
      ),
    []
  );

  const dec = useCallback((id) => {
    setCart((p) => {
      const item = p.find((x) => x.id === id);
      if (!item) return p;
      if (item.qty <= 1) return p.filter((x) => x.id !== id);
      return p.map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x));
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    showToast("Carrinho limpo");
  }, [showToast]);

  const openPaymentModal = useCallback((subtotal) => {
    setCurrentSubtotal(subtotal);
    setPaymentModalOpen(true);
  }, []);

  const closePaymentModal = useCallback(() => {
    setPaymentModalOpen(false);
  }, []);
  const sendWA = useCallback(() => {
    if (cart.length === 0) return showToast("Carrinho vazio");

    const fee = parseFloat((form.fee || "0").replace(",", ".")) || 0;
    const subtotal = cart.reduce((s, i) => {
      const basePrice = i.price || 0;
      const addonsPrice = i.selectedAddons ? i.selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0) : 0;
      const acaiExtraPrice = i.extraPrice || 0;
      return s + (basePrice + addonsPrice + acaiExtraPrice) * i.qty;
    }, 0);
    const total = subtotal + fee;
    const missing = cart
      .filter((i) => i.price == null)
      .reduce((s, i) => s + i.qty, 0);

    const lines = [`*${CONFIG.storeName}*`, ""];
    if (form.name) lines.push(`👤 ${form.name}`);
    if (form.address) lines.push(`📍 ${form.address}`);
    lines.push(`💳 ${form.pay}`);
    if (fee > 0) lines.push(`🚚 Entrega: ${money(fee)}`);
    lines.push("", "🧾 *Itens:*");
    cart.forEach((i) => {
      const basePrice = i.price || 0;
      const addonsPrice = i.selectedAddons ? i.selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0) : 0;
      const totalPrice = basePrice + addonsPrice;
      const p = totalPrice != null ? money(totalPrice) : "A confirmar";
      let itemLine = `  • ${i.qty}x ${i.name}`;
      if (i.selectedCobertura) {
        itemLine += ` [${i.selectedCobertura.emoji} ${i.selectedCobertura.name}`;
        if (i.selectedComplementos.length > 0) {
          const complementsList = i.selectedComplementos.map((c) => `${c.emoji} ${c.name}`).join(", ");
          itemLine += ` + ${complementsList}`;
        }
        itemLine += `]`;
      } else if (i.comboAddons) {
        const p1 = i.comboAddons.pizza1?.name || "Sem Borda";
        const p2 = i.comboAddons.pizza2?.name || "Sem Borda";
        itemLine += ` [Pizza 1: ${p1}, Pizza 2: ${p2}]`;
      } else if (i.selectedAddons && i.selectedAddons.length > 0) {
        const addonsList = i.selectedAddons.map((a) => a.name).join(", ");
        itemLine += ` [${addonsList}]`;
      }
      itemLine += ` — ${p}`;
      lines.push(itemLine);
    });
    lines.push("", `*Subtotal:* ${money(subtotal)}`);
    if (fee > 0) lines.push(`*Entrega:* ${money(fee)}`);
    lines.push(`*Total:* ${money(total)}`);
    if (missing > 0)
      lines.push("", `⚠️ ${missing} item(ns) sem preço — confirme o valor.`);
    if (form.notes) lines.push("", `📝 ${form.notes}`);
    lines.push("", "Enviado pelo site ✅");

    const phone = CONFIG.phoneE164.replace(/\D/g, "");
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank"
    );
    setPaymentModalOpen(false);
  }, [cart, form, showToast]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} cartCount={cartCount} favorites={favorites} />

      {activeSection === "home" && (
        <HeroSection onOrderClick={() => setActiveSection("menu")} onPromoAdd={handlePromoAdd} />
      )}

      {activeSection === "favorites" && (
        <div className="fav-page">
          {/* Header */}
          <div className="fav-header">
            <div className="fav-header-inner">
              <div className="fav-header-text">
                <h1 className="fav-title">Meus Favoritos</h1>
                <p className="fav-subtitle">
                  {favorites.length === 0
                    ? "Salve seus itens preferidos para pedir mais rápido"
                    : `${favorites.length} item${favorites.length > 1 ? "s" : ""} salvo${favorites.length > 1 ? "s" : ""}`}
                </p>
              </div>
              {favorites.length > 0 && (
                <div className="fav-count-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  {favorites.length}
                </div>
              )}
            </div>
          </div>

          {favorites.length === 0 ? (
            /* Empty State */
            <div className="fav-empty">
              <div className="fav-empty-illustration">
                <div className="fav-empty-heart">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="64" height="64">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="fav-empty-dots">
                  <span/><span/><span/>
                </div>
              </div>
              <h2 className="fav-empty-title">Sua lista está vazia</h2>
              <p className="fav-empty-text">
                Toque no coração ♥ em qualquer item do cardápio<br />
                para salvá-lo aqui e pedir mais rápido depois.
              </p>
              <div className="fav-empty-tips">
                <div className="fav-tip">
                  <span>🍕</span>
                  <p>Pizzas artesanais a partir de R$ 24</p>
                </div>
                <div className="fav-tip">
                  <span>🍫</span>
                  <p>Crepes suíços irresistíveis</p>
                </div>
                <div className="fav-tip">
                  <span>🫐</span>
                  <p>Açaí com coberturas à sua escolha</p>
                </div>
              </div>
              <button className="fav-cta-btn" onClick={() => setActiveSection("menu")}>
                Explorar Cardápio
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ) : (
            /* Favorites Grid */
            <div className="fav-content">
              <div className="fav-grid">
                {ALL_ITEMS.filter(item => favorites.includes(item.id)).map((item) => (
                  <FavCard
                    key={item.id}
                    item={item}
                    onAdd={addToCart}
                    onFavorite={handleFavorite}
                  />
                ))}
              </div>
              <div className="fav-footer-hint">
                <button className="fav-more-btn" onClick={() => setActiveSection("menu")}>
                  + Ver mais itens do cardápio
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === "menu" && (
        <>
          <Toolbar
            category={category}
            setCategory={setCategory}
            query={query}
            setQuery={setQuery}
          />

          <div className="main-layout">
            <div className="menu-col">
              {Object.keys(grouped).length === 0 && (
                <div className="no-results">
                  <span className="big">🔍</span>
                  Nenhum item encontrado para &ldquo;{query}&rdquo;
                </div>
              )}
              {Object.entries(grouped).map(([cat, items], si) => (
                <div
                  className="section-block"
                  key={cat}
                  style={{ animationDelay: `${si * 0.06}s` }}
                >
                  <div className="section-head">
                    <h3>{cat}</h3>
                    <span className="section-count">{items.length}</span>
                  </div>
                  <div className="section-items">
                    {items.map((it) => (
                      <ItemCard 
                        key={it.id} 
                        item={it} 
                        onAdd={addToCart}
                        onFavorite={handleFavorite}
                        isFavorited={favorites.includes(it.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-col">
              <CartPanel
                cart={cart}
                form={form}
                setForm={setForm}
                onInc={inc}
                onDec={dec}
                onClear={clearCart}
                onOpenPaymentModal={openPaymentModal}
              />
            </div>
          </div>
        </>
      )}

      {activeSection === "about" && <AboutUs />}

      {activeSection === "cart" && (
        <ShoppingCartPage
          cart={cart}
          form={form}
          setForm={setForm}
          onInc={inc}
          onDec={dec}
          onClear={clearCart}
          onOpenPaymentModal={openPaymentModal}
        />
      )}

      <div
        className={`mobile-cart-overlay${mobileCart ? " show" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileCart(false);
        }}
      >
        <div className="mobile-cart-sheet">
          <div className="sheet-handle" />
          <CartPanel
            cart={cart}
            form={form}
            setForm={setForm}
            onInc={inc}
            onDec={dec}
            onClear={clearCart}
            onOpenPaymentModal={openPaymentModal}
          />
        </div>
      </div>

      {addonModalItem && (
        <AddonsModal
          item={addonModalItem}
          addons={ADDONS}
          onConfirm={(itemWithAddons) => {
            handleAddonConfirm(itemWithAddons);
            if (itemWithAddons.category === "Promoção") setActiveSection("menu");
          }}
          onClose={() => setAddonModalItem(null)}
        />
      )}

      {comboModalItem && (
        <ComboModal
          item={comboModalItem}
          onConfirm={handleComboConfirm}
          onClose={() => setComboModalItem(null)}
        />
      )}

      {acaiModalItem && (
        <AcaiModal
          item={acaiModalItem}
          onConfirm={handleAcaiConfirm}
          onClose={() => setAcaiModalItem(null)}
        />
      )}

      {paymentModalOpen && (
        <PaymentModal
          cart={cart}
          form={form}
          setForm={setForm}
          onConfirm={sendWA}
          onClose={closePaymentModal}
          subtotal={currentSubtotal}
        />
      )}

      <Toast message={toast} />
    </>
  );
}