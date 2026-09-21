import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { 
  LayoutDashboard, 
  AlertOctagon, 
  Ambulance, 
  Building2, 
  Users, 
  MapPin, 
  FileCheck, 
  Bell, 
  FileSpreadsheet, 
  Settings,
  Sparkles,
  Radio,
  ArrowRight
} from 'lucide-react';

export default function Sidebar() {
  const { currentView, setCurrentView, startSihDemo, setIsNotificationOpen, unreadCount } = useEmergency();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'intake', label: 'AI Emergency Intake', icon: Radio, badge: 'Live' },
    { id: 'dispatcher', label: 'Human Verification', icon: AlertOctagon },
    { id: 'cases', label: 'Emergency Cases', icon: AlertOctagon, count: 12 },
    { id: 'ambulances', label: 'Ambulances Fleet', icon: Ambulance, count: 8 },
    { id: 'livemap', label: 'Live Map & Routes', icon: MapPin },
    { id: 'hospitalmatching', label: 'Hospital Matching', icon: Building2 },
    { id: 'monitoring', label: 'Ambulance Monitoring', icon: Ambulance },
    { id: 'handover', label: 'Digital Handover', icon: FileCheck },
    { id: 'records', label: 'Patient Records (EHR)', icon: Users },
    { id: 'hospitalDashboard', label: 'Hospital ED View', icon: Building2 },
    { id: 'audit', label: 'Audit Logs', icon: FileSpreadsheet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shrink-0 h-[calc(100vh-4.25rem)] sticky top-17">
      
      {/* Demo launcher card */}
      <div className="p-3">
        <div className="p-3 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl shadow-xs border border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH Evaluation</span>
            </span>
            <span className="text-[10px] bg-rose-500/30 text-rose-300 px-1.5 py-0.5 rounded border border-rose-400/30 font-semibold">
              Ready
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1.5 leading-snug">
            Run complete 8-step incident lifecycle demo for judges.
          </p>
          <button
            onClick={startSihDemo}
            className="mt-2.5 w-full py-1.5 px-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <span>Run SIH Demo Mode</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main navigation list */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'notifications') {
                  setIsNotificationOpen(true);
                } else {
                  setCurrentView(item.id);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              
              {item.badge && (
                <span className="bg-rose-100 text-rose-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
              {item.count && (
                <span className="bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Dispatcher Station Status Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/70">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div className="text-[11px] font-medium text-slate-600">
            Node: <span className="font-mono text-slate-900 font-bold">BLR-CENTRAL-01</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-500 mt-1">
          Synced with 108/112 Central Dispatch Gateway
        </div>
      </div>

    </aside>
  );
}
