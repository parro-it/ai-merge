import test from "tape-async";
import aiMerge from ".";
import delay from "delay";
import asFullfills from "ai-asfullfills";
import concat from "ai-concat";

function buildIterable(arr) {
  const iterable = arr.map(v => delay(v * 10).then(() => v));
  return asFullfills(iterable);
}

test("merge iterables in parallel", async t => {
  const iterable = aiMerge(
    buildIterable([3, 2, 1]),
    buildIterable([6, 4, 5]),
    buildIterable([10, 9, 8, 7])
  );

  const result = await concat.obj(iterable);
  t.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], result);
});

test("exports a function", async t => {
  t.is(typeof aiMerge, "function");
});
