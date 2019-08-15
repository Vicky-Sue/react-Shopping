import React, { Component, Fragment } from "react";
import { Carousel, WingBlank } from "antd-mobile";
import Axios from "axios";

class Home extends Component {
  state = {
    // 轮播图的数组
    sliderlist: [],
    imgHeight: '176px',
    // 商品推荐
    toplist: [],
    // 分类数据
    catelists: []
  }
  // 获取轮播图数据&推荐商品的数据
  getSliderList() {
    Axios.get('http://react.zbztb.cn/site/goods/gettopdata/goods')
      .then(res => {
        this.setState({
          sliderlist: res.data.message.sliderlist,
          toplist: res.data.message.toplist
        })
      })
  }
  // 获取商品分类数据
  getCatesList() {
    Axios.get('http://react.zbztb.cn/site/goods/getgoodsgroup')
      .then(res => {
        this.setState({
          catelists: res.data.message
        })
      })
  }
  // 组件加载完毕就触发componentDidMount里面的函数
  componentDidMount() {
    this.getSliderList();
    this.getCatesList();
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
      <Fragment>
        <div className="home" >
          {/* 轮播图开始 */}
          <div className="home_slider">
            {this.state.sliderlist.length && <Carousel
              autoplay
              infinite
            >
              {this.state.sliderlist.map(val => (
                <a
                  key={val.id}
                  href="http://www.alipay.com"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={val.img_url}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              ))}
            </Carousel>}
          </div>
          {/* 推荐商品开始 */}
          <div className="home_toplist">
            {/* 推荐商品标题 */}
            <div className="toplist_recom_title">推荐商品</div>
            {/* 推荐商品列表 */}
            {this.state.toplist.map(v => (
              <div key={v.category_id} className="toplist_group">
                <div className="toplist_goods_img_wrap">
                  <img src={v.img_url} alt="" />
                </div>
                <div className="toplist_goods_title_wrap">
                  <div className="toplist_goods_title">{v.title}</div>
                </div>
              </div>
            )
            )}

          </div>
          {/* 分类商品开始 */}
          {this.state.catelists.map(v => (
            <div key={v.level1cateid} className="home_cates_group">
              <div className="home_cates_title">{v.catetitle}</div>
              <div className="home_cates_group_wrap">
                {v.datas.map(value => (
                  <div key={value.artID} className="home_cates_goods_wrap">
                    <div className="home_cates_goods_img_wrap">
                      <img src={value.img_url} alt="" className="home_cates_goods_img" />
                    </div>
                    <div className="home_cates_goods_title">{value.artTitle}</div>
                    <div className="home_cates_goods_price">
                      <span className="goods_sell_price">￥{value.sell_price}</span>
                      <span className="goods_market_price">￥{value.market_price}</span>
                    </div>
                    <div className="home_cates_goods_stock">
                      <span>热卖中</span><span className="stock_num">{value.stock_quantity}件</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
        {/* 样式 */}
        <style jsx>{`
      .home {
        background-color: #fff;
        .home_toplist {
          .toplist_recom_title {
            height:36px;
            line-height:36px;
            font-size: 16px;
            text-indent: 6px;
            color:skyblue;
            font-weight: 600;
          }
      
          .toplist_group {
            display:flex;
            border-bottom: 1px solid #ccc;
            .toplist_goods_img_wrap {
              flex:1;
              display:flex;
              justify-content: center;
              align-items: center;
              img {
                width:80%;
              }
            }
      
            .toplist_goods_title_wrap {
              flex:3;
              display:flex;
              align-items: center;
              overflow: hidden;
              .toplist_goods_title {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }
            }
          }
        }
      
        .home_cates_group {
          .home_cates_title {
            background-color: #eee;
            height:36px;
            line-height:36px;
            font-size: 16px;
            text-indent: 6px;
            color:skyblue;
            font-weight: 600;
            border-bottom: 1px solid #dedede;
          }
          .home_cates_group_wrap{
            display: flex;
            flex-wrap: wrap;
            .home_cates_goods_wrap {
              width:50%;
              padding: 0 10px;
              border-bottom: 1px solid #dedede;
              &:nth-child(odd){
                border-right:1px solid #dedede;
              }
              .home_cates_goods_img_wrap {
                .home_cates_goods_img {
                  width:80%;
                  display:block;
                  margin: 0 auto;
                }
              }
        
              .home_cates_goods_title {
                height:32px;
                margin: 5px 0;
                color: #666;
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp:2;
              }
        
              .home_cates_goods_price {
                display:flex;
                justify-content:space-between;
                .goods_sell_price {
                  font-size: 16px;
                  color:orange;
                }
        
                .goods_market_price {
                  color:#ccc;
                  text-decoration: line-through;
                }
              }
        
              .home_cates_goods_stock {
                display:flex;
                justify-content:space-between;
                padding:4px 0;
                color:red;
                .stock_num {
                  font-size: 15px;
                  color:red;
                }
              }
            }
          }
          
        }
      }
      `}</style>
      </Fragment>
    )
  }
}
export default Home;