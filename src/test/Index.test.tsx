import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Index from '../pages/Index';

// Mock assets
vi.mock('@/assets/profile.jpg', () => ({
  default: 'mocked-profile.jpg'
}));

vi.mock('@/assets/FRED.png', () => ({
  default: 'mocked-fred.png'
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Index Page', () => {
  beforeEach(() => {
    // Reset window.open mock
    Object.defineProperty(window, 'open', {
      writable: true,
      value: vi.fn(),
    });
    
    // Reset window.location mock
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });
  });

  describe('Rendering Tests', () => {
    it('renders hero section with correct content', () => {
      renderWithRouter(<Index />);
      
      expect(screen.getByText('Jeffrey')).toBeInTheDocument();
      expect(screen.getByText('Escobar')).toBeInTheDocument();
      expect(screen.getByText('SWE | Founder | Technologist')).toBeInTheDocument();
      expect(screen.getByText('Driven by vision. Built on discipline. Engineering elegant systems with clarity and control.')).toBeInTheDocument();
    });

    it('renders profile picture with correct attributes', () => {
      renderWithRouter(<Index />);
      
      const profileImage = screen.getByAltText('Jeffrey Escobar Profile');
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute('src', 'mocked-profile.jpg');
    });

    it('renders LinkedIn button in hero section', () => {
      renderWithRouter(<Index />);
      
      const linkedinButtons = screen.getAllByText('LinkedIn');
      expect(linkedinButtons).toHaveLength(2); // One in hero, one in contact
      
      const heroLinkedInButton = linkedinButtons[0].closest('a');
      expect(heroLinkedInButton).toHaveAttribute('href', 'https://linkedin.com/in/jeffreyiescobar');
      expect(heroLinkedInButton).toHaveAttribute('target', '_blank');
    });
  });

  describe('Featured Project Section', () => {
    it('renders featured project section', () => {
      renderWithRouter(<Index />);
      
      expect(screen.getByText('Featured Project')).toBeInTheDocument();
      expect(screen.getByText('Showcasing my latest work')).toBeInTheDocument();
    });

    it('renders FRED project logo', () => {
      renderWithRouter(<Index />);
      
      const fredLogo = screen.getByAltText('FRED AI Visualizer Logo');
      expect(fredLogo).toBeInTheDocument();
      expect(fredLogo).toHaveAttribute('src', 'mocked-fred.png');
    });

    it('renders project description and tech stack', () => {
      renderWithRouter(<Index />);
      
      expect(screen.getByText(/A powerful web app that transforms raw Federal Reserve Economic Data/)).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Go')).toBeInTheDocument();
      expect(screen.getByText('FRED API')).toBeInTheDocument();
      expect(screen.getByText('OpenAI API')).toBeInTheDocument();
    });

    it('handles project link click', () => {
      const mockOpen = vi.fn();
      window.open = mockOpen;
      
      renderWithRouter(<Index />);
      
      const viewProjectButton = screen.getByText('View Project');
      fireEvent.click(viewProjectButton);
      
      expect(mockOpen).toHaveBeenCalledWith('https://fred-dashboard-2025.vercel.app/', '_blank');
    });
  });

  describe('About Me Section', () => {
    it('renders about section with skills', () => {
      renderWithRouter(<Index />);
      
      expect(screen.getByText('About Me')).toBeInTheDocument();
      expect(screen.getByText(/I'm a software engineer with the mind of a founder/)).toBeInTheDocument();
      
      expect(screen.getByText('Engineering')).toBeInTheDocument();
      expect(screen.getByText('Product Thinking')).toBeInTheDocument();
      expect(screen.getByText('Exploration')).toBeInTheDocument();
    });

    it('renders skill descriptions', () => {
      renderWithRouter(<Index />);
      
      expect(screen.getByText('End-to-end software systems built with precision, speed, and modern frameworks.')).toBeInTheDocument();
      expect(screen.getByText('Designing clean, intuitive interfaces rooted in real user behavior.')).toBeInTheDocument();
      expect(screen.getByText('Pushing boundaries with new tools, technologies, and smarter solutions.')).toBeInTheDocument();
    });
  });

  describe('Contact Section', () => {
    it('renders contact section', () => {
      renderWithRouter(<Index />);
      
      expect(screen.getByText('Let\'s Connect')).toBeInTheDocument();
      expect(screen.getByText('Open to meaningful collaborations and new opportunities. If something resonates, feel free to reach out!')).toBeInTheDocument();
    });

    it('handles LinkedIn button click in contact section', () => {
      const mockOpen = vi.fn();
      window.open = mockOpen;
      
      renderWithRouter(<Index />);
      
      const linkedinButtons = screen.getAllByText('LinkedIn');
      const contactLinkedInButton = linkedinButtons[1]; // Second LinkedIn button
      fireEvent.click(contactLinkedInButton);
      
      expect(mockOpen).toHaveBeenCalledWith('https://linkedin.com/in/jeffreyiescobar', '_blank');
    });

    it('handles email button click', () => {
      renderWithRouter(<Index />);
      
      const emailButton = screen.getByText('Email Me');
      fireEvent.click(emailButton);
      
      expect(window.location.href).toBe('mailto:jeffreyescobar280@gmail.com');
    });
  });

  describe('Footer', () => {
    it('renders footer with copyright', () => {
      renderWithRouter(<Index />);
      
      expect(screen.getByText('Jeffrey Escobar © 2025. All rights reserved.')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive classes', () => {
      renderWithRouter(<Index />);
      
      const heroTitle = screen.getByText('Jeffrey').closest('h1');
      expect(heroTitle).toHaveClass('text-5xl', 'md:text-8xl');
    });
  });

  describe('Accessibility', () => {
    it('has proper alt text for images', () => {
      renderWithRouter(<Index />);
      
      expect(screen.getByAltText('Jeffrey Escobar Profile')).toBeInTheDocument();
      expect(screen.getByAltText('FRED AI Visualizer Logo')).toBeInTheDocument();
    });

    it('has proper link attributes for external links', () => {
      renderWithRouter(<Index />);
      
      const linkedinButtons = screen.getAllByText('LinkedIn');
      const heroLinkedInButton = linkedinButtons[0].closest('a');
      
      expect(heroLinkedInButton).toHaveAttribute('rel', 'noopener noreferrer');
      expect(heroLinkedInButton).toHaveAttribute('target', '_blank');
    });
  });
}); 