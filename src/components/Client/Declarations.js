import React, { useState } from "react";
// import { Container } from "react-bootstrap/Container";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./declarations.css";
import { BiClinic } from "react-icons/bi";
import { RiStethoscopeLine, RiChat3Line } from "react-icons/ri";
import { FiVideo } from "react-icons/fi";
import { Form, Row, Col, Container } from "react-bootstrap";

const Declarations = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  return (
    <div>
      <Button color="danger" onClick={setModal}>
        Book Appointment
      </Button>
      <Modal
            isOpen={modal}
            toggle={toggle}
            // onClosed={closeAll ? toggle : undefined}
            centered
          >
            <ModalHeader>BOOK AN APPOINTMENT</ModalHeader>
            <ModalBody>
              <Container>
                <p>
                  <Row>
                    <Col /*sm={8} xs={12} md={8}*/>
                      <button
                        type="button"
                        variant="primary"
                        size="lg"
                        block
                        color="#36A9CC"
                        className="btn-block pink_out"
                      >
                        <span>
                          <BiClinic className="mb-1" />{" "}
                        </span>{" "}
                        VISIT CLINIC
                      </button>
                    </Col>
                  </Row>
                  <p></p>
                  <Row>
                    <Col /*sm={8} xs={12} md={8}*/>
                      <button
                        type="button"
                        variant="primary"
                        size="lg"
                        block
                        color="#FE434C"
                        className="btn-block pink_out"
                      >
                        <span>
                          <RiStethoscopeLine className="mb-1" />{" "}
                        </span>{" "}
                        VET HOME VISIT
                      </button>
                    </Col>
                  </Row>
                  <p></p>

                  <Row>
                    <Col /*sm={8} xs={12} md={8}*/>
                      <button
                        type="button"
                        variant="primary"
                        size="lg"
                        block
                        className="btn-block pink_out"
                        onClick={setNestedModal}
                      >
                        <span>
                          <FiVideo className="mb-1" />{" "}
                        </span>{" "}
                        VIDEO CALL
                      </button>
                    </Col>
                  </Row>
                  <p></p>

                  <Row>
                    <Col /*sm={8} xs={12} md={8}*/>
                      <button
                        type="button"
                        variant="primary"
                        size="lg"
                        block
                        className="btn-block pink_out"
                      >
                        <span>
                          <RiChat3Line className="mb-1" />{" "}
                        </span>{" "}
                        CHAT
                      </button>
                    </Col>
                  </Row>
                  <p></p>
                </p>
              </Container>
              <Modal
                isOpen={nestedModal}
                toggle={toggleNested}
                onClosed={closeAll ? toggle : undefined}
                centered
              >
                <ModalBody>
                  <Container>
                    <h1>hello</h1>
                  </Container>
                </ModalBody>
              </Modal>
            </ModalBody>
          </Modal>
    </div>
  );
};

export default Declarations;
