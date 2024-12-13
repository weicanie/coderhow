class FormData_wei {
	formdata = new FormData();
	addFiles(name, files) {
		for (const file of files) {
			this.add(name, file);
		}
	}
	add(name, data) {
		this.formdata.append(name, data);
	}
	remove(name) {
		this.formdata.delete(name);
	}
	clear() {
		this.formdata = new FormData();
	}
	removeAll(name) {
		this.formdata.set(name, '');
		this.formdata.delete(name);
	}
	look() {
		console.log(this.formdata);
	}
}
export default FormData_wei;
