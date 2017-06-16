const Rita = require('rita');

/**
 * countSyllables() returns am object containing
 * the phenomes and syllable count of the string parameter.
 * @param {String} message 
 * @return {Object} res
 */
const countSyllables = message => {
    let res = {};
    res.phenomes = Rita.getSyllables(message);
   
    let syllables = res.phenomes.replace(/ /g, '/');
    res.count = syllables.split('/').length;

    return res;
};


console.log(countSyllables('To be or not to be'));
module.exports = countSyllables;
