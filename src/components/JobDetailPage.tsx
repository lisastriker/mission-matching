import { ArrowLeft, Calendar, Flag, Globe, Users } from 'lucide-react';
import { Job, UserProfile } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ApplicantCard } from './ApplicantCard';

interface JobDetailPageProps {
  job: Job;
  currentUser: UserProfile | null;
  onBack: () => void;
  onApply: () => void;
  onSignInToApply: () => void;
}

export function JobDetailPage({ job, currentUser, onBack, onApply, onSignInToApply }: JobDetailPageProps) {
  const isOrganizer = currentUser?.role === 'harvest organizer';
  const isOwnMission = currentUser?.id === job.organizerId;
  const shouldShowApplicants = isOrganizer && isOwnMission;
  const shouldShowApplyButton = currentUser && currentUser.role === 'harvest worker' && job.status === 'open';
  const shouldShowSignInButton = !currentUser && job.status === 'open';
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <button onClick={onBack} className="inline-flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <h1 className="text-gray-900">Opportunity Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
        {/* Image */}
        <div className="rounded-lg overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={job.image}
            alt={job.title}
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Title and Status */}
        <div>
          <h1 className="text-gray-900 mb-2">{job.title}</h1>
          <p className="text-muted-foreground mb-3">{job.organizationName}</p>
          <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
            {job.status === 'open' ? 'Open for Applications' : 'Closed'}
          </Badge>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="text-gray-900">{job.date}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Flag className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="text-gray-900">{job.country}</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Users className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Team Size</p>
              <p className="text-gray-900">{job.maxPeople} people</p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Globe className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Languages</p>
              <p className="text-gray-900">{job.languages.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-gray-900 mb-2">About This Opportunity</h3>
          <p className="text-gray-700 leading-relaxed">{job.details}</p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-gray-900 mb-3">Skills Needed</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

          {/* Apply Button for Workers */}
          {shouldShowApplyButton && (
            <div className="pt-4 border-t">
              <Button onClick={onApply} className="w-full">
                Apply Now
              </Button>
            </div>
          )}

          {/* Sign In Button for Non-authenticated Users */}
          {shouldShowSignInButton && (
            <div className="pt-4 border-t">
              <Button onClick={onSignInToApply} className="w-full">
                Sign in to Apply
              </Button>
            </div>
          )}

          {/* Applicants Section for Organizers */}
          {shouldShowApplicants && job.applications && job.applications.length > 0 && (
            <div className="pt-6 border-t">
              <h3 className="text-gray-900 mb-4">
                Applicants ({job.applications.length})
              </h3>
              <div className="space-y-3">
                {job.applications.map((application) => (
                  <ApplicantCard key={application.id} application={application} />
                ))}
              </div>
            </div>
          )}

          {shouldShowApplicants && (!job.applications || job.applications.length === 0) && (
            <div className="pt-6 border-t">
              <p className="text-center text-muted-foreground py-8">
                No applications yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
