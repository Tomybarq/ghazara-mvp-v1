# Ghazara Website V2 — Antigravity Command & Prompt Pack

## حزمة الأوامر والمطالبات الاحترافية لتطوير موقع مؤسسة غزارة للتجارة والتسويق

**الإصدار:** V2 Planning & Execution Pack  
**اللغة:** العربية أولًا مع المصطلحات التقنية بالإنجليزية، ثم مرجع إنجليزي مختصر  
**الهدف:** تحويل مشروع Ghazara V1 إلى أساس مؤسسي وتجاري Production-ready قابل للتوسع، دون اختلاق معلومات أو إفساد الوظائف الحالية.

---

## 1. Executive Summary

المشروع الحالي هو تطبيق Full-Stack مبني على React 19 وVite وTailwind CSS وNode.js/Express وtRPC وDrizzle وMySQL/TiDB، ويحتوي على صفحات رئيسية مثل `/`, `/about`, `/products`, `/services`, `/projects`, `/blog`, `/contact` و`/hub`، إضافة إلى مسار RFQ يحفظ الطلب ثم يفتح WhatsApp. [1] [2]

أهم قيمة يجب أن يضيفها V2 ليست إعادة تصميم تجميلية، بل **تحويل الموقع إلى Digital Business Platform Foundation** أكثر وضوحًا وثقة وقابلية للتحويل. ويبدأ ذلك بإصلاح الأساسات التي كشفها تحليل Antigravity: غياب `robots.txt` و`sitemap.xml`، ضعف إدارة Metadata وOpenGraph وSchema.org، عدم تفعيل `LanguageProvider` على مستوى التطبيق، اعتماد بعض التنقلات على Homepage anchors فقط، تحميل الصفحات ضمن حزمة أولية كبيرة، والاعتماد على أصول شعار خارجية. [1]

توجد كذلك نقطة محتوى حساسة: المشروع الحالي يعرض بيانات اتصال عامة مثل `+967 700 000 000`، بينما تشير ملاحظة Phase 2 إلى رقم WhatsApp مختلف هو `+967 784 984 528`. لا يجوز اختيار أي رقم أو نشره قبل اعتماد المعلومة من صاحب المؤسسة. [3] [4]

> **قاعدة V2 المركزية:** لا تغيّر ما هو عامل دون قياس، ولا تنشر معلومة تجارية غير موثقة، ولا تضف ميزة لا تخدم الوضوح أو الثقة أو التحويل أو قابلية التوسع.

---

## 2. طريقة استخدام هذه الحزمة

نفّذ المطالبات بالترتيب، مطالبة واحدة في كل مرة. بعد كل مرحلة اطلب من Antigravity أن يعرض: الملفات المعدلة، ما تم تغييره، ما لم يتم تغييره، نتائج الاختبارات، المخاطر المتبقية، وقرارًا واضحًا حول الجاهزية للانتقال إلى المرحلة التالية.

لا تسمح بتنفيذ مراحل متعددة دفعة واحدة قبل مراجعة ناتج المرحلة السابقة. أنشئ Checkpoint بعد كل مرحلة مستقرة، ولا تدمج تغييرات كبيرة إذا كان `pnpm check` أو `pnpm test` أو `pnpm build` يفشل.

الأوامر المتاحة في المشروع المرجعي هي:

```bash
pnpm install
pnpm dev
pnpm check
pnpm test
pnpm build
pnpm run build:vercel
pnpm format
```

ابدأ دائمًا من نسخة عمل معزولة أو Branch/Checkpoint واضح، ثم تحقق من حالة المستودع قبل التعديل:

```bash
git status --short
git branch --show-current
```

---

## 3. Baseline معتمد قبل التطوير

| المجال | ما هو مؤكد من التحليل | القرار المطلوب في V2 |
|---|---|---|
| الهدف التجاري | بناء الثقة، توليد Leads، دعم RFQ وWhatsApp، والاستعداد للتوسع | المحافظة على مسار Clarity → Trust → Value → Proof → Action |
| اللغات | العربية والإنجليزية موجودتان، لكن إدارة اللغة ليست مركزية بالكامل | اعتماد `LanguageProvider` واحد يضبط `lang` و`dir` وواجهة الترجمة |
| الهوية | الشعار ثنائي اللغة، والخطان هما IBM Plex Sans Arabic وTajawal | تثبيت الأصول محليًا واعتماد Design Tokens موحدة |
| الألوان | Deep Iris `#5E3B95`، Honeyed Amber `#E6833E`، Amethyst Purple `#8A4E91`، ودرجة Amber إضافية `#F19844` | اختبار التباين، ثم استخدام لونين Brand أساسيين مع ألوان Semantic |
| الصفحات | Home, About, Products, Services, Projects, Blog, Contact, Hub | إضافة `/request-quote`، وإنشاء صفحات التفاصيل فقط إذا كان المحتوى متوفرًا |
| RFQ | تدفق متعدد الخطوات يحفظ نسخة عبر `trpc.rfq.submit` ثم يفتح WhatsApp | توحيد RFQ في مكوّن/تدفق قابل لإعادة الاستخدام مع حالات Loading/Error/Success |
| SEO | Health Index المقدر 71/100 مع فجوات في الفهرسة وMetadata وSchema والأداء | تنفيذ Technical SEO قبل التوسع في المحتوى |
| المحتوى | توجد نصوص وبيانات ثنائية اللغة، وبعض القيم تبدو Placeholder أو غير معتمدة | إنشاء `CONTENT_REQUIRED.md` وعدم نشر القيم غير المعتمدة |
| الاختبارات | المشروع يحتوي على Vitest ويمتلك أوامر `check`, `test`, `build` | عدم اعتبار أي مرحلة مكتملة دون نتائج ناجحة أو تفسير موثق للفشل |

