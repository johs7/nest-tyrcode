export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public readonly userId: string,
  ) {}
}
