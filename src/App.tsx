import { useState } from 'react';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { CreateOrgProfilePage } from './components/CreateOrgProfilePage';
import { DashboardPage } from './components/DashboardPage';
import { PostJobPage } from './components/PostJobPage';
import { JobDetailPage } from './components/JobDetailPage';
import { ProfilePage } from './components/ProfilePage';
import { ApplyModal } from './components/ApplyModal';
import { mockJobs } from './data/mockJobs';
import { Job, UserProfile, ExpertiseArea, JobApplication } from './types';

type View = 'home' | 'login' | 'create-profile' | 'post-job' | 'mission' | 'profile';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  
  // Mock user database
  const [users, setUsers] = useState<UserProfile[]>([
    {
      id: '1',
      name: 'Demo Organizer',
      email: 'organizer@demo.com',
      password: 'password',
      role: 'harvest organizer',
      expertise: [],
      attendedMissions: [],
      postedMissions: ['1', '2']
    },
    {
      id: '2',
      name: 'Demo Worker',
      email: 'worker@demo.com',
      password: 'password',
      role: 'harvest worker',
      age: 28,
      expertise: ['Education', 'Religion'],
      phoneNumber: '+1 (555) 123-4567',
      attendedMissions: ['3', '4'],
      postedMissions: []
    }
  ]);

  const handleLogin = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setCurrentView('home');
    } else {
      alert('Invalid credentials. Try:\nOrganizer: organizer@demo.com / password\nWorker: worker@demo.com / password');
    }
  };

  const handleCreateProfile = (profileData: {
    name: string;
    email: string;
    password: string;
    role: 'harvest worker' | 'harvest organizer';
    age?: number;
  }) => {
    const newUser: UserProfile = {
      id: (users.length + 1).toString(),
      ...profileData,
      expertise: [],
      attendedMissions: [],
      postedMissions: []
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setCurrentView('home');
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setCurrentView('mission');
  };

  const handlePostJob = (jobData: {
    title: string;
    date: string;
    country: string;
    maxPeople: number;
    details: string;
    skills: string[];
    languages: string[];
    image: string;
  }) => {
    const newJob: Job = {
      id: (jobs.length + 1).toString(),
      ...jobData,
      countryCode: jobData.country.substring(0, 2).toUpperCase(),
      status: 'open',
      organizationName: currentUser?.name || 'Anonymous',
      organizerId: currentUser?.id,
      applications: []
    };

    setJobs([newJob, ...jobs]);
    
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        postedMissions: [...currentUser.postedMissions, newJob.id]
      };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    }
    
    setCurrentView('home');
  };

  const handleApply = () => {
    setIsApplyModalOpen(true);
  };

  const handleApplicationSubmit = (data: { phoneNumber?: string; details: string }) => {
    if (currentUser && selectedJob) {
      const application: JobApplication = {
        id: Date.now().toString(),
        jobId: selectedJob.id,
        applicantId: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        age: currentUser.age,
        expertise: currentUser.expertise || [],
        phoneNumber: data.phoneNumber,
        details: data.details,
        timestamp: Date.now()
      };

      // Update job with new application
      setJobs(jobs.map(job => 
        job.id === selectedJob.id 
          ? { ...job, applications: [...(job.applications || []), application] }
          : job
      ));

      // Update selected job
      setSelectedJob({
        ...selectedJob,
        applications: [...(selectedJob.applications || []), application]
      });

      // Update user's phone number if provided
      if (data.phoneNumber && data.phoneNumber !== currentUser.phoneNumber) {
        const updatedUser = { ...currentUser, phoneNumber: data.phoneNumber };
        setCurrentUser(updatedUser);
        setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      }
    }
  };

  const handleCloseEvent = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: 'closed' as const } : job
    ));
  };

  const handlePasswordChange = (newPassword: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, password: newPassword };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
      alert('Password changed successfully!');
    }
  };

  const handleExpertiseUpdate = (expertise: ExpertiseArea[]) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, expertise };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedJob(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    setSelectedJob(null);
  };

  const handleViewApplicants = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setSelectedJob(job);
      setCurrentView('mission');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {currentView === 'home' && (
        <DashboardPage
          jobs={jobs}
          currentUser={currentUser}
          onJobClick={handleJobClick}
          onPostJob={() => setCurrentView('post-job')}
          onProfileClick={() => setCurrentView('profile')}
          onLoginClick={() => setCurrentView('login')}
        />
      )}

      {currentView === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onCreateProfile={() => setCurrentView('create-profile')}
        />
      )}

      {currentView === 'create-profile' && (
        <CreateOrgProfilePage
          onBack={() => setCurrentView('login')}
          onComplete={handleCreateProfile}
        />
      )}

      {currentView === 'post-job' && currentUser && (
        <PostJobPage
          onBack={handleBackToHome}
          onPost={handlePostJob}
        />
      )}

      {currentView === 'mission' && selectedJob && (
        <JobDetailPage
          job={selectedJob}
          currentUser={currentUser}
          onBack={handleBackToHome}
          onApply={handleApply}
          onSignInToApply={() => setCurrentView('login')}
        />
      )}

      {currentView === 'profile' && currentUser && (
        <ProfilePage
          user={currentUser}
          allJobs={jobs}
          onBack={handleBackToHome}
          onCloseEvent={handleCloseEvent}
          onPasswordChange={handlePasswordChange}
          onLogout={handleLogout}
          onExpertiseUpdate={handleExpertiseUpdate}
          onViewApplicants={handleViewApplicants}
        />
      )}

      {currentUser && selectedJob && (
        <ApplyModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          jobTitle={selectedJob.title}
          currentUser={currentUser}
          onSubmit={handleApplicationSubmit}
        />
      )}
    </div>
  );
}
