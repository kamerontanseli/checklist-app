import { StorageArea } from "kv-storage";

class ChecklistStorage {
	constructor () {
		this.storage = new StorageArea('checklist-pwa-storage');
	}

	async deleteReview(index) {
		const reviews = await this.getReviews();
		reviews.splice(index, 1);
		await this.storage.set('reviews', JSON.stringify(reviews));
	}

	async addReviewal(review) {
		const reviews = await this.getReviews();
		const index = reviews.push(review) - 1;
		await this.storage.set('reviews', JSON.stringify(reviews));
		return index;
	}

	async addChecklist(checklist) {
		const checklists = await this.getChecklists();
		const index = checklists.push(checklist) - 1;
		await this.storage.set('checklists', JSON.stringify(checklists));
		return index;
	}

	async editChecklist(index, changes) {
		const checklists = await this.getChecklists();
		checklists[index] = { ...checklists[index], ...changes }
		await this.storage.set('checklists', JSON.stringify(checklists));
		return checklists[index];
	}

	async deleteChecklist(index) {
		const checklists = await this.getChecklists();
		checklists.splice(index, 1);
		await this.storage.set('checklists', JSON.stringify(checklists));
	}

	async getChecklists () {
		const result = await this.storage.get('checklists');
		return result ? JSON.parse(result) : [];
	}

	async getReviews () {
		const result = await this.storage.get('reviews');
		return result ? JSON.parse(result) : [];
	}
}

export default ChecklistStorage;