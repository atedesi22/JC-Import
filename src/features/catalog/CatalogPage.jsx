import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Plus, Minus } from 'lucide-react';

export default function CatalogPage({ products, quantities, onQtyChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyWholesaleActive, setShowOnlyWholesaleActive] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const currentQty = quantities[product.id] || 0;
    const matchesWholesaleFilter = showOnlyWholesaleActive ? currentQty >= product.minWholesaleQty : true;
    return matchesSearch && matchesWholesaleFilter;
  });

  

  const countWholesaleActive = products.filter(p => (quantities[p.id] || 0) >= p.minWholesaleQty).length;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-28 pt-24 md:pt-28">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight">Catalogue JC Import</h1>
        <p className="text-gray-400 text-sm mt-1">Ajustez les quantités pour basculer automatiquement au tarif Grossiste.</p>
      </div>

      {/* RECHERCHE & FILTRES */}
      <div className="bg-slate-900/20 border border-slate-900/60 p-4 rounded-2xl mb-6 space-y-3">
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
            <button onClick={() => setSearchQuery('')} className="absolute right-4 text-gray-500 hover:text-gray-300"><X size={16} /></button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="text-gray-500 mr-1">Filtres rapides :</span>
          <button
            onClick={() => setShowOnlyWholesaleActive(!showOnlyWholesaleActive)}
            className={`px-3 py-1.5 rounded-lg border transition-all duration-200 ${
              showOnlyWholesaleActive ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-medium' : 'bg-slate-950 border-slate-900 text-gray-400'
            }`}
          >
            ⚡ Tarif Gros Activé ({countWholesaleActive})
          </button>
        </div>
      </div>

      {/* GRILLE PRODUITS PLEINE LARGEUR */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
        <AnimatePresence>
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-sm py-12">Aucun article trouvé.</p>
          ) : (
            filteredProducts.map((product) => {
              const currentQty = quantities[product.id] || 0;
              const isWholesaleActive = currentQty >= product.minWholesaleQty;
              const economy = Math.round(((product.detailPrice - product.wholesalePrice) / product.detailPrice) * 100);

              return (
                <motion.div key={product.id} layout className="bg-slate-900/40 border border-slate-900/80 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-amber-500/20 transition-all duration-300 shadow-xl">
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">-{economy}% en Gros</div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base text-gray-100 line-clamp-2 min-h-[3rem]">{product.name}</h3>
                      <div className="space-y-1 bg-slate-950/50 p-2.5 rounded-xl border border-slate-900">
                        <div className="flex justify-between items-center"><span className="text-[11px] text-gray-500">Détail :</span><span className="text-xs font-bold text-gray-400">{product.detailPrice.toLocaleString()} XAF</span></div>
                        <div className="flex justify-between items-center border-t border-slate-900/60 pt-1.5 mt-1"><span className="text-[11px] text-gray-400">Gros :</span><span className="text-sm font-black text-amber-400">{product.wholesalePrice.toLocaleString()} XAF</span></div>
                      </div>
                    </div>

                    <div className="pt-2">
                      {currentQty === 0 ? (
                        <button onClick={() => onQtyChange(product.id, 1)} className="w-full bg-slate-900 border border-slate-800 text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2"><Plus size={14} className="text-amber-400" /> Ajouter</button>
                      ) : (
                        <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-1 rounded-xl">
                          <button onClick={() => onQtyChange(product.id, -1)} className="p-2 text-gray-400"><Minus size={14} /></button>
                          <span className="text-xs font-bold">{currentQty} {product.unit}s</span>
                          <button onClick={() => onQtyChange(product.id, 1)} className="p-2 text-gray-400"><Plus size={14} /></button>
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
    </div>
  );
}