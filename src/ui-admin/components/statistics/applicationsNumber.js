import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card, Col, Row } from 'react-bootstrap';



const applicationsNumber = (props) => {
  const total = props.total;
  const await_for_payment = props.await_for_payment;
  const await_for_assign = props.await_for_assign;
  const await_for_accept = props.await_for_accept;
  const accepted_inprogress = props.accepted_inprogress;
  const rejected = props.rejected;
  const finished = props.finished;

  const data = {
    datasets: [
      {
        data: [await_for_payment, await_for_assign, await_for_accept, accepted_inprogress, rejected, finished],
        backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        borderWidth: 9,
        borderColor: "white",
        hoverBorderColor: "white"
      }
    ],
    labels: ['في انتظار الدفع', 'في انتظار التعيين لموظف', 'في انتظار القبول', "مقبول وقيد العمل", "مرفوض", "منته"]
  };

  const options = {
    animation: false,
    cutoutNumber: 70,
    layout: { padding: 0 },
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

  const status = [
    
    {
      title: 'في انتظار الدفع',
      value: await_for_payment,
    },
    {
      title: 'في انتظار التعيين لموظف',
      value: await_for_assign,
    },
    {
      title: 'في انتظار القبول',
      value: await_for_accept,
    },
    {
      title: 'مقبول وقيد العمل',
      value: accepted_inprogress,
    },
    {
      title: 'مرفوض',
      value: rejected,
    },
    {
      title: 'منته',
      value: finished,
    }
  ];

  return (
    <Card className="rtl">
      <Card.Body>
        <Card.Title style={{ wordWrap: "normal" }}> عدد الطلبات حسب الحالة ...العدد الكلي {total} طلب</Card.Title>
        <Row>
          <Col xs={12} style={{fontSize:"smaller" ,color:"#888"}}>
            <Row>
              {status.map(
                ({
                  title,
                  value,
                }, index) => (
                  <Col xs={6} style={{ wordWrap: "normal" }} key={index}> - {title}: {value} طلب</Col>
                ))}
            </Row>
          </Col>
          <Col xs={12} >
            <Doughnut
              data={data}
              options={options}
              width={230}
              height={230}
            />
          </Col>

        </Row>

      </Card.Body>

    </Card>
  );
};

export default applicationsNumber;
