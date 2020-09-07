let echarts = require('echarts');

export function showPie(names,values,series){
  let line = echarts.init(document.getElementById('pie'));
  line.clear()
  let themeColor = '#a4b5ff'

    line.setOption({
      title:{
        text:'单位：tce',
        left:'75%',
        textStyle:{
          color:themeColor,
          fontSize:'20px'
        }
      },
      tooltip:{
        trigger:'item',
        formatter:'{a}<br/>{b}:{c}({d}%)'
      },
      legend:{
        orient:'vertical',
        left:15,
        data:names,
        textStyle : {color:themeColor,fontSize:14}
      },
      series:[
        {
          name:'',
          type:'pie',
          radius:['70%','95%'],
          top: '25%',
          center:['55%','30%'],
          data:values,
          itemStyle:{
            emphasis:{
              shadowBlur:10,
              shadowOffsetX:0,
              shadowColor:'rgba(0,0,0,0.5)'
            }
          }
        }
      ],
      color:['#007fe1','#2dc0be','#ffbd3b','#e690d1','#37a2da',]
    })
  }