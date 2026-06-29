import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, MessageSquare, Plus, Minus } from 'lucide-react';

export default function TopNavbar({ products, quantities, onQtyChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Construction dynamique du panier
  const cartItems = products.map(p => {
    const qty = quantities[p.id] || 0;
    const isWholesale = qty >= p.minWholesaleQty;
    const priceToApply = isWholesale ? p.wholesalePrice : p.detailPrice;
    return { ...p, qty, isWholesale, total: qty * priceToApply };
  }).filter(item => item.qty > 0);

  const totalCart = cartItems.reduce((sum, item) => sum + item.total, 0);
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleSendWhatsApp = () => {
    if (cartItems.length === 0) return;

    let message = `*COMMANDE JC IMPORT*\n`;
    message += `=========================\n\n`;
    cartItems.forEach(item => {
      const typeLabel = item.isWholesale ? "📦 GROS" : "🛍️ DÉTAIL";
      message += `• *${item.name}*\n  Qté : ${item.qty} ${item.unit}(s) [${typeLabel}]\n  Prix : ${item.total.toLocaleString()} XAF\n\n`;
    });
    message += `=========================\n`;
    message += `*Total Estimé : ${totalCart.toLocaleString()} XAF*\n`;
    message += `_Délai estimé : ~2 semaines par Fret Aérien_`;

    window.open(`https://wa.me/237600000000?text=${encodeURIComponent(message)}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <>
      {/* BARRE DE NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 z-50 px-4">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          
          {/* Logo JC Import */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-lg flex items-center justify-center font-black text-slate-950 text-sm tracking-wider">
              JC
            </div>
            <span className="font-bold tracking-tight text-sm">
              JC Import <span className="text-amber-400 text-xs font-medium"></span>
            </span>
          </div>

          {/* Bouton Panier */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="p-2.5 bg-slate-900/60 border border-slate-900 hover:border-slate-850 rounded-xl transition-colors flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <div className="relative">
              <ShoppingCart size={19} className="text-amber-400" />
              <AnimatePresence mode="popLayout">
                {totalItemsCount > 0 && (
                  <motion.span
                    key={totalItemsCount}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    className="absolute -top-2.5 -right-2.5 bg-red-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {totalCart > 0 && (
              <span className="text-xs font-bold text-gray-200 pl-1 hidden sm:inline">
                {totalCart.toLocaleString()} XAF
              </span>
            )}
          </motion.button>
        </div>
      </nav>

      {/* MODAL PANIER */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[85vh]">
              
              <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="text-amber-400" size={18} />
                  <h2 className="font-bold text-base">Mon Panier Import ({cartItems.length})</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white"><X size={18} /></button>
              </div>

              <div className="p-5 overflow-y-auto flex-1 space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-12">Votre panier est vide.</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-slate-950/30 p-3 rounded-xl border border-slate-950">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-gray-200 truncate">{item.name}</h4>
                        <p className="text-xs font-black text-white mt-1">{item.total.toLocaleString()} XAF</p>
                      </div>
                      <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
                        <button onClick={() => onQtyChange(item.id, -1)} className="p-1.5 hover:bg-slate-900 text-gray-400"><Minus size={12} /></button>
                        <span className="text-[11px] font-bold px-1">{item.qty}</span>
                        <button onClick={() => onQtyChange(item.id, 1)} className="p-1.5 hover:bg-slate-900 text-gray-400"><Plus size={12} /></button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-5 border-t border-slate-800 bg-slate-950/40 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-medium">Total Estimé :</span>
                    <span className="text-lg font-black text-amber-400">{totalCart.toLocaleString()} XAF</span>
                  </div>
                  <button onClick={handleSendWhatsApp} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs tracking-wide">
                    <MessageSquare size={16} /> Valider et Envoyer sur WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}