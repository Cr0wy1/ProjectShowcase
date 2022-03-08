class ModalData {
  tags;
  projects;

  constructor() {}

  ConstructData() {
    this.projects.forEach(project => {
      const newTags = [];

      this.tags.forEach(tag => {
        if (project.tags.includes(tag.id)) {
          newTags.push(tag);
        }
      });
      project.tags = newTags;
    });
  }

  async Fetch() {
    await Promise.all([
      fetch("/data/tags").then(res => res.json()),
      fetch("/data/projects").then(res => res.json())
    ]).then(res => this._SetData(res));
  }

  _SetData(data) {
    this.tags = data[0].data;
    this.projects = data[1].data;
  }
}

export default new ModalData();
