const Rita = require('rita');

/**
 * countSyllables() returns am object containing
 * the phenomes and syllable count of the string parameter.
 * @param {String} message 
 * @return {Object} res
 */
const countSyllables = message => {
    let res = {};
    res.phonemes = Rita.getSyllables(message);
   
    let syllables = res.phonemes.replace(/ /g, '/');
    res.count = syllables.split('/').length;

    return res;
};



module.exports = countSyllables;
