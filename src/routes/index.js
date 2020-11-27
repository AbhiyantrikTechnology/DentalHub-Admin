import IndexPage from '../components/IndexPage.vue';
import Treatment from '../components/Treatment.vue';
import Users from '../components/Users.vue';
import Geography from '../components/Geography.vue';
import CrossSectional from '../components/CrossSectional.vue';
import Longitudinal from '../components/Longitudinal.vue';
import Settings from '../components/Settings.vue';
import LoginPage from '../components/LoginPage.vue';
import Logout from '../components/Logout.vue';
import About from '../components/AboutPage.vue';
import Help from '../components/HelpPage.vue';
import PrivacyPolicy from '../components/PrivacyPolicyPage.vue';
import EncounterModify from '../components/EncounterModify.vue';
import PageNotFound from '../components/PageNotFound.vue';

export default[
  {path: '/', name: 'loginpage', component: LoginPage},
  {path: '/users', name: 'users', component: Users},
  {path: '/treatment', name: 'treatment', component: Treatment},
  {path: '/geography', name: 'geography', component: Geography},
  {path: '/encountermodify', name: 'encountermodify', component: EncounterModify},
  {path: '/cross-sectional', name: 'cross-sectional', component: CrossSectional},
  {path: '/longitudinal', name: 'longitudinal', component: Longitudinal},
  {path: '/settings', name: 'settings', component: Settings},
  {path: '/logout', name: 'logout', component: Logout},
  {path: '/about', name: 'about', component: About},
  {path: '/help', name: 'help', component: Help},
  {path: '/privacypolicy', name: 'privacypolicy', component: PrivacyPolicy},
  {path: '*', name: 'pagenotfound', component: PageNotFound},

]
