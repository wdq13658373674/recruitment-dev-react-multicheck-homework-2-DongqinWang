import './MultiCheck.css';

import React, { useEffect, FC, useState } from 'react';
import { Card } from 'antd';
import { LabelCheck } from './LabelCheck';

export type Option = {
  label: string,
  value: string
}


/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options. Assume no duplicated labels or values
 * @param {string[]} values - If `undefined`, makes the component in uncontrolled mode with no options checked;
 *                            if not undefined, makes the component to controlled mode with corresponding options checked.
 *                            The values CAN be duplicated or NOT in the provided options
 * @param {number} columns - default value is 1. If it's bigger than all options count, make it same as the count of all options 
 * @param {Function} onChange - if not undefined, when checked options are changed, they should be passed to outside;
 *                              if undefined, the options can still be selected, but won't notify the outside
 * @param {Function} onRender - will be called if current component rendered. Determine the balance between a reasonable
 *                              render count and readable code
 */
export type Props = {
  label?: string,
  options: Option[],
  columns?: number,
  values?: string[]
  onChange?: (options: Option[]) => void,
  onRender: () => void
}

export const MultiCheck: FC<Props> = (props) => {
  const { onRender, onChange, label, options, values, columns } = props;

  const [checkValues, setCheckValues] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [columnsValues, setColumnsValues] = useState<number>(1);

  {
    // NOTE Don't modify the code block, it can be considered as a performance hint,
    //      you need to find a way to avoid triggering it infinitely
    console.log('### > MultiCheck');
    useEffect(() => {
      onRender()
    }, [])
  }

  // initialize checkValues
  useEffect(() => {
    if (values) {
      const existValues = options.map(option => option.value).filter(value => values.indexOf(value) !== -1);
      existValues.length !== checkValues.length && setCheckValues(existValues);
    }
  }, [values, options]);

  // initialize columns
  useEffect(() => {
    if (columns) {
      let length = options.length + 1;
      columns > length ? setColumnsValues(length) : setColumnsValues(columns);
    }
  }, [columns, options]);

  //listen option to change select all state
  useEffect(() => {
    checkValues.length >= options.length ? setIsCheckAll(true) : setIsCheckAll(false);

    // passed to outside
    if (onChange) {
      const newCheckArr = options.filter((option: Option) => checkValues.indexOf(option.value) !== -1);
      onChange(newCheckArr);
    }
  }, [checkValues]);

  /**
   * option change
   * @param target : eventTarget
   */
  function onCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
    let target = e.target;
    if (target.checked) {
      const newCheckArr = [...checkValues, target.value];
      setCheckValues(newCheckArr);
    } else {
      let idx = checkValues.indexOf(target.value);
      checkValues.splice(idx, 1)
      setCheckValues([...checkValues]);
    }
  }

  /**
   * select all change
   * @param e : eventT
   */
  function onCheckAllChange(e: React.ChangeEvent<HTMLInputElement>) {
    let target = e.target;
    if (target.checked) {
      const newCheckArr = options.map((option: Option) => {
        return option.value;
      })
      setCheckValues(newCheckArr);
    } else {
      setCheckValues([]);
    }
  }

  /**
   * calculate element order
   * Make the column even
   * @param index : option index
   */
  function getFlexOrder(index: number): number {
    let optionLen = options.length + 1;
    let maxRows = Math.ceil(optionLen / columnsValues);
    let fillColumns = optionLen % columnsValues;
    let column = Math.floor(index / maxRows);
    let row = (index - (column * maxRows));

    if (fillColumns !== 0
      && (column > fillColumns || (column === fillColumns && row === (maxRows - 1)))
    ) {
      row += 1;
      if (row >= (maxRows - 1)) {
        row = 0;
        column += 1;
      }
    }

    let order = column + row * columnsValues;

    return order;
  }

  return <div>
    <Card
      data-testid="card"
      title={label}
    >
      <div className="MultiCheck">

        {/* select all option*/}
        <div
          data-testid="selectAll"
          style={{
            width: `${100 / columnsValues}%`,
          }}
        >
          <LabelCheck
            option={{
              label: 'select all',
              value: '-1'
            }}
            isCheck={isCheckAll}
            onCheckChange={onCheckAllChange}
          />
        </div>

        {/* other options */}
        {
          options.map((option: Option, index: number) => {
            return (
              <div
                data-testid="labelCheckBox"
                key={option.label}
                style={{
                  order: getFlexOrder(index + 1),
                  width: `${100 / columnsValues}%`
                }}
              >
                <LabelCheck
                  option={option}
                  isCheck={checkValues && checkValues.indexOf(option.value) !== -1}
                  onCheckChange={onCheckChange}
                />
              </div>
            )
          })
        }
      </div>
    </Card>
  </div>
}

