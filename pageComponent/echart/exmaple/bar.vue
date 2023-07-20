<template>
  <view>
    <my-canvas
      class="uni-ec-canvas"
      id="line-chart"
      canvas-id="multi-charts-line"
      :setOptions="options"
    ></my-canvas>
  </view>
</template>

<script>
export default {
  data() {
    return {
      options: {
        option: {
          title: {
            text: ""
          },
          tooltip: {
            trigger: "axis",
            formatter: "{b}\r\n{c0}人",
            axisPointer: {
              type: "line",
              axis: "x",
              label: {
                backgroundColor: "#000000"
              }
            }
          },
          xAxis: {
            type: "category",
            data: ["2-12", "2-14", "2-16", "2-18", "2-20", "2-22", "2-24"],
          },
          yAxis: {
            type: "value",
            axisLine: {
              // y轴
              show: true
            },
            axisTick: {
              // y轴刻度线
              show: true
            },
            splitLine: {
              // 网格线
              show: true
            }
          },
          series: [
            {
              name: "浏览量",
              type: "bar",
              lineStyle: {
                color: "#EF5959"
              },
              barWidth:20,
              data: [120, 132, 101, 134, 90, 230, 210]
            }
          ]
        }
      },
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
  },
};
</script>

<style scoped>
.uni-ec-canvas {
  width: 750upx;
  height: 750upx;
  display: block;
}
</style>
