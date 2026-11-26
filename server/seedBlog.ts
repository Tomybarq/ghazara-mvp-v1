import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { articles, categories, tags, articleTags } from "../drizzle/schema";
import { slugify } from "./blog";

/**
 * Idempotent starter content so the Insights & Blog section is never empty on a
 * fresh database. Runs once at server boot; does nothing when articles exist.
 */

const seedCategories = [
  {
    name: "التجارة والتمثيل التجاري",
    slug: "trade",
    description: "تحليلات في التجارة، التوزيع، وسلاسل الإمداد.",
  },
  {
    name: "التكنولوجيا والمنصات",
    slug: "tech",
    description: "أنظمة، بنية تحتية، وحلول سحابية للشركات.",
  },
  {
    name: "التسويق الرقمي",
    slug: "marketing",
    description: "استراتيجيات النمو، الحملات، وقياس الأثر.",
  },
];

const seedArticles = [
  {
    slug: "digital-transformation-in-corporate-trade",
    title: "دور التحول الرقمي في تعزيز كفاءة التجارة المؤسسية",
    titleEn: "The Role of Digital Transformation in Enhancing Corporate Trade Efficiency",
    summary:
      "كيف تساهم المنصات السحابية والأتمتة الحديثة في خفض التكاليف التشغيلية وفتح آفاق جديدة للتجارة الإقليمية وسلاسل الإمداد.",
    summaryEn:
      "How cloud platforms and modern automation help reduce operational costs and unlock new horizons for regional commerce and supply chains.",
    categorySlug: "trade",
    author: "فريق غزارة للاستشارات",
    publishedAt: new Date("2026-08-12T09:00:00Z"),
    tags: ["تجارة", "تحول رقمي", "سلاسل إمداد", "أتمتة"],
    content: `## من العمليات اليدوية إلى التشغيل المتصل

تتعامل المؤسسات التجارية يوميًا مع عشرات الطلبات، وحركات المخزون، والفواتير، ومتابعة الموردين. وعندما تبقى هذه البيانات موزعة بين جداول بيانات ومحادثات وملفات منفصلة، تصبح كل عملية قرار بطيئة ومكلفة.

التحول الرقمي لا يعني استبدال الفريق بأنظمة، بل ربط هذه البيانات في مسار واحد واضح: من الطلب إلى التسليم، مع لوحة واحدة تُظهر أين تقف كل معاملة.

## أين يبدأ الأثر الفعلي؟

1. **توحيد البيانات:** رقم طلب واحد، وعميل واحد، وسجل واحد لكل حركة، بدلًا من أرقام متكررة في أكثر من مكان.
2. **أتمتة المهام المتكررة:** إنشاء الفواتير، وتنبيهات إعادة الطلب، وتذكير الموردين بمواعيد التسليم.
3. **قياس ما يمكن تحسينه:** هامش الربح لكل منتج، وزمن دورة الطلب، ومعدل تكرار الشراء.

> التحول الناجح يبدأ من عملية واضحة، لا من أداة جديدة تُضاف فوق عملية معقدة.

## خارطة طريق عملية

ابدأ بنطاق صغير ومحدد — قسم واحد أو خط منتجات واحد — وطبّق النظام عليه بالكامل قبل التوسع. هكذا تحصل على نتائج قابلة للقياس، وتكتشف الفجوات مبكرًا، وتحافظ على ثقة الفريق في التغيير.`,
    contentEn: `## From manual operations to a connected workflow

Trading companies handle dozens of requests, stock movements, invoices and supplier follow-ups every day. When that data lives across spreadsheets, chat threads and separate files, every decision becomes slower and more expensive.

Digital transformation is not about replacing people with systems. It is about connecting that data into one clear path — from order to delivery — with a single view of where each transaction stands.

## Where the real impact starts

1. **One source of truth:** a single order number, customer record and movement log instead of duplicated references.
2. **Automation of repetitive work:** invoice generation, reorder alerts and supplier delivery reminders.
3. **Measurement:** margin per product, order cycle time and repeat purchase rate.

> Successful transformation starts with a clear process, not a new tool layered on top of a complicated one.

## A practical roadmap

Start with a small, well-defined scope — one department or one product line — and implement it end to end before expanding. You get measurable results early, uncover gaps sooner, and keep the team confident in the change.`,
  },
  {
    slug: "data-driven-digital-marketing-roi",
    title: "استراتيجيات التسويق الرقمي المرتكزة على البيانات",
    titleEn: "Data-Driven Digital Marketing Strategies for Maximum ROI",
    summary:
      "لماذا يعد تحليل سلوك المستهلك واتخاذ القرار بناءً على الأرقام الحقيقية هو الفيصل في نجاح الحملات التسويقية الحديثة ورفع معدل التحويل.",
    summaryEn:
      "Why analyzing consumer behavior and making decisions based on real data is decisive for modern marketing success and conversion rates.",
    categorySlug: "marketing",
    author: "فريق غزارة الرقمي",
    publishedAt: new Date("2026-08-05T09:00:00Z"),
    tags: ["تسويق رقمي", "تحسين التحويل", "بيانات", "B2B"],
    content: `## القرار التسويقي بين الإحساس والرقم

معظم الحملات لا تفشل بسبب ضعف المحتوى، بل لأن الفريق لا يعرف أي قناة جلبت العميل، وأي عرض أقنعه، وأي خطوة في الرحلة أوقفته. بدون هذا الوضوح، يتحول الإعلان إلى مصروف متكرر بلا تفسير.

## ثلاث خطوات قبل زيادة الميزانية

1. **حدد مؤشرًا واحدًا للنجاح:** عدد طلبات عروض الأسعار المؤهلة، لا عدد النقرات.
2. **اربط كل طلب بمصدره:** صفحة الهبوط، والحملة، والكلمة المفتاحية التي جاء منها.
3. **اختبر عنصرًا واحدًا في كل مرة:** العنوان، أو العرض، أو الجمهور، حتى تعرف سبب التحسن.

## بناء رحلة عميل واضحة

العميل المؤسسي لا يشتري من أول زيارة. يحتاج إلى دليل، ثم مرجع، ثم محادثة مباشرة مع شخص يفهم قطاعه. كل مرحلة تحتاج رسالة مختلفة وقياسًا مختلفًا.

> ما لا يمكن قياسه لا يمكن تحسينه، وما لا يمكن ربطه بالعميل لا يستحق أن يُقاس.

## متابعة ما بعد الحملة

أهم جزء في أي حملة هو ما يحدث بعد وصول الطلب: سرعة الرد، ووضوح العرض، والمتابعة في الوقت المناسب. هذه الخطوات غالبًا ما تحدد النتيجة النهائية أكثر من الإعلان نفسه.`,
    contentEn: `## Marketing decisions: instinct or evidence?

Most campaigns do not fail because of weak content. They fail because the team cannot tell which channel brought the customer, which offer convinced them, and which step in the journey lost them. Without that clarity, advertising becomes a recurring expense with no explanation.

## Three steps before increasing budget

1. **Pick one success metric:** qualified quote requests, not clicks.
2. **Attach every request to its source:** landing page, campaign and keyword.
3. **Test one element at a time:** headline, offer or audience — so you know why the result changed.

## Building a clear customer journey

A B2B buyer rarely purchases on the first visit. They need proof, then a reference, then a direct conversation with someone who understands their sector. Each stage needs a different message and a different measure.

> What cannot be measured cannot be improved, and what cannot be tied to a customer is not worth measuring.

## The work after the campaign

The most important part of any campaign happens after the request arrives: response speed, clarity of the offer and timely follow-up. These steps often decide the outcome more than the advertisement itself.`,
  },
  {
    slug: "enterprise-network-infrastructure-mikrotik",
    title: "إدارة وتأمين البنية التحتية للشبكات وحلول ميكروتيك للشركات",
    titleEn: "Network Infrastructure Management & MikroTik Solutions for Enterprises",
    summary:
      "دليل شامل لتأمين وتحسين توزيع النطاق الترددي واستقرار الاتصال للمؤسسات الكبرى وحماية العمليات الرقمية الحساسة.",
    summaryEn:
      "A comprehensive guide to securing, optimizing bandwidth distribution, and ensuring connection stability for major corporate operations.",
    categorySlug: "tech",
    author: "فريق غزارة الهندسي",
    publishedAt: new Date("2026-07-22T09:00:00Z"),
    tags: ["شبكات", "ميكروتيك", "بنية تحتية", "أمان"],
    content: `## الشبكة كأصل تشغيلي

في الشركات التي تعتمد على الأنظمة السحابية والمبيعات الرقمية، لم تعد الشبكة خدمة مساندة. انقطاع الاتصال لساعة يعني توقف الفواتير، وتعطل نقاط البيع، وتأخر ردود الفريق على العملاء.

## أسس تصميم شبكة مستقرة

1. **فصل الشبكات:** شبكة للموظفين، وأخرى للأنظمة الحساسة، وشبكة للزوار، حتى لا ينتقل أي خلل بينها.
2. **توزيع النطاق الترددي بذكاء:** تحديد أولوية لحركات الأنظمة المحاسبية والمكالمات على المحتوى غير التشغيلي.
3. **نسخ احتياطي للإعدادات:** تصدير إعدادات الراوترات والمحولات دوريًا، حتى لا تتحول أي إعادة تهيئة إلى مشروع كامل.

## الأمن ليس جدار حماية فقط

تحديث الأجهزة، وتقسيم صلاحيات الدخول، وتسجيل من يدخل الشبكة ومتى، خطوات أساسية لا تقل أهمية عن أي جهاز حماية.

> الشبكة الجيدة لا يلاحظها أحد؛ يتم ملاحظتها فقط عندما تتوقف.

## المراقبة المستمرة

راقب استهلاك النطاق، وزمن الاستجابة، وحالة الأجهزة الطرفية. التنبيه المبكر قبل انقطاع الخدمة أرخص بكثير من إصلاح توقف كامل في منتصف يوم عمل.`,
    contentEn: `## The network as an operational asset

For companies that run on cloud systems and digital sales, the network is no longer a supporting service. An hour of downtime means stalled invoices, offline point-of-sale terminals and delayed replies to customers.

## Foundations of a stable network design

1. **Segmentation:** one network for staff, one for sensitive systems and one for guests, so a problem in one cannot spread.
2. **Smart bandwidth allocation:** priority for accounting systems and voice calls over non-business traffic.
3. **Configuration backups:** export router and switch configurations regularly, so any reset is not a full project.

## Security is more than a firewall

Device updates, role-based access and logging who joins the network and when are as essential as any protective appliance.

> A good network goes unnoticed; it is only noticed when it stops.

## Continuous monitoring

Watch bandwidth usage, response time and device status. An early alert is far cheaper than repairing a full outage in the middle of a working day.`,
  },
];

