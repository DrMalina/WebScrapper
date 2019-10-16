//e.g. 1 200,99 zł => 1200.99
function convertPrice(price) {
  let rawValue = price
    .split(" ")
    .filter(el => el !== "zł")
    .join("")
    .replace(/,/g, ".");

  return Number(rawValue);
}
