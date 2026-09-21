import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { emergencyCasesList } from '../../data/mockData';
import CaseTimeline from './CaseTimeline';
import { 
  AlertOctagon, 
  Ambulance, 
  Building2, 
  Activity, 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Filter, 
  Play, 
  User, 
  Radio, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function OverviewDashboard() {
  const { 
    activeCase, 
    setCurrentView, 
    startSihDemo, 
    fleet, 
    casePriority, 
    updatePriority 
  } = useEmergency();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredCases = emergencyCasesList.filter(c => {
    const matchesSearch = c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPriority === 'all' || c.priority.toLowerCase() === filterPriority.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cases by ID, patient, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
          />
        </div>

        {/* Priority filter pills & Quick actions */}
        <div className="flex flex-wrap items-center justify-between md:justify-end w-full md:w-auto gap-2.5">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {['all', 'critical', 'high', 'moderate'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-3 py-1 rounded-lg capitalize transition ${
                  filterPriority === p 
                    ? 'bg-white text-slate-900 shadow-xs font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentView('intake')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>New Emergency Intake</span>
          </button>
        </div>

      </div>

      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Active Emergencies */}
        <div 
          onClick={() => setCurrentView('intake')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Emergencies
            </span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 group-hover:scale-110 transition">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">12</div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>3 Critical, 5 High Priority</span>
          </div>
        </div>

        {/* Card 2: Ambulances Available */}
        <div 
          onClick={() => setCurrentView('ambulances')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ambulances Available
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition">
              <Ambulance className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">8</div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Ready for Immediate Dispatch</span>
          </div>
        </div>

        {/* Card 3: Ambulances En Route */}
        <div 
          onClick={() => setCurrentView('livemap')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ambulances En Route
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">5</div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Avg Response: 8.4 Minutes</span>
          </div>
        </div>

        {/* Card 4: Hospitals Connected */}
        <div 
          onClick={() => setCurrentView('hospitalmatching')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-300 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Hospitals Connected
            </span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600 group-hover:scale-110 transition">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">24</div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-sky-700 font-semibold">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span>Integrated EMR Telemetry Link</span>
          </div>
        </div>

      </div>

      {/* Featured Emergency Case Card: LL-10452 Ravi Kumar */}
      <div className="bg-gradient-to-br from-white to-rose-50/40 rounded-3xl p-6 sm:p-7 border-2 border-rose-200 shadow-sm space-y-6">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-rose-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-lg tracking-wider">
                ACTIVE INCIDENT
              </span>
              <span className="text-sm font-mono font-bold text-slate-700">Case ID: {activeCase.id}</span>
              <span className="bg-rose-100 text-rose-800 text-xs font-black px-2.5 py-1 rounded-full uppercase border border-rose-300 animate-pulse">
                {activeCase.status}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              {activeCase.patientName}
            </h2>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Registered via 108/112 Triage Interconnect • ABC Village Government School
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('dispatcher')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 shadow-xs transition"
            >
              Verify Triage
            </button>
            <button
              onClick={() => setCurrentView('ambulances')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
            >
              <Ambulance className="w-3.5 h-3.5" />
              <span>Assign Unit</span>
            </button>
            <button
              onClick={() => setCurrentView('livemap')}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Track Live Map</span>
            </button>
          </div>
        </div>

        {/* Case Attributes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="p-3.5 bg-white rounded-2xl border border-rose-100 shadow-xs">
            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Patient Condition</span>
            <span className="text-xs font-bold text-rose-700 mt-1 block">
              {activeCase.condition}
            </span>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-rose-100 shadow-xs">
            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Incident Location</span>
            <span className="text-xs font-bold text-slate-800 mt-1 block">
              {activeCase.location}
            </span>
            <span className="text-[10px] text-slate-500">{activeCase.landmark}</span>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-rose-100 shadow-xs">
            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Caller Contact</span>
            <span className="text-xs font-bold text-slate-800 mt-1 block">
              {activeCase.callerPhone}
            </span>
            <span className="text-[10px] text-slate-500">{activeCase.callerName}</span>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-rose-100 shadow-xs">
            <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">Incident Time</span>
            <span className="text-xs font-bold text-slate-800 mt-1 block font-mono">
              {activeCase.time}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">Logged 12 min ago</span>
          </div>

        </div>

        {/* Emergency Timeline Component */}
        <CaseTimeline />

      </div>

      {/* Emergency Cases Directory Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Active Incident Dispatch Feed</h3>
            <p className="text-xs text-slate-500">Live operational status across jurisdiction</p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
            Showing {filteredCases.length} Cases
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
              <tr>
                <th className="p-3 rounded-l-lg">Case ID</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Reported Condition</th>
                <th className="p-3">Location</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Assigned Unit</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-lg text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-rose-600">{c.id}</td>
                  <td className="p-3 font-bold text-slate-900">{c.patientName}</td>
                  <td className="p-3 text-slate-600">{c.condition}</td>
                  <td className="p-3 text-slate-600">{c.location}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.priority === 'Critical' 
                        ? 'bg-rose-100 text-rose-700' 
                        : c.priority === 'High'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-slate-800">{c.ambulance || 'Unassigned'}</td>
                  <td className="p-3">
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        if (c.id === 'LL-10452') setCurrentView('dispatcher');
                        else setCurrentView('livemap');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
