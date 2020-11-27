<template>

	<div id="app">
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "Logout",
  mounted: function() {
		window.localStorage.setItem("token","");
    this.setToken('');
    this.$router.replace("/");
	},
	methods:{
		...mapMutations([
			'setToken'
		])
	}
};
</script>
