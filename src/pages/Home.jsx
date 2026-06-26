import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Users, 
  ArrowRight, 
  ShoppingBag, 
  MessageSquare, 
  ShieldCheck, 
  Globe, 
  TrendingUp, 
  Layers 
} from 'lucide-react';

export default function Home() {
  // Variantes d'animation pour les conteneurs (Stagger effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // Variantes pour les éléments individuels
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Animation de floating pour les badges/éléments logistiques
  const floatingAnimation = (delay = 0) => ({
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: delay
    }
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION & BLOCS FLOTTANTS (Mobile Optimized) */}
      <section className="relative pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 min-h-[90vh]">
        
        {/* Arrière-plan lumineux subtil */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Contenu Texte */}
        <motion.div 
          className="w-full lg:w-1/2 space-y-6 z-10 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-400 uppercase tracking-wider mx-auto lg:mx-0">
            <Plane size={14} className="animate-pulse" /> Fret Aérien Chine ➔ Afrique | 2 Semaines
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            L'importation en <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Groupage</span> Réinventée.
          </h1>
          
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
            Achetez en gros ou au détail. Suivez vos cargaisons en temps réel et unissez vos forces pour remplir les conteneurs. **JC Import** propulse votre commerce.
          </p>

          {/* Boutons d'Action Principaux */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 group"
            >
              Explorer le Catalogue 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.03, bg: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-white font-medium px-8 py-4 rounded-xl flex items-center justify-center gap-2"
            >
              Suivre un Vol d'Arrivée
            </motion.button>
          </div>
        </motion.div>

        {/* Visuel & Blocs Flottants Interactifs (Le Clou du Spectacle Mobile + Desktop) */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center h-[380px] md:h-[450px]">
          
          {/* Cercle central JC (Planète/Réseau) */}
          <motion.div 
            className="w-56 h-56 md:w-72 md:h-72 rounded-full border border-slate-800 flex items-center justify-center bg-slate-900/30 backdrop-blur-md relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1.2 }}
          >
            <div className="text-center">
              <span className="block text-3xl md:text-4xl font-black tracking-widest text-amber-400">JC</span>
              <span className="block text-xs font-bold tracking-widest uppercase text-gray-400">IMPORT</span>
            </div>
            {/* Orbite animée */}
            <div className="absolute inset-0 border border-dashed border-amber-500/20 rounded-full animate-[spin_60s_linear_infinite]" />
          </motion.div>

          {/* BLOC FLOTTANT 1 : Indicateur Logistique / Temps */}
          <motion.div 
            animate={floatingAnimation(0)}
            className="absolute top-4 left-4 md:left-12 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 w-48"
          >
            <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400">
              <Plane size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Vol en cours</p>
              <p className="text-sm font-bold">Chine ➔ Douala</p>
              <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded">J-9 restants</span>
            </div>
          </motion.div>

          {/* BLOC FLOTTANT 2 : Jauge de Groupage Collective */}
          <motion.div 
            animate={floatingAnimation(1.5)}
            className="absolute bottom-6 right-4 md:right-12 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-2xl backdrop-blur-md w-56 space-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-amber-400" />
                <span className="text-xs font-bold">Conteneur Aérien</span>
              </div>
              <span className="text-xs font-black text-amber-400">82%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "82%" }}
                transition={{ delay: 1, duration: 1.5 }}
              />
            </div>
            <p className="text-[10px] text-gray-400 text-center">Décollage imminent dès les 100%</p>
          </motion.div>

          {/* BLOC FLOTTANT 3 : Commande Directe WhatsApp rapide */}
          <motion.div 
            animate={floatingAnimation(0.7)}
            className="absolute bottom-12 left-2 md:left-6 bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2 text-xs"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span className="text-gray-300">1 clic ➔ Redirection WhatsApp</span>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS & RENTABILITÉ (Confiance immédiate) */}
      <section className="bg-slate-900/40 border-y border-slate-900 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2 md:gap-6 text-center">
          <div>
            <p className="text-2xl md:text-4xl font-black text-amber-400">14j</p>
            <p className="text-[10px] md:text-xs uppercase tracking-wider text-gray-400 mt-1">Délai Garanti</p>
          </div>
          <div className="border-x border-slate-800">
            <p className="text-2xl md:text-4xl font-black text-white">0%</p>
            <p className="text-[10px] md:text-xs uppercase tracking-wider text-gray-400 mt-1">Tracas Douaniers</p>
          </div>
          <div>
            <p className="text-2xl md:text-4xl font-black text-amber-400">-30%</p>
            <p className="text-[10px] md:text-xs uppercase tracking-wider text-gray-400 mt-1">Frais de Cargo</p>
          </div>
        </div>
      </section>

      {/* 3. L'INNOVATION COMMERCIALE (Les 3 Piliers du Projet) */}
      <section className="py-20 px-4 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Une Plateforme, Zéro Complexité</h2>
          <p className="text-gray-400 text-sm md:text-base">
            Oubliez la gestion fastidieuse sur des dizaines de groupes de discussion. Centralisez tout votre processus d'achat.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Pilier 1 : B2B Hybride */}
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-900 p-8 rounded-2xl hover:border-amber-500/20 transition-colors group">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <ShoppingBag size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Gros & Détail Unifiés</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Commandez à l'unité si vous êtes particulier, ou passez automatiquement au tarif de gros dès que vos quantités franchissent les seuils revendeurs.
            </p>
          </motion.div>

          {/* Pilier 2 : Le Groupage intelligent */}
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-900 p-8 rounded-2xl hover:border-amber-500/20 transition-colors group">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Layers size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Groupage Collaboratif</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Profitez de la puissance de la communauté. Remplissez le cargo aérien ensemble pour diviser les coûts de transport logistique de façon drastique.
            </p>
          </motion.div>

          {/* Pilier 3 : Automatisation WhatsApp */}
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-900 p-8 rounded-2xl hover:border-amber-500/20 transition-colors group">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Validation Instantanée</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pas de rupture de vos habitudes : votre commande génère un récapitulatif ultra-pro envoyé directement sur WhatsApp en un clic pour validation finale.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. VISION FUTURISTE (La promesse de l'écosystème "Alibaba Local") */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto border border-amber-500/20 bg-slate-950/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative z-10">
          
          <div className="space-y-4 md:w-2/3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">Vision Futuriste</span>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Devenez l'infrastructure du e-commerce africain</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Aujourd'hui, JC Import simplifie vos achats. Demain, notre plateforme s'ouvrira pour accueillir vos propres grossistes, revendeurs et boutiques tierces. Vous ne ferez plus seulement du commerce : vous posséderez l'écosystème où tout le monde commande et réserve son espace cargo.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-semibold text-gray-300">
              <div className="flex items-center gap-2"><Globe size={14} className="text-amber-400" /> Réseau National & International</div>
              <div className="flex items-center gap-2"><TrendingUp size={14} className="text-amber-400" /> Multi-vendeurs Évolutif</div>
              <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-amber-400" /> Gestion de Tiers Sécurisée</div>
            </div>
          </div>

          <div className="md:w-1/3 flex justify-center w-full">
            <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800 text-center space-y-4 w-full max-w-[260px]">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center text-slate-950 text-2xl font-black mx-auto shadow-xl shadow-amber-500/10">
                B2B
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Modèle Marketplace</p>
              <div className="h-1 w-12 bg-amber-500 mx-auto rounded" />
              <p className="text-[11px] text-gray-500">Prêt pour le déploiement de votre propre réseau de distribution.</p>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER SIMPLE MINIMALISTE */}
      <footer className="py-8 text-center text-xs text-gray-600 border-t border-slate-900">
        © 2026 JC Import • Propulsé par un Écosystème Logistique Connecté.
      </footer>

    </div>
  );
}