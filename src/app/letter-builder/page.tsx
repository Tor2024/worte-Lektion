import { LetterBuilder } from "@/components/letter-builder/letter-builder";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LetterBuilderPage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-muted/30">
                <div className="container mx-auto py-4 px-4 flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Домой
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold text-primary">Deutsch B2 Beruf - Brief-Baukasten</h1>
                </div>
            </header>
            <main className="container mx-auto py-4">
                <LetterBuilder />
            </main>
        </div>
    );
}
