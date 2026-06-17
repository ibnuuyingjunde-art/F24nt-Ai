
---

### 📄 FILE 7: `js/config.js`

```javascript
/**
 * F24nT AI - Configuration
 */

const CONFIG = {
    // App
    APP_NAME: 'F24nT AI',
    APP_VERSION: '10.0.0',
    CREATOR: 'YoeNw24',
    
    // API
    SYNOX_BASE: 'https://api.synoxcloud.biz.id/ai-chat',
    POLL_BASE: 'https://text.pollinations.ai',
    NEKOPOI_BASE: 'https://nekopoi.synoxcloud.biz.id',
    
    // Limits
    MAX_USAGE: 100,
    RESET_MS: 30 * 60 * 1000,
    MAX_FILE_SIZE: 10 * 1024 * 1024,
    
    // Features
    ENABLE_TERMINAL: true,
    ENABLE_UPLOAD: true,
    ENABLE_INCOGNITO: true,
    ENABLE_THEMES: true,
    
    // Models
    DEFAULT_MODEL: 'ai-coder',
    DEFAULT_MODEL_NAME: 'AI Coder',
    
    // Plans
    PLANS: {
        FREE: {
            name: 'Free',
            price: 0,
            messages: 100,
            models: ['ai-coder', 'deepseek-r1', 'deepseek-v32-thinking', 'deepseek-v4-flash', 'feelbetter-ai', 'unlimited-ai']
        },
        ABYZ: {
            name: 'Abyz',
            price: 15000,
            messages: 'unlimited',
            models: 'all'
        },
        GOKIL: {
            name: 'Gokil',
            price: 35000,
            messages: 'unlimited',
            models: 'all',
            features: ['custom-apis', 'ai-persona', 'custom-system-prompt']
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
