import * as React from 'react';

export interface IProps { 
    sqSize: number
  percentage: number
  strokeWidth: number
  }

const BudgetProgressBar: React.SFC<IProps> = (props) =>{
    const { sqSize, strokeWidth, percentage } = props;
    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * percentage / 100;
    const color = percentage === 100 ? '#10A36D': '#3f51b5' ; 
    return (  
      <svg
        width={sqSize} height={sqSize} viewBox={viewBox}>
        <circle
           stroke="#ddd" fill="none" cx={sqSize / 2}
          cy={sqSize / 2} r={radius} strokeWidth={`${strokeWidth}px`} 
        />
        <circle
           fill="none"strokeLinecap="round"
          strokeLinejoin="round" stroke={color}
          cx={sqSize / 2} cy={sqSize / 2}
          r={radius} strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray, strokeDashoffset: dashOffset
          }} />
        <text
          style={{ fontSize: '36px', fontWeight: 'bold', fill: '#4A4A4A'}}
          x="50%" y="50%"
          dy=".3em" textAnchor="middle">
          {`${percentage}%`}
        </text>
      </svg>
    );
}


  
BudgetProgressBar.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10
};

export default BudgetProgressBar;



                