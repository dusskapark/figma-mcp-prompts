"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import {
  Search,
  X,
  Filter,
  Globe,
  Wand2,
  MessageSquare,
  RefreshCw,
  GitBranch,
  Palette,
} from "lucide-react";

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
  { id: "auto-populate", title: "Auto Populate", icon: Wand2 },
  { id: "annotation", title: "Annotation", icon: MessageSquare },
  { id: "overrides", title: "Overrides", icon: RefreshCw },
  { id: "connectors", title: "Connectors", icon: GitBranch },
  { id: "vibe-design", title: "Vibe Design", icon: Palette },
];

const languages = ["English", "한국어", "中文"];

export default function PromptClient({ prompts }: PromptClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 초기값 읽어오기
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreLanguages, setShowMoreLanguages] = useState(false);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // URL 업데이트 함수
  const updateURL = useCallback(
    (
      newCategories: string[],
      newLanguages: string[],
      newTags: string[],
      newSearchQuery: string,
    ) => {
      const params = new URLSearchParams();

      if (newCategories.length > 0) {
        params.set("category", newCategories.join(","));
      }
      if (newLanguages.length > 0) {
        params.set("language", newLanguages.join(","));
      }
      if (newTags.length > 0) {
        params.set("tags", newTags.join(","));
      }
      if (newSearchQuery) {
        params.set("search", newSearchQuery);
      }

      const newURL = params.toString() ? `?${params.toString()}` : "/";
      router.replace(newURL, { scroll: false });
    },
    [router],
  );

  // 초기 URL에서 상태 설정
  useEffect(() => {
    const categories =
      searchParams.get("category")?.split(",").filter(Boolean) || [];
    const languages =
      searchParams.get("language")?.split(",").filter(Boolean) || [];
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const search = searchParams.get("search") || "";

    setSelectedCategories(categories);
    setSelectedLanguages(languages);
    setSelectedTags(tags);
    setSearchQuery(search);
  }, [searchParams]);

  // 모든 태그 수집
  const allTags = Array.from(new Set(prompts.flatMap((p) => p.tags)));

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(prompt.category);
    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.includes(prompt.language);
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => prompt.tags.includes(tag));
    const matchesSearch =
      !searchQuery ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesCategory && matchesLanguage && matchesTags && matchesSearch;
  });

  // HeroSection을 위한 실제 통계 데이터 계산
  const heroStats = [
    { value: `${prompts.length}+`, label: "Prompts" },
    { value: `${categories.length}`, label: "Categories" },
    { value: `${languages.length}`, label: "Languages" },
  ];

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPrompts = filteredPrompts.slice(startIndex, endIndex);

  // 디버깅을 위한 console.log
  console.log("Pagination Debug:", {
    totalPrompts: prompts.length,
    filteredPrompts: filteredPrompts.length,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedPrompts: paginatedPrompts.length,
    ITEMS_PER_PAGE,
  });

  // 필터가 변경되면 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedLanguages, selectedTags, searchQuery]);

  const handleTagToggle = (tag: string, checked: boolean) => {
    const newTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    updateURL(selectedCategories, selectedLanguages, newTags, searchQuery);
  };

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter((id) => id !== categoryId);
    setSelectedCategories(newCategories);
    updateURL(newCategories, selectedLanguages, selectedTags, searchQuery);
  };

  const handleLanguageToggle = (language: string, checked: boolean) => {
    const newLanguages = checked
      ? [...selectedLanguages, language]
      : selectedLanguages.filter((lang) => lang !== language);
    setSelectedLanguages(newLanguages);
    updateURL(selectedCategories, newLanguages, selectedTags, searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateURL(selectedCategories, selectedLanguages, selectedTags, value);
  };

  // Filter Section Component
  const FilterSection = ({ className = "" }: { className?: string }) => (
    <Card className={className} data-oid="t1alxwa">
      <CardHeader data-oid="b2qf_59">
        <CardTitle className="flex items-center gap-2" data-oid="2m:3d9-">
          <Filter className="h-4 w-4" data-oid="ak5d8m3" />
          Filter by
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6" data-oid="ukyc7s-">
        {/* Categories */}
        <div className="space-y-3" data-oid="q3rcu1n">
          <div className="flex items-center justify-between" data-oid="c6roshq">
            <Label data-oid="dj_fhga">Choose a category</Label>
            {selectedCategories.length > 0 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  setSelectedCategories([]);
                  updateURL([], selectedLanguages, selectedTags, searchQuery);
                }}
                className="h-auto p-0 text-xs text-primary"
                data-oid="a72saw_"
              >
                Reset
              </Button>
            )}
          </div>
          <div className="space-y-2" data-oid="cbpcpr9">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center space-x-2"
                data-oid="6.m.i8q"
              >
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryToggle(category.id, !!checked)
                  }
                  data-oid="gbadpix"
                />

                <Label
                  htmlFor={category.id}
                  className="text-sm font-normal flex items-center gap-2"
                  data-oid="y::ddfl"
                >
                  <category.icon className="h-3 w-3" data-oid="5:e:ch:" />

                  {category.title}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-3" data-oid="x_g1r2d">
          <div className="flex items-center justify-between" data-oid="adrmrqx">
            <Label data-oid="6.v-wqn">Language</Label>
            {selectedLanguages.length > 0 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  setSelectedLanguages([]);
                  updateURL(selectedCategories, [], selectedTags, searchQuery);
                }}
                className="h-auto p-0 text-xs text-primary"
                data-oid="bxf0rjj"
              >
                Reset
              </Button>
            )}
          </div>
          <div className="space-y-2" data-oid="qlpc3cx">
            {languages
              .slice(0, showMoreLanguages ? languages.length : 5)
              .map((language) => (
                <div
                  key={language}
                  className="flex items-center space-x-2"
                  data-oid="nsengkf"
                >
                  <Checkbox
                    id={`lang-${language}`}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={(checked) =>
                      handleLanguageToggle(language, !!checked)
                    }
                    data-oid="6p__5rn"
                  />

                  <Label
                    htmlFor={`lang-${language}`}
                    className="text-sm font-normal"
                    data-oid="51g_x_y"
                  >
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
                data-oid=":59v8jr"
              >
                {showMoreLanguages ? "Less" : "More"}
              </Button>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-3" data-oid="wkcjqy7">
          <div className="flex items-center justify-between" data-oid="vd5zgwy">
            <Label data-oid="v0s_hld">Tags</Label>
            {selectedTags.length > 0 && (
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  setSelectedTags([]);
                  updateURL(
                    selectedCategories,
                    selectedLanguages,
                    [],
                    searchQuery,
                  );
                }}
                className="h-auto p-0 text-xs text-primary"
                data-oid="hxth9f7"
              >
                Reset
              </Button>
            )}
          </div>
          <div className="space-y-2" data-oid="e2411fp">
            {allTags.slice(0, showMoreTags ? allTags.length : 5).map((tag) => (
              <div
                key={tag}
                className="flex items-center space-x-2"
                data-oid="a9o20iu"
              >
                <Checkbox
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={(checked) => handleTagToggle(tag, !!checked)}
                  data-oid="8dt061-"
                />

                <Label
                  htmlFor={tag}
                  className="text-sm font-normal"
                  data-oid="8r:tfic"
                >
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
                data-oid="ro1l-60"
              >
                {showMoreTags ? "Less" : "More"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background" data-oid="8b:_9.m">
      {/* Hero Section */}
      <HeroSection stats={heroStats} data-oid="cau3hb3" />

      <div
        id="prompts"
        className="container mx-auto px-4 py-8"
        data-oid="980.:p_"
      >
        <div className="flex flex-col lg:flex-row gap-8" data-oid="4zppyye">
          {/* Desktop Left Sidebar - Filters */}
          <div
            className="hidden lg:block w-80 flex-shrink-0"
            data-oid="5y1h.8k"
          >
            <FilterSection className="sticky top-8" data-oid="nrm50hj" />
          </div>

          {/* Right Content - Prompt Cards */}
          <div className="flex-1" data-oid="50f8ts0">
            <div className="mb-6" data-oid="yo4xfg:">
              {/* Mobile Filter Button */}
              <div
                className="flex items-center justify-between mb-4 lg:hidden"
                data-oid="b_7ce12"
              >
                <h2
                  className="text-2xl font-semibold tracking-tight"
                  data-oid="fwajn0p"
                >
                  {filteredPrompts.length} Prompts
                </h2>
                <Sheet
                  open={isFilterOpen}
                  onOpenChange={setIsFilterOpen}
                  data-oid="n.dicag"
                >
                  <SheetTrigger asChild data-oid="prq6dgg">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      data-oid="ierzv.s"
                    >
                      <Filter className="h-4 w-4" data-oid="78vn.mp" />
                      Filters
                      {selectedCategories.length +
                        selectedLanguages.length +
                        selectedTags.length >
                        0 && (
                        <Badge
                          variant="secondary"
                          className="ml-1 px-1.5 py-0.5 text-xs"
                          data-oid="d538t3n"
                        >
                          {selectedCategories.length +
                            selectedLanguages.length +
                            selectedTags.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-80 overflow-y-auto"
                    data-oid="q6my7v4"
                  >
                    <SheetHeader data-oid="jc1mhcr">
                      <SheetTitle data-oid="qcbqd1s">Filters</SheetTitle>
                      <SheetDescription data-oid="s8smssf">
                        Filter prompts by category, language, and tags
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6" data-oid="82dw.58">
                      <FilterSection data-oid="j2zxodj" />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block" data-oid="k_nwkel">
                <h2
                  className="text-2xl font-semibold tracking-tight"
                  data-oid=":30ukf-"
                >
                  {filteredPrompts.length} Prompts
                  {totalPages > 1 && (
                    <span
                      className="text-sm font-normal text-muted-foreground ml-2"
                      data-oid="rodpo2r"
                    >
                      (Page {currentPage} of {totalPages})
                    </span>
                  )}
                </h2>
              </div>

              <p className="text-muted-foreground" data-oid="y9ncp:8">
                Explore our curated collection of Figma MCP prompts
                {prompts.length !== filteredPrompts.length && (
                  <span className="block text-sm mt-1" data-oid="1t.-495">
                    Showing {paginatedPrompts.length} of{" "}
                    {filteredPrompts.length} filtered results from{" "}
                    {prompts.length} total prompts
                  </span>
                )}
              </p>

              {/* Search */}
              <div className="mt-4 space-y-3" data-oid="0sl01u5">
                <div className="relative max-w-md" data-oid="1ukv8gx">
                  <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    data-oid="yhi9kzs"
                  />

                  <Input
                    placeholder="Search our prompts"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                    data-oid="k.-0jn9"
                  />
                </div>

                {/* Selected Filters as Chips */}
                {(selectedCategories.length > 0 ||
                  selectedLanguages.length > 0 ||
                  selectedTags.length > 0) && (
                  <div className="flex flex-wrap gap-2" data-oid="smq0.y6">
                    {selectedCategories.map((categoryId) => {
                      const category = categories.find(
                        (c) => c.id === categoryId,
                      );
                      return (
                        <Badge
                          key={categoryId}
                          variant="secondary"
                          className="flex items-center gap-1"
                          data-oid="6g1p-tk"
                        >
                          {category?.icon && (
                            <category.icon
                              className="h-3 w-3"
                              data-oid="sw_zy73"
                            />
                          )}
                          <span data-oid="vw91k.o">{category?.title}</span>
                          <button
                            onClick={() =>
                              handleCategoryToggle(categoryId, false)
                            }
                            className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                            data-oid="7r-ispu"
                          >
                            <X className="h-3 w-3" data-oid="qxj7lx3" />
                          </button>
                        </Badge>
                      );
                    })}

                    {selectedLanguages.map((language) => (
                      <Badge
                        key={language}
                        variant="secondary"
                        className="flex items-center gap-1"
                        data-oid="v1jnb0_"
                      >
                        <Globe className="h-3 w-3" data-oid="j4rsrju" />
                        <span data-oid="7n6pvp:">{language}</span>
                        <button
                          onClick={() => handleLanguageToggle(language, false)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                          data-oid="cp2.jqw"
                        >
                          <X className="h-3 w-3" data-oid="plfa24x" />
                        </button>
                      </Badge>
                    ))}

                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                        data-oid="o0r4gth"
                      >
                        <span data-oid="m8:3tne">{tag}</span>
                        <button
                          onClick={() => handleTagToggle(tag, false)}
                          className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                          data-oid="4lrvi43"
                        >
                          <X className="h-3 w-3" data-oid="yg18z.a" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              data-oid="7.pgf8s"
            >
              {paginatedPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.slug}
                  prompt={prompt}
                  data-oid="j9q8o8:"
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8" data-oid="6nncg2x">
                <Pagination data-oid="dxl4p-b">
                  <PaginationContent data-oid="xonfgj-">
                    <PaginationItem data-oid=":ze-x7l">
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={
                          currentPage <= 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                        data-oid="kwu1hs5"
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page} data-oid="0:o23j7">
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={currentPage === page}
                            data-oid="wcy0bdq"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}

                    <PaginationItem data-oid="frn45_2">
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1);
                        }}
                        className={
                          currentPage >= totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                        data-oid="hs5znq8"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {filteredPrompts.length === 0 && (
              <Card className="p-12 text-center" data-oid="gmldp_9">
                <div className="text-6xl mb-4 opacity-50" data-oid="k47-_lu">
                  🔍
                </div>
                <CardTitle className="mb-2" data-oid="w98:37_">
                  No prompts found
                </CardTitle>
                <CardDescription data-oid="yd0s79-">
                  Try adjusting your filters or search query to find what
                  you&apos;re looking for.
                </CardDescription>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Contributors Section */}
      <Contributors data-oid="gy_:yi8" />

      {/* Footer */}
      <Footer data-oid="4fvl:f-" />
    </div>
  );
}
