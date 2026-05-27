"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, MapPin, Package, WhatsappLogo, User, Phone, Plus, Minus, Trash } from "@phosphor-icons/react";
import { products } from "@/components/products";

const WA_NUMBER = "917593897129";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function OrderChatbot({ onOpen }: { onOpen?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Expose open function for external triggers
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__oraOpenOrder = () => {
      setIsOpen(true);
      setError("");
      setIsSending(false);
    };
  }, []);

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: 1, 
        image: product.image 
      }];
    });
    setError("");
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const isFormValid = () => {
    if (cart.length === 0) {
      setError("Please add at least one product to your cart");
      return false;
    }
    if (name.trim().length < 2) {
      setError("Please enter your full name");
      return false;
    }
    if (whatsapp.trim().length < 10) {
      setError("Please enter a valid WhatsApp number");
      return false;
    }
    if (address.trim().length < 5) {
      setError("Please enter your delivery address");
      return false;
    }
    if (pincode.trim().length < 6) {
      setError("Please enter a valid pincode");
      return false;
    }
    setError("");
    return true;
  };

  // Professional WhatsApp message format with bold text
  const buildWhatsAppMessage = () => {
    const orderItems = cart.map(item => 
      `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');
    
    const msg = `*NEW ORDER - ORA MILLS*

*ORDER SUMMARY:*
${orderItems}

*TOTAL: ₹${getTotal()}*

*CUSTOMER DETAILS:*
Name: ${name}
WhatsApp: ${whatsapp}
Address: ${address}
Pincode: ${pincode}

Please confirm this order. Thank you!`;
    return encodeURIComponent(msg);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setIsSending(true);
    const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${buildWhatsAppMessage()}`;
    window.open(whatsappUrl, "_blank");
    
    setTimeout(() => {
      setIsOpen(false);
      setIsSending(false);
      setCart([]);
      setName("");
      setWhatsapp("");
      setAddress("");
      setPincode("");
      setError("");
    }, 500);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Floating Trigger Button - RIGHT SIDE - Optimized for mobile */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => { setIsOpen(true); onOpen?.(); }}
        className="fixed bottom-5 sm:bottom-8 right-5 sm:right-8 z-50 group"
        aria-label="Place Order"
      >
        <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[var(--color-deep-green)] border-2 border-[var(--color-soft-gold)] rounded-full shadow-[0_8px_32px_rgba(13,34,20,0.45)] hover:shadow-[0_12px_40px_rgba(197,168,128,0.35)] transition-all duration-500 hover:scale-110">
          <span className="absolute inset-0 rounded-full border-2 border-[var(--color-soft-gold)] animate-ping opacity-60" />
          <ShoppingBag size={24} weight="fill" className="text-[var(--color-soft-gold)] group-hover:scale-110 transition-transform duration-300" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[var(--color-soft-gold)] text-[var(--color-deep-green)] text-[10px] font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 sm:mb-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-[var(--color-deep-green)] border border-[var(--color-soft-gold)]/30 text-white text-[9px] sm:text-[10px] uppercase tracking-[0.2em] rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg hidden sm:block">
          🛒 Place Order
        </span>
      </motion.button>

      {/* Order Form Modal - CENTERED - Mobile Optimized */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] sm:w-[90%] max-w-[650px] bg-gradient-to-br from-[#0A1A12] to-[#05100A] border border-[var(--color-soft-gold)]/20 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
              style={{ maxHeight: "90vh" }}
            >
              {/* Header - Mobile Optimized */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--color-soft-gold)]/15 bg-gradient-to-r from-[var(--color-deep-green)] to-[#0a1a10] flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-soft-gold)]/15 border-2 border-[var(--color-soft-gold)]/40 flex items-center justify-center">
                    <ShoppingBag size={18} weight="fill" className="text-[var(--color-soft-gold)] sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-base sm:text-lg tracking-wide font-medium">Place Your Order</h4>
                    <p className="text-[8px] sm:text-[10px] text-white/40 font-light mt-0.5">Add products and fill your details</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Show total price in header */}
                  {cart.length > 0 && (
                    <div className="mr-2 text-[10px] sm:text-xs text-[var(--color-soft-gold)] font-medium">
                      ₹{getTotal()}
                    </div>
                  )}
                  {cart.length > 0 && (
                    <button
                      onClick={() => setShowCart(!showCart)}
                      className="relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[var(--color-soft-gold)]/10 text-[var(--color-soft-gold)] text-[10px] sm:text-xs font-medium hover:bg-[var(--color-soft-gold)]/20 transition-all"
                    >
                      🛒 {totalItems} item{totalItems > 1 ? 's' : ''}
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/40 hover:text-white transition-colors duration-200 p-1"
                  >
                    <X size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Form Body - Mobile Scroll Optimized */}
              <div className="px-4 sm:px-6 py-4 sm:py-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 120px)" }}>
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  
                  {/* Cart Summary Toggle */}
                  {showCart && cart.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-white/[0.03] rounded-xl border border-white/15 p-3 sm:p-4 space-y-3"
                    >
                      <h4 className="text-[var(--color-soft-gold)] text-xs sm:text-sm font-medium flex items-center justify-between">
                        Your Cart
                        <button
                          type="button"
                          onClick={() => setShowCart(false)}
                          className="text-white/40 text-[10px] sm:text-xs hover:text-white"
                        >
                          Hide
                        </button>
                      </h4>
                      <div className="space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg bg-white/[0.02]">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center p-1">
                              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white text-[11px] sm:text-xs font-medium">{item.name}</p>
                              <p className="text-[var(--color-soft-gold)] text-[9px] sm:text-[10px]">₹{item.price} x {item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/20 text-white/60 hover:border-[var(--color-soft-gold)]/60 hover:text-white flex items-center justify-center"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="text-white text-[11px] sm:text-xs w-5 text-center">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/20 text-white/60 hover:border-[var(--color-soft-gold)]/60 hover:text-white flex items-center justify-center"
                              >
                                <Plus size={10} />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-400/60 hover:text-red-400"
                              >
                                <Trash size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-white/10 flex justify-between">
                        <span className="text-white/60 text-xs sm:text-sm">Total</span>
                        <span className="text-[var(--color-soft-gold)] font-bold text-sm sm:text-base">₹{getTotal()}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Products Section - Mobile Optimized */}
                  <div>
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[var(--color-soft-gold)] font-medium block mb-3">
                      Select Products
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {products.map((product) => {
                        const cartItem = cart.find((item) => item.id === product.id);
                        return (
                          <div
                            key={product.id}
                            className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/15 hover:border-white/30 transition-all duration-300"
                          >
                            {/* Product Image - Mobile size */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            
                            {/* Product Info */}
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                <h4 className="text-white text-xs sm:text-sm font-medium">{product.name}</h4>
                                {product.badge && (
                                  <span className={`text-[6px] sm:text-[8px] px-1.5 sm:px-2 py-0.5 rounded-full ${
                                    product.badge === "Best Value" 
                                      ? "bg-[var(--color-soft-gold)] text-[var(--color-deep-green)]"
                                      : product.badge === "New"
                                      ? "bg-emerald-500/20 text-emerald-400"
                                      : "bg-white/10 text-white/40"
                                  }`}>
                                    {product.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[9px] sm:text-[10px] text-white/40">{product.size}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-[var(--color-soft-gold)] text-xs sm:text-sm font-bold">₹{product.price}</p>
                                {product.originalPrice && (
                                  <p className="text-[8px] sm:text-[9px] text-white/30 line-through">₹{product.originalPrice}</p>
                                )}
                              </div>
                            </div>
                            
                            {/* Quantity Controls - Mobile Optimized */}
                            <div className="flex items-center gap-1 sm:gap-2">
                              {cartItem ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 text-white/60 hover:border-[var(--color-soft-gold)]/60 hover:text-white transition-all duration-200 flex items-center justify-center"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="text-white text-xs sm:text-sm w-6 sm:w-8 text-center">{cartItem.quantity}</span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 text-white/60 hover:border-[var(--color-soft-gold)]/60 hover:text-white transition-all duration-200 flex items-center justify-center"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => addToCart(product)}
                                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[var(--color-soft-gold)]/15 text-[var(--color-soft-gold)] text-[10px] sm:text-xs font-medium hover:bg-[var(--color-soft-gold)]/30 transition-all duration-300"
                                >
                                  Add
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Customer Details Section */}
                  <div className="pt-2">
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[var(--color-soft-gold)] font-medium block mb-3">
                      Your Details
                    </label>
                    <div className="space-y-3">
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full Name *"
                          className="w-full bg-white/[0.04] border border-white/15 focus:border-[var(--color-soft-gold)]/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-light placeholder:text-white/25 focus:outline-none transition-all duration-300"
                        />
                      </div>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value.replace(/[^0-9+]/g, ""))}
                          placeholder="WhatsApp Number *"
                          className="w-full bg-white/[0.04] border border-white/15 focus:border-[var(--color-soft-gold)]/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-light placeholder:text-white/25 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div>
                    <label className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[var(--color-soft-gold)] font-medium block mb-3">
                      Delivery Address
                    </label>
                    <div className="space-y-3">
                      <div className="relative">
                        <MapPin size={14} className="absolute left-3 top-3 text-white/30" />
                        <textarea
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Complete Address *"
                          rows={2}
                          className="w-full bg-white/[0.04] border border-white/15 focus:border-[var(--color-soft-gold)]/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-light placeholder:text-white/25 focus:outline-none transition-all duration-300 resize-none"
                        />
                      </div>
                      <div className="relative">
                        <Package size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ""))}
                          placeholder="Pincode *"
                          maxLength={6}
                          className="w-full bg-white/[0.04] border border-white/15 focus:border-[var(--color-soft-gold)]/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-light placeholder:text-white/25 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Display Total Price in Form */}
                  {cart.length > 0 && (
                    <div className="pt-2 border-t border-white/15">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] sm:text-xs text-white/60 font-light">Total Amount</span>
                        <span className="text-base sm:text-lg font-serif font-bold text-[var(--color-soft-gold)]">₹{getTotal()}</span>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-[10px] sm:text-xs text-center bg-red-400/10 py-2 rounded-lg"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Submit Button - Mobile Optimized */}
                  <motion.button
                    type="submit"
                    disabled={isSending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-medium bg-gradient-to-r from-[var(--color-soft-gold)] to-[#d4b87a] text-[var(--color-deep-green)] hover:from-white hover:to-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <WhatsappLogo size={16} weight="fill" className="sm:w-5 sm:h-5" />
                    {isSending ? "Opening WhatsApp..." : "Place Order via WhatsApp"}
                  </motion.button>

                  <p className="text-center text-[8px] sm:text-[9px] text-white/25 font-light">
                    By placing order, you agree to our terms and conditions
                  </p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}