# سجل المهام وخريطة التطوير | Ghazara V2 Development Roadmap

> وثيقة تتبع رسمية لمراحل بناء وتطوير المنظومة الرقمية لمؤسسة غزارة للتجارة والتسويق (Ghazara Website V2).

---

## 📊 حالة المراحل الحالية (Current Phase Status)

| المرحلة | الوصف | الحالة | ملاحظات الإنجاز |
| :--- | :--- | :---: | :--- |
| **Phase 0** | Content Truth & Approval | ✅ مكتمل | تطبيق مصفوفة الحوكمة `ContentApproval` وبيانات الاتصال المعتمدة في `CONTENT_REQUIRED.md` |
| **Phase 1** | Route Integrity & IA | ✅ مكتمل | ربط مسارات التنقل، فصل RFQ عن Contact، وتأسيس `navigation.ts` |
| **Phase 2** | Institutional Homepage | ✅ مكتمل | هيكلة الصفحة الرئيسية وفق نموذج (Clarity → Trust → Value → Proof → Action) |
| **Phase 3** | Brand & Favicon Polish | ✅ مكتمل | إبراز الشعار بالترويسة ببطاقة زجاجية عالية التباين، وأيقونة SVG متجاوبة |
| **Phase 4** | Performance & Caching | ✅ مكتمل | ضبط `QueryClient` الافتراضي، حماية الـ Mutations، ومنع الـ Refetch العنيف |
| **Phase 5** | Reliability & Test Hardening | ✅ مكتمل | 41 اختبار وحدة ناجح عبر 8 ملفات (tRPC, DB, Cookies, Navigation, RFQ) |
| **Phase 6** | Content Truth & Production Readiness | ✅ مكتمل | حوكمة البيانات، عقد النشر على Vercel، حماية RFQ، تحسين SEO ومراقبة التحويلات |
| **Phase 7A**| Approved Detail Content & Route Foundation | ✅ مكتمل | تفعيل مسارات التفاصيل `/products/:slug` و `/projects/:slug`، حمايات Slugs، و50 اختباراً ناجحاً |
| **Phase 7B**| Scope Discovery, Estimator & Lead Lifecycle | ⏳ مؤجل | حاسبة النطاق التجاري التفاعلية، الرموز المرجعية لطلبات RFQ، وتصنيف حالات العملاء |

---

## ✅ المهام المنجزة في المرحلة V7A (Completed Phase 7A Milestones)

### 1. نماذج بيانات التفاصيل وحلالات المسارات العامة (Detail Content Models & Resolvers)
- [x] ترقية نماذج المنتجات في `products.ts` لدعم `ProductDetail` و`capabilities` و`useCases` و`sectors` وحالة النشر `published`.
- [x] ترقية نماذج المشاريع في `projects.ts` لدعم `ProjectDetail` و`challenge` و`solution` و`outcomes` و`technologies`.
- [x] إنشاء دوال الحسم العامة الموثوقة `getPublishedProductBySlug` و`getPublishedProjectBySlug` و`getPublicProductSlugs` و`getPublicProjectSlugs`.
- [x] حجب وتجريد أي سجلات غير معتمدة أو غير منشورة ومنع ظهورها في المسارات العامة.

### 2. مسارات التفاصيل الفردية والتنقل السياقي (Dynamic Detail Routes & UX)
- [x] بناء صفحة تفاصيل المنتج `ProductDetailPage.tsx` متضمنة مسار التصفح `SiteBreadcrumb`، بطاقة الخصائص الفنية، القدرات التشغيلية، وأزرار التحويل السياقية.
- [x] بناء صفحة دراسة حالة المشروع `ProjectDetailPage.tsx` متضمنة التحدي التشغيلي، الحل الهندسي، نطاق التسليمات، والمخرجات المحققة.
- [x] تسجيل المسارات الديناميكية `/products/:slug` و `/projects/:slug` في موجه Wouter في `App.tsx` مع Lazy Loading.
- [x] ربط بطاقات المنتجات والمشاريع في صفحتي `ProductsPage.tsx` و `ProjectsPage.tsx` بمسارات التفاصيل مباشرة.
- [x] التحقق التلقائي من معلمات السياق (`?product=` و `?project=`) في `RFQForm.tsx` واعتمادها فقط من الكتالوج الموثق.

### 3. تعزيز البنية الميتادية والخرائط (SEO & Sitemap Expansion)
- [x] دعم `customCanonicalPath` في مكون `SEOHead.tsx` لضبط المسارات الكانونية للمنتجات والمشاريع المستقلة.
- [x] تحديث `sitemap.xml` بكافة عناوين URL العامة للمنتجات والمشاريع المعتمدة مع الروابط التبادلية ثنائية اللغة.
- [x] دعم البادئات الديناميكية للمنتجات والمشاريع في مصفوفة التنقل `getRouteByPath` في `navigation.ts`.

### 4. حزمة الاختبارات الشاملة (50 Tests Passing Across 9 Test Suites)
- [x] إنشاء `server/content-resolver.test.ts` واختبار سلامة الـ Slugs، الحسم المعتمد، وتصفية السجلات غير المنشورة.
- [x] تحديث `server/navigation.test.ts` لاختبار المسارات الديناميكية.
- [x] اجتياز كافة اختبارات Vitest بنجاح (50/50 اختباراً).
- [x] اجتياز فحص الأنواع الصارمة `pnpm check` بنجاح (0 أخطاء).
- [x] اجتياز البناء الإنتاجي `pnpm build` و `pnpm run build:vercel` بنجاح تام.

---

## 🛠 أوامر الفحص والتحقق (Verification Commands)

```bash
# 1. تشغيل كامل حزمة الاختبارات الآلية (50 اختباراً عبر 9 ملفات)
pnpm test

# 2. فحص الأنواع الصارمة في TypeScript
pnpm check

# 3. بناء نسخة الإنتاج المجمعة والمحسنة
pnpm build

# 4. بناء نسخة Vercel الإنتاجية
pnpm run build:vercel
```
