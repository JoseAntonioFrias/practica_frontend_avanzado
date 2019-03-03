let numComments = 0;

exports.getTotalNumComments = () => numComments;
    
exports.setTotalNumComments = function(val) {
  numComments = val
}