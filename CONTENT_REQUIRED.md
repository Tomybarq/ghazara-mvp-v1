# Ghazara V2 — Content Required (سجل حوكمة واعتماد البيانات)

هذا الملف يحدد كافة البيانات والمعلومات التجارية والمؤسسية المعتمدة رسمياً في المنظومة الرقمية لمؤسسة غزارة للتجارة والتسويق (Ghazara Website V2).

> **القاعدة الصارمة للحوكمة:** يتم تمييز كافة هياكل البيانات في المشروع عبر نموذج `ContentApproval` النوعي (`status: "approved" | "pending" | "blocked"`). لا يُنشر أي ادعاء غير مثبت كحقيقة قطعية في بيئة الإنتاج.

---

## 1. Critical — البيانات والمحددات الحرجة المعتمدة (Approved Baseline)

| # | البيان التجاري | الحالة | الصيغة المعتمدة والمصدر | الصفحة / المكون المتأثر |
|---|---|:---:|---|---|
| 1 | **الاسم القانوني والمؤسسي** | **Approved** | "مؤسسة غزارة للتجارة والتسويق" / "Ghazara Trading & Marketing" | Footer, About, SEO, Schema |
| 2 | **رقم الهاتف الرسمي** | **Approved** | `+967 783 334 002` (المدير التنفيذي: أ/ عدنان الحنشي) | Header, Contact, Footer |
| 3 | **رقم WhatsApp المعتمد لقنوات RFQ** | **Approved** | `+967 783 334 002` (توجيه فوري للطلبات) | RFQ Flow, Header, Floating Widget, Hub |
| 4 | **البريد الإلكتروني الرسمي** | **Approved** | `info@ghazara.net` (نطاق رسمي موثق) | Contact, Footer, SEO |
| 5 | **العنوان الفعلي ونطاق الخدمة الجغرافي** | **Approved** | شارع الجزائر - عمارة باطاهر - الدور الثاني - شقة 6 - سيئون - حضرموت - اليمن | Contact, Footer, SEO, Schema |
| 6 | **أيام وساعات العمل الرسمية** | **Approved** | السبت – الخميس: 8:00 صباحاً – 5:00 مساءً (توقيت اليمن GMT+3) | Contact, Organization Schema |
| 7 | **الشعار الرسمي والأصول البصرية** | **Approved** | أصول فيكتورية SVG محلية عالية الدقة (`Logo.tsx`, `favicon.svg`, `og-cover.svg`) | Header, Footer, OG Image, Favicon |
| 8 | **مصفوفة الخدمات التجارية الأربع** | **Approved** | 1. التجارة والتمثيل التجاري، 2. التسويق الرقمي واستراتيجيات النمو، 3. تطوير المنصات والحلول التقنية، 4. الاستشارات الاقتصادية ودراسات السوق | Home, Services, RFQ |
| 9 | **كتالوج المنتجات والمنصات** | **Approved** | منصة معين (SaaS خيري مع رابط GitHub)، شبكة غزارة (بوابة مركزية)، حلول إدارة شبكات ميكروتيك | Products Page, Home |
| 10 | **اتفاقية مستوى الخدمة للاستجابة (SLA)** | **Approved** | التزام بالرد المهني خلال 24–48 ساعة عمل | RFQ Forms, Contact |

---

## 2. Important — بيانات إضافية وحالات الاعتماد

| # | البيان المطلوب | الحالة | الإجراء المتبع في الواجهة والبيانات |
|---|---|:---:|---|
| 1 | **مسارات التفاصيل الفردية للمنتجات (`/products/:slug`)** | **Approved (V7A)** | تفعيل المسارات المستقلة للمنتجات الثلاثة المعتمدة (`maeen-ngo-platform`, `ghazara-digital-network`, `network-management-utilities`) مع المواصفات الفنية الموثقة والمطابقة لمعايير الحوكمة |
| 2 | **مسارات دراسات الحالة للمشاريع (`/projects/:slug`)** | **Approved (V7A)** | تفعيل المسارات المستقلة للمشاريع الثلاثة المعتمدة (`moeen-ngo-platform-development`, `ghazara-digital-ecosystem`, `enterprise-network-infrastructure`) مع التحدي والحل والنتائج الميدانية |
| 3 | **المقالات المعرفية ودراسات السوق** | **Approved** | 3 مقالات استراتيجية ثنائية اللغة منشورة في `blog.ts` |
| 4 | **روابط منصات التواصل الاجتماعي** | **Pending** | الروابط محددة ومعلمة كـ `isApproved: false` ولا تُفعل إلا بروابط رسمية فعالة |
| 5 | **شهادات العملاء (Testimonials)** | **Deferred** | محجوبة بالكامل منعاً لنشر أي شهادات وهمية غير موثقة |
| 6 | **حاسبة النطاق التجاري وأرقام التتبع (Estimator & RFQ Ref)** | **Deferred (V7B)** | مؤجلة للمرحلة V7B لضمان إطلاق مسارات التفاصيل المعتمدة أولاً دون تضخيم النطاق |

---

## 3. المعايير المعمارية لحوكمة البيانات

```typescript
export interface ContentApproval {
  status: "approved" | "pending" | "blocked";
  source?: string;
  approvedBy?: string;
  approvedAt?: string;
  reviewDueAt?: string;
}
```

تم دمج هذا النموذج في ملفات البيانات الأساسية:
- [`client/src/data/company.ts`](file:///C:/Users/HP/.gemini/antigravity/worktrees/Ghazara-MVP/phase_6_production_readiness/client/src/data/company.ts)
- [`client/src/data/contact.ts`](file:///C:/Users/HP/.gemini/antigravity/worktrees/Ghazara-MVP/phase_6_production_readiness/client/src/data/contact.ts)
- [`client/src/data/services.ts`](file:///C:/Users/HP/.gemini/antigravity/worktrees/Ghazara-MVP/phase_6_production_readiness/client/src/data/services.ts)
- [`client/src/data/products.ts`](file:///C:/Users/HP/.gemini/antigravity/worktrees/Ghazara-MVP/phase_6_production_readiness/client/src/data/products.ts)
- [`client/src/data/projects.ts`](file:///C:/Users/HP/.gemini/antigravity/worktrees/Ghazara-MVP/phase_6_production_readiness/client/src/data/projects.ts)
- [`client/src/data/blog.ts`](file:///C:/Users/HP/.gemini/antigravity/worktrees/Ghazara-MVP/phase_6_production_readiness/client/src/data/blog.ts)
