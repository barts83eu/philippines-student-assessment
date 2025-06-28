// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-BBYTHHCX89', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Assessment-specific tracking events
export const trackAssessmentStart = (assessmentId: string, subject: string) => {
  trackEvent('assessment_start', {
    assessment_id: assessmentId,
    subject: subject,
    event_category: 'assessment',
  });
};

export const trackAssessmentComplete = (
  assessmentId: string, 
  subject: string, 
  score: number, 
  duration: number
) => {
  trackEvent('assessment_complete', {
    assessment_id: assessmentId,
    subject: subject,
    score: score,
    duration: duration,
    event_category: 'assessment',
  });
};

export const trackUserRegistration = (method: string = 'email') => {
  trackEvent('sign_up', {
    method: method,
    event_category: 'user',
  });
};

export const trackUserLogin = (method: string = 'email') => {
  trackEvent('login', {
    method: method,
    event_category: 'user',
  });
};

export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', {
    language: language,
    event_category: 'user_preference',
  });
};

export const trackProgressView = () => {
  trackEvent('view_progress', {
    event_category: 'engagement',
  });
};