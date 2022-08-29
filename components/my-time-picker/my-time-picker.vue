<template>
	<view>
		<picker mode="multiSelector" :range="timeType == 'all'?rangeAll:range" range-key="value" :value="timeType == 'all'?valueAll:value" @change="change" @columnchange="columnchange">
			<view v-if="timeType == 'all'">
				{{rangeAll[0][valueAll[0]].value.replace('年','')}}{{join}}{{rangeAll[1][valueAll[1]].value.replace('月','')}}{{join}}{{rangeAll[2][valueAll[2]].value.replace('日','')}}
				{{rangeAll[3][valueAll[3]].value.replace('时','')}}:{{rangeAll[4][valueAll[4]].value.replace('分','')}}:{{rangeAll[5][valueAll[5]].value.replace('秒','')}}
			</view>
			<view v-else>
				{{range[0][value[0]].value.replace('年','')}}{{join}}{{range[1][value[1]].value.replace('月','')}}{{join}}{{range[2][value[2]].value.replace('日','')}}
			</view>
		</picker>
	</view>
</template>

<script>
	export default {
		name:'MyPlacePicker',
		data(){
			var time = new Date()
			var year = time.getFullYear()
			var years = []
			var month = time.getMonth() + 1
			var months = []
			var day = time.getDate()
			var days = []
			var hour = time.getHours()
			var hours = []
			var minute = time.getMinutes()
			var minutes = []
			var second = time.getSeconds()
			var seconds = []
			for(let i=this.begainYear;i<this.endYear+1;i++){
				years.push({value:i + '年'})
			}
			for(let i=1;i<13;i++){
				if(i < 10){
					months.push({value:'0'+i + '月'})
				}else{
					months.push({value:i + '月'})
				}
			}
			for(let i=1;i<32;i++){
				if(i < 10){
					days.push({value:'0'+i + '日'})
				}else{
					days.push({value:i +'日'})
				}
			}
			for(let i=0;i<25;i++){
				if(i < 10){
					hours.push({value:'0'+i + '时'})
				}else{
					hours.push({value:i +'时'})
				}
			}
			for(let i=0;i<61;i++){
				if(i < 10){
					minutes.push({value:'0'+i + '分'})
				}else{
					minutes.push({value: i +'分'})
				}
			}
			for(let i=0;i<61;i++){
				if(i < 10){
					seconds.push({value:'0'+i + '秒'})
				}else{
					seconds.push({value:i +'秒'})
				}
			}
			var reg = /^0/
			var yearIndex = years.findIndex(item=>item.value == year + '年')
			var monthIndex = months.findIndex(item=>item.value.replace(reg,'') == month + '月')
			var dayIndex = days.findIndex(item=>item.value.replace(reg,'') == day + '日')
			var hourIndex = hours.findIndex(item=>item.value.replace(reg,'') == hour + '时')
			var minutesIndex = minutes.findIndex(item=>item.value.replace(reg,'') == minute + '分')
			var secondsIndex = seconds.findIndex(item=>item.value.replace(reg,'') == second + '秒')
			if(yearIndex == -1 || monthIndex == -1 || dayIndex == -1 || hourIndex == -1 || minutesIndex == -1 || secondsIndex == -1){
				yearIndex = monthIndex = dayIndex = hourIndex = minutesIndex = secondsIndex = 0
			}
			return {
				range:[years,months,days],
				rangeAll:[years,months,days,hours,minutes,seconds],
				value:[yearIndex,monthIndex,dayIndex],
				valueAll:[yearIndex,monthIndex,dayIndex,hourIndex,minutesIndex,secondsIndex]
			}
		},
		props:{
			timeType:{
				type:String,
				default:'normal'
			},
			//开始年份
			begainYear:{
				type:Number,
				default:1990
			},
			//结束年份
			endYear:{
				type:Number,
				default:()=>{
					return new Date().getFullYear()
				}
			},
			//展示的连接符
			join:{
				type:String,
				default:'-'
			}
		},
		onLoad() {
			console.log('1111')
		},
		methods:{
			columnchange(e){
				console.log(e)
				if(this.timeType == 'all'){
					this.valueAll[e.detail.column] = e.detail.value
				}else{
					this.value[e.detail.column] = e.detail.value
				}
			},
			change(e){
				if(this.timeType == 'all'){
					this.valueAll = e.detail.value
					const data = `${this.rangeAll[0][this.valueAll[0]].value.replace('年','')}${this.join}${this.rangeAll[1][this.valueAll[1]].value.replace('月','')}${this.join}${this.rangeAll[2][this.valueAll[2]].value.replace('日','')} ${this.rangeAll[3][this.valueAll[3]].value.replace('时','')}:${this.rangeAll[4][this.valueAll[4]].value.replace('分','')}:${this.rangeAll[5][this.valueAll[5]].value.replace('秒','')}`
					this.$emit('submit',data)
				}else{
					this.value = e.detail.value
					const data = `${this.range[0][this.value[0]].value.replace('年','')}${this.join}${this.range[1][this.value[1]].value.replace('月','')}${this.join}${this.range[2][this.value[2]].value.replace('日','')}`
					this.$emit('submit',data)
				}
				
			}
		}
	}
</script>

<style>
</style>
