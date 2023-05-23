export type Character = {
  nom: string;
  faction: "Venus" | "Mars" | "Uranus" | "Jupiter" | "Neptune";
  tier: 1 | 2 | 3 | 4 | 5;
  image: string;
  order: number;
  percentage: number;
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
