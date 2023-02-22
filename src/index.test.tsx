import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

test('renders login page', () => {
  render(<BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Greetings/i);
  expect(linkElement).toBeInTheDocument();
});
