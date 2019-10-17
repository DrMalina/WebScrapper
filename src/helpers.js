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
function validateTitle(title) {
  const KEY_FLAGS = [
    "banknoty",
    "x",
    "zestaw",
    "pakiet",
    "szt",
    "szt.",
    "sztuk",
    "sztuki",
    "znaczek"
  ];

  for (let i = 0; i <= KEY_FLAGS.length - 1; i++) {
    if (title.toLowerCase().includes(KEY_FLAGS[i])) {
      return false;
    }
  }

  return true;
}

function validate(array) {
  //validate offers => return offers only if they meet conditions
  let filteredArr = array.filter(
    //title must not contain any KEY FLAGS
    //PRICE must not be NaN => OLX has 'Change' (PL: Zamienię) option to put instead of amount
    offer => validateTitle(offer.title) && convertPrice(offer.price)
  );

  //convert price on each offer
  filteredArr.forEach(offer => {
    offer.price = convertPrice(offer.price);
  });

  return filteredArr;
}

module.exports = { validate };
