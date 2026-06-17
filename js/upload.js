/**
 * F24nT AI - File Upload Module
 */

App.upload = {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
        'video/mp4', 'video/webm',
        'text/plain', 'text/markdown', 'text/csv',
        'application/json', 'application/pdf',
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/javascript', 'text/html', 'text/css',
        'text/x-python', 'text/x-c++src', 'text/x-java-source'
    ],

    triggerFile() {
        document.getElementById('fi').click();
    },

    handleFiles(input) {
        const files = Array.from(input.files);
        if (files.length === 0) return;

        for (const file of files) {
            // Validate size
            if (file.size > this.MAX_SIZE) {
                App.toast(`❌ File ${file.name} terlalu besar (max 10MB)`, 'error');
                continue;
            }

            // Validate type
            const isValid = this.ALLOWED_TYPES.some(type => file.type.includes(type.split('/')[0])) ||
                           file.type.startsWith('image/') ||
                           file.type.startsWith('video/') ||
                           file.name.endsWith('.py') || file.name.endsWith('.js') ||
                           file.name.endsWith('.html') || file.name.endsWith('.css') ||
                           file.name.endsWith('.cpp') || file.name.endsWith('.java') ||
                           file.name.endsWith('.md') || file.name.endsWith('.txt');

            if (!isValid) {
                App.toast(`❌ Format file ${file.name} tidak didukung`, 'error');
                continue;
            }

            const isImage = file.type.startsWith('image/') || file.type.startsWith('video/');
            const item = { name: file.name, file: file, isImage: isImage, dataUrl: null };
            App.state.attachedFiles.push(item);

            if (isImage) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    item.dataUrl = e.target.result;
                    this._addChip(item);
                    App.ai._updateSend();
                };
                // Gunakan readAsDataURL untuk preview gambar
                reader.readAsDataURL(file);
            } else {
                this._addChip(item);
                App.ai._updateSend();
            }
        }

        input.value = '';
    },

    _addChip(item) {
        const ap = document.getElementById('ap');
        ap.classList.add('show');
        const c = document.createElement('div');
        c.className = 'achip' + (item.isImage ? ' aimg' : '');
        c.dataset.name = item.name;

        if (item.isImage && item.dataUrl) {
            c.innerHTML = `
                <img src="${item.dataUrl}" alt=""/>
                <span style="max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${App.utils.escape(item.name)}</span>
                <button onclick="App.upload._removeChip(this, '${App.utils.escape(item.name)}')">✕</button>
            `;
        } else {
            c.innerHTML = `
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                ${App.utils.escape(item.name)}
                <button onclick="App.upload._removeChip(this, '${App.utils.escape(item.name)}')">✕</button>
            `;
        }
        ap.appendChild(c);
    },

    _removeChip(btn, name) {
        App.state.attachedFiles = App.state.attachedFiles.filter(f => f.name !== name);
        btn.closest('.achip').remove();
        if (App.state.attachedFiles.length === 0) {
            document.getElementById('ap').classList.remove('show');
        }
        App.ai._updateSend();
    },

    // Read file as text (for preview)
    readFileContent(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            // Gunakan readAsText untuk file teks
            reader.readAsText(file);
        });
    }
};
