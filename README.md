# Sangharsha - AI-Powered Career Platform

**"From Sangharsha to Success"**

Built by **Swarajya Labs** | Guided by **Saarthi AI**

## 🎯 Overview

Sangharsha is a comprehensive career platform that helps job seekers transform their career journey with AI-powered tools:

- **Resume Analysis**: Get instant ATS scores, keyword analysis, and improvement suggestions
- **Job Matching**: Smart AI-powered job recommendations based on your profile
- **Saarthi AI Guide**: 24/7 AI career coach for personalized guidance
- **Resume Enhancement**: Actionable recommendations to improve your resume
- **Job Tracking**: Track applications and manage your job search

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: NextAuth.js with credentials & Google OAuth
- **Database**: MongoDB
- **UI Components**: Radix UI primitives
- **Form Management**: React Hook Form + Zod
- **Notifications**: Sonner

## 📁 Project Structure

```
/app
├── app/
│   ├── page.js                          # Landing page
│   ├── layout.js                        # Root layout
│   ├── globals.css                      # Global styles
│   ├── login/page.js                    # Login page
│   ├── signup/page.js                   # Signup page
│   ├── dashboard/page.js                # Main dashboard
│   ├── onboarding/page.js              # Onboarding flow
│   ├── resume/
│   │   ├── upload/page.js              # Resume upload
│   │   └── analysis/[id]/page.js       # Resume analysis
│   ├── jobs/
│   │   ├── page.js                     # Job listings
│   │   └── [jobId]/page.js             # Job details
│   ├── settings/page.js                 # User settings
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/route.js  # NextAuth config
│       │   └── register/route.js       # User registration
│       └── [[...path]]/route.js        # Other API routes
├── components/
│   ├── ui/                             # shadcn/ui components
│   ├── layout/
│   │   ├── Navbar.js                   # Navigation bar
│   │   └── Footer.js                   # Footer
│   ├── chat/
│   │   └── ChatPanel.js                # Saarthi chat UI
│   └── Providers.js                    # Session provider
└── lib/
    ├── mockData.js                     # Mock data for demo
    └── utils.js                         # Utility functions
```

## 🚀 Features

### ✅ Implemented (UI-Ready)

1. **Landing Page**
   - Hero section with gradient design
   - Feature showcase
   - How it works section
   - Testimonials
   - CTA sections

2. **Authentication**
   - Email/Password login
   - Email/Password signup
   - Google OAuth (configured, needs client ID)
   - Session management with NextAuth

3. **Dashboard**
   - Resume score overview
   - Job match statistics
   - Quick actions
   - Resume checklist
   - Job recommendations
   - Floating Saarthi chat button

4. **Resume Upload & Analysis**
   - Drag & drop file upload
   - File validation (PDF, DOCX, TXT)
   - Resume analysis results page
   - ATS score display
   - Keyword analysis (present vs missing)
   - Improvement suggestions
   - Resume checklist

5. **Job Matching**
   - Job listings with search & filters
   - AI match percentage display
   - Job details page
   - Skills matching
   - Quick apply options

6. **Saarthi Chat**
   - Floating chat panel
   - Message history
   - Quick action buttons
   - Minimize/maximize functionality

7. **Settings**
   - Profile management
   - Connected platforms (LinkedIn, Naukri)
   - Notification preferences
   - Privacy settings

8. **Onboarding Flow**
   - 4-step wizard
   - Resume upload
   - Analysis summary
   - Job preferences
   - Welcome completion

## 🎨 Design System

### Colors
- **Primary**: Orange gradient (#FF6B00 → #FF9A00)
- **Background**: HSL-based color tokens
- **Dark mode**: Fully supported

### Typography
- **Font**: Inter
- **Headings**: Bold with gradient text option
- **Body**: Regular weight

### Spacing
- Base: 8px multiples
- Padding/Margin: Consistent spacing scale

### Border Radius
- Cards/Buttons: 12px
- Inputs: 8px
- Icons: Rounded

## 🔐 Authentication Setup

Currently configured with:
- **Credentials Provider**: Email/Password
- **Google Provider**: Placeholder credentials (needs real client ID/secret)

To enable Google OAuth:
1. Get Google OAuth credentials from Google Cloud Console
2. Update `.env`:
   ```
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

## 💾 Database

MongoDB collections:
- `users`: User accounts and profiles
- Ready for additional collections:
  - `resumes`: Resume data and analysis
  - `jobs`: Job listings
  - `applications`: Application tracking

## 🔮 Future Enhancements (AI Integration Phase)

When ready to add AI features:

1. **Resume Analysis AI**
   - Integrate LLM for resume parsing
   - ATS score calculation algorithm
   - Keyword extraction and matching
   - Improvement suggestion generation

2. **Job Matching AI**
   - Semantic job-profile matching
   - Skill similarity scoring
   - Experience level matching

3. **Saarthi Chat AI**
   - Integrate conversational AI
   - Career guidance responses
   - Interview preparation
   - Application assistance

4. **Auto-Apply Agent**
   - Application form filling automation
   - Cover letter generation
   - Application tracking

## 🧪 Mock Data

Current mock data includes:
- 6 sample jobs (various roles and companies)
- 1 sample user profile
- 1 sample resume analysis
- 3 testimonials
- Chat message history

## 🎯 Getting Started

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Set up environment variables** (already configured in `.env`):
   ```
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=sangharsha
   NEXTAUTH_URL=https://sangharsha-app.preview.emergentagent.com
   NEXTAUTH_SECRET=your-secret-key
   ```

3. **Run the development server**:
   ```bash
   yarn dev
   ```

4. **Access the application**:
   - Landing: https://sangharsha-app.preview.emergentagent.com
   - Sign up and explore!

## 📝 Default Test Account

You can register a new account or use the signup flow. All authentication is functional.

## 🎨 Customization

### Brand Colors
Edit `app/globals.css` and `tailwind.config.js` to customize:
- Primary color (orange gradient)
- Secondary colors
- Dark mode variants

### Mock Data
Edit `lib/mockData.js` to customize:
- Sample jobs
- User profile data
- Testimonials
- Resume analysis data

## 🐛 Known Limitations

1. Resume upload is simulated (files not actually processed)
2. AI responses are placeholder text
3. Google OAuth needs real credentials
4. Job data is static mock data
5. Application tracking not yet implemented

## 🚧 Next Steps

1. **Backend API Development**
   - Resume file processing
   - Job data management
   - Application tracking

2. **AI Integration**
   - Connect LLM for resume analysis
   - Implement job matching algorithm
   - Integrate conversational AI for Saarthi

3. **External Integrations**
   - LinkedIn API for profile import
   - Naukri.com API for job listings
   - Email service for notifications

4. **Advanced Features**
   - Cover letter generation
   - Interview preparation
   - Salary negotiation guidance
   - Career path recommendations

## 📄 License

Built by Swarajya Labs - All rights reserved.

## 🙏 Credits

- **Design System**: shadcn/ui
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS

---

**Sangharsha** - Transforming career struggles into success stories! 🚀
