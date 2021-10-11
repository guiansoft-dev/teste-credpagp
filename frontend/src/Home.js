/*------- Home.js ---------*/
import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import AddUrls from './addUrls';
import EditUrl from './editUrl';

export default class Url extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      newUrlData: {
        url: "",
        status_code: ""
      },
      isLoading: false,
      status: "",
      newUrlModal: false,
      editUrlData: {
        id: "",
        url: "",
        status_code: ""
      },
      editUrlModal: false,
      noDataFound: "",
    };
  }

  componentDidMount() {
    this.getUrls();
  }

  getUrls() {
    axios.get("http://localhost:8000/api/urls").then((response) => {
      if (response.status === 200) {
        this.setState({
          urls: response.data.data ? response.data.data : [],
        });
      }
      if (
        response.data.status === "failed" &&
        response.data.success === false
      ) {
        this.setState({
          noDataFound: response.data.message,
        });
      }
    });
  }

  toggleNewUrlModal = () => {
    this.setState({
      newUrlModal: !this.state.newUrlModal,
    });
  };

  onChangeAddUrlHandler = (e) => {
    let { newUrlData } = this.state;
    newUrlData[e.target.name] = e.target.value;
    this.setState({ newUrlData });
  };

  addUrl = () => {
    axios
      .post(
        "http://localhost:8000/api/create-url",
        this.state.newUrlData
      )
      .then((response) => {
        const { urls } = this.state;
        const newUrls = [...urls];
        newUrls.push(response.data);
        this.setState(
          {
            urls: newUrls,
            newUrlModal: false,
            newUrlData: {
              url: "",
              status_code: ""
            },
          },
          () => this.getUrls()
        );
      });
  };

  toggleEditUrlModal = () => {
    this.setState({
      editUrlModal: !this.state.editUrlModal,
    });
  };

  onChangeEditUrlHanler = (e) => {
    let { editUrlData } = this.state;
    editUrlData[e.target.name] = e.target.value;
    this.setState({ editUrlData });
  };

  editUrl = (id, url, status_code) => {
    this.setState({
      editUrlData: { id, url, status_code },
      editUrlModal: !this.state.editUrlModal,
    });
  };

  updateUrl = () => {
    let {
      url
    } = this.state.editUrlData;
    this.setState({
      isLoading: true,
    });
    axios
      .put("http://localhost:8000/api/update-url", {
        url
      })
      .then((response) => {
        this.getUrls();
        this.setState({
          editUrlModal: false,
          editUrlData: { url },
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        console.log(error.response);
      });
  };

  deletUrl = (id) => {
    this.setState({
      isLoading: true,
    });
    axios
      .delete("http://localhost:8000/api/url/" + id)
      .then((response) => {
        this.setState({
          isLoading: false,
        });
        this.getUrls();
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const { newUrlData, editUrlData, noDataFound, urls } = this.state;
    let urlsDetails = [];
    if (urls.length) {
      urlsDetails = urls.map((url) => {
        return (
          <tr key={url.id}>
            <td>{url.id}</td>
            <td>{url.url}</td>
            <td>{url.status_code}</td>
            <td>
              <Button
                color="success"
                className="mr-3"
                size="sm"
                onClick={() =>
                  this.editUrl(
                    url.id,
                    url.url,
                    url.status_code
                  )
                }
              >
                Editar
              </Button>
              <Button
                color="danger"
                size="sm"
                onClick={() => this.deletUrl(url.id)}
              >
                Excluir
              </Button>
            </td>
          </tr>
        );
      });
    }

    if (this.state.isLoading) {
      return <div className="spinner-border text-center" role="status"> <span className="sr-only">Loading...</span>
      </div>
    }

    return (
      <div className="App container mt-4">
        <h4 className="font-weight-bold">Registro de Url</h4>
        {/* Model for Add Url Record */}
        <AddUrls
          toggleNewUrlModal={this.toggleNewUrlModal}
          newUrlModal={this.state.newUrlModal}
          onChangeAddUrlHandler={this.onChangeAddUrlHandler}
          addUrl={this.addUrl}
          newUrlData={newUrlData}
        />

        {/* Model for Edit Url Record */}
        <EditUrl
          toggleEditUrlModal={this.toggleEditUrlModal}
          editUrlModal={this.state.editUrlModal}
          onChangeEditUrlHanler={this.onChangeEditUrlHanler}
          editUrl={this.editUrl}
          editUrlData={editUrlData}
          updateUrl={this.updateUrl}
        />

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>URL</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          {urls.length === 0 ? (
            <tbody>
              <h3>{noDataFound}</h3>
            </tbody>
          ) : (
            <tbody>{urlsDetails}</tbody>
          )}
        </Table>
      </div>
    );
  }
}