import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export const Input = forwardRef(
  (
    {
      label,
      type,
      autocomplete,
      inputStyle,
      labelStyle,
      errorMessage,
      onChange,
      onBlur,
      name,
    },
    ref
  ) => {
    return (
      <div className="relative">
        <input
          id={name}
          type={type}
          autoComplete={autocomplete}
          className={clsx(
            'w-full bg-neutral-200 flex-1 px-4 pt-5 py-2 rounded-md outline-none focus:rounded-b-none focus:border-b-2 transition-all duration-75 focus:border-b-primary-800 peer',
            inputStyle
          )}
          placeholder=" "
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
        />
        {label && (
          <label
            htmlFor={name}
            className={clsx(
              'absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-primary-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4',
              labelStyle
            )}
          >
            {label}
          </label>
        )}
        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  autocomplete: PropTypes.string,
  inputStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
};
