import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, MessageSquare, Plus, Minus, CheckCircle, HelpCircle } from 'lucide-react';

// Mock data des articles importés de Chine (Délai 2 semaines)
const MOCK_PRODUCTS = [
  { id: 1, name: "Mèches Remy Hair Grade 12A", detailPrice: 25000, wholesalePrice: 18000, minWholesaleQty: 5, unit: "paquet", image: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=400&auto=format&fit=crop&q=60" },
  { id: 2, name: "Chaussures Sneakers Luxe", detailPrice: 18000, wholesalePrice: 12000, minWholesaleQty: 8, unit: "paire", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60" },
  { id: 3, name: "Sacs à Main Tendance Croco", detailPrice: 15000, wholesalePrice: 9500, minWholesaleQty: 6, unit: "pièce", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=60" }
];

export default function CatalogPage() {
  const [quantities, setQuantities] = useState({});
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  const handleQtyChange = (id, change) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + change);
      return { ...prev, [id]: next };
    });
  };

  // Calculs dynamiques du panier
  const cartItems = MOCK_PRODUCTS.map(p => {
    const qty = quantities[p.id] || 0;
    const isWholesale = qty >= p.minWholesaleQty;
    const priceToApply = isWholesale ? p.wholesalePrice : p.detailPrice;
    return { ...p, qty, isWholesale, total: qty * priceToApply };
  }).filter(item => item.qty > 0);

  const totalCart = cartItems.reduce((sum, item) => sum + item.total, 0);

  // Génération et redirection WhatsApp
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
    message += `_Délai estimé : ~2 semaines par Fret Aérien (Chine ➔ Local)_`;

    const encodedMessage = encodeURIComponent(message);
    // Numéro test ou celui de ton amie à configurer
    window.open(`https://wa.me/237600000000?text=${encodedMessage}`, '_blank');
    
    setShowOrderSuccess(true);
    setQuantities({});
    setTimeout(() => setShowOrderSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 pb-28 px-4 max-w-7xl mx-auto">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight">Catalogue JC Import</h1>
        <p className="text-gray-400 text-sm mt-1">Ajustez les quantités pour basculer automatiquement au tarif Grossiste.</p>
      </div>

      {/* Grid Catalogue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Liste des Produits en Grille Premium */}
<div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-1 h-fit">
  {MOCK_PRODUCTS.map((product) => {
    const currentQty = quantities[product.id] || 0;
    const isWholesaleActive = currentQty >= product.minWholesaleQty;
    
    // Calcul du pourcentage d'économie pour valoriser le prix de gros
    const economy = Math.round(((product.detailPrice - product.wholesalePrice) / product.detailPrice) * 100);

    return (
      <motion.div 
        key={product.id}
        className="bg-slate-900/40 border border-slate-900/80 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-amber-500/20 transition-all duration-300 shadow-xl"
        layout
      >
        {/* Zone Image avec Badges flottants */}
        <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          
          {/* Badge d'économie sur le prix de gros */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
            -{economy}% en Gros
          </div>

          {/* Indicateur de statut de prix en temps réel */}
          {currentQty > 0 && (
            <div className={`absolute bottom-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-md shadow backdrop-blur-md border ${
              isWholesaleActive 
                ? 'bg-amber-500 text-slate-950 border-amber-400' 
                : 'bg-slate-900/90 text-amber-400 border-slate-800'
            }`}>
              {isWholesaleActive ? '⚡ Tarif Gros Activé' : '🛍️ Mode Détail'}
            </div>
          )}
        </div>

        {/* Zone Infos & Prix */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <h3 className="font-bold text-base text-gray-100 line-clamp-2 min-h-[3rem]">
              {product.name}
            </h3>
            
            {/* Double Affichage des Prix Vertical */}
            <div className="space-y-1 bg-slate-950/50 p-2.5 rounded-xl border border-slate-900">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-gray-500">Prix à l'unité (Détail) :</span>
                <span className={`text-xs font-bold ${!isWholesaleActive && currentQty > 0 ? 'text-amber-400' : 'text-gray-400'}`}>
                  {product.detailPrice.toLocaleString()} XAF
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-900/60 pt-1.5 mt-1">
                <span className="text-[11px] text-gray-400 font-medium">Prix Grossiste (Gros) :</span>
                <span className={`text-sm font-black ${isWholesaleActive ? 'text-amber-400' : 'text-white'}`}>
                  {product.wholesalePrice.toLocaleString()} XAF
                </span>
              </div>
            </div>
            
            <p className="text-[10px] text-gray-500 text-center sm:text-left">
              *Seuil grossiste minimum : <span className="text-gray-400 font-bold">{product.minWholesaleQty} {product.unit}s</span>
            </p>
          </div>

          {/* Sélecteur de Quantité Style "Bouton Panier" */}
          <div className="pt-2">
            {currentQty === 0 ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleQtyChange(product.id, 1)}
                className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-gray-200 hover:text-white text-xs font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={14} className="text-amber-400" /> Ajouter au panier
              </motion.button>
            ) : (
              <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-1 rounded-xl">
                <button 
                  onClick={() => handleQtyChange(product.id, -1)} 
                  className="p-2 hover:bg-slate-900 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  <Minus size={14} />
                </button>
                <div className="text-center">
                  <span className="block text-xs font-bold">{currentQty} {product.unit}s</span>
                </div>
                <button 
                  onClick={() => handleQtyChange(product.id, 1)} 
                  className="p-2 hover:bg-slate-900 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  })}
</div>

        {/* Panier & Sommaire */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 h-fit sticky top-24 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <ShoppingCart className="text-amber-400" size={20} />
            <h2 className="text-lg font-bold">Récapitulatif de Commande</h2>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">Votre panier est vide. Modifiez les quantités pour commencer.</p>
          ) : (
            <>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs border-b border-slate-800/40 pb-2">
                    <div>
                      <p className="font-semibold text-gray-200">{item.name}</p>
                      <p className="text-gray-400 mt-0.5">
                        {item.qty} {item.unit}(s) x {item.isWholesale ? item.wholesalePrice.toLocaleString() : item.detailPrice.toLocaleString()}
                      </p>
                    </div>
                    <span className={`font-bold ${item.isWholesale ? 'text-amber-400' : 'text-white'}`}>
                      {item.total.toLocaleString()} XAF
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">Total Estimé :</span>
                <span className="text-xl font-black text-amber-400">{totalCart.toLocaleString()} XAF</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendWhatsApp}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageSquare size={18} />
                Envoyer sur WhatsApp
              </motion.button>
            </>
          )}
        </div>

      </div>

      {/* Alerte Toast Succès */}
      <AnimatePresence>
        {showOrderSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 bg-slate-900 border border-green-500/30 p-4 rounded-2xl flex items-center gap-3 shadow-2xl z-50 md:max-w-md"
          >
            <CheckCircle className="text-green-400 shrink-0" size={24} />
            <div>
              <p className="text-sm font-bold">Redirection WhatsApp lancée !</p>
              <p className="text-xs text-gray-400 mt-0.5">Votre panier a été réinitialisé. Suivez l'arrivée du prochain vol dans l'onglet Groupages.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}