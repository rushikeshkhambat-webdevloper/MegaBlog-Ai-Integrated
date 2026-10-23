# 🚀 MegaBlog - AI-Integrated Blogging Platform

![MegaBlog Banner](https://img.shields.io/badge/MegaBlog-AI%20Powered-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Appwrite](https://img.shields.io/badge/Appwrite-BaaS-pink?style=flat-square&logo=appwrite)
![Groq](https://img.shields.io/badge/Groq-AI-orange?style=flat-square)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)

**Live Demo:** [https://megablog-one.vercel.app/](https://megablog-one.vercel.app/)

## 📖 Overview
**MegaBlog** is a modern, full-stack blogging platform that combines the power of **React** and **Appwrite** with next-generation **AI capabilities**. Built as a capstone project, it goes beyond a standard CRUD app by integrating **Groq's LLaMA 3** model to assist writers, summarize content, and provide a context-aware chatbot for readers.

## ✨ Key Features

### 📝 Core Blogging
- **User Authentication:** Secure Signup, Login, and Session Management via Appwrite.
- **CRUD Operations:** Create, Read, Update, and Delete blog posts seamlessly.
- **Rich Text Editor:** Professional writing experience using TinyMCE.
- **Image Uploads:** Fast and secure image storage using Appwrite Storage.

### 🤖 AI-Powered Tools (Powered by Groq & LLaMA 3)
- **✨ AI Content Writer:** Stuck on writer's block? Generate a full, formatted draft just by typing a title. The AI streams the content in real-time.
- **📄 Auto-Summarization:** Automatically generates a 2-3 sentence summary for every post.
- **🏷️ Auto-Tagging:** AI extracts the most relevant tags from your content.
- **💬 Context-Aware Chatbot:** A built-in floating assistant that reads your blog posts and answers user questions based *only* on your content.

### 📱 UI/UX
- **Fully Responsive:** Mobile-first design using Tailwind CSS.
- **Modern Editorial Design:** Clean, distraction-free reading experience (inspired by Medium and Hashnode).
- **Real-time Feedback:** AI streaming shows content generating live, keeping the user engaged.

---

## 🛠️ Tech Stack

**Frontend:**
- [React.js](https://reactjs.org/) (Vite)
- [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [Redux Toolkit](https://redux-toolkit.js.org/) (State Management)
- [React Router](https://reactrouter.com/) (Navigation)
- [TinyMCE](https://www.tiny.cloud/) (Rich Text Editor)

**Backend & Database (BaaS):**
- [Appwrite](https://appwrite.io/) (Auth, Database, Storage, Permissions)

**Artificial Intelligence:**
- [Groq API](https://groq.com/) (LLaMA 3.3 70B model for ultra-fast inference)

**Deployment:**
- [Vercel](https://vercel.com/) (Frontend Hosting)

---

## 🚀 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/rushikeshkhambat-webdevloper/MegaBlog-Ai-Integrated.git
cd MegaBlog-Ai-Integrated
