// A module that will be loaded on demand with dynamic import().

export default function run(nums) {
  return nums.reduce((sum, n) => sum + n, 0);
}