### تمييز درجة اليقين

**حقائق مؤكدة:** بنية المشروع الحالية، المسارات الحالية، أوامر `package.json`، وجود RFQ، وألوان وخطوط دليل الهوية.  
**استنتاجات عمل:** المؤسسة تستهدف B2B والعملاء والشركاء في اليمن والخليج والشرق الأوسط، وأن الخدمات تشمل التجارة والتسويق والحلول الرقمية والاستشارات. يجب اعتماد هذه الاستنتاجات من صاحب المؤسسة قبل استخدامها كClaims نهائية.  
**بيانات غير معتمدة:** أرقام الهاتف، SLA مثل “خلال 24 ساعة”، أعداد العملاء أو سنوات الخبرة، الشركاء، الشهادات، النتائج، الموقع الدقيق، وأي Testimonials أو Case Studies غير موثقة.

---

## 4. Master Prompt — المطالبة الرئيسية

انسخ النص التالي إلى Antigravity قبل بدء تنفيذ V2:

```text
أنت تعمل كفريق Senior Product Designer وUX/UI Designer وBrand Designer وFrontend Engineer وFull-Stack Architect وArabic RTL Specialist وSEO/CRO Specialist وAccessibility/Performance Engineer وTechnical QA Engineer.

مهمتك تطوير الإصدار V2 من موقع مؤسسة غزارة للتجارة والتسويق، انطلاقًا من المشروع الحالي الموجود في المستودع، وليس إنشاء Demo أو Template جديد. حافظ على الوظائف الحالية التي تعمل، خصوصًا تدفق RFQ وحفظ الطلب وفتح WhatsApp، ثم حسّنها تدريجيًا بطريقة قابلة للاختبار والتراجع.

المبدأ التجاري الإجباري هو:
Clarity → Trust → Value → Proof → Action

والأولوية الإجباريّة هي:
Business Value → UX → Trust → Conversion → Accessibility → Performance → SEO → Visual Polish → Advanced Effects

قبل كتابة أي كود:
1. افحص بنية المستودع والملفات الحالية والـ routes والـ components والـ data models والاختبارات.
2. اقرأ `README.md` وملفات todo ودليل الهوية وتعليمات المشروع إن كانت متاحة.
3. أنشئ تقرير Baseline يذكر ما هو موجود، وما هو ناقص، وما هو خطر، وما هو Placeholder.
4. لا تفترض وجود معلومات تجارية صحيحة لمجرد أنها مكتوبة في `content.ts` أو أي ملف آخر.
5. إذا كانت المعلومة غير موثقة، أنشئ أو حدّث `CONTENT_REQUIRED.md` بدل اختلاقها.

قواعد غير قابلة للتفاوض:
- العربية هي اللغة الأساسية والواجهة RTL-first، مع دعم English/LTR من دون إعادة بناء الواجهة.
- يجب أن يكون `LanguageProvider` مركزيًا على مستوى التطبيق، وأن يضبط `html[lang]` و`html[dir]` ويحفظ الاختيار بأمان.
- افصل Content/Data عن UI، واستخدم typed bilingual models قابلة للتحول لاحقًا إلى CMS.
- لا تضع منتجات أو خدمات أو عملاء أو أرقامًا أو شهادات أو Testimonials وهمية.
- لا تعرض بيانات اتصال غير معتمدة، وميّز Placeholder بوضوح في المحتوى الداخلي.
- لا تضف Dependencies جديدة إلا بعد تبريرها، ولا تستخدم API keys أو secrets في Frontend.
- استخدم أصول الشعار محليًا، مع الحفاظ على clear space والحد الأدنى للحجم.
- طبّق Semantic HTML وWCAG basics وKeyboard navigation وFocus states وAlt text وForm labels.
- أضف Metadata وCanonical وOpenGraph وTwitter/X Cards وSchema.org الصحيح فقط.
- طبّق Lazy loading وCode splitting وImage optimization دون التضحية بالتجربة.
- لا تستخدم Animations مستمرة أو Gradients عشوائية أو صورًا عامة بلا غرض.
- لا تعدّل Backend contract أو Database schema إلا بعد فحص أثر التغيير وإضافة اختبارات مناسبة.

المسارات المستهدفة:
`/`, `/about`, `/products`, `/services`, `/projects`, `/blog`, `/contact`, `/request-quote`, مع الحفاظ على `/hub` إذا كان له استخدام فعلي.

بعد كل مرحلة، أخرج تقريرًا يتضمن:
- Summary of changes.
- Files changed and why.
- Tests/build commands executed and exact results.
- Accessibility, RTL, SEO, and responsive checks.
- Unresolved risks and content dependencies.
- Go/No-Go recommendation for the next phase.

لا تعتبر V2 مكتملًا حتى تعمل جميع الصفحات والروابط والنماذج، ويختفي أي Build/TypeScript/Console error، وتنجح الاختبارات، وتصبح Metadata وSEO وRTL وResponsive behavior قابلة للتحقق.
```

