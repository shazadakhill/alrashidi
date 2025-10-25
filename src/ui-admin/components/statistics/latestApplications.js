import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';


const latestApplications = (props) => {
  const thisYearSales = props.thisYearSales;
  const lastYearSales = props.lastYearSales;
  const daysArray = props.daysArray;
  const applicationDateType =
    props.applicationDateType === "created_at"
      ? "تصنيف حسب تاريخ انشاء الطلب"
      : props.applicationDateType === "accepted_at"
        ? "تصنيف حسب تاريخ قبول الطلب"
        : props.applicationDateType === "payed_at"
          ? "تصنيف حسب تاريخ دفع الطلب"
          : props.applicationDateType === "done_at"
            ? "تصنيف حسب تاريخ اتمام الطلب"
            : "تصنيف"


  const data = {
    datasets: [
      {
        backgroundColor: "blue",
        data: [...thisYearSales],
        label: 'السنة الحالية'
      },
      {
        backgroundColor: "orange",
        data: [...lastYearSales],
        label: 'السنة السابقة'
      }
    ],
    labels: [...daysArray]
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
        <Card.Title style={{ wordWrap: "normal" }}> آخر الطلبات</Card.Title>
        <Row>
          <Col style={{ height: "294px" }}>
            <Bar
              data={data}
              options={options}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={3} style={{ marginTop: "30px", wordWrap: "normal" }} className="chartButton">
            <DropdownButton
              id="dropdown-basic-button"
              title={`في آخر ${daysArray.length === 7 ? "7 ايام" : daysArray.length === 14 ? "اسبوعين" : daysArray.length === 31 ? "شهر" : daysArray.length === 365 ? "سنة" : ""}`}>
              <Dropdown.Item type="button" onClick={() => { props.handler(7) }}> في آخر 7 أيام</Dropdown.Item>
              <Dropdown.Item type="button" onClick={() => { props.handler(14) }}>في آخر اسبوعين</Dropdown.Item>
              <Dropdown.Item type="button" onClick={() => { props.handler(31) }}>في آخر شهر </Dropdown.Item>
              <Dropdown.Item type="button" onClick={() => { props.handler(365) }}>في آخر سنة </Dropdown.Item>
            </DropdownButton>
          </Col>

          <Col xs={12} sm={6} style={{ marginTop: "30px", wordWrap: "normal" }}>
            <DropdownButton id="dropdown-basic-button" title={applicationDateType} className="chartButton">
              <Dropdown.Item onClick={() => { props.handler2("created_at") }}>تصنيف حسب تاريخ انشاء الطلب </Dropdown.Item>
              <Dropdown.Item onClick={() => { props.handler2("payed_at") }}>تصنيف حسب تاريخ دفع الطلب </Dropdown.Item>
              <Dropdown.Item onClick={() => { props.handler2("accepted_at") }}>تصنيف حسب تاريخ قبول الطلب </Dropdown.Item>
              <Dropdown.Item onClick={() => { props.handler2("done_at") }}>تصنيف حسب تاريخ اتمام الطلب</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default latestApplications;
