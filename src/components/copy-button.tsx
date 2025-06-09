"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="h-8 w-8 p-0"
      data-oid="p8n2547"
    >
      {copied ? (
        <Check className="h-3 w-3" data-oid="914oo0a" />
      ) : (
        <Copy className="h-3 w-3" data-oid="bzchb5c" />
      )}
    </Button>
  );
}
