import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../../keystatic.config';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ArrowLeft, Globe, Wand2, MessageSquare, RefreshCw, GitBranch, Palette } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import React from 'react';

const reader = createReader(process.cwd(), keystaticConfig);

interface Prompt {
  slug: string;
  title: string;
  category: string;
  language: string;
  tags: string[];
  content: string;
}

const categories = [
  { id: 'auto-populate', title: 'Auto Populate', icon: Wand2 },
  { id: 'annotation', title: 'Annotation', icon: MessageSquare },
  { id: 'overrides', title: 'Overrides', icon: RefreshCw },
  { id: 'connectors', title: 'Connectors', icon: GitBranch },
  { id: 'vibe-design', title: 'Vibe Design', icon: Palette }
];

// 마크다운 콘텐츠에서 섹션 파싱
function parseContent(content: string) {
  const sections = content.split(/^# /gm).filter(Boolean);
  const parsed: { [key: string]: string } = {};
  
  sections.forEach(section => {
    const lines = section.trim().split('\n');
    const title = lines[0].toLowerCase().replace(/\s+/g, '');
    const content = lines.slice(1).join('\n').trim();
    parsed[title] = content;
  });
  
  return {
    prompt: parsed.prompt || '',
    howto: parsed.howtouse || parsed.howto || ''
  };
}

async function getPrompt(slug: string): Promise<Prompt | null> {
  try {
    const prompt = await reader.collections.prompts.read(slug);
    if (!prompt) return null;
    
    const content = await prompt.content();
    return {
      slug,
      title: prompt.title,
      category: prompt.category,
      language: prompt.language || 'English',
      tags: [...(prompt.tags || [])],
      content
    };
  } catch (error) {
    console.error('Error loading prompt:', error);
    return null;
  }
}



export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = await getPrompt(slug);
  
  if (!prompt) {
    notFound();
  }
  
  const category = categories.find(c => c.id === prompt.category);
  const { prompt: promptContent, howto: howToContent } = parseContent(prompt.content);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">
                {prompt.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {category?.icon && <category.icon className="h-4 w-4" />}
                <span>{category?.title}</span>
                <Separator orientation="vertical" className="h-4" />
                <Globe className="h-4 w-4" />
                <span>{prompt.language}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {prompt.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Prompt Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Prompt</CardTitle>
                  <CopyButton text={promptContent} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm">
                    {promptContent}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* How to Use Section */}
            {howToContent && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How to Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-ol:list-decimal prose-ul:list-disc prose-ol:pl-6 prose-ul:pl-6 prose-li:my-1">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 my-4">{children}</ol>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-2 my-4">{children}</ul>,
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        a: ({ href, children, className }) => {
                          // figma-button 클래스가 있으면 shadcn 버튼으로 렌더링
                          if (className?.includes('figma-button')) {
                            return (
                              <Button variant="outline" size="sm" asChild className="my-2">
                                <a 
                                  href={href} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M15.332 8.668a3.333 3.333 0 0 0 0-6.663H8.668a3.333 3.333 0 0 0 0 6.663 3.333 3.333 0 0 0 0 6.665 3.333 3.333 0 0 0 0 6.664A3.334 3.334 0 0 0 12.001 18v-4.665h3.331a3.333 3.333 0 0 0 0-6.667Z"/>
                                    <circle cx="15.332" cy="12" r="3.332"/>
                                  </svg>
                                  {children}
                                </a>
                              </Button>
                            );
                          }
                          
                          // 일반 링크는 기존 스타일
                          return (
                            <a 
                              href={href} 
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2 hover:underline-offset-4 transition-all"
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          );
                        },
                        p: ({ children }) => {
                          // 이미지만 포함된 p 태그인지 확인
                          const hasOnlyImage = React.Children.toArray(children).every(child => {
                            return React.isValidElement(child) && (child.type === 'img' || (child.props && child.props.src));
                          });
                          
                          if (hasOnlyImage) {
                            return <div className="my-4">{children}</div>;
                          }
                          
                          return <p className="my-3 leading-relaxed">{children}</p>;
                        },
                        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        h1: ({ children }) => <h1 className="text-lg font-semibold text-foreground mt-6 mb-3">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-semibold text-foreground mt-5 mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-semibold text-foreground mt-4 mb-2">{children}</h3>,
                        table: ({ children }) => (
                          <div className="my-4 overflow-x-auto">
                            <table className="min-w-full border-collapse border border-border rounded-lg">
                              {children}
                            </table>
                          </div>
                        ),
                        thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => <tr className="border-b border-border">{children}</tr>,
                        th: ({ children }) => (
                          <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td className="border border-border px-4 py-2 text-muted-foreground">
                            {children}
                          </td>
                        ),
                        img: ({ src, alt }) => {
                          if (!src) return null;
                          
                          // 이미지 경로 정규화
                          let imageSrc = src;
                          if (!src.startsWith('http') && !src.startsWith('/')) {
                            // 상대 경로인 경우 /assets/ 추가
                            imageSrc = `/assets/${src}`;
                          }
                          
                          // 모든 이미지에 Next.js Image 사용
                          return (
                            <Image
                              src={imageSrc}
                              alt={alt || ''}
                              width={600}
                              height={400}
                              className="w-full h-auto object-cover rounded-lg border my-4"
                              priority={false}
                            />
                          );
                        },
                      }}
                    >
                      {howToContent}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 