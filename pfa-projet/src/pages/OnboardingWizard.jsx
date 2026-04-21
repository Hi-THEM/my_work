import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, ArrowLeft, Target, Activity, Check } from 'lucide-react';

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const { language } = useLanguage();
  
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [isLoading, setIsLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    goalType: '',
    experienceLevel: '',
    workoutDaysPerWeek: 3,
    heightCm: 175,
    currentWeightKg: 70
  });

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const finishOnboarding = async () => {
    setIsLoading(true);
    try {
      // Simulate API call and calculation for AI generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      await updateProfile({ profile: profileData, onboardingComplete: true });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-card rounded-2xl p-8 border border-secondary-bg relative overflow-hidden transition-all duration-300 min-h-[500px] flex flex-col">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary-bg">
          <div 
            className="h-full bg-energy-cyan transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8 mt-2">
          {step > 1 ? (
            <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-secondary-bg transition-colors text-text-muted">
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : <div></div>}
          <span className="font-mono text-sm font-bold text-text-muted">
            {language === 'fr' ? 'ÉTAPE' : 'STEP'} {step}/{totalSteps}
          </span>
        </div>

        {/* Step Content */}
        <div className="flex-1 flex flex-col relative">
          {step === 1 && (
            <div className="animate-[fade-in_0.3s_ease-out]">
              <h2 className="font-display text-3xl font-bold text-text-main uppercase mb-2">
                {language === 'fr' ? 'Votre Objectif' : 'Your Goal'}
              </h2>
              <p className="text-text-muted mb-6">
                {language === 'fr' ? 'Que souhaitez-vous accomplir ?' : 'What do you want to achieve?'}
              </p>
              <div className="space-y-3">
                {[
                  { id: 'lose_weight', labelFr: 'Perdre du Poids', labelEn: 'Lose Weight', icon: Activity },
                  { id: 'gain_muscle', labelFr: 'Prendre du Muscle', labelEn: 'Gain Muscle', icon: Target },
                  { id: 'improve_endurance', labelFr: 'Endurance', labelEn: 'Improve Endurance', icon: Activity }
                ].map((goal) => {
                  const Icon = goal.icon;
                  const isSelected = profileData.goalType === goal.id;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => setProfileData({ ...profileData, goalType: goal.id })}
                      className={`w-full p-4 rounded-xl flex items-center gap-4 transition-all duration-200 border ${
                        isSelected 
                          ? 'border-brand-blue bg-brand-blue/10 scale-[1.02]' 
                          : 'border-secondary-bg bg-secondary-bg/50 hover:bg-secondary-bg'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-brand-blue text-white' : 'bg-primary-bg text-text-muted'}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-text-main text-lg">
                        {language === 'fr' ? goal.labelFr : goal.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-[fade-in_0.3s_ease-out]">
              <h2 className="font-display text-3xl font-bold text-text-main uppercase mb-2">
                {language === 'fr' ? 'Votre Niveau' : 'Experience Level'}
              </h2>
              <p className="text-text-muted mb-6">
                {language === 'fr' ? 'Soyez honnête, on s\'adapte.' : 'Be honest, we will adapt.'}
              </p>
              <div className="space-y-3">
                {[
                  { id: 'beginner', labelFr: 'Débutant', labelEn: 'Beginner' },
                  { id: 'intermediate', labelFr: 'Intermédiaire', labelEn: 'Intermediate' },
                  { id: 'advanced', labelFr: 'Avancé', labelEn: 'Advanced' }
                ].map((lvl) => {
                  const isSelected = profileData.experienceLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => setProfileData({ ...profileData, experienceLevel: lvl.id })}
                      className={`w-full p-4 rounded-xl flex items-center justify-between transition-all duration-200 border ${
                        isSelected 
                          ? 'border-brand-blue bg-brand-blue/10 scale-[1.02]' 
                          : 'border-secondary-bg bg-secondary-bg/50 hover:bg-secondary-bg'
                      }`}
                    >
                      <span className="font-bold text-text-main text-lg">
                        {language === 'fr' ? lvl.labelFr : lvl.labelEn}
                      </span>
                      {isSelected && <Check className="w-5 h-5 text-brand-blue" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-[fade-in_0.3s_ease-out]">
              <h2 className="font-display text-3xl font-bold text-text-main uppercase mb-2">
                {language === 'fr' ? 'Vos Mensurations' : 'Your Metrics'}
              </h2>
              <p className="text-text-muted mb-6">
                {language === 'fr' ? 'Nécessaire pour le calcul des calories.' : 'Required for calorie calculations.'}
              </p>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wide">
                    {language === 'fr' ? 'Taille (cm)' : 'Height (cm)'}
                  </label>
                  <input 
                    type="number" 
                    value={profileData.heightCm}
                    onChange={(e) => setProfileData({ ...profileData, heightCm: e.target.value })}
                    className="tabular-nums font-mono text-2xl w-full px-4 py-3 bg-secondary-bg border border-secondary-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-energy-cyan text-text-main text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wide">
                    {language === 'fr' ? 'Poids actuel (kg)' : 'Current Weight (kg)'}
                  </label>
                  <input 
                    type="number" 
                    value={profileData.currentWeightKg}
                    onChange={(e) => setProfileData({ ...profileData, currentWeightKg: e.target.value })}
                    className="tabular-nums font-mono text-2xl w-full px-4 py-3 bg-secondary-bg border border-secondary-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-energy-cyan text-text-main text-center"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-[fade-in_0.3s_ease-out] flex-1 flex flex-col items-center justify-center text-center">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-secondary-bg"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-brand-blue border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display font-bold text-energy-cyan text-xl">IA</span>
                    </div>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-text-main uppercase mb-2">
                    {language === 'fr' ? 'Génération du plan...' : 'Generating Plan...'}
                  </h2>
                  <p className="text-text-muted text-sm">
                    {language === 'fr' ? 'Analyse de votre profil et de vos objectifs' : 'Analyzing your profile and goals'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-success" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-text-main uppercase mb-2">
                    {language === 'fr' ? 'Profil Complété' : 'Profile Complete'}
                  </h2>
                  <p className="text-text-muted mb-6">
                    {language === 'fr' ? 'Votre plan personnalisé est prêt.' : 'Your personalized plan is ready.'}
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8">
          {step < totalSteps ? (
            <button 
              onClick={handleNext}
              disabled={
                (step === 1 && !profileData.goalType) ||
                (step === 2 && !profileData.experienceLevel)
              }
              className="btn-press w-full py-3.5 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {language === 'fr' ? 'Suivant' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            !isLoading && (
              <button 
                onClick={finishOnboarding}
                className="btn-press w-full py-3.5 bg-success text-white font-bold rounded-lg hover:bg-green-600 transition-colors flex justify-center items-center"
              >
                {language === 'fr' ? 'Accéder au Dashboard' : 'Go to Dashboard'}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
