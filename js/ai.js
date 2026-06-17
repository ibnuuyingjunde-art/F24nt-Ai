/**
 * F24nT AI - AI Core Module
 */

App.ai = {
    // API Endpoints
    SYNOX_BASE: 'https://api.synoxcloud.biz.id/ai-chat',
    POLL_BASE: 'https://text.pollinations.ai',
    
    // Model endpoints
    endpoints: {
        'ai-coder': { path: '/ai-coder', param: 'prompt', extra: 'session=f24nt' },
        'claude-opus-45': { path: '/claude-opus-4.5', param: 'pesan' },
        'claude-opus-46': { path: '/claude-opus-4.6', param: 'pesan' },
        'claude-opus-47': { path: '/claude-opus-4.7', param: 'pesan' },
        'claude-opus-48': { path: '/claude-opus-4.8', param: 'pesan' },
        'claude-sonnet-46': { path: '/claude-sonnet-4.6', param: 'pesan' },
        'deepseek-r1': { path: '/deepseek-r1', param: 'q' },
        'deepseek-v32-thinking': { path: '/deepseek-v3.2-thinking', param: 'pesan', extra: 'session=' },
        'deepseek-v4-flash': { path: '/deepseek-v4-flash', param: 'pesan', extra: 'session=' },
        'feelbetter-ai': { path: '/feelbetter-ai', param: 'pesan', extra: 'session=' },
        'grok-41': { path: '/x.ai-grok-4.1', param: 'pesan' },
        'unlimited-ai': { path: '/unlimited-ai', param: 'prompt', extra: 'session=user123' },
        'uncensored-ai': { path: '/uncensored-ai', param: 'pesan' },
        'turboseek-ai': { path: '/turboseek-ai', param: 'q' },
        'llama4-maverick': { path: '/llama4-maverick', param: 'pesan' },
        'llama4-scout': { path: '/llama-4-scout', param: 'pesan', extra: 'history=%5B%5D' },
        'gpt-55': { path: '/gpt-5.5', param: 'pesan' },
        'gemini-31-flash': { path: '/gemini-3.1-flash-lite-preview', param: 'pesan', extra: 'session=' }
    },

    // Model list for dropdown
    models: [
        { id: 'ai-coder', name: 'AI Coder', icon: 'code', pro: false, desc: 'Code generation' },
        { id: 'claude-opus-45', name: 'Claude Opus 4.5', icon: 'brain', pro: true, desc: 'Best reasoning' },
        { id: 'claude-opus-46', name: 'Claude Opus 4.6', icon: 'brain', pro: true, desc: 'Advanced reasoning' },
        { id: 'claude-opus-47', name: 'Claude Opus 4.7', icon: 'brain', pro: true, desc: 'Latest Opus' },
        { id: 'claude-opus-48', name: 'Claude Opus 4.8', icon: 'brain', pro: true, desc: 'Coding expert' },
        { id: 'claude-sonnet-46', name: 'Claude Sonnet 4.6', icon: 'zap', pro: true, desc: 'Balanced performance' },
        { id: 'deepseek-r1', name: 'DeepSeek R1', icon: 'search', pro: false, desc: 'Chain-of-thought' },
        { id: 'deepseek-v32-thinking', name: 'DeepSeek V3.2', icon: 'search', pro: false, desc: 'Deep thinking' },
        { id: 'deepseek-v4-flash', name: 'DeepSeek V4 Flash', icon: 'flash', pro: false, desc: 'Lightning fast' },
        { id: 'feelbetter-ai', name: 'FeelBetter AI', icon: 'heart', pro: false, desc: 'Mental health' },
        { id: 'grok-41', name: 'Grok 4.1', icon: 'rocket', pro: true, desc: 'Witty & uncensored' },
        { id: 'unlimited-ai', name: 'Unlimited AI', icon: 'infinity', pro: false, desc: 'General purpose' },
        { id: 'uncensored-ai', name: 'Uncensored AI', icon: 'shield-off', pro: true, desc: 'No filters' },
        { id: 'turboseek-ai', name: 'Turboseek AI', icon: 'compass', pro: true, desc: 'Fast search' },
        { id: 'llama4-maverick', name: 'Llama 4 Maverick', icon: 'cpu', pro: true, desc: 'Latest Llama' },
        { id: 'llama4-scout', name: 'Llama 4 Scout', icon: 'cpu', pro: true, desc: 'Efficient' },
        { id: 'gpt-55', name: 'GPT 5.5', icon: 'sparkles', pro: true, desc: 'Latest GPT' },
        { id: 'gemini-31-flash', name: 'Gemini 3.1 Flash', icon: 'star', pro: true, desc: 'Fast multimodal' }
    ],

    initModels() {
        const container = document.getElementById('mdd');
        if (!container) return;

        let html = '<div style="padding:5px 10px 3px;font-size:10px;font-weight:700;color:rgb(var(--tx4));text-transform:uppercase;letter-spacing:.07em">AI Models · Powered by YoeNw24</div>';

        // Group models
        const groups = {
            'AI Coder': ['ai-coder'],
            'Claude Series': ['claude-opus-45', 'claude-opus-46', 'claude-opus-47', 'claude-opus-48', 'claude-sonnet-46'],
            'DeepSeek': ['deepseek-r1', 'deepseek-v32-thinking', 'deepseek-v4-flash'],
            'Others': ['feelbetter-ai', 'grok-41', 'unlimited-ai', 'uncensored-ai', 'turboseek-ai'],
            'Llama': ['llama4-maverick', 'llama4-scout'],
            'OpenAI & Google': ['gpt-55', 'gemini-31-flash']
        };

        const iconMap = {
            'code': `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9l-2 3 2 3M15 9l2 3-2 3"/>`,
            'brain': `<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
            'zap': `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
            'search': `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 8A2.5 2.5 0 0 1 17 10.5v9a2.5 2.5 0 0 1-5 0v-9A2.5 2.5 0 0 1 14.5 8z"/>`,
            'flash': `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
            'heart': `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
            'rocket': `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
            'infinity': `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
            'shield-off': `<path d="M12 2C8 2 5 5.5 5 9.5V18a1.5 1.5 0 0 0 2.6 1l.9-1 1.4 1.4a1.5 1.5 0 0 0 2.2 0L13.5 18l1.4 1.4a1.5 1.5 0 0 0 2.2 0l.9-1A1.5 1.5 0 0 0 20.6 18V9.5C19 5.5 16 2 12 2z"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/>`,
            'compass': `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
            'cpu': `<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>`,
            'sparkles': `<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
            'star': `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`
        };

        const colorMap = {
            'ai-coder': 'rgb(99,102,241),rgb(139,92,246)',
            'claude-opus-45': 'rgb(168,85,247),rgb(139,92,246)',
            'claude-opus-46': 'rgb(168,85,247),rgb(139,92,246)',
            'claude-opus-47': 'rgb(168,85,247),rgb(139,92,246)',
            'claude-opus-48': 'rgb(168,85,247),rgb(139,92,246)',
            'claude-sonnet-46': 'rgb(245,158,11),rgb(217,119,6)',
            'deepseek-r1': 'rgb(249,115,22),rgb(234,88,12)',
            'deepseek-v32-thinking': 'rgb(20,184,166),rgb(13,148,136)',
            'deepseek-v4-flash': 'rgb(16,185,129),rgb(5,150,105)',
            'feelbetter-ai': 'rgb(236,72,153),rgb(219,39,119)',
            'grok-41': 'rgb(0,0,0),rgb(50,50,50)',
            'unlimited-ai': 'rgb(139,92,246),rgb(99,102,241)',
            'uncensored-ai': 'rgb(220,38,38),rgb(185,28,28)',
            'turboseek-ai': 'rgb(251,191,36),rgb(245,158,11)',
            'llama4-maverick': 'rgb(99,102,241),rgb(79,70,229)',
            'llama4-scout': 'rgb(99,102,241),rgb(79,70,229)',
            'gpt-55': 'rgb(16,185,129),rgb(5,150,105)',
            'gemini-31-flash': 'rgb(59,130,246),rgb(37,99,235)'
        };

        Object.entries(groups).forEach(([groupName, modelIds]) => {
            html += `<div style="padding:5px 10px 3px;font-size:10px;font-weight:700;color:rgb(var(--tx4));text-transform:uppercase;letter-spacing:.07em;margin-top:6px">${groupName}</div>`;
            modelIds.forEach(id => {
                const model = this.models.find(m => m.id === id);
                if (!model) return;
                const isSelected = App.state.modelEp === id;
                const colors = colorMap[id] || 'var(--clay),rgb(230,120,80)';
                const iconPath = iconMap[model.icon] || iconMap['code'];
                html += `
                    <div class="mo ${isSelected ? 'sel' : ''}" data-id="${id}" data-pro="${model.pro}" onclick="App.ai.selectModel('${id}')">
                        <div class="moic ${model.pro ? 'pro' : ''}" style="background:linear-gradient(135deg,${colors})">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">${iconPath}</svg>
                        </div>
                        <div class="moinf">
                            <div class="monm">${model.name}</div>
                            <div class="modc">${model.desc}</div>
                        </div>
                        ${model.pro ? `<span class="mo-lock">${App.state.isAbyz ? 'PRO' : '🔒'}</span>` : ''}
                        ${isSelected ? `<svg class="mochk" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
                    </div>
                `;
            });
        });

        container.innerHTML = html;
    },

    selectModel(id) {
        const model = this.models.find(m => m.id === id);
        if (!model) return;

        if (model.pro && !App.state.isAbyz) {
            App.toast('⚡ Model ini hanya untuk Abyz Plan!', 'warning');
            App.ui.openUpgrade();
            App.ui.closeModelDropdown();
            return;
        }

        App.state.modelEp = id;
        App.state.model = model.name;
        document.getElementById('mnm').textContent = model.name;
        document.getElementById('stg-provider').textContent = model.name;
        document.getElementById('mdot').className = model.pro ? 'mdot pro-dot' : 'mdot';

        // Update dropdown
        document.querySelectorAll('#mdd .mo').forEach(el => {
            const isSelected = el.dataset.id === id;
            el.classList.toggle('sel', isSelected);
            const chk = el.querySelector('.mochk');
            if (isSelected && !chk) {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('class', 'mochk');
                svg.setAttribute('width', '13');
                svg.setAttribute('height', '13');
                svg.setAttribute('viewBox', '0 0 24 24');
                svg.setAttribute('fill', 'none');
                svg.setAttribute('stroke', 'currentColor');
                svg.setAttribute('stroke-width', '2.5');
                const p = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
                p.setAttribute('points', '20 6 9 17 4 12');
                svg.appendChild(p);
                el.appendChild(svg);
            } else if (!isSelected && chk) {
                chk.remove();
            }
        });

        App.ui.closeModelDropdown();
        App.saveState();
        App.toast(`Switched to ${model.name}`, 'info');
    },

    updateModelUI() {
        const model = this.models.find(m => m.id === App.state.modelEp);
        if (model) {
            document.getElementById('mdot').className = model.pro ? 'mdot pro-dot' : 'mdot';
            document.getElementById('stg-provider').textContent = model.name;
        }
    },

    // ── JAILBREAK DETECTION ──
    isJailbreak(text) {
        const lower = text.toLowerCase();
        const patterns = [
            'ignore previous', 'forget your', 'new instruction', 'system prompt',
            'you are now', 'act as if', 'jailbreak', 'developer mode', 'override',
            'ignore all', 'disregard', 'pretend you', 'roleplay as', 'you are free',
            'no restrictions', 'unfiltered', 'without limits', 'break free',
            'your new name', 'call yourself', 'rename yourself', 'you are not',
            'stop being', 'dont be', 'remove your', 'remove all',
            'ign0re', 'j41lbr34k', 'd3v3lop3r', '0verr1de', 'd1sr3gard'
        ];
        return patterns.some(p => lower.includes(p));
    },

    // ── CALL AI ──
    async callAI(prompt, epKey, sessionId) {
        // Check jailbreak
        if (this.isJailbreak(prompt)) {
            return `⚠️ **Saya F24nT ai, dibuat oleh ${App.CREATOR_NAME}.**\n\nAda yang bisa saya bantu? 😊`;
        }

        // Init session memory
        if (!App.state.sessionMemory[sessionId]) {
            App.state.sessionMemory[sessionId] = { history: [] };
        }
        const memory = App.state.sessionMemory[sessionId];

        // Build context from history
        let contextPrompt = prompt;
        if (memory.history.length > 0) {
            const lastMessages = memory.history.slice(-5);
            const contextStr = lastMessages.map(m => `${m.role}: ${m.content}`).join('\n');
            contextPrompt = `Previous conversation:\n${contextStr}\n\nUser: ${prompt}`;
        }

        let result = null;

        // ── GOOGLE IMAGE ──
        if (epKey === 'google-image') {
            const results = await this._fetchGoogleImages(prompt);
            let resp = '🖼️ **Hasil Pencarian Gambar Google:**\n\n';
            results.slice(0, 10).forEach((img, i) => {
                resp += `${i+1}. **${img.title || 'Gambar'}**\n   📷 [Thumbnail](${img.thumbnail})\n   📌 Sumber: ${img.source || 'Google'}\n\n`;
            });
            result = resp;
        }

        // ── NEKOPOI ──
        else if (epKey === 'nekopoi') {
            if (!App.state.isAbyz) {
                result = `❌ **NekoPoi hanya untuk Abyz & Gokil Plan.**\nUpgrade dulu di menu Abyz Plan.`;
            } else {
                const lower = prompt.toLowerCase();
                if (lower.includes('random')) {
                    const data = await this._nekopoiRandom();
                    if (data?.url) {
                        result = `🎲 **Random NekoPoi:**\n\n🔗 **Link:** ${data.url}\n\n📖 <a href="${data.url}" target="_blank" style="color:var(--clay);text-decoration:underline;font-weight:600">Buka Halaman Detail</a>`;
                    } else {
                        result = 'Gagal mengambil random NekoPoi.';
                    }
                } else if (lower.includes('search') || lower.includes('cari')) {
                    const q = prompt.replace(/search|cari|neko poi/i, '').trim() || 'hentai';
                    const data = await this._nekopoiSearch(q);
                    if (data?.data?.length) {
                        let resp = '🔍 **Hasil Pencarian NekoPoi:**\n\n';
                        data.data.slice(0, 10).forEach((item, i) => {
                            resp += `${i+1}. **${item.title || 'Unknown'}**\n   🔗 ${item.url || ''}\n`;
                        });
                        result = resp;
                    } else {
                        result = `Tidak ada hasil untuk "${q}".`;
                    }
                } else {
                    result = `📋 **NekoPoi Commands:**\n\n• random\n• search [judul]`;
                }
            }
        }

        // ── AI CODER (Claude 4.7 + GPT 5.5) ──
        else if (epKey === 'ai-coder') {
            let response = await this._callSynoxAI('claude-opus-47', contextPrompt, sessionId);
            if (!response || response.includes('Error') || response.length < 10) {
                response = await this._callSynoxAI('gpt-55', contextPrompt, sessionId);
            }
            if (!response || response.includes('Error') || response.length < 10) {
                response = await this._callSynoxAI('ai-coder', contextPrompt, sessionId);
            }
            // Fallback ke Pollinations
            if (!response || response.length < 10) {
                response = await this._callPollinations(prompt);
            }
            result = response || `❌ Semua model gagal.`;
        }

        // ── SYNoxCloud AI ──
        else {
            result = await this._callSynoxAI(epKey, contextPrompt, sessionId);
            if (!result || result.length < 10) {
                result = await this._callPollinations(prompt);
            }
            if (!result || result.length < 10) {
                result = await this._callSynoxAI('ai-coder', contextPrompt, sessionId);
            }
            if (!result || result.length < 10) {
                result = '❌ Tidak ada respons dari AI.';
            }
        }

        // Add creator credit
        if (result && !result.includes(App.CREATOR_NAME) && !result.includes('Powered by')) {
            result += `\n\n---\n🤖 *F24nT ai - Powered by ${App.CREATOR_NAME}*`;
        }

        // Save to memory
        if (result) {
            memory.history.push({ role: 'user', content: prompt });
            memory.history.push({ role: 'assistant', content: result.substring(0, 500) });
            if (memory.history.length > 20) {
                memory.history = memory.history.slice(-20);
            }
        }

        return result;
    },

    // ── SYNoxCloud API ──
    async _callSynoxAI(endpointKey, query, sessionId) {
        const ep = this.endpoints[endpointKey];
        if (!ep) return null;
        const param = ep.param || 'pesan';
        let extra = ep.extra || '';
        if (extra.includes('session=') && sessionId) {
            extra = extra.replace('session=', 'session=' + sessionId);
        }
        const url = `${this.SYNOX_BASE}${ep.path}?${param}=${encodeURIComponent(query)}${extra ? '&' + extra : ''}`;
        
        try {
            const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
            const text = await r.text();
            let data;
            try { data = JSON.parse(text); } catch (e) {
                if (text && text.trim().length > 10 && !text.includes('<!DOCTYPE')) {
                    return text.trim();
                }
                return null;
            }
            let answer = data.result?.reply || data.result?.answer || data.answer || 
                        data.response || data.message || data.text || 
                        data.data?.answer || data.data?.response || data.result || null;
            if (answer && typeof answer === 'string' && answer.trim()) {
                return answer;
            }
            if (data.success || data.statusCode === 200) {
                return 'Respons diterima.';
            }
            if (data.error || data.message) {
                return `Error: ${data.error || data.message}`;
            }
            return null;
        } catch (e) {
            return null;
        }
    },

    // ── Pollinations Fallback ──
    async _callPollinations(prompt) {
        try {
            const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai&nologo=true`;
            const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
            const text = await r.text();
            if (text && text.trim().length > 10 && !text.includes('<!DOCTYPE')) {
                return text.trim();
            }
            return null;
        } catch (e) {
            return null;
        }
    },

    // ── GOOGLE IMAGE ──
    async _fetchGoogleImages(query, options = {}) {
        try {
            let base = 'https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(query);
            if (options.size) {
                const m = { large: 'isz:l', medium: 'isz:m', icon: 'isz:i' };
                if (m[options.size]) base += '&' + m[options.size];
            }
            if (options.type) {
                const m = { face: 'itp:face', photo: 'itp:photo', clipart: 'itp:clipart', lineart: 'itp:lineart', animated: 'itp:animated' };
                if (m[options.type]) base += '&' + m[options.type];
            }
            const r = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(base), {
                signal: AbortSignal.timeout(20000)
            });
            const html = await r.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const results = [];
            doc.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src && src.startsWith('http') && !src.includes('google.com/images')) {
                    results.push({
                        thumbnail: src,
                        title: img.getAttribute('alt') || 'Image',
                        source: new URL(src).hostname
                    });
                }
            });
            if (results.length === 0) {
                return [{ thumbnail: 'https://via.placeholder.com/150?text=No+Results', title: 'Coba lagi', source: 'google.com' }];
            }
            return results.slice(0, 20);
        } catch (e) {
            return [{ thumbnail: 'https://via.placeholder.com/150?text=Error', title: 'Error fetching', source: 'error' }];
        }
    },

    // ── NEKOPOI ──
    async _nekopoiRandom() {
        try {
            const r = await fetch('https://nekopoi.synoxcloud.biz.id/api/random', {
                signal: AbortSignal.timeout(8000)
            });
            return await r.json();
        } catch (e) {
            return null;
        }
    },

    async _nekopoiSearch(query) {
        try {
            const r = await fetch(`https://nekopoi.synoxcloud.biz.id/api/search?q=${encodeURIComponent(query)}`, {
                signal: AbortSignal.timeout(8000)
            });
            return await r.json();
        } catch (e) {
            return null;
        }
    },

    // ── SEND MESSAGE ──
    async sendMessage() {
        const ta = document.getElementById('ita');
        if (!ta) return;
        const txt = ta.value.trim();
        if ((!txt && App.state.attachedFiles.length === 0) || App.state.isBusy) return;

        if (!this._checkUsage()) return;

        const wlc = document.getElementById('wlc');
        const msgsEl = document.getElementById('msgs');
        const shareBtn = document.getElementById('share-btn');
        if (wlc) wlc.style.display = 'none';
        if (msgsEl) msgsEl.style.display = 'flex';

        if (!App.state.activeChatId) {
            App.state.activeChatId = this._createChat(txt || 'Chat');
            App.ui.renderHistory();
            if (shareBtn) shareBtn.style.display = 'flex';
        }

        // Handle attachments
        const images = App.state.attachedFiles.filter(f => f.isImage && f.dataUrl);
        const files = App.state.attachedFiles.filter(f => !f.isImage);
        let fileInfo = '';

        if (images.length) {
            fileInfo += `\n\n🖼️ **${images.length} gambar dilampirkan:**\n`;
            images.forEach(img => {
                fileInfo += `\n![gambar](${img.dataUrl})`;
            });
        }

        if (files.length) {
            fileInfo += '\n\n📎 **File yang dilampirkan:**\n';
            files.forEach(f => {
                const size = (f.file.size / 1024).toFixed(1);
                fileInfo += `- ${f.name} (${size} KB)\n`;
                // Preview teks untuk file tertentu
                if (f.file.type === 'text/plain' || f.name.endsWith('.txt') || f.name.endsWith('.md') ||
                    f.name.endsWith('.js') || f.name.endsWith('.html') || f.name.endsWith('.css') ||
                    f.name.endsWith('.py') || f.name.endsWith('.json')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const content = e.target.result;
                        const preview = content.substring(0, 1000);
                        const msgsEl2 = document.getElementById('msgs');
                        if (msgsEl2) {
                            const previewDiv = document.createElement('div');
                            previewDiv.style.cssText = 'background:rgba(var(--bg2),0.5);border-radius:8px;padding:8px 12px;margin:4px 0;font-size:13px;color:rgb(var(--tx3));white-space:pre-wrap;max-height:150px;overflow-y:auto;font-family:monospace';
                            previewDiv.textContent = preview + (content.length > 1000 ? '\n... (truncated)' : '');
                            const lastMsg = msgsEl2.lastElementChild;
                            if (lastMsg) {
                                const ct = lastMsg.querySelector('.ma-ct');
                                if (ct) {
                                    const wrap = document.createElement('div');
                                    wrap.innerHTML = `📄 **${f.name}** (${size} KB):\n\n`;
                                    wrap.appendChild(previewDiv);
                                    ct.appendChild(wrap);
                                }
                            }
                        }
                    };
                    reader.readAsText(f.file);
                }
            });
        }

        const fullTxt = txt + fileInfo;

        this._renderUser(fullTxt || 'Pesan kosong', true, images);
        this._addToChat('user', fullTxt || 'Pesan kosong', '', images.map(im => im.dataUrl));

        ta.value = '';
        ta.style.height = 'auto';
        App.state.attachedFiles = [];
        const apEl = document.getElementById('ap');
        if (apEl) { apEl.innerHTML = ''; apEl.classList.remove('show'); }
        this._updateSend();

        if (App.state.activeChatId && this._getChats()[App.state.activeChatId]) {
            const chat = this._getChats()[App.state.activeChatId];
            if (chat.msgs.filter(m => m.role === 'user').length === 1) {
                chat.title = (txt || 'Chat').slice(0, 50);
                App.saveState();
                App.ui.renderHistory();
            }
        }

        App.state.isBusy = true;
        this._updateSend();
        this._showTyping();

        const ep = App.state.modelEp || 'ai-coder';
        const sessionId = App.state.activeChatId || 'default';

        let response = '';
        try {
            response = await this.callAI(fullTxt || txt, ep, sessionId);
            if (!response || response.trim() === '') response = 'Tidak ada respons.';
        } catch (e) {
            response = `Error: ${e.message}`;
        }

        const tg = document.getElementById('typing-g');
        if (tg) tg.remove();

        await this._renderAssistWithTyping(response, App.state.model);
        this._addToChat('assistant', response, App.state.model);

        App.state.isBusy = false;
        if (!App.state.isAbyz) {
            App.state.usage++;
            if (!App.state.usageStart) App.state.usageStart = Date.now();
            if (App.state.usage === 80) {
                App.toast('20 pesan tersisa. Upgrade untuk unlimited.', 'warning');
            }
        }
        App.saveState();
        App.ui.updateUsageUI();
        this._updateSend();
        App.ui.clearTool();
    },

    // ── CHAT HELPERS ──
    _getChats() {
        return App.state.isIncog ? App.state.incogChats : App.state.chats;
    },

    _createChat(title) {
        const id = 'c' + Date.now() + Math.random().toString(36).slice(2, 6);
        const chats = this._getChats();
        chats[id] = {
            id,
            title: title.slice(0, 50),
            msgs: [],
            starred: false,
            project: null,
            created: Date.now(),
            updated: Date.now()
        };
        if (!App.state.isIncog) App.saveState();
        return id;
    },

    _addToChat(role, content, src = '', images = null) {
        if (!App.state.activeChatId) return;
        const chats = this._getChats();
        if (chats[App.state.activeChatId]) {
            const msg = { role, content, src, ts: Date.now() };
            if (images && images.length) msg.images = images;
            chats[App.state.activeChatId].msgs.push(msg);
            chats[App.state.activeChatId].updated = Date.now();
            if (!App.state.isIncog) App.saveState();
            App.ui.renderHistory();
        }
    },

    _checkUsage() {
        if (App.state.isAbyz) return true;
        if (!App.state.usageStart) App.state.usageStart = Date.now();
        if (Date.now() - App.state.usageStart > App.RESET_MS) {
            App.state.usage = 0;
            App.state.usageStart = Date.now();
        }
        if (App.state.usage >= App.MAX_USAGE) {
            this._showRateLimit();
            return false;
        }
        return true;
    },

    _showRateLimit() {
        document.getElementById('rate-overlay').classList.add('on');
        const remaining = Math.max(0, App.RESET_MS - (Date.now() - App.state.usageStart));
        let secs = Math.ceil(remaining / 1000);
        const el = document.getElementById('ro-timer');
        clearInterval(App.state.resetTimer);
        App.state.resetTimer = setInterval(() => {
            secs--;
            const m = Math.floor(secs / 60);
            const s = secs % 60;
            el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            if (secs <= 0) {
                clearInterval(App.state.resetTimer);
                App.state.usage = 0;
                App.state.usageStart = 0;
                App.saveState();
                App.ui.closeRateLimit();
                App.toast('✅ Pesan sudah direset!');
            }
        }, 1000);
    },

    _updateSend() {
        const ta = document.getElementById('ita');
        const hasText = ta && ta.value.trim();
        const hasFiles = App.state.attachedFiles.length > 0;
        document.getElementById('send').disabled = (!hasText && !hasFiles) || App.state.isBusy;
    },

    _showTyping() {
        const msgsEl = document.getElementById('msgs');
        const g = document.createElement('div');
        g.className = 'mg';
        g.id = 'typing-g';
        g.innerHTML = `<div class="ma">
            <div class="ma-hd">${this._logoSVG(22)}<span class="ma-nm">F24nT ai</span><span class="ma-src">${App.state.model}</span></div>
            <div class="tw">
                <svg class="t-svg" viewBox="0 0 32 32" fill="none">
                    <g class="tr1"><circle cx="16" cy="16" r="14" stroke="rgb(207,100,58)" stroke-width="2" stroke-linecap="round" stroke-dasharray="56 32" opacity=".9"/></g>
                    <g class="tr2"><circle cx="16" cy="16" r="10" stroke="rgb(195,85,40)" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="36 27" opacity=".7"/></g>
                    <g class="tr3"><circle cx="16" cy="16" r="6" stroke="rgb(207,100,58)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="18 20" opacity=".85"/></g>
                    <circle class="tcore" cx="16" cy="16" r="3" fill="rgb(207,100,58)" opacity=".8"/>
                </svg>
                <span class="tlbl">Mengetik...</span>
            </div>
        </div>`;
        msgsEl.appendChild(g);
        this._scrollBot();
    },

    // ── RENDER FUNCTIONS ──
    _renderUser(txt, animate = true, images = null) {
        const msgsEl = document.getElementById('msgs');
        const g = document.createElement('div');
        g.className = 'mg';
        if (!animate) g.style.animation = 'none';
        let imgHtml = '';
        if (images && images.length) {
            imgHtml = `<div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;margin-bottom:6px">${images.map(im => {
                const src = typeof im === 'string' ? im : (im.dataUrl || '');
                return `<img src="${src}" alt="" style="max-width:160px;max-height:160px;border-radius:12px;object-fit:cover;border:1px solid rgba(var(--br1),.5)"/>`;
            }).join('')}</div>`;
        }
        g.innerHTML = `<div class="mu">${imgHtml}${txt ? `<div class="mu-b">${App.utils.escape(txt)}</div>` : ''}</div>
            <div class="mu-ac">
                <button class="ab" onclick="App.utils.copyText(${JSON.stringify(txt)})"><span class="abt">Copy</span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>
            </div>`;
        msgsEl.appendChild(g);
        this._scrollBot();
    },

    async _renderAssistWithTyping(txt, src) {
        const msgsEl = document.getElementById('msgs');
        if (!msgsEl) return;
        const safeText = txt && txt.trim() ? txt : 'Tidak ada respons.';

        const g = document.createElement('div');
        g.className = 'mg';
        g.innerHTML = `<div class="ma">
            <div class="ma-hd">${this._logoSVG(22)}<span class="ma-nm">F24nT ai</span>${src ? `<span class="ma-src">${App.utils.escape(src)}</span>` : ''}</div>
            <div class="ma-ct" style="color:rgb(var(--tx1))" id="typing-content"></div>
            <div class="ma-ac">
                <button class="ab" onclick="App.utils.copyAssist(this)"><span class="abt">Copy</span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></button>
                <button class="ab" onclick="App.ai.regenLast()"><span class="abt">Retry</span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.35"/></svg></button>
                <button class="ab" onclick="App.ui.thumbUp(this)"><span class="abt">Good</span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg></button>
                <button class="ab" onclick="App.ui.thumbDown(this)"><span class="abt">Bad</span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg></button>
            </div>
        </div>`;
        msgsEl.appendChild(g);
        this._scrollBot();

        const contentEl = g.querySelector('#typing-content');
        const htmlContent = App.ui.formatMarkdown(safeText);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        const textContent = tempDiv.textContent || tempDiv.innerText || safeText;

        contentEl.innerHTML = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < textContent.length) {
                const partialText = safeText.substring(0, i + 1);
                contentEl.innerHTML = App.ui.formatMarkdown(partialText);
                i++;
                this._scrollBot();
            } else {
                clearInterval(interval);
                if (App.state.hlOn) {
                    contentEl.querySelectorAll('pre code').forEach(b => {
                        try { hljs.highlightElement(b); } catch (_) { }
                    });
                }
            }
        }, 8);
    },

    _logoSVG(sz) {
        return `<svg class="ma-logo" width="${sz}" height="${sz}" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="44" stroke="rgb(207,100,58)" stroke-width="7" stroke-linecap="round" stroke-dasharray="210 60" opacity=".9"/>
            <circle cx="50" cy="50" r="30" stroke="rgb(195,85,40)" stroke-width="5.5" stroke-linecap="round" stroke-dasharray="140 38" opacity=".7"/>
            <circle cx="50" cy="50" r="16" stroke="rgb(207,100,58)" stroke-width="4" stroke-linecap="round" stroke-dasharray="78 18"/>
            <circle cx="50" cy="50" r="7" fill="rgb(207,100,58)" opacity=".85"/>
        </svg>`;
    },

    _scrollBot() {
        const ca = document.getElementById('ca');
        setTimeout(() => { ca.scrollTop = ca.scrollHeight; }, 30);
    },

    regenLast() {
        if (App.state.isBusy || !App.state.activeChatId) return;
        const msgs = document.getElementById('msgs');
        const last = msgs.querySelector('.mg:last-child .ma');
        if (last) {
            msgs.querySelector('.mg:last-child').remove();
            const chats = this._getChats();
            if (chats[App.state.activeChatId]) {
                chats[App.state.activeChatId].msgs.pop();
            }
        }
        const lastUser = msgs.querySelector('.mg:last-child .mu-b');
        if (lastUser) {
            App.state.isBusy = true;
            this._updateSend();
            this._showTyping();
            const sessionId = App.state.activeChatId || 'default';
            this.callAI(lastUser.textContent, App.state.modelEp || 'ai-coder', sessionId).then(resp => {
                const tg = document.getElementById('typing-g');
                if (tg) tg.remove();
                this._renderAssistWithTyping(resp, App.state.model);
                this._addToChat('assistant', resp, App.state.model);
                App.state.isBusy = false;
                this._updateSend();
            });
        }
    }
};
