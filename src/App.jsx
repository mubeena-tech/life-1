import React from 'react';
import { EmergencyProvider, useEmergency } from './context/EmergencyContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import LandingPage from './components/landing/LandingPage';
import OverviewDashboard from './components/dashboard/OverviewDashboard';
import AiIntakeView from './components/intake/AiIntakeView';
import DispatcherVerification from './components/dispatcher/DispatcherVerification';
import AmbulanceSelection from './components/ambulance/AmbulanceSelection';
import LiveMap from './components/map/LiveMap';
import HospitalMatching from './components/hospital/HospitalMatching';
import AmbulanceMonitoring from './components/ambulance/AmbulanceMonitoring';
import DigitalHandover from './components/handover/DigitalHandover';
import PatientRecords from './components/records/PatientRecords';
import HospitalDashboard from './components/hospital/HospitalDashboard';
import AuditLogs from './components/common/AuditLogs';
import SettingsView from './components/common/SettingsView';
import NotificationDrawer from './components/common/NotificationDrawer';
import SihDemoModal from './components/demo/SihDemoModal';

function AppContent() {
  const { currentView } = useEmergency();

  const renderActiveView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
      case 'cases':
        return <OverviewDashboard />;
      case 'intake':
        return <AiIntakeView />;
      case 'dispatcher':
        return <DispatcherVerification />;
      case 'ambulances':
        return <AmbulanceSelection />;
      case 'livemap':
        return <LiveMap />;
      case 'hospitalmatching':
        return <HospitalMatching />;
      case 'monitoring':
        return <AmbulanceMonitoring />;
      case 'handover':
        return <DigitalHandover />;
      case 'records':
        return <PatientRecords />;
      case 'hospitalDashboard':
        return <HospitalDashboard />;
      case 'audit':
        return <AuditLogs />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      {currentView === 'landing' ? (
        <main className="flex-1">
          <LandingPage />
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto px-3 sm:px-4 lg:px-6 py-5 gap-6">
          {/* Dashboard Sidebar */}
          <Sidebar />

          {/* Dynamic Active Dashboard View */}
          <main className="flex-1 min-w-0 pb-16">
            {renderActiveView()}
          </main>
        </div>
      )}

      {/* Global Safety & Disclaimer Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="max-w-4xl mx-auto space-y-1">
          <p className="font-semibold text-slate-700">
            LIFELINK — AI-Assisted Emergency Healthcare Coordination & Digital Patient Handover
          </p>
          <p className="text-[11px] text-slate-500">
            “LIFELINK does not replace emergency services such as 108/112.” • “AI assists with information organization and coordination; it does not diagnose or prescribe treatment.”
          </p>
          <p className="text-[10px] text-slate-400">
            Demo data is simulated and not intended for real emergency use. Designed for Smart India Hackathon (SIH) prototype demonstration.
          </p>
        </div>
      </footer>

      {/* Slide-over Notifications */}
      <NotificationDrawer />

      {/* SIH Demo Guided Controller */}
      <SihDemoModal />
    </div>
  );
}

export default function App() {
  return (
    <EmergencyProvider>
      <AppContent />
    </EmergencyProvider>
  );
}
