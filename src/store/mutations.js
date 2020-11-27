export default{

	setToken(state, token){
		state.token = token;
	},

	setUsers(state, users){
		state.users = users;
	},

	setSuccessMessage(state,successmessage){
		state.successmessage = successmessage;
	},

	setErrorMessage(state,errormessage){
		state.errormessage = errormessage;
	},

	setMessage(state,message){
		state.message = message;
	},

	setGeography(state,geography){
		state.geography = geography;
	},

	setActivities(state, activities_obj){
		state.activities_obj = activities_obj;
	},
	setWards(state, wards_obj){
		state.wards_obj = wards_obj;
	},
	setRole(state, role_obj){
		state.role_obj = role_obj;
	},
	setLoginVisualization(state, loginvisualization){
		state.loginvisualization = loginvisualization;
	},
	setLoginVisualization1(state, loginvisualization1){
		state.loginvisualization1 = loginvisualization1;
	},
	setOverviewTable(state,overviewtable_obj){
		state.overviewtable_obj=overviewtable_obj;
	},

	setTreatmentbyActivity(state,treatment_by_activity_obj){
		state.treatment_by_activity_obj=treatment_by_activity_obj;
	},

	setTreatmentbyWard(state,treatment_by_ward_obj){
		state.treatment_by_ward_obj=treatment_by_ward_obj;
	},

	setOverviewBarGraph(state, overviewbargraph_obj){
		state.overviewbargraph_obj = overviewbargraph_obj;
	},

	setOverviewPieChartGraph(state, overviewpiechart_obj){
		state.overviewpiechart_obj = overviewpiechart_obj;
	},

	setDashboardLineChartGraph(state, overviewlinechart_obj){
		state.overviewlinechart_obj = overviewlinechart_obj;
	},

	setTreatmentPreventionRatio(state, preventionrati_obj){
		state.preventionrati_obj = preventionrati_obj;
	},

	setEarlyIntervention(state, earlyintervention_obj){
		state.earlyintervention_obj = earlyintervention_obj;
	},

	setRecallDistribution(state, recalldistribution_obj){
		state.recalldistribution_obj = recalldistribution_obj;
	},

	setTreatmentTableBasicData(state, treatment_tablebasicdata_obj){
		state.treatment_tablebasicdata_obj=treatment_tablebasicdata_obj;
	},



	setTreatmentStrategicData(state, treatmentstrategicdata_obj){
		state.treatmentstrategicdata_obj = treatmentstrategicdata_obj;
	},



	setOverviewBarGraphPost(state, overviewbargraphpost_obj){
		state.overviewbargraphpost_obj = overviewbargraphpost_obj;
	},

	setDashboardPieChartPost(state, dashboard_piechartpost){
		state.dashboard_piechartpost = dashboard_piechartpost;
	},


	setUserWards(state, userward_obj){
		state.userward_obj = userward_obj;
	},


	setSectionalTable(state, sectionaltable_obj){
		state.sectionaltable_obj = sectionaltable_obj;
	},

	setTreatmentBarVisualizationChart(state, treatmentvisualizationbarchart){
		state.treatmentvisualizationbarchart = treatmentvisualizationbarchart;
	},

	setLongitudinalMeasures(state, longitudinalmeasures_obj){
		state.longitudinalmeasures_obj = longitudinalmeasures_obj;
	},


	setLongitudinalMeasures1(state, longitudinalmeasures_obj1){
		state.longitudinalmeasures_obj1 = longitudinalmeasures_obj1;
	},


	setReturnDate(state, returndate_obj){
		state.returndate_obj = returndate_obj;
	},

	setFlags(state, flag_obj){
		state.flag_obj = flag_obj;
	},






}
