import React, { useEffect, useState } from 'react'
import db from '../utils/FirebaseInit'
import { collection, getDocs } from 'firebase/firestore'
import { Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap'
import CreateMailButton from '../components/CreateMailButton'
import moment from 'moment'
import ReactPaginate from 'react-paginate'

export default function Home() {
  const [mails, setMails] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //setup pagination
  const [offset, setOffset] = useState(0)
  const [perPage] = useState(5)
  const [pageCount, setPageCount] = useState(0)

  //Getting all mails and sorted from newest
  const getMails = async () => {
    setIsLoading(true)
    try {
      const mailSnapshots = await getDocs(collection(db, 'mails'))
      const mailsData = mailSnapshots.docs.map(mailSnapshot => ({content: mailSnapshot.data().content, created_at: mailSnapshot.data().created_at.seconds}))
      const sortedMailsData = mailsData.sort((a, b) => b.created_at - a.created_at)

      // setup pagination
      const slicedMailsData = sortedMailsData.slice(offset, offset + perPage)
      const displayedMailData = slicedMailsData.map(mail => 
        <div key={mail.content}>
          <hr />
          <CardText className="text-left" style={{fontSize: '14pt'}}>{mail.content}</CardText>
          <CardText className="font-italic" style={{fontSize: '10pt'}}>at {moment.unix(mail.created_at).format("dddd, DD MMMM YYYY LTS").toString()}</CardText>
        </div>
      )

      setMails(displayedMailData)
      setPageCount(Math.ceil(sortedMailsData.length / perPage))
    }
    catch(error) {
      console.log('Cannot get mails from Firebase: ', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    setOffset(selectedPage * perPage)
  }

  useEffect(() => {
    getMails()
  },
  // eslint-disable-next-line
  [offset, perPage])

  return (
    <div>
      <Row className="mt-3">
        <Col xl="12">
          <Card className="mx-5 mb-5">
            <CardBody>
              <CardTitle className="text-center"><h3>Mails for Bagas</h3></CardTitle>
              <CreateMailButton />
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <ReactPaginate 
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={perPage}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
              {isLoading &&
                <>
                  <hr />
                  <CardText className="text-center font-weight-bold">Now Loading...</CardText>
                </>
              }
              {(!mails || mails.length === 0) && !isLoading && 
                <>
                  <hr />
                  <CardText className="text-center font-weight-bold">Bagas' Mailbox is Empty.</CardText>
                </>
              }
              {mails && !isLoading && 
                <>
                  {mails}
                </>
              }
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
