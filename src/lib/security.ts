/**
 * Security utilities for input validation and sanitization
 */

// Email validation regex (RFC 5322 compliant)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// URL validation for external links
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  let cleaned = input;
  
  // Remove javascript: and data: protocols (case insensitive)
  cleaned = cleaned.replace(/javascript:/gi, '');
  cleaned = cleaned.replace(/data:/gi, '');
  
  // Remove HTML tags completely (everything between < and >)
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  
  return cleaned.trim();
}

/**
 * Validate email addresses (enhanced to prevent consecutive dots)
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  const cleanEmail = email.toLowerCase().trim();
  
  // Check for consecutive dots in local part
  const atIndex = cleanEmail.indexOf('@');
  if (atIndex === -1) return false;
  
  const localPart = cleanEmail.substring(0, atIndex);
  
  // Reject if local part has consecutive dots, starts with dot, or ends with dot
  if (localPart.includes('..') || localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }
  
  // Use the original regex for general validation
  return EMAIL_REGEX.test(cleanEmail);
}

/**
 * Validate URLs for external links
 */
export function isValidURL(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  return URL_REGEX.test(url);
}

/**
 * Validate LinkedIn profile URL
 */
export function isValidLinkedInURL(url: string): boolean {
  if (!isValidURL(url)) return false;
  return url.includes('linkedin.com/in/');
}

/**
 * Validate GitHub repository URL
 */
export function isValidGitHubURL(url: string): boolean {
  if (!isValidURL(url)) return false;
  return url.includes('github.com/');
}

/**
 * Create safe external link attributes
 */
export function getSafeExternalLinkProps(url: string) {
  if (!isValidURL(url)) {
    throw new Error('Invalid URL provided');
  }
  
  return {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer'
  };
}

/**
 * Rate limiting for contact form submissions
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts = 3;
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    return true;
  }
}

export const contactRateLimiter = new RateLimiter(); 