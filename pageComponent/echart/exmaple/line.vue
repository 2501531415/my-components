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
          grid: {
            left: "6%",
            right: "6%",
            top: "6%",
            bottom: "6%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["2-12", "2-14", "2-16", "2-18", "2-20", "2-22", "2-24"],
            axisLine: {
              // y轴
              show: false
            },
            axisTick: {
              // y轴刻度线
              show: false
            },
            splitLine: {
              // 网格线
              show: false
            }
          },
          yAxis: {
            type: "value",
            axisLine: {
              // y轴
              show: false
            },
            axisTick: {
              // y轴刻度线
              show: false
            },
            splitLine: {
              // 网格线
              show: false
            }
          },
          series: [
            {
              name: "浏览量",
              type: "line",
              smooth: true,
              areaStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#E50113" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#fff" // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              },
              lineStyle: {
                color: "#EF5959"
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            }
          ]
        }
      }
    };
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
