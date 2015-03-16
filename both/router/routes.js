Router.route('/', {
  name: 'home'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard', 'users']
});

Router.route('/users', {
  name: 'users'
});

Router.route('/userProfile/:_id', {
  name: 'userProfile'
});