---

## 5. Phase Prompts — المطالبات التنفيذية المرحلية

### Phase 0 — Discovery, Safety & Baseline Audit

**الهدف:** فهم V1 قبل لمس الكود.

```text
نفّذ مرحلة Discovery فقط، ولا تغيّر كود الإنتاج إلا إذا كان ذلك ضروريًا لإنشاء تقرير أو ملف توثيق.

افحص:
- App routing وproviders وlanguage/theme contexts.
- جميع الصفحات الحالية والمكونات المشتركة.
- `client/src/data` و`client/src/types` و`shared` و`server` و`drizzle`.
- RFQModal وContactPage وserver `rfq.submit`.
- `index.html` و`client/public` وVite/Vercel configuration.
- الاختبارات وscripts في `package.json`.

أنشئ `V2_BASELINE_AUDIT.md` يحتوي على جدول: الملف، الوضع الحالي، المشكلة، الأثر التجاري، أولوية الإصلاح، وطريقة التحقق.

صنّف النتائج إلى:
A) Must Fix Before Release.
B) Should Fix in V2.
C) Future Enhancement.

تحقق بشكل خاص من وجود تعارض بين بيانات الاتصال الحالية وملاحظة Phase 2 التي تحتوي على رقم WhatsApp مختلف. لا تختر أي قيمة.
شغّل `pnpm check` و`pnpm test` و`pnpm build` وسجّل النتائج دون إخفاء أي فشل.
```

**معيار القبول:** تقرير واضح، لا تعديلات سلوكية غير مبررة، وجرد فعلي للـ routes والمحتوى والاختبارات.

---

### Phase 1 — Content Truth, Brand Assets & Design System

**الهدف:** تثبيت الأساس البصري والمحتوى الصادق.

```text
نفّذ Brand and Content Foundation للإصدار V2.

أولًا أنشئ أو حدّث `CONTENT_REQUIRED.md` وصنّف البيانات الناقصة إلى Critical وImportant وOptional. أدرج على الأقل: الاسم القانوني المعتمد، الهاتف، WhatsApp، البريد، العنوان، ساعات العمل، روابط التواصل الاجتماعي، الخدمات المعتمدة، فئات المنتجات، المشاريع المسموح نشرها، العملاء أو القطاعات المسموح ذكرها، الشهادات، الصور، وSLA الاستجابة.

ثانيًا افصل المحتوى عن الواجهة عبر نماذج typed ثنائية اللغة، مثل:
- `company.ts`
- `navigation.ts`
- `services.ts`
- `products.ts`
- `projects.ts`
- `blog.ts`
- `contact.ts`
- `seo.ts`

ثالثًا طبّق Design Tokens متوافقة مع دليل الهوية:
- Deep Iris `#5E3B95`.
- Honeyed Amber `#E6833E`.
- Amethyst Purple `#8A4E91`.
- IBM Plex Sans Arabic كخط رئيسي.
- Tajawal كخيار نصي ثانوي بعد اختبار readability.
- نظام spacing: 4/8/12/16/24/32/48/64/96.

رابعًا انقل الشعار إلى أصول محلية SVG/WebP داخل مسار منظم، ولا تستخدم روابط `/manus-storage/...` للهوية الأساسية. حافظ على clear space والحد الأدنى للعرض.

