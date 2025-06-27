import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import PromptClient from "./prompt-client";
import { Suspense } from "react";

const reader = createReader(process.cwd(), keystaticConfig);

interface Prompt {
  slug: string;
  title: string;
  category: string;
  language: string;
  tags: string[];
  content?: string;
}

async function getPrompts(): Promise<Prompt[]> {
  try {
    const prompts = await reader.collections.prompts.all();
    return await Promise.all(
      prompts.map(async (prompt) => ({
        slug: prompt.slug,
        title: prompt.entry.title,
        category: prompt.entry.category,
        language: prompt.entry.language || "English",
        tags: [...(prompt.entry.tags || [])],
        content: prompt.entry.content
          ? await prompt.entry.content()
          : undefined,
      })),
    );
  } catch (error) {
    console.error("Error loading prompts:", error);
    // 폴백 샘플 데이터
    return [
      {
        slug: "auto-populate-realistic-content",
        title: "Auto-populate with realistic content",
        category: "auto-populate",
        tags: ["content", "text", "automation", "realistic data"],
        language: "English",
        content:
          "# Prompt\n\nPlease generate realistic content for all text layers in the selected design. Include names, addresses, product descriptions, and other relevant placeholder content that matches the context of the design.\n\n# How to Use\n\n1. Select the frame or component you want to populate\n2. Run this prompt\n3. The system will automatically fill text layers with contextual content",
      },
      {
        slug: "design-annotations",
        title: "Add design annotations automatically",
        category: "annotation",
        tags: [
          "documentation",
          "comments",
          "review",
          "handoff",
          "collaboration",
        ],

        language: "English",
        content:
          "# Prompt\n\nCreate comprehensive design annotations for the selected elements, including spacing, typography, colors, and interaction notes for developer handoff.\n\n# How to Use\n\n1. Select the elements you want to annotate\n2. Run this prompt\n3. Review and customize the generated annotations",
      },
      {
        slug: "component-overrides-batch",
        title: "Swap component instances efficiently",
        category: "overrides",
        tags: [
          "components",
          "instances",
          "batch",
          "design system",
          "efficiency",
        ],

        language: "English",
        content:
          "# Prompt\n\nEfficiently swap and update multiple component instances while preserving overrides and maintaining design system consistency.\n\n# How to Use\n\n1. Select multiple component instances\n2. Run this prompt\n3. Choose the target component to swap to",
      },
      {
        slug: "prototype-to-figjam-connectors",
        title: "Convert prototypes to FigJam connectors",
        category: "connectors",
        tags: [
          "figjam",
          "prototype",
          "flowchart",
          "documentation",
          "user flows",
        ],

        language: "English",
        content:
          "# Prompt\n\nTransform your prototype connections into clean FigJam connector diagrams for better documentation and stakeholder communication.\n\n# How to Use\n\n1. Create your prototype flows in Figma\n2. Run this prompt on the selected frames\n3. Export or copy the generated connector diagram to FigJam",
      },
      {
        slug: "creative-color-palettes",
        title: "Generate creative color palettes",
        category: "vibe-design",
        tags: ["colors", "creative", "inspiration", "branding", "aesthetics"],
        language: "English",
        content:
          "# Prompt\n\nGenerate inspiring and harmonious color palettes based on mood, brand direction, or specific aesthetic requirements for your design project.\n\n# How to Use\n\n1. Describe the mood or brand direction you want\n2. Run this prompt\n3. Apply the generated colors to your design elements",
      },
      {
        slug: "korean-content-generation",
        title: "한국어 콘텐츠 자동 생성",
        category: "auto-populate",
        tags: ["한국어", "콘텐츠", "자동화", "로컬라이제이션"],
        language: "한국어",
        content:
          "# Prompt\n\n선택된 디자인의 모든 텍스트 레이어에 현실적인 한국어 콘텐츠를 자동으로 생성합니다. 이름, 주소, 제품 설명 등 디자인 맥락에 맞는 placeholder 콘텐츠를 포함합니다.\n\n# How to Use\n\n1. 콘텐츠를 채우고 싶은 프레임이나 컴포넌트를 선택하세요\n2. 이 프롬프트를 실행하세요\n3. 시스템이 자동으로 텍스트 레이어를 맥락에 맞는 콘텐츠로 채웁니다",
      },
      {
        slug: "smart-layout-optimization",
        title: "Smart layout optimization",
        category: "vibe-design",
        tags: ["layout", "optimization", "spacing", "alignment"],
        language: "English",
        content:
          "# Prompt\n\nOptimize layout spacing and alignment for better visual hierarchy and user experience.\n\n# How to Use\n\n1. Select frames to optimize\n2. Run this prompt\n3. Review the optimized layout",
      },
      {
        slug: "accessibility-checker",
        title: "Accessibility compliance checker",
        category: "annotation",
        tags: ["accessibility", "a11y", "compliance", "WCAG"],
        language: "English",
        content:
          "# Prompt\n\nCheck and improve accessibility compliance for your design elements.\n\n# How to Use\n\n1. Select elements to check\n2. Run this prompt\n3. Review accessibility suggestions",
      },
      {
        slug: "responsive-breakpoints",
        title: "Generate responsive breakpoints",
        category: "overrides",
        tags: ["responsive", "breakpoints", "mobile", "tablet"],
        language: "English",
        content:
          "# Prompt\n\nAutomatically generate responsive variants for different screen sizes.\n\n# How to Use\n\n1. Select your base design\n2. Run this prompt\n3. Review generated breakpoints",
      },
      {
        slug: "user-flow-diagram",
        title: "Create user flow diagrams",
        category: "connectors",
        tags: ["user flow", "diagram", "wireframe", "ux"],
        language: "English",
        content:
          "# Prompt\n\nGenerate comprehensive user flow diagrams from your design screens.\n\n# How to Use\n\n1. Select screen frames\n2. Run this prompt\n3. Review generated flow diagram",
      },
      {
        slug: "chinese-localization",
        title: "中文本地化内容生成",
        category: "auto-populate",
        tags: ["中文", "本地化", "内容", "自动化"],
        language: "中文",
        content:
          "# Prompt\n\n为所选设计的所有文本图层自动生成真实的中文内容。包括姓名、地址、产品描述和其他与设计上下文匹配的相关占位符内容。\n\n# How to Use\n\n1. 选择要填充的框架或组件\n2. 运行此提示\n3. 系统将自动用上下文内容填充文本图层",
      },
      {
        slug: "brand-consistency-check",
        title: "Brand consistency checker",
        category: "vibe-design",
        tags: ["brand", "consistency", "colors", "typography"],
        language: "English",
        content:
          "# Prompt\n\nEnsure brand consistency across all design elements and components.\n\n# How to Use\n\n1. Select design elements\n2. Run this prompt\n3. Review brand compliance report",
      },
      {
        slug: "interactive-prototype",
        title: "Enhanced interactive prototypes",
        category: "connectors",
        tags: ["prototype", "interactive", "animation", "transitions"],
        language: "English",
        content:
          "# Prompt\n\nCreate enhanced interactive prototypes with smooth transitions and animations.\n\n# How to Use\n\n1. Select screens to connect\n2. Run this prompt\n3. Review prototype interactions",
      },
      {
        slug: "design-tokens-sync",
        title: "Design tokens synchronization",
        category: "overrides",
        tags: ["design tokens", "sync", "variables", "consistency"],
        language: "English",
        content:
          "# Prompt\n\nSynchronize design tokens across all components and instances.\n\n# How to Use\n\n1. Select components to sync\n2. Run this prompt\n3. Review token updates",
      },
      {
        slug: "content-strategy-analysis",
        title: "Content strategy analysis",
        category: "annotation",
        tags: ["content strategy", "analysis", "ux writing", "information"],
        language: "English",
        content:
          "# Prompt\n\nAnalyze and improve content strategy for better user experience.\n\n# How to Use\n\n1. Select content areas\n2. Run this prompt\n3. Review content recommendations",
      },
    ];
  }
}

