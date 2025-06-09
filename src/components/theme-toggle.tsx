"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 px-0" data-oid="rwd9zew">
        <span className="sr-only" data-oid="6eqjfp7">
          Toggle theme
        </span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-9 px-0"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      data-oid="se:2si-"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" data-oid="qdqt9-j" />
      ) : (
        <Sun className="h-4 w-4" data-oid=".sqar2m" />
      )}
      <span className="sr-only" data-oid=":uz8_tl">
        Toggle theme
      </span>
    </Button>
  );
}
