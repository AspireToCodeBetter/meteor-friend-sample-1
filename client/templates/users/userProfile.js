// This is the js file for viewProfile.js

Template.userProfile.events({
    'click #addFriend':
        function(e) {
			var targetUserId = $(e.currentTarget).attr("data-id");
            console.log("Going to send friend request to: " + targetUserId);
			Meteor.users.update({_id: targetUserId},
            	{$addToSet: {"profile.friends": Meteor.userId()}});
            Meteor.users.update({_id: Meteor.userId()},
                {$addToSet: {"profile.friends": targetUserId}});
        },
    'click #removeFriend':
        function(e) {
			var targetUserId = $(e.currentTarget).attr("data-id");
            console.log("Going to remove friend request from: " + targetUserId);
			Meteor.users.update({_id: targetUserId},
            	{$pull: {"profile.friends": Meteor.userId()}});
            Meteor.users.update({_id: Meteor.userId()},
                {$pull: {"profile.friends": targetUserId}});            
        }

});
