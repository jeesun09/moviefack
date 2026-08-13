import test from "node:test";
import assert from "node:assert/strict";

import { getFeaturedMovies, getTvShows } from "../src/util/api.js";

test("getFeaturedMovies resolves with movie data even when TMDB is unavailable", async () => {
  const movies = await getFeaturedMovies();

  assert.ok(Array.isArray(movies), "should return an array");
  assert.ok(movies.length > 0, "should include fallback or live movie data");
  assert.ok(movies[0].title, "first movie should include a title");
});

test("getTvShows uses the local series API route in browser mode", async () => {
  const originalWindow = global.window;
  const originalFetch = global.fetch;

  global.window = {};
  global.fetch = async (input) => {
    assert.equal(String(input), "/api/series?genreId=18");
    return {
      ok: true,
      json: async () => [{ id: 1, titleMain: "Series Title" }],
    };
  };

  try {
    const series = await getTvShows(18);
    assert.ok(Array.isArray(series), "should return an array");
    assert.equal(series[0].titleMain, "Series Title");
  } finally {
    if (originalWindow === undefined) {
      delete global.window;
    } else {
      global.window = originalWindow;
    }

    global.fetch = originalFetch;
  }
});
