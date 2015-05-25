var Manufacturer = (function () {
    function Manufacturer(id, name) {
        this.id = id;
        this.name = name;
    }
    return Manufacturer;
})();
var Product = (function () {
    function Product(id, name, manufacturerId) {
        this.id = id;
        this.name = name;
        this.manufacturerId = manufacturerId;
    }
    Product.prototype.getManufacturerId = function () {
        return this.manufacturerId;
    };
    return Product;
})();
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
var getProductById = function (id) {
    console.log('getProductById', id);
    return products[id];
};
var getManufacturerByProduct = function (product) {
    console.log('getManufacturerByProduct', product);
    return manufacturers[product.getManufacturerId()];
};
var getManufacturerName = function (manufacturer) {
    console.log('getManufacturerName', manufacturer);
    return manufacturer.name;
};
//# sourceMappingURL=ProductsAndManufacturers.js.map