export interface InputFile {
  id?: any;
  file?: File;
  link?: string;
  preview?: string | ArrayBuffer;
}

export class PageModel {
  id: number;
  title: string;
  slug: string;
  status : boolean;
  available_on: Date;
  available_off: Date;

  product_name: string;
  product_description: string;
  product_details: string;
  product_price: number;
  product_discount_price: number;
  product_discount_until: Date;

  product_size_img: string;
  product_image1: string | InputFile;
  product_image2: string | InputFile;
  product_image3: string | InputFile;
  product_image4: string | InputFile;
  product_image5: string | InputFile;
  product_image6: string | InputFile;

  product_showcase1: string | InputFile; // image showcase
  product_showcase2: string | InputFile; // image showcase
  product_showcase3: string | InputFile; // image showcase
  product_showcase4: string | InputFile; // video showcase

  selected: boolean = false; // Hold selected state
}
