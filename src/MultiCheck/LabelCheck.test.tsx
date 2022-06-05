// TODO more tests
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LabelCheck } from './LabelCheck';

describe('MultiCheck', () => {
    describe('initialize', () => {
        it('renders', () => {
          const props = {
              option:{label:'aaa', value:'111'},
              isCheck:false,
              onCheckChange:jest.fn()
          };
          const { getByTestId } = render(<LabelCheck {...props}/>);
          const input = getByTestId('input');
          const label = getByTestId('label');

          expect(input).toHaveAttribute('value','111');
          expect(label).toHaveTextContent('aaa');
          expect(input).not.toBeChecked();
        });
    });
});
