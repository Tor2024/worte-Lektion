
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { SpeakButton } from "./speak-button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Loader2, Send, Lightbulb, CheckCircle2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import type { EvaluateRoleplayOutput } from "@/ai/flows/evaluate-roleplay";

type RoleplayMessage = {
    role: 'user' | 'model';
    content: string;
    feedback?: string; // HTML feedback for user messages
};

interface RoleplayInterfaceProps {
    scenario: string;
    aiRole: string;
    userRole: string;
    initialMessage: string;
    objectives: string[];
    onSendMessage: (history: RoleplayMessage[], message: string) => Promise<EvaluateRoleplayOutput>;
    onComplete: () => void;
    userLevel: string;
}

export function RoleplayInterface({
    scenario,
    aiRole,
    userRole,
    initialMessage,
    objectives,
    onSendMessage,
    onComplete,
    userLevel
}: RoleplayInterfaceProps) {
    const [messages, setMessages] = useState<RoleplayMessage[]>([
        { role: 'model', content: initialMessage }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, suggestions]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: RoleplayMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);
        setSuggestions([]);

        try {
            // FIX: Pass history INCLUDING the current user message
            const currentHistory: RoleplayMessage[] = [...messages, userMsg];
            const response = await onSendMessage(currentHistory, input);

            // Update user message with feedback
            setMessages(prev => {
                const newMsgs = [...prev];
                const lastMsg = newMsgs[newMsgs.length - 1];
                if (lastMsg.role === 'user') {
                    lastMsg.feedback = response.feedback;
                }
                return [...newMsgs, { role: 'model', content: response.aiReply }];
            });

            setSuggestions(response.suggestions);

            if (response.isCompleted) {
                setIsCompleted(true);
            }

        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
    };

    return (
        <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto space-y-4">
            <Card className="flex-1 flex flex-col overflow-hidden bg-background border-2">
                <CardHeader className="bg-muted/50 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <span className="text-2xl">🎭</span> {scenario}
                    </CardTitle>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <span className="font-bold">You:</span> {userRole}
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-bold">Partner:</span> {aiRole}
                        </div>
                    </div>
                    {objectives.length > 0 && (
                        <div className="mt-2 p-2 bg-background/50 rounded-md text-xs">
                            <span className="font-semibold">Goals:</span> {objectives.join(", ")}
                        </div>
                    )}
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "flex flex-col max-w-[80%]",
                                msg.role === 'user' ? "self-end items-end" : "self-start items-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "p-3 rounded-2xl text-sm",
                                    msg.role === 'user'
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-muted rounded-bl-none"
                                )}
                            >
                                {msg.content}
                            </div>
                            {msg.role === 'model' && (
                                <div className="mt-1 ml-1">
                                    <SpeakButton text={msg.content} size="sm" className="h-6 w-6" />
                                </div>
                            )}

                            {/* Feedback for user messages */}
                            {msg.role === 'user' && msg.feedback && (
                                <div
                                    className="mt-1 text-xs bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 p-2 rounded-md border border-indigo-500/20 max-w-full"
                                    dangerouslySetInnerHTML={{ __html: msg.feedback }} // Assuming feedback is safe HTML
                                />
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <div className="self-start flex items-center p-3 bg-muted rounded-2xl rounded-bl-none text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Writing...
                        </div>
                    )}

                    {/* Suggestions - only show if expecting input and not loading */}
                    {!isLoading && !isCompleted && suggestions.length > 0 && (
                        <div className="self-center w-full mt-4">
                            <p className="text-xs text-center text-muted-foreground mb-2 flex items-center justify-center gap-1">
                                <Lightbulb className="h-3 w-3" /> Ideas
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSuggestionClick(s)}
                                        className="text-xs border rounded-full px-3 py-1 hover:bg-muted transition-colors text-left max-w-full truncate"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div ref={scrollRef} />
                </CardContent>

                <CardFooter className="p-4 bg-background border-t">
                    {isCompleted ? (
                        <div className="w-full text-center space-y-4">
                            <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-lg">
                                <CheckCircle2 className="h-6 w-6" /> Roleplay Complete!
                            </div>
                            <Button onClick={onComplete} className="w-full" size="lg">
                                Continue to Summary
                            </Button>
                        </div>
                    ) : (
                        <div className="flex w-full gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your response in German..."
                                disabled={isLoading}
                                className="flex-1"
                                autoFocus
                            />
                            <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
