export interface ClassificationData {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: File | string;
    services: Services[];
  }

export interface Services {
  type: string;
  duration: string;
  price: string;
}
