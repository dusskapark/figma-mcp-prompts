import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';
import PromptClient from './prompt-client';

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
    return await Promise.all(prompts.map(async prompt => ({
      slug: prompt.slug,
      title: prompt.entry.title,
      category: prompt.entry.category,
      language: prompt.entry.language || 'English',
      tags: [...(prompt.entry.tags || [])],
      content: prompt.entry.content ? await prompt.entry.content() : undefined,
    })));
  } catch (error) {
    console.error('Error loading prompts:', error);
    // 폴백 샘플 데이터
    return [
      {
        slug: 'auto-populate-realistic-content',
        title: 'Auto-populate with realistic content',
        category: 'auto-populate',
        tags: ['content', 'text', 'automation', 'realistic data'],
        language: 'English',
        content: '# Prompt\n\nPlease generate realistic content for all text layers in the selected design. Include names, addresses, product descriptions, and other relevant placeholder content that matches the context of the design.\n\n# How to Use\n\n1. Select the frame or component you want to populate\n2. Run this prompt\n3. The system will automatically fill text layers with contextual content'
      },
      {
        slug: 'design-annotations',
        title: 'Add design annotations automatically',
        category: 'annotation',
        tags: ['documentation', 'comments', 'review', 'handoff', 'collaboration'],
        language: 'English',
        content: '# Prompt\n\nCreate comprehensive design annotations for the selected elements, including spacing, typography, colors, and interaction notes for developer handoff.\n\n# How to Use\n\n1. Select the elements you want to annotate\n2. Run this prompt\n3. Review and customize the generated annotations'
      },
      {
        slug: 'component-overrides-batch',
        title: 'Swap component instances efficiently',
        category: 'overrides',
        tags: ['components', 'instances', 'batch', 'design system', 'efficiency'],
        language: 'English',
        content: '# Prompt\n\nEfficiently swap and update multiple component instances while preserving overrides and maintaining design system consistency.\n\n# How to Use\n\n1. Select multiple component instances\n2. Run this prompt\n3. Choose the target component to swap to'
      },
      {
        slug: 'prototype-to-figjam-connectors',
        title: 'Convert prototypes to FigJam connectors',
        category: 'connectors',
        tags: ['figjam', 'prototype', 'flowchart', 'documentation', 'user flows'],
        language: 'English',
        content: '# Prompt\n\nTransform your prototype connections into clean FigJam connector diagrams for better documentation and stakeholder communication.\n\n# How to Use\n\n1. Create your prototype flows in Figma\n2. Run this prompt on the selected frames\n3. Export or copy the generated connector diagram to FigJam'
      },
      {
        slug: 'creative-color-palettes',
        title: 'Generate creative color palettes',
        category: 'vibe-design',
        tags: ['colors', 'creative', 'inspiration', 'branding', 'aesthetics'],
        language: 'English',
        content: '# Prompt\n\nGenerate inspiring and harmonious color palettes based on mood, brand direction, or specific aesthetic requirements for your design project.\n\n# How to Use\n\n1. Describe the mood or brand direction you want\n2. Run this prompt\n3. Apply the generated colors to your design elements'
      },
      {
        slug: 'korean-content-generation',
        title: '한국어 콘텐츠 자동 생성',
        category: 'auto-populate',
        tags: ['한국어', '콘텐츠', '자동화', '로컬라이제이션'],
        language: '한국어',
        content: '# Prompt\n\n선택된 디자인의 모든 텍스트 레이어에 현실적인 한국어 콘텐츠를 자동으로 생성합니다. 이름, 주소, 제품 설명 등 디자인 맥락에 맞는 placeholder 콘텐츠를 포함합니다.\n\n# How to Use\n\n1. 콘텐츠를 채우고 싶은 프레임이나 컴포넌트를 선택하세요\n2. 이 프롬프트를 실행하세요\n3. 시스템이 자동으로 텍스트 레이어를 맥락에 맞는 콘텐츠로 채웁니다'
      }
    ];
  }
}

export default async function Home() {
  const prompts = await getPrompts();
  
  return <PromptClient prompts={prompts} />;
}
