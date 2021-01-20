"use strict";

const checkNum = /^\d+$/;
const checkSep = /[-\s]$/;

function formatPhoneStr(str, ind) {
	// cleans seperators to be consistent
	const [editStr, keepStr] = splitPhoneStr(str, ind);
	const cleanStr = cleanPhoneStr(editStr);
	return cleanStr + keepStr;
}

function splitPhoneStr(str, sp) {
	// seperates string into two parts
	return [str.slice(0, sp), str.slice(sp, str.length)];
}

/**
 * CheckCode - takes something and does something with it (explain that here)
 * 
 * totally overkill for this but doesn't hurt to practice
 * 
 * JSDoc style comments for methods are tidy. 
 * 
 * @param {String} codeString incoming string 
 * @param {*} len 
 * 
 * @returns {Boolean} true for valid code, otherwise false
 */
function checkCode(codeString, len) {
	// returns true if code section contains only numbers and is correct len
	if(codeString.length !== len) {
		return false;
	} else if(!checkNum.test(codeString)) {
		return false;
	}
	return true;
}

function removeParenthesis(str) {
	// corrects parenthesis to consistent seperators
	if(str.slice(-1, str.length) === ")") {
		if(str.slice(-5, -4) === "(") {
			return str.slice(0, -5) + " " + str.slice(-4, -1);
		}
	}
	return str;
}

function cleanPhoneStr(str) {
	// cleans string section to consistent seperators
	while(checkSep.test(str)) {
		str = str.slice(0, -1);
	}
	str = removeParenthesis(str);
	str += " ";
	return str;
}

function telephoneCheck(phoneCandidate) {
	// this is the section of logic that I find confusing
	// 
	phoneCandidate = formatPhoneStr(phoneCandidate, -4);
	phoneCandidate = formatPhoneStr(phoneCandidate, -8);
	phoneCandidate = formatPhoneStr(phoneCandidate, -12);
	const codes = phoneCandidate.split(" ").reverse();
	const codeLengths = [4, 3, 3];
	for(let ind in codeLengths) {
		if(!checkCode(codes[ind], codeLengths[ind])) {
			return false;
		}
	}
	if(codes[3]) {
		if(codes[3] !== "1") {
			return false;
		}
	} else if(codes.length > 4) {
    return false;
  }
  return true;
}
