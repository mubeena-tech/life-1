import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCase, ambulances, hospitals, timelineStages, sampleNotifications } from '../data/mockData';
import confetti from 'canvas-confetti';

const EmergencyContext = createContext();

export const EmergencyProvider = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard' | 'intake' | 'dispatcher' | 'ambulances' | 'livemap' | 'hospitalmatching' | 'monitoring' | 'handover' | 'records' | 'hospitalDashboard'
  
  // Case State
  const [activeCase, setActiveCase] = useState(initialCase);
  const [timeline, setTimeline] = useState(timelineStages);
  const [casePriority, setCasePriority] = useState('Critical');
  
  // Fleet & Hospital State
  const [fleet, setFleet] = useState(ambulances);
  const [hospitalData, setHospitalData] = useState(hospitals);
  const [selectedAmbulance, setSelectedAmbulance] = useState(ambulances[0]); // A01
  const [selectedHospital, setSelectedHospital] = useState(hospitals[1]); // Hospital B (Apex)
  const [preArrivalAlertSent, setPreArrivalAlertSent] = useState(false);
  const [teamPrepared, setTeamPrepared] = useState(false);

  // Paramedic Vitals Telemetry
  const [vitals, setVitals] = useState({
    consciousness: "Unresponsive",
    breathing: "Abnormal (Shallow 28 bpm)",
    bloodPressure: "145/95 mmHg",
    heartRate: 114,
    oxygenSaturation: 88,
    symptoms: "Sudden collapse, cold clammy extremities, unresponsiveness",
    firstAidGiven: "None at scene",
    ivLine: "Not established",
    gcs: "8/15"
  });

  // Voice to Structured AI simulation state
  const [voiceUpdate, setVoiceUpdate] = useState({
    isListening: false,
    audioText: "",
    structured: null,
    hasSyncedToHospital: false
  });

  // Offline Mode State: 'ONLINE' | 'OFFLINE' | 'SYNCING' | 'SYNCED'
  const [offlineStatus, setOfflineStatus] = useState('ONLINE');
  const [pendingSyncCount, setPendingSyncCount] = useState(0);

  // Notifications
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  // Digital Handover
  const [handoverComplete, setHandoverComplete] = useState(false);
  const [handoverTimestamp, setHandoverTimestamp] = useState(null);

  // SIH Guided Demo State
  const [sihDemoActive, setSihDemoActive] = useState(false);
  const [sihStep, setSihStep] = useState(0);

  // Helper to add toast / notification
  const addNotification = (text, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
    };
    setNotifications(prev => [newNotif, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  // Dispatcher Actions
  const updatePriority = (p) => {
    setCasePriority(p);
    setActiveCase(prev => ({ ...prev, priority: p }));
    addNotification(`Case LL-10452 priority updated to ${p.toUpperCase()}`, 'warning');
  };

  const assignAmbulance = (ambId) => {
    const found = fleet.find(a => a.id === ambId) || fleet[0];
    setSelectedAmbulance(found);
    setFleet(prev => prev.map(a => {
      if (a.id === ambId) return { ...a, status: "En Route" };
      return a;
    }));
    setActiveCase(prev => ({
      ...prev,
      assignedAmbulanceId: ambId,
      status: "AMBULANCE EN ROUTE"
    }));
    
    // Update timeline step 4
    updateTimelineStep(4, 'completed');
    updateTimelineStep(5, 'active');
    addNotification(`Ambulance ${found.name} assigned & en route to ABC Village`, 'ambulance');
  };

  // Hospital Actions
  const sendPreArrivalAlert = (hospitalId) => {
    const hosp = hospitalData.find(h => h.id === hospitalId) || hospitalData[1];
    setSelectedHospital(hosp);
    setPreArrivalAlertSent(true);
    updateTimelineStep(7, 'completed');
    addNotification(`Pre-arrival critical trauma telemetry dispatched to ${hosp.fullName}`, 'hospital');
  };

  const prepareEmergencyTeam = () => {
    setTeamPrepared(true);
    addNotification(`Apex Trauma Team & 24/7 Cath Lab activated for Patient Ravi Kumar`, 'hospital');
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {
      // safe fallback
    }
  };

  // Voice Update Simulation
  const simulateVoiceUpdate = () => {
    setVoiceUpdate(prev => ({ ...prev, isListening: true, audioText: "Listening to paramedic voice...", structured: null }));
    
    setTimeout(() => {
      setVoiceUpdate(prev => ({
        ...prev,
        isListening: false,
        audioText: "“Patient is conscious now. Oxygen support provided. SpO2 improving.”",
        structured: {
          consciousness: "Conscious (Alert to voice)",
          oxygenSupport: "Provided (High-Flow NRB 10 L/min)",
          heartRateTrend: "Stabilizing from 114 to 92 bpm",
          patientStatus: "Monitoring & Transporting"
        }
      }));

      // Update live vitals
      setVitals({
        consciousness: "Conscious",
        breathing: "18 bpm (Assisted on 10L NRB)",
        bloodPressure: "135/88 mmHg",
        heartRate: 92,
        oxygenSaturation: 97,
        symptoms: "Regained consciousness, responsive to tactile cues",
        firstAidGiven: "10L/min High-Flow O2 via NRB mask, 18G IV line secured",
        ivLine: "Patent (Normal Saline 500ml @ 75ml/hr)",
        gcs: "13/15"
      });

      addNotification("Paramedic voice converted to structured clinical telemetry", 'info');
    }, 1200);
  };

  const sendVitalsToHospital = () => {
    setVoiceUpdate(prev => ({ ...prev, hasSyncedToHospital: true }));
    addNotification("Live telemetry package synchronized with Hospital B ED EMR", 'sync');
  };

  // Digital Handover
  const completeHandover = () => {
    setHandoverComplete(true);
    const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setHandoverTimestamp(ts);
    updateTimelineStep(8, 'completed');
    setActiveCase(prev => ({ ...prev, status: "HANDOVER COMPLETED" }));
    addNotification(`Digital Handover completed for Ravi Kumar at ${ts}`, 'handover');
    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    } catch {
      // safe
    }
  };

  // Timeline Helper
  const updateTimelineStep = (stepNumber, status) => {
    setTimeline(prev => prev.map(item => {
      if (item.step === stepNumber) return { ...item, status };
      return item;
    }));
  };

  // Offline Simulation
  const toggleOffline = () => {
    if (offlineStatus === 'ONLINE') {
      setOfflineStatus('OFFLINE');
      setPendingSyncCount(3);
      addNotification("Network severed: LIFELINK switched to Local Offline Storage Mode", 'warning');
    } else if (offlineStatus === 'OFFLINE') {
      setOfflineStatus('SYNCING');
      addNotification("Connectivity restored: Synchronizing 3 pending telemetry records...", 'info');
      setTimeout(() => {
        setOfflineStatus('SYNCED');
        setPendingSyncCount(0);
        addNotification("All offline telemetry and handover records synchronized with central server", 'sync');
        setTimeout(() => {
          setOfflineStatus('ONLINE');
        }, 2200);
      }, 1800);
    }
  };

  // SIH Demo Steps
  const sihStepList = [
    { step: 0, title: "1. AI Emergency Intake", view: "intake", desc: "Incoming call from son Suresh. AI transcribes and extracts entities without diagnosing." },
    { step: 1, title: "2. Human Dispatcher Verification", view: "dispatcher", desc: "Dispatcher verifies Level 1 Critical emergency, confirms ALS requirement." },
    { step: 2, title: "3. Smart Ambulance Allocation", view: "ambulances", desc: "Evaluates fleet; assigns Ambulance A01 (4.2 km, ETA 9 min)." },
    { step: 3, title: "4. Live Telemetry & GPS Tracking", view: "livemap", desc: "Real-time Leaflet map tracking ambulance route from base to ABC Village." },
    { step: 4, title: "5. Operational Hospital Matching", view: "hospitalmatching", desc: "Compares capacity; recommends Hospital B with 24/7 active Cath Lab." },
    { step: 5, title: "6. Paramedic In-Transit Monitoring", view: "monitoring", desc: "Voice observation parsed by AI; vitals streamed live to receiving hospital." },
    { step: 6, title: "7. Receiving ED Dashboard", view: "hospitalDashboard", desc: "Hospital B emergency team prepares resuscitation bay ahead of arrival." },
    { step: 7, title: "8. Digital Patient Handover & EHR", view: "handover", desc: "Zero-data-loss digital transfer with past kidney treatment records and QR signoff." }
  ];

  const startSihDemo = () => {
    setSihDemoActive(true);
    setSihStep(0);
    setCurrentView(sihStepList[0].view);
    addNotification("SIH Demo Mode started: Demonstrating full 8-stage coordination pipeline", 'info');
  };

  const nextSihStep = () => {
    if (sihStep < sihStepList.length - 1) {
      const next = sihStep + 1;
      setSihStep(next);
      setCurrentView(sihStepList[next].view);
      
      // Auto trigger corresponding actions
      if (next === 2) assignAmbulance('A01');
      if (next === 4) sendPreArrivalAlert('HOSP-B');
      if (next === 5 && !voiceUpdate.structured) simulateVoiceUpdate();
      if (next === 6) prepareEmergencyTeam();
      if (next === 7) completeHandover();
    } else {
      setSihDemoActive(false);
      setCurrentView('dashboard');
    }
  };

  const prevSihStep = () => {
    if (sihStep > 0) {
      const prev = sihStep - 1;
      setSihStep(prev);
      setCurrentView(sihStepList[prev].view);
    }
  };

  const closeSihDemo = () => {
    setSihDemoActive(false);
  };

  return (
    <EmergencyContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeCase,
        setActiveCase,
        timeline,
        updateTimelineStep,
        casePriority,
        updatePriority,
        fleet,
        assignAmbulance,
        selectedAmbulance,
        hospitalData,
        selectedHospital,
        setSelectedHospital,
        sendPreArrivalAlert,
        preArrivalAlertSent,
        teamPrepared,
        prepareEmergencyTeam,
        vitals,
        setVitals,
        voiceUpdate,
        simulateVoiceUpdate,
        sendVitalsToHospital,
        offlineStatus,
        pendingSyncCount,
        toggleOffline,
        notifications,
        addNotification,
        isNotificationOpen,
        setIsNotificationOpen,
        unreadCount,
        setUnreadCount,
        handoverComplete,
        handoverTimestamp,
        completeHandover,
        sihDemoActive,
        sihStep,
        sihStepList,
        startSihDemo,
        nextSihStep,
        prevSihStep,
        closeSihDemo
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};
