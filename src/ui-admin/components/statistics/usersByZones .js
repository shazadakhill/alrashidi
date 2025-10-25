import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';


const UsersByZones = (props) => {

  const placeType =
    props.placeType === "governorate"
      ? "تصنيف حسب المحافظة"
      : props.placeType === "zone"
        ? "تصنيف حسب  المنطقة "
        : "تصنيف حسب"


  const usersArray =
    props.placeType === "governorate"
      ? props.usersInGovernorates
      : props.placeType === "zone"
        ? props.usersInZones
        : []

  const placesArray =
    props.placeType === "governorate"
      ? props.governoratesNames
      : props.placeType === "zone"
        ? props.zonesNames
        : []

  const data = {
    datasets: [

      {
        backgroundColor: "orange",
        data: [...usersArray],
        label: 'عدد المستخدمين'
      }
    ],
    labels: [...placesArray]
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {

      x: {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: "blue"
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
      ,
      y: {
        ticks: {
          fontColor: "blue",
          beginAtZero: true,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: "blue",
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: "blue"
        }
      }

    },
    tooltips: {
      backgroundColor: "yellow",
      bodyFontColor: "blue",
      borderColor: "blue",
      borderWidth: 1,
      enabled: true,
      footerFontColor: "blue",
      intersect: false,
      mode: 'index',
      titleFontColor: "black"
    }
  };

  return (
    <Card className="rtl">
      <Card.Body>
        <Card.Title style={{wordWrap: "normal"}} > {` توزع المستخدمين ضمن المناطق`}</Card.Title>
        <Row>
          <Col  style={{height: "220px"}}>
            <Bar
              data={data}
              options={options}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={4} style={{ marginTop: "30px" ,wordWrap: "normal"}}>
            <DropdownButton id="dropdown-basic-button" title={placeType} className="chartButton">
              <Dropdown.Item onClick={() => { props.handler("governorate") }}>تصنيف حسب المحافظة </Dropdown.Item>
              <Dropdown.Item onClick={() => { props.handler("zone") }}>تصنيف حسب المنطقة </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UsersByZones;
