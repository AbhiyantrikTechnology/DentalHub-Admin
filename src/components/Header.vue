<template>
<div id="app" class="header">
  <b-navbar toggleable="lg" type="light" fixed="top">
    <b-navbar-brand to="/"><b-img src="/dentalheaderimage.png" fluid class="mr-3 mr-lg-0 header-logo"></b-img><span class="d-sm-inline d-md-inline d-lg-none">Dental Hub</span></b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/treatment">Treatment Data</b-nav-item>
        <b-nav-item to="/encountermodify">Flag</b-nav-item>
        <b-nav-item to="/users">Users</b-nav-item>
        <b-nav-item to="/geography">Area</b-nav-item>
        <b-nav-item-dropdown>
          <template slot="button-content">Reasearch and Strategy</template>
          <b-dropdown-item to="/cross-sectional">Cross-Sectional Measures</b-dropdown-item>
          <b-dropdown-item to="/longitudinal">Longitudinal Measures</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item class="settings" to="settings"><span class="d-none d-sm-none d-md-none d-lg-inline"><i class="fas fa-cog"></i></span><span class="icon-label d-sm-inline d-md-inline d-lg-none">Settings</span></b-nav-item>
        <b-nav-item to="/logout"><span class="d-none d-sm-none d-md-none d-lg-inline"><i class="fas fa-sign-out-alt"></i></span><span class="icon-label d-sm-inline d-md-inline d-lg-none">Logout</span></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

</div>
</template>

<script>
export default {
  name: "AppHeader",
  components:{

  },

};
</script>

<style lang="scss" scoped>
@import '../css/header';

</style>
