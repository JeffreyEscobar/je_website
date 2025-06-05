import { describe, it, expect } from 'vitest';
import { 
  sanitizeInput, 
  isValidEmail, 
  isValidURL, 
  isValidLinkedInURL, 
  isValidGitHubURL, 
  getSafeExternalLinkProps,
  contactRateLimiter 
} from '../lib/security';

describe('Security Utils', () => {
  describe('sanitizeInput', () => {
    it('removes HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('alert("xss")');
      expect(sanitizeInput('<img src="x" onerror="alert(1)">')).toBe('');
    });

    it('removes javascript: protocol', () => {
      expect(sanitizeInput('javascript:alert("xss")')).toBe('alert("xss")');
      expect(sanitizeInput('JAVASCRIPT:alert("xss")')).toBe('alert("xss")');
    });

    it('removes data: protocol', () => {
      expect(sanitizeInput('data:text/html,<script>alert(1)</script>')).toBe('text/html,alert(1)');
    });

    it('trims whitespace', () => {
      expect(sanitizeInput('  hello world  ')).toBe('hello world');
    });

    it('handles non-string input', () => {
      expect(sanitizeInput(null as any)).toBe('');
      expect(sanitizeInput(undefined as any)).toBe('');
      expect(sanitizeInput(123 as any)).toBe('');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
      expect(isValidEmail('user123@domain123.org')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test..test@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(null as any)).toBe(false);
    });
  });

  describe('isValidURL', () => {
    it('validates correct URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://www.example.com')).toBe(true);
      expect(isValidURL('https://subdomain.example.com/path?query=value')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(isValidURL('not-a-url')).toBe(false);
      expect(isValidURL('ftp://example.com')).toBe(false);
      expect(isValidURL('javascript:alert(1)')).toBe(false);
      expect(isValidURL('')).toBe(false);
      expect(isValidURL(null as any)).toBe(false);
    });
  });

  describe('isValidLinkedInURL', () => {
    it('validates LinkedIn profile URLs', () => {
      expect(isValidLinkedInURL('https://linkedin.com/in/username')).toBe(true);
      expect(isValidLinkedInURL('https://www.linkedin.com/in/username')).toBe(true);
    });

    it('rejects non-LinkedIn URLs', () => {
      expect(isValidLinkedInURL('https://github.com/user')).toBe(false);
      expect(isValidLinkedInURL('https://linkedin.com/company/example')).toBe(false);
    });
  });

  describe('isValidGitHubURL', () => {
    it('validates GitHub URLs', () => {
      expect(isValidGitHubURL('https://github.com/user/repo')).toBe(true);
      expect(isValidGitHubURL('https://www.github.com/user')).toBe(true);
    });

    it('rejects non-GitHub URLs', () => {
      expect(isValidGitHubURL('https://gitlab.com/user/repo')).toBe(false);
      expect(isValidGitHubURL('https://linkedin.com/in/user')).toBe(false);
    });
  });

  describe('getSafeExternalLinkProps', () => {
    it('returns safe link properties for valid URLs', () => {
      const props = getSafeExternalLinkProps('https://example.com');
      expect(props).toEqual({
        href: 'https://example.com',
        target: '_blank',
        rel: 'noopener noreferrer'
      });
    });

    it('throws error for invalid URLs', () => {
      expect(() => getSafeExternalLinkProps('invalid-url')).toThrow('Invalid URL provided');
    });
  });

  describe('contactRateLimiter', () => {
    it('allows initial requests', () => {
      const identifier = 'test-user-1';
      expect(contactRateLimiter.isAllowed(identifier)).toBe(true);
      expect(contactRateLimiter.isAllowed(identifier)).toBe(true);
      expect(contactRateLimiter.isAllowed(identifier)).toBe(true);
    });

    it('blocks after max attempts', () => {
      const identifier = 'test-user-2';
      // Use up the allowed attempts
      contactRateLimiter.isAllowed(identifier);
      contactRateLimiter.isAllowed(identifier);
      contactRateLimiter.isAllowed(identifier);
      
      // Next attempt should be blocked
      expect(contactRateLimiter.isAllowed(identifier)).toBe(false);
    });

    it('handles different identifiers separately', () => {
      const identifier1 = 'test-user-3';
      const identifier2 = 'test-user-4';
      
      // Use up attempts for first user
      contactRateLimiter.isAllowed(identifier1);
      contactRateLimiter.isAllowed(identifier1);
      contactRateLimiter.isAllowed(identifier1);
      
      // Second user should still be allowed
      expect(contactRateLimiter.isAllowed(identifier2)).toBe(true);
    });
  });
}); 