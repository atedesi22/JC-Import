import React, { useState } from 'react';
import Home from './pages/Home';
import { Plane, ShoppingBag, User, Layers, HelpCircle } from 'lucide-react';
import MobileNavbar from './components/Layout/MobileNavbar';
import CatalogPage from './features/catalog/CatalogPage';
import GroupagePage from './features/groupage/GroupagePage';


// --- SIMULATION DES CONTEXTES (En attendant l'écriture des fichiers dédiés dans src/context/) ---
// Ces placeholders permettent à l'application de tourner immédiatement sans crash.
const CartProvider = ({ children }) => children;
const GroupageProvider = ({ children }) => children;
const UserProvider = ({ children }) => children;

export default function App() {
  // Système de navigation local fluide
  const [currentPage, setCurrentPage] = useState('home');

  // Fonction de rendu conditionnel des pages
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      // case 'catalog':
      //   return (
      //     <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-20">
      //       <ShoppingBag size={48} className="text-amber-400 mb-4 animate-bounce" />
      //       <h2 className="text-2xl font-bold mb-2">Catalogue JC Import</h2>
      //       <p className="text-gray-400 max-w-md">Le catalogue interactif avec bascule automatique des prix Gros & Détail arrive dans la prochaine étape !</p>
      //     </div>
      //   );
      // case 'groupage':
      //   return (
      //     <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-20">
      //       <Plane size={48} className="text-amber-400 mb-4" />
      //       <h2 className="text-2xl font-bold mb-2">Suivi des Vols & Groupages</h2>
      //       <p className="text-gray-400 max-w-md">Le panneau logistique avec compte à rebours dynamique de 2 semaines arrive très vite.</p>
      //     </div>
      //   );
      case 'catalog':
        return <CatalogPage />;
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

            {/* ZONE DE CONTENU DYNAMIQUE */}
            <main>
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