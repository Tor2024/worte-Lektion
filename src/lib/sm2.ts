import { SM2State } from './types';

export const INITIAL_SM2_STATE: SM2State = {
    interval: 0,
    repetitions: 0,
    easeFactor: 2.5,
    nextReviewDate: null,
};

/**
 * Calculates the next review state based on the user's performance quality.
 * Quality:
 * 5 - Perfect response
 * 4 - Correct response after a hesitation
 * 3 - Correct response recalled with serious difficulty
 * 2 - Incorrect response; where the correct one seemed easy to recall
 * 1 - Incorrect response; the correct one remembered
 * 0 - Complete blackout.
 */
export function updateSM2State(quality: number, previousState: SM2State = INITIAL_SM2_STATE): SM2State {
    let { interval, repetitions, easeFactor } = previousState;

    if (quality >= 3) {
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions += 1;
    } else {
        repetitions = 0;
        interval = 1;
    }

    // Update Ease Factor
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);
    // Reset time to start of day or specific time if needed, but for now just +interval days

    return {
        interval,
        repetitions,
        easeFactor,
        nextReviewDate: nextReviewDate.getTime(),
    };
}

export function isReadyForReview(state: SM2State): boolean {
    if (!state.nextReviewDate) return true; // New items are ready
    return Date.now() >= state.nextReviewDate;
}
