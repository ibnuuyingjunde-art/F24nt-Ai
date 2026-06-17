const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ── STATIC FILES ──
app.use(express.static('.'));

// ── PYTHON EXECUTION ──
app.post('/api/execute/python', (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'No code provided' });

    const tempFile = path.join(__dirname, 'temp.py');
    fs.writeFileSync(tempFile, code);

    exec(`python "${tempFile}"`, { timeout: 10000 }, (error, stdout, stderr) => {
        fs.unlinkSync(tempFile);
        res.json({
            success: !error,
            output: stdout || stderr || 'No output',
            error: error ? error.message : null
        });
    });
});

// ── JAVASCRIPT EXECUTION ──
app.post('/api/execute/javascript', (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'No code provided' });

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
        const result = fn();
        res.json({ success: true, output: result || 'Success' });
    } catch (e) {
        res.json({ success: false, output: 'Error: ' + e.message });
    }
});

// ── HTML PREVIEW ──
app.post('/api/execute/html', (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'No code provided' });
    res.json({ success: true, html: code });
});

// ── BASH EXECUTION ──
app.post('/api/execute/bash', (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'No code provided' });

    const tempFile = path.join(__dirname, 'temp.sh');
    fs.writeFileSync(tempFile, code);

    exec(`bash "${tempFile}"`, { timeout: 10000 }, (error, stdout, stderr) => {
        fs.unlinkSync(tempFile);
        res.json({
            success: !error,
            output: stdout || stderr || 'No output',
            error: error ? error.message : null
        });
    });
});

// ── UPGRADE VALIDATION ──
const VALID_CODES = {
    'ABYZ2024': 'abyz',
    'GOKIL2024': 'gokil'
};

app.post('/api/validate-upgrade', (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'No code provided' });

    const plan = VALID_CODES[code.toUpperCase()];
    if (plan) {
        res.json({ success: true, plan });
    } else {
        res.json({ success: false, error: 'Kode tidak valid' });
    }
});

// ── 404 HANDLER ──
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
    console.log(`✅ F24nT AI Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from: ${__dirname}`);
    console.log(`📚 API docs: http://localhost:${PORT}/docs/API.md`);
});
