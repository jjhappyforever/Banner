

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

import ViewPager from 'react-native-viewpager';

const IMAGS=[
 'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
 'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
 'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
 'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
 'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
 'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
 'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];

var deviceWidth = Dimensions.get('window').width;

export default class Banner extends Component{

    /**
     这里同ListView用法一样.
    **/
    constructor(){
      super();
      var ds=new ViewPager.DataSource({pageHasChanged:(p1,p2)=>p1!==p2});
      this.state={
        dataSource:ds.cloneWithPages(IMAGS),
      }
    }
    /**
     渲染每一项
    **/
    renderPage(data,pageID){
      return(
        <Image
       source={{uri: data}}
       style={styles.banner} />
      )
    }

  render(){
    return (
      <View>
      <ViewPager
       style={{flex:1,height:173}}
       dataSource={this.state.dataSource}
       renderPage={this.renderPage}
       isLoop={true}
       autoPlay={true}
      />
      </View>
    )
  }
}

const styles=StyleSheet.create({
  banner:{
    height:173,
    width:deviceWidth,
  }
});
