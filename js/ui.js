/**
 * F24nT AI - UI Module
 */

App.ui = {
    // ── SIDEBAR ──
    toggleSidebar() {
        document.getElementById('sb').classList.toggle('open');
        document.getElementById('sbov').classList.toggle('on');
    },

    closeSidebar() {
        document.getElementById('sb').classList.remove('open');
        document.getElementById('sbov').classList.remove('on');
    },

    // ── NAVIGATION ──
    setNavAct(id) {
        document.querySelectorAll('.ni').forEach(el => {
            if (el.id !== 'n-incog') el.classList.remove('act');
        });
        const el = document.getElementById(id);
        if (el) el.classList.add('act');
        const inc = document.getElementById('n-incog');
        if (inc) inc.classList.toggle('act', App.state.isIncog);
    },

    showChats() {
        this.setNavAct('n-chats');
        this.closeAllPanels();
    },

    showStarred() {
        this.setNavAct('n-star');
        this.closeAllPanels();
        this.openPanel('p-star');
        this.renderStarred();
    },

    showProjects() {
        this.setNavAct('n-proj');
        this.closeAllPanels();
        this.openPanel('p-proj');
        this.renderProjects();
    },

    showTools() {
        this.setNavAct('n-tools');
        this.closeAllPanels();
        this.openPanel('p-tools');
    },

    openPanel(id) {
        document.getElementById(id).classList.add('open');
    },

    closePanel(id) {
        document.getElementById(id).classList.remove('open');
    },

    closeAllPanels() {
        ['p-star', 'p-proj', 'p-tools', 'p-stg'].forEach(id => {
            document.getElementById(id)?.classList.remove('open');
        });
    },

    openSettings() {
        this.closeAllPanels();
        this.openPanel('p-stg');
    },

    // ── HISTORY ──
    renderHistory(filter = '') {
        const hist = document.getElementById('sb-hist');
        const panels = [...hist.querySelectorAll('.panel')];
        let noHist = hist.querySelector('#no-hist');
        hist.innerHTML = '';
        if (!noHist) {
            noHist = document.createElement('div');
            noHist.id = 'no-hist';
        }
        hist.appendChild(noHist);
        panels.forEach(p => hist.appendChild(p));

        const chats = App.ai._getChats();
        const all = Object.values(chats).sort((a, b) => b.updated - a.updated);
        const filt = filter ? all.filter(c => c.title.toLowerCase().includes(filter.toLowerCase())) : all;

        noHist.style.display = filt.length ? 'none' : 'block';
        noHist.textContent = App.state.isIncog ? 'Tidak ada riwayat di mode Incognito.' : 'No conversations yet.';

        if (!filt.length) return;

        const now = Date.now();
        const day = 86400000;
        const grps = { Today: [], Yesterday: [], 'This week': [], 'Older': [] };
        filt.forEach(c => {
            const age = now - c.updated;
            if (age < day) grps['Today'].push(c);
            else if (age < 2 * day) grps['Yesterday'].push(c);
            else if (age < 7 * day) grps['This week'].push(c);
            else grps['Older'].push(c);
        });

        [...Object.entries(grps)].reverse().forEach(([lbl, items]) => {
            if (!items.length) return;
            const grp = document.createElement('div');
            grp.className = 'hgrp';
            const l = document.createElement('div');
            l.className = 'hlbl';
            l.textContent = lbl;
            grp.appendChild(l);
            items.forEach(c => {
                const el = document.createElement('div');
                el.className = 'ci' + (c.id === App.state.activeChatId ? ' act' : '');
                el.dataset.id = c.id;
                el.innerHTML = `
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;${c.starred ? 'color:var(--clay);fill:var(--clay)' : ''}">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" ${c.starred ? 'fill="currentColor"' : ''}/>
                    </svg>
                    <span class="ci-lbl">${App.utils.escape(c.title)}</span>
                    <span class="ci-m" onclick="event.stopPropagation();App.ui.openContext(event, '${c.id}')">···</span>
                `;
                el.onclick = (e) => { if (!e.target.closest('.ci-m')) App.ui.loadChat(c.id); };
                grp.insertBefore(el, grp.children[1]);
            });
            hist.insertBefore(grp, hist.children[0]);
        });
    },

    searchChats(value) {
        this.renderHistory(value);
    },

    loadChat(id) {
        const chats = App.ai._getChats();
        if (!chats[id]) return;
        App.state.activeChatId = id;
        document.querySelectorAll('.ci').forEach(el => {
            el.classList.toggle('act', el.dataset.id === id);
        });
        const chat = chats[id];
        document.getElementById('wlc').style.display = 'none';
        const msgsEl = document.getElementById('msgs');
        msgsEl.style.display = 'flex';
        msgsEl.innerHTML = '';
        chat.msgs.forEach(m => {
            if (m.role === 'user') {
                App.ai._renderUser(m.content, false, m.images || null);
            } else {
                App.ai._renderAssistWithTyping(m.content, m.src || '');
            }
        });
        document.getElementById('share-btn').style.display = 'flex';
        App.ai._scrollBot();
        this.closeSidebar();
    },

    // ── NEW CHAT ──
    newChat() {
        App.state.activeChatId = null;
        document.getElementById('wlc').style.display = '';
        const msgsEl = document.getElementById('msgs');
        msgsEl.style.display = 'none';
        msgsEl.innerHTML = '';
        const ta = document.getElementById('ita');
        ta.value = '';
        ta.style.height = 'auto';
        App.state.attachedFiles = [];
        const ap = document.getElementById('ap');
        ap.innerHTML = '';
        ap.classList.remove('show');
        document.querySelectorAll('.ci').forEach(el => el.classList.remove('act'));
        document.getElementById('share-btn').style.display = 'none';
        App.state.isBusy = false;
        App.ai._updateSend();
        this.setNavAct('n-chats');
    },

    // ── STAR RED ──
    renderStarred() {
        const body = document.getElementById('star-body');
        const starred = Object.values(App.ai._getChats()).filter(c => c.starred);
        body.querySelectorAll('.si-item').forEach(e => e.remove());
        document.getElementById('star-empty').style.display = starred.length ? 'none' : 'flex';
        starred.forEach(c => {
            const el = document.createElement('div');
            el.className = 'si-item';
            el.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--clay)" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                ${App.utils.escape(c.title)}
            `;
            el.onclick = () => { this.loadChat(c.id); this.closePanel('p-star'); };
            body.insertBefore(el, document.getElementById('star-empty'));
        });
    },

    // ── PROJECTS ──
    renderProjects() {
        const list = document.getElementById('proj-list');
        list.innerHTML = '';
        const ps = Object.values(App.state.projects);
        document.getElementById('proj-empty').style.display = ps.length ? 'none' : 'flex';
        ps.forEach(p => {
            const el = document.createElement('div');
            el.className = 'pcard';
            el.innerHTML = `
                <div class="pcard-n">${App.utils.escape(p.name)}</div>
                <div class="pcard-d">${App.utils.escape(p.desc || 'No description')}</div>
            `;
            list.appendChild(el);
        });
    },

    createProject() {
        const n = document.getElementById('pni').value.trim();
        if (!n) { App.toast('Enter project name'); return; }
        const id = 'p' + Date.now();
        App.state.projects[id] = {
            id,
            name: n,
            desc: document.getElementById('pdi').value.trim(),
            created: Date.now()
        };
        document.getElementById('pni').value = '';
        document.getElementById('pdi').value = '';
        App.saveState();
        this.closeModal('pm');
        this.renderProjects();
        this.updateProfileStats();
        App.toast('Project created!');
    },

    // ── TOOLS ──
    useTool(tool) {
        if (tool === 'nekopoi' && !App.state.isAbyz) {
            App.toast('❌ NekoPoi hanya untuk Abyz & Gokil Plan. Upgrade dulu!', 'error');
            this.openUpgrade();
            return;
        }

        App.state.activeTool = tool;
        document.querySelectorAll('.aif-card').forEach(c => c.classList.remove('act'));
        const cards = document.querySelectorAll('.aif-card');
        const toolMap = { 'google-image': 0, 'nekopoi': 1, 'aicoder': 2 };
        if (toolMap[tool] !== undefined && cards[toolMap[tool]]) {
            cards[toolMap[tool]].classList.add('act');
        }

        const banner = document.getElementById('tools-active-banner');
        if (banner) {
            banner.style.display = 'block';
            const names = { 'google-image': 'Google Image Search', 'nekopoi': 'NekoPoi', 'aicoder': 'AiCoder' };
            const hints = {
                'google-image': 'Cari gambar dengan keyword',
                'nekopoi': 'Ketik: random / search [judul]',
                'aicoder': 'Tulis deskripsi proyek yang ingin dibuat'
            };
            banner.innerHTML = `
                <strong>${names[tool] || tool}</strong> aktif — ${hints[tool] || ''}
                <button onclick="App.ui.clearTool()" style="margin-left:6px;color:var(--clay);font-weight:600;text-decoration:underline;background:none;border:none;cursor:pointer;font-size:inherit">Batal</button>
            `;
        }

        const modelMap = { 'google-image': 'google-image', 'nekopoi': 'nekopoi', 'aicoder': 'ai-coder' };
        if (modelMap[tool]) {
            App.state.modelEp = modelMap[tool];
            App.state.model = { 'google-image': 'Google Image', 'nekopoi': 'NekoPoi', 'aicoder': 'AI Coder' }[tool] || tool;
            document.getElementById('mnm').textContent = App.state.model;
        }

        const ta = document.getElementById('ita');
        if (ta) {
            const placeholders = {
                'google-image': 'Cari gambar: [keyword]',
                'nekopoi': 'NekoPoi: random / search [judul]',
                'aicoder': 'Deskripsi proyek kode...'
            };
            ta.placeholder = placeholders[tool] || 'Message...';
            ta.focus();
        }

        this.closeSidebar();
        App.toast(`${names[tool] || tool} aktif`, 'info');
    },

    clearTool() {
        App.state.activeTool = null;
        document.querySelectorAll('.aif-card').forEach(c => c.classList.remove('act'));
        const banner = document.getElementById('tools-active-banner');
        if (banner) banner.style.display = 'none';
        const ta = document.getElementById('ita');
        if (ta) ta.placeholder = 'Message F24nT ai…';
        // JANGAN RESET MODEL!
    },

    // ── PROFILE ──
    openProfile() {
        document.getElementById('pp').classList.add('on');
        this.updateProfileStats();
    },

    closeProfile() {
        document.getElementById('pp').classList.remove('on');
    },

    updateProfileStats() {
        const s = Object.values(App.ai._getChats()).filter(c => c.starred).length;
        const p = Object.values(App.state.projects).length;
        document.getElementById('pp-star-sub').textContent = `${s} starred`;
        document.getElementById('pp-proj-sub').textContent = `${p} project${p !== 1 ? 's' : ''}`;
        App.ui.updateUsageUI();
    },

    editProfile() {
        this.openModal('epm');
        const nm = App.state.user?.displayName || App.state.user?.name || '';
        document.getElementById('epni').value = nm;
        setTimeout(() => document.getElementById('epni').focus(), 300);
    },

    saveProfile() {
        const nm = document.getElementById('epni').value.trim();
        if (!nm) { App.toast('Enter a name'); return; }
        if (App.state.user) {
            App.state.user.displayName = nm;
            App.state.user.name = nm;
        }
        sessionStorage.setItem('f24t-user', JSON.stringify(App.state.user || {}));
        ['unm', 'ppnm'].forEach(id => document.getElementById(id).textContent = nm);
        ['uav', 'ppav'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.childNodes[0].textContent = nm[0].toUpperCase();
        });
        this.closeModal('epm');
        this.closeProfile();
        App.toast('Profile updated!');
    },

    exportChats() {
        if (App.state.isIncog) {
            App.toast('Export tidak tersedia di mode Incognito', 'warning');
            return;
        }
        const d = JSON.stringify({
            chats: App.state.chats,
            projects: App.state.projects,
            exported: new Date().toISOString()
        }, null, 2);
        const b = new Blob([d], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(b);
        a.download = 'f24nt-ai-export.json';
        a.click();
        App.toast('Exported!', 'success');
    },

    // ── CONTEXT MENU ──
    openContext(e, id) {
        App.state.ctxId = id;
        const m = document.getElementById('ctx');
        m.style.left = Math.min(e.clientX, window.innerWidth - 180) + 'px';
        m.style.top = Math.min(e.clientY, window.innerHeight - 130) + 'px';
        m.classList.add('on');
        const s = App.ai._getChats()[id]?.starred;
        document.getElementById('ctx-star').innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${s ? 'var(--clay)' : 'none'}" stroke="${s ? 'var(--clay)' : 'currentColor'}" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            ${s ? 'Unstar' : 'Star'}
        `;
        document.addEventListener('click', this._closeContextOnce);
    },

    _closeContextOnce() {
        document.getElementById('ctx').classList.remove('on');
        document.removeEventListener('click', App.ui._closeContextOnce);
    },

    ctxStar() {
        const chats = App.ai._getChats();
        if (!App.state.ctxId || !chats[App.state.ctxId]) return;
        chats[App.state.ctxId].starred = !chats[App.state.ctxId].starred;
        if (!App.state.isIncog) App.saveState();
        this.renderHistory();
        this.renderStarred();
        this.updateProfileStats();
        App.toast(chats[App.state.ctxId].starred ? 'Ditandai sebagai favorit' : 'Tanda favorit dihapus',
            chats[App.state.ctxId].starred ? 'success' : 'info');
    },

    ctxRename() {
        const chats = App.ai._getChats();
        if (!App.state.ctxId || !chats[App.state.ctxId]) return;
        const n = prompt('Rename:', chats[App.state.ctxId].title);
        if (n && n.trim()) {
            chats[App.state.ctxId].title = n.trim();
            if (!App.state.isIncog) App.saveState();
            this.renderHistory();
        }
    },

    ctxDelete() {
        const chats = App.ai._getChats();
        if (!App.state.ctxId || !chats[App.state.ctxId]) return;
        if (App.state.activeChatId === App.state.ctxId) this.newChat();
        delete chats[App.state.ctxId];
        if (!App.state.isIncog) App.saveState();
        this.renderHistory();
        this.renderStarred();
        this.updateProfileStats();
        App.toast('Percakapan dihapus', 'info');
    },

    // ── MODEL DROPDOWN ──
    toggleModelDropdown() {
        document.getElementById('mdd').classList.toggle('on');
        document.getElementById('mddov').classList.toggle('on');
    },

    closeModelDropdown() {
        document.getElementById('mdd').classList.remove('on');
        document.getElementById('mddov').classList.remove('on');
    },

    updateModelName() {
        document.getElementById('mnm').textContent = App.state.model;
    },

    // ── THEME ──
    applyTheme(t) {
        App.state.theme = t;
        const html = document.documentElement;
        const dk = t === 'dark' || (t === 'auto' && matchMedia('(prefers-color-scheme:dark)').matches);
        if (t === 'dark') html.setAttribute('data-theme', 'dark');
        else if (t === 'light') html.setAttribute('data-theme', 'light');
        else html.removeAttribute('data-theme');
        document.getElementById('hljs-light').disabled = dk;
        document.getElementById('hljs-dark').disabled = !dk;
        App.saveState();
    },

    toggleTheme() {
        const ts = ['auto', 'light', 'dark'];
        const current = ts.indexOf(App.state.theme);
        const next = ts[(current + 1) % 3];
        this.applyTheme(next);
        this.updateThemeUI();
        App.toast({ auto: 'Tema otomatis', light: 'Tema terang', dark: 'Tema gelap' }[next], 'info');
    },

    updateThemeUI() {
        ['a', 'l', 'd'].forEach((k, i) => {
            const el = document.getElementById('th-' + k);
            if (el) el.classList.toggle('sel', App.state.theme === ['auto', 'light', 'dark'][i]);
        });
    },

    // ── SYNTAX HIGHLIGHT ──
    toggleHL() {
        App.state.hlOn = !App.state.hlOn;
        this.updateHLToggle();
        App.toast(App.state.hlOn ? 'Syntax highlighting aktif' : 'Syntax highlighting nonaktif', 'info');
        App.saveState();
    },

    updateHLToggle() {
        const t = document.getElementById('hltog');
        if (t) t.classList.toggle('on', App.state.hlOn);
    },

    // ── USAGE ──
    updateUsageUI() {
        const $ = id => document.getElementById(id);
        if (App.state.isAbyz) {
            if ($('usage-txt')) $('usage-txt').textContent = '∞';
            if ($('usage-pill')) $('usage-pill').className = '';
            if ($('pp-usage')) $('pp-usage').textContent = 'Unlimited';
            if ($('pp-ubar')) $('pp-ubar').style.width = '0%';
            return;
        }
        const pct = Math.min(100, (App.state.usage / App.MAX_USAGE) * 100);
        if ($('usage-txt')) $('usage-txt').textContent = `${App.state.usage}/${App.MAX_USAGE}`;
        if ($('pp-usage')) $('pp-usage').textContent = `${App.state.usage} / ${App.MAX_USAGE}`;
        if ($('pp-ubar')) $('pp-ubar').style.width = pct + '%';
        if ($('usage-pill')) {
            $('usage-pill').className = pct >= 100 ? 'full' : pct >= 80 ? 'warn' : '';
        }
    },

    closeRateLimit() {
        document.getElementById('rate-overlay').classList.remove('on');
        clearInterval(App.state.resetTimer);
    },

    // ── UPGRADE ──
    openUpgrade() {
        document.getElementById('upgrade-modal').classList.add('on');
    },

    closeUpgrade() {
        document.getElementById('upgrade-modal').classList.remove('on');
    },

    activatePlan() {
        const code = document.getElementById('upgrade-code').value.trim();
        if (!code) {
            App.toast('Masukkan kode aktivasi.', 'warning');
            return;
        }
        // Validasi kode (seharusnya di backend)
        // Simulasi validasi
        if (code === 'ABYZ2024' || code === 'GOKIL2024') {
            const isGokil = code === 'GOKIL2024';
            App.state.isAbyz = true;
            App.state.isGokil = isGokil;
            App.state.abyzUser = App.state.user?.displayName || 'User';
            App.saveState();
            this.applyAbyzUI();
            this.closeUpgrade();
            App.toast(`${isGokil ? 'Gokil' : 'Abyz'} Plan aktif! 🎉`, 'success');
        } else {
            App.toast('❌ Kode tidak valid. Hubungi admin.', 'error');
        }
    },

    applyAbyzUI() {
        const $ = id => document.getElementById(id);
        const badge = $('sb-abyz-badge');
        const upgradeCta = $('pp-upgrade-cta');
        const abyzInfo = $('pp-abyz-info');
        const ppplan = $('ppplan');
        const stgStatus = $('stg-abyz-status');
        const upgradeTopBtn = $('upgrade-topbtn');
        const resetNote = $('pp-reset-note');

        if (App.state.isAbyz) {
            const planName = App.state.isGokil ? 'Gokil Plan' : 'Abyz Plan';
            if (badge) { badge.style.display = 'inline-flex'; badge.textContent = App.state.isGokil ? 'GOKIL' : 'ABYZ'; }
            if (upgradeCta) upgradeCta.style.display = 'none';
            if (abyzInfo) {
                abyzInfo.style.display = 'block';
                abyzInfo.innerHTML = `
                    <div style="display:flex;align-items:center;gap:8px;font-size:13.5px;font-weight:600;color:var(--abyz)">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        ${planName} aktif
                    </div>
                    <div style="font-size:12px;color:rgb(var(--tx3));margin-top:4px">Akun: ${App.utils.escape(App.state.abyzUser || '-')}</div>
                `;
            }
            if (ppplan) {
                ppplan.className = 'ppplan abyz';
                ppplan.innerHTML = `
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    ${planName}
                `;
            }
            if (stgStatus) stgStatus.textContent = `${planName} aktif`;
            if (upgradeTopBtn) upgradeTopBtn.style.display = 'none';
            if (resetNote) resetNote.textContent = 'Unlimited — tanpa batas pesan';
            document.querySelectorAll('.mo-lock').forEach(el => el.style.display = 'none');
            const gokilBtn = $('sb-gokil-btn');
            if (gokilBtn) gokilBtn.style.display = App.state.isGokil ? 'flex' : 'none';
            // Update avatar badge
            document.getElementById('uav')?.classList.add('abyz-user');
            document.getElementById('ppav')?.classList.add('abyz-user');
            // Re-render model list dengan pro unlocked
            App.ai.initModels();
        } else {
            if (badge) badge.style.display = 'none';
            if (upgradeCta) upgradeCta.style.display = '';
            if (abyzInfo) abyzInfo.style.display = 'none';
            if (ppplan) {
                ppplan.className = 'ppplan';
                ppplan.innerHTML = `
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    Free Plan
                `;
            }
            if (stgStatus) stgStatus.textContent = 'Upgrade to Abyz Plan';
            if (upgradeTopBtn) upgradeTopBtn.style.display = '';
            if (resetNote) resetNote.textContent = 'Resets every 30 minutes';
            document.querySelectorAll('.mo-lock').forEach(el => el.style.display = '');
            const gokilBtn = $('sb-gokil-btn');
            if (gokilBtn) gokilBtn.style.display = 'none';
            document.getElementById('uav')?.classList.remove('abyz-user');
            document.getElementById('ppav')?.classList.remove('abyz-user');
        }
        App.ui.updateUsageUI();
    },

    // ── SHARE ──
    openShare() {
        const id = App.state.activeChatId || 'demo';
        document.getElementById('share-url').textContent = `https://f24nt.ai/share/${id.slice(0,12)}`;
        this.openModal('share-modal');
    },

    closeShare() {
        this.closeModal('share-modal');
    },

    copyShareLink() {
        const url = document.getElementById('share-url').textContent;
        App.utils.copyText(url);
    },

    // ── MODALS ──
    openModal(id) {
        document.getElementById(id).classList.add('on');
    },

    closeModal(id) {
        document.getElementById(id).classList.remove('on');
    },

    closeAllModals() {
        ['share-modal', 'pm', 'cm', 'epm', 'upgrade-modal', 'terminal-modal'].forEach(id => {
            document.getElementById(id)?.classList.remove('on');
        });
        this.closeUpgrade();
        this.closeModelDropdown();
        this.closeProfile();
        document.getElementById('ctx').classList.remove('on');
    },

    // ── CLEAR ──
    confirmClear() {
        this.openModal('cm');
    },

    clearAll() {
        if (App.state.isIncog) {
            App.state.incogChats = {};
        } else {
            App.state.chats = {};
            App.saveState();
        }
        App.state.activeChatId = null;
        this.renderHistory();
        this.renderStarred();
        this.updateProfileStats();
        this.closeModal('cm');
        this.newChat();
        App.toast(App.state.isIncog ? 'Riwayat incognito dibersihkan' : 'Semua percakapan dihapus', 'info');
    },

    // ── INPUT ──
    onInput(el) {
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, 280) + 'px';
        App.ai._updateSend();
    },

    insertCode() {
        const ta = document.getElementById('ita');
        const s = ta.selectionStart;
        const en = ta.selectionEnd;
        const sel = ta.value.substring(s, en);
        ta.value = ta.value.substring(0, s) + '```\n' + (sel || '// your code here') + '\n```' + ta.value.substring(en);
        this.onInput(ta);
        ta.focus();
    },

    usePill(btn) {
        const ta = document.getElementById('ita');
        ta.value = btn.textContent.trim();
        this.onInput(ta);
        ta.focus();
    },

    // ── THUMBS ──
    thumbUp(btn) {
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
        btn.style.color = 'rgb(34,197,94)';
        App.toast('Respons bagus!', 'success');
    },

    thumbDown(btn) {
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
        btn.style.color = 'rgb(239,68,68)';
        App.toast('Feedback diterima!', 'info');
    },

    // ── INCOGNITO ──
    toggleIncog() {
        App.state.isIncog = !App.state.isIncog;
        const sb = document.getElementById('sb');
        const main = document.getElementById('main');
        const badge = document.getElementById('incog-badge');
        const tbPill = document.getElementById('incog-tb-pill');

        if (sb) sb.classList.toggle('incog', App.state.isIncog);
        if (main) main.classList.toggle('incog', App.state.isIncog);
        if (badge) badge.classList.toggle('on', App.state.isIncog);
        if (tbPill) tbPill.classList.toggle('on', App.state.isIncog);

        if (App.state.isIncog) {
            App.state._savedChatId = App.state.activeChatId;
            App.state.activeChatId = null;
            App.toast('Mode Incognito aktif — riwayat tidak disimpan', 'info');
        } else {
            App.state.activeChatId = App.state._savedChatId || null;
            App.state._savedChatId = null;
            App.toast('Mode Incognito nonaktif', 'info');
        }

        this.closeAllPanels();
        if (App.state.activeChatId && App.ai._getChats()[App.state.activeChatId]) {
            this.loadChat(App.state.activeChatId);
        } else {
            this.newChat();
        }
        this.renderHistory();
        this.setNavAct(App.state.isIncog ? 'n-incog' : 'n-chats');
    },

    // ── MARKDOWN ──
    formatMarkdown(text) {
        const cbs = [];
        text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
            const i = cbs.length;
            cbs.push({ lang: lang || 'plaintext', code: code.trim() });
            return `\x00CB${i}\x00`;
        });

        let h = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        h = h.replace(/`([^`\n]+)`/g, '<code>$1</code>');
        h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        h = h.replace(/\*(.+?)\*/g, '<em>$1</em>');
        h = h.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        h = h.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        h = h.replace(/^# (.+)$/gm, '<h1>$1</h1>');
        h = h.replace(/^---$/gm, '<hr>');
        h = h.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');
        h = h.replace(/!\[(.*?)\]\((https?:\/\/[^\)\s]+)\)/g, (match, alt, url) => {
            return `<a href="${url}" target="_blank" rel="noopener"><img src="${url}" alt="${alt}" style="max-width:100%;border-radius:12px;border:1px solid rgba(var(--br1),.5);margin:6px 0;display:block"/></a>`;
        });
        h = h.replace(/^[-*+] (.+)$/gm, '<li>$1</li>');
        h = h.replace(/(<li>[\s\S]*?<\/li>)+/g, m => `<ul>${m}</ul>`);
        h = h.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
        h = h.replace(/\[(.+?)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        h = h.replace(/\n\n+/g, '</p><p>');
        h = h.replace(/\n/g, '<br>');

        if (!h.match(/^<[hup]/)) h = `<p>${h}</p>`;

        h = h.replace(/\x00CB(\d+)\x00/g, (_, i) => {
            const { lang, code } = cbs[+i];
            const e = code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            return `<div class="cb">
                <div class="cb-h">
                    <span class="cb-l">${lang}</span>
                    <button class="cb-c" onclick="App.utils.copyText(${JSON.stringify(code)});this.classList.add('copied');setTimeout(()=>this.classList.remove('copied'),1500)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        Copy
                    </button>
                </div>
                <pre><code class="language-${lang}">${e}</code></pre>
            </div>`;
        });

        return h;
    }
};
