# BigBlueButton user filter test

**[Demo](https://openwebcc.github.io/bbb/)**

The demo shows a static dump of a BigBluebutton session saved as *Web page complete* with Firefox. Usernames have been altered to random names picked from [https://www.name-generator.org.uk/quick/](https://www.name-generator.org.uk/quick/).

The test implementation allows to filter users by role/keyword and required two changes to the original dump:

1. add [filter_users.js](filter_users.js) to the end of [index.html](index.html)

```
<script src="filter_users.js"></script>
```

2. add HTML markup for the pulldown menu and the search box to [index.html](index.html)

```
<!-- START implement user-filter -->
<div class="container--Z1UAd2a">
  <select name="filter-status--klaus" lass="filter-status--klaus" style="width:95%;margin:auto">
    <option value="" selected>all users</option>
    <option value="moderator">moderators only</option>
    <option value="presenter">presenters only</option>
    <option value="voice_active">microphone (on)</option>
    <option value="voice_muted">microphone (off)</option>
    <option value="listenOnly">listen only</option>
  </select>
</div>
<div class="container--Z1UAd2a">
  <input type="text" name="filter-keyword-klaus" class="filter-keyword-klaus" placeholder="username contains ..." style="width:95%;margin:auto">
</div>
<!-- END implement user-filter -->
```

The test implementation allows to filter users by

* role: moderator, presenter, all (pulldown menu)
* status: microphone (on/of), listen only (pulldown menu)
* username: by keyword (search box)

**Note**: the demo focuses on the implementation of the user filter and is not a working BBB session anymore. Don't expect anything else to work ;-)