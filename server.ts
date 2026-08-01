import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '5mb' }));

  // API endpoint for Agentic / LLM Propositional Chunking
  app.post('/api/chunk/agentic', async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== 'string') {
        res.status(400).json({ error: 'Text prompt is required.' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: 'GEMINI_API_KEY environment variable is missing.' });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Decompose the following text into a list of atomic, self-contained propositions. 
Each proposition must be a clear factual sentence where all pronouns (he, she, it, they, this company, the system) are replaced with explicit entities, so each proposition makes sense independently.

Input Text:
"""
${text}
"""`,
        config: {
          systemInstruction: 'You are an NLP research assistant specializing in propositional chunking for RAG vector indices.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              propositions: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING
                },
                description: 'Array of atomic, self-contained factual statements.'
              }
            },
            required: ['propositions']
          }
        }
      });

      const rawJson = response.text || '{}';
      const parsed = JSON.parse(rawJson);

      res.json({ propositions: parsed.propositions || [] });
    } catch (error: any) {
      console.error('Error in agentic chunking Gemini API call:', error);
      res.status(500).json({ error: error.message || 'Failed to decompose text into propositions.' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'ChuckChunk' });
  });

  // Vite middleware or static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ChuckChunk] Express dev server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
