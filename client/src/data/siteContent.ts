export type Language = "ar" | "en";

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  header: {
    nav: {
      services: string;
      about: string;
      whyGhazara: string;
      contact: string;
    };
    cta: string;
    langSwitch: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    supporting: string;
    primaryCta: string;
    secondaryCta: string;
    badge: string;
  };
  trustBar: {
    statement: string;
    pillars: [string, string, string];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      number: string;
      title: string;
      description: string;
      tag: string;
      icon: "trading" | "marketing" | "growth";
    }>;
  };
  deeperFeature: {
    eyebrow: string;
    title: string;
    body: string;
    pillars: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: Array<{
      number: string;
      title: string;
      subtitle: string;
      desc: string;
    }>;
  };
  whyGhazara: {
    eyebrow: string;
    title: string;
    principles: Array<{
      id: string;
      title: string;
      desc: string;
    }>;
  };
  callout: {
    quote: string;
    tag: string;
  };
  finalCta: {
    title: string;
    supporting: string;
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      company: string;
      companyPlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      service: string;
      serviceOptions: {
        trading: string;
        marketing: string;
        growth: string;
        other: string;
      };
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      errorMessage: string;
    };
    whatsappNotice: string;
    whatsappCta: string;
  };
  privacy: {
    title: string;
    lastUpdated: string;
    intro: string;
    sections: LegalSection[];
    googleCompliance: {
      title: string;
      text: string;
    };
    contactInfo: {
      title: string;
      email: string;
      secondaryEmail: string;
      domain: string;
    };
  };
  terms: {
    title: string;
    lastUpdated: string;
    intro: string;
    sections: LegalSection[];
    contactInfo: {
      title: string;
      email: string;
      domain: string;
    };
  };
  footer: {
    companyName: string;
    tagline: string;
    links: {
      home: string;
      services: string;
      about: string;
      contact: string;
      privacy: string;
      terms: string;
    };
    copyright: string;
  };
}

