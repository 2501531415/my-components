<template>
	<view class="my-drop-down">
		<view class="my-drop-down-item" v-for="(item,index) in options" :key="index" @click="itemClick(item,index)">
			<view :class="[{'my-drop-down-active':currentIndex == index},'my-drop-down-item-title']">
				<!-- {{valueObject[item[indexObject[index]].value] == item[indexObject[index]].value && Object.keys(titleObject).length > 0?titleObject[item[indexObject[index]].value]:item[0].text}} -->
				{{Object.keys(indexObject).length > 0 && indexObject.hasOwnProperty(index)?item[indexObject[index]].text:item[0].text}}
			</view>
		</view>
		<view :class="[dropStaus?'my-drop-down-menu-show':'my-drop-down-menu-hide']" v-if="dropStaus">
			<view class="my-drop-down-menu-overlay" @click="overlay">
				
			</view>
			<view class="my-drop-down-menu-list">
					<view class="my-drop-down-menu-item" v-for="(option,indey) in listData" :key="indey" @click="menuItemClick(option,indey)">
						<view :class="[{'my-drop-down-active':Object.values(valueObject).includes(option.value) || (valueIndex == 0 && listData[valueIndex].value == option.value)},'my-drop-down-menu-item-text']">
							{{option.text}}
							<!-- {{Object.values(valueObject).includes(option.value)}} -->
							<!-- {{Object.values(indexObject).length ==0}}
							{{listData[valueIndex].value == option.value}} -->
						</view>
						<image src="../../static/right.jpg" mode="" v-if="Object.values(valueObject).includes(option.value) || (valueIndex == 0 && listData[valueIndex].value == option.value)" class="my-drop-down-right-image"></image>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'DropDown',
		data(){
			return {
				title:null,
				listData:[],
				currentIndex:null,
				dropStaus:false,
				valueObject:{},
				titleObject:{},
				indexObject:{},
				value:0,
				valueIndex:0,
			}
		},
		onLoad(){
			this.value = this.valueFirst
		},
		props:{
			//初次显示的value
			valueFirst:{
				type:Number | String,
				default:0
			},
			options:{
				type:Array
			}
		},
		methods:{
			itemClick(item,index){
				if(this.currentIndex == index){
					this.currentIndex = null
					this.dropStaus = !this.dropStaus
				}else{
					
					var data = index.toString()
					console.log(Object.keys(this.valueObject).includes(data))
					if(!Object.keys(this.valueObject).includes(data)){
						this.valueIndex = 0
					}else{
						this.valueIndex = null
					}
					this.currentIndex = index
					this.listData = item
					this.dropStaus = true
				}
			},
			overlay(){
				this.currentIndex = null
				this.dropStaus = false
			},
			menuItemClick(option,index){
				// titleObject.()
				delete this.valueObject[this.value]
				delete this.titleObject[this.currentIndex]
				delete this.indexObject[this.currentIndex]
				this.value = option.value,
				this.valueIndex = index
				this.valueObject[this.currentIndex] = option.value
				this.titleObject[this.currentIndex] = option.text
				this.indexObject[this.currentIndex] = index
				console.log(this.titleObject)
				console.log(this.valueObject)
				this.currentIndex = null
				this.dropStaus = false
			}
		}
	}
</script>

<style>
	.my-drop-down{
		display: flex;
		align-items: center;
		height: 48px;
		background-color: #fff;
		box-shadow: 0 2px 12px rgba(100, 101, 102, 0.12);
		/* height: 100%; */
		position: relative;
		line-height: 46px;
	}
	.my-drop-down-item{
		flex: 1;
		text-align: center;
		height: 100%;
		padding: 0px 10px;
	}
	.my-drop-down-menu-overlay{
		height: 100%;
		width: 100%;
		background-color: rgba(0,0,0,0.75);
		z-index: 999;
	}
	.my-drop-down-menu-show{
		height: 100%;
		width: 100%;
		position: fixed;
		top: 48px;
		animation:show 0.3s ease both;
	}
	 .my-drop-down-menu-hide{
	 	height: 100%;
	 	width: 100%;
	 	position: fixed;
	 	top: 48px;
	 	animation:hide 0.3s ease both;
	 }
	.my-drop-down-menu-list{
		position: absolute;
		top: 0;
		z-index: 1000;
		width: 100%;
		background-color: white;
	}
	@keyframes show {0% {opacity:0;}100% {opacity:1;}}
	@keyframes hide {0% {opacity:1;}100% {opacity:0;}}
	.my-drop-down-menu-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 10px;
	}
	.my-drop-down-active{
		color: #ee0a24;
	}
	.my-drop-down-right-image{
		width: 20px;
		height: 20px;
	}
</style>
