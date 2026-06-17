/**
 * F24nT AI - Authentication Module
 */

App.auth = {
    loginGoogle() {
        const user = { displayName: 'Google User', email: 'user@gmail.com' };
        this._login(user);
    },

    loginGithub() {
        const user = { displayName: 'GitHub User', email: 'user@github.com' };
        this._login(user);
    },

    loginGuest() {
        const user = { displayName: 'Guest', email: null };
        this._login(user);
    },

    loginEmail() {
        const em = document.getElementById('ae').value.trim();
        const pw = document.getElementById('ap').value;
        if (!em || !pw) {
            this._setError('Isi semua kolom.');
            return;
        }
        const user = { displayName: em.split('@')[0], email: em };
        this._login(user);
    },

    _login(user) {
        App.state.user = user;
        sessionStorage.setItem('f24t-user', JSON.stringify(user));
        this._onLogin(user);
    },

    _onLogin(user) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('app').classList.add('on');

        const nm = user.displayName || user.name || user.email || 'Guest';
        const initial = nm[0].toUpperCase();

        ['unm', 'ppnm'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = nm;
        });

        ['uav', 'ppav'].forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            let tn = null;
            el.childNodes.forEach(n => {
                if (n.nodeType === 3 && !tn) tn = n;
            });
            if (tn) tn.textContent = initial;
            else el.prepend(document.createTextNode(initial));
        });

        const em = document.getElementById('ppem');
        if (em) em.textContent = user.email || 'Guest session';

        App.ui.applyAbyzUI();
        App.ui.renderHistory();
        App.ui.updateThemeUI();
        App.ui.updateHLToggle();
        App.ui.updateUsageUI();
        App.ui.updateProfileStats();
        App.ai.updateModelUI();
        App.saveState();

        App.toast(`Selamat datang, ${nm}!`, 'success');
    },

    checkSession() {
        const user = sessionStorage.getItem('f24t-user');
        if (user) {
            const u = JSON.parse(user);
            App.state.user = u;
            this._onLogin(u);
        } else {
            document.getElementById('auth').style.display = 'flex';
        }
    },

    toggleMode() {
        App.state.isSignup = !App.state.isSignup;
        document.getElementById('ah').textContent = App.state.isSignup ? 'Create account' : 'Welcome back';
        document.getElementById('asub').textContent = App.state.isSignup ? 'Join F24nT ai today' : 'Sign in to continue';
        document.getElementById('atgt').textContent = App.state.isSignup ? 'Already have an account?' : "Don't have an account?";
        document.getElementById('atgl').textContent = App.state.isSignup ? ' Sign in' : ' Sign up';
        document.getElementById('asb').textContent = App.state.isSignup ? 'Create account' : 'Sign in';
        this._setError('');
    },

    signOut() {
        App.ui.closeProfile();
        sessionStorage.removeItem('f24t-user');
        sessionStorage.removeItem('f24t-state');
        location.reload();
    },

    _setError(msg) {
        const el = document.getElementById('aerr');
        el.textContent = msg;
        el.style.display = msg ? 'block' : 'none';
    },

    _setSubmitting(isSubmitting) {
        const btn = document.getElementById('asb');
        btn.disabled = isSubmitting;
        btn.textContent = isSubmitting ? 'Processing...' : (App.state.isSignup ? 'Create account' : 'Sign in');
    }
};
