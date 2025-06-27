import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4"
      data-oid="ruydlea"
    >
      <div className="max-w-md w-full text-center space-y-8" data-oid="lz.vhmu">
        {/* Error Icon */}
        <div
          className="text-8xl font-bold text-muted-foreground/30"
          data-oid="sstkb28"
        >
          404
        </div>

        {/* Error Card */}
        <Card data-oid="jez7caa">
          <CardHeader className="space-y-2" data-oid="g.d48t2">
            <CardTitle className="text-2xl" data-oid="ppyesrg">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-base" data-oid="urc_0bf">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. The
              prompt you&apos;re looking for might have been moved or
              doesn&apos;t exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4" data-oid="1smchfr">
            <div
              className="flex flex-col sm:flex-row gap-3 justify-center"
              data-oid="ye8u6l8"
            >
              <Button asChild variant="default" data-oid="wnstzkl">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  data-oid="vl__9bi"
                >
                  <Home className="h-4 w-4" data-oid="h1qauhb" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" data-oid="pq26wji">
                <Link
                  href="/#prompts"
                  className="flex items-center gap-2"
                  data-oid="jhweo-w"
                >
                  <Search className="h-4 w-4" data-oid="02o:t44" />
                  Browse Prompts
                </Link>
              </Button>
            </div>

            {/* <div className="pt-4 border-t" data-oid="fqhnzdm">
                      <p className="text-sm text-muted-foreground" data-oid="d2a:j:a">
                        Looking for a specific prompt? Try using the search function on
                        our{" "}
                        <Link
                          href="/"
                          className="text-primary hover:underline"
                          data-oid="w6h1tf0"
                        >
                          main page
                        </Link>
                        .
                      </p>
                     </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
