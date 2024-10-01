import React from 'react';
import './Checkbox.css';

interface Props {
  checked: boolean;
  onChange: (selected: boolean) => void;
  children?: React.ReactNode;
}

export default function Checkbox(props: Props) {
  const { checked, onChange } = props;

  return (
    <div className='sign__group sign__group--checkbox'>
      <input
        id='remember'
        name='remember'
        type='checkbox'
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <label htmlFor='remember'>{props.children}</label>
    </div>
  );
}
