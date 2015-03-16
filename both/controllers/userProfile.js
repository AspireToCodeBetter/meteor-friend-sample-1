UserProfileController = AppController.extend({
  waitOn: function() {
    return this.subscribe('userProfile', this.params._id);
  },
  data: function() {
    return Meteor.users.findOne(this.params._id);
  },
  onAfterAction: function () {
    Meta.setTitle('User Profile for: '+ this.params._id);
  }
});

UserProfileController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
