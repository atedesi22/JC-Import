import React from 'react';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, Layers, User } from 'lucide-react';

export default function MobileNavbar({ currentPage, setCurrentPage }) {
  // Liste des onglets de navigation basse
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'catalog', label: 'Catalogue', icon: ShoppingBag },
    { id: 'groupage', label: 'Groupages', icon: Layers },
    { id: 'dashboard', label: 'Vision B2B', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-lg border-t border-slate-900 z-50 px-2 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className="relative flex flex-col items-center justify-center w-16 h-full gap-1 text-center focus:outline-none"
            >
              {/* Icône avec effet de scale au clic */}
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                className={`${isActive ? 'text-amber-400' : 'text-gray-500'}`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>

              {/* Label de l'onglet */}
              <span
                className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-amber-400 font-bold' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>

              {/* Pilule dorée flottante en arrière-plan ou en dessous pour marquer l'état actif */}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute -top-0 w-8 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}