import { Component, ChangeEvent } from "react";

import TutorialDataService from "../services/tutorial.service";
import ITutorialData from "../types/tutorial.type";

type Props = {
  tutorial: ITutorialData,
  refreshList: Function
};

type State = {
  currentTutorial: ITutorialData;
  message: string;
}

export default class Tutorial extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { tutorial } = nextProps;
    if (prevState.currentTutorial.id !== tutorial.id) {
      return {
        currentTutorial: tutorial,
        message: ""
      };
    }

    return prevState.currentTutorial;
  }

  componentDidMount() {
    this.setState({
      currentTutorial: this.props.tutorial,
    });
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;

    this.setState(function (prevState: State) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description,
      },
    }));
  }

  updatePublished(status: boolean) {
    if (this.state.currentTutorial.id) {
      TutorialDataService.update(this.state.currentTutorial.id, {
        published: status,
      })
        .then(() => {
          this.setState((prevState) => ({
            currentTutorial: {
              ...prevState.currentTutorial,
              published: status,
            },
            message: "The status was updated successfully!",
          }));
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  updateTutorial() {
    if (this.state.currentTutorial.id) {
      const data = {
        title: this.state.currentTutorial.title,
        description: this.state.currentTutorial.description,
      };

      TutorialDataService.update(this.state.currentTutorial.id, data)
        .then(() => {
          this.setState({
            message: "The tutorial was updated successfully!",
          });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  deleteTutorial() {
    if (this.state.currentTutorial.id) {
      TutorialDataService.delete(this.state.currentTutorial.id)
        .then(() => {
          this.props.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        <h4>Tutorial</h4>
        {currentTutorial ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
