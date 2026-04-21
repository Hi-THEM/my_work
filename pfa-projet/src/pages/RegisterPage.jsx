import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(score, 4);
  };
  
  const strength = getStrength(formData.password);
  const strengthColors = ['bg-secondary-bg', 'bg-danger', 'bg-warning', 'bg-energy-cyan', 'bg-success'];

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (strength < 2) {
      setError(language === 'fr' ? 'Le mot de passe est trop faible' : 'Password is too weak');
      return;
    }
    
    setIsLoading(true);
    try {
      await register(formData);
      navigate('/onboarding'); // Redirect to wizard instead of dashboard directly
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-primary-bg flex items-center justify-center p-4 relative transition-colors duration-200">
      <Link to="/login" className="absolute top-6 left-6 flex items-center gap-2 text-text-muted hover:text-text-main transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">{language === 'fr' ? 'Retour à la connexion' : 'Back to login'}</span>
      </Link>

      <div className="max-w-md w-full glass-card rounded-2xl p-8 border border-secondary-bg relative z-10">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold text-text-main uppercase tracking-wide">
            {language === 'fr' ? 'Créer un compte' : 'Create Account'}
          </h2>
          <p className="text-text-muted mt-2">
            {language === 'fr' ? 'Rejoignez FitTrack aujourd\'hui.' : 'Join FitTrack today.'}
          </p>
        </div>
        
        {error && (
          <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide">
                {language === 'fr' ? 'Prénom' : 'First Name'}
              </label>
              <input 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-secondary-bg border border-secondary-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-energy-cyan text-text-main"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide">
                {language === 'fr' ? 'Nom' : 'Last Name'}
              </label>
              <input 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-secondary-bg border border-secondary-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-energy-cyan text-text-main"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide">
              {language === 'fr' ? 'Email' : 'Email'}
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary-bg border border-secondary-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-energy-cyan text-text-main"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1.5 uppercase tracking-wide">
              {language === 'fr' ? 'Mot de passe' : 'Password'}
            </label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-secondary-bg border border-secondary-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-energy-cyan text-text-main"
              required
            />
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-3">
                <div className="flex gap-1 h-1.5 mb-2">
                  {[1, 2, 3, 4].map(level => (
                    <div 
                      key={level} 
                      className={`flex-1 rounded-full transition-colors duration-300 ${strength >= level ? strengthColors[strength] : 'bg-secondary-bg'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-text-muted">
                  {strength <= 1 && (language === 'fr' ? 'Faible' : 'Weak')}
                  {strength === 2 && (language === 'fr' ? 'Moyen' : 'Fair')}
                  {strength === 3 && (language === 'fr' ? 'Bon' : 'Good')}
                  {strength === 4 && (language === 'fr' ? 'Fort' : 'Strong')}
                </span>
              </div>
            )}
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="btn-press w-full py-3.5 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors mt-4 flex justify-center items-center h-12"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              language === 'fr' ? 'Créer le compte' : 'Sign Up'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
