import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { Search, Eye, EyeOff, AlertCircle, Check, ChevronDown } from 'lucide-react';

// Base Input Component
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isRTL?: boolean;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  isRTL = false,
  fullWidth = false,
  className = '',
  type = 'text',
  ...props
}, ref) => {
  const hasError = !!error;
  
  const inputClasses = [
    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
    'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    leftIcon ? (isRTL ? 'pr-10' : 'pl-10') : '',
    rightIcon ? (isRTL ? 'pl-10' : 'pr-10') : '',
    hasError ? 'border-destructive focus-visible:ring-destructive' : '',
    isRTL ? 'text-right' : 'text-left',
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`space-y-2 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isRTL ? 'text-right' : 'text-left'}`}>
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`}>
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
        
        {rightIcon && (
          <div className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'left-3' : 'right-3'}`}>
            {rightIcon}
          </div>
        )}
        
        {hasError && !rightIcon && (
          <div className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-destructive ${isRTL ? 'left-3' : 'right-3'}`}>
            <AlertCircle className="h-4 w-4" />
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className={`text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
          {error ? (
            <span className="text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error}
            </span>
          ) : (
            <span className="text-muted-foreground">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Search Input Component
interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {
  onClear?: () => void;
  showClearButton?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  onClear,
  showClearButton = true,
  placeholder,
  isRTL = false,
  value,
  ...props
}, ref) => {
  const searchPlaceholder = placeholder || (isRTL ? 'חיפוש...' : 'Search...');
  const showClear = showClearButton && value && value.toString().length > 0;

  return (
    <Input
      ref={ref}
      type="search"
      placeholder={searchPlaceholder}
      leftIcon={<Search className="h-4 w-4" />}
      rightIcon={showClear ? (
        <button
          type="button"
          onClick={onClear}
          className="hover:text-foreground transition-colors"
          aria-label={isRTL ? 'נקה חיפוש' : 'Clear search'}
        >
          <Check className="h-4 w-4" />
        </button>
      ) : undefined}
      isRTL={isRTL}
      value={value}
      {...props}
    />
  );
});

SearchInput.displayName = 'SearchInput';

// Password Input Component
interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {
  showToggle?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
  showToggle = true,
  isRTL = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <Input
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      rightIcon={showToggle ? (
        <button
          type="button"
          onClick={togglePassword}
          className="hover:text-foreground transition-colors"
          aria-label={showPassword ? 
            (isRTL ? 'הסתר סיסמה' : 'Hide password') : 
            (isRTL ? 'הצג סיסמה' : 'Show password')
          }
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      ) : undefined}
      isRTL={isRTL}
      {...props}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

// Textarea Component
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isRTL?: boolean;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  isRTL = false,
  fullWidth = false,
  resize = 'vertical',
  className = '',
  ...props
}, ref) => {
  const hasError = !!error;
  
  const textareaClasses = [
    'flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
    'ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    hasError ? 'border-destructive focus-visible:ring-destructive' : '',
    isRTL ? 'text-right' : 'text-left',
    fullWidth ? 'w-full' : '',
    `resize-${resize}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`space-y-2 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isRTL ? 'text-right' : 'text-left'}`}>
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        className={textareaClasses}
        {...props}
      />
      
      {(error || helperText) && (
        <div className={`text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
          {error ? (
            <span className="text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error}
            </span>
          ) : (
            <span className="text-muted-foreground">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

// Select Component
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  isRTL?: boolean;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  helperText,
  options,
  placeholder,
  isRTL = false,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const hasError = !!error;
  
  const selectClasses = [
    'flex h-10 w-full items-center justify-between rounded-md border border-input',
    'bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50 appearance-none',
    hasError ? 'border-destructive focus:ring-destructive' : '',
    isRTL ? 'text-right' : 'text-left',
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`space-y-2 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isRTL ? 'text-right' : 'text-left'}`}>
          {label}
          {props.required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          className={selectClasses}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        <div className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`}>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      
      {(error || helperText) && (
        <div className={`text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
          {error ? (
            <span className="text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error}
            </span>
          ) : (
            <span className="text-muted-foreground">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

// Price Range Input Component
interface PriceRangeInputProps {
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  currency?: string;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  isRTL?: boolean;
}

const PriceRangeInput = forwardRef<HTMLDivElement, PriceRangeInputProps>(({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  currency = '₪',
  min = 0,
  max = 10000,
  step = 100,
  label,
  isRTL = false,
}, ref) => {
  const minLabel = isRTL ? 'מחיר מינימום' : 'Min Price';
  const maxLabel = isRTL ? 'מחיר מקסימום' : 'Max Price';

  return (
    <div ref={ref} className="space-y-3">
      {label && (
        <label className={`text-sm font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
          {label}
        </label>
      )}
      
      <div className={`grid grid-cols-2 gap-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        <Input
          type="number"
          label={minLabel}
          value={minValue}
          onChange={(e) => onMinChange(Number(e.target.value))}
          min={min}
          max={maxValue}
          step={step}
          rightIcon={<span className="text-muted-foreground text-sm">{currency}</span>}
          isRTL={isRTL}
        />
        
        <Input
          type="number"
          label={maxLabel}
          value={maxValue}
          onChange={(e) => onMaxChange(Number(e.target.value))}
          min={minValue}
          max={max}
          step={step}
          rightIcon={<span className="text-muted-foreground text-sm">{currency}</span>}
          isRTL={isRTL}
        />
      </div>
    </div>
  );
});

PriceRangeInput.displayName = 'PriceRangeInput';

export {
  Input,
  SearchInput,
  PasswordInput,
  Textarea,
  Select,
  PriceRangeInput
};

export type {
  InputProps,
  SearchInputProps,
  PasswordInputProps,
  TextareaProps,
  SelectProps,
  SelectOption,
  PriceRangeInputProps
};