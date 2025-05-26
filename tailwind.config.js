/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Custom colors for affiliate website
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        affiliate: {
          DEFAULT: 'hsl(var(--affiliate))',
          foreground: 'hsl(var(--affiliate-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hebrew: ['var(--font-assistant)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        english: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    // Custom plugin for RTL support and affiliate components
    function({ addUtilities, addComponents, theme }) {
      // RTL utilities
      const rtlUtilities = {
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
        '.flip-x': {
          transform: 'scaleX(-1)',
        },
        '[dir="rtl"] .rtl-flip': {
          transform: 'scaleX(-1)',
        },
        '[dir="ltr"] .rtl-flip': {
          transform: 'scaleX(1)',
        },
        // Logical properties for better RTL support
        '.border-s': {
          'border-inline-start-width': '1px',
        },
        '.border-e': {
          'border-inline-end-width': '1px',
        },
        '.ms-auto': {
          'margin-inline-start': 'auto',
        },
        '.me-auto': {
          'margin-inline-end': 'auto',
        },
        '.ps-4': {
          'padding-inline-start': theme('spacing.4'),
        },
        '.pe-4': {
          'padding-inline-end': theme('spacing.4'),
        },
        '.start-0': {
          'inset-inline-start': '0px',
        },
        '.end-0': {
          'inset-inline-end': '0px',
        },
      };

      // Affiliate-specific components
      const affiliateComponents = {
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.md'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.medium'),
          transition: 'colors 0.2s',
          '&:focus-visible': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${theme('colors.ring')}`,
          },
          '&:disabled': {
            pointerEvents: 'none',
            opacity: '0.5',
          },
        },
        '.btn-primary': {
          backgroundColor: theme('colors.primary.DEFAULT'),
          color: theme('colors.primary.foreground'),
          '&:hover': {
            backgroundColor: `hsl(var(--primary) / 0.9)`,
          },
        },
        '.btn-secondary': {
          backgroundColor: theme('colors.secondary.DEFAULT'),
          color: theme('colors.secondary.foreground'),
          '&:hover': {
            backgroundColor: `hsl(var(--secondary) / 0.8)`,
          },
        },
        '.btn-affiliate': {
          backgroundColor: theme('colors.affiliate.DEFAULT'),
          color: theme('colors.affiliate.foreground'),
          fontWeight: theme('fontWeight.semibold'),
          boxShadow: theme('boxShadow.md'),
          '&:hover': {
            backgroundColor: `hsl(var(--affiliate) / 0.9)`,
            boxShadow: theme('boxShadow.lg'),
          },
        },
        '.card': {
          borderRadius: theme('borderRadius.lg'),
          border: `1px solid ${theme('colors.border')}`,
          backgroundColor: theme('colors.card.DEFAULT'),
          color: theme('colors.card.foreground'),
          boxShadow: theme('boxShadow.sm'),
        },
        '.product-card': {
          borderRadius: theme('borderRadius.lg'),
          border: `1px solid ${theme('colors.border')}`,
          backgroundColor: theme('colors.card.DEFAULT'),
          color: theme('colors.card.foreground'),
          boxShadow: theme('boxShadow.sm'),
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: theme('boxShadow.lg'),
          },
        },
        '.price-current': {
          fontSize: theme('fontSize.lg'),
          fontWeight: theme('fontWeight.bold'),
          color: theme('colors.green.600'),
          '.dark &': {
            color: theme('colors.green.400'),
          },
        },
        '.price-old': {
          fontSize: theme('fontSize.sm'),
          color: theme('colors.muted.foreground'),
          textDecoration: 'line-through',
        },
        '.affiliate-link': {
          color: theme('colors.affiliate.DEFAULT'),
          fontWeight: theme('fontWeight.medium'),
          textDecoration: 'none',
          '&:hover': {
            color: `hsl(var(--affiliate) / 0.8)`,
          },
        },
        '.star-filled': {
          color: theme('colors.yellow.400'),
          fill: 'currentColor',
        },
        '.star-empty': {
          color: theme('colors.gray.300'),
          fill: 'currentColor',
          '.dark &': {
            color: theme('colors.gray.600'),
          },
        },
      };

      addUtilities(rtlUtilities);
      addComponents(affiliateComponents);
    },
  ],
}