لا تنشر أي رقم أو claim أو testimonial غير معتمد. استخدم Placeholder داخليًا بوسم واضح ولا تعرضه للجمهور كحقيقة.
```

**معيار القبول:** مصدر بيانات واضح، هوية محلية، Tokens موحدة، وملف `CONTENT_REQUIRED.md` يحدد كل اعتماد مطلوب قبل الإطلاق.

---

### Phase 2 — Central i18n, RTL/LTR & Navigation Architecture

**الهدف:** إزالة حالة اللغة المحلية والتناقض بين الصفحات.

```text
أعد بناء إدارة اللغة والتنقل دون تغيير المحتوى التجاري غير المعتمد.

1. لف التطبيق كاملًا داخل `LanguageProvider` في `App.tsx` أو أقرب طبقة Provider صحيحة.
2. اجعل اللغة `ar` افتراضيًا، واحفظ الاختيار في localStorage مع fallback آمن.
3. حدّث `document.documentElement.lang` و`dir` فورًا عند التغيير.
4. استبدل page-local `useState` للغة بـ `useLanguage`.
5. استخدم translation keys أو bilingual typed content بدل تمرير نصوص عربية/إنجليزية عشوائية داخل المكونات.
6. افصل navigation model عن Header/Footer، واجعل الروابط الداخلية Routes حقيقية بدل تحويل كل شيء إلى Homepage anchors.
7. اجعل الأسهم والأيقونات والمسافات والـ breadcrumbs واعية بالاتجاه.
8. تحقق من عدم حدوث hydration أو flash أو layout shift عند تغيير اللغة.

اختبر على كل route باللغة العربية والإنجليزية، وعلى mobile menu، وعلى reload، وعلى direct URL.
```

**معيار القبول:** تغيير اللغة من مكان واحد ينعكس على التطبيق كله، و`/about` و`/services` وغيرها تفتح كصفحات مستقلة من Header وFooter، مع RTL/LTR صحيحين.

---

### Phase 3 — Technical SEO & Metadata Foundation

**الهدف:** رفع الأساس التقني قبل التوسع بالمحتوى.

```text
نفّذ Technical SEO V2 على مستوى التطبيق والصفحات.

أنشئ بنية reusable مثل:
- `PageHead` أو equivalent لإدارة title/description/canonical/robots.
- `seo.ts` لتخزين metadata الثنائية اللغة لكل route.
- `schema.ts` لبناء JSON-LD آمن وقابل لإعادة الاستخدام.

أضف:
1. `client/public/robots.txt`.
2. `client/public/sitemap.xml` يتضمن routes الفعلية فقط، مع hostname/config واضح لا يخترع domain بديلًا.
3. `lang` و`dir` و`canonical` لكل صفحة.
4. OpenGraph وTwitter/X Cards، مع OG image محلية أو Placeholder واضح لا يُعلن كصورة نهائية.
5. `Organization` و`WebSite` و`BreadcrumbList` فقط عندما تكون البيانات صحيحة.
6. `Product` و`Service` و`Article` فقط في الصفحات التي تملك محتوى حقيقيًا ومطابقًا للـ Schema.
7. Headings hierarchy صحيحة، و`main` و`nav` و`footer` و`article` دلالية.

لا تضف `LocalBusiness` أو address أو opening hours إذا لم يتم اعتمادها. لا تستخدم keyword stuffing.

تحقق من HTML الناتج، عدم تكرار titles، سلامة JSON-LD، ووجود links قابلة للزحف.
```

**معيار القبول:** كل route عام له Metadata مناسبة، ملفات الفهرسة موجودة، Schema صحيح ومحدود، ولا توجد بيانات مختلقة.

---

### Phase 4 — Routing, Page Architecture & CMS-Ready Data

**الهدف:** تحويل V1 إلى بنية صفحات قابلة للتوسع.

```text
أعد تنظيم صفحات V2 من دون إعادة كتابة عشوائية.

أنشئ أو حسّن:
- Layout مؤسسي مشترك.
- `Container`, `SectionHeader`, `Button`, `Breadcrumb`, `EmptyState`, `ErrorState`, `LoadingState`.
- `ProductCard`, `ServiceCard`, `ProjectCard`, `ArticleCard`.
- صفحات `/about`, `/products`, `/services`, `/projects`, `/blog`, `/contact`, `/request-quote`.

افصل البيانات عن UI باستخدام IDs وlocalized fields وslug وSEO fields وstatus وmedia references. اجعل النموذج قابلًا للتحول لاحقًا إلى CMS أو API من دون إعادة بناء Cards.

أضف صفحات التفاصيل (`/products/:slug`, `/blog/:slug`, `/projects/:slug`) فقط إذا توفرت بيانات حقيقية. إذا لم تتوفر، أنشئ architecture أو route-safe placeholder غير قابل للفهرسة بدل نشر محتوى عام أو وهمي.

