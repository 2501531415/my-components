<template>
  <view>
    <my-canvas
      class="uni-ec-canvas"
      id="pie-chart"
      canvas-id="multi-charts-pie"
      :setOptions="options2"
    ></my-canvas>
  </view>
</template>

<script>
export default {
  data() {
    return {
      options2: {
        option: {
          title: {
            text: "7,5950",
            left: "center",
            top: "40%",
            subtext: "客户总数",
            subtextStyle: {
              color: "#959595",
              fontSize: 12,
              align: "center"
            },
            textStyle: {
              color: "#19193E",
              fontSize: 23,
              align: "center"
            }
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["40%", "60%"],
              label: {
                position: "outside",
                color: "#19193E",
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                },
                fontSize: 10
              },
              labelLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data: [
                {
                  value: 3321,
                  name: "直销中心",
                  itemStyle: {
                    normal: { color: "#EF5959" },
                    emphasis: { color: "#EF5959" }
                  }
                },
                {
                  value: 1148,
                  name: "手动录入",
                  itemStyle: {
                    normal: { color: "#ffa974" },
                    emphasis: { color: "#ffa974" }
                  }
                },
                {
                  value: 2532,
                  name: "线上访客",
                  itemStyle: {
                    normal: { color: "#ffc68a" },
                    emphasis: { color: "#ffc68a" }
                  }
                },
                {
                  value: 1148,
                  name: "线下拓客",
                  itemStyle: { color: "#F0DD93" }
                },
                {
                  value: 1148,
                  name: "名片海报",
                  itemStyle: { color: "#E7CB84" }
                },
                {
                  value: 1148,
                  name: "自然来访",
                  itemStyle: { color: "#7EBD95" }
                },
                { value: 1148, name: "分享家", itemStyle: { color: "#687793" } }
              ]
            }
          ]
        }
      }
    };
  },
  onReady() {
    setTimeout(() => {
      this.options.option.series[0].data = [1, 2, 3, 4, 5, 6, 7];
      console.log("折线图数据改变啦");
    }, 1000);
    setTimeout(() => {
      //数组内的数据要$set哦
      this.options2.option.series[0].data[0].value = 0;
      console.log("折线图数据改变啦");
    }, 2000);
  }
};
</script>

<style scoped>
.uni-ec-canvas {
  width: 750upx;
  height: 750upx;
  display: block;
}
</style>
