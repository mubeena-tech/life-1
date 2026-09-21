import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import OfflineBar from '../common/OfflineBar';
import { 
  HeartPulse, 
  Sparkles, 
  Bell, 
  LayoutDashboard, 
  Activity, 
  Building2, 
  Ambulance, 
  FileText, 
  MapPin, 
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentView, 
    setCurrentView, 
    unreadCount, 
    setIsNotificationOpen, 
    startSihDemo, 
    activeCase 
  } = useEmergency();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Advisory Banner */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        <span>Works alongside existing emergency services such as 108/112 — not a replacement.</span>
        <span className="text-slate-400 hidden sm:inline">|</span>
        <span className="text-slate-400 hidden sm:inline">AI organizes information & does not diagnose.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  LIFE<span className="text-rose-600">LINK</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 tracking-wider">
                  SIH PROTOTYPE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-tight -mt-0.5">
                From the first call to hospital handover
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                currentView === 'landing'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Command Center</span>
            </button>

            <button
              onClick={() => setCurrentView('intake')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                currentView === 'intake' || currentView === 'dispatcher'
                  ? 'bg-rose-50 text-rose-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Emergency Intake</span>
            </button>

            <button
              onClick={() => setCurrentView('livemap')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                currentView === 'livemap'
                  ? 'bg-rose-50 text-rose-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Live Map</span>
            </button>

            <button
              onClick={() => setCurrentView('ambulances')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                currentView === 'ambulances' || currentView === 'monitoring'
                  ? 'bg-rose-50 text-rose-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Ambulance className="w-3.5 h-3.5" />
              <span>Ambulances</span>
            </button>

            <button
              onClick={() => setCurrentView('hospitalmatching')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                currentView === 'hospitalmatching' || currentView === 'hospitalDashboard'
                  ? 'bg-rose-50 text-rose-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Hospitals</span>
            </button>

            <button
              onClick={() => setCurrentView('records')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                currentView === 'records' || currentView === 'handover'
                  ? 'bg-rose-50 text-rose-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Patient Records</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            
            {/* Offline Simulation Control */}
            <OfflineBar />

            {/* SIH Demo Mode Button */}
            <button
              onClick={startSihDemo}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white shadow-md shadow-rose-500/20 transition transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH Demo Mode</span>
            </button>

            {/* Notifications Button */}
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Quick Action / Login */}
            {currentView === 'landing' ? (
              <button
                onClick={() => setCurrentView('dashboard')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition"
              >
                <span>Dispatch Login</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  ED
                </div>
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-slate-800">Operator S. Roy</div>
                  <div className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>State Dispatch Hub</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