export const siteContent: Record<Language, SiteContent> = {
  ar: {
    meta: {
      title: "غزارة للتجارة والتسويق | حلول التجارة والتسويق وتطوير الأعمال",
      description: "مؤسسة غزارة للتجارة والتسويق - نحوّل التجارة والتسويق إلى فرص نمو حقيقية عبر تطوير الأسواق، وبناء العلامات التجارية، والشراكات الاستراتيجية.",
    },
    header: {
      nav: {
        services: "الخدمات",
        about: "عن غزارة",
        whyGhazara: "لماذا غزارة؟",
        contact: "تواصل معنا",
      },
      cta: "ابدأ الآن",
      langSwitch: "EN",
    },
    hero: {
      eyebrow: "منظومة النمو التجاري والتسويقي",
      headline: "نحوّل التجارة والتسويق إلى فرص نمو حقيقية.",
      supporting: "نساعد الشركات على بناء حضور أقوى، الوصول إلى أسواق جديدة، وتطوير فرص تجارية وتسويقية أكثر فاعلية واستدامة.",
      primaryCta: "ابدأ مشروعك معنا",
      secondaryCta: "اكتشف خدماتنا",
      badge: "شريكك الموثوق في التوسع التجاري والنمو الرقمي",
    },
    trustBar: {
      statement: "نبني علاقات تجارية تقود إلى فرص حقيقية",
      pillars: ["تجارة وتوريد", "تسويق استراتيجي", "تطوير أعمال"],
    },
    services: {
      eyebrow: "مجالات العمل",
      title: "ما الذي تقدمه غزارة؟",
      subtitle: "ثلاثة محاور متكاملة تصنع فارقاً ملموساً في حضورك التجاري وحصتك السوقية.",
      items: [
        {
          id: "trading",
          number: "01",
          title: "التجارة وتطوير الأسواق",
          description: "ربط المنتجات والفرص بالأسواق المناسبة، مع التركيز على بناء علاقات تجارية مستدامة وسلاسل إمداد موثوقة.",
          tag: "Trading & Markets",
          icon: "trading",
        },
        {
          id: "marketing",
          number: "02",
          title: "التسويق وبناء العلامات التجارية",
          description: "تطوير حضور العلامة التجارية وتحويل الأفكار التسويقية إلى تجارب أكثر تأثيرًا ووضوحًا وتحقيق أعلى عائد على الاستثمار.",
          tag: "Brand & Performance",
          icon: "marketing",
        },
        {
          id: "growth",
          number: "03",
          title: "تطوير الأعمال والشراكات",
          description: "اكتشاف فرص جديدة، بناء الشراكات الاستراتيجية، ودعم الشركات في توسيع نطاق أعمالها وفتح قنوات بيع مستدامة.",
          tag: "Partnerships & Scale",
          icon: "growth",
        },
      ],
    },
    deeperFeature: {
      eyebrow: "رؤيتنا المنهجية",
      title: "من الفرصة إلى النمو",
      body: "ننظر إلى التجارة والتسويق كمنظومة مترابطة؛ تبدأ بفهم السوق، ثم تحديد الفرصة، وبناء العرض المناسب، والوصول إلى العميل، وتحويل العلاقات إلى نمو مستدام.",
      pillars: [
        { step: "01", title: "فهم السوق", desc: "دراسة دقيقة للمتغيرات وسلوك المستهلكين والمشترين." },
        { step: "02", title: "تحديد الفرصة", desc: "استكشاف الفجوات التجارية الأكثر ربحية وقابلية للتوسع." },
        { step: "03", title: "بناء الحل", desc: "هيكلة العرض وتجهيز سلاسل التوريد والمنظومة التسويقية." },
        { step: "04", title: "تحقيق النمو", desc: "تنفيذ متقن ومتابعة مستمرة تضمن استدامة التدفقات." },
      ],
    },
    process: {
      eyebrow: "آلية العمل",
      title: "كيف نعمل؟",
      steps: [
        {
          number: "01",
          title: "نفهم السوق",
          subtitle: "Understand",
          desc: "تحليل معمق لطبيعة القطاع، المنافسين، ومسارات الطلب الفعلي.",
        },
        {
          number: "02",
          title: "نحدد الفرصة",
          subtitle: "Identify",
          desc: "انتقاء القنوات والمنتجات والحلول ذات الأثر التجاري الأعلى.",
        },
        {
          number: "03",
          title: "نبني الحل",
          subtitle: "Build",
          desc: "صياغة المزيج التجاري والتسويقي المتكامل وتجهيز البنية التشغيلية.",
        },
        {
          number: "04",
          title: "نحوّلها إلى نمو",
          subtitle: "Grow",
          desc: "إطلاق العمليات، قياس العائد، والتوسع نحو شراكات طويلة الأمد.",
        },
      ],
    },
    whyGhazara: {
      eyebrow: "القيمة المضافة",
      title: "لماذا غزارة؟",
      principles: [
        {
          id: "market",
          title: "فهم السوق",
          desc: "قرارات تبدأ من فهم حقيقي لواقع السوق والعميل واحتياجاته الفعلية.",
        },
        {
          id: "growth",
          title: "عقلية نمو",
          desc: "نركز على الفرص التي يمكن تحويلها إلى نتائج تجارية ملموسة وقابلة للقياس.",
        },
        {
          id: "integration",
          title: "تكامل التجارة والتسويق",
          desc: "نجمع بين كفاءة الوصول إلى السوق وبناء الطلب المستمر عليه.",
        },
        {
          id: "partnerships",
          title: "شراكات طويلة المدى",
          desc: "نبني علاقات عمل استراتيجية تتجاوز الصفقة الواحدة نحو قيمة مستدامة مشتركة.",
        },
      ],
    },
    callout: {
      quote: "نؤمن أن النمو الحقيقي يبدأ عندما تلتقي الفرصة المناسبة بالتنفيذ الصحيح.",
      tag: "فلسفة غزارة في الأعمال",
    },
    finalCta: {
      title: "لديك فرصة تجارية؟ لنبنِ الخطوة التالية معًا.",
      supporting: "تواصل مع فريق غزارة لمناقشة احتياجاتك التجارية والتسويقية وفتح آفاق جديدة للتوسع.",
      cta: "تواصل معنا الآن",
    },
    contact: {
      eyebrow: "ابدأ الحوار",
      title: "تواصل مع فريق غزارة",
      subtitle: "نسعد بمناقشة احتياجاتك وتطوير حل تجاري أو تسويقي مخصص لأهدافك.",
      form: {
        name: "الاسم الكامل",
        namePlaceholder: "أدخل اسمك الكريم",
        company: "اسم الشركة / الجهة",
        companyPlaceholder: "اسم مؤسستك أو علامتك التجارية",
        email: "البريد الإلكتروني",
        emailPlaceholder: "name@company.com",
        phone: "رقم الهاتف / واتساب",
        phonePlaceholder: "05xxxxxxxx",
        service: "الخدمة أو الاهتمام المطلوب",
        serviceOptions: {
          trading: "التجارة وتطوير الأسواق",
          marketing: "التسويق وبناء العلامات التجارية",
          growth: "تطوير الأعمال والشراكات",
          other: "استشارة تجارية وتسويقية شاملة",
        },
        message: "تفاصيل الطلب أو المشروع",
        messagePlaceholder: "يرجى كتابة نبذة عن طبيعة الفرصة أو الاحتياج التجاري...",
        submit: "إرسال الطلب",
        submitting: "جاري الإرسال...",
        successTitle: "تم استلام طلبك بنجاح",
        successMessage: "شكراً لاهتمامك. سيتواصل معك أحد مسؤولي تطوير الأعمال في غزارة خلال 24 ساعة عمل.",
        errorTitle: "تعذر إرسال الطلب",
        errorMessage: "حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب.",
      },
      whatsappNotice: "هل تفضل التواصل السريع المباشر؟",
      whatsappCta: "تحدث معنا عبر واتساب",
    },
    privacy: {
      title: "سياسة الخصوصية وحماية البيانات",
      lastUpdated: "آخر تحديث: سبتمبر 2026",
      intro: "تلتزم مؤسسة غزارة للتجارة والتسويق (Ghazara) بحماية خصوصية زوار موقعنا وعملائنا وشركائنا التجاريين وفقاً للأنظمة واللوائح المعتمدة بما فيها نظام حماية البيانات الشخصية (PDPL) وسياسات بيانات المستخدم لمنصات التحقق المعتمدة.",
      sections: [
        {
          title: "1. البيانات التي نجمعها",
          paragraphs: [
            "نجمع البيانات التي تقدمها لنا طواعية عند ملء نماذج الاستفسار وطلب عروض الأسعار، وتتضمن: الاسم، اسم الشركة، البريد الإلكتروني للعمل، ورقم الهاتف، وتفاصيل المتطلبات التجارية.",
            "عند تسجيل الدخول أو المصادقة عبر موفري الهوية المعتمدين (مثل Google OAuth)، نتلقى فقط البيانات الأساسية المصرح بها (المعرف الفريد، الاسم الكامل، وعنوان البريد الإلكتروني الموثق) لإنشاء الجلسة وتوثيق هوية المستخدم.",
          ],
        },
        {
          title: "2. كيف نستخدم بياناتك",
          paragraphs: [
            "تستخدم البيانات حصراً للتواصل معك بشأن الخدمات التجارية، وإعداد عروض الأسعار المخصصة، وتقديم الاستشارات المطلوبة، وإدارة الشراكات التجارية.",
            "لا نقوم إطلاقاً ببيع أو تأجير أو مشاركة بياناتك الشخصية مع أي أطراف ثالثة لأغراض دعائية أو تجارية خارجية.",
          ],
        },
        {
          title: "3. أمن البيانات والاحتفاظ بها",
          paragraphs: [
            "نطبق معايير أمنية تقنية وتنظيمية متقدمة لحماية البيانات ضد الوصول غير المصرح به أو التعديل أو الإفصاح.",
            "نحتفظ بالبيانات فقط للفترة اللازمة لتحقيق الأغراض التجارية الموضحة أو وفقاً لما يفرضه القانون التجاري والأنظمة السارية.",
          ],
        },
        {
          title: "4. حقوقك وخياراتك",
          paragraphs: [
            "يحق لك في أي وقت طلب الوصول إلى بياناتك الشخصية، أو تصحيحها، أو طلب حذفها من سجلاتنا بالتواصل المباشر مع فريق حماية البيانات عبر البريد الرسمي info@ghazara.net.",
          ],
        },
      ],
      googleCompliance: {
        title: "الامتثال لسياسة بيانات مستخدمي خدمات Google API",
        text: "إن استخدام غزارة للمعلومات المستلمة من واجهات برمجة تطبيقات Google ونقلها إلى أي تطبيق آخر يتوافق بدقة مع سياسة بيانات مستخدمي خدمات Google API، بما في ذلك متطلبات الاستخدام المحدود (Limited Use Requirements).",
      },
      contactInfo: {
        title: "بيانات التواصل والاستفسارات القانونية",
        email: "info@ghazara.net",
        secondaryEmail: "ghazaranet@gmail.com",
        domain: "https://ghazara.net",
      },
    },
    terms: {
      title: "الشروط والأحكام العامة",
      lastUpdated: "آخر تحديث: سبتمبر 2026",
      intro: "أهلاً بك في موقع مؤسسة غزارة للتجارة والتسويق (ghazara.net). استخدامك لهذا الموقع أو أي من خدماتنا الاستشارية والتجارية يشكل موافقتك الكاملة على هذه الشروط والأحكام.",
      sections: [
        {
          title: "1. نطاق الخدمات والتمثيل التجاري",
          paragraphs: [
            "تقدم غزارة خدمات التجارة، وتطوير الأسواق، والتسويق عالي الأداء، وتطوير الأعمال للشركات والجهات التجارية. تخضع عروض الأسعار والاتفاقيات التجارية لعقود مستقلة تفصيلية يتم توقيعها بين الطرفين.",
          ],
        },
        {
          title: "2. حقوق الملكية الفكرية",
          paragraphs: [
            "كافة محتويات الموقع بما في ذلك العلامة التجارية لـ 'غزارة'، والشعارات، والنصوص، والتصاميم، والأيقونات، والنظم البرمجية هي ملكية حصرية لمؤسسة غزارة للتجارة والتسويق ومحمية بموجب أنظمة حماية الملكية الفكرية.",
          ],
        },
        {
          title: "3. الاستخدام المقبول للموقع",
          paragraphs: [
            "يلتزم المستخدم بعدم استخدام الموقع لأي أغراض غير مشروعة، أو محاولة تعطيل الخوادم، أو اختراق الإجراءات الأمنية، أو إرسال استفسارات احتيالية.",
          ],
        },
        {
          title: "4. حدود المسؤولية والقانون الساري",
          paragraphs: [
            "تسعى غزارة لتوفير أدق المعلومات حول خدماتها ولكنها لا تقدم ضمانات صريحة أو ضمنية تتجاوز الشروط المنصوص عليها في العقود التجارية التنفيذية الموقعة. تخضع هذه الشروط وتفسر وفقاً للأنظمة التجارية السارية في المملكة العربية السعودية.",
          ],
        },
      ],
      contactInfo: {
        title: "للاستفسارات الرسمية حول الشروط والأحكام",
        email: "info@ghazara.net",
        domain: "https://ghazara.net",
      },
    },
    footer: {
      companyName: "غزارة للتجارة والتسويق",
      tagline: "شريكك الاستراتيجي في تنمية الأعمال وبناء الأسواق الواعدة.",
      links: {
        home: "الرئيسية",
        services: "الخدمات",
        about: "عن غزارة",
        contact: "تواصل معنا",
        privacy: "سياسة الخصوصية",
        terms: "الشروط والأحكام",
      },
      copyright: "© 2026 غزارة للتجارة والتسويق. جميع الحقوق محفوظة.",
    },
  },
  en: {
    meta: {
      title: "Ghazara for Trading & Marketing | Commerce, Marketing & Business Growth",
      description: "Ghazara for Trading & Marketing — Turning commerce and marketing into real growth through market development, brand scale, and strategic partnerships.",
    },
    header: {
      nav: {
        services: "Services",
        about: "About",
        whyGhazara: "Why Ghazara",
        contact: "Contact",
      },
      cta: "Start a Conversation",
      langSwitch: "العربية",
    },
    hero: {
      eyebrow: "Commercial & Marketing Growth Engine",
      headline: "Turning Commerce & Marketing Into Real Growth.",
      supporting: "We help businesses build stronger market presence, reach new opportunities, and turn commerce and marketing into measurable, sustainable growth.",
      primaryCta: "Start Your Project",
      secondaryCta: "Explore Our Services",
      badge: "Your Trusted Partner in Market Expansion & Commercial Execution",
    },
    trustBar: {
      statement: "Building commercial relationships that lead to real opportunities",
      pillars: ["Trading & Supply", "Strategic Marketing", "Business Development"],
    },
    services: {
      eyebrow: "Core Capabilities",
      title: "What We Do",
      subtitle: "Three integrated growth pillars engineered to expand your commercial footprint and market share.",
      items: [
        {
          id: "trading",
          number: "01",
          title: "Trading & Market Development",
          description: "Connecting products and opportunities with the right markets while building sustainable commercial relationships and dependable supply pipelines.",
          tag: "Trading & Markets",
          icon: "trading",
        },
        {
          id: "marketing",
          number: "02",
          title: "Marketing & Brand Growth",
          description: "Building stronger brand presence and transforming marketing ideas into clearer, higher-impact experiences with maximized return on spend.",
          tag: "Brand & Performance",
          icon: "marketing",
        },
        {
          id: "growth",
          number: "03",
          title: "Business Development & Partnerships",
          description: "Identifying new commercial avenues, forging strategic partnerships, and empowering enterprises to expand their market reach.",
          tag: "Partnerships & Scale",
          icon: "growth",
        },
      ],
    },
    deeperFeature: {
      eyebrow: "Our Strategic Approach",
      title: "From Opportunity to Growth",
      body: "We see commerce and marketing as one connected growth system — understanding the market, identifying opportunities, shaping the right offering, reaching customers, and turning relationships into sustainable growth.",
      pillars: [
        { step: "01", title: "Market Understanding", desc: "Rigorous analysis of sector shifts and buyer behavior." },
        { step: "02", title: "Opportunity Mapping", desc: "Targeting high-margin, scalable commercial gaps." },
        { step: "03", title: "Solution Architecture", desc: "Structuring product offerings and marketing funnels." },
        { step: "04", title: "Growth Realization", desc: "Flawless execution driving continuous revenue." },
      ],
    },
    process: {
      eyebrow: "The Methodology",
      title: "How We Work",
      steps: [
        {
          number: "01",
          title: "Understand",
          subtitle: "نفهم السوق",
          desc: "In-depth research of industry dynamics, competition, and actual market demand.",
        },
        {
          number: "02",
          title: "Identify",
          subtitle: "نحدد الفرصة",
          desc: "Pinpointing the highest-leverage distribution channels and commercial offerings.",
        },
        {
          number: "03",
          title: "Build",
          subtitle: "نبني الحل",
          desc: "Formulating the integrated trade-and-marketing mix and operational framework.",
        },
        {
          number: "04",
          title: "Grow",
          subtitle: "نحوّلها إلى نمو",
          desc: "Deploying operations, tracking ROI, and scaling long-term partner relationships.",
        },
      ],
    },
    whyGhazara: {
      eyebrow: "Our Distinct Edge",
      title: "Why Ghazara",
      principles: [
        {
          id: "market",
          title: "Market Understanding",
          desc: "Decisions grounded in direct understanding of market reality and customer needs.",
        },
        {
          id: "growth",
          title: "Growth Mindset",
          desc: "Relentless focus on opportunities that translate into concrete commercial results.",
        },
        {
          id: "integration",
          title: "Commerce + Marketing",
          desc: "Unifying reliable market access with disciplined, high-conversion demand generation.",
        },
        {
          id: "partnerships",
          title: "Long-Term Partnerships",
          desc: "Building relationships that transcend single transactions toward shared, lasting value.",
        },
      ],
    },
    callout: {
      quote: "Real growth begins when the right opportunity meets the right execution.",
      tag: "The Ghazara Philosophy",
    },
    finalCta: {
      title: "Have a Business Opportunity? Let's Build the Next Step Together.",
      supporting: "Talk to the Ghazara team about your commercial, marketing, or expansion needs.",
      cta: "Talk to Ghazara",
    },
    contact: {
      eyebrow: "Start a Conversation",
      title: "Connect with Ghazara",
      subtitle: "We look forward to discussing your goals and engineering a customized trade and marketing roadmap.",
      form: {
        name: "Full Name",
        namePlaceholder: "Your full name",
        company: "Company / Organization",
        companyPlaceholder: "Company or brand name",
        email: "Work Email",
        emailPlaceholder: "name@company.com",
        phone: "Phone / WhatsApp",
        phonePlaceholder: "+966 5x xxx xxxx",
        service: "Service of Interest",
        serviceOptions: {
          trading: "Trading & Market Development",
          marketing: "Marketing & Brand Growth",
          growth: "Business Development & Partnerships",
          other: "Comprehensive Advisory & Growth",
        },
        message: "Project or Inquiry Details",
        messagePlaceholder: "Tell us about your commercial opportunity, product, or growth objectives...",
        submit: "Send Inquiry",
        submitting: "Sending...",
        successTitle: "Inquiry Received Successfully",
        successMessage: "Thank you for reaching out. A Ghazara business development lead will contact you within 24 business hours.",
        errorTitle: "Submission Error",
        errorMessage: "An error occurred while submitting. Please try again or reach out directly via WhatsApp.",
      },
      whatsappNotice: "Prefer direct and instant messaging?",
      whatsappCta: "Message us on WhatsApp",
    },
    privacy: {
      title: "Privacy Policy & Data Protection",
      lastUpdated: "Last Updated: September 2026",
      intro: "Ghazara for Trading & Marketing ('Ghazara', 'we', 'our') is committed to protecting the privacy and security of visitors to https://ghazara.net and our business partners in compliance with applicable regulations, including Saudi Personal Data Protection Law (PDPL) and Google API Services User Data Policy.",
      sections: [
        {
          title: "1. Information We Collect",
          paragraphs: [
            "We collect information that you voluntarily submit through our contact and quote request forms, including your full name, company name, corporate email address, phone number, and commercial project requirements.",
            "When authenticating via authorized identity providers (such as Google OAuth), we only receive verified basic profile details (user openId, full name, and verified email address) solely for authentication and session management.",
          ],
        },
        {
          title: "2. How We Use Your Information",
          paragraphs: [
            "Your information is utilized strictly to communicate regarding trading and marketing services, prepare customized commercial proposals, provide requested advisory, and manage business partnerships.",
            "We never sell, rent, or trade your personal data to third parties for commercial advertising or external monetization.",
          ],
        },
        {
          title: "3. Data Security & Retention",
          paragraphs: [
            "We enforce robust technical, administrative, and physical safeguards to prevent unauthorized access, disclosure, or alteration of collected information.",
            "Data is retained only as long as necessary to fulfill commercial obligations or as mandated by statutory compliance regulations.",
          ],
        },
        {
          title: "4. User Rights & Data Subject Access",
          paragraphs: [
            "You have the right to request access to, correction of, or deletion of your personal data at any time by contacting our data protection team at info@ghazara.net.",
          ],
        },
      ],
      googleCompliance: {
        title: "Google API Services User Data Policy Compliance",
        text: "Ghazara's use and transfer to any other app of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.",
      },
      contactInfo: {
        title: "Privacy Inquiries & Legal Contact",
        email: "info@ghazara.net",
        secondaryEmail: "ghazaranet@gmail.com",
        domain: "https://ghazara.net",
      },
    },
    terms: {
      title: "Terms of Service & Public Usage",
      lastUpdated: "Last Updated: September 2026",
      intro: "Welcome to Ghazara for Trading & Marketing (ghazara.net). By accessing our website or engaging with our commercial and marketing solutions, you agree to comply with and be bound by the following terms and conditions.",
      sections: [
        {
          title: "1. Scope of Commercial Services",
          paragraphs: [
            "Ghazara provides trading representation, market development, high-performance marketing, and business development services. Formal engagements and deliverables are governed by specific bilateral commercial agreements.",
          ],
        },
        {
          title: "2. Intellectual Property Rights",
          paragraphs: [
            "All website materials, trademarks, brand identity assets, logos, copy, UI architecture, and technical assets are the exclusive intellectual property of Ghazara for Trading & Marketing and are protected under international copyright and trademark laws.",
          ],
        },
        {
          title: "3. Acceptable Use",
          paragraphs: [
            "Users agree not to misuse the website, attempt unauthorized access to infrastructure, disrupt network availability, or transmit fraudulent inquiries.",
          ],
        },
        {
          title: "4. Limitation of Liability & Governing Law",
          paragraphs: [
            "Ghazara strives for accuracy across all published insights but makes no warranties beyond those codified in executed client contracts. These terms are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia.",
          ],
        },
      ],
      contactInfo: {
        title: "Official Inquiries Regarding Terms",
        email: "info@ghazara.net",
        domain: "https://ghazara.net",
      },
    },
    footer: {
      companyName: "Ghazara for Trading & Marketing",
      tagline: "Your strategic partner in commercial acceleration and high-impact market growth.",
      links: {
        home: "Home",
        services: "Services",
        about: "About",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
      copyright: "© 2026 Ghazara for Trading & Marketing. All rights reserved.",
    },
  },
};
