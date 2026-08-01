# 🧩 ChunkChunk — RAG Chunking Strategies Explorer

**A hands-on, visual playground for learning how RAG (Retrieval-Augmented Generation) chunking strategies actually work.**

🔗 Live demo: [chuckchunk-rag-chunking-explorer.ai.studio](https://chuckchunk-rag-chunking-explorer.ai.studio/)

---

## 📖 About

Most RAG tutorials mention chunking in a single sentence — *"split your text into chunks"* — and move on. Students are left understanding the concept but not the *mechanics*: why multiple strategies exist, how chunk size and overlap change the output, or what "semantic" or "hierarchical" chunking actually looks like in practice.

**ChunkChunk** solves this by letting you paste real text, pick a chunking strategy, and watch it run live — with the original text highlighted by chunk boundaries and a step-by-step explanation of every decision the algorithm made.

Built as a personal/educational project for students and self-learners studying RAG, NLP, and LLM engineering.

---

## ✨ Features

- **8 core chunking strategies**, each implemented with real logic (not mocked):
  1. Fixed-Size Chunking
  2. Recursive Character Text Splitting
  3. Sentence-Based Chunking
  4. Sliding Window (Overlapping) Chunking
  5. Semantic Chunking
  6. Document-Structure-Aware Chunking (Markdown/HTML)
  7. Hierarchical (Parent-Child) Chunking
  8. Agentic / LLM-Based (Propositional) Chunking
- **Plain-English explanations** for every strategy, shown before and after you run it
- **Step-by-step trace** of the algorithm's decisions for each generated output
- **Configurable parameters** — chunk size, overlap %, similarity threshold, optional query field
- **3 built-in sample texts** — Mixed Content, News Article, Technical Article — for one-click testing
- **Side-by-side view** — input text with chunk boundaries highlighted, output as numbered chunk cards
- **Zero setup required** for Semantic/Agentic strategies — falls back to non-LLM logic (TF-IDF similarity, rule-based propositions) when no API key is provided, and upgrades automatically if one is added
- **Minimal, distraction-free UI** in Times New Roman, built for focus and readability

---

## 🎯 Who It's For

- Students learning RAG, NLP, or LLM engineering
- Self-learners preparing for AI/ML engineering interviews
- Educators looking for a visual teaching aid for RAG/chunking concepts
- Anyone who wants to *see* chunking instead of just reading about it

---

## 🚀 How to Use

1. **Enter input** — paste your own text, or click one of the 3 sample buttons (Mixed / News / Article).
2. **Select a chunking strategy** — each option shows a short description before you commit.
3. **Configure parameters** — set chunk size, and (where relevant) overlap % or similarity threshold.
4. **Generate** — view the highlighted input on one side and the explained, numbered chunks on the other.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (React) + TypeScript + TailwindCSS
- **Backend:** Python (FastAPI)
- **Chunking logic:** `langchain-text-splitters`, `nltk`/`spacy` for sentence handling, TF-IDF cosine similarity as a no-API-key fallback for semantic chunking
- **Optional:** LLM API key (e.g. OpenAI) to unlock true embedding-based semantic chunking and agentic/propositional chunking

---

## 📦 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/chunkchunk.git
cd chunkchunk
```

### 2. Backend setup
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

### 4. (Optional) Enable LLM-powered strategies
Create a `.env` file in `/backend` with:
```
OPENAI_API_KEY=your_key_here
```
Without this, Semantic and Agentic chunking automatically run in fallback mode.

### 5. Open the app
Visit `http://localhost:3000` in your browser.

---

## 🧪 Running Tests

```bash
cd backend
pytest
```

Each of the 8 chunking strategies has unit tests verifying chunk counts and boundary behavior on fixed sample inputs.

---

## 📁 Project Structure

```
chunkchunk/
├── backend/
│   ├── strategies/
│   │   ├── fixed_size.py
│   │   ├── recursive.py
│   │   ├── sentence_based.py
│   │   ├── sliding_window.py
│   │   ├── semantic.py
│   │   ├── structure_aware.py
│   │   ├── hierarchical.py
│   │   └── agentic.py
│   ├── samples/          # 3 built-in sample texts
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── components/
│   ├── pages/
│   └── styles/
└── README.md
```

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome. Feel free to open an issue or submit a pull request.

---

## 📄 License

MIT License — free to use for learning, teaching, or building on top of.

---

## 🙌 Acknowledgements

Built as an educational project to make one of the most confusing parts of RAG click for students — the way I wish it had for me.
