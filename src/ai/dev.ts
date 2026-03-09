import { config } from 'dotenv';
config();

import '@/ai/flows/adaptive-exercise-generation.ts';
import '@/ai/flows/verify-answer.ts';
import '@/ai/flows/generate-feedback.ts';
