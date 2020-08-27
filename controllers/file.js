let path = require("path")
/**
 *  GET api/download/:filename 
 */
exports.download=function(req,res){
    var options = {
        root: path.dirname(require.main.filename),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    
      var fileName = req.params.fileName
      res.sendFile(`/export/${fileName}.csv`, options, function (err) {
        if (err) {
          console.log('Error when send file ', err)
          res.send("File not found")
        } else {
          console.log('Sent:', fileName)
        }
      })
}