import test from "tape-async";
import aiMerge from ".";

test("exports a function", async t => {
  t.is(typeof aiMerge, "function");
});
