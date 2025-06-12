"use client";

import { useEffect, useRef } from "react";
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
import { Sparkles, ChevronDown, ExternalLink, Youtube } from "lucide-react";
import TypeIt from "typeit";

interface StatItem {
  value: string;
  label: string;
}

interface HeroSectionProps {
  stats?: StatItem[];
}

// Figma 아이콘 SVG 컴포넌트
const FigmaIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    data-oid="s19x55p"
  >
    <path
      d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.02-3.019-3.02h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.019 3.019 3.019h3.117v-6.039H8.148z"
      data-oid="7copltl"
    />
    <path
      d="M8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49c2.489 0 4.515 2.014 4.515 4.49S10.661 24 8.172 24zm.013-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02 3.019-1.355 3.019-3.02-1.354-3.019-3.019-3.019z"
      data-oid="0kw.ta9"
    />
    <path
      d="M15.83 15.48c-2.489 0-4.515-2.014-4.515-4.49s2.026-4.49 4.515-4.49 4.49 2.014 4.49 4.49-2.001 4.49-4.49 4.49zm0-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02 3.019-1.355 3.019-3.02-1.354-3.019-3.019-3.019z"
      data-oid="q:arn4t"
    />
  </svg>
);

export default function HeroSection({ stats = [] }: HeroSectionProps) {
  const typeItRef = useRef<HTMLSpanElement>(null);

  // 기본 통계 데이터
  const defaultStats: StatItem[] = [
    { value: "50+", label: "Prompts" },
    { value: "5", label: "Categories" },
    { value: "3", label: "Languages" },
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
    console.log("Playground link clicked:", url);
    // 새 창에서 Figma 파일 열기
    try {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (!newWindow) {
        console.log("Popup blocked, redirecting in current window");
        // 팝업이 차단된 경우 현재 창에서 열기
        window.location.href = url;
      } else {
        console.log("Opened in new window successfully");
      }
    } catch (error) {
      console.error("Failed to open playground link:", error);
      // 오류 발생 시 현재 창에서 열기
      window.location.href = url;
    }
  };

  const handleTutorialVideo = () => {
    window.open(
      "https://youtube.com/playlist?list=PLLQlZaiiGlHOdfqGoErLQaMaDPZdHARVV&si=uCGpp7BwXerIhtbV",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 pt-14"
      data-oid=":9p0j4q"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"
        data-oid="1h:sajd"
      ></div>

      <div
        className="container mx-auto px-4 py-8 lg:py-12 relative z-10"
        data-oid="qu8g577"
      >
        <div
          className="max-w-3xl mx-auto text-center space-y-6"
          data-oid="4ny.q4q"
        >
          {/* Content */}
          <div className="space-y-3" data-oid="dcq2_m9">
            <Badge
              variant="secondary"
              className="text-sm font-medium"
              data-oid="266klu_"
            >
              <Sparkles className="h-4 w-4 mr-2" data-oid=".uth3-x" />
              Figma MCP Integration
            </Badge>

            <h1
              className="text-3xl lg:text-5xl font-bold tracking-tight"
              data-oid="d4aujvr"
            >
              Automate Your
              <span
                ref={typeItRef}
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block min-h-[1.2em]"
                data-oid="cb3mgl_"
              >
                {" "}
              </span>
            </h1>

            {/* <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
                  Discover powerful MCP prompts that automate your design process. 
                  Streamline your workflow with AI-powered automation.
                 </p> */}
          </div>

          <div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center relative z-20"
            data-oid="a98lv2b"
          >
            <DropdownMenu data-oid="ry3-qhv">
              <DropdownMenuTrigger asChild data-oid="h7yuqz-">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg relative z-20"
                  type="button"
                  data-oid="rj.7ag:"
                >
                  <FigmaIcon className="h-5 w-5 mr-2" data-oid="kf:092t" />
                  Try Playground
                  <ChevronDown className="h-4 w-4 ml-2" data-oid="3b:bvgg" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-50" data-oid="uf1a:01">
                <DropdownMenuLabel data-oid="76k0aj8">
                  Choose Language
                </DropdownMenuLabel>
                <DropdownMenuSeparator data-oid="xgjecnt" />
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    handlePlaygroundLink(
                      "https://www.figma.com/community/file/1513760524697897204",
                    );
                  }}
                  className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                  data-oid="4mjvwfp"
                >
                  <ExternalLink className="h-4 w-4 mr-2" data-oid="l..4a:t" />
                  English Playground
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    handlePlaygroundLink(
                      "https://www.figma.com/community/file/1513759391089024242",
                    );
                  }}
                  className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                  data-oid="hfb1apq"
                >
                  <ExternalLink className="h-4 w-4 mr-2" data-oid="0vqkagk" />
                  한국어 플레이그라운드
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="lg"
              variant="secondary"
              onClick={handleTutorialVideo}
              className="relative z-20"
              data-oid="kdzanip"
            >
              <Youtube className="h-5 w-5 mr-2" data-oid="47ye1n:" />
              Tutorial Videos
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 pt-2" data-oid="y7vnhpg">
            {displayStats.map((stat, index) => (
              <div key={index} className="text-center" data-oid="-qg1l3e">
                <div
                  className="text-xl font-bold text-primary"
                  data-oid="ugs:8ee"
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs text-muted-foreground"
                  data-oid="5sc-iv0"
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
