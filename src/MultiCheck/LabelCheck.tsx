import React, { FC } from 'react';
import { Option } from './MultiCheck';
import './LabelCheck.css';

type Props = {
  option: Option,//single option object
  isCheck: boolean,// checked state
  onCheckChange: (e:any) => void // change callback function
}

export const LabelCheck: FC<Props> = (props) => {
  const { option, isCheck, onCheckChange } = props;

  return <label className="LabelCheck">
              <input
                  data-testid="input"
                  type="checkbox"
                  className="Checkbox"
                  value={option.value}
                  onChange={onCheckChange}
                  checked={isCheck}
              />
              <span data-testid="label">{option.label}</span>
          </label>
}
