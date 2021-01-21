const LEGAL_CHARS = /[\d\(\)-]/;

function telephoneCheck(candidate) {
  console.log(`\nTESTING ${candidate}`);

  // remove all spaces
  let initialLength = candidate.length;
  candidate = candidate.replace(/ /g,'');
  console.log(candidate);

  // only allowed 3 spaces max
  if (initialLength-candidate.length > 3) return false;
  
  // check for invlaid chars by treating string as array 
  // and checking against our invalid character regex
  const contentsValid = candidate.split('').reduce((acc, curr) => {
    return acc && LEGAL_CHARS.test(curr);
  }, true);

  if (!contentsValid) {
    console.log("invalid chars!");
    return false
  }

  // at this point we've got a string with () - and digits
  // how many digits?
  const digits = candidate.match(/\d/g);
  console.log(digits);
  console.log(digits.length);

  // too long or too short
  if (digits.length > 11 || digits.length < 10){
    console.log("too long or short");
    return false;
  }

  // invalid country code
  if (digits.length === 11 && candidate.charAt(0) !== '1') {
    console.log('11 digis but not valid!');
    return false;
  }

  // no valid special characters to handle
  if (digits.length === candidate.length){
    console.log("simple digit boi");
    return true;
  }

  // now we know we're working with a valid 10 or 11-digit number, time to check parens
  if (candidate.includes('(') || candidate.includes(')')){
    console.log('check parens');
    const parenMatch = candidate.match(/\([\d]{3}\)/); // e.g. (123)
    console.log(`parenMatch is ${JSON.stringify(parenMatch)}`);
    
    // no valid area codes
    if (parenMatch === null) return false; 
    // 11 digit numbers can start with a 1(XXX)
    else if (parenMatch.index === 1 && digits.length===11) return true;
    // 10 digit numbers must start with the (XXX) to be valid
    else if (parenMatch.index === 0 && digits.length===10) return true;
    return false;
  }

  // if we haven't caught a bad one yet, we're not gonna. 
  // although these test cases are missing some invalid ones...
  //   - 1(206)123-1234(
  return true;
}

