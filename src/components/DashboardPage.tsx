import { LogIn, Plus, User } from 'lucide-react';
import { useState } from 'react';
import { Job, UserProfile } from '../types';
import { JobCard } from './JobCard';
import { Button } from './ui/button';
import { FilterBar } from './FilterBar';

interface DashboardPageProps {
  jobs: Job[];
  currentUser: UserProfile | null;
  onJobClick: (job: Job) => void;
  onPostJob: () => void;
  onProfileClick: () => void;
  onLoginClick: () => void;
}

export function DashboardPage({ jobs, currentUser, onJobClick, onPostJob, onProfileClick, onLoginClick }: DashboardPageProps) {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([]);

  // Get unique locations and organizations
  const uniqueLocations = Array.from(new Set(jobs.map(job => job.country))).sort();
  const uniqueOrganizations = Array.from(new Set(jobs.map(job => job.organizationName))).sort();

  // Filter jobs based on selections
  const filteredJobs = jobs.filter(job => {
    const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(job.country);
    const orgMatch = selectedOrganizations.length === 0 || selectedOrganizations.includes(job.organizationName);
    return locationMatch && orgMatch;
  });

  const handleClearFilters = () => {
    setSelectedLocations([]);
    setSelectedOrganizations([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 mb-1">Serve Opportunities</h1>
              <p className="text-muted-foreground">Find ways to serve and make a difference</p>
            </div>
            <div className="flex items-center gap-4">
              {currentUser ? (
                <>
                  {currentUser.role === 'harvest organizer' && (
                    <Button onClick={onPostJob}>
                      <Plus className="w-4 h-4 mr-2" />
                      Post Job
                    </Button>
                  )}
                  <button
                    onClick={onProfileClick}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <User className="w-6 h-6 text-gray-700" />
                  </button>
                </>
              ) : (
                <Button onClick={onLoginClick}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <FilterBar
          locations={uniqueLocations}
          organizations={uniqueOrganizations}
          selectedLocations={selectedLocations}
          selectedOrganizations={selectedOrganizations}
          onLocationChange={setSelectedLocations}
          onOrganizationChange={setSelectedOrganizations}
          onClearFilters={handleClearFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => onJobClick(job)} />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              {jobs.length === 0 
                ? 'No opportunities available at the moment.' 
                : 'No opportunities match your filters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
