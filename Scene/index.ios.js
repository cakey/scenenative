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

  _withRow: function(places, rowID) {
    return places.map((p) => {
      return {
        name: p.name,
        location: p.location,
        image: p.image,
        currentSelected: rowID,
      }
    });
  },

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._withRow(MOCKED_STORIES_DATA, null)),
      row: null,
    }
  },

  setRow: function(rowID) {
    if (this.state.row === rowID) {
      rowID = null; //unselect current on press
    }
    this.setState({
      row: rowID,
      dataSource: this.state.dataSource.cloneWithRows(this._withRow(MOCKED_STORIES_DATA, rowID)),
    })
  },

  renderPlace: function(place, sectionID, rowID) {
    var information = false;
    if (rowID === place.currentSelected) {
      information = <Text style={[styles.elementLabel, styles.name]}>{place.name}</Text>
    }
    return (
      <TouchableHighlight onPress={() => this.setRow(rowID)}>
        <View style={styles.placeContainer}>
          <View style={styles.placeHeader}>
            <Image
              source={{uri: place.image}}
              style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={[styles.elementLabel, styles.name]}>{place.name}</Text>
              <Text style={[styles.elementLabel, styles.location]}>{place.location}</Text>
            </View>
          </View>
          { information }
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
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
  placeContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  placeHeader: {
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
