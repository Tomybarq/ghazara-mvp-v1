# Ghazara Website V2 — Full Transformation Changelog

## الإصدار V2.0.0 (Production-Ready Release)
**تاريخ الإطلاق:** 16 أغسطس 2026  
**الهدف:** ترقية تطبيق غزارة من نموذج تجريبي (MVP) إلى منظومة مؤسسية وتجارية قابلة للتوسع بمستوى إنتاجي عالي.

---

### المرحلة 0: تدقيق خط الأساس واستقرار البيئة (Phase 0: Baseline Audit)
- تدقيق المسارات، الثوابت، والتكوينات الأساسية.
- توثيق الفجوات الحالية في ملف [`V2_BASELINE_AUDIT.md`](./V2_BASELINE_AUDIT.md).
- فحص سلامة بناء المشروع واختبارات الـ Vitest.

---

### المرحلة 1: حوكمة المحتوى والأصول البصرية (Phase 1: Content Governance & Brand Assets)
- إنشاء ملف [`CONTENT_REQUIRED.md`](./CONTENT_REQUIRED.md) لإدارة الهوية والبيانات المطلوبة وتصنيف الحقول المعتمدة.
- توليد أيقونات وشعارات SVG مؤسسية عالية الدقة وخفيفة الوزن في مجلد `client/public/branding/` (`ghazara-mark.svg`, `ghazara-symbol.svg`, `ghazara-lockup-dark.svg`, `ghazara-lockup-light.svg`).
- اعتماد وتثبيت بيانات القيادة المعتمدة: **أ/ عدنان الحنشي** (المدير التنفيذي)، ورقم الهاتف المعتمد `+967 783 334 002`، والعنوان الرسمي في سيئون، حضرموت، اليمن.

---

### المرحلة 2: محرك التدويل الموحد والاتجاهية والتنقل (Phase 2: Central i18n, RTL/LTR & Navigation)
- إنشاء مزود التدويل المركزي [`LanguageContext.tsx`](./client/src/contexts/LanguageContext.tsx) لمزامنة اللغة والاتجاه (`rtl` / `ltr`) تلقائياً مع الـ `localStorage` وسمات وسم `<html>`.
- تحويل التنقل في الترويسة [`Header.tsx`](./client/src/components/Header.tsx) والتذييل [`Footer.tsx`](./client/src/components/Footer.tsx) من روابط الـ Hash إلى مسارات صفحات حقيقية في Wouter (`/`, `/about`, `/services`, `/products`, `/projects`, `/blog`, `/contact`, `/request-quote`, `/hub`).
- إنشاء صفحة مستقلة لطلب عروض الأسعار [`RequestQuotePage.tsx`](./client/src/pages/RequestQuotePage.tsx) وتحديث زر الواتساب العائم [`FloatingWhatsAppWidget.tsx`](./client/src/components/FloatingWhatsAppWidget.tsx).

---

### المرحلة 3: البنية التحتية لتحسين محركات البحث والبيانات المنظمة (Phase 3: Technical SEO & Metadata)
- إنشاء ملف [`client/public/robots.txt`](./client/public/robots.txt) لتوجيه محركات البحث والسماح بفهرسة كافة المسارات المعتمدة.
- إنشاء خريطة الموقع المحدثة [`client/public/sitemap.xml`](./client/public/sitemap.xml) بروابط Canonical ووسوم `hreflang` التبادلية (`ar`, `en`, `x-default`).
- بناء مكوّن الـ SEO الديناميكي [`SEOHead.tsx`](./client/src/components/seo/SEOHead.tsx) وتضمين بيانات Schema.org JSON-LD المهيكلة لمؤسسة غزارة وموقعها في سيئون، حضرموت.

---

### المرحلة 4: معمارية الصفحات والكتالوجات التفاعلية (Phase 4: Routing & Page Architecture)
- إضافة مكوّن [`ScrollToTop.tsx`](./client/src/components/ScrollToTop.tsx) لتصفير التمرير تلقائياً عند تغيير المسار.
- إنشاء المكوّن الشجري المتجاوب [`SiteBreadcrumb.tsx`](./client/src/components/ui/SiteBreadcrumb.tsx) لكافة الصفحات الداخلية مع الحفاظ على عناصر shadcn UI.
- ترقية صفحات المنتجات والمشاريع والمدونة بفلاتر تفاعلية فورية ومربعات بحث ذكية ومحاذاة اتجاهية كاملة.

---

### المرحلة 5: معمارية التحويل المزدوج ونموذج عروض الأسعار (Phase 5: RFQ & Dual Conversion)
- ترقية مسار الـ tRPC `rfq.submit` بمخططات Zod الصارمة وتقليم الفراغات وتحديد أطوال الحقول.
- تفعيل التحويل المزدوج: حفظ في قاعدة البيانات المؤسسية + فتح محادثة WhatsApp مهيكلة ومنسقة موجهة للمدير التنفيذي.
- توفير آلية العمل غير المتصل (Offline Resilience) لضمان عدم ضياع أي عميل حتى في حال وجود بطء في الاتصال.
- كتابة 5 سيناريوهات اختبار آلية شاملة في [`server/rfq.test.ts`](./server/rfq.test.ts).

---

### المرحلة 6: تحسين الأداء وتجزئة الحزم (Phase 6: Performance & Code Splitting)
- تفعيل التحميل الكسول `React.lazy()` و`<Suspense>` في [`App.tsx`](./client/src/App.tsx) لكافة المسارات الثانوية.
- ضبط إعدادات Rollup في [`vite.config.ts`](./vite.config.ts) عبر `manualChunks` لتوليد 14 حزمة Chunks مستقلة ومثالية.
- تقليص حجم الحزمة الرئيسية من 588 kB إلى 137 kB والتخلص التام من أي تحذيرات بناء.

---

### المرحلة 7: فحص الوصولية والتجاوب البصري (Phase 7: Accessibility & Responsive QA)
- التوافق مع معايير الوصولية العالمية WCAG 2.2 AA عبر ربط حقول الإدخال بمعرفات صريحة `id` و`<label htmlFor="...">` وتفعيل `aria-required="true"`.
- إبراز مؤشرات التركيز `focus-visible:ring-2` لدعم التنقل بلوحة المفاتيح.
- ضبط محاذاة حقول البحث والأيقونات ديناميكياً مع الاتجاهين العربي والإنجليزي.

---

### المرحلة 8: الفحص الفني الختامي والجاهزية للإنتاج (Phase 8: Final QA & Handover)
- نجاح كامل لجميع فحوصات TypeScript (`pnpm check`: 0 أخطاء).
- نجاح كامل لكافة الاختبارات الآلية (`pnpm test`: 7/7 اختبارات ناجحة).
- بناء إنتاجي نظيف وسريع (`pnpm build`: تم بنجاح).
- تحديث شامل لدليل المشروع [`README.md`](./README.md) وملف التوثيق الفني [`walkthrough.md`](./walkthrough.md).
