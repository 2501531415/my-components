<template>
	<view class="my-drop-down">
		<view class="my-drop-down-item" v-for="(item,index) in options" :key="index" @click="itemClick(item,index)">
			<view :style="{color:(currentIndex == index?activeColor:'')}" class="my-drop-down-item-title">
				{{Object.keys(indexObject).length > 0 && indexObject.hasOwnProperty(index)?item[indexObject[index]].text:item[0].text}}
			</view>
			<view :style="{'border-color':(currentIndex == index?`transparent transparent ${topAllow} transparent`:`#dcdee0 transparent transparent transparent`)}" 
			:class="[{'my-drop-down-icon-active':currentIndex == index},'my-drop-down-icon']"></view>
		</view>
		<view :style="{top:top + 48 + 'px'}" :class="[dropStaus?'my-drop-down-menu-show':'my-drop-down-menu-hide']" v-if="dropStaus">
			<view class="my-drop-down-menu-overlay" @click="overlay" v-if="overlayStatus">
			</view>
			<view class="my-drop-down-menu-list" :style="{'background-color':listBgc}">
				<!-- <view class="my-drop-down-menu-item" v-for="(option,indey) in listData" :key="indey" @click="menuItemClick(option,indey)">
					<view :style="{color:(Object.values(valueObject).includes(option.value) || (valueIndex == 0 && listData[valueIndex].value == option.value)?activeColor:'')}"
					 class="my-drop-down-menu-item-text">
						{{option.text}}
					</view>
					<image src="../../static/right.jpg" mode="" v-if="Object.values(valueObject).includes(option.value) || (valueIndex == 0 && listData[valueIndex].value == option.value)"
					 class="my-drop-down-right-image"></image>
				</view> -->
				<view class="my-drop-down-menu-list-center">
					<view class="my-drop-down-menu-left">
							<view v-for="(option,indez) in listData" :key="indez" :style="{color:(Object.values(valueObject).includes(option.value) || (valueIndex == 0 && listData[valueIndex].value == option.value)?activeColor:'')}"
							class="my-drop-down-left-item" @click="leftItemClick(option,indez)">
								{{option.text}}
							</view>
					</view>
					<view class="my-drop-down-menu-right" v-if="childrenOption.length > 0">
						<view class="my-drop-down-right-item" v-for="(option,indey) in childrenOption" :key="indey" @click="rightItemClick(option,indey)">
							{{option.text}}
						</view>
					</view>
					<view class="my-drop-down-menu-right" v-else>
						<view class="my-drop-down-right-item" v-for="(option,indey) in listData[valueIndex].children" :key="indey">
							{{option.text}}
						</view>
					</view>
				</view>
				<view class="my-drop-down-menu-list-button">
					<button type="default">重置</button>
					<button type="primary">完成</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'DropDown',
		data() {
			return {
				title: null,
				listData: [],
				childrenOption:[],
				currentIndex: null,
				dropStaus: false,
				valueObject: {},
				titleObject: {},
				indexObject: {},
				value: 0,
				valueIndex: 0,
				top:null
			}
		},
		onLoad() {
			this.value = this.valueFirst
		},
		props: {
			dropType:{
				type:String,
				default:'normal'
			},
			//初次显示的value
			valueFirst: {
				type: Number | String,
				default: 0
			},
			//菜单选项配置
			options: {
				type: Array
			},
			//菜单标题和选项的选中态颜色
			activeColor: {
				type: String,
				default: '#ee0a24'
			},
			//是否显示遮罩层
			overlayStatus: {
				type: Boolean,
				default: true
			},
			//是否在点击遮罩层后关闭菜单
			closeOnClickOverlay: {
				type: Boolean,
				default: true
			},
			//是否在选中之后关闭菜单
			closeOnChoose: {
				type: Boolean,
				default: true
			},
			//菜单的背景颜色
			listBgc: {
				type: String,
				default: 'white'
			},
			//箭头的颜色
			topAllow:{
				type:String,
				default:'#ee0a24'
			}
		},
		mounted(){
			setTimeout(()=>{
				this.getTop()
			},100)
		},
		methods: {
			//获取top
			getTop(){
				var that = this
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(".my-drop-down").boundingClientRect()
				query.exec((res) => {
					that.top = res[0][0].top
				})
			},
			//选项切换
			itemClick(item, index) {
				if (this.currentIndex == index) {
					this.currentIndex = null
					this.dropStaus = !this.dropStaus
				} else {
					var data = index.toString()
					if (!Object.keys(this.valueObject).includes(data)) {
						this.valueIndex = 0
					} else {
						this.valueIndex = null
					}
					this.currentIndex = index
					this.listData = item
					this.dropStaus = true
				}
			},
			//点击遮罩
			overlay() {
				//允许点击遮罩关闭菜单
				if (this.closeOnClickOverlay) {
					this.currentIndex = null
					this.dropStaus = false
				} else {
					return
				}
			},
			leftItemClick(option,index){
				this.childrenOption = option.children
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
				this.$emit('change', {
					detail: option.text,
					value: option.value
				})
			},
			rightItemClick(option,indey){
				
			}
		}
	}
</script>

<style>
	.my-drop-down {
		display: flex;
		align-items: center;
		height: 48px;
		background-color: #fff;
		box-shadow: 0 2px 12px rgba(100, 101, 102, 0.12);
		/* height: 100%; */
		position: relative;
		line-height: 46px;
	}

	.my-drop-down-item {
		flex: 1;
		text-align: center;
		height: 100%;
		padding: 0px 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.my-drop-down-menu-overlay {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.75);
		z-index: 999;
	}

	.my-drop-down-menu-show {
		height: 100%;
		width: 100%;
		position: fixed;
		top: 85px;
		animation: show 0.3s ease both;
	}

	.my-drop-down-menu-hide {
		height: 100%;
		width: 100%;
		position: fixed;
		top: 85px;
		animation: hide 0.3s ease both;
	}

	.my-drop-down-menu-list {
		position: absolute;
		top: 0;
		z-index: 1000;
		width: 100%;
	}
	/* .my-drop-down-menu-list-select{
		display: flex;
	} */
	@keyframes show {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hide {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	.my-drop-down-menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 10px;
	}
	.my-drop-down-menu-list-center{
		display: flex;
	}
	.my-drop-down-menu-list-button{
		display: flex;
	}
	.my-drop-down-menu-list-button button:first-child{
		flex: 1;
		border-radius: 0;
	}
	.my-drop-down-menu-list-button button:last-child{
		flex: 2;
		border-radius: 0;
	}
	.my-drop-down-menu-left{
		flex: 1;
		/* background-color: red; */
	}
	.my-drop-down-left-item,.my-drop-down-right-item{
		background-color: #f7f8fa;
		font-size: 14px;
		padding: 0px 10px;
	}
	.my-drop-down-menu-right{
		flex: 1;
		background-color: yellow;
	}

	.my-drop-down-active {
		color: #ee0a24;
	}

	.my-drop-down-right-image {
		width: 20px;
		height: 20px;
	}

	.my-drop-down-icon {
		width: 0;
		height: 0;
		border-width: 5px;	
		border-style: solid;
		margin: 5px 0px 0px 5px;
	},
	.my-drop-down-icon-active{
		margin:0px 0px 5px 5px;
	}
</style>
