    // Global Chart Defaults for our theme (preserved from original)
    Chart.defaults.color = '#8eb3a9';
    Chart.defaults.font.family = '"SUSE", sans-serif';
    // Helper function to create charts (preserved from original)
    const renderChart = (chartId) => {
      const ctx = document.getElementById(chartId).getContext('2d');
      const primaryColor = '#30ba78';
      const color2 = '#1e754b';
      const color3 = '#4ff7a3';
      const color4 = '#279963';
      const color5 = '#5dfcbc';
      if (chartId === 'verticalBarChart') {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['USA', 'Europe', 'APAC', ],
            datasets: [{
              label: '% of Developers Using',
              data: [100, 106, 51],
              backgroundColor: [primaryColor, color2, color3, color4, color5],
              borderWidth: 0,
              borderRadius: 10,
              hoverOffset: 50
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: 'easeOutQuart'
            },
            plugins: {
              position: 'bottom',
              labels: {
                padding: 20
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  display: false
                }
              },
              x: {
                grid: {
                  display: false
                }
              }
            }
          }
        });
      }
      if (chartId === 'horizontalBarChart') {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Tech Debt', 'Meetings', 'Poor Specs', 'Build Times'],
            datasets: [{
              label: 'Impact Score (Out of 100)',
              data: [85, 72, 64, 45],
              backgroundColor: primaryColor,
              borderRadius: 6
            }]
          },
          options: {
            indexAxis: 'y', // This makes the bar chart horizontal
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: 'easeOutQuart'
            },
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255,255,255,0.05)'
                }
              },
              y: {
                grid: {
                  display: false
                }
              }
            }
          }
        });
      }
      if (chartId === 'pieChart') {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Fully Remote', 'Hybrid', 'Full In-Office'],
            datasets: [{
              data: [55, 35, 10],
              backgroundColor: [primaryColor, color2, color4],
              borderWidth: 0,
              hoverOffset: 10
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              animateRotate: true,
              animateScale: true,
              duration: 2000
            },
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  padding: 20
                }
              }
            }
          }
        });
      }
    };
    // Set up Intersection Observer to trigger charts on scroll (preserved from original)
    document.addEventListener('DOMContentLoaded', () => {
      const chartCanvases = document.querySelectorAll('.chart-container canvas');
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the chart container is visible
      };
      const chartObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Render the chart based on the canvas ID
            renderChart(entry.target.id);
            // Stop observing once rendered so it doesn't re-animate every scroll
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      chartCanvases.forEach(canvas => {
        chartObserver.observe(canvas);
      });
    });