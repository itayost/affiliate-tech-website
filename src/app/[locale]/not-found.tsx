// src/app/[locale]/not-found.tsx
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default function NotFound() {
  // Since we can't use hooks in not-found, we'll show both languages
  return (
    <>
      {/* Hebrew Version */}
      <div className="min-h-screen flex items-center justify-center px-4 py-16" dir="rtl">
        <Card className="max-w-lg w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <span className="text-8xl font-bold text-muted-foreground">404</span>
            </div>
            <CardTitle className="text-2xl">הדף לא נמצא</CardTitle>
            <CardDescription className="text-base mt-2">
              מצטערים, העמוד שחיפשתם לא קיים או שהועבר למקום אחר.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex gap-3 flex-row-reverse">
              <Link href="/he" className="flex-1">
                <Button className="w-full gap-2">
                  <Home className="h-4 w-4" />
                  לעמוד הבית
                </Button>
              </Link>
              
              <Link href="/he/search" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <Search className="h-4 w-4" />
                  חיפוש
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}