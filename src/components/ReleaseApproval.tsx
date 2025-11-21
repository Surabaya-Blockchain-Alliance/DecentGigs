import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { ArrowLeft, Download, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { Job } from '../App';

interface ReleaseApprovalProps {
  job: Job;
  onRelease: () => void;
  onBack: () => void;
  isDarkMode: boolean; // Added for theme consistency
}

const StarRating: React.FC<{ rating: number, setRating: (r: number) => void, isDarkMode: boolean }> = ({ rating, setRating, isDarkMode }) => {
  return (
    <div className="flex justify-center space-x-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          className={`w-8 h-8 cursor-pointer transition-transform ${
            index <= rating ? 'fill-yellow-500 text-yellow-500 scale-105' : isDarkMode ? 'text-white/30 hover:text-white/50' : 'text-gray-300 hover:text-gray-500'
          }`}
          onClick={() => setRating(index)}
        />
      ))}
    </div>
  );
};

export function ReleaseApproval({ job, onRelease, onBack, isDarkMode }: ReleaseApprovalProps) {
  const [rating, setRating] = useState(0);
  const [showReview, setShowReview] = useState(false);

  const rootClass = isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900';
  const headerClass = isDarkMode ? 'bg-[#0a0a0a]/80 border-white/10' : 'bg-white/80 border-gray-200';
  const cardClass = isDarkMode ? 'bg-white/5 border border-primary/30' : 'bg-gray-50 border border-gray-300';
  const textMutedClass = isDarkMode ? 'text-white/70' : 'text-gray-500';
  const inputClass = isDarkMode ? 'bg-white/10 border-white/30 text-white' : 'bg-gray-100 border-gray-300 text-gray-900';


  return (
    <div className={`min-h-screen ${rootClass} transition-colors`}>
      {/* Header */}
      <header className={`backdrop-blur-sm border-b sticky top-0 z-10 ${headerClass}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className={isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-200'}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job
          </Button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card className={`p-8 rounded-xl shadow-xl ${cardClass}`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary border border-primary/30 rounded-full mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Approve & Release Funds</h1>
            <p className={textMutedClass}>Final step for job: "{job.title}"</p>
          </div>

          <div className="space-y-6">
            {!showReview ? (
              <>
                <div className={`p-4 rounded-lg space-y-3 ${isDarkMode ? 'bg-primary/10 border border-primary/30' : 'bg-primary/5 border border-primary/20'}`}>
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Download className="w-6 h-6 text-primary" />
                    Work Submitted
                  </h3>
                  <p className={textMutedClass}>
                    The freelancer has submitted the final work. Please review it carefully before proceeding.
                  </p>
                  <Button variant="outline" className={`w-full ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-200'}`}>
                    Download/View Submitted Files
                  </Button>
                </div>

                <div className={`p-4 rounded-lg space-y-3 ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                  <h3 className="text-xl font-semibold mb-3">Escrow Details</h3>
                  <div className="flex justify-between items-center border-b border-dashed pb-2">
                    <span className={textMutedClass}>Total Escrowed</span>
                    <span className="text-2xl font-bold text-primary">{job.budget} ADA</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className={textMutedClass}>Transaction Fee (0.5%)</span>
                    <span className="font-semibold text-red-500">{job.budget * 0.005} ADA</span>
                  </div>
                  <Separator className={isDarkMode ? 'my-2 bg-white/20' : 'my-2 bg-gray-300'} />
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold">Net Release to Freelancer</span>
                    <span className="font-extrabold text-green-500">{(job.budget * 0.995).toFixed(2)} ADA</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowReview(true)} 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Confirm Review & Proceed to Rating
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              // Review and Rating Step
              <>
                <h2 className="text-2xl font-semibold mb-4 text-center">Rate the Freelancer</h2>
                <p className={textMutedClass + ' text-center mb-6'}>Your rating will update their on-chain reputation score.</p>
                
                <StarRating rating={rating} setRating={setRating} isDarkMode={isDarkMode} />

                <Textarea placeholder="Leave a public review for the freelancer..." rows={5} className={`mt-4 ${inputClass}`} />

                <div className={`p-4 rounded-lg space-y-3 ${isDarkMode ? 'bg-primary/10 border border-primary/30' : 'bg-primary/5 border border-primary/20'}`}>
                  <h3 className="font-semibold text-lg flex items-center gap-2">Transaction Effects</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary" />
                      <p className={textMutedClass}>Escrow funds will be released to freelancer</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-secondary" />
                      <p className={textMutedClass}>Freelancer's reputation score will be updated</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-secondary" />
                      <p className={textMutedClass}>Transaction will be recorded on Cardano blockchain</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 text-secondary" />
                      <p className={textMutedClass}>Both parties can leave feedback (visible after both submit)</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={onRelease} 
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90" 
                    disabled={rating === 0}
                  >
                    Confirm & Release {job.budget} ADA
                  </Button>
                  <Button variant="outline" onClick={() => setShowReview(false)} className={isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-200'}>
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