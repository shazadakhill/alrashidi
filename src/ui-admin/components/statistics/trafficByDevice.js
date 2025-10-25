import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card, Col, Row } from 'react-bootstrap';
import { BsLaptop } from 'react-icons/bs';
import { FaMobileAlt } from 'react-icons/fa';
import { FaTabletAlt } from 'react-icons/fa';



const TrafficByDevice = (props) => {
  const ios = props.ios;
  const android = props.android;
  const web = props.web;

  const data = {
    datasets: [
      {
        data: [ios, android, web],
        backgroundColor: [
          "blue",
          "red",
          "orange"
        ],
        borderWidth: 10,
        borderColor: "white",
        hoverBorderColor: "white"
      }
    ],
    labels: ['ios', 'android', 'web']
  };

  const options = {
    animation: false,
    cutoutPercentage: 70,
    layout: { padding:0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: "white",
      bodyFontColor: "blue",
      borderColor: "blue",
      borderWidth: 1,
      enabled: true,
      footerFontColor: "blue",
      intersect: false,
      mode: 'index',
      titleFontColor: "blue"
    }
  };

  const devices = [
    {
      title: 'web',
      value: web,
      icon: BsLaptop,
      color: "blue"
    },
    {
      title: 'android',
      value: android,
      icon: FaTabletAlt,
      color: "red"
    },
    {
      title: 'ios',
      value: ios,
      icon: FaMobileAlt,
      color: "orange"
    }
  ];

  return (
    <Card className="rtl">
      <Card.Body>
        <Card.Title style={{wordWrap: "normal"}}>نسب الاجهزة المستخدمة في الوصول
        <p >-العدد الكلي {props.total} جهاز</p>
        </Card.Title>
        <Row>
          <Col >
            <Doughnut
              data={data}
              options={options}
              width={230}
              height={230}
            />
          </Col>
        </Row>
        <Row className="text-center">
          {devices.map(
            ({
              icon: Icon,
              title,
              value,
            }, index) => (
              <Col style={{wordWrap: "normal"}} key={index}>
                <Icon color="action" />
                <p> {title} </p>
                <p >{value}%</p>
              </Col>
            ))}

        </Row>
      </Card.Body>

    </Card>
  );
};

export default TrafficByDevice;
