"use client";

import * as React from "react";
import Link from "next/link";
import { Github, ExternalLink, Plus } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import McpLogo from "@/components/mcp-logo";
import { ThemeToggle } from "@/components/theme-toggle";

const resources = [
  {
    title: "English Playground",
    href: "https://www.figma.com/community/file/1513760524697897204",
    description: "Try MCP prompts in English Figma playground",
  },
  {
    title: "한국어 플레이그라운드",
    href: "https://www.figma.com/community/file/1513759391089024242",
    description: "한국어 Figma 플레이그라운드에서 MCP 프롬프트 체험",
  },
  {
    title: "Tutorial Videos",
    href: "https://youtube.com/playlist?list=PLLQlZaiiGlHOdfqGoErLQaMaDPZdHARVV&si=uCGpp7BwXerIhtbV",
    description: "Watch step-by-step tutorials on YouTube",
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="p-1.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <McpLogo className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <span className="hidden sm:inline">Figma </span>
            MCP Magic
          </span>
        </Link>

        {/* Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                  {resources.map((resource) => (
                    <ListItem
                      key={resource.title}
                      title={resource.title}
                      href={resource.href}
                    >
                      {resource.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <a
                  href="#prompts"
                  className="text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("prompts")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Prompts
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden sm:inline-flex"
          >
            <a
              href="https://github.com/dusskapark/figma-mcp-prompts"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </Button>
          <ThemeToggle />
          <Button
            size="sm"
            onClick={() =>
              window.open(
                "https://github.com/dusskapark/figma-mcp-prompts/blob/main/CONTRIBUTING.md",
                "_blank",
                "noopener,noreferrer",
              )
            }
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Prompt
          </Button>
        </div>
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
        >
          <div className="text-sm font-medium leading-none flex items-center">
            {title}
            <ExternalLink className="h-3 w-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
}
