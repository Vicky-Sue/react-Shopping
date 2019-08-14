import React, { Component } from "react";
import { Carousel, WingBlank } from "antd-mobile";
import Axios from "axios";

class Home extends Component {
  state={
    // 轮播图的数组
    sliderlist:[],
    imgHeight:'176',
    // 商品推荐
    toplist:[],
    // 分类数据
    catelists:[]
  }
  // 获取轮播图数据&推荐商品的数据
  getSliderList(){
    Axios.get('http://react.zbztb.cn/site/goods/gettopdata/goods')
    .then(res=>{
      this.setState({
        sliderlist: res.data.message.sliderlist,
        toplist:res.data.message.toplist
      })
    })
  }
  // 获取商品分类数据
  getCatesList(){
    Axios.get('http://react.zbztb.cn/site/goods/getgoodsgroup')
      .then(res=>{
        this.setState({
          catelists:res.data.message
        })
      })
  }
  // 组件加载完毕就触发componentDidMount里面的函数
  componentDidMount(){
    // this.getSliderList();
    // this.getCatesList();
  }
  render() {
    /* 
    1 请求还没有回来 标签已经渲染 正确
    2 数据回来 标签重新渲染 
    3 轮播图经过以上流程之后 自己不会重新触发轮播图的轮播 轮播图封装的问题！！！
      1 数据还没有回来 我就不渲染标签
      2 数据回来了 我再渲染标签 
    
     */
    return (
      <div>我的</div>
    );
  }
}
export default Home;