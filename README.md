# مؤسسة غزارة للتجارة والتسويق | Ghazara Trading & Marketing

> **منصة أعمال رقمية متكاملة واحترافية** لتوفير حلول التجارة، التسويق الرقمي، والاستشارات الاستراتيجية بأعلى معايير الجودة والموثوقية.

---

## 🇸🇦 نظرة عامة على المشروع (Project Overview)

تعتبر **مؤسسة غزارة للتجارة والتسويق** كياناً تجارياً وخدمياً رابعاً للتميز في تقديم الخدمات التجارية وحلول التسويق الرقمي المتطورة. تم بناء هذه المنصة الرقمية وفق أحدث المعايير الهندسية والتصميمية لتكون واجهة احترافية تعكس قيم المؤسسة في الموثوقية، الاحترافية، والابتكار. تم تصميم الموقع ليدعم اللغة العربية (RTL) واللغة الإنجليزية بالكامل، مع التركيز على تجربة المستخدم (UX/UI)، سرعة الأداء، التوافق مع محركات البحث (SEO)، والتحويل التجاري (CRO).

The **Ghazara Trading & Marketing Platform** is an enterprise-grade digital web application built to showcase the institution's commercial services, digital marketing expertise, and strategic solutions. The platform adheres to rigorous design and engineering standards, featuring a fully responsive Arabic-first (RTL) and English architecture optimized for conversion, SEO, and accessibility.

---

## 🛠 التكنولوجيا والهندسة المعمارية (Tech Stack & Architecture)

تعتمد المنصة على حزمة برمجية حديثة وقوية (Full-Stack Type-Safe Stack) تضمن الأداء العالي والصيانة المستدامة:

| الطبقة (Layer) | التقنية المستخدمة (Technology) | الوصف والدور (Description & Role) |
| :--- | :--- | :--- |
| **الواجهة الأمامية (Frontend)** | React 19, Vite, Tailwind CSS 4 | بناء واجهات مستخدم تفاعلية، متجاوبة، وسريعة مع دعم كامل للغة العربية (RTL). |
| **الواجهة الخلفية (Backend)** | Node.js, Express 4, tRPC 11 | معالجة الطلبات البرمجية بضمانات أنواع البيانات (Type-Safety) الكاملة من الخادم إلى العميل. |
| **قواعد البيانات (Database)** | MySQL, Drizzle ORM | إدارة البيانات والعلاقات بأمان وكفاءة عالية مع توليد تلقيقات الترحيل (Migrations). |
| **المصادقة والأمان (Auth & Security)** | Manus OAuth, JWT | إدارة جلسات المستخدمين وصلاحيات الوصول بشكل آمن وموثوق. |
| **الاختبار والجودة (Testing & QA)** | Vitest | إجراء اختبارات الوحدة وضمان خلو الأنظمة من الأخطاء البرمجية. |

---

## 📂 هيكل المشروع (Directory Structure)

```text
ghazara-website/
├── client/                 # واجهة المستخدم الأمامية (React + Tailwind)
│   ├── src/
│   │   ├── components/     # المكونات المشتركة ومكونات UI
│   │   ├── pages/          # صفحات الموقع الرئيسية والفرعية
│   │   ├── App.tsx         # توجيه المسارات والمزودات
│   │   └── index.css       # الأنماط العامة وإعدادات التصميم
│   └── index.html          # ملف HTML الرئيسي
├── server/                 # الخادم والواجهة الخلفية (Node.js + tRPC)
│   ├── _core/              # البنية التحتية الأساسية للخادم والمصادقة
│   ├── db.ts               # مساعدات الاستعلام وقاعدة البيانات
│   ├── routers.ts          # عقود ومعالجات tRPC
│   └── index.ts            # نقطة بداية الخادم
├── drizzle/                # مخطط قاعدة البيانات وملفات الترحيل
├── shared/                 # الأنواع والثوابت المشتركة بين العميل والخادم
└── README.md               # توثيق المشروع (هذا الملف)
```

---

## 🚀 دليل التشغيل والتطوير المحلي (Local Development Guide)

للبدء في تشغيل المشروع محلياً، يرجى اتباع الخطوات البرمجية التالية:

1. **تثبيت الحزم المطلوبة:**
   ```bash
   pnpm install
   ```

2. **تشغيل خادم التطوير المحلي:**
   ```bash
   pnpm dev
   ```
   سيتم تشغيل الخادم المحلي على المنفذ المحدد وإتاحة المعاينة الفورية (Hot Module Replacement).

3. **تشغيل اختبارات الجودة (Vitest):**
   ```bash
   pnpm test
   ```

---

## 🌐 النشر والإنتاج (Deployment & Publishing)

تم إعداد المشروع ليدعم النشر التلقائي والمستمر عبر منصة **Manus** مع دعم التوسع التلقائي (Autoscale) وتكامل مستودع **GitHub** (`https://github.com/Tomybarq/ghazara-mvp-v1`). كل عملية حفظ ناجحة لنقاط التفتيش (`Checkpoint`) تؤدي إلى النشر الفوري للنسخة الإنتاجية.

---

## 📄 الترخيص (License)

هذا المشروع خاص بـ **مؤسسة غزارة للتجارة والتسويق**. جميع الحقوق محفوظة © 2026.
