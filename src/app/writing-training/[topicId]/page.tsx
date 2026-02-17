import { notFound } from "next/navigation";
import { WRITING_TOPICS, UNIVERSAL_PHRASES } from "@/lib/writing-data";
import WritingClient from "./writing-client";

interface WritingTopicPageProps {
    params: {
        topicId: string;
    };
}

export default function WritingTopicPage({ params }: WritingTopicPageProps) {
    const topic = WRITING_TOPICS.find((t) => t.id === params.topicId);

    if (!topic) {
        notFound();
    }

    // Filter phrases that are relevant to this topic's category (or generic enough)
    const relevantPhrases = UNIVERSAL_PHRASES.filter(
        (p) => p.tags.includes(topic.category) || p.tags.length === 0
    );

    return (
        <div className="container mx-auto py-6 h-[calc(100vh-60px)]">
            <WritingClient topic={topic} phrases={relevantPhrases} />
        </div>
    );
}
