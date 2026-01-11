import React, { useState, useCallback } from 'react';
import { UserInput } from './types';
import { getCareerAdvice } from './services/geminiService';
import UserInputForm from './components/UserInputForm';
import CareerGuidanceDisplay from './components/CareerGuidanceDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    background: '',
    skills: '',
    interests: '',
    goals: '',
    availability: '',
  });
  const [careerGuidance, setCareerGuidance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCareerGuidance(null);

    try {
      const guidance = await getCareerAdvice(userInput);
      setCareerGuidance(guidance);
    } catch (e) {
      setError(
        'An error occurred while fetching your career guidance. Please check your API key and try again.'
      );
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [userInput]);

  const handleReset = () => {
    setUserInput({
      background: '',
      skills: '',
      interests: '',
      goals: '',
      availability: '',
    });
    setCareerGuidance(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 font-sans text-slate-800">
      <main className="container mx-auto px-4 py-10 md:py-16">

        {/* ===== Enhanced Header (Only this part changed) ===== */}
 <header className="text-center pt-12 pb-24 px-4">

  {/* Branding Badge */}
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-10 shadow-sm">
    <SparklesIcon className="w-4 h-4 text-indigo-500" />
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
      Strategic Career Intelligence
    </span>
  </div>

  {/* Main Heading */}
  <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-6">
    AI Career{" "}
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">
      Mentor
    </span>
  </h1>

  <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-14">
    Bridging the gap between your current skills and your professional goals with
    a data-driven, step-by-step execution roadmap.
  </p>

  {/* X-axis Step Boxes */}
  <div className="flex items-center justify-center gap-5 flex-nowrap max-w-4xl mx-auto">

    {/* Step 1 */}
    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition">
      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">
        📝
      </div>
      <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
        Share your profile
      </span>
    </div>

    {/* Step 2 */}
    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition">
      <div className="w-8 h-8 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm">
        ⚡
      </div>
      <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
        AI analyzes
      </span>
    </div>

    {/* Step 3 */}
    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition">
      <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-sm">
        🎯
      </div>
      <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
        Get your roadmap
      </span>
    </div>

  </div>

</header>


        {/* ===== Header End ===== */}

        {!careerGuidance && !isLoading && (
          <UserInputForm
            userInput={userInput}
            setUserInput={setUserInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center bg-white p-12 rounded-2xl shadow-xl max-w-2xl mx-auto">
            <LoadingSpinner />
            <p className="mt-4 text-slate-600 text-lg">
              Your personalized roadmap is being generated...
            </p>
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-xl shadow-md max-w-3xl mx-auto"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {careerGuidance && (
          <CareerGuidanceDisplay
            guidance={careerGuidance}
            onReset={handleReset}
          />
        )}
      </main>
   <footer className="mt-24 border-t border-slate-100 bg-white">
  <div className="max-w-6xl mx-auto px-6 py-12">
    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
      
      {/* Brand & Credit */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold tracking-tight text-slate-900">
          AI Career Mentor
        </h3>
        <div className="flex items-center gap-2 text-sm text-slate-500">
         
         <footer className="flex items-center gap-2 text-sm text-slate-500">
          © {new Date().getFullYear()} 
        </footer>

         <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>
            Crafted by{' '}
            <a 
              href="https://yourportfolio.com" // Replace with your portfolio or personal site
              target="_blank"
              rel="noreferrer"
              className="font-medium text-slate-700 hover:text-indigo-600 transition-colors"
            >
              Jit Mondal
            </a>
          </span>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex items-center gap-6">
        <a 
          href="https://github.com/yourusername" // Replace with your actual GitHub link
          target="_blank" 
          rel="noreferrer"
          className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition flex items-center gap-1"
        >
          GitHub
        </a>
        <a 
          href="https://linkedin.com/in/yourprofile" // Replace with your actual LinkedIn link
          target="_blank" 
          rel="noreferrer"
          className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition flex items-center gap-1"
        >
          LinkedIn
        </a>
        <a 
          href="https://yourportfolio.com" // Replace with your actual Portfolio link
          target="_blank" 
          rel="noreferrer"
          className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition flex items-center gap-1"
        >
          Portfolio
        </a>
      </div>
      
    </div>
  </div>
</footer>
</div>
  );
};
export default App;
