const defensiveFunctions = {
   safe_tags: (str) => {
    if(typeof(str) === 'string'){
      return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
    }else {
      return str;
    }
  }
}

module.exports = defensiveFunctions;
