import React, { FC } from 'react';
import { Option } from './MultiCheck';

type Props = {
  option: Option,//single option object
  isCheck?: boolean,// checked state
  onCheckChange?: (target: any) => void // change callback function
}

export const LabelCheck: FC<Props> = (props) => {
  const { option, isCheck, onCheckChange } = props;

  /**
   * check state change
   */
  function checkStatusChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onCheckChange) {
      onCheckChange(e.target);
    }
  }

  return <div>
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px'
      }}
    >
      <input
        type="checkbox"
        value={option.value}
        onChange={checkStatusChange}
        checked={isCheck}
        style={{
          marginRight: '10px'
        }}
      />
      {option.label}
    </label>
  </div>
}
