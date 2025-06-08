'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import HeroSection from "@/components/hero-section";
import Contributors from "@/components/contributors";
import Footer from "@/components/footer";
import PromptCard from "@/components/prompt-card";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, X, Filter, Globe, Wand2, MessageSquare, RefreshCw, GitBranch, Palette } from "lucide-react";

interface Prompt {
  slug: string;
  title: string;
  category: string;
  language: string;
  tags: string[];
  content?: string;
}

interface PromptClientProps {
  prompts: Prompt[];
}

const categories = [
  { id: 'auto-populate', title: 'Auto Populate', icon: Wand2 },
  { id: 'annotation', title: 'Annotation', icon: MessageSquare },
  { id: 'overrides', title: 'Overrides', icon: RefreshCw },
  { id: 'connectors', title: 'Connectors', icon: GitBranch },
  { id: 'vibe-design', title: 'Vibe Design', icon: Palette }
];

const languages = ['English', '한국어', '中文'];

export default function PromptClient({ prompts }: PromptClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // URL에서 초기값 읽어오기
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreLanguages, setShowMoreLanguages] = useState(false);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  // URL 업데이트 함수
  const updateURL = useCallback((newCategories: string[], newLanguages: string[], newTags: string[], newSearchQuery: string) => {
    const params = new URLSearchParams();
    
    if (newCategories.length > 0) {
      params.set('category', newCategories.join(','));
    }
    if (newLanguages.length > 0) {
      params.set('language', newLanguages.join(','));
    }
    if (newTags.length > 0) {
      params.set('tags', newTags.join(','));
    }
    if (newSearchQuery) {
      params.set('search', newSearchQuery);
    }
    
    const newURL = params.toString() ? `?${params.toString()}` : '/';
    router.replace(newURL, { scroll: false });
  }, [router]);

  // 초기 URL에서 상태 설정
  useEffect(() => {
    const categories = searchParams.get('category')?.split(',').filter(Boolean) || [];
    const languages = searchParams.get('language')?.split(',').filter(Boolean) || [];
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const search = searchParams.get('search') || '';
    
    setSelectedCategories(categories);
    setSelectedLanguages(languages);
    setSelectedTags(tags);
    setSearchQuery(search);
  }, [searchParams]);

  // 모든 태그 수집
  const allTags = Array.from(new Set(prompts.flatMap(p => p.tags)));

  const filteredPrompts = prompts.filter(prompt => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(prompt.category);
    const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(prompt.language);
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => prompt.tags.includes(tag));
    const matchesSearch = !searchQuery || 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesLanguage && matchesTags && matchesSearch;
  });

  // HeroSection을 위한 실제 통계 데이터 계산
  const heroStats = [
    { value: `${prompts.length}+`, label: "Prompts" },
    { value: `${categories.length}`, label: "Categories" },
    { value: `${languages.length}`, label: "Languages" }
  ];

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPrompts = filteredPrompts.slice(startIndex, endIndex);

  // 디버깅을 위한 console.log
  console.log('Pagination Debug:', {
    totalPrompts: prompts.length,
    filteredPrompts: filteredPrompts.length,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedPrompts: paginatedPrompts.length,
    ITEMS_PER_PAGE
  });

  // 필터가 변경되면 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedLanguages, selectedTags, searchQuery]);

  const handleTagToggle = (tag: string, checked: boolean) => {
    const newTags = checked 
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
    setSelectedTags(newTags);
    updateURL(selectedCategories, selectedLanguages, newTags, searchQuery);
  };

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    const newCategories = checked 
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter(id => id !== categoryId);
    setSelectedCategories(newCategories);
    updateURL(newCategories, selectedLanguages, selectedTags, searchQuery);
  };

  const handleLanguageToggle = (language: string, checked: boolean) => {
    const newLanguages = checked 
      ? [...selectedLanguages, language]
      : selectedLanguages.filter(lang => lang !== language);
    setSelectedLanguages(newLanguages);
    updateURL(selectedCategories, newLanguages, selectedTags, searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURL(selectedCategories, selectedLanguages, selectedTags, value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection stats={heroStats} />

      <div id="prompts" className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className="w-80 flex-shrink-0">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter by
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Choose a category</Label>
                    {selectedCategories.length > 0 && (
                      <Button 
                        variant="link" 
                        size="sm"
                        onClick={() => {
                          setSelectedCategories([]);
                          updateURL([], selectedLanguages, selectedTags, searchQuery);
                        }}
                        className="h-auto p-0 text-xs text-primary"
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.id}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => handleCategoryToggle(category.id, !!checked)}
                        />
                        <Label htmlFor={category.id} className="text-sm font-normal flex items-center gap-2">
                          <category.icon className="h-3 w-3" />
                          {category.title}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Language</Label>
                    {selectedLanguages.length > 0 && (
                      <Button 
                        variant="link" 
                        size="sm"
                        onClick={() => {
                          setSelectedLanguages([]);
                          updateURL(selectedCategories, [], selectedTags, searchQuery);
                        }}
                        className="h-auto p-0 text-xs text-primary"
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {languages.slice(0, showMoreLanguages ? languages.length : 5).map(language => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={`lang-${language}`}
                          checked={selectedLanguages.includes(language)}
                          onCheckedChange={(checked) => handleLanguageToggle(language, !!checked)}
                        />
                        <Label htmlFor={`lang-${language}`} className="text-sm font-normal">
                          {language}
                        </Label>
                      </div>
                    ))}
                    {languages.length > 5 && (
                      <Button 
                        variant="link" 
                        size="sm"
                        onClick={() => setShowMoreLanguages(!showMoreLanguages)}
                        className="h-auto p-0 text-xs text-muted-foreground"
                      >
                        {showMoreLanguages ? 'Less' : 'More'}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Tags</Label>
                    {selectedTags.length > 0 && (
                      <Button 
                        variant="link" 
                        size="sm"
                        onClick={() => {
                          setSelectedTags([]);
                          updateURL(selectedCategories, selectedLanguages, [], searchQuery);
                        }}
                        className="h-auto p-0 text-xs text-primary"
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {allTags.slice(0, showMoreTags ? allTags.length : 5).map(tag => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={tag}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={(checked) => handleTagToggle(tag, !!checked)}
                        />
                        <Label htmlFor={tag} className="text-sm font-normal">
                          {tag}
                        </Label>
                      </div>
                    ))}
                    {allTags.length > 5 && (
                      <Button 
                        variant="link" 
                        size="sm"
                        onClick={() => setShowMoreTags(!showMoreTags)}
                        className="h-auto p-0 text-xs text-muted-foreground"
                      >
                        {showMoreTags ? 'Less' : 'More'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Prompt Cards */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                {filteredPrompts.length} Prompts 
                {totalPages > 1 && (
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    (Page {currentPage} of {totalPages})
                  </span>
                )}
              </h2>
              <p className="text-muted-foreground">
                Explore our curated collection of Figma MCP prompts
                {prompts.length !== filteredPrompts.length && (
                  <span className="block text-sm mt-1">
                    Showing {paginatedPrompts.length} of {filteredPrompts.length} filtered results from {prompts.length} total prompts
                  </span>
                )}
              </p>
              
              {/* Search */}
              <div className="mt-4 space-y-3">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search our prompts"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {/* Selected Filters as Chips */}
                {(selectedCategories.length > 0 || selectedLanguages.length > 0 || selectedTags.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(categoryId => {
                      const category = categories.find(c => c.id === categoryId);
                      return (
                        <Badge 
                          key={categoryId} 
                          variant="secondary" 
                          className="flex items-center gap-1"
                        >
                          {category?.icon && <category.icon className="h-3 w-3" />}
                          <span>{category?.title}</span>
                          <button
                            onClick={() => handleCategoryToggle(categoryId, false)}
                            className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                    
                    {selectedLanguages.map(language => (
                      <Badge 
                        key={language} 
                        variant="secondary" 
                        className="flex items-center gap-1"
                      >
                        <Globe className="h-3 w-3" />
                        <span>{language}</span>
                        <button
                          onClick={() => handleLanguageToggle(language, false)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    
                    {selectedTags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="flex items-center gap-1"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleTagToggle(tag, false)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedPrompts.map(prompt => (
                <PromptCard key={prompt.slug} prompt={prompt} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {filteredPrompts.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4 opacity-50">🔍</div>
                <CardTitle className="mb-2">No prompts found</CardTitle>
                <CardDescription>
                  Try adjusting your filters or search query to find what you&apos;re looking for.
                </CardDescription>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      {/* Contributors Section */}
      <Contributors />
      
      {/* Footer */}
      <Footer />
    </div>
  );
} 