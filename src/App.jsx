import React, { useState } from 'react';
import MobileNavbar from './components/Layout/MobileNavbar';
import CatalogPage from './features/catalog/CatalogPage';
import TopNavbar from './components/Layout/TopNavbar';
import Home from './pages/Home';
import { Plane, ShoppingBag, User, Layers, HelpCircle } from 'lucide-react';
import GroupagePage from './features/groupage/GroupagePage';


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

// --- SIMULATION DES CONTEXTES (En attendant l'écriture des fichiers dédiés dans src/context/) ---
// Ces placeholders permettent à l'application de tourner immédiatement sans crash.
const CartProvider = ({ children }) => children;
const GroupageProvider = ({ children }) => children;
const UserProvider = ({ children }) => children;

export default function App() {
  // Système de navigation local fluide
  const [currentPage, setCurrentPage] = useState('home');
  const [quantities, setQuantities] = useState({});

  const handleQtyChange = (id, change) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + change);
      return { ...prev, [id]: next };
    });
  };

  // Fonction de rendu conditionnel des pages
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'catalog':
        return <CatalogPage 
          products={MOCK_PRODUCTS} 
          quantities={quantities} 
          onQtyChange={handleQtyChange} 
        />;
      case 'groupage':
        return <GroupagePage />;
      default:
        return <Home />;
    }
  };

  return (
    <UserProvider>
      <GroupageProvider>
        <CartProvider>
          <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500/30 selection:text-amber-300">
            {/* 1. Injection de la barre globale (toujours visible) */}
            

            {/* BARRE DE NAVIGATION COMMUNE (Mobile-First / Sticky) */}
            {/* Change la classe 'flex' par 'hidden md:flex' pour la masquer sur petit écran */}
            <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 z-50 px-4 md:px-8">
              <div className="max-w-7xl mx-auto h-full flex items-center justify-between">

                {/* LOGO */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm">
                    JC
                  </div>
                  <span className="font-bold tracking-wider text-sm md:text-base">IMPORT</span>
                </div>

                {/* Liens : Masqués sur mobile (hidden), affichés sur desktop (md:flex) */}
                <div className="hidden md:flex items-center gap-4">
                  <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'text-amber-400' : 'text-gray-400'}>Accueil</button>
                  <button onClick={() => setCurrentPage('catalog')} className={currentPage === 'catalog' ? 'text-amber-400' : 'text-gray-400'}>Catalogue</button>
                  <button onClick={() => setCurrentPage('groupage')} className={currentPage === 'groupage' ? 'text-amber-400' : 'text-gray-400'}>Groupages</button>
                </div>

              </div>
            </nav>

            <TopNavbar 
              products={MOCK_PRODUCTS} 
              quantities={quantities} 
              onQtyChange={handleQtyChange} 
            />

            {/* ZONE DE CONTENU DYNAMIQUE */}
            <main >
              {renderPage()}
              
            </main>

            {/* ASSISTANT CHATBOT FLOTTANT (Global, repositionné pour éviter la barre mobile) */}
            <div className="fixed bottom-20 md:bottom-6 right-4 z-50">
              <button 
                onClick={() => alert("Le mini-chatbot basé sur l'arbre de décision arrive dans les prochains composants ! Spoilers : il lit le localStorage.")}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 hover:scale-110 active:scale-95 transition-transform"
                aria-label="Ouvrir l'assistant"
              >
                <HelpCircle size={24} />
              </button>
            </div>
            

          </div>

          {/* BARRE MOBILE BASSE */}
         <MobileNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </CartProvider>
      </GroupageProvider>
    </UserProvider>
  );
}


//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
      

//       {/* 2. Zone de contenu de la page avec un espacement haut pour la Navbar (pt-24) */}
//       <main className="pt-24">
//         <CatalogPage 
//           products={MOCK_PRODUCTS} 
//           quantities={quantities} 
//           onQtyChange={handleQtyChange} 
//         />
//       </main>
//      <MobileNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

//     </div>
//   );
// }