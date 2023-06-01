export type Character = {
  nom: string;
  faction: "Venus" | "Mars" | "Uranus" | "Jupiter" | "Neptune";
  tier: 1 | 2 | 3 | 4 | 5;
  image: string;
  order: number;
  percentage: number;
};

export type Capsule = {
  id: IdCapsule;
  title: "onyx" | "gold" | "diamond";
  image: string;
  imagePreview?: string;
  imagePurchase: string;
  imageStats: string;
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

export type IdCapsule = 0 | 1 | 2;
