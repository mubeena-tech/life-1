import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { X, Bell, Ambulance, Building2, MapPin, FileCheck, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function NotificationDrawer() {
  const { notifications, isNotificationOpen, setIsNotificationOpen, setUnreadCount } = useEmergency();

  if (!isNotificationOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'ambulance':
        return <Ambulance className="w-4 h-4 text-amber-600" />;
      case 'hospital':
        return <Building2 className="w-4 h-4 text-emerald-600" />;
      case 'map':
        return <MapPin className="w-4 h-4 text-rose-600" />;
      case 'handover':
        return <FileCheck className="w-4 h-4 text-indigo-600" />;
      case 'sync':
        return <RefreshCw className="w-4 h-4 text-cyan-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  const handleClose = () => {
    setIsNotificationOpen(false);
    setUnreadCount(0);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Emergency Coordination Feed</h3>
              <p className="text-xs text-slate-500">Live operational alerts & status changes</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-slate-100 mt-0.5 shrink-0">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  {notif.text}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-mono text-slate-600">
                    {notif.time}
                  </span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Connected to State Emergency Dispatch Hub</span>
          <button
            onClick={handleClose}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700"
          >
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  );
}
