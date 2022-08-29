<template>
<view class="backtop" v-if="show">
    <img src="../../static/top.png" alt="" @click="backtop">
</view>
</template>
<script>
export default {
name: 'backtop',
props:{
	show:{
		type:Object,
		default:false
	}
},
methods:{
	backtop(){
		this.$emit('backTop')
	}
}
}
</script>
<style scoped>
.backtop{
    position:fixed;
    bottom: 55px;
    right: 10px;
}
.backtop img{
    width: 44px;
    height: 44px;
}
</style>