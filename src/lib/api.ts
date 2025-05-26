// src/lib/api.ts
import { AppError, createError, handleError } from './errors';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

/**
 * API Client for making HTTP requests
 */
export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private defaultTimeout: number;

  constructor(
    baseUrl: string = process.env.NEXT_PUBLIC_API_URL || '',
    defaultHeaders: HeadersInit = {},
    defaultTimeout: number = 30000
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
    this.defaultTimeout = defaultTimeout;
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  /**
   * Make HTTP request with timeout
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw createError.internal('Request timeout');
      }
      throw error;
    }
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      throw new AppError(
        errorData.message || `HTTP Error ${response.status}`,
        errorData.code || 'API_ERROR',
        response.status,
        true,
        errorData.localizedMessage
      );
    }

    // Handle empty responses
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {} as T;
    }

    try {
      return await response.json();
    } catch (error) {
      throw createError.internal('Invalid JSON response');
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, timeout = this.defaultTimeout, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'GET',
          headers: {
            ...this.defaultHeaders,
            ...fetchOptions.headers
          },
          ...fetchOptions
        },
        timeout
      );

      return this.handleResponse<T>(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, timeout = this.defaultTimeout, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'POST',
          headers: {
            ...this.defaultHeaders,
            ...fetchOptions.headers
          },
          body: data ? JSON.stringify(data) : undefined,
          ...fetchOptions
        },
        timeout
      );

      return this.handleResponse<T>(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, timeout = this.defaultTimeout, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'PUT',
          headers: {
            ...this.defaultHeaders,
            ...fetchOptions.headers
          },
          body: data ? JSON.stringify(data) : undefined,
          ...fetchOptions
        },
        timeout
      );

      return this.handleResponse<T>(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, timeout = this.defaultTimeout, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'DELETE',
          headers: {
            ...this.defaultHeaders,
            ...fetchOptions.headers
          },
          ...fetchOptions
        },
        timeout
      );

      return this.handleResponse<T>(response);
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, timeout = this.defaultTimeout, ...fetchOptions } = options;
    const url = this.buildUrl(endpoint, params);

    try {
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'PATCH',
          headers: {
            ...this.defaultHeaders,
            ...fetchOptions.headers
          },
          body: data ? JSON.stringify(data) : undefined,
          ...fetchOptions
        },
        timeout
      );

      return this.handleResponse<T>(response);
    } catch (error) {
      throw handleError(error);
    }
  }
}

// Create default API client instance
export const apiClient = new ApiClient();

/**
 * Specialized API clients for different services
 */
export const affiliateApiClient = new ApiClient(
  process.env.NEXT_PUBLIC_AFFILIATE_API_URL || '',
  {
    'X-Affiliate-Key': process.env.NEXT_PUBLIC_AFFILIATE_API_KEY || ''
  }
);

/**
 * Helper functions for common API calls
 */
export const api = {
  // Products
  products: {
    getAll: (params?: Record<string, any>) => 
      apiClient.get('/api/products', { params }),
    
    getById: (id: string) => 
      apiClient.get(`/api/products/${id}`),
    
    getBySlug: (slug: string) => 
      apiClient.get(`/api/products/slug/${slug}`),
    
    search: (query: string, filters?: Record<string, any>) => 
      apiClient.get('/api/products/search', { 
        params: { q: query, ...filters } 
      }),
  },

  // Categories
  categories: {
    getAll: () => 
      apiClient.get('/api/categories'),
    
    getBySlug: (slug: string) => 
      apiClient.get(`/api/categories/${slug}`),
    
    getProducts: (categorySlug: string, params?: Record<string, any>) => 
      apiClient.get(`/api/categories/${categorySlug}/products`, { params }),
  },

  // Reviews
  reviews: {
    getByProduct: (productId: string) => 
      apiClient.get(`/api/reviews/product/${productId}`),
    
    getLatest: (limit: number = 10) => 
      apiClient.get('/api/reviews/latest', { params: { limit } }),
  },

  // Affiliate
  affiliate: {
    trackClick: (data: { productId: string; storeId: string; userId?: string }) => 
      apiClient.post('/api/affiliate/track-click', data),
    
    getPrices: (productId: string) => 
      apiClient.get(`/api/affiliate/prices/${productId}`),
  },

  // Newsletter
  newsletter: {
    subscribe: (email: string, locale: string) => 
      apiClient.post('/api/newsletter/subscribe', { email, locale }),
    
    unsubscribe: (token: string) => 
      apiClient.post('/api/newsletter/unsubscribe', { token }),
  },
};