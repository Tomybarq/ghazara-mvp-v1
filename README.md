# مؤسسة غزارة للتجارة والتسويق | Ghazara Trading & Marketing (V2)

> **منظومة رقمية مؤسسية وتجارية متكاملة** لتقديم خدمات وحلول التجارة، التسويق الرقمي، تمثيل الشركات، وتطوير المنصات الرقمية بمعايير هندسية وأمنية احترافية (Production-Ready).

---

## 🏛 الهوية المؤسسية وبيانات الاتصال المعتمدة (Approved Corporate Identity)

| البيان / Field | التفاصيل بالعربية (Arabic) | Details in English |
| :--- | :--- | :--- |
| **اسم المنشأة / Organization** | مؤسسة غزارة للتجارة والتسويق | Ghazara Trading & Marketing Establishment |
| **المدير التنفيذي / Executive Director** | **أ/ عدنان الحنشي** | **Adnan Al-Hanashi** |
| **الهاتف والواتساب المباشر / Phone & WhatsApp** | `+967 783 334 002` | `+967 783 334 002` |
| **البريد الإلكتروني الرسمي / Official Email** | `info@ghazara.net` | `info@ghazara.net` |
| **المقر الرئيسي / Headquarters** | شارع الجزائر - عمارة باطاهر - الدور الثاني - شقة 6 - سيئون - حضرموت - اليمن | Al-Jazair St., Ba-Taher Bldg., 2nd Floor, Apt 6, Seiyun, Hadramout, Yemen |
| **أوقات العمل الرسمية / Working Hours** | السبت – الخميس: 8:00 صباحاً – 5:00 مساءً (توقيت اليمن GMT+3) | Sat – Thu: 8:00 AM – 5:00 PM (GMT+3) |

---

## 🗺 خريطة المسارات والصفحات (Application Routes & Architecture)

| المسار / Route | الصفحة / Page | الغرض والوظيفة / Purpose & Capabilities |
| :--- | :--- | :--- |
| `/` | **الرئيسية (Home)** | الواجهة الشاملة: الرؤية، محاور النمو، الخدمات الأساسية، مؤشرات الأداء، وشبكة الوصول. |
| `/about` | **عن غزارة (About)** | الهيكل المؤسسي، القيادة التنفيذية، رسالة ورؤية المؤسسة، وضمانات الجودة. |
| `/services` | **الخدمات (Services)** | دليل الخدمات التفصيلي، القيمة المضافة، والمشاكل التي نعالجها مع إمكانية طلب عرض سعر مباشر. |
| `/products` | **المنتجات (Products)** | كتالوج المنصات والأنظمة السحابية مع فلاتر التصنيفات (SaaS، البوابات، الشبكات) وبحث فوري. |
| `/projects` | **المشاريع (Projects)** | سجل الإنجازات ودراسات الحالة مع فلاتر القطاعات وروابط المنصات الحية. |
| `/blog` | **المدونة والرؤى (Blog)** | مقالات تحليلية ورؤى استراتيجية في التجارة والتقنية مع فلاتر المواضيع والبحث الحي. |
| `/contact` | **اتصل بنا (Contact)** | قنوات التواصل الرسمية، الخريطة التوضيحية، نموذج المراسلة المؤسسي، ورابط WhatsApp المباشر. |
| `/request-quote` | **طلب عرض سعر (RFQ)** | مسار التحويل المزدوج الذكي: تسجيل الطلب في قاعدة البيانات + تجهيز رسالة WhatsApp فورية للإدارة. |
| `/hub` | **بوابة الوصول السريع (Bio Hub)** | بطاقة التعريف الرقمية الموحدة للمعارض ووسائل التواصل الاجتماعي. |

---

## 🛠 البنية الهندسية والتقنيات (Engineering & Tech Stack)

- **Frontend:** React 19, TypeScript, Vite 7, Tailwind CSS 4, Wouter Routing.
- **State & Data Fetching:** TanStack Query, tRPC Client v11, Centralized Bilingual `LanguageProvider`.
- **Backend:** Node.js, Express 4, tRPC Server v11 (Type-Safe Procedures).
- **Database & ORM:** MySQL 8 / TiDB, Drizzle ORM.
- **Performance & Code Splitting:** Dynamic `React.lazy` chunks + Vite `manualChunks` (`vendor-react`, `vendor-query`, `vendor-ui`).
- **SEO & Schema.org:** Dynamic `<SEOHead />` with JSON-LD graph (`Organization`, `LocalBusiness`, `WebSite`, `WebPage`), `robots.txt`, and `sitemap.xml`.
- **Accessibility & UX:** WCAG 2.2 AA compliant, full keyboard navigation, `aria-required`, and high-contrast tokens.

---

## 🚀 التشغيل والفحص والاختبار (Commands & Operations)

```bash
# 1. تثبيت الاعتماديات
pnpm install

# 2. فحص الأنواع الصارمة في TypeScript
pnpm check

# 3. تشغيل حزمة الاختبارات الآلية (Vitest)
pnpm test

# 4. بناء نسخة الإنتاج المجمعة والمحسنة
pnpm build

# 5. تشغيل بيئة التطوير المحلية
pnpm dev
```

---

## 🛡 معايير الأمان وحماية البيانات (Security & Reliability)

1. **التحقق الصارم من المدخلات (Strict Zod Validation):** كافة طلبات الـ RFQ تمر بمخططات تحقق تلزم حدود الأحرف وتجري تنظيف وتقليم الفراغات.
2. **عدم اختلاق البيانات (Zero Hallucination):** جميع بيانات التواصل والخدمات موثقة ومركزية في ملفات البيانات (`data/contact.ts`, `data/services.ts`, `data/products.ts`).
3. **التحويل المزدوج المرن (Dual Conversion Resilience):** في حال حدوث أي بطء بالشبكة، يتاح للمستخدم إتمام طلبه فوراً عبر WhatsApp للإدارة دون فقدان البيانات.

---

## 📄 حقوق الملكية (License)

جميع الحقوق محفوظة © 2026 **مؤسسة غزارة للتجارة والتسويق**.
