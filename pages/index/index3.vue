<template>
  <view>
	<my-canvas
	  class="ty-canvas"
	  id="chart"
	  canvas-id="map-echart"
	  :map="true"
	  :setOptions="options"
	></my-canvas>
  </view>
</template>

<script>
const dataList = [{
	          name: "南海诸岛",
	          value: 0
	      },
	      {
	          name: '北京',
	          value: 54
	      },
	      {
	          name: '天津',
	          value: 13
	      },
	      {
	          name: '上海',
	          value: 40
	      },
	      {
	          name: '重庆',
	          value: 75
	      },
	      {
	          name: '河北',
	          value: 59
	      },
	      {
	          name: '河南',
	          value: 83
	      },
	      {
	          name: '云南',
	          value: 11
	      },
	      {
	          name: '辽宁',
	          value: 68
	      },
	      {
	          name: '黑龙江',
	          value: 15
	      },
	      {
	          name: '湖南',
	          value: 69
	      },
	      {
	          name: '安徽',
	          value: 60
	      },
	      {
	          name: '山东',
	          value: 89
	      },
	      {
	          name: '新疆',
	          value: 4
	      },
	      {
	          name: '江苏',
	          value: 31
	      },
	      {
	          name: '浙江',
	          value: 104
	      },
	      {
	          name: '江西',
	          value: 36
	      },
	      {
	          name: '湖北',
	          value: 1052
	      },
	      {
	          name: '广西',
	          value: 33
	      },
	      {
	          name: '甘肃',
	          value: 7
	      },
	      {
	          name: '山西',
	          value: 9
	      },
	      {
	          name: '内蒙古',
	          value: 7
	      },
	      {
	          name: '陕西',
	          value: 22
	      },
	      {
	          name: '吉林',
	          value: 4
	      },
	      {
	          name: '福建',
	          value: 18
	      },
	      {
	          name: '贵州',
	          value: 5
	      },
	      {
	          name: '广东',
	          value: 98
	      },
	      {
	          name: '青海',
	          value: 60
	      },
	      {
	          name: '西藏',
	          value: 150
	      },
	      {
	          name: '四川',
	          value: 44
	      },
	      {
	          name: '宁夏',
	          value: 4
	      },
	      {
	          name: '海南',
	          value: 22
	      },
	      {
	          name: '台湾',
	          value: 3
	      },
	      {
	          name: '香港',
	          value: 5
	      },
	      {
	          name: '澳门',
	          value: 5
	      }
	  ]
	  const hours = [
	      '12a', '1a', '2a', '3a', '4a', '5a', '6a',
	      '7a', '8a', '9a', '10a', '11a',
	      '12p', '1p', '2p', '3p', '4p', '5p',
	      '6p', '7p', '8p', '9p', '10p', '11p'
	  ]
	  // prettier-ignore
	  const days = [
	      'Saturday', 'Friday', 'Thursday',
	      'Wednesday', 'Tuesday', 'Monday', 'Sunday'
	  ]
	  // prettier-ignore
	  const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
	      .map(function (item) {
	      return [item[1], item[0], item[2] || '-'];
	  })
export default {
  data() {
    return {
	  options:{
	      option:{
			  tooltip: {
			      triggerOn: "click",
			  },
			  visualMap: {
			      min: 0,
			      max: 1000,
			      top: 20,
			      showLabel: !0,
            orient:'horizontal',
            textGap:5,
            itemGap:5,
            padding:2,
			      pieces: [{
			          gt: 200,
			          label: ">200",
			          color: "#cf4137"
			      }, {
			          gte: 100,
			          lte: 200,
			          label: "100-200",
			          color: "#ff5428"
			      }, {
			          gte:50,
			          lte:100,
			          label: "50-100",
			          color: "#ff8c71"
			      }, {
			          gt: 0,
			          lt: 50,
			          label: "0-50",
			          color: "#ede5e3"
			      }, {
					  lte: 0,
			          value: 0,
			          color: "#ffffff"
			      }],
			      show: true
			  },
			  geo: {
			      map: "china",
			      roam: false,
			      scaleLimit: {
			          min: 1,
			          max: 2
			      },
			      zoom: 1.23,
			      top: 120,
			      label: {
			          normal: {
			              show: true,
			              fontSize:7,
						  align:'center',
			              color: "rgba(0,0,0,0.7)"
			          }
			      },
			      itemStyle: {
			          normal: {
			              //shadowBlur: 50,
			              //shadowColor: 'rgba(0, 0, 0, 0.2)',
			              borderColor: "rgba(0, 0, 0, 0.2)"
			          },
			          emphasis: {
			              areaColor: "yellow",
			              shadowOffsetX: 0,
			              shadowOffsetY: 0,
			              borderWidth: 0
			          }
			      }
			  },
			  series: [{
			      name: "人数",
			      type: "map",
			      geoIndex: 0,
			      data:dataList
			  }]
		  }
	  }
    
	};
  }
};
</script>

<style scoped>
.ty-canvas {
  width: 750upx;
  height: 100vh;
  display: block;
  background-color: #eee;
}
</style>
