import { ArrowLeft, Upload } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PostJobPageProps {
  onBack: () => void;
  onPost: (jobData: {
    title: string;
    date: string;
    country: string;
    maxPeople: number;
    details: string;
    skills: string[];
    languages: string[];
    image: string;
  }) => void;
}

export function PostJobPage({ onBack, onPost }: PostJobPageProps) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    details: '',
    skills: '',
    languages: '',
    maxPeople: '',
    country: '',
    image: null as File | null
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPost({
      title: formData.title,
      date: formData.date,
      country: formData.country,
      maxPeople: parseInt(formData.maxPeople),
      details: formData.details,
      skills: formData.skills.split(',').map(s => s.trim()),
      languages: formData.languages.split(',').map(l => l.trim()),
      image: imagePreview
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <button onClick={onBack} className="inline-flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <h1 className="text-gray-900 mb-1">Post Opportunity</h1>
          <p className="text-muted-foreground">Create a new serve opportunity</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Opportunity Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Community Outreach Volunteers"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="text"
              placeholder="Nov 20-27, 2025"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              placeholder="Kenya"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxPeople">Maximum Number of People</Label>
            <Input
              id="maxPeople"
              type="number"
              placeholder="15"
              value={formData.maxPeople}
              onChange={(e) => setFormData({ ...formData, maxPeople: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <Textarea
              id="details"
              placeholder="Describe the opportunity, what volunteers will do, and what to expect..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills Needed (comma separated)</Label>
            <Input
              id="skills"
              type="text"
              placeholder="Photographers, Accountants, Doctors, Anyone"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="languages">Preferred Languages (comma separated)</Label>
            <Input
              id="languages"
              type="text"
              placeholder="English, Spanish"
              value={formData.languages}
              onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image (Required)</Label>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="image"
                className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">
                  {formData.image ? formData.image.name : 'Upload an image'}
                </span>
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required
              />
              {imagePreview && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>
          </div>

            <Button type="submit" className="w-full">
              Post Opportunity
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
