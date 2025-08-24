
export default {
    darkMode: 'class', // Enable class-based dark mode
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend:{
            colors:{
                // màu primary dùng cho các thành phần quan trọng
                'primary': {
                    DEFAULT: '#2563EB',
                    foreground: '#FFFFFF'
                },
                // màu phụ secondary dùng cho các thành phần ít quan trọng hơn
                'secondary':{
                    DEFAULT: '#E5E7EB',
                    foreground: '#1F2937'
                },
                // màu accent dùng cho các nút kêu gọi hành động
                'accent':{
                    DEFAULT: '#f97316',
                    foreground: '#FFFFFF'
                },
                // màu nền
                'background': '#f9fafb',
                // màu văn bản
                'foreground': '#1e293b',
                //các màu chức năng
                'success': {
                    DEFAULT: '#22c55e',
                    foreground: '#FFFFFF'
                },
                'error': {
                    DEFAULT: '#ef4444',
                    foreground: '#FFFFFF'
                },
                'danger': {
                    DEFAULT: '#ef4444',
                    foreground: '#FFFFFF'
                },
                'warning': {
                    DEFAULT: '#f59e0b',
                    foreground: '#FFFFFF'
                },
            },
            animation: {
                'shimmer': 'shimmer 2s infinite linear',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'sparkle': 'sparkle 1.5s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out'
            },
            keyframes: {
                shimmer: {
                  '0%': { transform: 'translateX(-100%)' },
                  '100%': { transform: 'translateX(100%)' }
                },
                glow: {
                  '0%': { boxShadow: '0 0 5px rgba(255, 215, 0, 0.3)' },
                  '100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }
                },
                sparkle: {
                  '0%, 100%': { opacity: '1', transform: 'scale(1)' },
                  '50%': { opacity: '0.5', transform: 'scale(1.05)' }
                },
                fadeIn: {
                  '0%': { opacity: '0', transform: 'translateY(10px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                slideUp: {
                  '0%': { transform: 'translateY(100%)', opacity: '0' },
                  '100%': { transform: 'translateY(0)', opacity: '1' }
                }
            }
        }
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.scrollbar-thin': {
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--scrollbar-thumb) var(--scrollbar-track)',
                },
                '.scrollbar-webkit': {
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'var(--scrollbar-track)',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'var(--scrollbar-thumb)',
                        borderRadius: '20px',
                        border: '1px solid var(--scrollbar-track)',
                    },
                },
                '.scrollbar-thumb-slate-600': {
                    '--scrollbar-thumb': '#475569',
                },
                '.scrollbar-track-transparent': {
                    '--scrollbar-track': 'transparent',
                },
            }
            
            addUtilities(newUtilities)
        }
    ],
}