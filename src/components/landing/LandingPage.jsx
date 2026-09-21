import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { 
  PhoneCall, 
  Sparkles, 
  ShieldAlert, 
  ArrowRight, 
  Activity, 
  Building2, 
  Ambulance, 
  FileCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Radio, 
  Cpu, 
  HeartHandshake
} from 'lucide-react';

export default function LandingPage() {
  const { setCurrentView, startSihDemo } = useEmergency();

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-18">
        {/* Subtle decorative background blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-rose-200/40 blur-[100px] -z-10 rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-sky-200/30 blur-[90px] -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold tracking-wide shadow-xs">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                <span>SIH 2024–2026 Prototype • Smart Emergency Healthcare</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                One Emergency Call. <br />
                <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 bg-clip-text text-transparent">
                  One Connected Response.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                LIFELINK connects emergency intake, ambulance coordination, hospital matching, and digital patient handover — from the first call to the hospital.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => setCurrentView('intake')}
                  className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-rose-600/25 transition transform active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>Emergency Assistance</span>
                </button>

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm border border-slate-200 shadow-sm flex items-center gap-2 transition"
                >
                  <span>Explore Platform</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={startSihDemo}
                  className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>SIH Demo Mode</span>
                </button>
              </div>

              {/* 108 / 112 Co-existence Notice */}
              <div className="pt-3">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100/90 px-3 py-1.5 rounded-lg border border-slate-200">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Works alongside existing emergency services such as 108/112 — not a replacement.</span>
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-black text-slate-900">12</div>
                  <div className="text-xs text-slate-500 font-medium">Active Emergencies</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-rose-600">8</div>
                  <div className="text-xs text-slate-500 font-medium">Available Ambulances</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-600">24</div>
                  <div className="text-xs text-slate-500 font-medium">Connected Hospitals</div>
                </div>
              </div>

            </div>

            {/* Right Illustration Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img 
                  src="/hero-command-center.jpg" 
                  alt="LIFELINK Emergency Operations Center"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition duration-700"
                />

                {/* Floating Telemetry Badge 1: Ambulance ETA */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                    <Ambulance className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Ambulance A01</div>
                    <div className="text-xs font-black text-slate-900">En Route • 9 min ETA</div>
                  </div>
                </div>

                {/* Floating Telemetry Badge 2: Hospital Ready */}
                <div className="absolute bottom-4 right-4 bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-700/80 text-white flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Hospital B Ready</div>
                    <div className="text-xs font-bold text-white">Cath Lab & ICU Activated</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Connected Stages: Caller -> Dispatcher -> Ambulance -> Hospital */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How LIFELINK Coordinates the Chain of Survival
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Eliminating communication drop-offs and lost medical history from the moment 108/112 is dialed until emergency resuscitation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Intake */}
          <div 
            onClick={() => setCurrentView('intake')}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-rose-300 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Radio className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded">
              Stage 1
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">AI-Assisted Intake</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Real-time transcript structured into critical indicators (consciousness, respiration, landmark) without diagnostic guesswork.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
              <span>View Transcript</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Dispatcher */}
          <div 
            onClick={() => setCurrentView('dispatcher')}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">
              Stage 2
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">Human Verification</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Certified human operators review AI triage tags, set clinical priority (Critical, High, Mod, Low), and authorize emergency dispatch.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Open Triage Panel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Ambulance Tracking & Monitoring */}
          <div 
            onClick={() => setCurrentView('monitoring')}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Ambulance className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded">
              Stage 3
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">Telemetry & Voice Logs</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Paramedics record voice updates hands-free. AI parses speech to structured vitals (BP, SpO2, Heart Rate) streamed to the hospital.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
              <span>Paramedic Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Digital Handover */}
          <div 
            onClick={() => setCurrentView('handover')}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <FileCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
              Stage 4
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">Digital Handover</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Seamless transfer of past surgeries, chronic kidney treatment, allergies, and transit vitals directly into the emergency room EMR.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>View Handover Docket</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* Safety & Operational Principles Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Core Operational Safeguards</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Clinical Safety & Public Healthcare Alignment
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              “LIFELINK does not replace emergency services such as 108/112. AI organizes and structures information; it does not diagnose or prescribe treatment. All coordination decisions remain under verified human medical control.”
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentView('dashboard')}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
              >
                Launch Command Center
              </button>
              <button
                onClick={startSihDemo}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition"
              >
                Run 8-Step Walkthrough
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
