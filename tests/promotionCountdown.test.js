import { test } from "node:test";
import assert from "node:assert/strict";
import { getDailyPromotionCountdown } from "../src/utils/promotionCountdown.js";

test("countdown ends at 22:30 in Fortaleza and is based on the actual clock", () => {
  const date = new Date("2026-10-05T18:00:00-03:00");
  assert.deepEqual(getDailyPromotionCountdown(date), { status: "active", seconds: 16200 });
  assert.deepEqual(getDailyPromotionCountdown(new Date("2026-10-05T22:29:59-03:00")), { status: "active", seconds: 1 });
  assert.deepEqual(getDailyPromotionCountdown(new Date("2026-10-05T22:30:00-03:00")), { status: "ended", seconds: 0 });
});

test("refreshing cannot reset the countdown or create a new deadline", () => {
  const now = new Date("2026-10-05T20:00:00-03:00");
  assert.deepEqual(getDailyPromotionCountdown(now), getDailyPromotionCountdown(now));
  assert.equal(getDailyPromotionCountdown(new Date("2026-10-05T21:00:00-03:00")).seconds, 5400);
  assert.equal(getDailyPromotionCountdown(new Date("2026-10-05T23:59:59-03:00")).seconds, 0);
});

test("counter renews on eligible days and stays unavailable on closed days and weekends", () => {
  assert.equal(getDailyPromotionCountdown(new Date("2026-10-06T00:00:00-03:00")).status, "scheduled");
  for (const day of [7, 8, 10, 11]) {
    assert.deepEqual(getDailyPromotionCountdown(new Date(`2026-10-${String(day).padStart(2, "0")}T18:00:00-03:00`)), { status: "unavailable", seconds: 0 });
  }
  assert.equal(getDailyPromotionCountdown(new Date("2026-10-09T18:00:00-03:00")).status, "active");
});
