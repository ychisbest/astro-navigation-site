// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import type { Multilingual } from "@/i18n";

export const SITE_TITLE: string | Multilingual = "FastToolHub - Tools For Indie Hackers";

export const SITE_TITLE_SHORT: string | Multilingual = "FastToolHub";

export const SITE_DESCRIPTION: string | Multilingual =  {
	en: "A collection of free and efficient tools to help indie hackers boost productivity and build their projects faster.",
	es: "Una colección de herramientas gratuitas y eficientes para ayudar a los hackers independientes a aumentar la productividad y construir sus proyectos más rápido.",
	ar: "مجموعة من الأدوات المجانية والفعالة لمساعدة المطورين المستقلين على تعزيز الإنتاجية وبناء مشاريعهم بشكل أسرع.",
	pt: "Uma coleção de ferramentas gratuitas e eficientes para ajudar desenvolvedores independentes a aumentar a produtividade e construir seus projetos mais rapidamente.",
	fr: "Une collection d'outils gratuits et efficaces pour aider les développeurs indépendants à augmenter leur productivité et à construire leurs projets plus rapidement.",
	ru: "Коллекция бесплатных и эффективных инструментов, помогающих независимым разработчикам повысить продуктивность и быстрее создавать свои проекты.",
	"zh-cn": "为独立开发者提供的免费高效工具集合，旨在帮助提升生产力并加速项目开发。这里汇集了各种实用工具，让您的创意更快地变为现实，节省宝贵的开发时间，专注于创造价值。",
	ja: "独立系開発者の生産性を高め、プロジェクトをより速く構築するのに役立つ無料で効率的なツールのコレクション。"
};

export const X_ACCOUNT: string | Multilingual = "@psephopaiktes";

export const NOT_TRANSLATED_CAUTION: string | Multilingual = {
	en: "This page is not available in your language.",
	es: "Esta página no está disponible en tu idioma.",
	ar: "هذه الصفحة غير متوفرة بلغتك.",
	pt: "Esta página não está disponível no seu idioma.",
	fr: "Cette page n'est pas disponible dans votre langue.",
	ru: "Эта страница недоступна на вашем языке.",
	"zh-cn": "此页面不支持您的语言。",
	ja: "このページはご利用の言語でご覧いただけません。",
};
