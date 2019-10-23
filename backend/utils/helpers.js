//only show single offers (not set or multiple items for one high price)
function validateTitle(titleRaw) {
  //TODO: regex can be shortened
  const title = titleRaw.toLowerCase();

  //must NOT contain
  const reFLAGS = /szt\b|szt.\B|sztuk\b|sztuki\b|\bbanknotów\b|\bbanknoty\b|x|\bzestaw\b|\bpakiet\b|\bznaczek\b|\bmagnes\b/g;
  //must contain
  const reKEY_WORDS = /zł\B|zl\b|z[lł]otych\b/gm;

  return reKEY_WORDS.test(title) && !reFLAGS.test(title);
}

function validatePrice(priceRaw) {
  return priceRaw.includes("zł");
}

function validateType(type) {
  return type === "purchase";
}

//e.g. '1 200,99 zł' => '1200.99'
function convertPrice(price) {
  let rawValue = price
    .split(" ")
    .filter(el => el !== "zł")
    .join("")
    .replace(/,/g, ".");

  return Number(rawValue);
}

//return offers only if they meet conditions
function validate(array) {
  let filteredArr = array.filter(
    offer =>
      validateTitle(offer.title) &&
      validatePrice(offer.price) &&
      validateType(offer.type)
  );

  //convert price on each offer
  filteredArr.forEach(offer => {
    offer.price = convertPrice(offer.price);
  });

  return filteredArr;
}

module.exports = { validate };
