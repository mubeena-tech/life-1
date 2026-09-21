import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEmergency } from '../../context/EmergencyContext';
import { 
  Ambulance, 
  MapPin, 
  Building2, 
  Navigation, 
  Clock, 
  Gauge, 
  ArrowRight, 
  Maximize2, 
  Radio,
  CheckCircle2
} from 'lucide-react';

// Custom Leaflet DivIcons to guarantee 100% reliable rendering
const createCustomIcon = (emoji, bgClass, pulse = false) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        ${pulse ? `<div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: rgba(225, 29, 72, 0.4); animation: radar-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
        <div style="width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; background: white; box-shadow: 0 4px 10px rgba(0,0,0,0.25); border: 2px solid ${bgClass}; z-index: 20;">
          ${emoji}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const patientIcon = createCustomIcon('📍', '#e11d48', true);
const ambulanceIcon = createCustomIcon('🚑', '#f59e0b', true);
const hospitalIcon = createCustomIcon('🏥', '#0ea5e9');

// Helper component to center map dynamically
function MapCenterController({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13, { animate: true });
    }
  }, [coords, map]);
  return null;
}

export default function LiveMap() {
  const { 
    activeCase, 
    fleet, 
    selectedAmbulance, 
    hospitalData, 
    selectedHospital, 
    setCurrentView 
  } = useEmergency();

  const patientCoords = activeCase.patientCoords || [12.9352, 77.6245];
  const ambulanceCoords = selectedAmbulance?.coords || [12.9240, 77.6080];
  const hospitalCoords = selectedHospital?.coords || [12.9450, 77.6520];

  const [mapCenter, setMapCenter] = useState(patientCoords);
  const [showRoutes, setShowRoutes] = useState(true);

  // Route points: Ambulance -> Patient
  const routeAmbulanceToPatient = [
    ambulanceCoords,
    [12.9270, 77.6120],
    [12.9310, 77.6180],
    patientCoords
  ];

  // Route points: Patient -> Hospital B
  const routePatientToHospital = [
    patientCoords,
    [12.9380, 77.6320],
    [12.9410, 77.6410],
    hospitalCoords
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Navigation className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Live Emergency GPS Dispatch & Telemetry
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>GPS Lock: 100% Signal</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time coordinates of patient scene, responding emergency fleet, and tertiary trauma destinations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setMapCenter(ambulanceCoords)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            Locate Ambulance
          </button>
          <button
            onClick={() => setMapCenter(patientCoords)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            Locate Patient
          </button>
          <button
            onClick={() => setMapCenter(hospitalCoords)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            Locate Hospital
          </button>
          <button
            onClick={() => setShowRoutes(!showRoutes)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              showRoutes ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}
          >
            {showRoutes ? 'Routes Active' : 'Show Routes'}
          </button>
        </div>
      </div>

      {/* Main Map Container Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Leaflet Map Frame */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-2 shadow-xs overflow-hidden relative">
          
          <div className="h-[520px] w-full rounded-xl overflow-hidden relative">
            <MapContainer
              center={patientCoords}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              <MapCenterController coords={mapCenter} />

              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* 📍 Patient Marker */}
              <Marker position={patientCoords} icon={patientIcon}>
                <Popup>
                  <div className="text-xs p-1">
                    <div className="font-bold text-rose-600">📍 Patient Incident Scene</div>
                    <div className="font-semibold text-slate-800 mt-1">{activeCase.patientName}</div>
                    <div className="text-[11px] text-slate-500">{activeCase.location}</div>
                    <div className="text-[10px] text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded mt-1 font-bold inline-block">
                      Status: {activeCase.condition}
                    </div>
                  </div>
                </Popup>
              </Marker>

              {/* 🚑 Responding Ambulance Marker */}
              <Marker position={ambulanceCoords} icon={ambulanceIcon}>
                <Popup>
                  <div className="text-xs p-1">
                    <div className="font-bold text-amber-600">🚑 {selectedAmbulance.name}</div>
                    <div className="text-[11px] text-slate-700 font-medium">Status: {selectedAmbulance.status}</div>
                    <div className="text-[11px] text-slate-500">Speed: {selectedAmbulance.speed || '48 km/h'}</div>
                    <div className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1 font-bold inline-block">
                      ETA: {selectedAmbulance.eta}
                    </div>
                  </div>
                </Popup>
              </Marker>

              {/* 🏥 Hospital Markers */}
              {hospitalData.map((hosp) => (
                <Marker key={hosp.id} position={hosp.coords} icon={hospitalIcon}>
                  <Popup>
                    <div className="text-xs p-1">
                      <div className="font-bold text-sky-600">🏥 {hosp.fullName}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{hosp.emergencyBeds}</div>
                      {hosp.recommended && (
                        <div className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold mt-1 inline-block">
                          ★ Recommended Tertiary Center
                        </div>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Route Polylines */}
              {showRoutes && (
                <>
                  {/* Ambulance to Patient: Amber Dashed */}
                  <Polyline
                    positions={routeAmbulanceToPatient}
                    pathOptions={{ color: '#f59e0b', weight: 4, dashArray: '6, 8', opacity: 0.9 }}
                  />

                  {/* Patient to Hospital: Emerald Solid */}
                  <Polyline
                    positions={routePatientToHospital}
                    pathOptions={{ color: '#10b981', weight: 4, opacity: 0.85 }}
                  />
                </>
              )}
            </MapContainer>

            {/* Floating Map Legend Overlay */}
            <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200 text-xs space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Map Legend</div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-base">📍</span> <span>Patient (ABC Village)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-base">🚑</span> <span>Ambulance A01 (En Route)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="text-base">🏥</span> <span>Connected Hospitals</span>
              </div>
              <div className="flex items-center gap-2 text-amber-600 text-[11px] font-medium pt-1 border-t border-slate-100">
                <span className="w-3 h-0.5 bg-amber-500 inline-block"></span> <span>Dispatch Leg</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 text-[11px] font-medium">
                <span className="w-3 h-0.5 bg-emerald-500 inline-block"></span> <span>Transit to Hospital</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right: Live Telemetry HUD Panel */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Ambulance Tracking Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <Ambulance className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{selectedAmbulance.name}</h3>
                  <p className="text-[11px] text-slate-500">{selectedAmbulance.type}</p>
                </div>
              </div>

              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse">
                Status: {selectedAmbulance.status || 'En Route'}
              </span>
            </div>

            {/* Distance & ETA Telemetry */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                  Remaining Distance
                </span>
                <span className="text-xl font-black text-slate-900 mt-1 block">
                  {selectedAmbulance.distance}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">Traversing NH-44</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                  Calculated ETA
                </span>
                <span className="text-xl font-black text-rose-600 mt-1 block">
                  {selectedAmbulance.eta}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">Live Traffic Mode</span>
              </div>
            </div>

            {/* Speed & Crew telemetry */}
            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Telemetry Speed:</span>
                </span>
                <span className="font-mono font-bold text-slate-800">48 km/h</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-500">Medical Crew:</span>
                <span className="font-semibold text-slate-800">{selectedAmbulance.staff}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-500">Destination:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[170px]">{activeCase.location}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => setCurrentView('monitoring')}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <span>Open Paramedic Vitals Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentView('hospitalmatching')}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <span>Proceed to Hospital Matching</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
