
class Manufacturer {
    constructor(public id:string,
                public name:string) {
    }
}

class Product {
    constructor(public id,
                public name,
                private manufacturerId:string) {
    }

    getManufacturerId() {
        return this.manufacturerId;
    }
}

var manufacturers = {
    "sony": new Manufacturer('sony', 'Sony'),
    "apple": new Manufacturer('apple', 'Apple'),
    "samsung": new Manufacturer('samsung', 'Samsung')
};

var products = {
    "1": new Product(1, 'aaaa', 'sony'),
    "2": new Product(2, 'bbbb', 'apple'),
    "3": new Product(3, 'cccc', ''),
    "4": new Product(4, 'dddd', 'sony')
};
var getProductById = (id) => {
    console.log('getProductById', id);
    return products[id];
};
var getManufacturerByProduct = (product:Product) => {
    console.log('getManufacturerByProduct', product);
    return manufacturers[product.getManufacturerId()];
};
var getManufacturerName = (manufacturer:Manufacturer) => {
    console.log('getManufacturerName', manufacturer);
    return manufacturer.name;
};