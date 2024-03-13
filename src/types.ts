
export interface Card {
  id: string;
  label: string;
  suit: string;
  hidden: boolean;
  position: { 
    x: number, 
    y: number,
    z: number
  };
}

export interface Stack {
  hidden: string[];
  visible: string[];
  completed: string[];
}

export interface Position {
  x: number;
  y: number;
  z: number;
}
