import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

function Speedometer(props) {
  return (
    <>
      <div styles={{}}>
        <ReactSpeedometer
          width={400}
          needleHeightRatio={0.7}
          maxValue={100}
          value={props.value}
          currentValueText={
            props.text + ' ( ' + props.value.toString().slice(0, 6) + ' %)'
          }
          customSegmentLabels={[
            {
              text: 'Very Bad',
              position: 'INSIDE',
              color: '#000',
            },
            {
              text: 'Bad',
              position: 'INSIDE',
              color: '#000',
            },
            {
              text: 'Ok',
              position: 'INSIDE',
              color: '#000',
              fontSize: '19px',
            },
            {
              text: 'Good',
              position: 'INSIDE',
              color: '#000',
            },
            {
              text: 'Very Good',
              position: 'INSIDE',
              color: '#000',
            },
          ]}
          ringWidth={47}
          needleTransitionDuration={2222}
          needleTransition="easeElastic"
          needleColor={'#90f2ff'}
          textColor={'#000'}
        />
      </div>
    </>
  );
}

export default Speedometer;
