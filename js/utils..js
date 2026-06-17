/**
 * F24nT AI - Utilities
 */

App.utils = {
    escape(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    },

    copyText(text) {
        const t = String(text || '');
        if (!t) {
            App.toast('Tidak ada teks untuk disalin', 'warning');
            return;
        }
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(t)
                .then(() => App.toast('Teks disalin!', 'success'))
                .catch(() => this._execCopy(t));
        } else {
            this._execCopy(t);
        }
    },

    _execCopy(text) {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            App.toast(ok ? 'Teks disalin!' : 'Tekan Ctrl+C', ok ? 'success' : 'info');
        } catch (_) {
            App.toast('Tekan Ctrl+C', 'info');
        }
    },

    copyAssist(btn) {
        const ct = btn.closest('.mg')?.querySelector('.ma-ct');
        if (ct) this.copyText(ct.innerText || ct.textContent || '');
    },

    generateId() {
        return 'c' + Date.now() + Math.random().toString(36).slice(2, 6);
    },

    debounce(fn, delay = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    },

    formatDate(ts) {
        return new Date(ts).toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    truncate(str, len = 100) {
        if (!str) return '';
        return str.length > len ? str.substring(0, len) + '...' : str;
    },

    isUrl(str) {
        try {
            new URL(str);
            return true;
        } catch (_) {
            return false;
        }
    },

    sanitizeFilename(name) {
        return name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    }
};
