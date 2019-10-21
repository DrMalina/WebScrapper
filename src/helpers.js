//only show single offers (not set or multiple items for one high price)
function validateTitle(titleRaw) {
  const title = titleRaw.toLowerCase();
  //TODO: regex can be shortened
  const reFLAGS = /szt\b|szt.\B|sztuk\b|sztuki\b|\bbanknotów\b|\bbanknoty\b|x|\bzestaw\b|\bpakiet\b|\bznaczek\b|\bmagnes\b/g;
  const reKEY_WORDS = /zł\B|zl\b|z[lł]otych\b/gm;
  /* 
  //must not contain ANY of those
    FLAGS:
    "banknoty",  "banknotów", "x", "zestaw",
    "pakiet", "szt", "szt.", "sztuk", "sztuki",
    "znaczek", "magnes"
    
  //must contain AT LEAST 1 of those
    KEY WORDS: "zł", "zl", "złotych", "zlotych"
   */
  return reKEY_WORDS.test(title) && !reFLAGS.test(title); //KEY WORDS must be TRUE, FLAGS must be FALSE
}

//check if correct amount => sometimes might be 'Exchange' option (PL:"Zamienie") instead of amount
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

//validate offers => return offers only if they meet conditions
function validate(array) {
  let filteredArr = array.filter(
    //TITLE must not contain any KEY FLAGS and must contain KEY WORDS
    //PRICE must not be NaN =>e.g. OLX has 'Change' (PL: Zamienię) option to put instead of amount
    //TYPE must be 'purchase' not auction
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
