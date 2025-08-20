# Oaza Software - Modern Website

A professional website for a software company offering coding and marketing services, built with Next.js 14+, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **TypeScript**: Full type safety throughout the application
- **Next.js 14+**: Latest Next.js with App Router for optimal performance
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Framer Motion**: Smooth animations and transitions
- **Contact Form**: Functional contact form with API endpoint
- **SEO Optimized**: Proper metadata and semantic HTML

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── portfolio/         # Portfolio page
│   ├── contact/           # Contact page
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── common/           # Common components
├── lib/                  # Utility functions and types
└── styles/               # Additional styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd oaza-software
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js` under the `theme.extend.colors` section.

### Content
Update the content in the respective page components and sections to match your business needs.

### Styling
Modify the Tailwind classes and custom CSS in `src/app/globals.css` to adjust the visual appearance.

## 📱 Pages

- **Homepage**: Hero section, services overview, about, and contact
- **About**: Company information, mission, vision, values, and team
- **Services**: Detailed service offerings with pricing plans
- **Portfolio**: Showcase of completed projects
- **Contact**: Contact form and company information

## 🔧 API Endpoints

- `POST /api/contact` - Handle contact form submissions

## 📦 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
Build the project and deploy the `out` directory:
```bash
npm run build
npm run export
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please contact:
- Email: hello@oazasoftware.com
- Phone: +1 (555) 123-4567

---

Built with ❤️ by Oaza Software
