# 🧠 Thynk Analyzer - CV Analysis and AI-Powered Job Recommendation System

This project is a web application that allows users to create their CVs, analyze them using artificial intelligence, and receive personalized job recommendations, apply to job postings and get tailored advice based on the analysis.

## 🚀 Features

- 📄 CV creation & template selection

- 📥 CV download (.pdf)

- 🧠 AI-powered CV analysis (Hugging Face API)

- 💼 Job posting recommendations (AI-driven matching)

- 🔐 User authentication (Supabase)

- ☁️ File storage (Supabase Storage)

- 👥 Two user types: Job Seeker & Employer

- 📱 Responsive UI (React + TypeScript)

## 🛠️ Techonologies Used

| Layer         | Technology            |
|----------------|----------------------|
| Frontend       | React, TypeScript    |
| UI Framework   | HTML, CSS, JS (JSX/TSX) |
| Backend        | Supabase (veritabanı + auth + storage) |
| AI / NLP       | Hugging Face Transformers API |
| Deployment     | Vercel / Netlify (recommended) |

## 🧩 System Architecture

Users interact with the frontend interface, which sends requests to Supabase's Auth API and database. CV analysis is performed via the Hugging Face API.

## 👥 Developers

- 👩‍💻 Esma Yıldırım [github](https://github.com/frauvate)
- 👩‍💻 Büşra Demir [github](https://github.com/busrademirrr)
- 🤖 Code generation supported by [bolt.new](https://bolt.new) AI coding assistant

## 🔧 Installation

1. Clone this repository 
  ```bash
  git clone https://github.com/frauvate/thynk-analyzer.git
  ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   - Create a .env file
   - Add your Supabase and Hugging Face API keys
