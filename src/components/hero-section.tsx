'use client';

import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Sparkles, ChevronDown, ExternalLink } from "lucide-react";
import TypeIt from "typeit";

interface StatItem {
  value: string;
  label: string;
}

interface HeroSectionProps {
  stats?: StatItem[];
}

export default function HeroSection({ stats = [] }: HeroSectionProps) {
  const typeItRef = useRef<HTMLSpanElement>(null);

  // 기본 통계 데이터
  const defaultStats: StatItem[] = [
    { value: "50+", label: "Prompts" },
    { value: "5", label: "Categories" },
    { value: "3", label: "Languages" }
  ];

  // props로 받은 stats가 있으면 사용하고, 없으면 기본값 사용
  const displayStats = stats.length > 0 ? stats : defaultStats;

  useEffect(() => {
    if (typeItRef.current) {
      new TypeIt(typeItRef.current, {
        speed: 80,
        waitUntilVisible: true,
        loop: false,
      })
        .type("Design Workflow", { delay: 2500 })
        .delete(8) // "Workflow" 삭제 (8글자)
        .type("Tasks", { delay: 2000 })
        .delete(5) // "Tasks" 삭제 (5글자)
        .type("Annotations", { delay: 2000 })
        .delete(11) // "Annotations" 삭제 (11글자)
        .type("Handoff", { delay: 2000 })
        .delete(7) // "Handoff" 삭제 (7글자)
        .type("Documentation", { delay: 2000 })
        .delete(13) // "Documentation" 삭제 (13글자)
        .type("with MCP", { delay: 2000 })
        .go();
    }
  }, []);

  const handlePlaygroundLink = (url: string) => {
    console.log('Playground link clicked:', url);
    // 새 창에서 Figma 파일 열기
    try {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        console.log('Popup blocked, redirecting in current window');
        // 팝업이 차단된 경우 현재 창에서 열기
        window.location.href = url;
      } else {
        console.log('Opened in new window successfully');
      }
    } catch (error) {
      console.error('Failed to open playground link:', error);
      // 오류 발생 시 현재 창에서 열기
      window.location.href = url;
    }
  };

  const handleTutorialVideo = () => {
    window.open('https://youtube.com/playlist?list=PLLQlZaiiGlHOdfqGoErLQaMaDPZdHARVV&si=uCGpp7BwXerIhtbV', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 pt-14">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-8 lg:py-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Content */}
          <div className="space-y-3">
            <Badge variant="secondary" className="text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              Figma MCP Integration
            </Badge>
            
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight">
              Automate Your
              <span 
                ref={typeItRef}
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block min-h-[1.2em]"
              >
                {" "}
              </span>
            </h1>
            
            {/* <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Discover powerful MCP prompts that automate your design process. 
              Streamline your workflow with AI-powered automation.
            </p> */}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center relative z-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg relative z-20"
                  type="button"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Try Playground
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-50">
                <DropdownMenuLabel>Choose Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onSelect={(e) => {
                    e.preventDefault();
                    handlePlaygroundLink('https://www.figma.com/design/Ou0fh46uSOmaRbkdqWo57T/Design-Automation-with-Figma-MCP?m=auto&t=0LVAyGuJEf2451x8-6');
                  }}
                  className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  English Playground
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onSelect={(e) => {
                    e.preventDefault();
                    handlePlaygroundLink('https://www.figma.com/design/58mNjcrt16BdyaoeIAaqRE/%EC%9E%91%EC%97%85-%EC%8B%9C%EA%B0%84%EC%9D%84-%EB%8B%A8%EC%B6%95%ED%95%B4%EC%A3%BC%EB%8A%94--MCP-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%98%A4%ED%86%A0%EB%A9%94%EC%9D%B4%EC%85%98-?m=auto&t=0LVAyGuJEf2451x8-6');
                  }}
                  className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  한국어 플레이그라운드
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="lg" variant="secondary" onClick={handleTutorialVideo} className="relative z-20">
              <ExternalLink className="h-5 w-5 mr-2" />
              Tutorial Videos
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 pt-2">
            {displayStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 