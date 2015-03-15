
if (Meteor.isServer) {

    Accounts.onCreateUser(function (options, user) {
        if (!user.profile) {
            user.profile = options.profile || {};
        }
        if (!user.profile.friends) {
            user.profile.friends = [];
        }
        return user;
    });

    Meteor.startup(function() {
        // bootstrap the admin user if they exist -- You'll be replacing the id later

        // This will always add the below email address to the admin role
        if (Meteor.users.findOne({
                'emails.address': "santosh.srinivas@gmail.com"
            }))
            Roles.addUsersToRoles((Meteor.users.findOne({
                'emails.address': "santosh.srinivas@gmail.com"
            }))._id, ['admin']);

        Accounts.validateLoginAttempt(function(info) {
            console.log("Getting the user details");
            var user = info.user;
            console.log("In validateLoginAttempt");
            // console.log(user);
            if (!(typeof(user) == "undefined")) {
                if (user.roles) {
                    if (!(user.roles.length > 0)) {
                        console.log("No login roles");
                        Roles.addUsersToRoles(user._id, ['user']);
                        return true;
                    } else {
                        return true;
                    }
                } else {
                    console.log("Login roles do not exist");
                    Roles.addUsersToRoles(user._id, ['user']);
                    return true;
                }
            }
        });


        if (!Meteor.users.findOne({
                'emails.address': "santosh.srinivas@gmail.com"
            })) {
            var userId = Accounts.createUser({
                username: "santoshsrinivas",
                email: "santosh.srinivas@gmail.com",
                password: 'password'
            });

            console.log("User Created with Id: " + userId);

            Meteor.users.update(userId, {
                $set: {
                    'profile': {
                        'firstName': "Santosh",
                        'lastName': "Srinivas",
                        'sex': "Male",
                        'dob': "14-Jul-1979",
                        'city': "FL",
                        'state': "FL",
                        'twitter': "Admin",
                        'summary': "This is santosh the administrator",
                        'friends' : []
                    }
                }
            });
        }

        if (!Meteor.users.findOne({
                'emails.address': "santosh@mypad.in"
            })) {
            var userId = Accounts.createUser({
                username: "santosh",
                email: "santosh@mypad.in",
                password: 'password'
            });

            console.log("User Created with Id: " + userId);

            Meteor.users.update(userId, {
                $set: {
                    'profile': {
                        'firstName': "Santosh",
                        'lastName': "Srinivas",
                        'sex': "Male",
                        'dob': "14-Jul-1979",
                        'city': "FL",
                        'state': "FL",
                        'twitter': "TweetSKS",
                        'summary': "Auto created user for Santosh @ MyPad",
                        'friends' : []
                    }
                }
            });
        }

        if (!Meteor.users.findOne({
                'emails.address': "sujeevana@gmail.com"
            })) {
            var userId = Accounts.createUser({
                username: "sujeevana",
                email: "sujeevana@gmail.com",
                password: 'password'
            });

            console.log("User Created with Id: " + userId);

            Meteor.users.update(userId, {
                $set: {
                    'profile': {
                        'firstName': "Sujeevana",
                        'lastName': "Mohan",
                        'sex': "Female",
                        'dob': "16-Dec-1985",
                        'city': "FL",
                        'state': "FL",
                        'twitter': "Suji123",
                        'summary': "Auto created user for Sujeevana @ Gmail",
                        'friends' : []
                    }
                }
            });
        }

        if (Meteor.users.find().count() < 50) {
            _.each(_.range(50), function() {
                var chance = new Chance();

                var randomEmail = chance.email();
                var randomFirstName = chance.first();
                var randomLastName = chance.last();
                var userName = randomFirstName + randomLastName;
                var randomDate = chance.birthday();
                var randomSummary = chance.paragraph({
                    sentences: 5
                });

                console.log(randomEmail + ' ' + userName + ' ' + randomDate);

                var userId = Accounts.createUser({
                    username: userName,
                    email: randomEmail,
                    password: 'password'
                });

                console.log("User Created with Id: " + userId);

                Meteor.users.update(userId, {
                    $set: {
                        'profile': {
                            'firstName': randomFirstName,
                            'lastName': randomLastName,
                            'sex': chance.gender(),
                            'dob': randomDate,
                            'city': chance.city(),
                            // 'state': chance.state(),
                            'state': "FL",
                            'twitter': chance.twitter(),
                            'summary': randomSummary,
                            'friends' : []
                        }
                    }
                });
            });
        }
    });
}
