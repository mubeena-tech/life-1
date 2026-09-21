import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function OfflineBar() {
  const { offlineStatus, pendingSyncCount, toggleOffline } = useEmergency();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleOffline}
        title="Click to simulate Online / Offline field network behavior"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm border ${
          offlineStatus === 'ONLINE'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            : offlineStatus === 'OFFLINE'
            ? 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100 animate-pulse'
            : offlineStatus === 'SYNCING'
            ? 'bg-amber-50 text-amber-700 border-amber-300'
            : 'bg-emerald-500 text-white border-emerald-600'
        }`}
      >
        {offlineStatus === 'ONLINE' && (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Wifi className="w-3.5 h-3.5" />
            <span>ONLINE</span>
          </>
        )}

        {offlineStatus === 'OFFLINE' && (
          <>
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
            </span>
            <WifiOff className="w-3.5 h-3.5" />
            <span>OFFLINE</span>
            <span className="bg-rose-200 text-rose-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-0.5">
              {pendingSyncCount} waiting to sync
            </span>
          </>
        )}

        {offlineStatus === 'SYNCING' && (
          <>
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
            <span>SYNCING...</span>
            <span className="text-[10px] text-amber-600">Syncing local cache</span>
          </>
        )}

        {offlineStatus === 'SYNCED' && (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span>SYNCED</span>
          </>
        )}
      </button>
    </div>
  );
}
