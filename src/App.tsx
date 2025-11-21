import { useState } from 'react';
import { Landing } from './components/Landing';
import { WalletConnect } from './components/WalletConnect';
import { KYCVerification } from './components/KYCVerification';
import { EmployerDashboard } from './components/EmployerDashboard';
import { FreelancerDashboard } from './components/FreelancerDashboard';
import { JobDetail } from './components/JobDetail';
import { WorkSubmission } from './components/WorkSubmission';
import { ReleaseApproval } from './components/ReleaseApproval';
import { DisputeResolution } from './components/DisputeResolution';
import { ThemeProvider } from './components/ThemeProvider';
import { LearnMore } from './components/LearnMore';
import { ShowProfile } from './components/ShowProfile';
import { SettingProfile } from './components/SettingProfile';

export type UserType = 'employer' | 'freelancer' | null;

export type Job = {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: 'open' | 'in-progress' | 'completed' | 'disputed';
  employer: string;
  freelancer?: string;
  bids?: number;
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('landing');
  const [userType, setUserType] = useState<UserType>(null);
  const [hasWallet, setHasWallet] = useState(false);
  const [hasDID, setHasDID] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleWalletConnected = (type: UserType) => {
    setHasWallet(true);
    setUserType(type);
    setCurrentScreen('kyc');
  };

  const handleKYCComplete = () => {
    setHasDID(true);
    if (userType === 'employer') {
      setCurrentScreen('employer-dashboard');
    } else {
      setCurrentScreen('freelancer-dashboard');
    }
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setCurrentScreen('job-detail');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <Landing onGetStarted={() => setCurrentScreen('wallet-connect')} onLearnMore={() => setCurrentScreen('learn-more')} onShowProfile={() => setCurrentScreen('show-profile')} onSettingProfile={() => setCurrentScreen('setting-profile')} />;
      case 'learn-more':
        return <LearnMore />;
      case 'show-profile':
        return <ShowProfile />;
      case 'setting-profile':
        return <SettingProfile />;
      case 'wallet-connect':
        return <WalletConnect onConnect={handleWalletConnected} />;
      case 'kyc':
        return <KYCVerification onComplete={handleKYCComplete} onSkip={handleKYCComplete} />;
      case 'employer-dashboard':
        return <EmployerDashboard onJobSelect={handleJobSelect} />;
      case 'freelancer-dashboard':
        return <FreelancerDashboard onJobSelect={handleJobSelect} />;
      case 'job-detail':
        return (
          <JobDetail 
            job={selectedJob!} 
            userType={userType!}
            onBack={() => setCurrentScreen(userType === 'employer' ? 'employer-dashboard' : 'freelancer-dashboard')}
            onWorkSubmission={() => setCurrentScreen('work-submission')}
            onApproval={() => setCurrentScreen('release-approval')}
            onDispute={() => setCurrentScreen('dispute')}
          />
        );
      case 'work-submission':
        return (
          <WorkSubmission 
            job={selectedJob!}
            onSubmit={() => setCurrentScreen('job-detail')}
            onBack={() => setCurrentScreen('job-detail')}
          />
        );
      case 'release-approval':
        return (
          <ReleaseApproval 
            job={selectedJob!}
            onRelease={() => setCurrentScreen('employer-dashboard')}
            onBack={() => setCurrentScreen('job-detail')}
          />
        );
      case 'dispute':
        return (
          <DisputeResolution 
            job={selectedJob!}
            onBack={() => setCurrentScreen('job-detail')}
          />
        );
      default:
        return <Landing onGetStarted={() => setCurrentScreen('wallet-connect')} onLearnMore={() => setCurrentScreen('learn-more')} onShowProfile={() => setCurrentScreen('show-profile')} onSettingProfile={() => setCurrentScreen('setting-profile')} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground font-sans">
        {renderScreen()}
      </div>
    </ThemeProvider>
  );
}

export default App;
