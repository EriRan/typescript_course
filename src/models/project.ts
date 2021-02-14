//The exports here did not work without outFile option in tsconfig.json. This causes the javascript to be concattenated into a single file
//Project type
//We should tie project under a concrete class

export enum ProjectStatus {
  ACTIVE,
  FINISHED,
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public peopleCount: number,
    public status: ProjectStatus
  ) {}
}
