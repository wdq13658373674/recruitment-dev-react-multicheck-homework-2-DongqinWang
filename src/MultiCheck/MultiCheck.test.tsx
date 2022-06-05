// TODO more tests
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import { MultiCheck } from './MultiCheck';
import '@testing-library/jest-dom/extend-expect';

describe('MultiCheck', () => {
  describe('initialize', () => {
    // it('renders the label if label provided', () => {
    //   const props = {
    //       label:'MultiCheck-1654430578189',
    //       options:[],
    //       onRender:jest.fn()
    //   };
    //   const { getByTestId } = render(<MultiCheck {...props}/>);
    //   const card = getByTestId('card');
    //   expect(card).toHaveAttribute('title',expect.stringContaining('MultiCheck-1654430578189'));
    // });

      it('renders the options if options provided', () => {
          const props = {
              label:'',
              options:[{"label":"aaa","value":"111"},{"label":"bbb","value":"222"},{"label":"ccc","value":"333"},{"label":"ddd","value":"444"},{"label":"eee","value":"555"},{"label":"fff","value":"666"},{"label":"ggg","value":"777"},{"label":"hhh","value":"888"},{"label":"iii","value":"999"}],
              onRender:jest.fn()
          };
          const { queryAllByTestId, getByTestId } = render(<MultiCheck {...props}/>);
          const labelCheck = queryAllByTestId('labelCheckBox');
          const selectAll = getByTestId('selectAll');

          expect(selectAll).not.toBeNull();
          expect(labelCheck).toHaveLength(9);
      });
  });
});
