

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

const IMAGS=[
 'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
 'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
 'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
 'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
 'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
 'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
 'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];

//获取可视窗口的宽高
var { width, height, scale } = Dimensions.get('window');

const TIMER =5000;//5s

export default class CustomBanner extends Component{

  constructor(){
    super();
    this.state={
        activePage: 0,
        currentX: 0,
        isDrag:false,//默认为false.手动拖拽则置为true
    };
  }

  //组件加载完成执行
  componentDidMount(){
    {this.start()}
  }

  componentWillUnmount(){
    // 如果存在this.timer，则使用clearTimeout清空。
   // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
      this.timer && clearInterval(this.timer);
  }

  start(){
    //获取scrollVie控件
    var scrollView = this.refs.scrollView;
    //获取个数
    var length = IMAGS.length;

    this.timer=setInterval(()=>{
      //如果正在拖拽则不进行处理
      if(!this.state.isDrag){
        var activePage;
        if(this.state.activePage+1>=length){
          activePage=0;
        }else {
          activePage=this.state.activePage+1;
        }

        var currentX=width*activePage;

        scrollView.scrollResponderScrollTo({x:currentX,y:0,animated:true});

        this.setState({
            currentX: currentX,
            activePage: activePage
        });
      }
    },TIMER);

  }

   /**
    渲染每一项
   **/
   renderItems(data){
     return data.map((item,i)=>{
       return (
         <Image key={i} style={{width: width,height:200}} source={{uri:item}}/>
       );
     });
   }

   /**
   渲染指示点
   **/
   renderIndicator(data){
    var indicators=[];
    var style;

    for(var i=0;i<data.length;i++){
      style=i===this.state.activePage?styles.selectDot:styles.defaultDot
      indicators.push(<Text key={i} style={[style,{fontSize:18}]}>&bull;</Text>);
    }
   return (
     <View style={styles.indicator}>
     {indicators}
     </View>
   );
   }
   /**
   动画切换结束执行.
   **/
   onAnimationEnd(e) {
       var activePage = e.nativeEvent.contentOffset.x /width;
       // console.log(e.nativeEvent)
       this.setState({
           currentX: e.nativeEvent.contentOffset.x,
           activePage: activePage,
           isDrag:false
       });
   }
   //TODO 拖拽时候屏蔽timer
   _onScrollBegin(event) {
      this.setState({
        isDrag:true,
      });
   }

  render(){
    return(
    <View>
    <ScrollView
     ref='scrollView'
     automaticallyAdjustContentInsets={false}
     horizontal={true}
     pagingEnabled={true}
     showsHorizontalScrollIndicator={false}
     onMomentumScrollEnd={this.onAnimationEnd.bind(this)}
     onScrollBeginDrag={this._onScrollBegin.bind(this)}
    >
    {this.renderItems(IMAGS)}
    </ScrollView>
    {this.renderIndicator(IMAGS)}
    </View>
    );
  }
}

const styles=StyleSheet.create({
  indicator:{
    position : 'absolute',
    backgroundColor : 'transparent',
    left : 12,
    bottom : 10,
    flexDirection: 'row'
  },
  defaultDot:{
    color:'#fff',
    opacity:0.3,
  },
  selectDot:{
    color:'#fff',
    opacity:1,
  }
});
