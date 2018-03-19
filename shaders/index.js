
module.exports = function(file){
    return require('ify-loader!./'+file);
}