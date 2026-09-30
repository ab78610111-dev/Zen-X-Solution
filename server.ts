import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not configured. Please check your API key in the Settings > Secrets panel.'
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const ZENX_SYSTEM_INSTRUCTION = `You are the official Customer & Technical Support Specialist for ZenX Solutions, a modern digital services company.

Your Role & Tone:
- Professional, concise, helpful, technology-focused, and transparent.
- Help visitors understand ZenX Solutions' confirmed services, recommend the right combination of services for their goals, troubleshoot technical or e-commerce questions, and provide up-to-date industry insights using Google Search when helpful.
- Never invent unconfirmed company statistics (such as years in business, number of employees, awards, client counts, or specific pricing tiers). State that project quotes are tailored after a quick discovery discussion.

ZenX Solutions' 20 Confirmed Services (across 5 core pillars):
1. Web & Development:
   - Web Development
   - Website Design
   - Mobile App Development
   - UI/UX Design
   - Website Maintenance
   - Payment Gateway Integration
2. E-Commerce:
   - Shopify Development
   - E-Commerce Management
3. Digital Marketing:
   - Digital Marketing
   - SEO Services
   - Local SEO
   - Social Media Marketing
   - Social Media Management
   - Content Marketing
4. Creative:
   - Graphic Design
   - Video Editing
   - Content Creation
5. Support:
   - Customer Support
   - Technical Support
   - Call Center Services

ZenX Solutions' 6-Stage Service Process:
01 — Discover: Understand the client's requirements and goals.
02 — Plan: Create the project strategy and solution structure.
03 — Design: Develop the visual and user experience.
04 — Develop: Build and implement the required solution.
05 — Launch: Deploy the completed solution.
06 — Support: Provide maintenance and technical/customer support where required.

Direct Contact & Escalation Options:
- Email / Gmail: ab78610111@gmail.com
- Direct WhatsApp channel available directly inside the website interface.

Formatting Guidelines:
- Keep answers structured, easy to scan, and under 180 words unless the user asks for an in-depth technical breakdown.
- Use bullet points for service recommendations or actionable steps.`;

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

interface GroundingSource {
  title: string;
  uri: string;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/support/chat', async (req, res) => {
    try {
      const {
        messages,
        mode = 'balanced',
        useSearchGrounding = true,
        selectedServices = [],
      } = req.body as {
        messages?: ChatTurn[];
        mode?: 'fast' | 'balanced' | 'technical';
        useSearchGrounding?: boolean;
        selectedServices?: string[];
      };

      if (!Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'Conversation messages are required.' });
        return;
      }

      const ai = getGeminiClient();

      // Select model based on requested support mode and search grounding
      const modelName =
        mode === 'fast' && !useSearchGrounding
          ? 'gemini-3.1-flash-lite'
          : 'gemini-3.8-flash';

      const scopeContext =
        Array.isArray(selectedServices) && selectedServices.length > 0
          ? `\n\nVisitor's currently selected services in Project Scope: ${selectedServices.join(', ')}.`
          : '';

      const roleAddendum =
        mode === 'technical'
          ? '\nFocus on detailed technical support, architecture planning, integration diagnostics, and implementation best practices.'
          : mode === 'fast'
          ? '\nProvide a rapid, direct, and concise customer support response.'
          : '\nProvide balanced customer support and up-to-date web-grounded guidance.';

      const contents = messages.map((m) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: String(m.text || '') }],
      }));

      const config: Record<string, unknown> = {
        systemInstruction: ZENX_SYSTEM_INSTRUCTION + scopeContext + roleAddendum,
      };

      if (useSearchGrounding) {
        config.tools = [{ googleSearch: {} }];
      }

      if (mode === 'technical' && modelName === 'gemini-3.8-flash') {
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
      } else if (mode === 'balanced' && modelName === 'gemini-3.8-flash') {
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config,
      });

      const replyText =
        response.text ||
        'Thank you for reaching out to ZenX Solutions Customer Support. How can we assist with your project today?';

      // Extract Google Search Grounding URLs if present
      const sources: GroundingSource[] = [];
      const seenUris = new Set<string>();
      const groundingChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks;

      if (Array.isArray(groundingChunks)) {
        for (const chunk of groundingChunks) {
          const web = (chunk as { web?: { uri?: string; title?: string } })?.web;
          if (web?.uri && !seenUris.has(web.uri)) {
            seenUris.add(web.uri);
            sources.push({
              uri: web.uri,
              title: web.title || web.uri,
            });
          }
        }
      }

      res.json({
        text: replyText,
        sources,
        modelUsed: modelName,
        searchGrounded: Boolean(useSearchGrounding),
      });
    } catch (error: unknown) {
      const errMessage =
        error instanceof Error ? error.message : 'Unexpected error calling support assistant.';

      if (
        errMessage.includes('PERMISSION_DENIED') ||
        errMessage.includes('API_KEY_INVALID') ||
        errMessage.includes('403') ||
        errMessage.includes('400')
      ) {
        res.status(403).json({
          error:
            'Unable to authenticate with Gemini API. Please check your API key in the Settings > Secrets panel.',
        });
        return;
      }

      if (errMessage.includes('RESOURCE_EXHAUSTED') || errMessage.includes('429')) {
        res.status(429).json({
          error:
            'Support assistant rate limit reached. Upgrading to a paid tier in Settings > Secrets increases quota.',
        });
        return;
      }

      res.status(500).json({
        error: errMessage,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ZenX Solutions server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
