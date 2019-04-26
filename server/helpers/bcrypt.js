const bcrypt = require('bcryptjs')

module.exports = {
    bcryptHashSync: function(input) {
        let hashed = bcrypt.hashSync(input, 10)
        return hashed;
    },
    bcryptCompareSync: function(input, database_password) {
        let compared = bcrypt.compareSync(input, database_password)
        return compared;
    }
}