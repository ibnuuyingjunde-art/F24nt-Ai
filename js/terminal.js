/**
 * F24nT AI - Terminal Module
 * Supports: Python, JavaScript, HTML, Bash
 */

App.terminal = {
    isOpen: false,

    open() {
        document.getElementById('terminal-modal').classList.add('on');
        this.isOpen = true;
        document.getElementById('terminal-input').focus();
        document.getElementById('terminal-output').innerHTML = '🚀 Terminal siap digunakan.\nKetik kode atau pilih bahasa di atas.';
    },

    close() {
        document.getElementById('terminal-modal').classList.remove('on');
        this.isOpen = false;
    },

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    },

    run(language) {
        const input = document.getElementById('terminal-input');
        const placeholder = {
            'python': '# Python code\nprint("Hello, World!")\n\n# Contoh:\n# def fibonacci(n):\n#     return n if n < 2 else fibonacci(n-1) + fibonacci(n-2)\n# print(fibonacci(10))',
            'javascript': '// JavaScript code\nconsole.log("Hello, World!");\n\n// Contoh:\n// function fibonacci(n) {\n//   return n < 2 ? n : fibonacci(n-1) + fibonacci(n-2);\n// }\n// console.log(fibonacci(10));',
            'html': `<!-- HTML Preview -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Preview</title>\n  <style>\n    body { font-family: Arial; text-align: center; padding: 40px; }\n    button { background: #00bfff; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; }\n    button:hover { background: #0099cc; }\n  </style>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>F24nT ai Terminal Preview</p>\n  <button onclick="alert('Clicked!')">Click Me</button>\n</body>\n</html>`,
            'bash': '# Bash/Shell\n#!/bin/bash\necho "Hello, World!"\n\n# Contoh:\n# for i in {1..5}; do\n#   echo "Loop $i"\n# done'
        };
        input.value = placeholder[language] || '';
        input.focus();
        App.toast(`🧪 Mode ${language} siap`, 'info');
    },

    async execute() {
        const input = document.getElementById('terminal-input');
        const output = document.getElementById('terminal-output');
        const code = input.value.trim();

        if (!code) {
            App.toast('⚠️ Tulis kode terlebih dahulu.', 'warning');
            return;
        }

        output.innerHTML = '⏳ Menjalankan kode...\n';
        
        // Detect language
        let language = 'javascript';
        if (code.includes('def ') || code.includes('import ') || code.includes('print(')) {
            language = 'python';
        } else if (code.includes('<!DOCTYPE') || code.includes('<html>') || code.includes('<body>')) {
            language = 'html';
        } else if (code.includes('#!/bin/bash') || code.includes('echo ') || code.includes('for i in')) {
            language = 'bash';
        }

        try {
            let result = '';

            switch(language) {
                case 'python':
                    result = await this._runPython(code);
                    break;
                case 'javascript':
                    result = await this._runJavaScript(code);
                    break;
                case 'html':
                    result = await this._runHTML(code);
                    break;
                case 'bash':
                    result = await this._runBash(code);
                    break;
                default:
                    result = '❌ Bahasa tidak didukung.';
            }

            output.innerHTML = result;
        } catch (e) {
            output.innerHTML = `<span class="error">❌ Error: ${App.utils.escape(e.message)}</span>`;
        }

        // Scroll ke bawah
        output.scrollTop = output.scrollHeight;
    },

    clear() {
        document.getElementById('terminal-input').value = '';
        document.getElementById('terminal-output').innerHTML = '🗑️ Terminal dibersihkan.\nKetik kode baru...';
    },

    // ── PYTHON (simulasi) ──
    async _runPython(code) {
        // Simulasi Python dengan JavaScript eval (terbatas)
        try {
            // Simple Python to JS conversion
            let jsCode = code
                .replace(/print\((.+)\)/g, 'console.log($1)')
                .replace(/def (\w+)\(([^)]*)\):/g, 'function $1($2) {')
                .replace(/return /g, 'return ')
                .replace(/:/g, ';')
                .replace(/    /g, '  ');
            
            // Execute in sandbox
            const fn = new Function(`
                const console = { log: (...args) => output += args.join(' ') + '\\n' };
                let output = '';
                try {
                    ${jsCode}
                } catch(e) {
                    output = 'Error: ' + e.message;
                }
                return output;
            `);
            
            let result = fn();
            return `<span class="success">✅ Python (simulasi):</span>\n${result || 'Kode berhasil dijalankan.'}`;
        } catch (e) {
            return `<span class="error">❌ Error: ${App.utils.escape(e.message)}</span>`;
        }
    },

    // ── JAVASCRIPT ──
    async _runJavaScript(code) {
        try {
            let output = '';
            const fn = new Function(`
                const console = { log: (...args) => output += args.join(' ') + '\\n' };
                let output = '';
                try {
                    ${code}
                } catch(e) {
                    output = 'Error: ' + e.message;
                }
                return output;
            `);
            
            let result = fn();
            return `<span class="success">✅ JavaScript:</span>\n${result || 'Kode berhasil dijalankan.'}`;
        } catch (e) {
            return `<span class="error">❌ Error: ${App.utils.escape(e.message)}</span>`;
        }
    },

    // ── HTML ──
    async _runHTML(code) {
        // Sanitasi HTML untuk preview
        const sanitized = code
            .replace(/<script>[\s\S]*?<\/script>/gi, '')
            .replace(/on\w+=/gi, 'data-');
        
        return `<span class="success">✅ HTML Preview:</span>
            <div style="margin-top:8px;padding:12px;background:white;border-radius:8px;color:#333;">
                ${sanitized}
            </div>
            <div style="margin-top:8px;font-size:11px;color:rgb(var(--tx4))">
                ⚠️ Script dan event handler dinonaktifkan untuk keamanan.
            </div>`;
    },

    // ── BASH (simulasi) ──
    async _runBash(code) {
        // Simulasi bash command
        const lines = code.split('\n');
        let output = '';
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('#')) continue;
            if (trimmed.startsWith('echo ')) {
                output += trimmed.replace('echo ', '') + '\n';
            } else if (trimmed.includes('for')) {
                output += '🔄 Loop detected (simulated)\n';
            } else if (trimmed) {
                output += `💻 ${trimmed}\n`;
            }
        }
        return `<span class="success">✅ Bash (simulasi):</span>\n${output || 'Kosong'}`;
    }
};
