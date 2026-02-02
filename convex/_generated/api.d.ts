/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as check_data from "../check_data.js";
import type * as count_folders from "../count_folders.js";
import type * as curriculum from "../curriculum.js";
import type * as examTexts from "../examTexts.js";
import type * as folders from "../folders.js";
import type * as knownWords from "../knownWords.js";
import type * as lib_types from "../lib_types.js";
import type * as migration from "../migration.js";
import type * as progress from "../progress.js";
import type * as seed_data from "../seed_data.js";
import type * as srs from "../srs.js";
import type * as studyQueue from "../studyQueue.js";
import type * as types from "../types.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  check_data: typeof check_data;
  count_folders: typeof count_folders;
  curriculum: typeof curriculum;
  examTexts: typeof examTexts;
  folders: typeof folders;
  knownWords: typeof knownWords;
  lib_types: typeof lib_types;
  migration: typeof migration;
  progress: typeof progress;
  seed_data: typeof seed_data;
  srs: typeof srs;
  studyQueue: typeof studyQueue;
  types: typeof types;
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
