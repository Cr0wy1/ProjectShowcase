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

  GetProjectById(id) {
    const foundProject = this.projects.find(project => project.id === id);
    return foundProject;
  }

  GetAllWithTagId(tagId) {
    return this.projects.filter(project =>
      project.tags.some(tag => tag.id === tagId)
    );
  }

  GetAllWithTagName(tagName) {
    return this.projects.filter(project =>
      project.tags.some(tag => tag.title === tagName)
    );
  }

  SortByRating(projects) {
    if (projects.length > 0) {
      projects.sort((a, b) => {
        return a.rating < b.rating ? 1 : -1;
      });
    }
    return projects;
  }

  FilterSearch(projects, search) {
    search = search.toLowerCase();
    return this.projects.filter(
      project =>
        project.title.toLowerCase().includes(search) ||
        project.shortDescription.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.tags.some(tag => tag.title.toLowerCase().includes(search))
    );
  }
}

export default new ModalData();
