import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, disabled, defaultValue, children, ...props }, ref) => {
    return (
      <select
        className={twMerge(
          `
          flex 
          w-full 
          rounded-md 
          bg-neutral-700
          border
          border-transparent
          px-3 
          py-3 
          text-sm 
          file:border-0 
          file:bg-transparent 
          file:text-sm 
          file:font-medium 
          placeholder:text-neutral-400 
          disabled:cursor-not-allowed 
          disabled:opacity-50
          focus:outline-none
        `,
          disabled && 'opacity-75',
          className
        )}
        disabled={disabled}
        defaultValue={defaultValue}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;
