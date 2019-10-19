//e.g. '1 200,99 zł' => 1200.99
function convertPrice(price) {
  let rawValue = price
    .split(" ")
    .filter(el => el !== "zł")
    .join("")
    .replace(/,/g, ".");

  return Number(rawValue);
}

//only show single offers (not set or multiple items for one high price)
function validateTitle(titleRaw) {
  //must not contain ANY of those
  const KEY_FLAGS = [
    "banknoty",
    "banknotów",
    "x",
    "zestaw",
    "pakiet",
    "szt",
    "szt.",
    "sztuk",
    "sztuki",
    "znaczek",
    "magnes"
  ];

  //must contain AT LEAST 1 of those
  const KEY_WORDS = ["zł", "zl", "złotych", "zlotych"];

  let title = titleRaw.toLowerCase();

  //TODO:validation

  return true;
}

//validate offers => return offers only if they meet conditions
function validate(array) {
  let filteredArr = array.filter(
    //TITLE must not contain any KEY FLAGS and must contain KEY WORDS
    //PRICE must not be NaN =>e.g. OLX has 'Change' (PL: Zamienię) option to put instead of amount
    //TYPE must be 'purchase' not auction
    offer =>
      validateTitle(offer.title) &&
      convertPrice(offer.price) &&
      offer.type === "purchase"
  );

  //convert price on each offer
  filteredArr.forEach(offer => {
    offer.price = convertPrice(offer.price);
  });

  return filteredArr;
}

module.exports = { validate };
