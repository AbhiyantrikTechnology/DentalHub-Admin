const axios = require('axios');

export default {
  listReturnDate({commit}){
    axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
    return axios
    .get('returndate',)
    .then(response => {
      if(response.status==200){
        commit("setReturnDate",response.data);
      }
    })
  },
      updateProfile({state,commit}, updateprofile){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .put('profile/update', updateprofile)
        .then(response => {
          commit("setSuccessMessage",'success');
          state.profile.push(response.data)
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage');
          }
        })
      },

      listUsers({commit}){
        axios.defaults.headers.common['authorization'] = 'JWT '+ this.state.token
        return axios
          .get('users', {})
          .then(response => {
              commit('setUsers',response.data);
          })
      },

      createUser({state,commit}, user_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .post('users', user_obj)
        .then(response => {
          if(response.status==200){
            commit("setSuccessMessage",'success')
            state.users.push(response.data);
          }
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

      updateUser({state,commit}, user_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .put('users/'+user_obj.id, user_obj)
        .then(response => {
          if(response.status==200){
            commit("setSuccessMessage",'success')
            state.users.push(response.data);
          }
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },
      deleteUser({state,commit},user_id){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .delete('users/'+user_id)
        .then(response => {
          if(response.status==204){
            commit("setSuccessMessage",'success')
            state.users.push(response.data);
          }
        })
      },

      updateUserStatus({state,commit}, user_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .post('userstatus/'+user_obj.userid,user_obj)
        .then(response => {
          if(response.status==200){
            var userdetail
            if(user_obj.status_obj== false || user_obj.status_obj== "false"){
              userdetail = state.users.find(evt => evt.id == user_obj.userid)
              userdetail.active="true"
            }else if(user_obj.status_obj== true || user_obj.status_obj== "true") {
              userdetail = state.users.find(evt => evt.id == user_obj.userid)
              userdetail.active="false"
              }
            }
            commit("setSuccessMessage",'success')
          })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

      listActivitie({commit}){
        axios.defaults.headers.common['authorization'] = 'JWT '+ this.state.token
        return axios
          .get('events', {})
          .then(response => {
              commit('setActivities',response.data);
          })
      },

      listGeography({commit}){
        axios.defaults.headers.common['authorization'] = 'JWT '+ this.state.token
        return axios
        .get('geography', {})
        .then(response => {
          commit('setGeography',response.data);
        })
      },

      createGeography({state,commit}, geography_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .post('geography', geography_obj)
        .then(response => {
          commit("setSuccessMessage",'success')
          state.geography.push(response.data);
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

      updateGeography({commit}, geography_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .put('geography/'+ geography_obj.id, geography_obj)
        .then(response => {
          if(response.status==200){
            commit("setSuccessMessage",'success')
          }

        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

      deleteGeography({state,commit},geography_id){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .delete('geography/'+geography_id)
        .then(response => {
          if(response.status==204){
            commit("setSuccessMessage",'success')
            state.geography.push(response.data);
          }
        })
      },

      changePassword({commit}, password_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .post('users/changepassword', password_obj)
        .then(response => {
          if(response.status==200){
          commit("setSuccessMessage",'success');
          }
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

      resetPassword({commit}, resetpassword_obj){
        axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
        return axios
        .post('adminresetpassword', resetpassword_obj)
        .then(response => {
          if(response.status==200){
            commit("setSuccessMessage",'success');
          }
        })
        .catch(error => {
          if(error){
            commit("setErrorMessage", 'errormessage')
            commit("setMessage", error.response.data.message);
          }
        })
      },

    listRole({commit}){
      return axios
      .get('roles',)
      .then(response => {
        if(response.status==200){
          commit("setRole",response.data);
        }
      })
    },

    listLoginVisualization({commit}){
      return axios
      .get('loginvisualization',)
      .then(response => {
        if(response.status==200){
          commit("setLoginVisualization",response.data);
        }
      })
    },

    listLoginVisualization1({commit}){
      return axios
      .get('loginvisualization1',)
      .then(response => {
        if(response.status==200){
          commit("setLoginVisualization1",response.data);
        }
      })
    },


    listDashboardLineChartGraph({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('dashboardlinechart',)
      .then(response => {
        if(response.status==200){
          commit("setDashboardLineChartGraph",response.data);
        }
      })
    },



    listOverviewTable({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('overviewvisualization',)
      .then(response => {
        if(response.status==200){
          commit("setOverviewTable",response.data);
        }
      })
    },

    CreateOverViewVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('overviewvisualization', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setOverviewTable",response.data);
        }

      })
    },

    listTreatmentbyActivity({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('treatmentactivities',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentbyActivity",response.data);
        }
      })
    },

    CreateTreatmentbyActivity({commit}, treatmentactivitie_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('treatmentactivities', treatmentactivitie_obj)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentbyActivity",response.data);
        }

      })
    },

    listTreatmentbyWard({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('treatmentwards',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentbyWard",response.data);
        }
      })
    },

    CreateTreatmentbyWard({commit}, treatmentward_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('treatmentwards', treatmentward_obj)
      .then(response => {
        if(response.status==200){
          commit("setErrorMessage", "")
          commit("setSuccessMessage",'success')
          commit("setTreatmentbyWard",response.data);
        }

      })
      .catch(error => {
        if(error){
          commit("setErrorMessage", 'errormessage')
          commit("setMessage", error.response.data.message);
        }
      })
    },

    listOverviewBarGraph({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('overviewbargraph',)
      .then(response => {
        if(response.status==200){
          commit("setOverviewBarGraph",response.data);
        }
      })
    },

    CreateTreatmentBarGraph({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('settingsgraphfilter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setOverviewBarGraphPost",response.data);
          // commit("setOverviewBarGraph",response.data);
        }

      })
    },

    listOverviewPieChartGraph ({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('overviewpiechart',)
      .then(response => {
        if(response.status==200){
          commit("setOverviewPieChartGraph",response.data);
        }
      })
    },

    CreateDashboardPieChart({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('piechartfilter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
            commit("setDashboardPieChartPost",response.data);
            // commit("setOverviewPieChartGraph",response.data);
        }

      })
    },




    listTreatmentTableBasicData({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('treatment',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentTableBasicData",response.data);
        }
      })
    },


    listTreatmentStrategicData({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('treatmentstrategicdatas',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentStrategicData",response.data);
        }
      })
    },



    listWards({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('wards',)
      .then(response => {
        if(response.status==200){
          commit("setWards",response.data);
        }
      })
    },


    listUserWards({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('userwards',)
      .then(response => {
        if(response.status==200){
          commit("setUserWards",response.data);
        }
      })
    },


    updateWard({state,commit}, ward_id_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .put('wards/'+ward_id_obj.id, ward_id_obj)
      .then(response => {
        state.wards_obj.push(response.data)
        commit("setSuccessMessage",'success')
      })
    },

    listSectionalTable({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('sectional',)
      .then(response => {
        if(response.status==200){
          commit("setSectionalTable",response.data);
        }
      })
    },


    listTreatmentPreventionRatio({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('preventionratio',)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentPreventionRatio",response.data);
        }
      })
    },

    listEarlyIntervention({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('earlyintervention',)
      .then(response => {
        if(response.status==200){
          commit("setEarlyIntervention",response.data);
        }
      })
    },

    listRecallDistribution({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('recalldistribution',)
      .then(response => {
        if(response.status==200){
          commit("setRecallDistribution",response.data);
        }
      })
    },


    CreateWardLineVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('wardlineVisualizationfilter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setWardLineVisualizationChart",response.data);
        }

      })
    },


    CreateTreatmentPageBarVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('treatmentnargraphfilter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentBarVisualizationChart",response.data);
        }

      })
    },


    CreateTreatmentPageGenderVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('visualizationsfilter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setVisualization",response.data);
        }

      })
    },


    CreateTreatmentBasicDataTable({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('treatmentfilter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setTable3",response.data);
        }

      })
    },


    CreateTreatmentPageTreatmentTable({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('table2filter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setTable4",response.data);
        }

      })
    },

    CreateTreatmentStrategicData({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('table3filter', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setTable5",response.data);
        }

      })
    },

    CreateTableBasicDataVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('treatment', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setTreatmentTableBasicData",response.data);
        }

      })
    },

    CreateStrategicDataVisualization({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('treatmentstrategicdatas', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setErrorMessage", "")
          commit("setSuccessMessage",'success')
          commit("setTreatmentStrategicData",response.data);
        }

      })
      .catch(error => {
        if(error){
          commit("setErrorMessage", 'errormessage')
          commit("setMessage", error.response.data.message);
        }
      })
    },


    listLongitudinalMeasures ({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('longitudinal',)
      .then(response => {
        if(response.status==200){
          commit("setLongitudinalMeasures",response.data);
        }
      })
    },



    CreateSectionalTable({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('sectional', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setErrorMessage", "")
          commit("setSuccessMessage",'success')
          commit("setSectionalTable",response.data);
        }

      })
      .catch(error => {
        if(error){
          commit("setErrorMessage", 'errormessage')
          commit("setMessage", error.response.data.message);
        }
      })
    },


    CreateLongitudinal({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('longitudinal', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setErrorMessage", "")
          commit("setSuccessMessage",'success')
          commit("setLongitudinalMeasures",response.data);
        }

      })
      .catch(error => {
        if(error){
          commit("setErrorMessage", 'errormessage')
          commit("setMessage", error.response.data.message);
        }
      })
    },

    CreateLongitudinal1({commit}, overviewvisualization_obj){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .post('longitudinal1', overviewvisualization_obj)
      .then(response => {
        if(response.status==200){
          commit("setLongitudinalMeasures1",response.data);
        }

      })
    },



    listFlags({commit}){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .get('modifydelete',)
      .then(response => {
        if(response.status==200){
          commit("setFlags",response.data);
        }
      })
    },


    deleteFlag({commit},flag_id){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .put('encounterstatus/'+flag_id.id,flag_id)
      .then(response => {
        if(response.status==200){
            commit("setSuccessMessage",'success');
        }

      })
      .catch(error => {
        if(error){
          commit("setErrorMessage", 'errormessage')
          commit("setMessage", error.response.data.message);
        }
      })
    },


    editFlag({commit},flag_id){
      axios.defaults.headers.common['authorization']  = 'JWT ' + this.state.token
      return axios
      .put('encounterstatus/'+flag_id.id,flag_id)
      .then(response => {
        if(response.status==200){
          commit("setSuccessMessage",'success');
        }

      })
      .catch(error => {
        if(error){
          commit("setErrorMessage", 'errormessage')
          commit("setMessage", error.response.data.message);
        }
      })
    },









}
