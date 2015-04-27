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
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return {
      dataSource: dataSource.cloneWithRows(MOCKED_STORIES_DATA),
    }
  },

  renderPlace: function(place) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: place.image}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{place.name}</Text>
          <Text style={styles.location}>{place.location}</Text>
        </View>
      </View>
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
    backgroundColor: '#222222',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#88AADD',
    alignItems: 'center',
    marginBottom: 1,
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    fontSize: 10,
    marginBottom: 8,
    textAlign: 'center',
  },
  location: {
    fontSize: 8,
    textAlign: 'center',
  },
  thumbnail: {
    width: 275,
    height: 60,
  },
});

AppRegistry.registerComponent('Scene', () => Scene);
