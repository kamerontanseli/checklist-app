import { StorageArea } from 'kv-storage';

class JSONArrayStorage {
  constructor(name) {
    this.storage = new StorageArea(name);
  }

  set(name, value) {
    return this.storage.set(name, JSON.stringify(value));
  }

  async get(name) {
    const result = await this.storage.get(name);
    return result ? JSON.parse(result) : [];
  }
}

class JSONObjectManagementStorage {
  constructor(storage, dbName) {
    this.storage = storage;
    this.dbName = dbName;
  }

  get() {
    return this.storage.get(this.dbName);
  }

  async remove(index) {
    const items = await this.get();
    items.splice(index, 1);
    await this.storage.set(this.dbName, items);
  }

  async add(item) {
    const items = await this.get();
    const index = items.push(item) - 1;
    await this.storage.set(this.dbName, items);
    return index;
  }

  async edit(index, changes) {
    const items = await this.get();
    items[index] = { ...items[index], ...changes };
    await this.storage.set(this.dbName, items);
    return items[index];
  }
}

class ChecklistStorage {
  constructor() {
    const storage = new JSONArrayStorage('checklist-pwa-storage');
    this.api = {
      checklists: new JSONObjectManagementStorage(storage, 'checklists'),
      reviews: new JSONObjectManagementStorage(storage, 'reviews'),
    };
  }

  deleteReview(index) {
    return this.api.reviews.remove(index);
  }

  addReviewal(review) {
    return this.api.reviews.add(review);
  }

  addChecklist(checklist) {
    return this.api.checklists.add(checklist);
  }

  editChecklist(index, changes) {
    return this.api.checklists.edit(index, changes);
  }

  deleteChecklist(index) {
    return this.api.checklists.remove(index);
  }

  getChecklists() {
    return this.api.checklists.get();
  }

  getReviews() {
    return this.api.reviews.get();
  }
}

export default ChecklistStorage;
