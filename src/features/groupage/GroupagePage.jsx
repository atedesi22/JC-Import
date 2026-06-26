import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Users, Package, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function GroupagePage() {
  // Simuler le taux de remplissage actuel du conteneur logistique
  const [jaugeGroupage, setJaugeGroupage] = useState(78);
  
  // Compte à rebours simulé pour le vol Chine -> Cameroun (Exemple : J-9)
  const [timeLeft, setTimeLeft] = useState({ jours: 9, heures: 14, minutes: 32, secondes: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secondes > 0) return { ...prev, secondes: prev.secondes - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, secondes: 59 };
        if (prev.heures > 0) return { ...prev, heures: prev.heures - 1, minutes: 59, secondes: 59 };
        if (prev.jours > 0) return { ...prev, jours: prev.jours - 1, heures: 23, minutes: 59, secondes: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 pb-28 px-4 max-w-5xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Suivi Logistique & Groupages</h1>
        <p className="text-gray-400 text-sm">Visualisez l'état du cargo aérien en temps réel et suivez le compte à rebours de livraison (Chine ➔ Afrique).</p>
      </div>

      {/* SECTION 1 : LA JAUGE COLLECTIVE (L'outil communautaire) */}
      <div className="bg-slate-900/50 border border-slate-900 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Groupage en cours : Lot Aérien #042</h2>
              <p className="text-xs text-gray-400 mt-0.5">Clôture et décollage automatique dès l'atteinte des 100%</p>
            </div>
          </div>
          <span className="text-3xl font-black text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-2xl self-end sm:self-center">
            {jaugeGroupage}%
          </span>
        </div>

        {/* Barre de progression animée */}
        <div className="space-y-2">
          <div className="w-full bg-slate-950 h-5 rounded-full overflow-hidden p-1 border border-slate-800">
            <motion.div 
              className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 h-full rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${jaugeGroupage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Effet de brillance/vague */}
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </motion.div>
          </div>
          <div className="flex justify-between text-[11px] text-gray-500 font-medium">
            <span>0% (Vide)</span>
            <span className="text-amber-400/80">Encore ~22% pour fermer le colis</span>
            <span>100% (Décollage)</span>
          </div>
        </div>

        {/* Simulation : Bouton d'action pour démo */}
        <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-xl flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <AlertCircle size={14} className="text-amber-400 shrink-0" />
            <span>Simulez un achat pour voir grimper la jauge collective.</span>
          </div>
          <button 
            onClick={() => setJaugeGroupage(prev => Math.min(100, prev + 4))}
            className="bg-slate-900 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg font-bold text-amber-400 whitespace-nowrap transition-colors"
          >
            + Booster la jauge (Démo)
          </button>
        </div>
      </div>

      {/* SECTION 2 : LE VOL EN COURS (Délai de 2 semaines) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Le Compte à Rebours Visuel */}
        <div className="md:col-span-2 bg-slate-900/50 border border-slate-900 rounded-3xl p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
              <Plane size={20} className="rotate-45" />
            </div>
            <div>
              <h3 className="font-bold">Vol Régulier JC-039 (En Route)</h3>
              <p className="text-xs text-gray-400">Provenance : Guangzhou (Chine) ➔ Hub National</p>
            </div>
          </div>

          {/* Les Widgets Chiffres */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: "Jours", val: timeLeft.jours },
              { label: "Heures", val: timeLeft.heures },
              { label: "Min", val: timeLeft.minutes },
              { label: "Sec", val: timeLeft.secondes },
            ].map((t, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                <span className="block text-2xl md:text-3xl font-black text-white">{String(t.val).padStart(2, '0')}</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{t.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 bg-slate-950/40 p-3 rounded-xl border border-slate-900">
            <Clock size={14} className="text-amber-500" />
            <span>Mise à jour automatique de la localisation satellite toutes les 6 heures.</span>
          </div>
        </div>

        {/* Fiche Statut d'Étape (Timeline Express) */}
        <div className="bg-slate-900/50 border border-slate-900 rounded-3xl p-6 space-y-4">
          <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider">Étapes Logistiques</h4>
          
          <div className="space-y-4 relative pl-4 border-l border-slate-800 text-xs">
            <div className="relative">
              <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-green-500" />
              <p className="font-bold text-white">Achat & Groupage Complété</p>
              <p className="text-gray-500 text-[11px]">Entrepôt Shenzhen</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-green-500" />
              <p className="font-bold text-white">Dédouanement Export Chine</p>
              <p className="text-gray-500 text-[11px]">Aéroport Guangzhou</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-amber-500 animate-ping" />
              <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-amber-500" />
              <p className="font-bold text-amber-400">Vol Transit International</p>
              <p className="text-gray-400 text-[11px]">Espace aérien en cours</p>
            </div>
            <div className="relative opacity-40">
              <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-slate-700" />
              <p className="font-bold text-gray-400">Atterrissage & Débarquement</p>
              <p className="text-gray-500 text-[11px]">Aéroport local / Tri</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}