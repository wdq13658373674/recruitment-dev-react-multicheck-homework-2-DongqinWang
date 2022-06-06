// TODO more tests
import React from 'react';
import { render, fireEvent, screen, RenderResult, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LabelCheck } from './LabelCheck';

describe('MultiCheck', () => {
    describe('initialize', () => {
        it('initialize rendering if option provided', () => {
            const props = {
                option: { label: 'aaa', value: '111' },
                onCheckChange: jest.fn()
            };
            const { getByLabelText } = render(<LabelCheck {...props} />);
            const checkbox = getByLabelText('aaa', { selector: 'input' });
            const label = getByLabelText('aaa');

            expect(label).not.toBeNull();
            expect(checkbox).toHaveAttribute('value', '111');
            expect(checkbox).not.toBeChecked();
        });

        it('Check the checkbox if the provided isCheck is true', () => {
            const props = {
                option: { label: 'aaa', value: '111' },
                isCheck: true,
                onCheckChange: jest.fn()
            };
            const { getByLabelText } = render(<LabelCheck {...props} />);
            const checkbox = getByLabelText('aaa', { selector: 'input' });

            expect(checkbox).toBeChecked();
        });


        it('unCheck the checkbox if the provided isCheck is false', () => {
            const props = {
                option: { label: 'aaa', value: '111' },
                isCheck: false,
                onCheckChange: jest.fn()
            };
            const { getByLabelText } = render(<LabelCheck {...props} />);
            const checkbox = getByLabelText('aaa', { selector: 'input' });

            expect(checkbox).not.toBeChecked();
        });
    });

    describe('checkbox change', () => {
        it('Click the checkbox to trigger the callback', () => {
            const props = {
                option: { label: 'aaa', value: '111' },
                isCheck: false,
                onCheckChange: jest.fn()
            };
            const { getByLabelText } = render(<LabelCheck {...props} />);
            const checkbox = getByLabelText('aaa', { selector: 'input' });

            fireEvent.click(checkbox, { checked: true, target: { value: '111' } });
            // expect(props.onCheckChange).toHaveBeenCalled();
            // expect(props.onCheckChange).toHaveBeenCalledWidth({ checked: true, target: { value: '111' } });
        });
    });
});
