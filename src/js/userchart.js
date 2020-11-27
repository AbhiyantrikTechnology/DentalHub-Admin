export const userChart = {
  data: {
    datasets: [{
      label: 'No. of users',
      data: [10, 20, 30, 40, 50, 60],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }],
    labels: ['January', 'February', 'March', 'April', 'May', 'June']
  },
  options: {
    aspectRatio: 1.5,

    title: {
      display: true,
      text: "User Chart",
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

export default userChart;
