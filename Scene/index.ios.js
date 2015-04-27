/* @flow */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
var foo = require('./foo.js');
var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  VibrationIOS,
  View,
} = React;

var MOCKED_STORIES_DATA = [];
var sf = {
  name: 'San Francisco',
  location: 'USA',
  image: 'http://clubzone.com/content/uploads/2014/12/san-fran.jpg'
};
for (var i=0; i<25; i++) {
  MOCKED_STORIES_DATA.push(sf);
};

var Scene = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(MOCKED_STORIES_DATA),
    }
  },

  renderPlace: function(place, sectionID, rowID) {
    return (
      <TouchableHighlight>
        <View style={styles.container}>
          <Image
            source={{uri: place.image}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={[styles.elementLabel, styles.name]}>{place.name}</Text>
            <Text style={[styles.elementLabel, styles.location]}>{place.location}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    debugger;
    return <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderPlace}
      style={styles.listView}
    />
  }
});

var styles = StyleSheet.create({
  listView: {
    marginTop: 20,
    backgroundColor: '#111111',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
  },
  rightContainer: {
    flex: 1,
  },
  elementLabel: {
    textAlign: 'left',
    color: '#888888',
    paddingLeft: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  location: {
    fontSize: 8,
  },
  thumbnail: {
    width: 275,
    height: 60,
  },
});

AppRegistry.registerComponent('Scene', () => Scene);
