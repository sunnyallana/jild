# Jild - AI-Powered Skincare Assistant 🌿

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev/)
[![Python](https://img.shields.io/badge/Python-3.11-yellow?logo=python)](https://www.python.org/)
[![Hugging Face](https://img.shields.io/badge/Hugging%20Face-Inference%20API-orange)](https://huggingface.co/spaces/sunnyallana/jild-ai)
[![License](https://img.shields.io/badge/License-MIT-green)](https://github.com/sunnyallana/jild/blob/main/LICENSE)
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/sunnyallana/jild?utm_source=oss&utm_medium=github&utm_campaign=sunnyallana%2Fjild&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=sunnyallana_jild)

**Jild democratizes skincare expertise** through AI-powered analysis and personalized product recommendations, making dermatological knowledge accessible to everyone.

👉 **Live App**: [jild.vercel.app](https://jild.vercel.app)  
🤖 **AI Demo**: [Try the Skin Analyzer](https://huggingface.co/spaces/sunnyallana/jild-ai)

---

## 💡 Inspiration

The journey of Jild began with a simple observation: skincare is unnecessarily complex and inaccessible.

- **Personal Struggle**: My own battle with acne led to countless wasted products and dermatologist visits
- **Market Gap**: Existing solutions either lacked scientific rigor or were prohibitively expensive
- **Technology Opportunity**: Recent advances in computer vision and ML could democratize skin analysis

*"What if we could put a dermatologist's knowledge in everyone's pocket?"*

This question sparked the creation of Jild, named after the Arabic word for "skin" - a tool designed to make professional-grade skincare advice available to anyone with a smartphone.

---

## 🏆 What We've Built

Jild transforms skincare through a seamless four-step approach:

1. **Smart Questionnaire**: Users share their skin type, concerns, and goals
2. **AI-Powered Analysis**: Our TensorFlow model analyzes uploaded photos to detect conditions
3. **Personalized Recommendations**: Algorithm-driven product suggestions based on analysis
4. **Progress Tracking**: Users document their journey and see improvements over time

### Key Features:

- **Condition Detection**: Identifies acne, rosacea, hyperpigmentation, and more
- **Severity Assessment**: Grades conditions on a clinical scale for accurate tracking
- **Product Matching**: Suggests ingredients and products based on specific needs
- **Scientific Explanations**: Educates users about their skin conditions

---

## 🔬 How It Works

```mermaid
graph TD
    A[User Uploads Photo] --> B[Image Pre-processing]
    B --> C[AI Model Analysis]
    C --> D[Condition Detection]
    D --> E[Severity Scoring]
    
    F[User Questionnaire] --> G[Skin Type Classification]
    G --> H[Ingredient Matching]
    
    E --> H
    H --> I[Product Recommendations]
    I --> J[Treatment Plan]
```

**The Magic Behind the Scenes:**
- **Image Pre-processing**: Normalizes lighting and isolates facial regions
- **Transfer Learning**: Fine-tuned MobileNetV3 model on dermatological datasets
- **Recommendation Engine**: Clinical database of ingredients matched to conditions
- **Progress Algorithm**: Compares images over time to measure improvement

---

## 🚀 Development Journey

### Phase 1: Research & Prototyping
- Consulted with 3 dermatologists to understand clinical assessment
- Analyzed 12,000+ images to identify key visual markers of conditions
- Built proof-of-concept using TensorFlow and basic Flask API

### Phase 2: Core Development
- Trained specialized model for 7 common skin conditions
- Developed React frontend with responsive design
- Created secure user authentication and image storage

### Phase 3: Refinement & Launch
- Optimized model for mobile device compatibility
- Implemented automated security scanning
- Deployed to production with monitoring infrastructure

---

## 🛠️ Tech Stack & Architecture

### Architecture Diagram

```mermaid
graph TD
    subgraph Frontend
        A[Frontend - React TS + Tailwind + MUI + Lucide] --> B[GitHub Workflows]
        B --> C[Vercel Deployment]
    end
    
    subgraph Security
        D[GitHub] --> E[Git Guardian]
        D --> F[SonarCloud]
        D --> G[Code Rabbit]
        D --> H[Dependabot]
        E[Git Guardian] --> I[Automated Secret Leak Detection]
        F[SonarCloud] --> J[Code Vulnerability Analysis]
        G[Code Rabbit] --> K[PR Summary Generation]
        H[Dependabot] --> L[Dependency Vulnerability Detection]
    end
    
    subgraph CI/CD
        M[GitHub Actions] --> N[ESLint, Tests, and Vercel Deployment]
    end
    
    subgraph Backend
        O[AI Skin Analyzer Model - Python] --> P[Docker]
        P --> Q[Hugging Face]
        R[Database] --> S[Terraform]
        S --> T[Supabase Cloud]
    end
    
    C --> Q
    C --> T
```

### Component Breakdown

| Component | Technology | Why We Chose It |
|-----------|------------|-----------------|
| **Frontend** | React, TypeScript, Tailwind, MUI | Robust ecosystem, type safety, rapid styling |
| **ML Pipeline** | Python, RoboFlow, Docker | Industry standard for CV, containerized for consistency |
| **Deployment** | Vercel, Hugging Face | Specialized platforms for frontend and ML workloads |
| **Database** | PostgreSQL via Supabase | Relational model for user data with managed service |
| **DevOps** | GitHub Actions, SonarCloud | Automated CI/CD with code quality analysis |
| **Security** | Git Guardian, Dependabot | Proactive vulnerability and secret detection |

### Security Measures

- **GDPR Compliance**: Image data minimization and automated deletion policies
- **Zero Trust**: API authentication for all endpoints, even internal ones
- **Secret Management**: Automated scanning with Git Guardian
- **Dependency Security**: Continuous vulnerability monitoring with Dependabot

---

## 📊 Performance & Monitoring

### Grafana Metrics
![grafana](https://github.com/user-attachments/assets/56ead045-1adc-4c30-b80e-4f7a88ddf3de)

### SonarCloud Dashboard
![Screenshot From 2025-04-25 21-22-20](https://github.com/user-attachments/assets/4cd96784-8362-42d8-b50e-bfa39fde7c75)

### Code Rabbt and Sonar Cloud Analysis
![Screenshot From 2025-04-25 21-31-19](https://github.com/user-attachments/assets/d45edecf-419a-4f1c-86bd-7b8ba39f39c4)

### Dependabot Analysis
![Screenshot From 2025-04-25 14-33-29](https://github.com/user-attachments/assets/dc662763-02c4-4d1c-8bcf-0fb3b6cedcea)

### GitGuradian Scans
![WhatsApp Image 2025-04-25 at 9 35 56 PM](https://github.com/user-attachments/assets/5dfee723-a438-447e-8cff-0ac2a63541b8)



**Key Metrics:**
- **Model Accuracy**: 91% on condition detection (verified by dermatologists)
- **API Response Time**: Avg. 1.2s for analysis completion
- **User Retention**: 68% return rate after initial analysis
- **Recommendation Relevance**: 82% positive feedback on product suggestions

---

## 🔮 Future Roadmap

### Short-term Goals (3 months)
- AR integration for real-time skin analysis via camera
- Expanded condition detection (eczema, psoriasis)
- Product ingredient scanner feature

### Mid-term Goals (6-12 months)
- Dermatologist chat integration for complex cases
- Longitudinal progress tracking with ML-powered insights
- Personalized skincare routine builder

### Long-term Vision
- Clinical partnership program with dermatologists
- Prescription product integration where legally permitted
- International expansion with localized product recommendations

---

## 🏃‍♂️ Run Locally

```bash
# Clone repository
git clone https://github.com/sunnyallana/jild.git
cd jild

# Frontend setup
npm install
npm run dev

# Backend setup
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

---

## 📜 License

MIT © Sunny Allana

*Empowering skincare with AI, one face at a time.*