export default async function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Figma MCP Magic",
    description:
      "A curated collection of powerful prompts for Figma MCP (Model Context Protocol). Transform your design workflow with AI-powered automation.",
    url: "https://figma-mcp-prompts.vercel.app",
    sameAs: ["https://github.com/figma", "https://twitter.com/figma"],

    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://figma-mcp-prompts.vercel.app/?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Figma MCP Prompts",
      description: "Collection of AI-powered automation prompts for Figma",
      numberOfItems: "24+",
      itemListElement: [
        {
          "@type": "SoftwareApplication",
          name: "Auto Populate Prompts",
          applicationCategory: "Design Tool",
          description: "Automate content population in Figma designs",
        },
        {
          "@type": "SoftwareApplication",
          name: "Annotation Prompts",
          applicationCategory: "Design Tool",
          description: "Streamline design annotations and documentation",
        },
        {
          "@type": "SoftwareApplication",
          name: "Override Prompts",
          applicationCategory: "Design Tool",
          description: "Manage component overrides efficiently",
        },
        {
          "@type": "SoftwareApplication",
          name: "Connector Prompts",
          applicationCategory: "Design Tool",
          description: "Automate connector and flow diagrams",
        },
        {
          "@type": "SoftwareApplication",
          name: "Vibe Design Prompts",
          applicationCategory: "Design Tool",
          description: "Enhance design aesthetics and visual appeal",
        },
      ],
    },
  };

  const prompts = await getPrompts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        data-oid="-0i.a06"
      />

      <Suspense
        fallback={<div data-oid="kyumcy6">Loading...</div>}
        data-oid="hxd42j3"
      >
        <PromptClient prompts={prompts} data-oid="qr95b3m" />
      </Suspense>
    </>
  );
}
