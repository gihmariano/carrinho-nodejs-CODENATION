const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
	
	const filteredProducts = productsList.filter((product) => {
		return ids.includes(product.id);
	});

	const categoriesProductsCart = filteredProducts.map((product) => {
			return product.category;
	});

	const fillCategories = () => {
		const categories = [
			{frequency: 0, name: "T-SHIRTS"},
			{frequency: 0, name: "PANTS"},
			{frequency: 0, name:"SHOES"},
			{frequency: 0, name:"BAGS"}
		];
	
		let frequencyCategory = categories.map((element) => {

			categoriesProductsCart.forEach((category) => {
				if (category === element.name){
					element.frequency++;
				} 
			})

			return element;
		});

		return frequencyCategory;
	}

	const counterCategories = () => {
		let listCategories = fillCategories();

		let frequencyCategories = 0;
		listCategories.forEach((category) => {

			if(category.frequency === 0){
				frequencyCategories++;
			}
		});

		return frequencyCategories;
	}

	const getPromotion = () => {
		let counter = counterCategories();

		switch(counter){
			case 3: 
				return promotions[0];
			case 2:
				return promotions[1];
			case 1:
				return promotions[2];
			case 0:
				return promotions[3];
		}
	}

	const getTotalRegularPrice = () => {
		return filteredProducts.reduce((soma, element) => soma + element.regularPrice, 0.0);
	}

	const getDescountValue = () => {
		let descount = 0;
		filteredProducts.forEach((product) => {
			product.promotions.forEach((promo) => {
				if(promo.looks.includes(getPromotion())){
					descount += product.regularPrice - promo.price
				}
			});
		});

		return descount.toFixed(2);
	}

	const getPriceDescount = () => {
		let regularPrice = filteredProducts.reduce((soma, element) => soma + element.regularPrice, 0.0);
		return (regularPrice - getDescountValue()).toFixed(2);
	}

	const getPercentDescount = () => {
		return (100*getDescountValue()/getTotalRegularPrice()).toFixed(2) + '%';
	}


	let productList = {
		products: filteredProducts.map((element) => {
			return {
				name: element.name,
				category: element.category
			}
		}),
		promotion: getPromotion(),
		totalPrice: getPriceDescount(),
		discountValue: getDescountValue(),
		discount: getPercentDescount()
	}

	return productList;
}

module.exports = { getShoppingCart };
