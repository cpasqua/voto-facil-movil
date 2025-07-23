import React from 'react';
import VotingDashboard from '@/components/VotingDashboard';
import { Fiscal } from '@/data/mockData';

interface DashboardProps {
  fiscal: Fiscal | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ fiscal, onLogout }) => {
  if (!fiscal) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            No hay sesión activa
          </h1>
          <p className="text-muted-foreground">
            Por favor inicie sesión para acceder al sistema.
          </p>
        </div>
      </div>
    );
  }

  return <VotingDashboard fiscal={fiscal} onLogout={onLogout} />;
};

export default Dashboard;