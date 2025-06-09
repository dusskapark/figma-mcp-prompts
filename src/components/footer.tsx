import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t" data-oid="tbktoud">
      <div className="container mx-auto px-4 py-8" data-oid="vhu.v:4">
        <div
          className="flex flex-col items-center space-y-6"
          data-oid="atf4h-_"
        >
          {/* Made by section */}
          <div className="text-center space-y-2" data-oid="8wcre_8">
            <div
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
              data-oid="pqxnii7"
            >
              <span data-oid="r7v8gpp">Made with by</span>

              <a
                href="https://www.linkedin.com/in/dusskapark/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
                data-oid="9qdnt:2"
              >
                <span className="font-medium" data-oid="kvo0bd.">
                  Jude
                </span>
                <ExternalLink className="h-3 w-3" data-oid="cdkrnmx" />
              </a>
              <span className="text-muted-foreground" data-oid="wn9v5v:">
                &
              </span>
              <a
                href="https://www.linkedin.com/in/yu-chi-tan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
                data-oid="75.._si"
              >
                <span className="font-medium" data-oid="1r:n5h4">
                  Lucy
                </span>
                <ExternalLink className="h-3 w-3" data-oid="69n4-e2" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-border" data-oid=":4:1xfa"></div>

          {/* Supported by section */}
          <div className="text-center space-y-4" data-oid="7rd8sbv">
            <p className="text-sm text-muted-foreground" data-oid="g7c7fq1">
              Supported by
            </p>
            <div
              className="flex items-center justify-center gap-8"
              data-oid="eejv2ki"
            >
              {/* Friends of Figma Seoul */}
              <a
                href="https://friends.figma.com/seoul/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
                data-oid="h2f75ru"
              >
                <div
                  className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm ring-1 ring-border"
                  data-oid="njpmneb"
                >
                  <Image
                    src="/logo/fof-seoul.jpeg"
                    alt="Friends of Figma Seoul"
                    fill
                    className="object-cover"
                    data-oid="rlwv7s:"
                  />
                </div>
                <div className="text-center" data-oid="drvz4lj">
                  <div
                    className="text-xs font-medium text-foreground group-hover:text-primary transition-colors"
                    data-oid="7zqinp3"
                  >
                    Friends of Figma
                  </div>
                  <div
                    className="text-xs text-muted-foreground"
                    data-oid="fe:63a2"
                  >
                    Seoul
                  </div>
                </div>
              </a>

              {/* Friends of Figma Taiwan */}
              <a
                href="https://friends.figma.com/taiwan/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
                data-oid="lnh473r"
              >
                <div
                  className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm ring-1 ring-border"
                  data-oid="1-d_4wg"
                >
                  <Image
                    src="/logo/fof-taiwan.jpeg"
                    alt="Friends of Figma Taiwan"
                    fill
                    className="object-cover"
                    data-oid="1:c57:d"
                  />
                </div>
                <div className="text-center" data-oid="axapyb1">
                  <div
                    className="text-xs font-medium text-foreground group-hover:text-primary transition-colors"
                    data-oid="k3msyks"
                  >
                    Friends of Figma
                  </div>
                  <div
                    className="text-xs text-muted-foreground"
                    data-oid="zl_jpkh"
                  >
                    Taiwan
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Bottom text */}
          <div
            className="text-xs text-muted-foreground text-center"
            data-oid="i8h.h8y"
          >
            <p data-oid="j.syh7s">
              © 2025 Figma MCP Magic. Open source project for the design
              community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
