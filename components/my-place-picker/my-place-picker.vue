<template>
	<picker mode="multiSelector" :range="range" range-key="value" :value="value" @change="change" @columnchange="columnchange">
		{{range[0][value[0]].value}}{{range[1][value[1]].value}}
	</picker>
</template>

<script>
	export default {
		name:'PlacePicker',
		data(){
			return {
				placeData:{
					  "110000": "北京市",
					  "110100": "市辖区",
					  "110101": "东城区",
					  "110102": "西城区",
					  "110105": "朝阳区",
					  "110106": "丰台区",
					  "110107": "石景山区",
					  "110108": "海淀区",
					  "110109": "门头沟区",
					  "110111": "房山区",
					  "110112": "通州区",
					  "110113": "顺义区",
					  "110114": "昌平区",
					  "110115": "大兴区",
					  "110116": "怀柔区",
					  "110117": "平谷区",
					  "110118": "密云区",
					  "110119": "延庆区",
					  "120000": "天津市",
					  "120100": "市辖区",
					  "120101": "和平区",
					  "120102": "河东区",
					  "120103": "河西区",
					  "120104": "南开区",
					  "120105": "河北区",
					  "120106": "红桥区",
					  "120110": "东丽区",
					  "120111": "西青区",
					  "120112": "津南区",
					  "120113": "北辰区",
					  "120114": "武清区",
					  "120115": "宝坻区",
					  "120116": "滨海新区",
					  "120117": "宁河区",
					  "120118": "静海区",
					  "120119": "蓟州区",
				},
				range:[],
				value:[0,0]
			}
		},
		props:{
			//初始化地区
			initPlace:{
				type:String
			},
			//要移除的地区
			filterPlace:{
				type:Array,
				default:[]
			},
		},
		created() {
			this.init()
		},	
		methods:{
			init(){
				const province = []
				const city = []
				// for(let i = 1;i<Object.keys(this.placeData).length;i++){
				// 	if(this.placeData[`1${i}0000`]){
				// 		province.push(this.placeData[`1${i}0000`])
				// 	}else{
				// 		break;
				// 	}
				// }
				// else if(this.placeData[item] == '市辖区'){
				// 	delete this.placeData[item]
				// }
				// console.log(province)
				if(this.initPlace){
					var reg = null
					var initIndex = null
					Object.keys(this.placeData).forEach(item=>{
						if(this.placeData[item] == this.initPlace){
							initIndex = item.split('')[0] + item.split('')[1]
							console.log(initIndex)
							reg = new RegExp(`^${initIndex}`)
						}
					})
					Object.keys(this.placeData).forEach((item,index)=>{
							if(this.placeData[`1${index}0000`]){
								province.push({value:this.placeData[`1${index}0000`]})
							}else if(reg.test(item) && item !== `${initIndex}0000` && this.placeData[item] != '市辖区'){
								city.push({value:this.placeData[item]})
							}
					})
					console.log(city)
					console.log(province)
					const provinceIndex = province.findIndex(item=>item.value == this.placeData[`${initIndex}0000`])
					const cityIndex = city.findIndex(item=>item.value == this.initPlace)
					this.value = [provinceIndex,cityIndex]
					this.range = [province,city]
					console.log(this.range)
				}
			},
			change(e){
				
			},
			columnchange(e){
				if(e.detail.column == 0){
					this.province(e)
				}
			},
			//省市联动
			province(e){
				var reg = null
				var changeIndex = null
				var city = []
				Object.keys(this.placeData).forEach((item,index)=>{
						if(this.placeData[item] == this.range[e.detail.column][e.detail.value].value){
							changeIndex = item.split('')[0] + item.split('')[1]
							reg = new RegExp(`^${changeIndex}`)
						}
				})
				Object.keys(this.placeData).forEach((item,index)=>{
					if(reg.test(item) && item !== `${changeIndex}0000` && this.placeData[item] != '市辖区'){
						city.push({value:this.placeData[item]})
					}
				})
				this.range = [this.range[0],city]
				this.value = [e.detail.value,0]
			}
		}
	}
</script>

<style>
</style>
