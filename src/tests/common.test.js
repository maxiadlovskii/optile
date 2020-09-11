import { render } from '@testing-library/react';
import React from 'react';

import { Loader } from '../components/common/Loader/Loader';
import { Failed } from '../components/common/Failed/Failed';

test('renders loading', () => {
  const { getByText } = render(<Loader />);
  const linkElement = getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Smth bad happened', () => {
  const { getByText } = render(<Failed />);
  const linkElement = getByText(/Smth bad happened/i);
  expect(linkElement).toBeInTheDocument();
});
