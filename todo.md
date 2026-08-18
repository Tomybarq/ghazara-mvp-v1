# سجل المهام وخريطة التطوير | Ghazara V2 Development Roadmap

> وثيقة تتبع رسمية لمراحل بناء وتطوير المنظومة الرقمية لمؤسسة غزارة للتجارة والتسويق (Ghazara Website V2).

---

## 📊 حالة المراحل الحالية (Current Phase Status)

| المرحلة | الوصف | الحالة | ملاحظات الإنجاز |
| :--- | :--- | :---: | :--- |
| **Phase 0** | Content Truth & Approval | 🟡 قيد المراجعة | اعتماد مصفوفة الادعاءات التجارية وبيانات الاتصال في `CONTENT_REQUIRED.md` |
| **Phase 1** | Route Integrity & IA | ✅ مكتمل | ربط مسارات التنقل، فصل RFQ عن Contact، وتأسيس `navigation.ts` |
| **Phase 2** | Institutional Homepage | ✅ مكتمل | هيكلة الصفحة الرئيسية وفق نموذج (Clarity → Trust → Value → Proof → Action) |
| **Phase 3** | Brand & Favicon Polish | ✅ مكتمل | إبراز الشعار بالترويسة ببطاقة زجاجية عالية التباين، وأيقونة SVG متجاوبة |
| **Phase 4** | Performance & Caching | ✅ مكتمل | ضبط `QueryClient` الافتراضي، حماية الـ Mutations، ومنع الـ Refetch العنيف |
| **Phase 5** | Reliability & Test Hardening | ✅ مكتمل | 40 اختبار وحدة ناجح عبر 8 ملفات (tRPC, DB, Cookies, Navigation, RFQ) |
| **Phase 6** | Release Operations & QA | 🔄 مستمر | ربط Vercel، التحقق من متغيرات البيئة، وربط قاعدة بيانات الإنتاج |

---

## ✅ المهام المنجزة (Completed Milestones)

### 1. معمارية المسارات والتنقل (Route & IA Integrity)
- [x] إنشاء سجل المسارات الموحد والنوعي في `client/src/data/navigation.ts`.
- [x] استخراج نموذج طلب عرض السعر الموحد `RFQForm.tsx` مع دعم المعلمات السياقية (`?service=`, `?product=`, `?sector=`, `?region=`).
- [x] فصل صفحة التواصل العام المؤسسي (`/contact`) عن مسار طلب عروض الأسعار المعتمد (`/request-quote`).
- [x] بناء صفحة 404 مخصصة متوافقة مع الهوية المؤسسية في `NotFound.tsx` مع علامة `noindex, nofollow`.
- [x] تحديث `Header.tsx` و`Footer.tsx` وربطها بالمسارات الحقيقية وحالات التفعيل ومؤشرات الوصول.

### 2. الهيكلة المؤسسية للصفحة الرئيسية (Homepage Architecture)
- [x] إعادة صياغة الـ Hero Section لتحديد القيمة المؤسسية ومسارات النمو مباشرة.
- [x] تضمين محدد النوايا ثلاثي المسارات (خدمات، منتجات، عروض أسعار).
- [x] إبراز القدرات التشغيلية الأربع والخدمات المنتجة ودليل حلول الـ SaaS الواقعية.
- [x] إدراج منهجية العمل المؤسسية رباعية الخطوات ونموذج التحويل المزدوج النهائي.

### 3. إبراز الهوية والشعار (Branding & Assets)
- [x] ترقية الشعار في الترويسة الأمامية وقائمة الجوال ببطاقة زجاجية متباينة (`client/src/components/ui/Logo.tsx`).
- [x] تصميم وضبط أيقونة الموقع الفيكتورية (`favicon.svg` و `logo-icon.svg`) بألوان Deep Iris و Honeyed Amber.
- [x] إزالة قيود التكبير غير الضرورية في `index.html` لتحقيق الامتثال لمعايير WCAG 1.4.4.

### 4. تحسين الأداء وإدارة الكاش (Performance & Query Caching)
- [x] ضبط إعدادات `QueryClient` الافتراضية في `client/src/main.tsx` (`staleTime: 5m`, `gcTime: 15m`).
- [x] إيقاف `refetchOnWindowFocus` لمنع تكرار الطلبات غير المبرر عند تبديل التبويبات.
- [x] فرض `retry: false` على كافة الـ Mutations لحماية نماذج طلبات الأسعار من التكرار العشوائي.
- [x] تخصيص استعلام `auth.me` بسياسة كاش ذكية مع تفريغ فوري عند تسجيل الخروج (`useAuth.ts`).

### 5. حزمة اختبارات الاعتمادية (Test Suite Expansion)
- [x] `server/navigation.test.ts` (5 اختبارات): التحقق من المسارات وسلامة الروابط وSSOT للاتصال.
- [x] `server/rfq.test.ts` (7 اختبارات): التحقق من صحة الإدخال، الحدود القصوى للأحرف، ومعالجة الأخطاء.
- [x] `server/auth.me.test.ts` (3 اختبارات): فحص حالات الزائر غير المسجل، المستخدم العادي، والمسؤول.
- [x] `server/auth.logout.test.ts` (3 اختبارات): فحص إتلاف الجلسات تحت HTTPS، HTTP، وx-forwarded-proto.
- [x] `server/cookies.test.ts` (5 اختبارات): التحقق الصارم من توابع إعدادات الكوكيز والأمان.
- [x] `server/system.test.ts` (8 اختبارات): فحص إجراءات `system.health` وصلاحيات `system.notifyOwner`.
- [x] `server/db.test.ts` (8 اختبارات): فحص دوال الوصول لقاعدة البيانات وعزلها أثناء الاختبارات.
- [x] `server/app.test.ts` (1 اختبار): فحص جسر Express على Vercel وجاهزية مسارات tRPC.

---

## 📋 المهام القادمة ومتطلبات الإطلاق (Pending Technical & Operational Tasks)

### أ. حوكمة المحتوى (Content Truth - P0)
- [ ] اعتماد الصيغة النهائية لمصفوفة الخدمات والمنتجات من الإدارة التنفيذية.
- [ ] اعتماد بيانات السجل التجاري والشروط القانونية وسياسة الخصوصية الرسمية.

### ب. تكامل الإنتاج وVercel (Production Operations - P0)
- [ ] ضبط متغيرات البيئة في Vercel Dashboard (`DATABASE_URL`, `JWT_SECRET`, إلخ).
- [ ] ربط قاعدة بيانات MySQL / TiDB سحابية متوافقة لضمان استمرارية حفظ طلبات الـ RFQ.

### ج. تحسينات تجربة المستخدم والوصول (UX & Accessibility - P1)
- [ ] مراجعة التباين اللوني وفق WCAG 2.2 AA لكافة النصوص على الخلفيات الملونة.
- [ ] اختبار التنقل الكامل عبر لوحة المفاتيح وقارئات الشاشة لكافة النماذج والقوائم.

---

## 🛠 أوامر الفحص والتحقق (Verification Commands)

```bash
# 1. تشغيل كامل حزمة الاختبارات الآلية (40 اختباراً)
pnpm test

# 2. فحص الأنواع الصارمة في TypeScript
pnpm check

# 3. بناء نسخة الإنتاج المجمعة والمحسنة
pnpm build

# 4. بناء نسخة Vercel الإنتاجية
pnpm run build:vercel
```
