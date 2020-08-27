
/**
 * price: string of price
 * output: just number
 * description: get number from a string price
 * - example
 * price: Price:\nUS$578.40+
 * output: 578.40 
 */
module.exports=function(price = ""){
    price_format = price.match(/\d{1,}.\d{0,}/g)
    if (price_format.length>0)
        return price_format[0]
    return ""
}