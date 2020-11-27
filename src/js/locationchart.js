export const locationChart = {
  type: 'pie',
  data: {
    labels: ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Kavre', 'Pokhara', 'Rasuwa'],
    datasets: [

    {
      label: "Female",
      backgroundColor: ['rgba(84, 184, 209, 0.5)', 'rgba(91, 95, 151, 0.5)', 'rgba(255, 193, 69, 0.5)', 'rgba(96, 153, 45, 0.5)', 'rgba(255, 107, 108, 0.5)', 'rgba(58, 64, 90, 0.5)'],
      borderColor: ['rgba(84, 184, 209, 1)', 'rgba(91, 95, 151, 1)', 'rgba(255, 193, 69, 1)', 'rgba(96, 153, 45, 1)', 'rgba(255, 107, 108, 1)', 'rgba(58, 64, 90, 1)'],
      borderWidth: 1,
      data: [3, 5, 6, 12, 3, 5]
    },

    {
      label: "Male",
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      data: [4, 7, 3, 6, 10, 7]
    }
  ]
  },
  options: {
    responsive:true,
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    scales: {
      yAxes: [{
        display: false,
      }]
    },

    title: {
      display: true,
      text: "Distribution Chart",
      fontSize: 18,
      fontFamily: "'Palanquin', sans-serif"
    },

    legend: {
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20,
        fontFamily: "'Maven Pro', sans-serif"
      }
    }
  }
};

export default locationChart;