احفظ `/hub` فقط إذا كان له هدف تجاري واضح، ووثّق علاقته بتدفق RFQ.
```

**معيار القبول:** لا توجد بيانات تجارية داخل JSX إلا في حالات العرض المحدودة، والمكونات قابلة لإعادة الاستخدام، والصفحات لا تعتمد على copy/paste.

---

### Phase 5 — RFQ, Contact & Conversion Architecture

**الهدف:** بناء Lead Generation flow موثوق وغير مزعج.

```text
طوّر RFQ وContact كمسارين متكاملين، مع الحفاظ على `trpc.rfq.submit` ما لم تثبت الحاجة لتغييره.

المطلوب:
1. إنشاء route واضح `/request-quote`، مع إمكانية فتحه من Header وHero وProduct/Service CTA.
2. توحيد منطق RFQ بين الصفحة و`RFQModal` بدل تكرار validation والحقول والنصوص.
3. دعم حقول ضرورية فقط، مثل الاسم ووسيلة التواصل واحتياج العميل، مع الحقول التجارية الإضافية بعد اعتمادها.
4. إضافة validation client/server عبر Zod، وlabels صريحة، وerror states وsuccess state وloading state وnetwork fallback.
5. دعم WhatsApp prefilled message منظم وآمن، لكن لا تضع رقم WhatsApp غير معتمد.
6. منع الإرسال المكرر، وإظهار نتيجة حفظ الطلب بوضوح.
7. إضافة spam protection مناسبة دون جمع بيانات غير لازمة.
8. لا تعرض وعدًا مثل “سنرد خلال 24 ساعة” إلا بعد اعتماد SLA.
9. جهّز event names مستقبلية مثل `whatsapp_click`, `phone_click`, `rfq_start`, `rfq_submit`, `rfq_success`, `rfq_error` من خلال abstraction خفيف، دون ربط Analytics فعلي إذا لم يُطلب.

اختبر المسار من Product CTA وService CTA وContact page وmobile.
```

**معيار القبول:** RFQ يعمل من صفحة مستقلة ومن السياقات المناسبة، ويحافظ على البيانات والـ validation، ولا يحتوي على أرقام أو وعود غير معتمدة.

---

### Phase 6 — Performance, Code Splitting & Assets

**الهدف:** معالجة حزمة JavaScript والأصول دون تدهور UX.

```text
نفّذ Performance Pass قابلًا للقياس.

1. طبّق `React.lazy` و`Suspense` على الصفحات الثقيلة مع Loading fallback دلالي.
2. لا تجعل Home أو Critical CSS ينتظران بيانات غير ضرورية.
3. حسّن الصور إلى WebP/AVIF عند ملاءمة ذلك، وحدد width/height لمنع layout shift، واستخدم lazy loading خارج viewport.
4. حمّل الخطوط بطريقة لا تمنع الرسم الأول، مع `font-display: swap`، ولا تضف preload إلا للموارد الحرجة المؤكدة.
5. راجع Framer Motion وأي animation: أبقِ ما يخدم UX فقط، واحترم `prefers-reduced-motion`.
6. راجع dependencies والـ bundle، ولا تضف مكتبات جديدة لتحل مشكلة يمكن حلها بالموجود.
7. حافظ على الأداء في Arabic RTL وEnglish LTR وفي الوضعين الفاتح والداكن إن كانا مدعومين.

شغّل `pnpm build` وقارن حجم build قبل/بعد، وسجّل المقارنة. لا تذكر هدفًا رقميًا نهائيًا إلا إذا تم قياسه فعليًا.
```

**معيار القبول:** نجاح build، انخفاض الحزمة الحرجة أو تحسن loading قابل للقياس، وعدم وجود Layout Shift أو صور مكسورة أو fallback مزعج.

---

### Phase 7 — Accessibility, Responsive & Visual QA

**الهدف:** ضمان جودة Arabic RTL على الشاشات الحقيقية.

```text
نفّذ QA بصريًا ووظيفيًا على widths التالية:
320, 375, 390, 414, 768, 1024, 1280, 1440, 1920px.

راجع:
- RTL وLTR في كل route.
- Header وmobile menu وfocus trap إن وجد.
- Keyboard navigation وvisible focus.
- Contrast للألوان Deep Iris/Honeyed Amber/Amethyst Purple في light/dark.
- Semantic headings وlandmarks.
- Alt text للصور والشعار.
- labels وerrors وaria attributes للنماذج.
- عدم وجود horizontal scroll أو text overflow أو CTA غير قابل للنقر.
- `prefers-reduced-motion` وzoom/accessibility، وعدم تقييد `maximum-scale`.

