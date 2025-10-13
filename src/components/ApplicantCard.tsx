import { ChevronDown, ChevronUp, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { JobApplication } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface ApplicantCardProps {
  application: JobApplication;
}

export function ApplicantCard({ application }: ApplicantCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-gray-900">{application.name}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{application.email}</span>
          </div>

          {application.phoneNumber && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{application.phoneNumber}</span>
            </div>
          )}

          {application.age && (
            <div className="text-sm text-gray-600">
              Age: {application.age}
            </div>
          )}

          {application.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {application.expertise.map((exp) => (
                <Badge key={exp} variant="outline">
                  {exp}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              See Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              See More
            </>
          )}
        </Button>
      </div>

      {isExpanded && application.details && (
        <div className="pt-3 border-t border-gray-200">
          <h4 className="text-sm mb-2">Application Details:</h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{application.details}</p>
        </div>
      )}
    </div>
  );
}
