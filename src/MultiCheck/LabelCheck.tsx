import React, { FC } from 'react';
import { Option } from './MultiCheck';
import './LabelCheck.css';

type Props = {
  option: Option,//single option object
  isCheck?: boolean,// checked state
  onCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void // change callback function
}

export const LabelCheck: FC<Props> = (props) => {
  const { option, isCheck, onCheckChange } = props;

  return <label className="LabelCheck">
    <input
      type="checkbox"
      className="Checkbox"
      value={option.value}
      onChange={onCheckChange}
      checked={isCheck}
    />
    <span>{option.label}</span>
  </label>
}
