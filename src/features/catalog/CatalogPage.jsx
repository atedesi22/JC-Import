import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, MessageSquare, Plus, Minus, CheckCircle, Search, X } from 'lucide-react';

// Mock data des articles importés de Chine (Délai 2 semaines)
const MOCK_PRODUCTS = [
  { id: 1, name: "Mèches Remy Hair Grade 12A", detailPrice: 25000, wholesalePrice: 18000, minWholesaleQty: 5, unit: "paquet", image: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=400&auto=format&fit=crop&q=60" },
  { id: 2, name: "Chaussures Sneakers Luxe", detailPrice: 18000, wholesalePrice: 12000, minWholesaleQty: 8, unit: "paire", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60" },
  { id: 3, name: "Sacs à Main Tendance Croco", detailPrice: 15000, wholesalePrice: 9500, minWholesaleQty: 6, unit: "pièce", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=60" },
  { id: 4, name: "Mèches Remy Hair Grade 12A", detailPrice: 25000, wholesalePrice: 18000, minWholesaleQty: 5, unit: "paquet", image: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=400&auto=format&fit=crop&q=60" },
  { id: 5, name: "Chaussures Sneakers Luxe", detailPrice: 18000, wholesalePrice: 12000, minWholesaleQty: 8, unit: "paire", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60" },
  { id: 6, name: "Sacs à Main Tendance Croco", detailPrice: 15000, wholesalePrice: 9500, minWholesaleQty: 6, unit: "pièce", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=60" },
  { id: 7, name: "Mèches Remy Hair Grade 12A", detailPrice: 25000, wholesalePrice: 18000, minWholesaleQty: 5, unit: "paquet", image: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=400&auto=format&fit=crop&q=60" },
  { id: 8, name: "Chaussures Sneakers Luxe", detailPrice: 18000, wholesalePrice: 12000, minWholesaleQty: 8, unit: "paire", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60" },
  { id: 9, name: "Sacs à Main Tendance Croco", detailPrice: 15000, wholesalePrice: 9500, minWholesaleQty: 6, unit: "pièce", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=60" },
  { id: 10, name: "Mèches Remy Hair Grade 12A", detailPrice: 25000, wholesalePrice: 18000, minWholesaleQty: 5, unit: "paquet", image: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=400&auto=format&fit=crop&q=60" },
  { id: 11, name: "Chaussures Sneakers Luxe", detailPrice: 18000, wholesalePrice: 12000, minWholesaleQty: 8, unit: "paire", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60" },
  { id: 12, name: "Sacs à Main Tendance Croco", detailPrice: 15000, wholesalePrice: 9500, minWholesaleQty: 6, unit: "pièce", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=60" },
  { id: 13, name: "Mèches Remy Hair Grade 12A", detailPrice: 25000, wholesalePrice: 18000, minWholesaleQty: 5, unit: "paquet", image: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=400&auto=format&fit=crop&q=60" },
  { id: 14, name: "Chaussures Sneakers Luxe", detailPrice: 18000, wholesalePrice: 12000, minWholesaleQty: 8, unit: "paire", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60" },
  { id: 15, name: "Sacs à Main Tendance Croco", detailPrice: 15000, wholesalePrice: 9500, minWholesaleQty: 6, unit: "pièce", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=60" },
  { id: 16, name: "Mèches Remy Hair Grade 12A", detailPrice: 25000, wholesalePrice: 18000, minWholesaleQty: 5, unit: "paquet", image: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=400&auto=format&fit=crop&q=60" },
  { id: 17, name: "Chaussures Sneakers Luxe", detailPrice: 18000, wholesalePrice: 12000, minWholesaleQty: 8, unit: "paire", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60" },
  { id: 18, name: "Sacs à Main Tendance Croco", detailPrice: 15000, wholesalePrice: 9500, minWholesaleQty: 6, unit: "pièce", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=60" }

];

export default function CatalogPage() {
  const [quantities, setQuantities] = useState({});
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyWholesaleActive, setShowOnlyWholesaleActive] = useState(false);

  // Moteur de recherche et filtre combiné
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const currentQty = quantities[product.id] || 0;
    const matchesWholesaleFilter = showOnlyWholesaleActive ? currentQty >= product.minWholesaleQty : true;
    
    return matchesSearch && matchesWholesaleFilter;
  });

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

  // Calcule la somme totale de toutes les pièces dans le panier
const totalItemsCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // Nombre de produits qui profitent actuellement du tarif de gros
  const countWholesaleActive = MOCK_PRODUCTS.filter(p => (quantities[p.id] || 0) >= p.minWholesaleQty).length;

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

      {/* Top Navbar Premium */}
<nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 z-50 px-4">
  <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
    
    {/* Logo JC Import */}
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-lg flex items-center justify-center font-black text-slate-950 text-sm tracking-wider">
        JC
      </div>
      <span className="font-bold tracking-tight text-sm hidden sm:inline-block">
        JC Import <span className="text-amber-400 text-xs font-medium">Catalog</span>
      </span>
    </div>

    {/* Icône Panier Interactive à l'opposé */}
    <div className="relative group">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          // Si tu veux scroller directement au récapitulatif ou ouvrir un drawer plus tard
          const cartSection = document.getElementById('cart-summary');
          if (cartSection) cartSection.scrollIntoView({ behavior: 'smooth' });
        }}
        className="p-2.5 bg-slate-900/60 border border-slate-900 hover:border-slate-800 rounded-xl transition-colors flex items-center gap-2 text-gray-300 hover:text-white"
      >
        <div className="relative">
          <ShoppingCart size={19} className="text-amber-400" />
          
          {/* Badge Chiffre Animé */}
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

        {/* Montant total discret à côté de l'icône */}
        {totalCart > 0 && (
          <span className="text-xs font-bold text-gray-200 pl-1 hidden xs:inline">
            {totalCart.toLocaleString()} XAF
          </span>
        )}
      </motion.button>
    </div>

  </div>
</nav>

      {/* Grid Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* BARRE DE RECHERCHE & FILTRES INTERACTIFS */}
        <div className="col-span-1 lg:col-span-3 bg-slate-900/20 border border-slate-900/60 p-4 rounded-2xl mb-2 space-y-3">
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-4 text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher un article, une marque..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-900 text-gray-200 placeholder-gray-500 text-sm pl-12 pr-10 py-3.5 rounded-xl focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 text-gray-500 hover:text-gray-300 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 items-center text-xs">
            <span className="text-gray-500 mr-1">Filtres rapides :</span>
            
            <button
              onClick={() => setShowOnlyWholesaleActive(!showOnlyWholesaleActive)}
              className={`px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                showOnlyWholesaleActive
                  ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-medium'
                  : 'bg-slate-950 border-slate-900 text-gray-400 hover:text-gray-200'
              }`}
            >
              ⚡ Tarif Gros Activé ({countWholesaleActive})
            </button>

            {(searchQuery || showOnlyWholesaleActive) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowOnlyWholesaleActive(false);
                }}
                className="text-amber-500/80 hover:text-amber-400 underline underline-offset-4 ml-auto text-[11px]"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>
        
        {/* GRILLE DE PRODUITS (LIÉE AUX FILTRES) */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-1 h-fit">
          <AnimatePresence>
            {filteredProducts.length === 0 ? (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center text-gray-500 text-sm py-12"
              >
                Aucun article ne correspond à votre recherche.
              </motion.p>
            ) : (
              filteredProducts.map((product) => {
                const currentQty = quantities[product.id] || 0;
                const isWholesaleActive = currentQty >= product.minWholesaleQty;
                const economy = Math.round(((product.detailPrice - product.wholesalePrice) / product.detailPrice) * 100);

                return (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="bg-slate-900/40 border border-slate-900/80 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-amber-500/20 transition-all duration-300 shadow-xl"
                  >
                    {/* Image & Badges */}
                    <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                        -{economy}% en Gros
                      </div>

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

                    {/* Contenu et Tarifs */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3 className="font-bold text-base text-gray-100 line-clamp-2 min-h-[3rem]">
                          {product.name}
                        </h3>
                        
                        <div className="space-y-1 bg-slate-950/50 p-2.5 rounded-xl border border-slate-900">
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] text-gray-500">Détail (unité) :</span>
                            <span className={`text-xs font-bold ${!isWholesaleActive && currentQty > 0 ? 'text-amber-400' : 'text-gray-400'}`}>
                              {product.detailPrice.toLocaleString()} XAF
                            </span>
                          </div>
                          <div className="flex justify-between items-center border-t border-slate-900/60 pt-1.5 mt-1">
                            <span className="text-[11px] text-gray-400 font-medium">Grossiste (Gros) :</span>
                            <span className={`text-sm font-black ${isWholesaleActive ? 'text-amber-400' : 'text-white'}`}>
                              {product.wholesalePrice.toLocaleString()} XAF
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-[10px] text-gray-500">
                          *Minimum grossiste : <span className="text-gray-400 font-bold">{product.minWholesaleQty} {product.unit}s</span>
                        </p>
                      </div>

                      {/* Sélecteur quantité */}
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
                            <span className="text-xs font-bold">{currentQty} {product.unit}s</span>
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
              })
            )}
          </AnimatePresence>
        </div>

        {/* PANIER SYNC */}
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

      {/* TOAST SUCCÈS */}
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
              <p className="text-xs text-gray-400 mt-0.5">Votre panier a été réinitialisé.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}