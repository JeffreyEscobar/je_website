import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders the Index page by default', async () => {
    render(<App />);
    
    // First check that loading state appears
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for lazy-loaded content to appear
    await waitFor(() => {
      expect(screen.getByText('Jeffrey')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    await waitFor(() => {
      expect(screen.getByText('Escobar')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('provides React Query context', async () => {
    render(<App />);
    
    // Wait for lazy-loaded content to load, indicating QueryClient is working
    await waitFor(() => {
      expect(screen.getByText('Jeffrey')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
}); 