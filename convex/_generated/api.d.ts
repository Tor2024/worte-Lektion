/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as examTexts from "../examTexts.js";
import type * as folders from "../folders.js";
import type * as knownWords from "../knownWords.js";
import type * as migration from "../migration.js";
import type * as progress from "../progress.js";
import type * as srs from "../srs.js";
import type * as studyQueue from "../studyQueue.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  examTexts: typeof examTexts;
  folders: typeof folders;
  knownWords: typeof knownWords;
  migration: typeof migration;
  progress: typeof progress;
  srs: typeof srs;
  studyQueue: typeof studyQueue;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