export async function seedBlogContent(): Promise<void> {
  const db = await getDb();
  if (!db) return;

  for (const category of seedCategories) {
    await db
      .insert(categories)
      .values(category)
      .onDuplicateKeyUpdate({ set: { name: category.name, description: category.description } });
  }

  const existing = await db.select({ id: articles.id }).from(articles).limit(1);
  if (existing.length > 0) return;

  const categoryRows = await db
    .select({ id: categories.id, slug: categories.slug })
    .from(categories);
  const categoryIdBySlug = new Map(categoryRows.map(row => [row.slug, row.id]));

  for (const seed of seedArticles) {
    const [inserted] = await db.insert(articles).values({
      title: seed.title,
      titleEn: seed.titleEn,
      slug: seed.slug,
      summary: seed.summary,
      summaryEn: seed.summaryEn,
      content: seed.content,
      contentEn: seed.contentEn,
      categoryId: categoryIdBySlug.get(seed.categorySlug) ?? null,
      author: seed.author,
      status: "published",
      publishedAt: seed.publishedAt,
    });

    const articleId = Number(inserted.insertId);

    for (const name of seed.tags) {
      const slug = slugify(name);
      await db.insert(tags).values({ name, slug }).onDuplicateKeyUpdate({ set: { name } });
      const [tag] = await db.select({ id: tags.id }).from(tags).where(eq(tags.slug, slug)).limit(1);
      if (!tag) continue;
      await db
        .insert(articleTags)
        .values({ articleId, tagId: tag.id })
        .onDuplicateKeyUpdate({ set: { tagId: tag.id } });
    }
  }

  console.log(`[Seed] Inserted ${seedArticles.length} starter articles`);
}
