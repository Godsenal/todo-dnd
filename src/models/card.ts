export interface ICardList {
  id: string;
  name: string;
  decription?: string;
}

export interface ICard {
  id: string;
  listId: string;
  name: string;
  description?: string;
}