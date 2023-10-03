export interface Root {
  sys: Sys;
  total: number;
  skip: number;
  limit: number;
  items: Item[];
}

export interface Sys {
  type: string;
}

export interface Item {
  sys: Sys2;
  name: string;
}

export interface Sys2 {
  space: Space;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: Environment;
  createdBy: CreatedBy;
  updatedBy: UpdatedBy;
  version: number;
  visibility: string;
}

export interface Space {
  sys: Sys3;
}

export interface Sys3 {
  type: string;
  linkType: string;
  id: string;
}

export interface Environment {
  sys: Sys4;
}

export interface Sys4 {
  id: string;
  type: string;
  linkType: string;
}

export interface CreatedBy {
  sys: Sys5;
}

export interface Sys5 {
  type: string;
  linkType: string;
  id: string;
}

export interface UpdatedBy {
  sys: Sys6;
}

export interface Sys6 {
  type: string;
  linkType: string;
  id: string;
}
