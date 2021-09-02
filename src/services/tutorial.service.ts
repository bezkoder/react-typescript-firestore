import firebase from "../firebase";
import ITutorialData from "../types/tutorial.type"

const db = firebase.collection("/tutorials");

class TutorialDataService {
  getAll() {
    return db;
  }

  create(tutorial: ITutorialData) {
    return db.add(tutorial);
  }

  update(id: string, value: any) {
    return db.doc(id).update(value);
  }

  delete(id: string) {
    return db.doc(id).delete();
  }
}

export default new TutorialDataService();
