import React, { useState } from 'react'
import db from '../utils/FirebaseInit'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { Button, Card, CardBody, CardTitle, Col, Input, Modal, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

export default function CreateMail() {
  const [mailContent, setMailContent] = useState('')
  const [modalText, setModalText] = useState('')
  const [popup, setPopup] = useState(false)

  const toggle = () => setPopup(!popup)
  const handleChange = (e) => setMailContent(e.target.value)

  // Sending mail to firebase
  const sendMail = async () => {
    try {
      await addDoc(collection(db, "mails"), {
        content: mailContent,
        created_at: Timestamp.now()
      })
      setModalText('Your mail has been sent!')
    }
    catch(error) {
      console.error('Error sending mail: ', error)
      setModalText('Send mail failed, please try again later!')
    }
    finally {
      setMailContent('')
      toggle()
    }
  }

  return (
    <div>
      <Row className="mt-3">
        <Col xl="12">
          <Card className="mx-5">
            <CardBody>
              <CardTitle className="text-center"><h3>Write a Mail</h3></CardTitle>
              <Input type="textarea" value={mailContent} placeholder="Your Mail..." onChange={handleChange} />
              <Button onClick={sendMail} className="mt-2" style={{background: '#8e94f2', border: '0', fontWeight: 'bold'}}>Send!</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={popup} toggle={toggle}>
        <ModalHeader>{modalText}</ModalHeader>
        <ModalFooter>
          <Link to="/" className="btn btn-info" style={{background: '#8e94f2', color: '#FFF', border: '0', fontWeight: 'bold'}}>Okay!</Link>
        </ModalFooter>
      </Modal>
    </div>
  )
}
