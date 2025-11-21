import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { ArrowLeft, Download, Star, CheckCircle } from 'lucide-react';
import { Job } from '../App';

interface ReleaseApprovalProps {
  job: Job;
  onRelease: () => void;
  onBack: () => void;
}

export function ReleaseApproval({ job, onRelease, onBack }: ReleaseApprovalProps) {
  const [rating, setRating] = useState(0);
  const [showReview, setShowReview] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job
          </Button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/30">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-foreground">Review & Approve Work</h1>
            <p className="text-muted-foreground mt-2">
              {job.title}
            </p>
          </div>

          {/* Deliverable */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-foreground">Submitted Deliverable</h3>
              <div className="border border-primary/20 bg-primary/5 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-lg flex items-center justify-center">
                      <Download className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground">dashboard-final.zip</p>
                      <p className="text-muted-foreground">2.4 MB</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="mb-2 text-foreground">IPFS Hash</h3>
                  <div className="bg-input/30 border border-primary/30 rounded-lg p-3 font-mono break-all text-primary">
                    QmX7ZfR3vXNPq5pXrTfGHa1b9cD8jK2mN4oP6qR7sT9uV5w
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h3 className="mb-2 text-foreground">Delivery Notes</h3>
                  <p className="text-muted-foreground">
                    I've completed the React dashboard with all requested features. The dashboard includes:
                    - Responsive design for mobile and desktop
                    - Chart integration with Recharts
                    - Dark mode support
                    - All components are well documented
                    
                    Installation instructions are included in the README.md file.
                  </p>
                </div>
              </div>
            </div>

            {/* Escrow Details */}
            <div>
              <h3 className="mb-4 text-foreground">Escrow Details</h3>
              <div className="border border-secondary/20 bg-secondary/5 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Locked:</span>
                  <span className="text-primary">{job.budget} ADA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Freelancer:</span>
                  <span className="text-foreground">{job.freelancer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract Address:</span>
                  <span className="font-mono text-foreground">addr1vxy...abc123</span>
                </div>
              </div>
            </div>

            {!showReview ? (
              <div className="flex gap-3">
                <Button onClick={() => setShowReview(true)} className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Approve & Release Funds
                </Button>
                <Button variant="outline" onClick={onBack}>
                  Request Changes
                </Button>
              </div>
            ) : (
              <>
                {/* Rating */}
                <div>
                  <h3 className="mb-4 text-foreground">Rate Freelancer</h3>
                  <div className="flex gap-2 justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="transition-colors"
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            star <= rating ? 'fill-secondary text-secondary' : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-muted-foreground">
                    {rating === 0 && 'Select a rating'}
                    {rating === 1 && 'Poor'}
                    {rating === 2 && 'Fair'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Very Good'}
                    {rating === 5 && 'Excellent'}
                  </p>
                </div>

                {/* Review */}
                <div className="space-y-2">
                  <h3 className="text-foreground">Leave a Review (Optional)</h3>
                  <Textarea 
                    placeholder="Share your experience working with this freelancer..."
                    rows={4}
                    className="bg-input/30"
                  />
                  <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-secondary" />
                      <p className="text-muted-foreground">
                        Reviews are ZK-protected: Your feedback is cryptographically verified while maintaining privacy
                      </p>
                    </div>
                  </div>
                </div>

                {/* Confirmation */}
                <div className="bg-secondary/20 border border-secondary/40 rounded-lg p-6">
                  <h3 className="mb-3 text-foreground">What happens next?</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-secondary" />
                      <p className="text-muted-foreground">Funds ({job.budget} ADA) will be released from escrow to freelancer</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-secondary" />
                      <p className="text-muted-foreground">Freelancer's reputation score will be updated</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-secondary" />
                      <p className="text-muted-foreground">Transaction will be recorded on Cardano blockchain</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-secondary" />
                      <p className="text-muted-foreground">Both parties can leave feedback (visible after both submit)</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={onRelease} className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90" disabled={rating === 0}>
                    Confirm & Release {job.budget} ADA
                  </Button>
                  <Button variant="outline" onClick={() => setShowReview(false)}>
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}