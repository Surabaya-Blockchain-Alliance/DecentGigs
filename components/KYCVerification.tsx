import { useState } from 'react';
import { Shield, Upload, CheckCircle, User, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import type { UserRole } from '../pages/index';

interface KYCVerificationProps {
  onComplete: (role: UserRole) => void;
}

export function KYCVerification({ onComplete }: KYCVerificationProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<UserRole>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    idDocument: null as File | null,
  });

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    // Simulate KYC verification
    setTimeout(() => {
      onComplete(role);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl mb-2">KYC Verification</h1>
          <p className="text-gray-600">
            Complete verification to access the marketplace
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="text-sm hidden sm:inline">Role</span>
          </div>
          <div className={`h-0.5 w-12 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="text-sm hidden sm:inline">Details</span>
          </div>
          <div className={`h-0.5 w-12 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <span className="text-sm hidden sm:inline">Verify</span>
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card
              className="p-6 cursor-pointer hover:border-blue-600 hover:shadow-lg transition-all"
              onClick={() => handleRoleSelect('provider')}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="mb-2">Job Provider</h3>
                <p className="text-sm text-gray-600">
                  Post jobs and hire skilled bidders for your projects
                </p>
              </div>
            </Card>

            <Card
              className="p-6 cursor-pointer hover:border-purple-600 hover:shadow-lg transition-all"
              onClick={() => handleRoleSelect('bidder')}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="mb-2">Bidder</h3>
                <p className="text-sm text-gray-600">
                  Find jobs and submit competitive bids to earn
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: KYC Form */}
        {step === 2 && (
          <Card className="p-6">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  placeholder="Enter your full legal name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="country">Country of Residence</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                  placeholder="Enter your country"
                />
              </div>

              <div>
                <Label htmlFor="idDocument">Government ID Document</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-600 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload passport, driver's license, or national ID
                  </p>
                  <Input
                    id="idDocument"
                    type="file"
                    onChange={(e) => setFormData({ ...formData, idDocument: e.target.files?.[0] || null })}
                    accept="image/*,.pdf"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Submit for Verification
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Step 3: Verification in Progress */}
        {step === 3 && (
          <Card className="p-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2">Verifying Your Identity</h3>
              <p className="text-gray-600 mb-4">
                Please wait while we verify your information...
              </p>
              <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
