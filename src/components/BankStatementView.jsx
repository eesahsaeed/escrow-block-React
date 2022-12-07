
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Document, Page, pdfjs} from 'react-pdf';
import {Col, Container, Row, Modal, Button, Pagination} from "react-bootstrap";
import {getUrl} from "../helper/url-helper";

export default function PdfView({user}){
  pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState({}); 
  
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  let bankStatement = JSON.parse(user.bankStatement);

  const link = bankStatement.url;
  const type = bankStatement.contentType;

  console.log(type);

  function onDocumentLoadSuccess({numPages}){
    setNumPages(numPages);
  }

  if (type === "application/pdf"){
    return (
      <Container className='pdf-container' >
        <Row className='justify-content-start'>
          <Col xs={12} md={6}>
            <div className='text-light text-center'>
              <Document file={link} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} className="page" onClick={() => setModalShow(true)}/>
              </Document>
            </div>
          </Col>
        </Row>
        <ViewModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          link={link}
          type={type}
        />
      </Container>
    );
  } else {
    return (
      <div>
        <img src={link} style={{width: 400, borderRadius: 10, height: 400}} onClick={() => setModalShow(true)}/>
        <ViewModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          link={link}
          type={type}
        />
      </div>
    );
  }
}

function ViewModal(props) {
  pdfjs.GlobalWorkerOptions.workerSrc = 
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          BANK STATEMENT
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor: "rgb(241 197 71 / 37%)"}}>
      {props.type === "application/pdf" ? <Container className='pdf-modal'>
          <Row className='justify-content-start'>
            <Col xs={12} md={6}>
              <div className='text-light text-center'>
                <Document file={props.link} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} className="page"/>
                </Document>
                <Pagination className='justify-content-center paginate-style'>
                  <Pagination.Prev onClick={() => {
                    if (!(pageNumber <= 1)){
                      setPageNumber(pageNumber - 1)
                    }
                  }} className="text-dark"/>
                  <Pagination.Item className="text-dark">{pageNumber}</Pagination.Item>
                  <Pagination.Next onClick={() => {
                    console.log(numPages);
                    if (pageNumber < numPages){
                      setPageNumber(pageNumber + 1)
                    }
                  }} className="text-dark"/>
                </Pagination>
              </div>
            </Col>
          </Row>
        </Container> : <div>
          <img src={props.link} style={{width: "100%", height: "100%"}}/>
        </div>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
