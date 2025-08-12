
export default{
    content:[
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