// TODO more tests
import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MultiCheck } from './MultiCheck';

describe('MultiCheck', () => {
  describe('initialize', () => {
    it('renders the label if label provided', () => {
      const props = {
        label: 'MultiCheck-1654430578189',
        options: [],
        onRender: jest.fn()
      };
      const { getByTestId } = render(<MultiCheck {...props} />);
      const card = getByTestId('card');
      const title = within(card).queryByText('MultiCheck-1654430578189');

      expect(title).not.toBeNull();
    });

    it('renders the options if options provided', () => {
      const props = {
        label: '',
        options: [{ "label": "aaa", "value": "111" }, { "label": "bbb", "value": "222" }, { "label": "ccc", "value": "333" }, { "label": "ddd", "value": "444" }, { "label": "eee", "value": "555" }, { "label": "fff", "value": "666" }, { "label": "ggg", "value": "777" }, { "label": "hhh", "value": "888" }, { "label": "iii", "value": "999" }],
        onRender: jest.fn()
      };
      const { queryAllByTestId, getByTestId } = render(<MultiCheck {...props} />);
      const labelCheck = queryAllByTestId('labelCheckBox');
      const selectAll = getByTestId('selectAll');

      expect(selectAll).not.toBeNull();
      expect(labelCheck).toHaveLength(9);
    });
  });
});
