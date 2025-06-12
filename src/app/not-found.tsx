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
      data-oid="245khcy"
    >
      <div className="max-w-md w-full text-center space-y-8" data-oid=".n2k4jo">
        {/* Error Icon */}
        <div
          className="text-8xl font-bold text-muted-foreground/30"
          data-oid="2p:gpah"
        >
          404
        </div>

        {/* Error Card */}
        <Card data-oid="j20n086">
          <CardHeader className="space-y-2" data-oid="b_m1yr5">
            <CardTitle className="text-2xl" data-oid="lt6mjhm">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-base" data-oid="n_lpimb">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. The
              prompt you&apos;re looking for might have been moved or
              doesn&apos;t exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4" data-oid="z_uxa3c">
            <div
              className="flex flex-col sm:flex-row gap-3 justify-center"
              data-oid="d8vs-6q"
            >
              <Button asChild variant="default" data-oid="fuyz74l">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  data-oid="v-:8f5f"
                >
                  <Home className="h-4 w-4" data-oid="dntq7cr" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" data-oid="xequu5g">
                <Link
                  href="/#prompts"
                  className="flex items-center gap-2"
                  data-oid="q:-s-41"
                >
                  <Search className="h-4 w-4" data-oid="1-o_ugu" />
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
