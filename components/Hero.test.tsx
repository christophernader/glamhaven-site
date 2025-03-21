import { render, screen } from '@testing-library/react';
import Hero from './Hero';

// Mock framer-motion to avoid issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Hero Component', () => {
  it('renders the hero section with title', () => {
    render(<Hero />);
    
    // This test will need to be adjusted based on your actual Hero component content
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
  });
}); 