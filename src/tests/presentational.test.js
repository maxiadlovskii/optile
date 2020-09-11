import { render } from '@testing-library/react';
import React from 'react';

import { TemperatureBarCharList } from '../components/presentational/TemperatureBarCharList/TemperatureBarCharList';
import { DaysList } from '../components/presentational/DaysList/DaysList';

import { days } from './mock';

test('renders TemperatureBarCharList', () => {
  const { barChars } = days[0];
  const { container } = render(<TemperatureBarCharList list={ barChars } unit="C" tempKey="tempC" />);
  expect(container).toMatchSnapshot();
});

test('renders DaysList', () => {
  const list = days.slice(0, 3);
  const handler = console.log;
  const { container } = render(
    <DaysList
      list={ list }
      unit="C"
      tempKey="tempC"
      curDate="11 Sep 20"
      handleBack={ handler }
      handleForward={ handler }
      showForwardButton={ true }
      showBackButton={ false }
      handleCardClick={ handler }
      swipeHandlers={{}}
    />
  );
  expect(container).toMatchSnapshot();
});
