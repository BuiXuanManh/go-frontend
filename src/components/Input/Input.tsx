import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  classNameInput?: string;
  classNameError?: string;
}

export default function Input(props: Props) {
  const {
    errorMessage,
    className,
    classNameError = 'ml-1 mt-1 min-h-[1.25rem] text-sm font-medium text-red-600 text-left',
    classNameInput = 'border-border border-1 py-1.5 mt-2 w-full ',
    ...rest
  } = props;

  return (
    <div className={className}>
      <input
        className={classNameInput + (errorMessage ? ' border-red-500 border' : '')}
        {...rest}
      />
      <p className={classNameError}>{errorMessage}</p>
    </div>
  );
}
