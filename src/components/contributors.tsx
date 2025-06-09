"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Users, ExternalLink } from "lucide-react";

interface Contributor {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const CONTRIBUTORS_PER_PAGE = 8;

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/FigmaAI/figma-mcp-prompts/contributors",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        if (response.ok) {
          const contributorsData = await response.json();

          // 각 컨트리뷰터의 상세 정보(이름) 가져오기
          const contributorsWithNames = await Promise.all(
            contributorsData.map(async (contributor: Contributor) => {
              try {
                const userResponse = await fetch(
                  `https://api.github.com/users/${contributor.login}`,
                  {
                    headers: {
                      Accept: "application/vnd.github.v3+json",
                    },
                  },
                );

                if (userResponse.ok) {
                  const userData = await userResponse.json();
                  return {
                    ...contributor,
                    name: userData.name || contributor.login,
                  };
                }
              } catch (error) {
                console.error(
                  `Failed to fetch user data for ${contributor.login}:`,
                  error,
                );
              }

              return {
                ...contributor,
                name: contributor.login,
              };
            }),
          );

          setContributors(contributorsWithNames);
        }
      } catch (error) {
        console.error("Failed to fetch contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  // 페이지네이션 계산
  const totalPages = Math.ceil(contributors.length / CONTRIBUTORS_PER_PAGE);
  const startIndex = (currentPage - 1) * CONTRIBUTORS_PER_PAGE;
  const endIndex = startIndex + CONTRIBUTORS_PER_PAGE;
  const paginatedContributors = contributors.slice(startIndex, endIndex);

  if (loading) {
    return (
      <section className="py-12 bg-muted/50" data-oid="_du82gp">
        <div className="container mx-auto px-4" data-oid="c3p20o2">
          <div className="text-center" data-oid="3k69pel">
            <div
              className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"
              data-oid="s:_0159"
            ></div>
            <p className="mt-2 text-muted-foreground" data-oid="4o5yq_m">
              Loading contributors...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (contributors.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/50" data-oid=":k3rq.g">
      <div className="container mx-auto px-4" data-oid="uu:mrim">
        <div className="text-center mb-8" data-oid="a880d4x">
          <h2
            className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2"
            data-oid="ym2g25j"
          >
            <Users className="h-6 w-6" data-oid="pexkpja" />
            Contributors
          </h2>
          <p className="text-muted-foreground mt-2" data-oid="y_:p2xp">
            Thank you to all the amazing people who have contributed to this
            project
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
          data-oid="lf5:yiy"
        >
          {paginatedContributors.map((contributor) => (
            <Card
              key={contributor.id}
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => window.open(contributor.html_url, "_blank")}
              data-oid="1_psuff"
            >
              <CardContent className="p-4" data-oid="535q_ef">
                <div className="flex items-center space-x-3" data-oid="u1f-kt4">
                  <Avatar className="h-12 w-12" data-oid="1d2ca:d">
                    <AvatarImage
                      src={contributor.avatar_url}
                      alt={contributor.name || contributor.login}
                      data-oid="q600j8s"
                    />
                    <AvatarFallback data-oid=".rt5q7x">
                      {(contributor.name || contributor.login)
                        .substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0" data-oid="f8pk2i5">
                    <div className="flex items-center gap-2" data-oid="tf7qgnl">
                      <h3
                        className="font-medium text-sm truncate"
                        data-oid=".0icdzg"
                      >
                        {contributor.name || contributor.login}
                      </h3>
                      <ExternalLink
                        className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        data-oid="sggkd5u"
                      />
                    </div>
                    <div
                      className="flex items-center gap-2 mt-1"
                      data-oid="5yrh4nw"
                    >
                      {/* <Badge variant="secondary" className="text-xs">
                       {contributor.contributions} commits
                      </Badge> */}
                      {contributor.name &&
                        contributor.name !== contributor.login && (
                          <Badge
                            variant="outline"
                            className="text-xs"
                            data-oid="qefyxok"
                          >
                            @{contributor.login}
                          </Badge>
                        )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6" data-oid="_7tssa3">
            <Pagination data-oid="12ylh1p">
              <PaginationContent data-oid="bj9bm2n">
                <PaginationItem data-oid="npfv8dn">
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={
                      currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                    data-oid="53tpsk0"
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page} data-oid="w6u480d">
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                        data-oid="uzf48rb"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem data-oid="fxuu8f:">
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
                    data-oid="_nfctft"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <div className="text-center mt-8" data-oid="-7-tn35">
          <a
            href="https://github.com/FigmaAI/figma-mcp-prompts/graphs/contributors"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-oid="nz._-ow"
          >
            View all contributors on GitHub
            <ExternalLink className="h-4 w-4" data-oid="f_70n07" />
          </a>
        </div>
      </div>
    </section>
  );
}
