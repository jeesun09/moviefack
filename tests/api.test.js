import test from "node:test";
import assert from "node:assert/strict";

import { getFeaturedMovies } from "../src/util/api.js";

test("getFeaturedMovies resolves with movie data even when TMDB is unavailable", async () => {
  const movies = await getFeaturedMovies();

  assert.ok(Array.isArray(movies), "should return an array");
  assert.ok(movies.length > 0, "should include fallback or live movie data");
  assert.ok(movies[0].title, "first movie should include a title");
});
