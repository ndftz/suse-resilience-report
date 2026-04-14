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
          const current = isDecimal ? value.toFixed(1) : Math.floor(value).toString();
          el.textContent = current;
          el.dataset.count = current;
          if (progress < 1) requestAnimationFrame(tick);
          else {
            const final = isDecimal ? target.toFixed(1) : target.toString();
            el.textContent = final;
            el.dataset.count = final;
          }
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
    Chart.defaults.color = '#c0efde';
    Chart.defaults.font.family = '"SUSE", sans-serif';
    Chart.defaults.font.size = 18;
    Chart.defaults.font.weight = '400';
    Chart.defaults.font.color = '#c0efde';

    // Helper function to create charts (preserved from original)
    const renderChart = (chartId) => {
      const ctx = document.getElementById(chartId).getContext('2d');
      const primaryColor = '#30ba78';
      const color3 = '#145b39';
      const color2 = '#a1ef8b';
      const color4 = '#279963';
      const color5 = '#5dfcbc';
      const color6 = '#c0efde';
      const color7 = '#071f1b';
      const colorDarkFog = '#2b564b';
      const colorWhite = '#ffffff';
      const colorMediumFog = '#6ea18b';
      const colorLightFog = '#eee';
      if (chartId === 'verticalBarChart') {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['USA', 'Europe', 'APAC', ],
            datasets: [{
              label: 'regions',
              data: [100, 106, 103],
              backgroundColor: [primaryColor, color2, color3, color4, color5],
              borderWidth: 0,
              offset: 0, 
              borderRadius: 0,
              hoverOffset: 0
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
                padding: 20,
                
              },
              legend: {
                display: false
              },
              datalabels: {
               
                color: [color7, color7, color6, color6, color6],

                anchor: 'end',
                
                clamp: true,
                align: 'start',
                offset: 10,
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

      if (chartId === 'openSourceImportanceChart') {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Extremely', 'Very', 'Moderately', 'Slightly', 'Not at all', "Don't know"],
            datasets: [{
              label: 'Importance to digital resilience',
              data: [41, 53, 6, 0, 0, 0],
              backgroundColor: [primaryColor, primaryColor, colorMediumFog, colorDarkFog, colorDarkFog, colorDarkFog],
              borderRadius: 6
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,

            animation: {
              duration: 2000,
              easing: 'easeOutQuart',
              delay: (context) => context.dataIndex * 100
            },
            plugins: {
              legend: {
                display: false
              },
              datalabels: {
                anchor: 'end',
                align: 'start',
                color: [color7, color7, colorMediumFog, colorMediumFog, colorMediumFog, colorMediumFog],
                offset: [10, 10, -40, -40, -40, -40],
                font: {
                  weight: '600',
                  size: 20
                },
                formatter: (value) => value + '%'
              }
            },
            scales: {
              x: {
                display: false
              },
              y: {
                grid: {
                  display: false
                },
                ticks: {
                  color: [colorWhite,colorWhite,colorMediumFog,colorMediumFog,colorMediumFog,colorMediumFog, ],
                  
                  font: {
                    size: 14
                  }
                }
              }
            }
          }
        });
      }
      if (chartId === 'extraBudgetChart') {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: [
              'Implementing AI',
              'Data security\n& compliance',
              'Digital Resilience',
              'Cloud Migration',
              'Investing in\nopen source',
              'Sovereignty\nInitiatives',
              'Reliability &\nAvailability',
              'User Experience',
              'Skills Gaps',
              'Reducing lock-in'
            ],
            datasets: [{
              label: 'Extra Budget Spending',
              data: [70, 54, 46, 45, 39, 38, 36, 36, 34, 20],
              backgroundColor: [
                colorWhite, color5, color5, color3,
                color3, color5, color3, color3, color3,
                color3
              ],
              borderRadius: 6
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: 'easeOutQuart',
              delay: (context) => context.dataIndex * 100
            },
            plugins: {
              legend: {
                display: false
              },
              datalabels: {
                anchor: 'end',
                align: 'start',
                color: [color3, color3, color3, colorMediumFog, colorMediumFog, color3, colorMediumFog, colorMediumFog, colorMediumFog, colorMediumFog],
                offset: 10,
                font: {
                  weight: '600',
                  size: 18
                },
                formatter: (value) => value + '%'
              }
            },
            scales: {
              x: {
                display: false
              },
              y: {
                grid: {
                  display: false
                },
                ticks: {
                   color:[colorWhite, colorWhite, colorWhite, colorMediumFog,  colorMediumFog,colorWhite, colorMediumFog, colorMediumFog, colorMediumFog, colorMediumFog, colorMediumFog ],
                  font: {
                    size: 12
                  }
                }
              }
            }
          }
        });
      }
      if (chartId === 'cybersecurityChart') {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Yes,\nMajor ', 'Yes,\nMinor ', 'No', 'Unsure'],
            datasets: [{
              label: 'Foreign entity breaches',
              data: [23, 28, 44, 5],
              backgroundColor: [primaryColor, primaryColor, colorDarkFog, colorDarkFog],
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: 'easeOutQuart',
              delay: (context) => context.dataIndex * 100
            },
            plugins: {
              legend: {
                display: false
              },
              datalabels: {
                anchor: 'end',
                align: 'end',
                offset: [10, 10, -50, 0, 0, 0],
                color: [color6, color6, colorMediumFog, colorDarkFog],
                font: {
                  weight: '800',
                  size: 22
                },
                formatter: (value) => value + '%'
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                }
              },
              y: {
                display: false,
                beginAtZero: true,
                grid: {
                  display: false
                }
              }
            }
          }
        });
      }
      if (chartId === 'rolesChart') {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Corporate', 'Function', 'Practice'],
            datasets: [{
              data: [165, 95, 49],
              backgroundColor: [primaryColor, color2, color4],
              
              borderWidth: 0,
               

                            offset: 0, 
              borderRadius: 0,
              hoverOffset: 0
            }]
          },
          options: {
            rotation: -90,
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              animateRotate: true,
              animateScale: true,
              duration: 2000
            },
            plugins: {
              legend: {
                usePointStyle: true, 
                pointStyle: 'circle',
                position: 'none',
                labels: {
                  padding: 20,
                }
              },
              datalabels: {
                color: ['#071f1b', colorDarkFog, color6, ],
                font: {
                  align: 'center',
                  size:23,
                  weight: '600'
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
      if (chartId === 'decisionMakersChart') {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Fully', 'Very'],
            datasets: [{
              data: [67, 33],
              backgroundColor: [primaryColor, color2],
              
              borderWidth: 0,
                  borderRadius: 0,
              hoverOffset: 0
            }]
          },
          options: {
            rotation: -120,
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              animateRotate: true,
              animateScale: true,
              duration: 2000
            },
            plugins: {
              legend: {
                usePointStyle: true, 
                pointStyle: 'circle',
                position: 'none',
                labels: {
                  padding: 20,
                }
              },
              datalabels: {
                color: '#071f1b',
                font: {
                  size:18,
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
      if (chartId === 'employeeCountChart') {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['501-1000', '1001-5000', '5001+'],
            datasets: [{
              label: 'Percentage',
              data: [51, 195, 63],
              backgroundColor: [primaryColor, primaryColor, primaryColor],
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: 'easeOutQuart',
              delay: (context) => context.dataIndex * 100
            },
            plugins: {
              legend: {
                display: false
              },
              datalabels: {
                anchor: 'end',
                align: 'top',
                color:[  '#071f1b', '#071f1b', '#071f1b' ],
                offset: -30,
                font: {
                  weight: '600',
                  size: 20
                },
                formatter: (value) => value
              }
            },
            scales: {
              x: {
                display: true,
                ticks: {
                  font: {
                    size: 14
                  }
                },
                grid: {
                  display: false
                }
              },
              y: {
                display: false,
                beginAtZero: true,
                ticks: {
                  display: false
                },
                grid: {
                  display: false
                }
              }
            }
          }
        });
      }
      if (chartId === 'industriesChart') {
        new Chart(ctx, {
          type: 'bar',
          data: {
            
            labels: ['Manufacturing', 'Consulting', 'Financial', 'Retail', 'Healthcare', 'Telco', 'Automotive', 'Transport / Logistics', 'Education', 'Aerospace', 'Property', 'Government'],
            datasets: [{
              label: 'number',
              data: [64, 51, 42, 36, 26, 18, 18, 13, 5, 5, 4, 3],
           
              

              backgroundColor: 
                primaryColor,
              borderRadius: 6
            }]
          },
          options: {
            indexAxis: 'y', // This makes the bar chart horizontal
            responsive: true,
            
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: 'easeOutQuart',
              delay: (context) => context.dataIndex * 100
            },
            plugins: {
              legend: {
                display: false
              },
              datalabels: {
                anchor: 'end',
                align: 'end',
                color: primaryColor, offset: 5,
                font: {
                  weight: '400',
                  size: 18
                },
                formatter: (value) => value + ''
              }
            },
            scales: {
              x: {
                display: false,
              },
              y: {

                grid: {
                  display: false
                },
                ticks: {
                  font: {
                    size: 12
                  }
                }
              }
            }
          }
        });
      }
      if (chartId === 'breachedConfidenceChart') {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Very', 'Confident', 'Somewhat', 'None'],
            datasets: [{
              data: [63, 30, 4, 3],
              backgroundColor: [color2, primaryColor, color4, colorDarkFog],
              
              borderWidth: 0,
                  borderRadius: 0,
              hoverOffset: 0
            }]
          },
          options: {
            rotation: 0,
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
                  usePointStyle: true,
                  pointStyle: 'circle',
                  padding: 20
                }
              },
              datalabels: {

                color: ['#071f1b','#071f1b', null, null ],
                font: {
                  weight: '600',
                  size: 28
                },
                formatter: (value) => value + '%'
              }
            }
          }
        });
      }
      if (chartId === 'notBreachedConfidenceChart') {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Very', 'Confident', 'Somewhat', 'None'],
            datasets: [{
              data: [37, 45, 13, 5],
              backgroundColor: [color2, primaryColor, color4, colorDarkFog],
              
              borderWidth: 0,
                  borderRadius: 0,
              hoverOffset: 0
            }]
          },
          options: {
            rotation: 0,
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
                  usePointStyle: true,
                  pointStyle: 'circle',
                  padding: 20
                }
              },
              datalabels: {
                                clamp: true,
                align: 'end',
                offset: -10,
                color: ['#071f1b','#071f1b', colorDarkFog, null, null ],
                font: {
                  weight: '600',
                  size: 22
                },
                formatter: (value) => value + '%'

              }
            }
          }
        });
      }
      if (chartId === 'strategyChart') {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Developing', 'In place', 'Need one', 'Not priority'],
            datasets: [{
              label: 'Formal strategy for digital sovereignty',
              data: [50, 43, 6, 1],
              backgroundColor: [primaryColor, primaryColor, colorMediumFog, colorDarkFog],
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 2000,
              easing: 'easeOutQuart',
              delay: (context) => context.dataIndex * 100
            },
            plugins: {
              legend: {
                display: false
              },
              datalabels: {
                anchor: 'end',
                align: 'top',
                color: ['#071f1b','#071f1b', colorMediumFog, colorMediumFog],
                offset: [-40, -40, 10, 10],
                font: {
                  weight: '600',
                  size: 20
                },
                formatter: (value) => value + '%'
              }
            },
            scales: {
              x: {
                display: true,
                ticks: {
                  font: {
                    size: 14
                  }
                },
                grid: {
                  display: false
                }
              },
              y: {
                display: false,
                beginAtZero: true,
                ticks: {
                  display: false
                },
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