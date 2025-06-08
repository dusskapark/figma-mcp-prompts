import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Made by section */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Made with by</span>
            
            
              <a
                href="https://www.linkedin.com/in/dusskapark/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
              >
                <span className="font-medium">Jude</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className="text-muted-foreground">&</span>
              <a
                href="https://www.linkedin.com/in/yu-chi-tan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
              >
                <span className="font-medium">Lucy</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-border"></div>

          {/* Supported by section */}
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">Supported by</p>
            <div className="flex items-center justify-center gap-8">
              {/* Friends of Figma Seoul */}
              <a
                href="https://friends.figma.com/seoul/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm ring-1 ring-border">
                  <Image
                    src="/logo/fof-seoul.jpeg"
                    alt="Friends of Figma Seoul"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                    Friends of Figma
                  </div>
                  <div className="text-xs text-muted-foreground">Seoul</div>
                </div>
              </a>

              {/* Friends of Figma Taiwan */}
              <a
                href="https://friends.figma.com/taiwan/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm ring-1 ring-border">
                  <Image
                    src="/logo/fof-taiwan.jpeg"
                    alt="Friends of Figma Taiwan"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                    Friends of Figma
                  </div>
                  <div className="text-xs text-muted-foreground">Taiwan</div>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom text */}
          <div className="text-xs text-muted-foreground text-center">
            <p>© 2025 Figma MCP Magic. Open source project for the design community.</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 