أخرج `V2_QA_MATRIX.md` في جدول يذكر route، viewport، اللغة، الحالة، الملاحظة، والإجراء التصحيحي.
```

**معيار القبول:** لا توجد مشاكل حرجة في mobile أو RTL أو keyboard أو forms، وكل ملاحظة لها حالة واضحة.

---

### Phase 8 — Final Technical QA & Production Readiness

**الهدف:** تثبيت V2 قبل النشر.

```text
نفّذ Production Readiness Review نهائيًا.

شغّل:
- `pnpm check`
- `pnpm test`
- `pnpm build`
- `pnpm run build:vercel`

راجع يدويًا:
- كل route مباشرًا من URL.
- كل Header/Footer link.
- language switch بعد reload.
- RFQ happy path وvalidation وserver failure path.
- WhatsApp/phone/email links بعد اعتماد البيانات.
- robots/sitemap/metadata/canonical/JSON-LD.
- console errors وnetwork failures وbroken imports.
- عدم وجود secrets أو tokens أو fake claims في ملفات العميل.

أنشئ `V2_RELEASE_REPORT.md` يتضمن:
1. Scope delivered.
2. Tests and exact results.
3. Known limitations.
4. Content still required.
5. Security and deployment notes.
6. Rollback/checkpoint reference.
7. Final Go/No-Go decision.

لا تعلن الجاهزية إذا فشل اختبار جوهري أو بقيت بيانات Critical غير معتمدة.
```

**معيار القبول:** تقرير Release واضح، كل الاختبارات الأساسية ناجحة، والمخاطر المتبقية معلنة، وقرار النشر مبني على أدلة.

---

## 6. أوامر تشخيص وإصلاح جاهزة

### فحص سريع قبل أي تعديل

```bash
find client/src -maxdepth 3 -type f | sort
find client/public -maxdepth 3 -type f | sort
pnpm check
pnpm test
```

### فحص خاص بالترجمة والتنقل

```bash
grep -R "useState.*language\|useState.*lang\|document.documentElement" client/src -n
rg "href=|<Link|Route path=" client/src
```

### فحص خاص بالـ SEO والأصول

```bash
find client/public -maxdepth 3 -type f \( -name 'robots.txt' -o -name 'sitemap.xml' -o -iname '*logo*' -o -iname '*og*' \) -print
rg "og:title|og:description|canonical|application/ld\+json|Organization|Product|Article" client -n
rg "manus-storage|700 000 000|784 984 528|24 ساعة|24 hours" client server shared -n
```

### فحص ما قبل التسليم

```bash
pnpm check && pnpm test && pnpm build && pnpm run build:vercel
```

> إذا فشل أمر، لا تنتقل إلى المرحلة التالية. اعرض سبب الفشل والملف المتأثر والإصلاح المقترح، ثم أعد تشغيل الأمر بعد الإصلاح.

---

## 7. Prompt مستقل لتدقيق المحتوى قبل الإطلاق

```text
دقّق كل النصوص والبيانات الظاهرة للمستخدم في V2 باعتبارك Content Governance Reviewer.

أنشئ جدولًا يضم: النص/البيان، الصفحة، اللغة، نوعه، مصدره، درجة الثقة، هل يحتاج اعتمادًا، والإجراء.

اعتبر الأرقام، أعداد العملاء، سنوات الخبرة، النتائج، الشعارات، أسماء الشركاء، الشهادات، الموقع، الهاتف، البريد، ساعات العمل، SLA، وTestimonials بيانات حساسة تجاريًا.

لا تحسّن الصياغة بطريقة تجعل Placeholder يبدو حقيقة. إذا لم يوجد مصدر مؤكد، استبدل العنصر بـ empty state مهني أو أخفِه حتى وصول الاعتماد.

راجع العربية والإنجليزية من حيث المعنى لا الترجمة الحرفية فقط، واحفظ التناسق في المصطلحات: تجارة، تمثيل تجاري، تسويق رقمي، حلول رقمية، استشارات، طلب عرض سعر، وWhatsApp.
```

---

## 8. Prompt مستقل لتحسين الصفحة الرئيسية

```text
أعد تصميم Homepage V2 اعتمادًا على رحلة:
Clarity → Trust → Value → Proof → Action.

رتّب الصفحة منطقيًا:
1. Hero يشرح من هي غزارة وماذا تقدم، مع CTA أساسي وCTA ثانوي.
2. Trust layer لا يعرض أرقامًا غير معتمدة.
3. About مختصر يشرح القيمة والمنهج.
4. Services مبنية على المشكلة والقيمة، لا على أوصاف عامة.
5. Products/Platforms فقط من مصدر بيانات معتمد.
6. Why Ghazara دون Claims غير مثبتة.
7. Projects/Proof فقط عندما توجد أعمال قابلة للنشر.
8. CTA نهائي يوجه إلى Contact أو Request Quote.

