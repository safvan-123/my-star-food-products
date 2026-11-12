export type ProductImage = {
  _key?: string; alt?: string; localSrc?: string;
  asset?: {_ref?: string; _type?: string};
  crop?: {top:number;bottom:number;left:number;right:number};
  hotspot?: {x:number;y:number;height:number;width:number};
};
export type Product = {
  demo?: boolean; _id: string; _updatedAt: string; name: string; slug: string;
  category?: string; shortDescription?: string; fullDescription?: string;
  mainImage?: ProductImage; images?: ProductImage[]; weights?: string[];
  ingredients?: string; packagingDetails?: string; price?: number;
  featured?: boolean; visible?: boolean; displayOrder?: number;
  seoTitle?: string; seoDescription?: string;
};
