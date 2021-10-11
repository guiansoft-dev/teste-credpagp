/* ------- editUrl.js ----------- */
import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export default class editUrl extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.editUrlModal}
          toggle={this.props.toggleEditUrlModal}
        >
          <ModalHeader toggle={this.props.toggleEditUrlModal}>
            Editar Url
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="url">Url</Label>
              <Input
                id="url"
                name="url"
                value={this.props.editUrlData.url}
                onChange={this.props.onChangeEditUrlHanler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.props.updateUrl}
            >
              Gravar
            </Button>
            <Button
              color="secondary"
              onClick={this.props.toggleEditUrlModal}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}