اجعل المحتوى مختصرًا ومحددًا، والمكونات reusable، والبيانات خارج JSX. لا تستخدم صورة Stock عامة أو animation مستمرة. طبّق Arabic RTL أولًا ثم تحقق من English LTR.
```

---

## 9. Prompt مستقل لـ SEO Content Expansion

```text
خطط لتوسعة محتوى SEO دون نشر صفحات فارغة أو محتوى مولد عام.

أنشئ Keyword-to-Page Map ثنائي اللغة يربط كل موضوع بصفحة ذات قيمة فعلية، مع Search Intent وTitle وMeta Description وH1 وInternal Links وSchema المناسب.

ابدأ بالكلمات المرتبطة مباشرة بالنشاط المعتمد، مثل التجارة والتمثيل التجاري والتسويق الرقمي والحلول الرقمية وسلاسل التوريد، لكن لا تضف “اليمن” أو “الخليج” أو “الشرق الأوسط” كادعاء خدمة إلا بعد اعتماد النطاق الجغرافي.

لا تنشئ `/blog/:slug` أو `/products/:slug` للفهرسة إلا إذا كان لكل صفحة محتوى أصلي، عنوان واضح، وصف، صورة مرخصة، author/date عند الحاجة، وCTA منطقي.
```

---

## 10. Prompt مستقل للمراجعة الأمنية

```text
راجع V2 كـ Production Security Reviewer.

افحص:
- Zod validation على الخادم والعميل.
- Input length limits وnormalization.
- XSS عبر النصوص والـ URLs والـ WhatsApp message.
- CSRF considerations في mutations والنماذج.
- عدم تسريب secrets أو environment variables إلى bundle.
- عدم فتح روابط خارجية غير موثوقة من مدخلات المستخدم.
- معالجة أخطاء API دون كشف تفاصيل داخلية.
- Rate limiting أو spam mitigation إن كان مدعومًا في البنية الحالية.
- سلامة رفع attachments إن تم تنفيذه؛ لا تضفه دون متطلبات واضحة.

أنشئ تقريرًا يصنف المخاطر إلى Critical/High/Medium/Low مع الملف، الدليل، الإصلاح، وطريقة التحقق.
```

---

## 11. CONTENT_REQUIRED.md — قالب البيانات التي يجب اعتمادها

استخدم هذا القالب داخل المستودع، ولا تطلق Production قبل إغلاق عناصر Critical:

```md
# Ghazara V2 — Content Required

## Critical — مطلوب قبل الإطلاق

| البيانات | سبب الحاجة | الصفحة/المكون | الصيغة المطلوبة | الحالة |
|---|---|---|---|---|
| الاسم القانوني المعتمد | Organization/Legal identity | Footer, SEO, About | نص عربي وإنجليزي | Pending |
| رقم الهاتف الرسمي | Contact conversion | Header, Contact | E.164 | Pending |
| رقم WhatsApp الرسمي | RFQ/CTA | Header, RFQ, Footer | E.164 | Pending |
| البريد الرسمي | Contact conversion | Contact, Footer | Email | Pending |
| العنوان الفعلي أو نطاق الخدمة | Contact/SEO/Schema | Contact, Organization | عنوان معتمد | Pending |
| ساعات العمل | Contact/Schema | Contact | أيام وساعات | Pending |
| الشعار النهائي والأصول | Brand consistency | Header, Footer, OG | SVG/WebP | Pending |
| الخدمات المعتمدة | Core offering | Home, Services | قائمة ثنائية اللغة | Pending |
| فئات المنتجات المعتمدة | Catalog truth | Products | بيانات typed | Pending |
| نطاق التوريد/الخدمة | Geographic accuracy | Home, About, SEO | نطاق موثق | Pending |

## Important — يفضل إضافته

| البيانات | سبب الحاجة | الصفحة |
|---|---|---|
| المشاريع المسموح بنشرها | Proof وCase Studies | Projects |
| أسماء العملاء أو القطاعات المسموح ذكرها | Trust | Projects/About |
| نتائج قابلة للقياس مع مصدرها | Credible proof | Projects |
| SLA للاستجابة | Conversion expectation | RFQ/Contact |
| روابط Social Media الرسمية | Trust وdistribution | Header/Footer |
| النص الإنجليزي المعتمد | International UX | All pages |
| صور المنتجات/المشاريع المرخصة | Visual proof | Products/Projects |

## Optional — يمكن إضافته لاحقًا

