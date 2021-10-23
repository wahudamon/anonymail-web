import React from 'react'
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap'

export default function About() {
  return (
    <div>
      <Row className="mt-3">
        <Col xl="12">
          <Card className="mx-5">
            <CardBody>
              <CardTitle className="text-center font-weight-bold"><h3>Anonymail</h3></CardTitle>
              <hr />
              <CardSubtitle className="text-justify">
                An mail-sending app that everyone can send a mail to a person anonymously. It can be advice, thought about the person, and many more without being known by the receiver. The mails will be displayed as a list in receiver homepage.
              </CardSubtitle>
            </CardBody>
            <CardBody>
              <CardText className="text-center">Built using <span><a href="https://reactjs.org/">React.js</a></span> by <span><a href="https://www.wahudamon.com/">@wahudamon</a></span></CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
