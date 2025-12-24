
"use client";

import type { Topic, UserVocabularyWord, SM2State, Exercise, VocabularyWord } from "@/lib/types";
import { generateAdaptiveExercise, AdaptiveExerciseOutput } from "@/ai/flows/adaptive-exercise-generation";
import { verifyAnswer } from "@/ai/flows/verify-answer";
import { generateFeedback } from "@/ai/flows/generate-feedback";
import { updateSM2State } from "@/lib/sm2";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { CheckCircle, Loader2, ThumbsUp, XCircle, BookOpen, BrainCircuit, Pencil, Move, SkipForward, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { WordCard } from "./word-card";
import { useUserProgress } from "@/hooks/use-user-progress";
import { useKnownWords } from "@/hooks/use-known-words";
import { curriculum } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Feedback = {
  type: "correct" | "incorrect";
  message: string;
} | null;



type SentenceConstructionExercise = {
  words: string[];
  correctSentence: string;
}

type Step = 'learning' | 'vocabulary' | 'reading' | 'comprehension' | 'grammar' | 'sentence-construction' | 'explanation' | 'mastered' | 'loading' | 'error';


type ExerciseHistoryItem = {
  exercise: string;
  userAnswer: string;
  isCorrect: boolean;
};





type ExerciseEngineProps = {
  topic?: Topic; // Make topic optional
  customWords?: UserVocabularyWord[]; // New prop
  onMastered: () => void;
  onWordUpdate?: (wordId: string, newState: SM2State) => void;
}

export function ExerciseEngine({ topic, customWords, onMastered, onWordUpdate }: ExerciseEngineProps) {
  const [exerciseData, setExerciseData] = useState<AdaptiveExerciseOutput | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>('loading');
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const { proficiency, setTopicProficiency, getTopicProficiency } = useUserProgress(topic?.id || 'custom');
  const { isKnown, addKnownWord } = useKnownWords();
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseHistoryItem[]>([]);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalFeedback, setFinalFeedback] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();


  const allWords = useMemo(() => {
    if (customWords) return customWords.map(w => w.word);
    return topic ? topic.vocabulary.flatMap(v => v.words) : [];
  }, [topic, customWords]);
  const [vocabularyExercises, setVocabularyExercises] = useState<Exercise[]>([]);
  const [comprehensionExercises, setComprehensionExercises] = useState<Exercise[]>([]);
  const [grammarExercises, setGrammarExercises] = useState<Exercise[]>([]);
  const [sentenceConstructionExercises, setSentenceConstructionExercises] = useState<SentenceConstructionExercise[]>([]);
  const [learningQueue, setLearningQueue] = useState<VocabularyWord[]>([]);
  const [learningFeedback, setLearningFeedback] = useState<Feedback>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const exerciseHistoryRef = useRef(exerciseHistory);

  useEffect(() => {
    exerciseHistoryRef.current = exerciseHistory;
  }, [exerciseHistory]);

  const startExerciseCycle = useCallback(async () => {
    setIsGenerating(true);
    setApiError(null);
    setCurrentStep('loading');
    setFeedback(null);
    setUserAnswer('');
    setExerciseData(null);
    setIsSubmitting(false);
    setCurrentExerciseIndex(0);

    // Initial Learning Phase for Topics
    // If we have a topic, and the learning queue is empty (meaning we haven't started yet),
    // populate the queue with ALL topic words.
    // NOTE: We check 'loading' to differentiation between initial load and subsequent cycles?
    // Actually, we should check if we just finished learning.
    // We need a way to know if we already did the learning phase for this mount.
    // Let's rely on state: if learningQueue is empty and we are starting, we should check if we should populate it.
    // BUT 'startExerciseCycle' is called on retry too.
    // Simplification: We populate learningQueue ONLY if it's currently empty AND we are in the 'loading' phase of the very first run.
    // Better: Effect hook manages the entry.
    // Let's modify logic:
    // If we have a topic, we ALWAYS start with 'learning' step unless we already passed it.
    // But 'startExerciseCycle' resets everything.
    // We need a ref to track if learning is done for this session.
  }, []);

  const learningDoneRef = useRef(false);

  // Effect to initialize the cycle
  useEffect(() => {
    if (topic && !learningDoneRef.current && allWords.length > 0 && !customWords) {
      setLearningQueue(allWords.map(w => w as VocabularyWord)); // Cast assuming UserVocabularyWord.word is VocabularyWord
      setCurrentStep('learning');
      setIsGenerating(false);
    } else {
      // Standard start
      standardCycleStart();
    }
  }, [topic, allWords, customWords]);

  const standardCycleStart = useCallback(async () => {
    setIsGenerating(true);
    setApiError(null);
    setCurrentStep('loading');
    setFeedback(null);
    setUserAnswer('');
    setExerciseData(null);
    setIsSubmitting(false);
    setCurrentExerciseIndex(0);

    try {
      if (customWords && customWords.length > 0) {
        const exercises: Exercise[] = customWords.map(cw => {
          const rand = Math.random();
          // Distribute types: 
          // 40% Translation (RU -> DE)
          // 30% Multiple Choice (DE -> RU)
          // 30% Sentence Construction (Free text)

          // Strategy for options: Pick 3 random distractors from the SAME folder
          // FILTER: Avoid confusing synonyms. Remove words where Russian translation overlaps significantly.

          const targetTranslationTokens = cw.word.russian.toLowerCase().split(/[,;]/).map(s => s.trim());

          const validDistractors = customWords.filter(w => {
            if (w.word.german === cw.word.german) return false;

            // Check for overlap in Russian translation
            const distractorTokens = w.word.russian.toLowerCase().split(/[,;]/).map(s => s.trim());
            const hasOverlap = targetTranslationTokens.some(tToken =>
              distractorTokens.some(dToken =>
                dToken === tToken ||
                (dToken.length > 3 && tToken.includes(dToken)) ||
                (tToken.length > 3 && dToken.includes(tToken))
              )
            );
            return !hasOverlap;
          }).map(w => w.word.german);

          const distractors = validDistractors
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

          // Ensure 3 distractors by padding with placeholders if not enough valid words
          while (distractors.length < 3) {
            // Fallback to purely random strings or punctuation to avoid false learning,
            // or try to fetch from a hardcoded list of common distinct words if we had one.
            // For now, "..." is acceptable as it forces the user to pick the only real word if mostly empty.
            // Better: Use a simple distinct fallback pool if we have space, but let's stick to simple padding.
            distractors.push("...");
          }
          const options = [...distractors, cw.word.german].sort(() => 0.5 - Math.random());

          if (rand < 0.4) {
            return {
              type: 'translation',
              question: cw.word.russian,
              answer: cw.word.german
            };
          } else if (rand < 0.7) {
            return {
              type: 'multiple-choice',
              question: `Выберите перевод: ${cw.word.russian}`,
              options: options,
              answer: cw.word.german
            };
          } else {
            // Prefer context sentence > generic request
            // If context exists, use it as the "reference answer" but still ask user to construct a sentence.
            // We cannot ask to "Translate" the context because we likely don't have the Russian translation of it stored.
            // So we always fall back to "Write a sentence with word: <german>"

            const hasContext = !!cw.context;

            return {
              type: 'free-text-sentence',
              question: `Напишите предложение на немецком со словом: ${cw.word.german}`,
              answer: cw.context || cw.word.german // Reference for AI checking
            };
          }
        });

        // Shuffle the sequence of exercises
        for (let i = exercises.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [exercises[i], exercises[j]] = [exercises[j], exercises[i]];
        }
        setVocabularyExercises(exercises);
        setComprehensionExercises([]);
        setGrammarExercises([]);
        setSentenceConstructionExercises([]);
        setCurrentStep('vocabulary');
        setIsGenerating(false);
        return;
      }

      if (!topic) {
        throw new Error("No topic provided for standard exercise generation");
      }

      const currentLevel = curriculum.levels.find(level => level.topics.some(t => t.id === topic.id));
      const unknownWords = allWords.filter(word => !isKnown(word.german));
      const vocabularyToUse = unknownWords.length > 0 ? unknownWords : [];

      const response = await generateAdaptiveExercise({
        grammarConcept: topic.title,
        userLevel: (currentLevel?.id.toUpperCase() as 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2') || 'A1',
        pastErrors: exerciseHistoryRef.current.filter(e => !e.isCorrect).map(e => e.exercise).join(', '),
        exerciseHistory: exerciseHistoryRef.current, // Pass current session history from ref
        vocabulary: vocabularyToUse.map(word => ({
          german: word.german,
          russian: word.russian,
          example: 'example' in word ? word.example : (word as any).exampleSingular,
        })),
      });
      setExerciseData(response);
      setVocabularyExercises((response.vocabularyExercises || []).map(e => ({ ...e, type: 'translation' } as Exercise)));
      setComprehensionExercises((response.comprehensionExercises || []).map(e => ({ ...e, type: 'free-text-sentence' } as Exercise)));
      setGrammarExercises((response.grammarExercises || []).map(e => ({ ...e, type: 'fill-in-the-blank' } as Exercise)));
      setSentenceConstructionExercises(response.sentenceConstructionExercises || []);

      setCurrentStep('reading');
    } catch (error: any) {
      console.error("Error starting exercise cycle:", error);

      const isQuotaError = error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('Resource has been exhausted');

      if (isQuotaError) {
        setApiError("Превышен лимит запросов к AI (429). Система автоматически попробует переподключиться, но если ошибка сохраняется — сделайте паузу.");
      } else {
        setApiError("Не удалось сгенерировать упражнение. Попробуйте обновить страницу или зайти позже.");
      }

      setCurrentStep('error');
    } finally {
      setIsGenerating(false);
    }
  }, [topic, customWords, allWords, isKnown]);

  useEffect(() => {
    startExerciseCycle();
  }, [startExerciseCycle]);


  const steps: { id: Step, name: string, icon: React.ElementType }[] = useMemo(() => [
    { id: 'vocabulary', name: 'Словарь', icon: BookOpen },
    { id: 'reading', name: 'Чтение', icon: BookOpen },
    { id: 'comprehension', name: 'Понимание', icon: BrainCircuit },
    { id: 'grammar', name: 'Грамматика', icon: Pencil },
    { id: 'sentence-construction', name: 'Построение фраз', icon: Move },
    { id: 'explanation', name: 'Объяснение', icon: BookOpen },
  ], []);

  const currentStepIndex = useMemo(() => steps.findIndex(s => s.id === currentStep), [steps, currentStep]);


  const addHistoryAndProficiency = useCallback((question: string, userAnswer: string, isCorrect: boolean) => {
    setExerciseHistory(prev => [...prev, { exercise: question, userAnswer, isCorrect }]);
    if (topic) {
      const currentProficiency = getTopicProficiency(topic.id);
      const newProficiency = isCorrect ? currentProficiency + 5 : Math.max(0, currentProficiency - 7);
      setTopicProficiency(newProficiency);
    }
  }, [getTopicProficiency, setTopicProficiency, topic]);

  const proceedToNextExercise = () => {
    setFeedback(null);
    setUserAnswer('');

    // Determine current list
    let currentExercises: (Exercise | SentenceConstructionExercise)[] = [];
    if (currentStep === 'vocabulary') currentExercises = vocabularyExercises;
    else if (currentStep === 'comprehension') currentExercises = comprehensionExercises;
    else if (currentStep === 'grammar') currentExercises = grammarExercises;
    else if (currentStep === 'sentence-construction') currentExercises = sentenceConstructionExercises;

    // Check if we still have exercises in the current step
    if (currentExercises.length > 0 && currentExerciseIndex < currentExercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      return;
    }

    // Move to next valid step
    setCurrentExerciseIndex(0);

    // Define the sequence
    const stepOrder: Step[] = ['vocabulary', 'reading', 'comprehension', 'grammar', 'sentence-construction', 'explanation', 'mastered'];
    const currentOrderIdx = stepOrder.indexOf(currentStep);

    for (let i = currentOrderIdx + 1; i < stepOrder.length; i++) {
      const nextStep = stepOrder[i];
      let hasContent = false;

      // Check content availability
      if (nextStep === 'reading' && exerciseData?.readingText) hasContent = true;
      else if (nextStep === 'comprehension' && comprehensionExercises.length > 0) hasContent = true;
      else if (nextStep === 'grammar' && grammarExercises.length > 0) hasContent = true;
      else if (nextStep === 'sentence-construction' && sentenceConstructionExercises.length > 0) hasContent = true;
      else if (nextStep === 'explanation' && exerciseData?.explanation) hasContent = true;
      else if (nextStep === 'mastered') hasContent = true; // Always valid end

      if (hasContent) {
        setCurrentStep(nextStep);
        return;
      }
    }
  }


  const handleSubmitExercise = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!exerciseData && (!customWords || customWords.length === 0)) || !userAnswer || isSubmitting) return;

    setIsSubmitting(true);
    setFeedback(null);
    setApiError(null);

    let currentExercise;

    if (currentStep === 'vocabulary') {
      currentExercise = vocabularyExercises[currentExerciseIndex];
    } else if (currentStep === 'comprehension') {
      currentExercise = comprehensionExercises[currentExerciseIndex];
    } else if (currentStep === 'grammar') {
      currentExercise = grammarExercises[currentExerciseIndex];
    } else if (currentStep === 'sentence-construction') {
      currentExercise = sentenceConstructionExercises[currentExerciseIndex];
    }

    if (!currentExercise) {
      setIsSubmitting(false);
      return;
    }

    const question = 'words' in currentExercise ? currentExercise.words.join(' / ') : currentExercise.question;
    const correctAnswer = 'correctSentence' in currentExercise ? currentExercise.correctSentence : currentExercise.answer;

    try {
      let verification;

      // OPTIMIZATION: Check for exact match locally to save AI calls
      const normalizedUser = userAnswer.trim().toLowerCase().replace(/[.,!?]/g, '');
      const normalizedCorrect = correctAnswer.trim().toLowerCase().replace(/[.,!?]/g, '');

      if (normalizedUser === normalizedCorrect) {
        verification = {
          isCorrect: true,
          explanation: `<p><strong>Отлично! Всё верно!</strong></p><p>Ваш ответ полностью совпадает с правильным: <strong class="text-primary">${correctAnswer}</strong>.</p>`
        };
      } else {
        try {
          verification = await verifyAnswer({
            question: question,
            userAnswer,
            correctAnswer: correctAnswer,
          });
        } catch (aiError) {
          console.error("AI Verify failed, falling back to local check:", aiError);
          // Fallback: simple comparison
          const isCorrectLocal = normalizedUser === normalizedCorrect;
          verification = {
            isCorrect: isCorrectLocal,
            explanation: isCorrectLocal
              ? `<p><strong>Верно!</strong> (Offline check)</p>`
              : `<p><strong>Неверно.</strong></p><p>Правильный ответ: <strong class="text-primary">${correctAnswer}</strong></p><p><em>(AI недоступен для детального объяснения)</em></p>`
          };
        }
      }

      const isCorrect = verification.isCorrect;
      addHistoryAndProficiency(question, userAnswer, isCorrect);

      if (!isCorrect) {
        // Retry Logic: Add failed exercise to the end of the queue
        if (currentStep === 'vocabulary') {
          setVocabularyExercises(prev => [...prev, currentExercise as Exercise]);
        } else if (currentStep === 'comprehension') {
          setComprehensionExercises(prev => [...prev, currentExercise as Exercise]);
        } else if (currentStep === 'grammar') {
          setGrammarExercises(prev => [...prev, currentExercise as Exercise]);
        } else if (currentStep === 'sentence-construction') {
          setSentenceConstructionExercises(prev => [...prev, currentExercise as SentenceConstructionExercise]);
        }
      }

      if (isCorrect && currentStep === 'vocabulary') {
        // Standard Topic Mode: Mark word as known if correct
        if (allWords) {
          const wordObj = allWords.find(w => w.russian === question);
          if (wordObj && !customWords) {
            addKnownWord(wordObj.german);
          }
        }

        // Custom Mode: Update SM-2 State
        if (customWords && onWordUpdate) {
          // Find logic needs to be robust for mixed exercise types
          // Question could be Russian (Translation) or German (Choice/Sentence)
          // It's safer to find by ID if we had it, but we map from UserVocabularyWord.
          // Let's refactor mapping to include ID or handle lookup better.
          // For now, reverse lookup:
          const matchingWord = customWords.find(cw =>
            cw.word.russian === question || // Translation Question
            cw.word.russian === currentExercise.question.split(': ')[1] || // Multiple Choice "Выберите перевод: ..."
            cw.word.german === correctAnswer // General
          );

          if (matchingWord) {
            // Grade: 5 for correct, 0 for incorrect (simplification)
            // If we had more nuance (e.g. typos), we could use 3 or 4.
            // verification.isCorrect is boolean.
            const quality = 5;
            // Note: If incorrect, this block isn't reached because of 'if (isCorrect)' above.
            // We need to handle incorrect updates                 // updateSM2State(quality, previousState)
            const nextState = updateSM2State(quality, matchingWord.sm2State);
            onWordUpdate(matchingWord.id, nextState);
          }
        }
      } else if (!isCorrect && customWords && onWordUpdate && currentStep === 'vocabulary') {
        // Same look up logic for incorrect
        const matchingWord = customWords.find(cw =>
          cw.word.russian === question ||
          cw.word.german === correctAnswer
        );
        if (matchingWord) {
          const quality = 0;
          const nextState = updateSM2State(quality, matchingWord.sm2State);
          onWordUpdate(matchingWord.id, nextState);
        }
      }

      setFeedback({ type: isCorrect ? 'correct' : 'incorrect', message: verification.explanation });

    } catch (error: any) {
      console.error("Error submitting answer:", error);

      const isQuotaError = error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('Resource has been exhausted');

      if (isQuotaError) {
        setApiError("Превышен лимит запросов к AI. Пожалуйста, подождите немного или попробуйте позже.");
      } else {
        setApiError("Не удалось проверить ответ. Попробуйте снова.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGlobalContinue = async () => {
    if (feedback) {
      proceedToNextExercise();
      return;
    }

    if (currentStep === 'vocabulary') {
      // Should rely on proceedToNextExercise usually, but here handleGlobalContinue is used for explicit "Next Phase" buttons?
      // Actually 'vocabulary' doesn't use GlobalContinue unless we add a button.
      // The 'Continue' button is usually for Reading/Explanation.
      // But if we are in 'vocabulary' and feedback is cleared, we should proceed?
      // Standard flow: Input -> Submit -> Feedback -> Click Continue -> proceedToNextExercise
      proceedToNextExercise();
    } else if (currentStep === 'reading') {
      const next = exerciseData?.comprehensionExercises?.length ? 'comprehension' : 'grammar'; // Simple fallback
      proceedToNextExercise();
    } else if (currentStep === 'explanation') {
      setIsGenerating(true);
      try {
        if (!topic && !customWords) return;

        // If Custom Words, we just finish
        if (customWords) {
          setCurrentStep('mastered');
          return;
        }

        if (topic) {
          const isMastered = getTopicProficiency(topic.id) >= 100;
          const feedbackResponse = await generateFeedback({
            topicTitle: topic.title,
            exerciseHistory: exerciseHistory.map(h => ({ exercise: h.exercise, correct: h.isCorrect })),
          });
          setFinalFeedback(feedbackResponse.feedback);

          if (isMastered) {
            setCurrentStep('mastered');
            onMastered();
            setExerciseHistory([]);
          } else {
            startExerciseCycle();
          }
        }
      } catch (error) {
        console.error("Error in post-cycle phase:", error);
        setApiError("Не удалось получить итоговый отзыв. Вы можете начать новый цикл вручную.");
        setCurrentStep('error');
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const getNextTopic = () => {
    if (!topic) return null;
    const currentLevel = curriculum.levels.find(level => level.topics.some(t => t.id === topic.id));
    if (!currentLevel) return null;

    const currentTopicIndex = currentLevel.topics.findIndex(t => t.id === topic.id);
    if (currentTopicIndex > -1 && currentTopicIndex < currentLevel.topics.length - 1) {
      const nextTopic = currentLevel.topics[currentTopicIndex + 1];
      return `/${currentLevel.id}/${nextTopic.id}`;
    }
    return null;
  }

  const nextTopicUrl = getNextTopic();

  const renderContent = () => {
    if (currentStep === 'loading' && !apiError) return null;

    if (apiError) {
      let retryAction;
      if (currentStep === 'error' && !finalFeedback) { // Error during exercise generation
        retryAction = startExerciseCycle;
      } else if (currentStep === 'error' && finalFeedback) { // Error during feedback generation
        retryAction = handleGlobalContinue;
      } else { // Error during answer verification
        retryAction = () => handleSubmitExercise();
      }

      return (
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-destructive">Произошла ошибка</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{apiError}</p>
            <Button onClick={retryAction} className="mt-4" disabled={isSubmitting || isGenerating}>
              {(isSubmitting || isGenerating) ? <Loader2 className="animate-spin" /> : <RefreshCw />}
              Повторить запрос
            </Button>
          </CardContent>
        </Card>
      )
    }


    switch (currentStep) {
      case 'reading':
        if (!exerciseData) return null;
        return (
          <Card>
            <CardHeader><CardTitle>Прочитайте текст</CardTitle></CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{exerciseData.readingText}</p>
              <div className="mt-4 flex gap-4">
                <Button onClick={handleGlobalContinue}>Продолжить</Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'learning':
        if (!learningQueue || learningQueue.length === 0) return null; // Should not happen if step is learning
        const learningWord = learningQueue[0];

        // Helper to check answer
        const handleLearningSubmit = (e?: React.FormEvent) => {
          if (e) e.preventDefault();
          if (!userAnswer) return;

          const normalize = (s: string) => s.trim().toLowerCase().replace(/[.,!?]/g, '');
          const correct = learningWord.german;

          // Special check for Nouns: must include article?
          // The data `learningWord.german` usually includes article for nouns?? 
          // Let's check `types.ts` again or `word-card`.
          // `VocabularyWord` for Noun has `german` (just word) and `article`.
          // Wait, `word.german` in `VocabularyWord` interface...
          // Looking at `types.ts`:
          // interface Noun { german: string; article: 'der'|'die'|'das' ... }
          // So `german` is just "Mann", not "der Mann".
          // But `getGermanDisplay` in `WordCard` combines them.
          // User Requirement: "nouns MUST be with article".

          let correctStats = correct;
          if (learningWord.type === 'noun') {
            correctStats = `${learningWord.article} ${learningWord.german}`;
          }

          const isCorrect = normalize(userAnswer) === normalize(correctStats);

          if (isCorrect) {
            setLearningFeedback({ type: 'correct', message: `<p><strong>Верно!</strong> ${correctStats}</p>` });
          } else {
            setLearningFeedback({ type: 'incorrect', message: `<p>Ошибка. Правильно: <strong class="text-primary">${correctStats}</strong></p>` });
          }
        };

        const handleLearningMakeNext = () => {
          if (!learningFeedback) return;

          if (learningFeedback.type === 'correct') {
            // Remove from queue
            const newQueue = learningQueue.slice(1);
            setLearningQueue(newQueue);
            if (newQueue.length === 0) {
              // Done with learning!
              learningDoneRef.current = true;
              startExerciseCycle(); // Proceed to standard exercises
            }
          } else {
            // Move to end
            const newQueue = [...learningQueue.slice(1), learningWord];
            setLearningQueue(newQueue);
          }

          // Reset for next card
          setLearningFeedback(null);
          setUserAnswer('');
        };

        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Изучение новых слов</h2>
              <span className="text-sm text-muted-foreground">Осталось: {learningQueue.length}</span>
            </div>

            {/* Show the card - Back Side (Russian) as Question? 
                 User requirement: "Interactive training... nouns with article... if error move to end".
                 Usually this means: Show Russian -> User types German.
                 So we flip the card to show Russian?
                 Or we just show a question card?
                 Let's reuse WordCard but maybe force a "question mode"?
                 Actually WordCard manages its own flip state.
                 Maybe we just show the Russian text in a simple Card, and reveal the full WordCard on answer?
              */}

            <Card>
              <CardHeader><CardTitle>Как это по-немецки?</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-center py-6">{learningWord.russian}</div>

                {learningFeedback ? (
                  <div className="animate-in fade-in zoom-in duration-300">
                    {/* Show the full detailed card to study after answering */}
                    <WordCard word={learningWord} />

                    <Alert variant={learningFeedback.type === 'correct' ? 'default' : 'destructive'} className="mt-4">
                      <div className="flex items-center gap-2">
                        {learningFeedback.type === 'correct' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <div dangerouslySetInnerHTML={{ __html: learningFeedback.message }} />
                      </div>
                    </Alert>

                    <Button onClick={handleLearningMakeNext} className="w-full mt-4" size="lg">
                      {learningFeedback.type === 'correct' ? 'Далее' : 'Повторить позже'}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleLearningSubmit} className="space-y-4">
                    <Input
                      autoFocus
                      placeholder={learningWord.type === 'noun' ? "Существительное с артиклем (der/die/das)..." : "Перевод..."}
                      value={userAnswer}
                      onChange={e => setUserAnswer(e.target.value)}
                      className="text-lg text-center"
                    />
                    <Button type="submit" className="w-full" disabled={!userAnswer}>Проверить</Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'vocabulary':
      case 'comprehension':
      case 'grammar':
      case 'sentence-construction':
        let currentExercisesList: Exercise[] | SentenceConstructionExercise[] | undefined;
        let title = '';

        if (currentStep === 'vocabulary') {
          currentExercisesList = vocabularyExercises;
          if (currentExercisesList && currentExercisesList.length > 0) {
            const currentEx = currentExercisesList[currentExerciseIndex] as Exercise;
            if (currentEx.type === 'multiple-choice') title = 'Выберите правильный вариант';
            else if (currentEx.type === 'free-text-sentence') title = 'Составьте предложение';
            else title = 'Переведите слово на немецкий (с артиклем)';
          }
        } else if (currentStep === 'comprehension') {
          currentExercisesList = comprehensionExercises;
          title = 'Ответьте на вопрос (на немецком)';
        } else if (currentStep === 'grammar') {
          currentExercisesList = grammarExercises;
          title = 'Заполните пропуск (на немецком)';
        } else {
          currentExercisesList = sentenceConstructionExercises;
          title = 'Составьте предложение из слов';
        }

        if (!currentExercisesList || currentExercisesList.length === 0) {
          return <div className="p-4 text-center">Загрузка упражнения...</div>;
        }

        const currentExercise = currentExercisesList[currentExerciseIndex];

        // Handle Sentence Construction Check (Type Guard)
        if (currentStep === 'sentence-construction') {
          const scExercise = currentExercise as SentenceConstructionExercise;
          return (
            <Card>
              <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
              <CardContent>
                <div className="text-lg text-foreground mb-4">
                  <p className="font-bold tracking-wider">{scExercise.words.join(' / ')}</p>
                </div>
                <form onSubmit={handleSubmitExercise} className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Введите ваше предложение..."
                    className="flex-grow"
                    disabled={isSubmitting || !!feedback}
                  />
                  <Button type="submit" disabled={isSubmitting || !userAnswer || !!feedback}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Проверить'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          );
        }

        // Handle Standard Exercises (Vocabulary, Grammar, Comprehension)
        const stdExercise = currentExercise as Exercise;

        return (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{title}</CardTitle>
                <span className="text-sm font-medium text-muted-foreground">
                  {currentExerciseIndex + 1} / {currentExercisesList.length}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-lg text-foreground mb-4">
                <p className="font-medium bg-muted p-4 rounded-md mb-2">{stdExercise.question}</p>
                {stdExercise.type === 'translation' && (
                  <p className="text-sm text-muted-foreground">Введите ответ на немецком языке</p>
                )}
              </div>

              {stdExercise.type === 'multiple-choice' ? (
                <div className="grid grid-cols-1 gap-3 mt-4">
                  {stdExercise.options?.map((option, idx) => (
                    <Button
                      key={idx}
                      variant={userAnswer === option ? (feedback?.type === 'correct' ? "default" : "destructive") : "outline"}
                      className={`justify-start h-auto py-3 text-lg ${feedback && option === stdExercise.answer ? "border-green-500 bg-green-50 text-green-700" : ""}`}
                      onClick={() => {
                        if (isSubmitting || feedback) return;
                        setUserAnswer(option);
                        // For multiple choice, we rely on user clicking "Check" to confirm, 
                        // avoiding accidental misclicks.
                      }}
                    >
                      {option}
                    </Button>
                  ))}
                  <div className="mt-4">
                    <Button
                      onClick={() => handleSubmitExercise()}
                      disabled={!userAnswer || isSubmitting || !!feedback}
                      className="w-full"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : 'Проверить'}
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitExercise} className="space-y-4">
                  {stdExercise.type === 'free-text-sentence' ? (
                    <div className="space-y-2">
                      <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Напишите ваше предложение..."
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={isSubmitting || !!feedback}
                      />
                      <p className="text-xs text-muted-foreground">AI проверит грамматику и смысл вашего предложения.</p>
                    </div>
                  ) : (
                    <Input
                      autoFocus
                      placeholder="Введите ваш ответ на немецком..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      disabled={isSubmitting || !!feedback}
                      className="text-lg"
                    />
                  )}

                  <Button type="submit" className="w-full" disabled={!userAnswer || isSubmitting || !!feedback}>
                    {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <div className="flex items-center"><CheckCircle className="mr-2 h-4 w-4" /> Проверить</div>}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        );
      case 'explanation':
        if (!exerciseData) return null;
        return (
          <Card>
            <CardHeader><CardTitle>Объяснение правила</CardTitle></CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: exerciseData.explanation }} />
              <Button onClick={handleGlobalContinue} className="mt-4" disabled={isGenerating}>
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Следующий цикл'}
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  if ((currentStep === 'loading' || isGenerating) && !apiError) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">ИИ-тренер готовит ваше задание...</p>
      </div>
    );
  }

  if (currentStep === 'mastered') {
    return (
      <Card className="bg-gradient-to-br from-primary/10 to-transparent">
        <CardHeader>
          <CardTitle className="text-center">
            <ThumbsUp className="mx-auto h-16 w-16 text-green-500 bg-green-100 rounded-full p-3 mb-4" />
            <div className="text-2xl font-bold text-foreground font-headline">Тема освоена!</div>
          </CardTitle>
          <CardDescription className="text-center">Отличная работа! Вы продемонстрировали уверенное понимание этой темы.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {finalFeedback && (
            <Alert className="mt-4 text-left">
              <BrainCircuit className="h-4 w-4" />
              <AlertTitle>Персональный отзыв от AI-тренера</AlertTitle>
              <AlertDescription className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: finalFeedback }} />
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          {nextTopicUrl ? (
            <Button asChild className="w-full">
              <Link href={nextTopicUrl}>
                Перейти к следующей теме <SkipForward className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button onClick={onMastered} className="w-full">
              Завершить тренировку <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  const currentProficiency = getTopicProficiency(topic?.id || 'custom');

  return (
    <div className="space-y-6">
      <div>
        <ol className="flex items-center w-full">
          {steps.map((step, index) => (
            <li key={step.id} className={`flex w-full items-center ${index < steps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""} ${index <= currentStepIndex ? 'text-primary after:border-primary' : 'text-muted-foreground after:border-muted'}`}>
              <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${index <= currentStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <step.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="mastery" className="text-sm font-medium text-muted-foreground">Уровень освоения</label>
          <span className="text-sm font-bold text-primary">{topic ? currentProficiency : 'N/A'}%</span>
        </div>
        <Progress value={currentProficiency} id="mastery" />
      </div>

      {renderContent()}

      {feedback && (
        <Alert variant={feedback.type === 'incorrect' ? 'destructive' : 'default'} className="mt-4">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                {feedback.type === 'correct' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle className="font-headline">
                  {feedback.type === 'correct' ? 'Правильно!' : 'Обратите внимание'}
                </AlertTitle>
              </div>
              <AlertDescription className="prose prose-sm max-w-none dark:prose-invert pl-6" dangerouslySetInnerHTML={{ __html: feedback.message }} />
            </div>
            <Button onClick={handleGlobalContinue} size="sm">Продолжить</Button>
          </div>
        </Alert>
      )}
    </div>
  );
}
