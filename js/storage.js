/**
 * F24nT AI - Storage Management
 */

const Storage = {
    prefix: 'f24t_',
    
    get(key) {
        try {
            const value = localStorage.getItem(this.prefix + key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            return null;
        }
    },
    
    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    },
    
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    },
    
    clear() {
        const keys = Object.keys(localStorage);
        for (const key of keys) {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        }
    },
    
    session(key, value) {
        if (value === undefined) {
            try {
                const data = sessionStorage.getItem(this.prefix + key);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                return null;
            }
        }
        try {
            sessionStorage.setItem(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    },
    
    getChats() { return this.get('chats') || {}; },
    setChats(chats) { this.set('chats', chats); },
    
    getProjects() { return this.get('projects') || {}; },
    setProjects(projects) { this.set('projects', projects); },
    
    getUser() { return this.session('user'); },
    setUser(user) { this.session('user', user); },
    
    getTheme() { return this.get('theme') || 'auto'; },
    setTheme(theme) { this.set('theme', theme); },
    
    getModel() { return this.get('model') || CONFIG.DEFAULT_MODEL; },
    setModel(model) { this.set('model', model); },
    
    getUsage() { return this.session('usage') || 0; },
    setUsage(usage) { this.session('usage', usage); },
    
    getUsageStart() { return this.session('usage_start') || 0; },
    setUsageStart(time) { this.session('usage_start', time); },
    
    isAbyz() { return this.get('abyz') || false; },
    setAbyz(value) { this.set('abyz', value); },
    
    isGokil() { return this.get('gokil') || false; },
    setGokil(value) { this.set('gokil', value); },
    
    getGokilSettings() {
        return this.get('gokil_settings') || { apis: [], name: 'F24nT ai', personality: 'helpful', sysPrompt: '' };
    },
    setGokilSettings(settings) { this.set('gokil_settings', settings); },
    
    exportAll() {
        return {
            chats: this.getChats(),
            projects: this.getProjects(),
            theme: this.getTheme(),
            model: this.getModel(),
            abyz: this.isAbyz(),
            gokil: this.isGokil(),
            gokilSettings: this.getGokilSettings(),
            exportedAt: new Date().toISOString()
        };
    },
    
    importAll(data) {
        if (data.chats) this.setChats(data.chats);
        if (data.projects) this.setProjects(data.projects);
        if (data.theme) this.setTheme(data.theme);
        if (data.model) this.setModel(data.model);
        if (data.abyz) this.setAbyz(data.abyz);
        if (data.gokil) this.setGokil(data.gokil);
        if (data.gokilSettings) this.setGokilSettings(data.gokilSettings);
        return true;
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Storage;
}
