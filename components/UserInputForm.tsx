import React from 'react';
import { UserInput } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { WrenchIcon } from './icons/WrenchIcon';
import { HeartIcon } from './icons/HeartIcon';
import { TargetIcon } from './icons/TargetIcon';
import { ClockIcon } from './icons/ClockIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface UserInputFormProps {
  userInput: UserInput;
  setUserInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const formFields: {
  id: keyof UserInput;
  label: string;
  placeholder: string;
  rows: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  colSpan?: number;
  helper: string;
}[] = [
  {
    id: 'background',
    label: 'My Background',
    placeholder: 'E.g., Final-year computer science student, marketing professional with 5 years of experience...',
    rows: 4,
    icon: BookOpenIcon,
    colSpan: 2,
    helper: 'Helps the AI understand your current situation clearly.'
  },
  {
    id: 'skills',
    label: 'My Skills',
    placeholder: 'E.g., JavaScript, Python, communication, leadership...',
    rows: 5,
    icon: WrenchIcon,
    helper: 'Include both technical and soft skills.'
  },
  {
    id: 'interests',
    label: 'My Interests',
    placeholder: 'E.g., AI, web development, data science, entrepreneurship...',
    rows: 5,
    icon: HeartIcon,
    helper: 'Your interests help align your career path.'
  },
  {
    id: 'goals',
    label: 'My Career Goals',
    placeholder: 'E.g., I want a high-paying tech role or plan to pursue a master’s degree...',
    rows: 4,
    icon: TargetIcon,
    colSpan: 2,
    helper: 'Tell us where you want to go.'
  },
  {
    id: 'availability',
    label: 'My Availability for Learning',
    placeholder: 'E.g., 1–2 hours daily, weekends only...',
    rows: 2,
    icon: ClockIcon,
    colSpan: 2,
    helper: 'This helps create a realistic learning roadmap.'
  }
];

const UserInputForm: React.FC<UserInputFormProps> = ({
  userInput,
  setUserInput,
  onSubmit,
  isLoading
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInput(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = Object.values(userInput).some(
    value => typeof value === 'string' && value.trim() !== ''
  );

  return (
    <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur border border-slate-200 rounded-3xl shadow-2xl p-10">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Let’s design your career roadmap
        </h2>
        <p className="text-slate-500 mt-3 max-w-xl mx-auto">
          Share a few details and our AI will generate a personalized career plan just for you.
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {formFields.map(field => (
          <div
            key={field.id}
            className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition ${
              field.colSpan === 2 ? 'md:col-span-2' : ''
            }`}
          >
            <label className="flex items-center gap-3 mb-3 text-lg font-semibold text-slate-800">
              <div className="w-9 h-9 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <field.icon className="w-5 h-5" />
              </div>
              {field.label}
            </label>

            <textarea
              name={field.id}
              rows={field.rows}
              value={userInput[field.id]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            />

            <p className="mt-2 text-xs text-slate-500">
              {field.helper}
            </p>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isFormValid || isLoading}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg text-white 
                     bg-gradient-to-r from-green-600 to-emerald-600 
                     shadow-xl shadow-green-200 
                     hover:scale-[1.03] hover:shadow-2xl 
                     transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SparklesIcon className="w-6 h-6" />
          {isLoading ? 'Creating Your Plan...' : 'Get My AI Career Plan'}
        </button>
      </div>

      {/* Footer hint */}
      <p className="mt-6 text-center text-sm text-slate-500">
        ⚡ Most users receive their personalized roadmap in under 10 seconds
      </p>
    </div>
  );
};

export default UserInputForm;