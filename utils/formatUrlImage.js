/**
 * - url: link image
 * - output: link image
 * - description: convert a small image to a bigger image
 * - example: 
 * url: https://i.etsystatic.com/7498337/d/il/19824c/2155388678/il_75x75.2155388678_n3bv.jpg?version=0,
 * output: https://i.etsystatic.com/7498337/r/il/19824c/2155388678/il_750xN.2155388678_n3bv.jpg?version=0,
 */
module.exports=function(url){
    //type /d/ : replace /d/ -> /r/ , 75x75 -> 750xN
    let type_d = url.search(/\/d\//g)
    if (type_d!=-1){
        url = url.replace(/\/d\//g, '/r/')
        url = url.replace(/\d{1,}x\d{1,}/g, '750xN')
    }
    //type /c/ : replace 75x75 -> 750xN
    let type_c = url.search(/\/c\//g)
    if (type_c!=-1){
        url = url.replace(/\d{1,}x\d{1,}/g, '750xN')
    }
    return url
}