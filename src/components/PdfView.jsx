
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Document, Page, pdfjs} from 'react-pdf';
import {Col, Container, Row, Modal, Button} from "react-bootstrap";
import {getUrl} from "../helper/url-helper";

export default function PdfView({user, type}){
  pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [Show, setShow] = useState(false);
  const navigate = useNavigate();

  let link = `${getUrl()}/users/get-bankstatement/${user._id}`;

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Container className='pdf-container'>
        <Row className='justify-content-start'>
          <Col xs={12} md={6}>
            <div className='text-light text-center'>
              <Document file={link} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} className="page"  onClick={() => setShow(true)}/>
              </Document>
            </div>
          </Col>
        </Row>
      </Container>
      <ViewModal
        show={Show}
        onHide={() => setShow(false)}
        id={user._id}
      />
    </div>
  );
}

function ViewModal(props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  let link = "http://localhost:4000/pdfs/getPdf/" + props.id;

  function onDocumentLoadSuccess({ numPages }) {
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
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.<br/>
          {props.id}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
