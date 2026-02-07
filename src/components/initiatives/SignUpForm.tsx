import { useState } from 'react';
import FormField from './FormField';
import { EXPERIENCE_OPTIONS, FORM_COLORS } from './formConstants';

interface SignUpFormProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function SignUpForm({ onClose, isOpen }: SignUpFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    topic: '',
    experience: '',
    bio: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Here you can add your Firebase submission logic
      console.log('Form submitted:', formData);
      setSubmitMessage('Thank you for signing up! We will contact you soon.');
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          topic: '',
          experience: '',
          bio: '',
        });
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-gray-950 rounded-2xl border border-yellow-400 max-w-lg w-full max-h-[85vh] overflow-y-auto pointer-events-auto shadow-2xl animate-fadeIn scale-85 sm:scale-100 origin-center"
          style={{ borderColor: FORM_COLORS.accentYellow }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gray-950 border-b border-yellow-400 p-4 flex justify-between items-center"
            style={{ borderColor: FORM_COLORS.accentYellow }}>
            <h2 className="text-white font-bold text-lg md:text-xl" style={{ fontFamily: 'Dosis, sans-serif' }}>
              SPEAKER SIGN UP
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-2xl font-bold leading-none"
            >
              ✕
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            <FormField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />

            <FormField
              label="Topic You'd Like to Speak About"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g., Career in Technology, Workplace Safety"
              required
            />

            <FormField
              label="Years of Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              as="select"
              required
            >
              <option value="">Select years of experience</option>
              {EXPERIENCE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </FormField>

            <FormField
              label="Short Bio / About You"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a bit about yourself and why you'd be a great speaker..."
              as="textarea"
              rows={3}
              required
            />

            {/* Submit Message */}
            {submitMessage && (
              <div className={`p-3 rounded-lg text-center text-sm ${submitMessage.includes('Thank you') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}
                style={{ fontFamily: 'Dosis, sans-serif' }}>
                {submitMessage}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 font-semibold py-2 text-sm rounded-lg transition-all border text-white"
                style={{ 
                  fontFamily: 'Dosis, sans-serif',
                  backgroundColor: FORM_COLORS.accentYellow,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 font-semibold py-2 text-sm rounded-lg transition-all border text-white hover:bg-gray-900"
                style={{ 
                  fontFamily: 'Dosis, sans-serif',
                  color: FORM_COLORS.accentYellow,
                  borderColor: FORM_COLORS.accentYellow
                }}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}