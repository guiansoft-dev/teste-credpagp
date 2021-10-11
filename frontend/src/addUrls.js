/* ------- addUrl.js ----------- */
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

export default class addUrls extends Component {
  render() {
    return (
      <div>
        <Button
          className="float-right mb-4"
          color="primary"
          onClick={this.props.toggleNewUrlModal}>
          Adicionar Url
        </Button>
        <Modal
          isOpen={this.props.newUrlModal}
          toggle={this.props.toggleNewUrlModal}>
          <ModalHeader toggle={this.props.toggleNewUrlModal}>
            Adicionar nova Url
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="url">Url</Label>
              <Input
                id="url"
                name="url"
                value={this.props.newUrlData.url}
                onChange={this.props.onChangeAddUrlHandler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.addUrl()}>
              Gravar
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggleNewUrlModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}