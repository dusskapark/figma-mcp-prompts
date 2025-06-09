import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Wand2,
  MessageSquare,
  RefreshCw,
  GitBranch,
  Palette,
} from "lucide-react";
import { toast } from "sonner";

interface Prompt {
  slug: string;
  title: string;
  category: string;
  language: string;
  tags: string[];
  content?: string;
}

interface PromptCardProps {
  prompt: Prompt;
}

const categories = [
  { id: "design-generation", title: "Design Generation", icon: Wand2 },
  { id: "content-creation", title: "Content Creation", icon: MessageSquare },
  { id: "workflow-automation", title: "Workflow Automation", icon: RefreshCw },
  { id: "version-control", title: "Version Control", icon: GitBranch },
  { id: "design-system", title: "Design System", icon: Palette },
];

export default function PromptCard({ prompt }: PromptCardProps) {
  const category = categories.find((c) => c.id === prompt.category);

  const handleCopyPrompt = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link 네비게이션 방지
    e.stopPropagation(); // 이벤트 버블링 방지

    try {
      await navigator.clipboard.writeText(prompt.content || "");
      toast.success("Prompt copied to clipboard!");
    } catch {
      toast.error("Failed to copy prompt.");
    }
  };

  return (
    <Link href={`/prompts/${prompt.slug}`} data-oid="yvskzb7">
      <Card
        className="group hover:shadow-lg transition-all duration-200 cursor-pointer h-full flex flex-col"
        data-oid="l_4f-k5"
      >
        <CardHeader className="pb-3 flex-shrink-0" data-oid="79ep33o">
          <div className="flex items-start justify-between" data-oid="aai82v3">
            <Badge
              variant="secondary"
              className="text-xs flex items-center gap-1"
              data-oid="-p6qhi8"
            >
              <Globe className="h-3 w-3" data-oid="k1s.0fx" />
              {prompt.language}
            </Badge>
          </div>
          <CardTitle
            className="text-lg leading-6 line-clamp-2"
            data-oid="rywem8r"
          >
            {prompt.title}
          </CardTitle>
          <div className="relative group/description" data-oid="rms761z">
            <CardDescription
              className="line-clamp-3 text-sm flex-1 group-hover/description:opacity-50 transition-opacity duration-200"
              data-oid="o.4rg4t"
            >
              {prompt.content
                ? prompt.content.substring(0, 150) + "..."
                : "No content available"}
            </CardDescription>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyPrompt}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/description:opacity-100 transition-opacity duration-200 bg-background/95 backdrop-blur-sm shadow-lg border px-3 py-1 text-xs font-medium"
              title="Copy prompt"
              data-oid="bom.5bh"
            >
              Copy
            </Button>
          </div>
        </CardHeader>
        <CardContent
          className="pt-0 flex-1 flex flex-col justify-end"
          data-oid="7xdek66"
        >
          <div className="space-y-3" data-oid="6nog5nd">
            <Badge
              variant="outline"
              className="font-medium flex items-center gap-1 w-fit"
              data-oid="pp72ov8"
            >
              {category?.icon && (
                <category.icon className="h-3 w-3" data-oid="a_5ouqm" />
              )}
              {category?.title}
            </Badge>

            <div className="flex flex-wrap gap-1" data-oid="yfzh2c9">
              {prompt.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs"
                  data-oid="7:m69ap"
                >
                  {tag}
                </Badge>
              ))}
              {prompt.tags.length > 3 && (
                <Badge
                  variant="secondary"
                  className="text-xs"
                  data-oid="bmvcdez"
                >
                  +{prompt.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
