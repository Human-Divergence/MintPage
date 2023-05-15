export type Character = {
  title: string;
  image: string;
  description: string;
  lock: boolean;
  percent: number;
};

export type Capsule = {
  title: string;
  image: string;
  imageBG: string;
  description: string;
  time: string;
  color: string;
  background: string;
  price: number;
  count: number;
  open: boolean;
  character: Character[];
};
