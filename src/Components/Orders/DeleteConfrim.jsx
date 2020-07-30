import React from 'react';
import {  Modal,ModalFooter,ModalHeader,Button } from 'reactstrap';
const DeleteConfirmation = (props) => {


    let {modal,toggle}=props
    return ( <Modal aria-modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Are you sure to delete?</ModalHeader>

        <ModalFooter>
          <Button color="primary" onClick={props.remove}>Yes</Button>{' '}
          <Button color="secondary" onClick={toggle}>No</Button>
        </ModalFooter>
</Modal> );
}
 
export default DeleteConfirmation;