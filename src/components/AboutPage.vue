<template>
<div id="app">

  <div class="contents">
    <div class="row mb-4">


      <div class="col-md-4 col-12 pt-4 d-flex align-content-center flex-wrap">
        <LoginForm></LoginForm>
      </div>


      <div class="col-md-8 col-12">
        <div class="row mt-4" data-aos="fade-left" data-aos-duration="3200">
          <div class="col-12">
            <div class="card shadow static-card about-card">
              <h1 class="mb-4">About Dental Hub</h1>
                <p>
                  Dental Hub records the patient profile, treatment provided, their history of treatment and recall status.
                  It will help and guide dentists through a progression of interactions with patients and it's over all intent.
                  This app is will help automate differential diagnosis, provide treatment guidance, contain detailed medical history.
                </p>
                <p>
                  <a href="https://abhiyantrik.com" target="_blank">Abhiyantrik Technology</a> and <a href="http://evanepal.org/" target="_blank">Jevaia Foundation</a> expect that, this app will be helpful to the dental public health workers deliver oral health care to the rural villages in Nepal.
                  Serivice delivery, timely followup, improvement in service delivery over the time, logistics and resource support were some of the big issues faced by Jevaia Foundation during the program execution.
                  This app is designed to help rural dental public health workers deliver personalised care and perform regular follow-up as per their needs.
                  The app is supposed to provide step by step information support to the health workers increasing their effiency, reducing the cognitive load and reducing the record keeping tasks.
                </p>
              <h5>Jevaia Foundation</h5>
              <ul>
                <li>
                  <p>At Jevaia, we believe in a human rights approach to our work: all people are entitled to basic security, personal and cultural autonomy, and a life of dignity.  Our programs are designed around collaboration, sustainability, and respect for culture.
                    While we have had a number of programs over the years, Jevaia’s primary initiative focuses on the development of rural dental care.  Oral disease is a widely ignored public health epidemic in Nepal, and is closely linked with malnutrition, cardiac problems, risky pregnancy, and overall lowered immune competency.  Our community-based design is the only one of its kind in Nepal.
                  </p>
                </li>
              </ul>

              <h5>Jevaia Oral Health Care</h5>
              <ul>
                <li>
                  OHC (formerly the Kaski Oral Health Care Project) establishes sustainable, community-based based dental care in rural areas of Nepal. We work in each village for 2.5 years, and a team of three residents implements the project with intensive guidance.  Our comprehensive model includes a local dental clinic staffed by a rural dental technician, school-based oral health education and prevention, and vendor outreach.
                  JOHC programs currently empower over 50,000 people to access dental care and basic oral hygiene products.
                </li>
              </ul>

                <h5>Abhiyantrik Technology</h5>
                <ul>
                  <li>
                    <p>
                      Abhiyantrik Technology is a tech company based at Babarmahal, Kathmandu, Nepal,
                      dedicated to solving issues of our partners and help them achieve their dream by delivering the highest quality of service.
                      Our area of expertise includes technology development, technology consultation, technology integration and system development.
                    </p>
                  </li>
                </ul>

                  <h5>Special Thanks</h5>
                  <ul>
                    <p>Mr. Mukesh Jha</p>
                  </ul>

                  <h5>Important Links</h5>
                    <ul>
                      <li><a href="#" > Dental Hub Web Panel</a></li>
                      <li><b-link to="/privacypolicy" > Privacy Policy</b-link></li>
                      <li><a href="#" > Install Dental Hub from Google Playstore</a></li>
                    </ul>

                <h5>Contact Us</h5>
                <ul>
                  <li>
                    <a href="http://evanepal.org/" target="_blank"> Jevaia Foundation</a>
                  </li>

                  <li>
                    <a href="https://abhiyantrik.com" target="_blank">Abhiyantrik Technology</a>: <a href="mailto:info@abhiyantrik.com" target="_blank">info@abhiyantrik.com</a>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import LoginForm from './LoginForm';

const axios = require('axios');
export default {
  name: "About",
  components:{
    'LoginForm': LoginForm,
  },

  data() {
    return {

    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../css/loginpage.scss";

</style>
