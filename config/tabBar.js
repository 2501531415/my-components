export default  {
	data(){
		return {
			tabBar:{
				color: "#444444",
				selectedColor: "#f77d8b",
				borderStyle: "#eee",
				backgroundColor: "#ffffff",
				list: [{
						"pagePath": "pages/index/index",
						"iconPath": "../../static/img/tabbar/tag-0.png",
						"selectedIconPath": "../../static/img/tabbar/tag-1.png",
						"text": "首页",
						badge: '99'
					},
					{
						"pagePath": "pages/live/live",
						"iconPath": "../../static/img/tabbar/hot-0.png",
						"selectedIconPath": "../../static/img/tabbar/hot-1.png",
						"text": "直播",
						badge: '100'
					},
					{
						"pagePath": "pages/profile/profile",
						"iconPath": "../../static/img/tabbar/me.png",
						"selectedIconPath": "../../static/img/tabbar/meactive.png",
						"text": "我的"
					}
				]
			}
		}
	}
}
