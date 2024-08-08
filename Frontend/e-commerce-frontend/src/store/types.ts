// // store/types.ts
// import { ProductState } from './modules/products';


// export interface RootState {
//   products: ProductState;
//   isAuthenticated: boolean; 
//   userId: string | null; 
// }

import { ProductState } from './modules/products';

export interface RootState {
  products: ProductState;
  isAuthenticated: boolean; 
  userId: string | null; 
}