| البيانات | القيمة المستقبلية |
|---|---|
| Testimonials موثقة | Social proof |
| FAQs معتمدة | SEO وsupport |
| Partner logos بموافقة | Trust |
| Blog author profiles | E-E-A-T |
| Privacy Policy وTerms النهائية | Legal readiness |
```

---

## 12. Definition of Done لـ V2

لا تُعتبر النسخة جاهزة إلا إذا تحققت الشروط التالية:

| المجال | الشرط |
|---|---|
| Business | يفهم الزائر هوية غزارة وقيمتها والـ CTA التالي خلال ثوانٍ |
| UX | كل صفحة تجيب: أين أنا؟ ماذا تقدم المؤسسة؟ لماذا أثق؟ ماذا أفعل الآن؟ |
| RTL/i18n | العربية تعمل RTL والإنجليزية LTR من Provider مركزي وبعد reload |
| Navigation | الروابط الداخلية تصل إلى routes الصحيحة، لا إلى anchors مكسورة |
| Content | لا توجد Fake stats أو Fake testimonials أو بيانات اتصال غير معتمدة |
| RFQ | النموذج يعمل مع validation وloading/success/error وحماية من التكرار |
| SEO | Metadata وCanonical وOpenGraph وRobots وSitemap وSchema الصحيحة مكتملة |
| Performance | build ناجح، code splitting حيث يلزم، صور وخطوط محسنة، ولا يوجد layout shift حرج |
| Accessibility | semantic HTML، labels، focus، contrast، keyboard، zoom، reduced motion |
| QA | `pnpm check`, `pnpm test`, `pnpm build`, و`pnpm run build:vercel` ناجحة |
| Scalability | المحتوى منفصل عن UI والمكونات قابلة لإعادة الاستخدام وCMS-ready |
| Production | لا توجد Console errors أو broken routes أو exposed secrets |

> **قاعدة الإطلاق:** إذا بقيت بيانات Critical في `CONTENT_REQUIRED.md` غير معتمدة، فالنتيجة هي **No-Go مع جاهزية تقنية جزئية**، وليست “مكتملة”.

---

## 13. English Master Prompt — Reference Version

```text
Develop Ghazara Trading & Marketing Website V2 from the existing repository. Do not rebuild a generic demo or template. Preserve working behavior, especially the RFQ flow, server validation, persistence, and WhatsApp handoff, then improve the system through small, testable, reversible phases.

Use the product principle: Clarity → Trust → Value → Proof → Action.
Use this priority order: Business Value → UX → Trust → Conversion → Accessibility → Performance → SEO → Visual Polish → Advanced Effects.

Audit the repository before coding. Read the README, todo files, project instructions, brand assets, routes, providers, content models, RFQ components, server routers, database schema, and tests. Create a baseline report and identify placeholders and unverified business facts.

Arabic is the primary language and the UI must be RTL-first. English/LTR must be supported through one central language provider, not page-local language state. Separate content/data from UI with typed bilingual models that are CMS-ready. Do not invent statistics, testimonials, clients, certificates, products, services, locations, phone numbers, SLAs, or case-study results.

Implement, in order: content and brand foundation; central i18n and navigation; technical SEO; reusable page architecture; RFQ/contact conversion flow; performance and code splitting; accessibility and responsive QA; final production readiness.

Add only valid SEO signals: page metadata, canonical URLs, robots.txt, sitemap.xml, OpenGraph/Twitter cards, and contextually correct Schema.org. Keep secrets server-side. Avoid unnecessary dependencies, excessive animation, generic stock imagery, and template-like UI.

After every phase, report changed files, rationale, tests executed, exact results, unresolved risks, content requirements, and Go/No-Go status. The release is not complete until all routes, links, forms, RTL/LTR behavior, SEO foundations, builds, tests, and production checks pass.
```

---

## References

[1]: file:///home/ubuntu/upload/pasted_content.txt "Antigravity comprehensive analysis and SEO roadmap for Ghazara MVP"
[2]: file:///home/ubuntu/webdev-refs/ghazara-website-NawcGs/README.md "Ghazara reference project README"
[3]: file:///home/ubuntu/webdev-refs/ghazara-website-NawcGs/client/src/data/content.ts "Current bilingual content model"
[4]: file:///home/ubuntu/webdev-refs/ghazara-website-NawcGs/todo-phase2.md "Reference project Phase 2 notes"
[5]: file:///home/ubuntu/projects/project-b0034ebe/Master%20Project%20Instructions%20%E2%80%94%20%D9%85%D8%A4%D8%B3%D8%B3%D8%A9%20%D8%BA%D8%B2%D8%A7%D8%B1%D8%A9%20%D9%84%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D8%A9%20%D9%88%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82%20-%20%D8%AA%D8%B9%D9%84%D9%8A%D9%85%D8%A7%D8%AA%20%D9%85%D8%A7%D9%86%D9%88%D8%B3.md "Master project instructions"
[6]: file:///home/ubuntu/projects/project-b0034ebe/%D9%85%D8%A4%D8%B3%D8%B3%D8%A9%20%D8%BA%D8%B2%D8%A7%D8%B1%D8%A9%20-%20Play%20Book.pdf "Ghazara brand play book"
