import { Filter, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';

interface FilterBarProps {
  locations: string[];
  organizations: string[];
  selectedLocations: string[];
  selectedOrganizations: string[];
  onLocationChange: (locations: string[]) => void;
  onOrganizationChange: (organizations: string[]) => void;
  onClearFilters: () => void;
}

export function FilterBar({
  locations,
  organizations,
  selectedLocations,
  selectedOrganizations,
  onLocationChange,
  onOrganizationChange,
  onClearFilters
}: FilterBarProps) {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isOrgOpen, setIsOrgOpen] = useState(false);

  const handleLocationToggle = (location: string) => {
    if (selectedLocations.includes(location)) {
      onLocationChange(selectedLocations.filter(l => l !== location));
    } else {
      onLocationChange([...selectedLocations, location]);
    }
  };

  const handleOrganizationToggle = (org: string) => {
    if (selectedOrganizations.includes(org)) {
      onOrganizationChange(selectedOrganizations.filter(o => o !== org));
    } else {
      onOrganizationChange([...selectedOrganizations, org]);
    }
  };

  const activeFiltersCount = selectedLocations.length + selectedOrganizations.length;

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-600" />
        <span className="text-sm text-gray-600">Filters:</span>
      </div>

      <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Location
            {selectedLocations.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedLocations.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="space-y-3">
            <h4 className="text-sm">Filter by Location</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={() => handleLocationToggle(location)}
                  />
                  <Label
                    htmlFor={`location-${location}`}
                    className="text-sm cursor-pointer"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Popover open={isOrgOpen} onOpenChange={setIsOrgOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Organization
            {selectedOrganizations.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {selectedOrganizations.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-3">
            <h4 className="text-sm">Filter by Organization</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {organizations.map((org) => (
                <div key={org} className="flex items-center space-x-2">
                  <Checkbox
                    id={`org-${org}`}
                    checked={selectedOrganizations.includes(org)}
                    onCheckedChange={() => handleOrganizationToggle(org)}
                  />
                  <Label
                    htmlFor={`org-${org}`}
                    className="text-sm cursor-pointer"
                  >
                    {org}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground"
        >
          <X className="w-4 h-4 mr-1" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
