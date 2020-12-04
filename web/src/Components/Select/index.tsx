import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: {
      name: string;
    };
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({ name, options, ...rest }) => {
  return (
    <div className='select-block'>
      <select value='' id={name} {...rest}>
        <option value='' disabled hidden>
          Categoria
        </option>
        {options.map((option) => {
          return (
            <option key={option.value.name} value={option.value.name}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
