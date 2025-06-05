# Security Policy

## Security Measures Implemented

### 1. Content Security Policy (CSP)
- Strict CSP headers implemented in `index.html`
- Prevents XSS attacks by controlling resource loading
- Disallows inline scripts and unsafe evaluations
- Restricts external resource loading to trusted domains

### 2. HTTP Security Headers
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-XSS-Protection: 1; mode=block` - Enables XSS filtering
- `Referrer-Policy: strict-origin-when-cross-origin` - Limits referrer information
- `Permissions-Policy` - Restricts access to sensitive browser APIs

### 3. Input Validation & Sanitization
- All user inputs are validated and sanitized
- Email validation using RFC 5322 compliant regex
- URL validation for external links
- XSS prevention through input sanitization

### 4. Rate Limiting
- Contact form submissions are rate-limited
- Prevents spam and abuse
- 15-minute sliding window with 3 attempts maximum

### 5. Secure External Links
- All external links use `rel="noopener noreferrer"`
- URL validation before opening external links
- HTTPS-only external connections

### 6. Build Security
- Source maps disabled in production builds
- Dependencies regularly audited for vulnerabilities
- Minimal attack surface with unused components removed

## Reporting Security Issues

If you discover a security vulnerability, please send an email to:
**security@jeffreyescobar.dev**

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

## Security Best Practices for Deployment

### Environment Variables
- Never commit `.env` files to version control
- Use environment-specific configuration files
- Prefix client-side variables with `VITE_`
- Store sensitive data in secure vaults

### HTTPS Configuration
```nginx
# Nginx security headers
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options nosniff;
add_header X-Frame-Options DENY;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

### Regular Updates
- Keep dependencies updated: `npm audit fix`
- Monitor security advisories
- Update browserslist: `npx update-browserslist-db@latest`

## Security Testing

Run security tests:
```bash
npm run test src/test/security.test.tsx
```

## Compliance

This application follows:
- OWASP Top 10 security guidelines
- Modern web security best practices
- Privacy-by-design principles

Last updated: January 2025 