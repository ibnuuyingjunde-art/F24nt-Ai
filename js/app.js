/**
 * F24nT AI - Main Application
 * Version 10.0
 * Powered by YoeNw24
 */

const App = {
    // State
    state: {
        user: null,
        isSignup: false,
        isBusy: false,
        theme: 'auto',
        model: 'AI Coder',
        modelEp: 'ai-coder',
        chats: {},
        projects: {},
        activeChatId: null,
        usage: 0,
        usageStart: 0,
        isAbyz: false,
        isGokil: false,
        isIncog: false,
        incogChats: {},
        sessionMemory: {},
        attachedFiles: [],
        activeTool: null,
        gokilApis: []
    },

    // Constants
    MAX_USAGE: 100,
    RESET_MS: 30 * 60 * 1000,
    CREATOR_NAME: 'YoeNw24',

    // Init
    init() {
        this.loadState();
        this.ui.applyTheme(this.state.theme);
        this.ui.updateModelName();
        this.auth.checkSession();
        this.ai.initModels();
        this.ui.renderHistory();
        this.ui.updateUsageUI();

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.ui.closeAllModals();
                this.ui.closeModelDropdown();
                this.terminal.close();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'k' && !e.shiftKey) {
                e.preventDefault();
                document.getElementById('ita')?.focus();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'n' && !e.shiftKey) {
                e.preventDefault();
                this.ui.newChat();
            }
        });

        // Enter to send
        document.getElementById('ita')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                e.stopPropagation();
                const btn = document.getElementById('send');
                if (btn && !btn.disabled) this.ai.sendMessage();
            }
        });

        // Close modal on backdrop click
        document.querySelectorAll('.mbg').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target === el) {
                    el.classList.remove('on');
                }
            });
        });
    },

    // State management
    loadState() {
        try {
            const state = JSON.parse(sessionStorage.getItem('f24t-state') || '{}');
            Object.assign(this.state, state);
            
            // Load chats from localStorage (session-only for security)
            const chats = localStorage.getItem('f24t-chats');
            if (chats) this.state.chats = JSON.parse(chats);
            
            const projects = localStorage.getItem('f24t-projects');
            if (projects) this.state.projects = JSON.parse(projects);
            
            const theme = localStorage.getItem('f24t-theme');
            if (theme) this.state.theme = theme;
            
            const model = localStorage.getItem('f24t-model');
            if (model) this.state.model = model;
            
            const modelEp = localStorage.getItem('f24t-model-ep');
            if (modelEp) this.state.modelEp = modelEp;
            
            const abyz = localStorage.getItem('f24t-abyz');
            if (abyz) this.state.isAbyz = abyz === 'true';
            
            const gokil = localStorage.getItem('f24t-gokil');
            if (gokil) this.state.isGokil = gokil === 'true';
            
            // Usage from session
            const usage = sessionStorage.getItem('f24t-usage');
            if (usage) this.state.usage = parseInt(usage) || 0;
            
            const usageStart = sessionStorage.getItem('f24t-usage-start');
            if (usageStart) this.state.usageStart = parseInt(usageStart) || 0;
            
            // Reset usage if time expired
            if (this.state.usageStart && Date.now() - this.state.usageStart > this.RESET_MS) {
                this.state.usage = 0;
                this.state.usageStart = 0;
            }
        } catch (e) {
            console.warn('Failed to load state:', e);
        }
    },

    saveState() {
        try {
            sessionStorage.setItem('f24t-state', JSON.stringify({
                user: this.state.user,
                isSignup: this.state.isSignup,
                isIncog: this.state.isIncog,
                model: this.state.model,
                modelEp: this.state.modelEp,
                activeChatId: this.state.activeChatId,
                usage: this.state.usage,
                usageStart: this.state.usageStart,
                isAbyz: this.state.isAbyz,
                isGokil: this.state.isGokil
            }));
            
            localStorage.setItem('f24t-chats', JSON.stringify(this.state.chats));
            localStorage.setItem('f24t-projects', JSON.stringify(this.state.projects));
            localStorage.setItem('f24t-theme', this.state.theme);
            localStorage.setItem('f24t-model', this.state.model);
            localStorage.setItem('f24t-model-ep', this.state.modelEp);
            localStorage.setItem('f24t-abyz', String(this.state.isAbyz));
            localStorage.setItem('f24t-gokil', String(this.state.isGokil));
            sessionStorage.setItem('f24t-usage', String(this.state.usage));
            sessionStorage.setItem('f24t-usage-start', String(this.state.usageStart));
        } catch (e) {
            console.warn('Failed to save state:', e);
        }
    },

    // Toast
    toast(msg, type = 'info', dur = 2800) {
        const wrap = document.getElementById('toast-wrap');
        if (!wrap) return;
        
        const cleanMsg = String(msg)
            .replace(/^[✅❌⚠️👍👎🎉🔥⚡💾📖🔍⭐]+\s*/, '')
            .replace(/\s*[✅❌⚠️👍👎🎉🔥⚡💾📖🔍⭐]+$/, '');
        
        let t = type;
        if (msg.startsWith('✅') || msg.startsWith('👍')) t = 'success';
        else if (msg.startsWith('❌')) t = 'error';
        else if (msg.startsWith('⚠️')) t = 'warning';
        
        const icons = {
            success: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
            error: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
            info: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
            warning: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
        };
        
        const item = document.createElement('div');
        item.className = 'toast-item';
        item.innerHTML = `
            <div class="toast-ic ${t}">${icons[t] || icons.info}</div>
            <span class="toast-msg">${this.utils.escape(cleanMsg || msg)}</span>
            <span class="toast-close" onclick="this.parentElement.remove()">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </span>
        `;
        wrap.appendChild(item);
        requestAnimationFrame(() => requestAnimationFrame(() => item.classList.add('show')));
        
        const hide = () => {
            item.classList.add('out');
            setTimeout(() => item.remove(), 280);
        };
        const tid = setTimeout(hide, dur);
        item.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(tid);
            item.remove();
        });
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        const ls = document.getElementById('ls');
        if (ls) {
            ls.classList.add('out');
            setTimeout(() => { ls.style.display = 'none'; }, 500);
        }
        App.init();
    }, 800);
});
