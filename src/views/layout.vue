<template>
	<a-layout class="ant-layout-box">
		<a-layout-sider
			v-model:collapsed="collapsed"
			:trigger="null"
			collapsible
            class="ant-layout-aside"
		>
			<div class="logo">尖锋管理系统</div>
			<a-menu
				theme="dark"
				mode="inline"
				v-model:selectedKeys="selectedKeys"
			>
				<a-menu-item key="1">
					<user-outlined />
					<span>用户管理</span>
				</a-menu-item>
				<a-menu-item key="2">
					<video-camera-outlined />
					<span>班级管理</span>
				</a-menu-item>
				<a-menu-item key="3">
					<upload-outlined />
					<span>设置</span>
				</a-menu-item>
			</a-menu>
		</a-layout-sider>
		<a-layout class="ant-layout-right">
			<a-layout-header class="ant-layout-right-header">
				<div class="ant-layout-right-header-trigger">
					<menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
					<menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
				</div>
				<a-breadcrumb class="ant-layout-right-header-breadcrumb">
					<template v-for="item in breadcrumb">
						<template v-if="item.name !== 'Home'">
							<a-breadcrumb-item><router-link :to="item.path">{{item.name}}</router-link></a-breadcrumb-item>
						</template>
					</template>
				</a-breadcrumb>
			</a-layout-header>
			<a-layout-content class="ant-layout-content">
				<router-view></router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script lang="ts">
import {
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref, computed } from "vue";
import { mapState } from 'vuex'
import store from '../store/index'

export default defineComponent({
	components: {
		UserOutlined,
		VideoCameraOutlined,
		UploadOutlined,
		MenuUnfoldOutlined,
		MenuFoldOutlined,
	},
	setup() {
		// 对象转数组
		const objToArr = obj => {
			const arr = [];
			(function getDeepObj (v) { 
				arr.push({
					name: v.name,
					path: v.path
				})
				if (v.children && v.children.length > 0) {
					getDeepObj(v.children[0])
				}
			})(obj);
			return arr
		}
		// 网站地图
		const breadcrumb = computed(() => {
			console.log(store.getters.getBreadcrumb)
			return store.getters.getBreadcrumb.matched
		})

		return {
			selectedKeys: ref<string[]>(["1"]),
			collapsed: ref<boolean>(false),
			breadcrumb
		};

	},
});
</script>
<style lang="scss" scoped>
$header-height: 64px;
.ant-layout-box{
    height: 100%;
    background-color: #f0f2f5;
    .ant-layout-aside{
        height: 100%;
        overflow-y: hidden;
        .logo {
            height: 32px;
            line-height: 32px;
            color: #fff;
            font-size: 20px;
            margin: 16px;
            text-align: center;
            overflow: hidden;
        }
    }
    .ant-layout-right{
        height: 100%;
        overflow-y: hidden;
        position: relative;
        padding-top: $header-height;
        &-header{
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1000;
            width: 100%;
            background-color: #fff;
            padding: 0;
			&-trigger{
				position: absolute;
				left: 0;
				top: 0;
				width: $header-height;
				height: $header-height;
				.trigger {
					font-size: 18px;
					line-height: $header-height;
					padding: 0 24px;
					cursor: pointer;
					transition: color 0.3s;
				}
				.trigger:hover {
					color: #1890ff;
				}
			}
			&-breadcrumb{
				padding-left: $header-height;
				height: $header-height;
				line-height: $header-height;
			}
        }
        .ant-layout-content{
            padding: 24px 16px;
            min-height: 100%;
        }
    }
}
</style>
