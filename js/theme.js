/**
 * F24nT AI - Theme Management
 */

const Theme = {
    themes: ['auto', 'light', 'dark'],
    
    init() {
        const saved = Storage.getTheme() || 'auto';
        this.apply(saved);
        this.updateUI();
    },
    
    apply(theme) {
        const html = document.documentElement;
        const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else if (theme === 'light') {
            html.setAttribute('data-theme', 'light');
        } else {
            html.removeAttribute('data-theme');
        }
        
        const light = document.getElementById('hljs-light');
        const dark = document.getElementById('hljs-dark');
        if (light) light.disabled = isDark;
        if (dark) dark.disabled = !isDark;
        
        Storage.setTheme(theme);
        return theme;
    },
    
    toggle() {
        const current = Storage.getTheme() || 'auto';
        const idx = this.themes.indexOf(current);
        const next = this.themes[(idx + 1) % this.themes.length];
        this.apply(next);
        this.updateUI();
        App.toast({ auto: 'Tema otomatis', light: 'Tema terang', dark: 'Tema gelap' }[next], 'info');
    },
    
    updateUI() {
        const current = Storage.getTheme() || 'auto';
        ['a', 'l', 'd'].forEach((k, i) => {
            const el = document.getElementById('th-' + k);
            if (el) el.classList.toggle('sel', current === ['auto', 'light', 'dark'][i]);
        });
    },
    
    getCurrent() {
        return Storage.getTheme() || 'auto';
    },
    
    isDark() {
        const theme = this.getCurrent();
        return theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Theme;
}
