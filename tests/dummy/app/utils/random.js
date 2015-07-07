var seed = 6;
// source: http://indiegamr.com/generate-repeatable-random-numbers-in-js/
// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
export default function random(max = 1, min = 0, randomSeed = undefined) {
  if (randomSeed !== undefined) {
    // reset seed
    seed = randomSeed;
  }
  seed = (seed * 9301 + 49297) % 233280;
  var rnd = seed / 233280;
  return min + rnd * (max - min);
}
