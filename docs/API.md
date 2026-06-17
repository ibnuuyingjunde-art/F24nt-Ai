# F24nT AI API Documentation

## Overview

F24nT AI menyediakan berbagai model AI melalui REST API yang dapat digunakan untuk chat, coding, reasoning, dan analisis.

## Base URL

```http
https://api.synoxcloud.biz.id
```

---

# Authentication

## Free Plan

Tidak memerlukan autentikasi.

## Premium Plan (Abyz / Gokil)

Gunakan token yang diberikan administrator.

### Header

```http
Authorization: Bearer YOUR_TOKEN
```

---

# Response Format

## Success Response

```json
{
  "statusCode": 200,
  "status": true,
  "result": {
    "reply": "Hello, how can I help you?"
  },
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

## Error Response

```json
{
  "statusCode": 500,
  "status": false,
  "error": "Internal Server Error",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

---

# AI Models

## AI Coder

Generate source code from prompts.

### Endpoint

```http
GET /ai-coder
```

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| prompt | string | Yes | Coding prompt |
| session | string | No | Session identifier |

### Example

```http
GET /ai-coder?prompt=create+login+page&session=f24nt
```

---

## Claude Opus Series

### Claude Opus 4.5

```http
GET /claude-opus-4.5?pesan={message}
```

### Claude Opus 4.6

```http
GET /claude-opus-4.6?pesan={message}
```

### Claude Opus 4.7

```http
GET /claude-opus-4.7?pesan={message}
```

### Claude Opus 4.8

```http
GET /claude-opus-4.8?pesan={message}
```

**Parameter:**

| Name | Type | Required |
|------|------|----------|
| pesan | string | Yes |

---

## Claude Sonnet

```http
GET /claude-sonnet-4.6?pesan={message}
```

---

## DeepSeek Models

### DeepSeek R1

```http
GET /deepseek-r1?q={query}
```

### DeepSeek V3.2 Thinking

```http
GET /deepseek-v3.2-thinking?pesan={message}&session={session}
```

### DeepSeek V4 Flash

```http
GET /deepseek-v4-flash?pesan={message}&session={session}
```

---

## GPT Models

### GPT 5.5

```http
GET /gpt-5.5?pesan={message}
```

**Example:**

```http
GET /gpt-5.5?pesan=Hello
```

---

## Gemini Models

### Gemini 3.1 Flash Lite Preview

```http
GET /gemini-3.1-flash-lite-preview?pesan={message}&session={session}
```

---

## xAI Models

### Grok 4.1

```http
GET /x.ai-grok-4.1?pesan={message}
```

---

## Llama Models

### Llama 4 Maverick

```http
GET /llama4-maverick?pesan={message}
```

### Llama 4 Scout

```http
GET /llama-4-scout?pesan={message}&history={history}
```

---

## Additional Models

### FeelBetter AI

```http
GET /feelbetter-ai?pesan={message}&session={session}
```

### Unlimited AI

```http
GET /unlimited-ai?prompt={prompt}&session={session}
```

### Uncensored AI

```http
GET /uncensored-ai?pesan={message}
```

### TurboSeek AI

```http
GET /turboseek-ai?q={query}
```

---

# Self Hosted Backend

## Execute Code

Menjalankan kode secara langsung dari terminal F24nT AI.

### Endpoint

```http
POST /api/execute/{language}
```

### Supported Languages

- python
- javascript
- html
- bash

### Request

```json
{
  "code": "print('Hello World')"
}
```

### Response

```json
{
  "success": true,
  "output": "Hello World\n"
}
```

---

# File Analysis

Digunakan untuk membaca dan menganalisis file yang diunggah pengguna.

### Supported Formats

- txt
- md
- json
- js
- html
- css
- py

### Max Upload Size

```text
5 MB
```

---

# Rate Limits

| Plan | Limit |
|------|-------|
| Free | 100 requests / 30 minutes |
| Abyz | Unlimited |
| Gokil | Unlimited |

---

# HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limit Exceeded |
| 500 | Internal Server Error |

---

# Common Errors

## Missing Prompt

```json
{
  "statusCode": 400,
  "status": false,
  "error": "Prompt is required"
}
```

## Invalid Token

```json
{
  "statusCode": 401,
  "status": false,
  "error": "Invalid token"
}
```

## Rate Limited

```json
{
  "statusCode": 429,
  "status": false,
  "error": "Rate limit exceeded"
}
```

---

# Changelog

## v10.0.0

### Added

- AI Chat System
- 18+ AI Models
- AI Coder
- Terminal Runner
- File Upload & Analysis
- Conversation Memory
- Share Chat
- Incognito Mode
- Premium Plans (Abyz & Gokil)

---

# Support

For issues and feature requests:

GitHub Issues: https://github.com/ibnuuyingjunde-art/F24nt-Ai/issues
