/**
 * Created by zubair on 12-Aug-16.
 */
var User = {
    model: null,
    initModel: function (sequelize, Sequelize) {
        this.model = sequelize.define('user', {
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            }
        });
    }
};

module.exports = User;
