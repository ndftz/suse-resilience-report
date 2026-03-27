    // Count-up animation on scroll
    const countUpObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.textContent);
        const isDecimal = el.textContent.includes('.');
        const duration = 2200;
        const start = performance.now();
        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = eased * target;
          el.textContent = isDecimal ? value.toFixed(1) : Math.floor(value).toString();
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = isDecimal ? target.toFixed(1) : target.toString();
        };
        requestAnimationFrame(tick);
        countUpObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.count-up').forEach(el => countUpObserver.observe(el));

    // Register datalabels plugin globally
    Chart.register(ChartDataLabels);

    // Global Chart Defaults for our theme (preserved from original)
    Chart.defaults.plugins.tooltip.enabled = false;
    Chart.defaults.color = '#8eb3a9';
    Chart.defaults.font.family = '"SUSE", sans-serif';
Chart.defaults.font.size = 22;
Chart.defaults.font.weight = '500';
Chart.defaults.font.color = '#c0efde';

    // Helper function to create charts (preserved from original)
    const renderChart = (chartId) => {
      const ctx = document.getElementById(chartId).getContext('2d');
      const primaryColor = '#30ba78';
      const color3 = '#1e754b';
      const color2 = '#a1ef8b';
      const color4 = '#279963';
      const color5 = '#5dfcbc';
      const color6 = '#c0efde';
      const color7 = '#071f1b';
      if (chartId === 'verticalBarChart') {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['USA', 'Europe', 'APAC', ],
            datasets: [{
              label: 'regions',
              data: [100, 106, 51],
              backgroundColor: [primaryColor, color2, color3, color4, color5],
              borderWidth: 0,
              offset: 20, 
              borderRadius: 6,
              hoverOffset: 30
            }]
          },
          options: {
            
            scales: {
   x: {
      display: false,
   },
   y: {
      display: false,
   }
},
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: 'easeOutQuart'
            },
            plugins: {
             
              labels: {
                padding: 20
              },
              legend: {
                display: false
              },
              datalabels: {
               
                color: [color7, color7, color6, color6, color6],

                anchor: 'end',
                
                clamp: true,
                align: 'start',
                offset: 30,
                font: {
                  weight: 'bold',
                  
                  size: 26
                },
                formatter: (value, context) => {
                  const label = context.chart.data.labels[context.dataIndex];
                  return label + '\n' + value;
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
              backgroundColor: [primaryColor, color2, color4],
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
              
              datalabels: {
                anchor: 'end',
                align: 'start',
                color: '#071f1b',
                offset: 10,
                font: {
                   
                  weight: '600',
                  size: 30
                },
                formatter: (value) => value
              }
            },
            scales: {
              x: {
                display: false,
                
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
          type: 'doughnut',
          data: {
            labels: ['yeah', 'maybe', 'nah'],
            datasets: [{
              data: [55, 35, 10],
              backgroundColor: [primaryColor, color2, color4],
              borderWidth: 0,
              hoverOffset: 0
            }]
          },
          options: {
            rotation: 15,
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              animateRotate: true,
              animateScale: true,
              duration: 2000
            },
            plugins: {
              legend: {

                
                position: 'none',
                labels: {
                  padding: 20
                }
              },
              datalabels: {
                color: '#071f1b',
                font: {
                  align: 'center',
                  weight: '600'
                },
                formatter: (value, context) => {
                  const label = context.chart.data.labels[context.dataIndex];
                  return label + '\n' + value + '%';
                }
                
              }
            }
          }
        });
      }
      if (chartId === 'digitalSovereigntyChart') {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Priority ', 'Medium ', 'Low ', 'Unsure '],
            datasets: [
              {
                label: 'Done',
                data: [62, 17, 20, 10],
                backgroundColor: primaryColor
              },
              {
                label: 'In Progress',
                data: [35, 72, 60, 30],
                backgroundColor: color2
              },
              {
                label: 'Not Yet',
                data: [3, 11, 20, 60],
                backgroundColor: color3
              }
            ]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: 'easeOutQuart',
            
     
        
     
      
            
            },
            
            plugins: {
              legend: {
                position: 'bottom',
                labels: {

                usePointStyle: true, 
                
                // Define a specific shape if needed (overrides dataset point style if specified)
                pointStyle: 'circle', // or 'rect', 'triangle', 'star', 'rectRounded', etc.
                
                // You can also adjust the size of the marker
                boxWidth: 30, // width in pixels
                boxHeight:30,
            

                  padding: 20
                }
              },
              datalabels: {
                labels: {
                  value: {
                    anchor: 'center',
                    align: 'start',
                    clamp: true,
                    color: '#071f1b',
                    offset: -5,
                    font: { weight: '600', size: 22 },
                    formatter: (value) => value
                  },
                  unit: {
                    anchor: 'center',
                    align: 'start',
                    clamp: true,
                    color: '#071f1b', 
                    font: { weight: '500', size: 14 },
                    formatter: () => '%',
                    offset: -17
                
                  }
                }
              }
            },
            scales: {
              x: {
                 display: false,
                stacked: true,
                beginAtZero: true,
                grid: {
                  color: 'rgba(255,255,255,0.05)'
                }
              },
              y: {
                stacked: true,
                grid: {
                  display: false
                }
              }
            }
          }
        });
      }
    };
    // Create all charts immediately in their final state (no animation),
    // then replay the animation when each one scrolls into view.
    requestAnimationFrame(() => {
      document.querySelectorAll('.chart-container canvas').forEach(canvas => {
        renderChart(canvas.id);
        const chart = Chart.getChart(canvas);
        if (chart) chart.update('none');
      });

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const chart = Chart.getChart(entry.target);
            if (chart) {
              chart.reset();
              chart.update();
            }
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      document.querySelectorAll('.chart-container canvas').forEach(canvas => {
        observer.observe(canvas);
      });
    });