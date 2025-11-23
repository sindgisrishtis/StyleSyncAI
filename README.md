**🎨 Fashion AI – Image Generator**
A sleek, modern AI-powered web application that generates high-quality fashion images from text prompts.
Built using Next.js, TailwindCSS, and a text-to-image AI API, this tool helps designers, students, and creators visualize fashion concepts instantly.

__🚀 Features__
✨ AI Image Generation
Converts text prompts into realistic or stylized fashion images
Supports multiple AI providers (Nebius/OpenAI/Gemini/StyleSync)
⚡ Modern Web App
Developed using Next.js 14+ (App Router)
Optimized for high performance and fast rendering
🎨 Beautiful UI
Styled entirely with TailwindCSS
Clean, responsive layout for desktop and mobile
🔐 Safe & Secure
API keys stored in .env (never exposed on the client)
📱 Fully Responsive Design
Works smoothly on all devices

__🛠️ Tech Stack__
Layer	            Technology
Framework	        Next.js 14+ (App Router)
Styling	            TailwindCSS
API	                Nebius / OpenAI / Gemini (any text-to-image model)
State Management	React Hooks
Package Manager	    npm

__📁 Project Structure__
StyleSyncAI/
│
├── app/
│   ├── page.jsx
│   ├── layout.jsx
│   ├── api/
│   │   └── generate/route.js
│
├── components/
│   ├── Navbar.jsx
│   ├── ImageCard.jsx
│
├── public/
│   └── assets (if any)
│
├── styles/
│   └── globals.css
│
├── .env.example
├── package.json
├── tailwind.config.js
└── README.md

__⚙️ Installation & Setup__
1️⃣ Clone the repository
git clone https://github.com/ujwalashet/StyleSyncAI.git
cd StyleSyncAI
2️⃣ Install dependencies
npm install
3️⃣ Add your API key
Create a .env file in the root:
NEBIUS_API_KEY=your_key_here
⚠️ Never share this key publicly
⚠️ Do NOT commit .env to GitHub
▶️ Run the development server
npm run dev
Open in browser:
👉 http://localhost:3000

__🤝 Contributing__
Contributions are welcome!
Steps:
Fork this repository
Create a feature branch
Commit changes
Open a pull request

**💬 Contact**
For issues, suggestions, or collaborations:
👤 Srishti S Sindgi 
📧 Email : sindgisrishti@gmail.com 
🔗 GitHub: https://github.com/sindgisrishtis

👤 Ujwala Shet 
📧 Email : ujwalashet389@gmail.com 
🔗 GitHub: https://github.com/ujwalashet