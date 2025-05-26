// src/lib/errors.ts
import { LocalizedString } from '@/types/common';

/**
 * Custom application error class
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly localizedMessage?: LocalizedString;

  constructor(
    message: string,
    code: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    localizedMessage?: LocalizedString
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.localizedMessage = localizedMessage;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Common error types
 */
export const ErrorCodes = {
  // Client errors
  NOT_FOUND: 'NOT_FOUND',
  INVALID_INPUT: 'INVALID_INPUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  BAD_REQUEST: 'BAD_REQUEST',
  
  // Server errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  
  // Business logic errors
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  CATEGORY_NOT_FOUND: 'CATEGORY_NOT_FOUND',
  INVALID_LOCALE: 'INVALID_LOCALE',
  INVALID_PRICE_FORMAT: 'INVALID_PRICE_FORMAT',
} as const;

/**
 * Error factory functions
 */
export const createError = {
  notFound: (resource: string, localizedMessage?: LocalizedString) => 
    new AppError(
      `${resource} not found`,
      ErrorCodes.NOT_FOUND,
      404,
      true,
      localizedMessage || {
        he: `${resource} לא נמצא`,
        en: `${resource} not found`
      }
    ),

  invalidInput: (field: string, localizedMessage?: LocalizedString) =>
    new AppError(
      `Invalid input: ${field}`,
      ErrorCodes.INVALID_INPUT,
      400,
      true,
      localizedMessage || {
        he: `קלט לא תקין: ${field}`,
        en: `Invalid input: ${field}`
      }
    ),

  unauthorized: (localizedMessage?: LocalizedString) =>
    new AppError(
      'Unauthorized access',
      ErrorCodes.UNAUTHORIZED,
      401,
      true,
      localizedMessage || {
        he: 'גישה לא מורשית',
        en: 'Unauthorized access'
      }
    ),

  internal: (message: string = 'Internal server error') =>
    new AppError(
      message,
      ErrorCodes.INTERNAL_ERROR,
      500,
      false,
      {
        he: 'שגיאת שרת פנימית',
        en: 'Internal server error'
      }
    ),

  productNotFound: (productId: string) =>
    new AppError(
      `Product ${productId} not found`,
      ErrorCodes.PRODUCT_NOT_FOUND,
      404,
      true,
      {
        he: 'המוצר לא נמצא',
        en: 'Product not found'
      }
    ),

  categoryNotFound: (categoryId: string) =>
    new AppError(
      `Category ${categoryId} not found`,
      ErrorCodes.CATEGORY_NOT_FOUND,
      404,
      true,
      {
        he: 'הקטגוריה לא נמצאה',
        en: 'Category not found'
      }
    ),
};

/**
 * Error handler utility
 */
export function handleError(error: unknown): AppError {
  // If it's already an AppError, return it
  if (error instanceof AppError) {
    return error;
  }

  // If it's a regular Error, wrap it
  if (error instanceof Error) {
    return new AppError(
      error.message,
      ErrorCodes.INTERNAL_ERROR,
      500,
      false
    );
  }

  // Unknown error type
  return new AppError(
    'An unknown error occurred',
    ErrorCodes.INTERNAL_ERROR,
    500,
    false,
    {
      he: 'אירעה שגיאה לא צפויה',
      en: 'An unknown error occurred'
    }
  );
}

/**
 * Check if error is operational (expected) or programming error
 */
export function isOperationalError(error: Error): boolean {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

/**
 * Format error for client response
 */
export function formatErrorResponse(error: AppError, locale: 'he' | 'en' = 'en') {
  return {
    error: {
      code: error.code,
      message: error.localizedMessage?.[locale] || error.message,
      statusCode: error.statusCode,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        originalMessage: error.message
      })
    }
  };
}

/**
 * Log error based on severity
 */
export function logError(error: AppError): void {
  if (error.isOperational) {
    // Log operational errors (expected errors)
    console.warn('[Operational Error]', {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode
    });
  } else {
    // Log programming errors (unexpected errors)
    console.error('[Programming Error]', {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      stack: error.stack
    });
  }
}

/**
 * Global error boundary handler for React
 */
export function ErrorBoundary({ error, reset }: { error: Error; reset: () => void }) {
  const appError = handleError(error);
  logError(appError);

  return {
    error: appError,
    reset
  };
}